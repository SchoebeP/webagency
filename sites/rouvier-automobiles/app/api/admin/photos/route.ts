// /api/admin/photos — upload (POST multipart) et suppression (DELETE) des
// photos véhicule. JPEG / PNG / WebP uniquement, 5 Mo max, nom de fichier
// aléatoire écrit dans PHOTOS_DIR (servi par /api/photos/[filename]).

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { PHOTOS_DIR } from "@/lib/db";

const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function unauthorized() {
  return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Format non pris en charge — JPEG, PNG ou WebP uniquement." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Photo trop lourde — 5 Mo maximum." }, { status: 400 });
  }

  // Préfixe lisible (id véhicule) + suffixe aléatoire → nom unique, cache immutable.
  const rawId = form.get("vehicleId");
  const prefix =
    typeof rawId === "string"
      ? rawId.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40)
      : "";
  const filename = `${prefix || "veh"}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  fs.writeFileSync(path.join(PHOTOS_DIR, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ ok: true, filename }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) return unauthorized();

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const filename =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>).filename
      : undefined;
  if (typeof filename !== "string" || !SAFE_FILENAME.test(filename) || filename.includes("..")) {
    return NextResponse.json({ error: "Nom de fichier invalide." }, { status: 400 });
  }

  try {
    fs.unlinkSync(path.join(PHOTOS_DIR, filename));
  } catch {
    // déjà absent : la suppression est idempotente
  }
  return NextResponse.json({ ok: true });
}
