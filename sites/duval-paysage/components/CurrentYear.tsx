"use client";

import { useEffect, useState } from "react";

/**
 * Affiche l'année courante côté client (le site étant exporté en statique, une
 * année calculée au build se figerait au jour de génération). `initial` = année
 * de build, rendue au SSR puis corrigée après montage — aucun décalage d'hydratation.
 */
export default function CurrentYear({ initial }: { initial: number }) {
  const [year, setYear] = useState(initial);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
