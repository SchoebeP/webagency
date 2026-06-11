// 404 globale — affichée pour toute URL inconnue et via notFound() sur les
// fiches véhicules supprimées ou inexistantes.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable — Rouvier Automobiles",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div className="container">
        <div className="page-head fade-up">
          <h1>Page introuvable</h1>
          <p>Erreur 404 — cette page n&apos;existe pas ou ce véhicule n&apos;est plus en stock.</p>
        </div>
        <div className="empty-state fade-up fade-up-1" style={{ marginBottom: "70px" }}>
          <p style={{ margin: "0 0 24px" }}>
            Pas d&apos;inquiétude : notre stock est mis à jour chaque semaine, vous y retrouverez
            peut-être votre bonheur.
          </p>
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/vehicules" className="btn btn-primary">
              Voir nos véhicules
            </Link>
            <Link href="/" className="btn btn-ghost">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
