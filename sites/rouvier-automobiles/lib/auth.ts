// Sessions admin sans dépendance — HMAC-SHA256 via node:crypto.
// Jeton : "admin.<expiryMs>.<hmacHex>" signé avec SESSION_SECRET
// (env, sinon secret généré au seed et persisté dans db.json).
//
// ⚠️ Edge runtime : node:crypto n'est PAS disponible dans middleware.ts.
// Le middleware ne vérifie que la PRÉSENCE du cookie ; la vraie vérification
// (verifySessionToken / isAuthenticated) se fait côté Node dans le layout
// app/admin/(protected)/layout.tsx et dans chaque route API admin.
// Voir CONTRACTS.md (§ Auth).

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { getSessionSecret } from "./db";

export const SESSION_COOKIE = "rouvier_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

function secret(): string {
  return process.env.SESSION_SECRET || getSessionSecret();
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const payload = `admin.${Date.now() + SESSION_TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "admin") return false;
  const expiry = Number(parts[1]);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;
  const expected = Buffer.from(sign(`admin.${parts[1]}`));
  const actual = Buffer.from(parts[2] ?? "");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

/** À appeler depuis une Server Action ou une Route Handler (login). */
export async function setSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

/** À appeler depuis une Server Action ou une Route Handler (logout). */
export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Vérification réelle du jeton — layouts/pages/routes serveur uniquement. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
