"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/providers/ThemeProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open (matches prototype).
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={cn("nav", scrolled && "scrolled")} id="nav">
        <div className="nav-inner glass">
          <Logo />
          <div className="nav-links">
            {site.navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème">
              <Icon name="moon" strokeWidth={2} className="moon" />
              <Icon name="sun" strokeWidth={2} className="sun" />
            </button>
            <Button href="#estimation" small>
              Devis gratuit
            </Button>
            <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
              <Icon name="burger" strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      <div className={cn("mobile-menu", menuOpen && "open")} id="mobileMenu">
        <div className="mm-inner glass">
          {site.navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <Button href="#estimation" onClick={() => setMenuOpen(false)}>
            Demander un devis gratuit
          </Button>
        </div>
      </div>
    </>
  );
}
