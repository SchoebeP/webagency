"use client";

// Frontière d'erreur globale (client component obligatoire). Le layout
// (header / footer) reste affiché ; reset() retente le rendu du segment.

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Trace côté client pour le diagnostic, puis focus sur le titre afin
    // que lecteurs d'écran et clavier soient amenés sur le message d'erreur.
    console.error(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <main>
      <div className="container">
        <div className="page-head fade-up">
          {/* tabIndex -1 : focalisable par script sans entrer dans l'ordre de tabulation. */}
          <h1 ref={headingRef} tabIndex={-1} style={{ outline: "none" }}>
            Une erreur est survenue
          </h1>
          <p>Le chargement de cette page a échoué. Vous pouvez réessayer ci-dessous.</p>
        </div>
        <div className="empty-state fade-up fade-up-1" style={{ marginBottom: "70px" }}>
          <p style={{ margin: "0 0 24px" }}>
            Si le problème persiste, appelez-nous au 02 41 56 80 80 — nous restons joignables aux
            horaires d&apos;ouverture.
          </p>
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button type="button" className="btn btn-primary" onClick={reset}>
              Réessayer
            </button>
            <Link href="/" className="btn btn-ghost">
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
