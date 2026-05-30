import { business, hero, images } from "@/content";
import Img from "./Img";
import { ArrowIcon, CalendarIcon, Stars } from "./icons";

export default function Hero() {
  const variant = hero.variant;
  const cls = "hero" + (variant === "split" ? " hero--split" : variant === "panel" ? " hero--panel" : "");
  const heroImg = images[hero.photo] ?? images.heroIntimate;

  const inner = (
    <>
      <span className="eyebrow">{hero.eyebrow}</span>
      <h1>{hero.title}</h1>
      <p className="hero__sub">{hero.subtitle}</p>
      <div className="hero__rating">
        <Stars n={5} size={18} />
        <span><b>{business.rating}/5</b> {hero.ratingLine}</span>
      </div>
      <div className="hero__cta">
        <a href="#reserver" className={"btn btn--lg " + (variant === "panel" ? "btn--primary" : "btn--glass")}>
          <CalendarIcon size={20} /> Réserver une table
        </a>
        <a href="#carte" className="btn btn--lg btn--cream">
          Voir la carte <ArrowIcon size={18} />
        </a>
      </div>
    </>
  );

  return (
    <section className={cls} id="top">
      <div className="hero__media">
        <Img src={heroImg} alt={`L'ambiance des ${business.shortName}`} label="Photo d'ambiance" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="wrap hero__inner">
        {variant === "panel" ? <div className="hero__card">{inner}</div> : inner}
      </div>
    </section>
  );
}
