import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared shell for the legal pages (mentions légales / confidentialité / CGV).
 * Values still marked [À COMPLÉTER] must be filled in before launch.
 */
/** Visually loud placeholder for legally required info not yet provided. */
export function Todo({ children }: { children: ReactNode }) {
  return <mark className="legal-todo">[À COMPLÉTER : {children}]</mark>;
}

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  /** Human-readable "last updated" date, e.g. "10 juin 2026". */
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="wrap legal">
      <article className="glass legal-panel">
        <Link href="/" className="legal-back">
          ← Retour à l&apos;accueil
        </Link>
        <h1>{title}</h1>
        <p className="legal-updated">Dernière mise à jour : {updated}</p>
        {children}
      </article>
    </main>
  );
}
