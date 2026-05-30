/* Utilitaires partagés + Header, Hero, bandeau, Histoire */

/* Image avec repli chaleureux si l'URL ne charge pas */
function Img({ src, alt, className, style, label }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return (
      <div className={className} style={{
        ...style,
        display: "grid", placeItems: "center",
        background: "linear-gradient(135deg, #B0532F 0%, #6E2A2A 100%)",
        color: "rgba(247,241,230,.92)", fontFamily: "var(--serif)",
        textAlign: "center", padding: "1rem", minHeight: 120
      }} role="img" aria-label={alt}>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", opacity: .92 }}>
          <Ico.utensils s={26} />
          <span style={{ fontSize: ".95rem", lineHeight: 1.2 }}>{label || alt}</span>
        </span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setFailed(true)} />;
}

/* Révélation au scroll */
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  });
}

function useScrolled(threshold = 24) {
  const [s, setS] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setS(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return s;
}

/* ---------- Header ---------- */
function Header({ onReserve }) {
  const scrolled = useScrolled(20);
  const go = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <header className={"site-header" + (scrolled ? " scrolled" : "")}>
      <div className="wrap">
        <a className="brand" href="#top" onClick={(e) => go(e, "top")} aria-label="Les Poulettes du Bec — accueil">
          <span className="brand__mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 11c0-3 2-6 6-6 1 0 2 .3 2 .3S11 3 12 2c2 2 3 4 3 6M5 11c-2 1-3 3-2 5 1 3 4 4 7 4 4 0 7-2 7-6 0-3-2-5-4-6"/>
              <path d="M6 20l-1 2M18 16l2 1"/>
            </svg>
          </span>
          <span>
            <span className="brand__name">Les Poulettes du Bec</span>
            <span className="brand__sub">Le Bec-Hellouin</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Navigation principale">
          <a href="#histoire" onClick={(e) => go(e, "histoire")}>Notre histoire</a>
          <a href="#carte" onClick={(e) => go(e, "carte")}>La carte</a>
          <a href="#galerie" onClick={(e) => go(e, "galerie")}>Galerie</a>
          <a href="#infos" onClick={(e) => go(e, "infos")}>Infos & accès</a>
        </nav>
        <div className="header-cta">
          <a href="#carte" className="btn btn--ghost" onClick={(e) => go(e, "carte")}>Voir la carte</a>
          <a href="#reserver" className="btn btn--primary" onClick={(e) => go(e, "reserver")}>Réserver</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero({ variant, heroImg, title, sub }) {
  const go = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const cls = "hero section--hero" + (variant === "split" ? " hero--split" : variant === "panel" ? " hero--panel" : "");

  const inner = (
    <>
      <span className="eyebrow">Bar · Restaurant · Salon de thé</span>
      <h1>{title}</h1>
      <p className="hero__sub">{sub}</p>
      <div className="hero__rating">
        <Stars n={5} s={18} />
        <span><b>4,7/5</b> · ~130 avis · n°1 du village</span>
      </div>
      <div className="hero__cta">
        <a href="#reserver" className={"btn btn--lg " + (variant === "panel" ? "btn--primary" : "btn--glass")} onClick={(e) => go(e, "reserver")}>
          <Ico.calendar s={20} /> Réserver une table
        </a>
        <a href="#carte" className="btn btn--lg btn--cream" onClick={(e) => go(e, "carte")}>
          Voir la carte <Ico.arrow s={18} />
        </a>
      </div>
    </>
  );

  return (
    <section className={cls} id="top">
      <div className="hero__media"><Img src={heroImg} alt="L'ambiance des Poulettes du Bec" label="Photo d'ambiance" style={{ width: "100%", height: "100%" }} /></div>
      <div className="hero__scrim" aria-hidden="true"></div>
      <div className="wrap hero__inner">
        {variant === "panel" ? <div className="hero__card">{inner}</div> : inner}
      </div>
    </section>
  );
}

/* bandeau infos rapide sous le hero */
function HeroStrip({ todayLabel }) {
  return (
    <div className="hero-strip">
      <div className="wrap">
        <div className="hero-strip__item">
          <Ico.clock s={22} />
          <span><b>Ouvert {todayLabel}</b><br/>Jeudi fermé</span>
        </div>
        <div className="hero-strip__item">
          <Ico.pin s={22} />
          <span><b>Le Bec-Hellouin</b><br/>près de l'abbaye</span>
        </div>
        <div className="hero-strip__item">
          <Ico.leaf s={22} />
          <span><b>Cuisine maison</b><br/>produits frais & locaux</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Notre histoire ---------- */
function Histoire({ portraitSrc }) {
  return (
    <section className="section histoire" id="histoire">
      <div className="wrap histoire__grid">
        <div className="histoire__media reveal">
          <Img src={portraitSrc} alt="Pains et tartes faits maison aux Poulettes du Bec" label="Fait maison" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: "var(--radius-lg)" }} />
          <div className="histoire__badge">
            <small>De la Côte d'Azur au Bec</small>
            30 ans de métier, un rêve enfin réalisé
          </div>
        </div>
        <div className="reveal">
          <span className="eyebrow">Notre histoire</span>
          <h2 className="section-title">Laurence, de retour au pays</h2>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Après trente ans passés sur la Côte d'Azur, Laurence Desrumaux-Scoffié est revenue en Normandie
            pour réaliser un rêve : ouvrir une maison à elle, chaleureuse et gourmande, au cœur d'un des
            Plus Beaux Villages de France.
          </p>
          <p style={{ marginTop: "1rem", color: "var(--ink-soft)" }}>
            Ici, tout est fait maison, avec des produits frais et locaux choisis chez les voisins. Une cuisine
            traditionnelle et généreuse — ris de veau, truite de rivière, belles viandes, tartes du jour — relevée
            d'une touche de créativité. Le tout servi avec ce sourire et cet accueil familial qui font qu'on
            s'attarde, qu'on revient, et qu'on se sent un peu chez soi.
          </p>
          <p className="signature">Laurence
            <small>Gérante & cuisinière</small>
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Img, useReveal, useScrolled, Header, Hero, HeroStrip, Histoire });