// Validation serveur du payload véhicule (POST et PUT). Fichier non-route
// (le routeur App ignore tout fichier qui n'est pas route.ts/page.tsx).

import type { Vehicle } from "@/lib/types";

export type VehicleInput = Omit<Vehicle, "id">;

export type ParseResult =
  | { ok: true; value: VehicleInput }
  | { ok: false; error: string };

const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/;

class ValidationError extends Error {}

function invalid(label: string): ValidationError {
  return new ValidationError(`Champ « ${label} » manquant ou invalide.`);
}

function reqString(v: unknown, label: string, max = 200): string {
  if (typeof v !== "string") throw invalid(label);
  const t = v.trim();
  if (!t || t.length > max) throw invalid(label);
  return t;
}

function optString(v: unknown, label: string, max: number): string {
  if (v === undefined || v === null) return "";
  if (typeof v !== "string" || v.length > max) throw invalid(label);
  return v.trim();
}

function reqInt(v: unknown, label: string, min: number, max: number): number {
  if (typeof v !== "number" || !Number.isFinite(v)) throw invalid(label);
  const n = Math.round(v);
  if (n < min || n > max) throw invalid(label);
  return n;
}

function reqBool(v: unknown, label: string): boolean {
  if (typeof v !== "boolean") throw invalid(label);
  return v;
}

function strArray(v: unknown, label: string, maxItems: number, maxLen: number): string[] {
  if (v === undefined || v === null) return [];
  if (!Array.isArray(v)) throw invalid(label);
  const out: string[] = [];
  for (const item of v) {
    if (typeof item !== "string") throw invalid(label);
    const t = item.trim();
    if (!t) continue;
    if (t.length > maxLen) throw invalid(label);
    if (!out.includes(t)) out.push(t);
  }
  if (out.length > maxItems) throw invalid(label);
  return out;
}

export function parseVehicleInput(data: unknown): ParseResult {
  try {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      throw new ValidationError("Corps de requête invalide.");
    }
    const d = data as Record<string, unknown>;

    const photos = strArray(d.photos, "Photos", 4, 130);
    if (photos.some((f) => !SAFE_FILENAME.test(f) || f.includes(".."))) {
      throw new ValidationError("Nom de fichier photo invalide.");
    }

    const value: VehicleInput = {
      brand: reqString(d.brand, "Marque"),
      model: reqString(d.model, "Modèle"),
      version: reqString(d.version, "Version"),
      year: reqInt(d.year, "Année", 1900, 2100),
      km: reqInt(d.km, "Kilométrage", 0, 3_000_000),
      price: reqInt(d.price, "Prix", 1, 10_000_000),
      monthly: reqInt(d.monthly, "Mensualité", 0, 100_000),
      fuel: reqString(d.fuel, "Énergie", 60),
      gearbox: reqString(d.gearbox, "Boîte", 60),
      power: reqString(d.power, "Puissance", 60),
      doors: reqInt(d.doors, "Portes", 2, 7),
      color: reqString(d.color, "Couleur", 80),
      badges: strArray(d.badges, "Badges", 8, 60),
      featured: reqBool(d.featured, "Mise en avant"),
      sold: reqBool(d.sold, "Vendu"),
      description: optString(d.description, "Description", 4000),
      equipment: strArray(d.equipment, "Équipements", 50, 120),
      photos,
    };
    return { ok: true, value };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof ValidationError ? e.message : "Données invalides.",
    };
  }
}
