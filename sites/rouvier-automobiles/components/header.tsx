"use client";

// Header sticky — README §1. Monté dans le layout racine ; se masque tout seul
// sur /admin/* (le back-office a son propre chrome).
// Vue favoris = /vehicules?favoris=1 (toggle pré-activé sur la page liste).

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Icon, useFavorites } from "./ui";

const THEME_KEY = "rouvier.theme";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // stockage indisponible : la préférence ne sera pas persistée
    }
  };

  const label = theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre";
  return (
    <button type="button" className="theme-toggle" aria-label={label} title={label} onClick={toggle}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
    </button>
  );
}

function NavLinks({
  pathname,
  favsView,
  favCount,
}: {
  pathname: string;
  favsView: boolean;
  favCount: number;
}) {
  const onVehicules = pathname.startsWith("/vehicules");
  return (
    <nav className="nav" aria-label="Navigation principale">
      <Link
        href="/"
        className={"nav-link hide-mobile" + (pathname === "/" ? " active" : "")}
      >
        Accueil
      </Link>
      <Link
        href="/vehicules"
        className={"nav-link" + (onVehicules && !favsView ? " active" : "")}
      >
        Nos véhicules
      </Link>
      <Link
        href="/vehicules?favoris=1"
        className={"nav-link" + (onVehicules && favsView ? " active" : "")}
      >
        Favoris
        {favCount > 0 ? <span className="nav-fav-count">{favCount}</span> : null}
      </Link>
    </nav>
  );
}

function NavWithParams({ pathname, favCount }: { pathname: string; favCount: number }) {
  const searchParams = useSearchParams();
  return (
    <NavLinks
      pathname={pathname}
      favsView={searchParams.get("favoris") === "1"}
      favCount={favCount}
    />
  );
}

export function Header({ validFavIds }: { validFavIds: string[] }) {
  const pathname = usePathname();
  const { favs, ready } = useFavorites();
  // Ne compte que les favoris encore en vente (ids fournis par le layout
  // serveur) : un véhicule vendu ou supprimé ne gonfle pas le badge.
  const favCount = ready ? favs.filter((id) => validFavIds.includes(id)).length : 0;

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Rouvier Automobiles — accueil">
          <span className="logo-mark">ROUVIER</span>
          <span className="logo-sub">Automobiles</span>
        </Link>
        <Suspense fallback={<NavLinks pathname={pathname} favsView={false} favCount={favCount} />}>
          <NavWithParams pathname={pathname} favCount={favCount} />
        </Suspense>
        <a href="tel:+33241568080" className="header-phone" title="Appeler le garage">
          <Icon name="phone" size={15} />
          <span>02 41 56 80 80</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
