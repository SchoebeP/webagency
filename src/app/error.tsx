"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

/**
 * App-router error boundary: a client-component crash shows this instead of
 * taking down the whole page. `reset` re-renders the failed segment.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error("[error-boundary]", error);
    // The boundary swapped the page content out from under the user — move
    // focus (and the screen-reader cursor) to the error message.
    headingRef.current?.focus();
  }, [error]);

  return (
    <main className="wrap" style={{ paddingTop: 160, paddingBottom: 80, textAlign: "center" }}>
      <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: "1.6rem", marginBottom: 12, outline: "none" }}>
        Une erreur est survenue
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
        Quelque chose s&apos;est mal passé de notre côté. Réessayez, ou revenez un peu plus tard.
      </p>
      <Button variant="primary" onClick={reset}>
        Réessayer
      </Button>
    </main>
  );
}
