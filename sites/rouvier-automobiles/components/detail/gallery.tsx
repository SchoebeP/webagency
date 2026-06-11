"use client";

// Galerie de la fiche véhicule — photo principale (430px) + 3 vignettes (110px).
// Cliquer une vignette l'échange avec la photo principale (permutation des
// index : aucune photo dupliquée). Les emplacements suivent le proto :
// 0 = principale, 1 = intérieur, 2 = 3/4 arrière, 3 = détail.

import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import { CarPhoto } from "@/components/ui";

const SLOT_LABELS = ["photo principale", "intérieur", "3/4 arrière", "détail"] as const;

const thumbReset: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  borderRadius: "var(--radius-sm)",
};

// Vignette « Photo à venir » : même emprise, mais inerte (pas de permutation).
const thumbPlaceholder: React.CSSProperties = {
  display: "block",
  width: "100%",
  borderRadius: "var(--radius-sm)",
};

export function Gallery({ vehicle }: { vehicle: Vehicle }) {
  // order[0] = index affiché en grand ; order[1..3] = vignettes.
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const name = `${vehicle.brand} ${vehicle.model}`;

  const swapWithMain = (pos: number) => {
    setOrder((prev) => {
      const next = [...prev];
      [next[0], next[pos]] = [next[pos], next[0]];
      return next;
    });
  };

  return (
    <>
      <div className="gallery-main">
        <CarPhoto
          vehicle={vehicle}
          photoIndex={order[0]}
          alt={`${name} — ${SLOT_LABELS[order[0]] ?? "photo"}`}
          priority
        />
      </div>
      <div className="gallery-thumbs">
        {[1, 2, 3].map((pos) => {
          // Index sans photo réelle → placeholder : ne doit pas pouvoir être
          // permuté dans l'emplacement principal (vignette inerte, non focusable).
          if (order[pos] >= vehicle.photos.length) {
            return (
              <div key={pos} style={thumbPlaceholder} aria-hidden="true">
                <CarPhoto vehicle={vehicle} photoIndex={order[pos]} alt="" />
              </div>
            );
          }
          return (
            <button
              key={pos}
              type="button"
              style={thumbReset}
              onClick={() => swapWithMain(pos)}
              aria-label={`Afficher en grand : ${SLOT_LABELS[order[pos]] ?? "photo"}`}
            >
              <CarPhoto
                vehicle={vehicle}
                photoIndex={order[pos]}
                alt={`${name} — ${SLOT_LABELS[order[pos]] ?? "photo"}`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
