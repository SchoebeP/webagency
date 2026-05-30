import { prestations } from "@/content";
import { ServiceGlyph } from "./icons";

export default function Prestations() {
  return (
    <section className="section" id="prestations">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{prestations.eyebrow}</span>
          <h2 className="h-section">{prestations.title}</h2>
          <p className="lead">{prestations.lead}</p>
        </div>
        <div className="services-grid">
          {prestations.services.map((s, i) => (
            <article className="service-card card reveal" key={s.title} style={{ transitionDelay: i * 40 + "ms" }}>
              <span className="service-card__icon"><ServiceGlyph name={s.icon} /></span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </article>
          ))}
        </div>
        <div className="services-cta reveal">
          <p>{prestations.ctaText}</p>
          <a className="btn" href="#devis">Demander un devis gratuit</a>
        </div>
      </div>
    </section>
  );
}
