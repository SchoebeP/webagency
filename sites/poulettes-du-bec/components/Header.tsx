"use client";

import { useEffect, useState } from "react";
import { business, nav } from "@/content";
import { BrandMark } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a className="brand" href="#top" aria-label={`${business.name} — accueil`}>
          <BrandMark />
          <span>
            <span className="brand__name">{business.name}</span>
            <span className="brand__sub">{business.sub}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Navigation principale">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="header-cta">
          <a href="#carte" className="btn btn--ghost">Voir la carte</a>
          <a href="#reserver" className="btn btn--primary">Réserver</a>
        </div>
      </div>
    </header>
  );
}
