import { business, histoire, images } from "@/content";
import Img from "./Img";

export default function Histoire() {
  return (
    <section className="section histoire" id="histoire">
      <div className="wrap histoire__grid">
        <div className="histoire__media reveal">
          <Img
            src={images[histoire.portrait]}
            alt={`Pains et tartes faits maison aux ${business.shortName}`}
            label="Fait maison"
            style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: "var(--radius-lg)" }}
          />
          <div className="histoire__badge">
            <small>{histoire.badge.kicker}</small>
            {histoire.badge.text}
          </div>
        </div>
        <div className="reveal">
          <span className="eyebrow">{histoire.eyebrow}</span>
          <h2 className="section-title">{histoire.title}</h2>
          {histoire.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "lead" : undefined} style={{ marginTop: "1rem", color: i === 0 ? undefined : "var(--ink-soft)" }}>
              {p}
            </p>
          ))}
          <p className="signature">
            {histoire.signature.name}
            <small>{histoire.signature.role}</small>
          </p>
        </div>
      </div>
    </section>
  );
}
