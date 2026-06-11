import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable — Studio Albâtre",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="wrap" style={{ paddingTop: 160, paddingBottom: 80, textAlign: "center" }}>
      <h1 style={{ fontSize: "1.6rem", marginBottom: 12 }}>Page introuvable</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Cette page n&apos;existe pas ou n&apos;existe plus.
      </p>
      <Link href="/" className="btn btn-primary">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
