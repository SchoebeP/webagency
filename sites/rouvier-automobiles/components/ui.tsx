"use client";

// Composants partagés — port du prototype ui-components.jsx.
// Module client : importable depuis les server components (rendre du JSX, ex.
// <Icon name="shield" />), mais NE PAS appeler ses fonctions côté serveur.
// Voir CONTRACTS.md pour les signatures exactes.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import type { Vehicle } from "@/lib/types";
import { formatKm, formatMonthly, formatPrice } from "@/lib/format";

/* ===== Icônes (SVG inline 24×24, stroke 1.8, round) ===== */

const ICON_PATHS = {
  heart: (
    <path d="M12 21s-7.5-4.6-9.8-9.2C.7 8.6 2.7 5 6.2 5c2 0 3.5 1.1 4.3 2.6h3c.8-1.5 2.3-2.6 4.3-2.6 3.5 0 5.5 3.6 4 6.8C19.5 16.4 12 21 12 21z" transform="scale(0.92) translate(1,0.5)" />
  ),
  gauge: (
    <g>
      <path d="M12 4a9 9 0 0 1 9 9" />
      <path d="M3 13a9 9 0 0 1 9-9" />
      <path d="M12 13l4-3.5" />
      <circle cx="12" cy="13" r="1.6" />
      <path d="M5 19h14" />
    </g>
  ),
  calendar: (
    <g>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </g>
  ),
  fuel: (
    <g>
      <path d="M5 20V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14" />
      <path d="M3.5 20h12" />
      <path d="M14 10h2.2a1.8 1.8 0 0 1 1.8 1.8V17a1.5 1.5 0 0 0 3 0v-6.6L19 8" />
      <path d="M7.5 7.5h4v3.5h-4z" />
    </g>
  ),
  gearbox: (
    <g>
      <circle cx="6" cy="5.5" r="1.8" />
      <circle cx="12" cy="5.5" r="1.8" />
      <circle cx="18" cy="5.5" r="1.8" />
      <circle cx="6" cy="18.5" r="1.8" />
      <circle cx="12" cy="18.5" r="1.8" />
      <path d="M6 7.3v9.4M12 7.3v9.4M18 7.3V12H6" />
    </g>
  ),
  power: <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" />,
  search: (
    <g>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </g>
  ),
  arrowRight: <g><path d="M4 12h15M13 6l6 6-6 6" /></g>,
  arrowLeft: <g><path d="M20 12H5M11 6l-6 6 6 6" /></g>,
  phone: (
    <path d="M5 4h4l1.8 4.5-2.3 1.7a12 12 0 0 0 5.3 5.3l1.7-2.3L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  shield: (
    <g>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6L12 3z" />
      <path d="M8.8 12l2.3 2.3 4.2-4.6" />
    </g>
  ),
  wrench: (
    <path d="M14.2 6.3a4.5 4.5 0 0 1 5.6-5L16.5 4.6l2.9 2.9 3.3-3.3a4.5 4.5 0 0 1-5 5.6L8.4 19a2.1 2.1 0 0 1-3-3l8.8-9.7z" transform="scale(0.92) translate(1,1)" />
  ),
  key: (
    <g>
      <circle cx="7.5" cy="15.5" r="4" />
      <path d="M10.5 12.5L20 3M16 7l3 3M13 10l2 2" />
    </g>
  ),
  doors: (
    <g>
      <path d="M4 12L10.5 4.5H20v15H4V12z" />
      <path d="M4 12h16M15 8.5h1.5" />
    </g>
  ),
  palette: (
    <g>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.8 1-.1 2.7-2.5 2.7z" />
      <circle cx="7.8" cy="11" r="0.8" />
      <circle cx="11" cy="7.8" r="0.8" />
      <circle cx="15.5" cy="9" r="0.8" />
    </g>
  ),
  // Ajouts production (bascule clair/sombre du header)
  sun: (
    <g>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </g>
  ),
  moon: <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z" />,
} as const;

export type IconName = keyof typeof ICON_PATHS;

export function Icon({
  name,
  size = 16,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* ===== Badge ===== */

const ACCENT_BADGES = new Set(["Électrique", "Première main", "Vendu"]);

export function Badge({ label, accent }: { label: string; accent?: boolean }) {
  const isAccent = accent ?? ACCENT_BADGES.has(label);
  return <span className={"badge" + (isAccent ? " badge-accent" : "")}>{label}</span>;
}

/* ===== Favoris (localStorage "rouvier.favs") ===== */

export const FAVORITES_KEY = "rouvier.favs";
const FAVS_EVENT = "rouvier:favs-changed";

function readFavs(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Hook favoris partagé : état synchronisé entre composants (event custom)
 * et entre onglets (event "storage"). `ready` passe à true après hydratation
 * (avant, `favs` est toujours [] pour éviter tout mismatch SSR).
 */
export function useFavorites(): {
  favs: string[];
  ready: boolean;
  isFav: (id: string) => boolean;
  toggleFav: (id: string) => void;
} {
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setFavs(readFavs());
    sync();
    setReady(true);
    window.addEventListener(FAVS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isFav = useCallback((id: string) => favs.includes(id), [favs]);

  const toggleFav = useCallback((id: string) => {
    const current = readFavs();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible (navigation privée…) : on continue en mémoire
    }
    window.dispatchEvent(new Event(FAVS_EVENT));
  }, []);

  return { favs, ready, isFav, toggleFav };
}

/* ===== Bouton favori ===== */

export function FavBtn({ vehicleId, staticPos }: { vehicleId: string; staticPos?: boolean }) {
  const { isFav, toggleFav } = useFavorites();
  const active = isFav(vehicleId);
  const label = active ? "Retirer des favoris" : "Ajouter aux favoris";
  return (
    <button
      type="button"
      className={"fav-btn" + (active ? " is-fav" : "") + (staticPos ? " fav-btn-static" : "")}
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFav(vehicleId);
      }}
    >
      <Icon name="heart" size={18} />
    </button>
  );
}

/* ===== Photo véhicule (remplace <image-slot> du proto) =====
   - vehicle.photos[photoIndex] présent → <img src="/api/photos/<filename>">
   - sinon : placeholder SVG déterministe (dégradé dérivé de vehicle.color,
     silhouette de voiture, « Photo à venir »). Ratio par défaut 3:2 ; les
     conteneurs (.car-card-photo, .hero-visual, .gallery-main, .gallery-thumbs)
     fixent les hauteurs exactes du spec. */

const COLOR_HINTS: Array<[RegExp, [number, number, number]]> = [
  [/blanc|ivoire|crème|nacré/i, [214, 14, 72]],
  [/noir/i, [222, 16, 24]],
  [/gris|argent|titanium|daytona/i, [216, 10, 52]],
  [/bleu/i, [222, 52, 46]],
  [/rouge/i, [8, 58, 44]],
  [/orange/i, [25, 68, 48]],
  [/vert/i, [152, 38, 36]],
  [/beige|sable|marron|brun/i, [33, 28, 50]],
  [/jaune/i, [45, 64, 50]],
];

function colorToHsl(color: string): [number, number, number] {
  for (const [re, hsl] of COLOR_HINTS) {
    if (re.test(color)) return hsl;
  }
  let h = 0;
  for (let i = 0; i < color.length; i++) h = (h * 31 + color.charCodeAt(i)) % 360;
  return [h, 30, 46];
}

function PlaceholderSvg({ vehicle, label, gradientId }: { vehicle: Pick<Vehicle, "color">; label: string; gradientId: string }) {
  const [h, s, l] = colorToHsl(vehicle.color);
  const from = `hsl(${h} ${s}% ${l}%)`;
  const to = `hsl(${(h + 18) % 360} ${Math.min(s + 8, 100)}% ${Math.max(l - 14, 8)}%)`;
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label + " — photo à venir"}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${gradientId})`} />
      <g transform="translate(195, 125)" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 78 L14 64 C14 53 21 46 31 44 L58 39 L86 17 C90 13.5 95 12 100 12 L137 12 C142 12 147 14 150 17.5 L171 39 L186 42 C196 44 202 51 202 61 L202 78" />
        <path d="M14 78 L40 78 M72 78 L138 78 M170 78 L202 78" />
        <circle cx="56" cy="78" r="15" />
        <circle cx="154" cy="78" r="15" />
        <path d="M93 17 L90 38 L143 38 L137 17" opacity="0.7" />
      </g>
      <text x="300" y="268" textAnchor="middle" fontSize="17" fontWeight="600" letterSpacing="0.08em" fill="rgba(255,255,255,0.85)" style={{ fontFamily: "var(--font-body), sans-serif", textTransform: "uppercase" }}>
        Photo à venir
      </text>
    </svg>
  );
}

export function CarPhoto({
  vehicle,
  photoIndex = 0,
  alt,
  className,
  priority = false,
}: {
  vehicle: Vehicle;
  /** Index dans vehicle.photos (galerie : 0 = principale, 1-3 = vignettes). */
  photoIndex?: number;
  alt?: string;
  className?: string;
  /** Photo critique au-dessus de la ligne de flottaison (hero, galerie principale). */
  priority?: boolean;
}) {
  const filename = vehicle.photos[photoIndex];
  const label = alt ?? `${vehicle.brand} ${vehicle.model} ${vehicle.version}`;
  return (
    <div className={"car-photo" + (className ? " " + className : "")}>
      {filename ? (
        <img
          src={`/api/photos/${encodeURIComponent(filename)}`}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      ) : (
        <PlaceholderSvg vehicle={vehicle} label={label} gradientId={`ph-${vehicle.id}-${photoIndex}`} />
      )}
    </div>
  );
}

/* ===== Carte véhicule ===== */

export function CarCard({ vehicle, anim }: { vehicle: Vehicle; anim?: string }) {
  const router = useRouter();
  const href = `/vehicules/${vehicle.id}`;
  const badges = (vehicle.sold ? ["Vendu", ...vehicle.badges] : vehicle.badges).slice(0, 2);
  return (
    <article
      className={"car-card" + (anim ? " fade-up " + anim : "")}
      onClick={() => router.push(href)}
    >
      <div className="car-card-photo">
        <CarPhoto vehicle={vehicle} />
        <div className="car-card-badges">
          {badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
        <FavBtn vehicleId={vehicle.id} />
      </div>
      <div className="car-card-body">
        <div>
          <Link href={href} className="car-card-title" onClick={(e) => e.stopPropagation()}>
            {vehicle.brand} {vehicle.model}
          </Link>
        </div>
        <div className="car-card-version">{vehicle.version}</div>
        <div className="car-card-specs">
          <span className="spec-chip"><Icon name="calendar" size={13} />{vehicle.year}</span>
          <span className="spec-chip"><Icon name="gauge" size={13} />{formatKm(vehicle.km)}</span>
          <span className="spec-chip"><Icon name="fuel" size={13} />{vehicle.fuel}</span>
          <span className="spec-chip"><Icon name="gearbox" size={13} />{vehicle.gearbox}</span>
        </div>
        <div className="car-card-foot">
          <div className="car-price">{formatPrice(vehicle.price)}</div>
          {vehicle.monthly > 0 && (
            <div className="car-price-monthly">dès {formatMonthly(vehicle.monthly)}</div>
          )}
        </div>
      </div>
    </article>
  );
}
