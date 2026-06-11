// POST /api/admin/password — change le mot de passe admin après
// vérification du mot de passe actuel (scrypt timing-safe, lib/db).
// setAdminPassword fait tourner le secret de session (toutes les sessions
// existantes sont invalidées) : on repose donc immédiatement un cookie
// frais signé avec le nouveau secret pour ne pas déconnecter l'opérateur.

import { NextResponse } from "next/server";
import { isAuthenticated, setSessionCookie } from "@/lib/auth";
import { getAdmin, setAdminPassword, verifyPassword } from "@/lib/db";

const MIN_LENGTH = 10;

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

  const d = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : {};
  const current = d.current;
  const next = d.next;
  if (typeof current !== "string" || typeof next !== "string") {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }
  if (next.length < MIN_LENGTH) {
    return NextResponse.json(
      { error: `Le nouveau mot de passe doit contenir au moins ${MIN_LENGTH} caractères.` },
      { status: 400 }
    );
  }
  if (!verifyPassword(getAdmin().email, current)) {
    return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 400 });
  }

  setAdminPassword(next);
  await setSessionCookie();
  return NextResponse.json({ ok: true });
}
