// POST /api/admin/vehicles — création d'un véhicule (id slug généré serveur).
// Session revérifiée côté Node (le middleware ne contrôle pas /api/*).

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getVehicle, saveVehicle } from "@/lib/db";
import { parseVehicleInput } from "./_validate";

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

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

  let id = slugify(`${parsed.value.brand} ${parsed.value.model}`) || "vehicule";
  while (getVehicle(id)) id = `${id}-${crypto.randomBytes(2).toString("hex")}`;

  saveVehicle({ id, ...parsed.value });
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
