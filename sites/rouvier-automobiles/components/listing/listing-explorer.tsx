"use client";

// Explorateur du stock — port du prototype pages.jsx (ListingPage).
// Filtrage instantané en combinaison ET (marque, énergie, boîte, budget,
// favoris), tri, et synchronisation bidirectionnelle avec l'URL :
//   /vehicules?marque=…&energie=…&budget=…&favoris=1
// — la recherche de l'accueil et le lien « Favoris » du header atterrissent
// ici avec ces paramètres. Les favoris viennent du localStorage (useFavorites,
// clé "rouvier.favs" — voir CONTRACTS.md).

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { CarCard, useFavorites } from "@/components/ui";
import {
  BUDGET_MAX,
  BUDGET_MIN,
  BUDGET_STEP,
  FiltersBar,
  type ListingFilters,
} from "./filters-bar";

/* ===== Tri ===== */

const SORTERS: Record<ListingFilters["sort"], (a: Vehicle, b: Vehicle) => number> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  "km-asc": (a, b) => a.km - b.km,
  "year-desc": (a, b) => b.year - a.year,
};

/* ===== URL ⇄ filtres =====
   Seuls marque / energie / budget / favoris sont pilotés par l'URL (ce sont
   les paramètres posés par la recherche accueil et le header). Boîte et tri
   restent purement locaux à la page. */

type UrlFilterPart = Pick<ListingFilters, "brand" | "fuel" | "budget" | "favsOnly">;

function clampBudget(value: number): number {
  if (!Number.isFinite(value)) return BUDGET_MAX;
  const stepped = Math.round(value / BUDGET_STEP) * BUDGET_STEP;
  return Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, stepped));
}

function urlPart(params: { get(name: string): string | null }): UrlFilterPart {
  const rawBudget = params.get("budget");
  return {
    brand: params.get("marque") ?? "",
    fuel: params.get("energie") ?? "",
    budget: rawBudget ? clampBudget(Number(rawBudget)) : BUDGET_MAX,
    favsOnly: params.get("favoris") === "1",
  };
}

function toQuery(f: ListingFilters): string {
  const params = new URLSearchParams();
  if (f.brand) params.set("marque", f.brand);
  if (f.fuel) params.set("energie", f.fuel);
  if (f.budget < BUDGET_MAX) params.set("budget", String(f.budget));
  if (f.favsOnly) params.set("favoris", "1");
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function samePart(a: UrlFilterPart, b: UrlFilterPart): boolean {
  return (
    a.brand === b.brand && a.fuel === b.fuel && a.budget === b.budget && a.favsOnly === b.favsOnly
  );
}

/* ===== Composant ===== */

export function ListingExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favs, ready } = useFavorites();

  // État initial depuis l'URL (page dynamique : useSearchParams est aussi
  // résolu côté serveur au premier rendu — pas de mismatch d'hydratation).
  const [filters, setFilters] = useState<ListingFilters>(() => ({
    ...urlPart(searchParams),
    gearbox: "",
    sort: "price-asc",
  }));

  // router.replace différé pour le slider (évite une rafale de navigations
  // pendant le drag) ; immédiat pour les selects / toggles.
  const replaceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useCallback(() => {
    if (replaceTimer.current !== null) {
      clearTimeout(replaceTimer.current);
      replaceTimer.current = null;
    }
  }, []);
  useEffect(() => clearTimer, [clearTimer]);

  // Dernière query écrite par ce composant via router.replace — sert à
  // distinguer l'écho de nos propres navigations (à ignorer) des navigations
  // externes (lien « Favoris » du header, recherche accueil…) à synchroniser.
  const lastWrittenQuery = useRef<string | null>(null);

  // Navigation externe pendant qu'on est déjà sur /vehicules : l'URL fait foi.
  // En revanche, l'écho de notre propre replace (ou un slider dont le replace
  // est encore différé) ne doit ni écraser l'état local — plus récent que
  // l'URL — ni annuler le debounce en attente.
  useEffect(() => {
    const qs = searchParams.toString();
    const incoming = qs ? `?${qs}` : "";
    if (incoming === lastWrittenQuery.current || replaceTimer.current !== null) return;
    const fromUrl = urlPart(searchParams);
    setFilters((prev) => (samePart(prev, fromUrl) ? prev : { ...prev, ...fromUrl }));
    clearTimer(); // un replace différé devenu obsolète ne doit pas écraser l'URL
  }, [searchParams, clearTimer]);

  const update = (patch: Partial<ListingFilters>, debounceMs = 0) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const query = toQuery(next);
    if (query === toQuery(filters)) return; // boîte / tri : rien à écrire dans l'URL
    clearTimer();
    const run = () => {
      lastWrittenQuery.current = query;
      router.replace(`/vehicules${query}`, { scroll: false });
    };
    if (debounceMs > 0) {
      replaceTimer.current = setTimeout(() => {
        replaceTimer.current = null;
        run();
      }, debounceMs);
    } else {
      run();
    }
  };

  // Options des selects dérivées du stock (les véhicules ajoutés depuis
  // /admin apparaissent automatiquement), comme BRANDS/FUELS du proto.
  const brands = useMemo(
    () => [...new Set(vehicles.map((v) => v.brand))].sort((a, b) => a.localeCompare(b, "fr")),
    [vehicles],
  );
  const fuels = useMemo(
    () => [...new Set(vehicles.map((v) => v.fuel))].sort((a, b) => a.localeCompare(b, "fr")),
    [vehicles],
  );

  // Combinaison ET de tous les critères, puis tri (prix croissant par défaut).
  const results = useMemo(() => {
    const list = vehicles.filter(
      (v) =>
        (!filters.brand || v.brand === filters.brand) &&
        (!filters.fuel || v.fuel === filters.fuel) &&
        (!filters.gearbox || v.gearbox === filters.gearbox) &&
        // BUDGET_MAX = « sans limite » (affiché « 30 000 €+ ») : ne pas
        // exclure les véhicules au-dessus du plafond du slider.
        (filters.budget >= BUDGET_MAX || v.price <= filters.budget) &&
        (!filters.favsOnly || favs.includes(v.id)),
    );
    return list.sort(SORTERS[filters.sort]);
  }, [vehicles, filters, favs]);

  // Vue favoris avant lecture du localStorage : ne pas affirmer « aucun
  // favori » (ni « 0 véhicule ») le temps d'une frame d'hydratation.
  const favsPending = filters.favsOnly && !ready;
  const resultsLabel = favsPending
    ? "…"
    : `${results.length} véhicule${results.length > 1 ? "s" : ""}`;

  return (
    <main>
      <div className="container">
        <div className="page-head fade-up">
          <h1>{filters.favsOnly ? "Vos favoris" : "Nos véhicules"}</h1>
          <p>
            {filters.favsOnly
              ? "Les véhicules que vous avez mis de côté."
              : "Tout notre stock, révisé et garanti — mis à jour chaque semaine."}
          </p>
        </div>
        <FiltersBar
          brands={brands}
          fuels={fuels}
          filters={filters}
          resultsLabel={resultsLabel}
          onChange={update}
        />
        <section style={{ paddingBottom: "60px" }}>
          {results.length > 0 ? (
            <div className="car-grid">
              {results.map((v) => (
                <CarCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : favsPending ? null : (
            <div className="empty-state">
              {filters.favsOnly
                ? favs.length > 0
                  ? // Des ids en localStorage, mais aucun dans le stock actuel
                    // (véhicules vendus ou retirés depuis /admin).
                    "Vos favoris ne sont plus disponibles."
                  : "Aucun favori pour l'instant — cliquez sur le cœur d'une annonce pour la retrouver ici."
                : "Aucun véhicule ne correspond à ces critères. Élargissez votre budget ou retirez un filtre."}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
