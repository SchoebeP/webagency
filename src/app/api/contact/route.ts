import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form handler — relays the lead by email via Resend's HTTP API
 * (no SDK; one fetch call keeps the standalone image dependency-free).
 *
 * Runtime env (server-only, set in docker-compose / Portainer stack env):
 *   RESEND_API_KEY      required — https://resend.com/api-keys
 *   CONTACT_TO_EMAIL    optional — defaults to site.email
 *   CONTACT_FROM_EMAIL  optional — defaults to onboarding@resend.dev, which
 *                       Resend allows before studio-albatre.fr is verified.
 */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  project?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// In-memory rate limiting — the app runs as a single container, so module
// state suffices. Per-IP bucket (first hop of x-forwarded-for) plus a global
// hourly cap that holds even if an attacker rotates/forges the header.
const PER_IP_MAX = 3;
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX_PER_HOUR = 20;
const ipHits = new Map<string, number[]>();
const globalHits: number[] = [];

function rateLimited(ip: string): boolean {
  const now = Date.now();
  while (globalHits.length && now - globalHits[0] > 60 * 60 * 1000) globalHits.shift();
  if (globalHits.length >= GLOBAL_MAX_PER_HOUR) return true;

  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (hits.length >= PER_IP_MAX) return true;

  hits.push(now);
  ipHits.set(ip, hits);
  globalHits.push(now);
  if (ipHits.size > 1000) {
    for (const [k, v] of ipHits) if (v.every((t) => now - t >= PER_IP_WINDOW_MS)) ipHits.delete(k);
  }
  return false;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez dans quelques minutes ou écrivez-nous par email." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot filled → bot. Pretend everything went fine.
  if (str(body.company, 100) !== "") return NextResponse.json({ ok: true });

  const name = str(body.name, 200);
  const email = str(body.email, 200);
  const phone = str(body.phone, 50);
  const project = str(body.project, 100);
  const message = str(body.message, 5000);

  if (name.length < 2 || !isEmail(email) || project === "" || message.length < 5) {
    return NextResponse.json({ error: "Formulaire incomplet ou invalide." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — lead lost:", { name, email, project });
    return NextResponse.json(
      { error: "L'envoi est momentanément indisponible. Écrivez-nous directement par email." },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  const html = `
    <h2>Nouvelle demande — ${esc(site.name)}</h2>
    <p><b>Nom :</b> ${esc(name)}</p>
    <p><b>Email :</b> ${esc(email)}</p>
    <p><b>Téléphone :</b> ${esc(phone) || "—"}</p>
    <p><b>Type de projet :</b> ${esc(project)}</p>
    <p><b>Message :</b></p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
  `;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[${site.name}] ${project} — ${name}`,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error("[contact] Resend unreachable — lead lost:", err, { name, email, project });
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou écrivez-nous directement par email." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, detail);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou écrivez-nous directement par email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
