"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "./icons";

/** Barre d'action collée en bas, mobile uniquement (masquée ≥900px en CSS). */
export default function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={"mobile-cta" + (show ? " show" : "")} aria-hidden={!show}>
      <a href="#carte" className="btn btn--ghost" tabIndex={show ? 0 : -1}>Voir la carte</a>
      <a href="#reserver" className="btn btn--primary" tabIndex={show ? 0 : -1}>
        <CalendarIcon size={18} /> Réserver
      </a>
    </div>
  );
}
