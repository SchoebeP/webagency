"use client";

import { useEffect, useState } from "react";
import { business, nav } from "@/content";
import { Mark, PhoneIcon } from "./icons";

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header" + (solid ? " is-solid" : "")}>
      <div className="wrap site-header__bar">
        <a href="#top" className="brand" aria-label={`${business.name} — accueil`}>
          <Mark size={36} />
          <span className="brand__text">
            <span className="brand__name">{business.name}</span>
            <span className="brand__tag">{business.tagline}</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Navigation principale">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="site-header__cta">
          <a href={"tel:" + business.phoneTel} className="header-phone">
            <PhoneIcon size={20} />
            <span>{business.phoneDisplay}</span>
          </a>
          <a href="#devis" className="btn header-quote">Devis gratuit</a>
        </div>
      </div>
    </header>
  );
}
