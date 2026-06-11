// PATCH /api/admin/requests/[id] — bascule du statut Nouvelle / Traitée.

import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getRequests, setRequestStatus } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { id } = await params;

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const status =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>).status
      : undefined;
  if (status !== "new" && status !== "handled") {
    return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
  }

  if (!getRequests().some((r) => r.id === id)) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  setRequestStatus(id, status);
  return NextResponse.json({ ok: true });
}
