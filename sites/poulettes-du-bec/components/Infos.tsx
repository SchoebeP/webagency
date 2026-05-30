"use client";

import { useEffect, useState } from "react";
import { business, hours, infos } from "@/content";
import { Icon } from "./icons";

export default function Infos() {
  // null au rendu serveur → aucune ligne surlignée ; le vrai jour est appliqué
  // après montage (site statique : pas de calcul de date au build).
  const [todayDow, setTodayDow] = useState<number | null>(null);
  useEffect(() => setTodayDow(new Date().getDay()), []);

  return (
    <section className="section infos" id="infos">
      <div className="wrap">
        <span className="eyebrow">{infos.eyebrow}</span>
        <h2 className="section-title">{infos.title}</h2>
        <div className="infos__grid">
          <div className="hours-card reveal">
            <h3><Icon name="clock" size={22} /> Nos horaires</h3>
            {hours.map((h) => {
              const today = h.dow === todayDow;
              const closed = "closed" in h && h.closed;
              return (
                <div key={h.day} className={"hours-row" + (closed ? " closed" : "") + (today ? " is-today" : "")}>
                  <span className="day">{h.day}{today && <span className="today-pill">Aujourd'hui</span>}</span>
                  <span className="time">{h.time}</span>
                </div>
              );
            })}
          </div>

          <div className="infos__detail reveal">
            {infos.lines.map((line) => (
              <div className="info-line" key={line.title}>
                <Icon name={line.icon} size={24} />
                <span>
                  <b>{line.title}</b>
                  {line.phone ? (
                    <a href={business.phoneHref}>{business.phone}</a>
                  ) : (
                    <span>{line.text}</span>
                  )}
                </span>
              </div>
            ))}
            <div className="access-tags">
              {business.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
