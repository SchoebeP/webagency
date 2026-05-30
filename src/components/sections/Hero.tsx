import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { GradientText } from "@/components/ui/GradientText";

export function Hero() {
  const bars: { h: number; d: number }[] = [
    { h: 45, d: 0.05 },
    { h: 62, d: 0.1 },
    { h: 50, d: 0.15 },
    { h: 78, d: 0.2 },
    { h: 68, d: 0.25 },
    { h: 92, d: 0.3 },
    { h: 100, d: 0.35 },
  ];

  return (
    <header className="hero wrap" id="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal">Création de sites & SEO en Normandie</span>
          <h1 className="reveal d1">
            Des sites web qui attirent et <GradientText>convertissent</GradientText> vos clients en Normandie
          </h1>
          <p className="hero-sub reveal d2">
            Votre site web, votre visibilité, votre croissance. Je conçois des sites modernes, rapides et optimisés pour
            le référencement, afin de transformer vos visiteurs en clients — à Rouen, Caen, Le Havre et partout en
            France.
          </p>
          <div className="hero-cta reveal d3">
            <Button href="#estimation">
              <Icon name="arrowRight" strokeWidth={2.2} />
              Demander un devis gratuit
            </Button>
            <Button href="#realisations" variant="ghost">
              Voir mes réalisations
            </Button>
          </div>
          <div className="hero-trust reveal d4">
            <div className="ht">
              <b className="gradient-text">+40</b>
              <span>Projets livrés</span>
            </div>
            <div className="ht">
              <b className="gradient-text">x2,5</b>
              <span>Trafic moyen / 6 mois</span>
            </div>
            <div className="ht">
              <b className="gradient-text">100%</b>
              <span>Sur-mesure</span>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal d2">
          <div className="hero-card glass">
            <div className="browser-bar">
              <i></i>
              <i></i>
              <i></i>
              <span className="url">votre-entreprise.fr</span>
            </div>
            <div
              className="wp-line"
              style={{
                position: "static",
                width: "70%",
                height: 11,
                marginBottom: 9,
                background: "var(--glass-border-strong)",
              }}
            ></div>
            <div
              className="wp-line"
              style={{
                position: "static",
                width: "90%",
                height: 8,
                marginBottom: 7,
                background: "var(--glass-border)",
              }}
            ></div>
            <div
              className="wp-line"
              style={{
                position: "static",
                width: "80%",
                height: 8,
                marginBottom: 18,
                background: "var(--glass-border)",
              }}
            ></div>
            <div className="mini-chart">
              {bars.map((bar) => (
                <i key={bar.h} style={{ height: bar.h + "%", animationDelay: bar.d + "s" }}></i>
              ))}
            </div>
          </div>
          <div className="float-badge glass fb-1">
            <span className="ico">
              <Icon name="check" strokeWidth={2.4} />
            </span>
            1ʳᵉ page Google
          </div>
          <div className="float-badge glass fb-2">
            <span className="ico">
              <Icon name="bolt" strokeWidth={2.2} />
            </span>
            {"Chargement < 1s"}
          </div>
        </div>
      </div>
    </header>
  );
}
