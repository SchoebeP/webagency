"use client";

import { useEffect, useRef, useState } from "react";
import { realisations } from "@/content";
import { ChevronCompareIcon } from "./icons";

type Project = (typeof realisations.projects)[number];

function BeforeAfter({ p }: { p: Project }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let x = ((clientX - r.left) / r.width) * 100;
    x = Math.max(2, Math.min(98, x));
    setPos(x);
  };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const mm = (e: MouseEvent) => { if (dragging.current) move(e.clientX); };
    const tm = (e: TouchEvent) => { if (dragging.current) move(e.touches[0].clientX); };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchend", up);
    window.addEventListener("touchmove", tm, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((v) => Math.max(2, v - 4));
    if (e.key === "ArrowRight") setPos((v) => Math.min(98, v + 4));
  };

  return (
    <article className="ba card reveal">
      <div
        className="ba__frame"
        ref={ref}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
      >
        {/* APRÈS (fond) */}
        <div className="ba__layer ba__after">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.after} alt={p.afterAlt} draggable={false} />
          <span className="ba__tag ba__tag--after">Après</span>
        </div>
        {/* AVANT (recadré par clip-path) */}
        <div className="ba__layer ba__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.before} alt={p.beforeAlt} draggable={false} />
          <span className="ba__tag ba__tag--before">Avant</span>
        </div>
        {/* poignée */}
        <div
          className="ba__handle"
          style={{ left: pos + "%" }}
          role="slider"
          aria-label={"Comparer avant / après — " + p.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKey}
        >
          <span className="ba__handle-line" />
          <span className="ba__handle-grip">
            <ChevronCompareIcon size={22} />
          </span>
        </div>
      </div>
      <div className="ba__caption">
        <h3 className="ba__title">{p.title}</h3>
        <span className="muted">{p.commune}</span>
      </div>
    </article>
  );
}

export default function Realisations() {
  return (
    <section className="section section--sand" id="realisations">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{realisations.eyebrow}</span>
          <h2 className="h-section">{realisations.title}</h2>
          <p className="lead">{realisations.lead}</p>
        </div>
        <div className="ba-grid">
          {realisations.projects.map((p) => (
            <BeforeAfter key={p.id} p={p} />
          ))}
        </div>
        <div className="services-cta reveal">
          <p>{realisations.ctaText}</p>
          <a className="btn" href="#devis">Demander un devis gratuit</a>
        </div>
      </div>
    </section>
  );
}
