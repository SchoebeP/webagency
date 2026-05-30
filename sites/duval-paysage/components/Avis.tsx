import { avis, business } from "@/content";

export default function Avis() {
  return (
    <section className="section section--sand" id="avis">
      <div className="wrap">
        <div className="avis-head reveal">
          <div>
            <span className="eyebrow">{avis.eyebrow}</span>
            <h2 className="h-section">{avis.title}</h2>
          </div>
          <div className="google-badge card">
            <span className="stars stars--lg">★★★★★</span>
            <div>
              <strong>{business.rating} / 5</strong>
              <span className="muted"> · {business.reviewCount} avis Google</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {avis.reviews.map((r, i) => (
            <article className="review card reveal" key={r.name} style={{ transitionDelay: i * 60 + "ms" }}>
              <span className="stars">★★★★★</span>
              <p className="review__txt">« {r.text} »</p>
              <footer className="review__by">
                <span className="review__avatar">{r.name.charAt(0)}</span>
                <span>
                  <strong>{r.name}</strong>
                  <span className="muted"> · {r.commune}</span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
