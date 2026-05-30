import { galerie, images } from "@/content";
import Img from "./Img";

export default function Galerie() {
  return (
    <section className="section galerie" id="galerie">
      <div className="wrap">
        <span className="eyebrow">{galerie.eyebrow}</span>
        <h2 className="section-title">{galerie.title}</h2>
        <div className="galerie__grid">
          {galerie.tiles.map((t) => (
            <figure key={t.img} className={t.span} tabIndex={0}>
              <Img src={images[t.img]} alt={t.caption} label={t.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <figcaption>{t.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
