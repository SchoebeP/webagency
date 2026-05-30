"use client";

import { useEffect } from "react";

/**
 * Ajoute la classe `.in` aux éléments `.reveal` lorsqu'ils entrent dans la
 * vue (apparition en fondu + montée). Respecte `prefers-reduced-motion`
 * (la CSS neutralise alors l'animation). Composant invisible : il ne rend rien.
 */
export default function RevealManager() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
