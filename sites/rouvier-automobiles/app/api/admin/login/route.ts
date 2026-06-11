// POST /api/admin/login — vérifie l'identifiant (scrypt timing-safe) et pose
// le cookie de session. Limitation : 5 tentatives ratées / 15 min / IP
// (en mémoire — remis à zéro au redémarrage du process, suffisant ici).

import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/db";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/** IP → horodatages des tentatives ratées dans la fenêtre courante. */
const failedAttempts = new Map<string, number[]>();

function clientIp(request: Request): string {
  // Dernier saut de X-Forwarded-For : c'est celui ajouté par notre reverse
  // proxy de confiance. Les sauts précédents sont fournis par le client et
  // donc falsifiables (ils permettraient de contourner la limitation).
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",");
    const last = hops[hops.length - 1]?.trim();
    if (last) return last;
  }
  return request.headers.get("x-real-ip") ?? "local";
}

function recentFailures(ip: string): number[] {
  const cutoff = Date.now() - WINDOW_MS;
  const recent = (failedAttempts.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length === 0) failedAttempts.delete(ip);
  else failedAttempts.set(ip, recent);
  // Évite une croissance non bornée de la table.
  if (failedAttempts.size > 1000) {
    for (const [key, times] of failedAttempts) {
      if (!times.some((t) => t > cutoff)) failedAttempts.delete(key);
    }
  }
  return recent;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const failures = recentFailures(ip);
  if (failures.length >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const d = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : {};
  const email = d.email;
  const password = d.password;
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  if (!verifyPassword(email, password)) {
    failedAttempts.set(ip, [...failures, Date.now()]);
    return NextResponse.json({ error: "E-mail ou mot de passe incorrect." }, { status: 401 });
  }

  failedAttempts.delete(ip);
  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
