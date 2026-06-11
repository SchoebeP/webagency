// POST /api/test-drive — enregistre une demande d'essai (fiche véhicule).
// Validation serveur + honeypot "website" + rate limit mémoire (5 / 10 min / IP).
// Réponses d'erreur JSON en français : { error: string }.

import { NextResponse } from "next/server";
import { addRequest, getVehicle } from "@/lib/db";

export const runtime = "nodejs";

// ===== Rate limit en mémoire (par processus serveur) =====

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  // Purge opportuniste pour borner la mémoire.
  if (hits.size > 500) {
    for (const [key, stamps] of hits) {
      if (stamps.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// ===== Validation =====

const NAME_MAX = 80;
const PHONE_MAX = 20;
const MESSAGE_MAX = 1000;
const VEHICLE_ID_MAX = 64;

const SLOTS = new Set([
  "",
  "Indifférent",
  "En semaine — matin",
  "En semaine — après-midi",
  "Samedi",
]);

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function isPlausiblePhone(phone: string): boolean {
  if (phone.length > PHONE_MAX) return false;
  // Chiffres, espaces, points, tirets, parenthèses, "+" en tête uniquement.
  if (!/^\+?[\d\s().-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function fail(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

// ===== Handler =====

export async function POST(request: Request) {
  // Dernier saut de x-forwarded-for : seule entrée ajoutée par notre proxy de
  // confiance (nginx) — les précédentes sont contrôlables par le client.
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const hops = forwarded.split(",");
  const ip = hops[hops.length - 1].trim() || "inconnue";

  if (isRateLimited(ip)) {
    return fail(
      429,
      "Trop de demandes envoyées. Merci de patienter quelques minutes ou de nous appeler au 02 41 56 80 80."
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail(400, "Requête invalide.");
  }
  if (body === null || typeof body !== "object") {
    return fail(400, "Requête invalide.");
  }
  const data = body as Record<string, unknown>;

  // Honeypot : un humain ne voit pas ce champ. S'il est rempli, on répond
  // « succès » sans rien enregistrer (ne pas aider les bots à se corriger).
  if (asString(data.website).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = asString(data.name).trim();
  const phone = asString(data.phone).trim();
  const slot = asString(data.slot).trim();
  const message = asString(data.message).trim();
  const vehicleId = asString(data.vehicleId).trim();

  if (name.length < 2) {
    return fail(400, "Merci d'indiquer votre nom (2 caractères minimum).");
  }
  if (name.length > NAME_MAX) {
    return fail(400, `Le nom est trop long (${NAME_MAX} caractères maximum).`);
  }
  if (!isPlausiblePhone(phone)) {
    return fail(400, "Merci d'indiquer un numéro de téléphone valide.");
  }
  if (!SLOTS.has(slot)) {
    return fail(400, "Créneau invalide.");
  }
  if (message.length > MESSAGE_MAX) {
    return fail(400, "Le message est trop long (1 000 caractères maximum).");
  }
  if (vehicleId === "" || vehicleId.length > VEHICLE_ID_MAX) {
    return fail(400, "Véhicule invalide.");
  }

  const vehicle = getVehicle(vehicleId);
  if (!vehicle || vehicle.sold) {
    return fail(404, "Ce véhicule n'est plus disponible.");
  }

  addRequest({
    vehicleId: vehicle.id,
    vehicleLabel: `${vehicle.brand} ${vehicle.model} — ${vehicle.version}`,
    name,
    phone,
    slot: slot === "" ? "Indifférent" : slot,
    message,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
