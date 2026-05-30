import { avis } from "@/content";
import { Stars } from "./icons";

export default function Avis() {
  return (
    <section className="section avis" id="avis">
      <div className="wrap">
        <div className="avis__top reveal">
          <div>
            <span className="eyebrow">{avis.eyebrow}</span>
            <h2 className="section-title">{avis.title}</h2>
          </div>
          <div className="rating-badge">
            <span className="rating-badge__score">{avis.badge.score}</span>
            <span>
              <Stars n={5} size={17} /><br />
              <small>{avis.badge.note}</small>
            </span>
          </div>
        </div>
        <div className="reviews">
          {avis.reviews.map((r, i) => (
            <article className="review reveal" key={i} style={{ transitionDelay: i * 80 + "ms" }}>
              <Stars n={r.stars} size={17} />
              <p className="review__text">{r.text}</p>
              <div className="review__who">
                <span className="review__avatar" style={{ background: r.color }}>{r.name.charAt(0)}</span>
                <span>
                  <span className="review__name">{r.name}</span><br />
                  <span className="review__meta">{r.meta}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
