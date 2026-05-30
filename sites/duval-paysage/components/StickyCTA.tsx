"use client";

import { useEffect, useState } from "react";
import { business } from "@/content";
import { PhoneIcon } from "./icons";

/** Barre d'action collée en bas, mobile uniquement (masquée ≥900px en CSS). */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={"sticky-cta" + (show ? " is-show" : "")} aria-hidden={!show}>
      <a href={"tel:" + business.phoneTel} className="sticky-cta__call" tabIndex={show ? 0 : -1}>
        <PhoneIcon size={22} strokeWidth={2} />
        <span>Appeler</span>
      </a>
      <a href="#devis" className="btn sticky-cta__quote" tabIndex={show ? 0 : -1}>Devis gratuit</a>
    </div>
  );
}
