"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "./icons";

/**
 * Image avec repli chaleureux si l'URL ne charge pas : aucun visuel cassé,
 * un bloc dégradé terre-cuite → bordeaux avec un picto couverts s'affiche.
 */
export default function Img({
  src,
  alt,
  className,
  style,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "grid",
          placeItems: "center",
          background: "linear-gradient(135deg, var(--terracotta) 0%, var(--bordeaux) 100%)",
          color: "rgba(247,241,230,.92)",
          fontFamily: "var(--serif)",
          textAlign: "center",
          padding: "1rem",
          minHeight: 120,
        }}
        role="img"
        aria-label={alt}
      >
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", opacity: 0.92 }}>
          <Icon name="utensils" size={26} />
          <span style={{ fontSize: ".95rem", lineHeight: 1.2 }}>{label || alt}</span>
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setFailed(true)} />;
}
