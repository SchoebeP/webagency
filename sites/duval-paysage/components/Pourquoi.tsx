import { pourquoi } from "@/content";
import { CircleCheckIcon } from "./icons";

export default function Pourquoi() {
  return (
    <section className="section section--forest" id="pourquoi">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--light">{pourquoi.eyebrow}</span>
          <h2 className="h-section">{pourquoi.title}</h2>
        </div>
        <div className="reasons-grid">
          {pourquoi.reasons.map((r, i) => (
            <div className="reason reveal" key={r.k} style={{ transitionDelay: i * 50 + "ms" }}>
              <span className="reason__k">{r.k}</span>
              <h3 className="reason__t">{r.title}</h3>
              <p className="reason__d">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="impot-note reveal">
          <CircleCheckIcon size={26} />
          <p>
            <strong>Éligible au crédit d'impôt</strong> services à la personne :{" "}
            <strong>50 % de vos dépenses d'entretien</strong> déduites, dans les conditions légales en vigueur.
          </p>
        </div>
      </div>
    </section>
  );
}
