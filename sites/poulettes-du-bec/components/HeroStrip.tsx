"use client";

import { useEffect, useState } from "react";
import { heroStrip, hours } from "@/content";
import { Icon } from "./icons";

/**
 * Bandeau d'infos rapides sous le hero. Le libellé « Ouvert aujourd'hui · … »
 * dépend du jour du VISITEUR : il est donc calculé côté client (le site étant
 * exporté en statique, un calcul au build figerait le jour de génération).
 */
export default function HeroStrip() {
  const [todayLabel, setTodayLabel] = useState("aujourd'hui");

  useEffect(() => {
    const dow = new Date().getDay();
    const h = hours.find((x) => x.dow === dow);
    setTodayLabel(h && !("closed" in h && h.closed) ? "aujourd'hui · " + h.time : heroStrip.closedTodayFallback);
  }, []);

  return (
    <div className="hero-strip">
      <div className="wrap">
        <div className="hero-strip__item">
          <Icon name="clock" size={22} />
          <span><b>{heroStrip.todayPrefix} {todayLabel}</b><br />{heroStrip.closedNote}</span>
        </div>
        <div className="hero-strip__item">
          <Icon name="pin" size={22} />
          <span><b>{heroStrip.location.title}</b><br />{heroStrip.location.sub}</span>
        </div>
        <div className="hero-strip__item">
          <Icon name="leaf" size={22} />
          <span><b>{heroStrip.cuisine.title}</b><br />{heroStrip.cuisine.sub}</span>
        </div>
      </div>
    </div>
  );
}
