import { business, hero, heroVariant, images } from "@/content";
import { ArrowRightIcon, PhoneIcon } from "./icons";
import TrustBar from "./TrustBar";

/* Boutons d'action du hero (devis + téléphone) */
function HeroActions({ size = "lg" }: { size?: "lg" }) {
  return (
    <div className="hero__actions">
      <a className={"btn btn--" + size} href="#devis">
        {hero.ctaPrimary}
        <ArrowRightIcon size={22} />
      </a>
      <a href={"tel:" + business.phoneTel} className="btn btn--phone btn--lg hero__phone">
        <PhoneIcon size={20} strokeWidth={1.9} />
        {business.phoneDisplay}
      </a>
    </div>
  );
}

export default function Hero() {
  if (heroVariant === "split") {
    return (
      <section className="hero hero--split" id="top">
        <div className="wrap hero--split__grid">
          <div className="hero__copy">
            <span className="eyebrow">{hero.eyebrowSplit}</span>
            <h1 className="h-display">{hero.title}</h1>
            <p className="lead">{hero.subtitle}</p>
            <HeroActions />
            <TrustBar variant="row" />
          </div>
          <div className="hero__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.heroPortrait} alt={`Un beau jardin entretenu par ${business.name}`} />
            <div className="hero__media-badge card">
              <span className="stars">★★★★★</span>
              <strong>{business.rating} / 5</strong>
              <span className="muted">{business.reviewCount} avis Google</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (heroVariant === "editorial") {
    return (
      <section className="hero hero--editorial" id="top">
        <div className="hero__bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images.heroWide} alt={`Jardin soigné, haie taillée par ${business.name}`} />
          <div className="hero__scrim" />
        </div>
        <div className="wrap hero--editorial__inner">
          <span className="eyebrow eyebrow--light">{hero.eyebrowEditorial}</span>
          <h1 className="h-display">{hero.title}</h1>
          <p className="lead lead--light">{hero.subtitle}</p>
          <HeroActions />
        </div>
        <div className="wrap hero--editorial__strip">
          <TrustBar variant="card" />
        </div>
      </section>
    );
  }

  // "plein" — défaut : photo plein cadre, texte à gauche
  return (
    <section className="hero hero--plein" id="top">
      <div className="hero__bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images.heroWide} alt={`Grand jardin soigné par ${business.name}`} />
        <div className="hero__scrim hero__scrim--left" />
      </div>
      <div className="wrap hero--plein__inner">
        <span className="eyebrow eyebrow--light">{hero.eyebrowPlein}</span>
        <h1 className="h-display">{hero.title}</h1>
        <p className="lead lead--light">{hero.subtitle}</p>
        <HeroActions />
        <TrustBar variant="ghost" />
      </div>
    </section>
  );
}
