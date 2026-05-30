import { business, zone } from "@/content";
import { CheckIcon } from "./icons";

/* Carte stylisée (illustration, pas Google Maps). Décorative : l'épingle
   principale reprend la commune du client (business.address.locality) ; les
   villes secondaires et le tracé sont figés ici (à retoucher pour une autre
   région). La liste des communes desservies vient de content.ts. */
function StylizedMap() {
  const woods: [number, number, number][] = [[330, 70, 26], [355, 95, 18], [60, 90, 22], [85, 75, 15], [300, 280, 24], [40, 300, 18]];
  const towns: [number, number, string][] = [[110, 110, "Pont-Audemer"], [300, 130, "Cormeilles"], [150, 270, "Montfort"], [280, 250, "Routot"]];
  return (
    <svg className="zone-map" viewBox="0 0 400 340" role="img" aria-label="Carte stylisée du Pays de Risle">
      <rect width="400" height="340" fill="#EAF0E6" />
      <path d="M0 0h400v110H0z" fill="#E2EAD9" />
      <path d="M0 220h400v120H0z" fill="#DCE7D2" />
      {/* la Risle */}
      <path d="M120 -10C150 60 90 120 130 180 165 235 110 290 150 350" fill="none" stroke="#9CC0D8" strokeWidth="11" strokeLinecap="round" />
      <path d="M120 -10C150 60 90 120 130 180 165 235 110 290 150 350" fill="none" stroke="#BBD7E8" strokeWidth="5" strokeLinecap="round" />
      {/* routes */}
      <path d="M-10 250 200 150 410 200" fill="none" stroke="#fff" strokeWidth="6" />
      <path d="M-10 250 200 150 410 200" fill="none" stroke="#E2D8C2" strokeWidth="2" strokeDasharray="7 7" />
      <path d="M260 -10 230 160 300 350" fill="none" stroke="#fff" strokeWidth="5" />
      {/* zones boisées */}
      {woods.map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r={c[2]} fill="#BFD3AE" />
      ))}
      {/* rayon d'intervention */}
      <circle cx="200" cy="180" r="120" fill="rgba(79,122,74,.10)" stroke="var(--meadow)" strokeWidth="2" strokeDasharray="6 8" />
      {/* épingle principale — Le Perrey */}
      <g transform="translate(200 180)">
        <ellipse cx="0" cy="22" rx="16" ry="5" fill="rgba(0,0,0,.15)" />
        <path d="M0-28a18 18 0 0 0-18 18c0 13 18 30 18 30s18-17 18-30A18 18 0 0 0 0-28Z" fill="var(--cta)" />
        <circle cx="0" cy="-10" r="7" fill="#fff" />
      </g>
      {/* villes secondaires */}
      {towns.map((c, i) => (
        <g key={i} transform={`translate(${c[0]} ${c[1]})`}>
          <circle r="5" fill="var(--forest)" />
          <text x="9" y="4" fontSize="13" fontFamily="Inter, sans-serif" fill="var(--ink)">{c[2]}</text>
        </g>
      ))}
      <g transform="translate(200 180)">
        <text x="0" y="-36" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Archivo, sans-serif" fill="var(--forest)">{business.address.locality}</text>
      </g>
    </svg>
  );
}

export default function Zone() {
  return (
    <section className="section" id="zone">
      <div className="wrap zone-grid">
        <div className="zone-copy reveal">
          <span className="eyebrow">{zone.eyebrow}</span>
          <h2 className="h-section">{zone.title}</h2>
          <p className="lead">{zone.lead}</p>
          <ul className="commune-list">
            {zone.communes.map((c) => (
              <li key={c}>
                <CheckIcon size={16} color="var(--meadow)" />
                {c}
              </li>
            ))}
          </ul>
          <p className="muted zone-note">{zone.note}</p>
          <a className="btn btn--ghost" href="#devis">{zone.cta}</a>
        </div>
        <div className="zone-map-wrap card reveal">
          <StylizedMap />
        </div>
      </div>
    </section>
  );
}
