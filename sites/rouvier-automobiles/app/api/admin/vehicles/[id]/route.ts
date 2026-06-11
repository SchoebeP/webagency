// /api/admin/vehicles/[id] — PUT (mise à jour complète), PATCH (vendu /
// disponible), DELETE (suppression + nettoyage des fichiers photo).
// Session revérifiée côté Node sur chaque méthode.

import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { PHOTOS_DIR, deleteVehicle, getVehicle, saveVehicle } from "@/lib/db";
import { parseVehicleInput } from "../_validate";

type RouteParams = { params: Promise<{ id: string }> };

const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
}

function notFoundJson() {
  return NextResponse.json({ error: "Véhicule introuvable." }, { status: 404 });
}

/** Supprime des fichiers de PHOTOS_DIR (noms déjà filtrés, échecs ignorés). */
function removePhotoFiles(filenames: string[]): void {
  for (const f of filenames) {
    if (!SAFE_FILENAME.test(f) || f.includes("..")) continue;
    try {
      fs.unlinkSync(path.join(PHOTOS_DIR, f));
    } catch {
      // fichier déjà absent : rien à faire
    }
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!(await isAuthenticated())) return unauthorized();
  const { id } = await params;
  const existing = getVehicle(id);
  if (!existing) return notFoundJson();

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const parsed = parseVehicleInput(data);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  saveVehicle({ id, ...parsed.value });
  // Nettoyage : fichiers retirés de la galerie lors de cette mise à jour.
  removePhotoFiles(existing.photos.filter((f) => !parsed.value.photos.includes(f)));
  return NextResponse.json({ ok: true, id });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  if (!(await isAuthenticated())) return unauthorized();
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) return notFoundJson();

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const sold =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>).sold
      : undefined;
  if (typeof sold !== "boolean") {
    return NextResponse.json({ error: "Champ « sold » manquant ou invalide." }, { status: 400 });
  }

  saveVehicle({ ...vehicle, sold });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!(await isAuthenticated())) return unauthorized();
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) return notFoundJson();

  deleteVehicle(id);
  removePhotoFiles(vehicle.photos);
  return NextResponse.json({ ok: true });
}
