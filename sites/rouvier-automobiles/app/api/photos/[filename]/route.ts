// GET /api/photos/[filename] — sert publiquement les photos uploadées
// (PHOTOS_DIR). Nom de fichier strictement validé (pas de séparateur ni de
// « .. »), Content-Type par extension, cache long (noms uniques à l'upload).

import fs from "node:fs";
import path from "node:path";
import { PHOTOS_DIR } from "@/lib/db";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

const SAFE_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (!SAFE_FILENAME.test(filename) || filename.includes("..")) {
    return new Response(null, { status: 404 });
  }
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) return new Response(null, { status: 404 });

  const filePath = path.join(PHOTOS_DIR, filename);
  let buffer: Buffer;
  try {
    buffer = fs.readFileSync(filePath);
  } catch {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(buffer.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
