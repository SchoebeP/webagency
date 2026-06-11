"use client";

// Carte de recherche du hero (accueil) — port du prototype pages.jsx.
// Navigue vers /vehicules?marque=..&energie=..&budget=.. en n'ajoutant que
// les paramètres effectivement choisis par l'utilisateur.

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { formatPrice } from "@/lib/format";

const BUDGET_OPTIONS = [15000, 20000, 25000, 30000];

export function SearchCard({ brands, fuels }: { brands: string[]; fuels: string[] }) {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [budget, setBudget] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("marque", brand);
    if (fuel) params.set("energie", fuel);
    if (budget) params.set("budget", budget);
    const qs = params.toString();
    router.push(qs ? `/vehicules?${qs}` : "/vehicules");
  }

  return (
    <form className="search-card" onSubmit={onSubmit}>
      <div className="field">
        <label className="field-label" htmlFor="search-brand">
          Marque
        </label>
        <div className="select-wrap">
          <select
            id="search-brand"
            className="select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Toutes</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="search-fuel">
          Énergie
        </label>
        <div className="select-wrap">
          <select
            id="search-fuel"
            className="select"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option value="">Toutes</option>
            {fuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="search-price">
          Budget max
        </label>
        <div className="select-wrap">
          <select
            id="search-price"
            className="select"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Sans limite</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={String(b)}>
                {formatPrice(b)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        <Icon name="search" size={16} />
        Rechercher
      </button>
    </form>
  );
}
