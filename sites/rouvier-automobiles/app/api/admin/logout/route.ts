// POST /api/admin/logout — efface le cookie de session puis redirige vers
// la page de connexion (appelé par un <form method="post"> du chrome admin).

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  await clearSessionCookie();
  // new URL("/admin/login", ...) repartirait de la racine du domaine et
  // perdrait le basePath éventuel : on le re-préfixe explicitement
  // (BASE_PATH est aussi lu au runtime par le serveur standalone).
  const basePath = process.env.BASE_PATH ?? "";
  return NextResponse.redirect(new URL(`${basePath}/admin/login`, request.url), 303);
}
