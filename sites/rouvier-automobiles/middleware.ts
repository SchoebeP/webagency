// Garde légère sur /admin/* — edge runtime, donc PAS de node:crypto ici.
// On ne vérifie que la présence du cookie de session (redirection rapide des
// visiteurs non connectés). La vérification cryptographique réelle est faite
// côté Node dans app/admin/(protected)/layout.tsx et chaque route API admin
// via lib/auth (voir CONTRACTS.md § Auth).

import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE = "rouvier_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!request.cookies.has(SESSION_COOKIE)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
