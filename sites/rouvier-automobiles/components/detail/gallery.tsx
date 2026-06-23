"use client";

// Galerie de la fiche véhicule — photo principale (430px) + vignettes (110px).
// Cliquer une vignette l'échange avec la photo principale (permutation des
// index : aucune photo dupliquée). Le nombre de vignettes suit le nombre réel
// de photos du véhicule (jusqu'à 3) ; aucun emplacement « Photo à venir » n'est
// affiché dès qu'au moins une vraie photo existe. Zéro photo → placeholder seul.

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

export function Gallery({ vehicle }: { vehicle: Vehicle }) {
  // order = indices des photos réelles ; order[0] = affichée en grand,
  // order[1..] = vignettes. Au plus 4 vues (1 principale + 3 vignettes).
  const count = Math.min(vehicle.photos.length, 4);
  const [order, setOrder] = useState<number[]>(() =>
    count > 0 ? Array.from({ length: count }, (_, i) => i) : [0]
  );
  const name = `${vehicle.brand} ${vehicle.model}`;
  const hasPhotos = vehicle.photos.length > 0;
  const thumbs = order.slice(1);

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
      {hasPhotos && thumbs.length > 0 && (
        <div
          className="gallery-thumbs"
          style={{ gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))` }}
        >
          {thumbs.map((idx, i) => {
            const pos = i + 1;
            return (
              <button
                key={idx}
                type="button"
                style={thumbReset}
                onClick={() => swapWithMain(pos)}
                aria-label={`Afficher en grand : ${SLOT_LABELS[idx] ?? "photo"}`}
              >
                <CarPhoto
                  vehicle={vehicle}
                  photoIndex={idx}
                  alt={`${name} — ${SLOT_LABELS[idx] ?? "photo"}`}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
