"use client";

// Barre de filtres sticky de la liste — README §2.2, port du prototype
// pages.jsx (ListingPage). Composant purement présentationnel : l'état vit
// dans <ListingExplorer> (qui le synchronise avec l'URL).

import { Icon } from "@/components/ui";
import { formatPrice } from "@/lib/format";

export const BUDGET_MIN = 12000;
export const BUDGET_MAX = 30000;
export const BUDGET_STEP = 500;

export type SortKey = "price-asc" | "price-desc" | "km-asc" | "year-desc";

export interface ListingFilters {
  /** "" = toutes marques. */
  brand: string;
  /** "" = toutes énergies. */
  fuel: string;
  /** "" = toutes boîtes. */
  gearbox: string;
  /** Budget max en € — BUDGET_MAX vaut « sans limite » (affiché « 30 000 €+ »). */
  budget: number;
  favsOnly: boolean;
  sort: SortKey;
}

export function FiltersBar({
  brands,
  fuels,
  filters,
  resultsLabel,
  onChange,
}: {
  brands: string[];
  fuels: string[];
  filters: ListingFilters;
  /** Compteur de résultats déjà formaté ("9 véhicules"…). */
  resultsLabel: string;
  /** Patch des filtres ; debounceMs > 0 ne diffère que l'écriture de l'URL. */
  onChange: (patch: Partial<ListingFilters>, debounceMs?: number) => void;
}) {
  return (
    <div className="filters-bar fade-up fade-up-1">
      <div className="select-wrap">
        <select
          className="select"
          aria-label="Marque"
          value={filters.brand}
          onChange={(e) => onChange({ brand: e.target.value })}
        >
          <option value="">Toutes marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="select-wrap">
        <select
          className="select"
          aria-label="Énergie"
          value={filters.fuel}
          onChange={(e) => onChange({ fuel: e.target.value })}
        >
          <option value="">Toutes énergies</option>
          {fuels.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div className="select-wrap">
        <select
          className="select"
          aria-label="Boîte de vitesses"
          value={filters.gearbox}
          onChange={(e) => onChange({ gearbox: e.target.value })}
        >
          <option value="">Toutes boîtes</option>
          <option value="Manuelle">Manuelle</option>
          <option value="Automatique">Automatique</option>
        </select>
      </div>
      <label className="price-filter">
        Budget
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={filters.budget}
          aria-label="Budget maximum"
          aria-valuetext={
            filters.budget >= BUDGET_MAX
              ? formatPrice(BUDGET_MAX) + " et plus"
              : formatPrice(filters.budget)
          }
          onChange={(e) => onChange({ budget: Number(e.target.value) }, 250)}
        />
        <strong>
          {filters.budget >= BUDGET_MAX ? formatPrice(BUDGET_MAX) + "+" : formatPrice(filters.budget)}
        </strong>
      </label>
      <button
        type="button"
        className={"filter-toggle" + (filters.favsOnly ? " active" : "")}
        aria-pressed={filters.favsOnly}
        onClick={() => onChange({ favsOnly: !filters.favsOnly })}
      >
        <Icon name="heart" size={14} />
        Favoris
      </button>
      <div className="select-wrap">
        <select
          className="select"
          aria-label="Tri"
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortKey })}
        >
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="km-asc">Kilométrage</option>
          <option value="year-desc">Plus récents</option>
        </select>
      </div>
      <div className="results-count" aria-live="polite">{resultsLabel}</div>
    </div>
  );
}
