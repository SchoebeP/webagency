// POST /api/admin/logout — efface le cookie de session puis redirige vers
// la page de connexion (appelé par un <form method="post"> du chrome admin).

import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/admin/login", request.url), 303);
}
