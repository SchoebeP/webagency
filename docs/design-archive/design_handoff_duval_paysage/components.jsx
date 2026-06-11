/* global React */
const { useState, useEffect, useRef } = React;

/* ----------------------------------------------------------------
   Coordonnées (REMPLACER par les vraies infos)
----------------------------------------------------------------- */
const PHONE_DISPLAY = "02 32 56 00 00";
const PHONE_TEL = "+33232560000";
const EMAIL = "contact@duval-paysage.fr";

/* Photos libres de droits (Pexels — usage commercial, sans attribution).
   Servent de visuel par défaut ; Hervé peut déposer ses propres photos par-dessus. */
const PX = (id, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const IMG = {
  heroWide: PX(31136976),   // allée de jardin ensoleillée (lumière douce)
  heroPortrait: PX(31960327), // allée de jardin verdoyante
};

/* ----------------------------------------------------------------
   Petites icônes (trait, robustes)
----------------------------------------------------------------- */
function Icon({ name, size = 34 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    elagage: <><path d="M12 21v-6"/><path d="M12 15c-3 0-5-2-5-5 0 0 3 0 5 2"/><path d="M12 15c3 0 5-2 5-5 0 0-3 0-5 2"/><path d="M12 11c0-3 1.5-5 4-7"/><path d="M12 11C12 8 10.5 6 8 4"/></>,
    abattage: <><path d="M14 3 9 8l3 3"/><path d="m12 11-7 7 1 1 7-7"/><path d="M14 3l4 4-3 3-4-4"/><path d="M5 21h6"/></>,
    haies: <><rect x="3" y="9" width="18" height="9" rx="1.5"/><path d="M6 9V6m4 3V5m4 4V6m4 3V5"/><path d="M3 21h18"/></>,
    tonte: <><circle cx="7" cy="17" r="3"/><path d="M10 15h6l3-6h-4l-2 4"/><path d="M13 9V5h5"/></>,
    cloture: <><path d="M5 4 3 7v13h4V7L5 4Zm7 0L10 7v13h4V7l-2-3Zm7 0-2 3v13h4V7l-2-3Z"/><path d="M2 11h20M2 15h20"/></>,
    maconnerie: <><rect x="3" y="6" width="7" height="4" rx=".5"/><rect x="12" y="6" width="9" height="4" rx=".5"/><rect x="3" y="11" width="9" height="4" rx=".5"/><rect x="14" y="11" width="7" height="4" rx=".5"/><rect x="3" y="16" width="7" height="4" rx=".5"/><rect x="12" y="16" width="9" height="4" rx=".5"/></>,
    entretien: <><path d="M3 21h18"/><path d="M7 21V11l5-4 5 4v10"/><path d="M10 21v-5h4v5"/><path d="M12 7V3"/></>,
    dessouchage: <><path d="M12 14v7"/><path d="M9 21h6"/><path d="M12 14c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4Z"/><path d="M12 14c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4Z"/><path d="M5 7c2 0 3 1 3 3M19 7c-2 0-3 1-3 3"/></>,
  };
  return <svg {...p} aria-hidden="true">{paths[name]}</svg>;
}

/* Petit logo — feuille / arbre */
function Mark({ size = 34, color = "var(--meadow)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 36V20" stroke="var(--earth)" strokeWidth="2.6" strokeLinecap="round"/>
      <path d="M20 24c-7 0-11-4-11-11 7 0 11 4 11 11Z" fill={color}/>
      <path d="M20 20c0-7 4-11 11-11 0 7-4 11-11 11Z" fill="var(--forest)"/>
    </svg>
  );
}

/* ----------------------------------------------------------------
   HEADER (collant)
----------------------------------------------------------------- */
function Header({ onQuote }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"site-header" + (solid ? " is-solid" : "")}>
      <div className="wrap site-header__bar">
        <a href="#top" className="brand" aria-label="Duval Paysage — accueil">
          <Mark size={36} />
          <span className="brand__text">
            <span className="brand__name">Duval Paysage</span>
            <span className="brand__tag">Paysagiste · Pays de Risle</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Navigation principale">
          <a href="#prestations">Prestations</a>
          <a href="#realisations">Réalisations</a>
          <a href="#avis">Avis</a>
          <a href="#zone">Zone</a>
        </nav>
        <div className="site-header__cta">
          <a href={"tel:" + PHONE_TEL} className="header-phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            <span>{PHONE_DISPLAY}</span>
          </a>
          <button className="btn header-quote" onClick={onQuote}>Devis gratuit</button>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------
   BANDEAU DE CONFIANCE
----------------------------------------------------------------- */
function TrustBar({ variant = "row" }) {
  const items = [
    { strong: "5,0", label: "★★★★★ · 92 avis Google", icon: "star" },
    { strong: "Devis", label: "gratuit & sans engagement" },
    { strong: "Crédit", label: "d'impôt services à la personne" },
    { strong: "20+", label: "chantiers réalisés / an" },
  ];
  return (
    <ul className={"trustbar trustbar--" + variant}>
      {items.map((it, i) => (
        <li key={i}>
          <strong className={it.icon === "star" ? "stars-strong" : ""}>{it.strong}</strong>
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}

/* ----------------------------------------------------------------
   HERO — 3 variantes
----------------------------------------------------------------- */
const HERO_TITLE = "Votre jardin entre de bonnes mains, dans le Pays de Risle.";
const HERO_SUB = "Élagage, taille de haies, entretien et aménagement. Travail soigné, débris évacués, devis gratuit — par Hervé Duval, paysagiste au Perrey.";

function HeroActions({ onQuote, size = "lg" }) {
  return (
    <div className="hero__actions">
      <button className={"btn btn--" + size} onClick={onQuote}>
        Demander un devis gratuit
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
      <a href={"tel:" + PHONE_TEL} className="btn btn--phone btn--lg hero__phone">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}

function Hero({ variant, onQuote }) {
  if (variant === "split") {
    return (
      <section className="hero hero--split" id="top">
        <div className="wrap hero--split__grid">
          <div className="hero__copy">
            <span className="eyebrow">Paysagiste dans l'Eure</span>
            <h1 className="h-display">{HERO_TITLE}</h1>
            <p className="lead">{HERO_SUB}</p>
            <HeroActions onQuote={onQuote} />
            <TrustBar variant="row" />
          </div>
          <div className="hero__media">
            <image-slot id="hero-split" shape="rounded" radius="10" src={IMG.heroPortrait}
              placeholder="Photo : un beau jardin que vous avez entretenu"></image-slot>
            <div className="hero__media-badge card">
              <span className="stars">★★★★★</span>
              <strong>5,0 / 5</strong>
              <span className="muted">92 avis Google</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (variant === "editorial") {
    return (
      <section className="hero hero--editorial" id="top">
        <div className="hero__bg">
          <image-slot id="hero-editorial" shape="rect" fit="cover" src={IMG.heroWide}
            placeholder="Photo plein cadre : jardin soigné, haie taillée"></image-slot>
          <div className="hero__scrim"></div>
        </div>
        <div className="wrap hero--editorial__inner">
          <span className="eyebrow eyebrow--light">Le Perrey · Pays de Risle · Eure</span>
          <h1 className="h-display">{HERO_TITLE}</h1>
          <p className="lead lead--light">{HERO_SUB}</p>
          <HeroActions onQuote={onQuote} />
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
        <image-slot id="hero-plein" shape="rect" fit="cover" src={IMG.heroWide}
          placeholder="Photo plein cadre : grand jardin soigné"></image-slot>
        <div className="hero__scrim hero__scrim--left"></div>
      </div>
      <div className="wrap hero--plein__inner">
        <span className="eyebrow eyebrow--light">Paysagiste · Le Perrey, Eure</span>
        <h1 className="h-display">{HERO_TITLE}</h1>
        <p className="lead lead--light">{HERO_SUB}</p>
        <HeroActions onQuote={onQuote} />
        <TrustBar variant="ghost" />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   PRESTATIONS
----------------------------------------------------------------- */
const SERVICES = [
  { icon: "elagage", t: "Élagage", d: "Taille raisonnée et mise en sécurité de vos arbres, à toute hauteur." },
  { icon: "abattage", t: "Abattage", d: "Abattage maîtrisé, démontage en zone difficile, évacuation comprise." },
  { icon: "haies", t: "Taille de haies", d: "Haies nettes et régulières, tonte des bordures, broyage des déchets." },
  { icon: "tonte", t: "Tonte & débroussaillage", d: "Pelouses, talus et terrains en friche remis au propre." },
  { icon: "cloture", t: "Clôtures & portails", d: "Pose de clôtures, grillages et portails pour délimiter votre terrain." },
  { icon: "maconnerie", t: "Maçonnerie paysagère", d: "Petites dalles, bordures et aménagements béton soignés." },
  { icon: "dessouchage", t: "Dessouchage", d: "Rognage et extraction de souches pour repartir sur un terrain net." },
  { icon: "entretien", t: "Entretien de jardins", d: "Contrats d'entretien à l'année — votre extérieur toujours impeccable." },
];

function Prestations({ onQuote }) {
  return (
    <section className="section" id="prestations">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Nos prestations</span>
          <h2 className="h-section">Tout l'entretien de vos extérieurs, par un seul artisan</h2>
          <p className="lead">De l'élagage en hauteur à la pose d'une clôture, Duval Paysage prend en charge l'ensemble de vos travaux de jardin — proprement, et de A à Z.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <article className="service-card card reveal" key={i} style={{ transitionDelay: (i * 40) + "ms" }}>
              <span className="service-card__icon"><Icon name={s.icon} /></span>
              <h3 className="service-card__title">{s.t}</h3>
              <p className="service-card__desc">{s.d}</p>
            </article>
          ))}
        </div>
        <div className="services-cta reveal">
          <p>Un projet en tête ? Décrivez-le, on vous répond vite.</p>
          <button className="btn" onClick={onQuote}>Demander un devis gratuit</button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   POURQUOI DUVAL PAYSAGE
----------------------------------------------------------------- */
const REASONS = [
  { k: "01", t: "Devis gratuit & clair", d: "On se déplace, on évalue, et vous recevez un devis détaillé sans engagement ni surprise." },
  { k: "02", t: "Travail soigné & propre", d: "Chantier rangé, débris évacués et terrain laissé net : vous profitez tout de suite." },
  { k: "03", t: "20+ chantiers par an", d: "Hervé Duval intervient au quotidien dans le Pays de Risle — un savoir-faire éprouvé." },
  { k: "04", t: "Intervention rapide", d: "Réponse sous 48 h et créneaux d'intervention courts, y compris pour les urgences d'élagage." },
];

function Pourquoi() {
  return (
    <section className="section section--forest" id="pourquoi">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow--light">Pourquoi nous confier votre jardin</span>
          <h2 className="h-section">Le sérieux d'un artisan, la propreté d'un pro</h2>
        </div>
        <div className="reasons-grid">
          {REASONS.map((r, i) => (
            <div className="reason reveal" key={i} style={{ transitionDelay: (i * 50) + "ms" }}>
              <span className="reason__k">{r.k}</span>
              <h3 className="reason__t">{r.t}</h3>
              <p className="reason__d">{r.d}</p>
            </div>
          ))}
        </div>
        <div className="impot-note reveal">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <p><strong>Éligible au crédit d'impôt</strong> services à la personne : <strong>50 % de vos dépenses d'entretien</strong> déduites, dans les conditions légales en vigueur.</p>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   AVIS CLIENTS
----------------------------------------------------------------- */
const REVIEWS = [
  { n: "Sandrine L.", c: "Le Perrey", txt: "Travail rapide et très propre. Hervé a élagué deux grands chênes et tout était nettoyé en partant. Je recommande sans hésiter." },
  { n: "Jean-Marc P.", c: "Pont-Audemer", txt: "Devis clair, intervention dans la semaine. Haie taillée nickel et tonte impeccable. Du sérieux, on sent le métier." },
  { n: "Catherine D.", c: "Cormeilles", txt: "Très satisfaite : ponctuel, soigné et de bon conseil. Le jardin a retrouvé une seconde jeunesse. Prix juste." },
];

function Avis() {
  return (
    <section className="section section--sand" id="avis">
      <div className="wrap">
        <div className="avis-head reveal">
          <div>
            <span className="eyebrow">Avis clients</span>
            <h2 className="h-section">Ils nous ont confié leur jardin</h2>
          </div>
          <div className="google-badge card">
            <span className="stars stars--lg">★★★★★</span>
            <div>
              <strong>5,0 / 5</strong>
              <span className="muted"> · 92 avis Google</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <article className="review card reveal" key={i} style={{ transitionDelay: (i * 60) + "ms" }}>
              <span className="stars">★★★★★</span>
              <p className="review__txt">« {r.txt} »</p>
              <footer className="review__by">
                <span className="review__avatar">{r.n.charAt(0)}</span>
                <span>
                  <strong>{r.n}</strong>
                  <span className="muted"> · {r.c}</span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   ZONE D'INTERVENTION + carte stylisée
----------------------------------------------------------------- */
const COMMUNES = ["Le Perrey", "Pont-Audemer", "Cormeilles", "Bourg-Achard", "Beuzeville",
  "Quillebeuf-sur-Seine", "Montfort-sur-Risle", "Routot", "Saint-Georges-du-Vièvre", "Brionne"];

function StylizedMap() {
  return (
    <svg className="zone-map" viewBox="0 0 400 340" role="img" aria-label="Carte stylisée du Pays de Risle">
      <rect width="400" height="340" fill="#EAF0E6"/>
      {/* champs / parcelles */}
      <path d="M0 0h400v110H0z" fill="#E2EAD9"/>
      <path d="M0 220h400v120H0z" fill="#DCE7D2"/>
      {/* la Risle */}
      <path d="M120 -10C150 60 90 120 130 180 165 235 110 290 150 350" fill="none" stroke="#9CC0D8" strokeWidth="11" strokeLinecap="round"/>
      <path d="M120 -10C150 60 90 120 130 180 165 235 110 290 150 350" fill="none" stroke="#BBD7E8" strokeWidth="5" strokeLinecap="round"/>
      {/* routes */}
      <path d="M-10 250 200 150 410 200" fill="none" stroke="#fff" strokeWidth="6"/>
      <path d="M-10 250 200 150 410 200" fill="none" stroke="#E2D8C2" strokeWidth="2" strokeDasharray="7 7"/>
      <path d="M260 -10 230 160 300 350" fill="none" stroke="#fff" strokeWidth="5"/>
      {/* zones boisées */}
      {[[330,70,26],[355,95,18],[60,90,22],[85,75,15],[300,280,24],[40,300,18]].map((c,i)=>(
        <circle key={i} cx={c[0]} cy={c[1]} r={c[2]} fill="#BFD3AE"/>
      ))}
      {/* rayon d'intervention */}
      <circle cx="200" cy="180" r="120" fill="rgba(79,122,74,.10)" stroke="var(--meadow)" strokeWidth="2" strokeDasharray="6 8"/>
      {/* épingle principale — Le Perrey */}
      <g transform="translate(200 180)">
        <ellipse cx="0" cy="22" rx="16" ry="5" fill="rgba(0,0,0,.15)"/>
        <path d="M0-28a18 18 0 0 0-18 18c0 13 18 30 18 30s18-17 18-30A18 18 0 0 0 0-28Z" fill="var(--cta)"/>
        <circle cx="0" cy="-10" r="7" fill="#fff"/>
      </g>
      {/* villes secondaires */}
      {[[110,110,"Pont-Audemer"],[300,130,"Cormeilles"],[150,270,"Montfort"],[280,250,"Routot"]].map((c,i)=>(
        <g key={i} transform={`translate(${c[0]} ${c[1]})`}>
          <circle r="5" fill="var(--forest)"/>
          <text x="9" y="4" fontSize="13" fontFamily="Inter, sans-serif" fill="var(--ink)">{c[2]}</text>
        </g>
      ))}
      <g transform="translate(200 180)">
        <text x="0" y="-36" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Archivo, sans-serif" fill="var(--forest)">Le Perrey</text>
      </g>
    </svg>
  );
}

function Zone({ onQuote }) {
  return (
    <section className="section" id="zone">
      <div className="wrap zone-grid">
        <div className="zone-copy reveal">
          <span className="eyebrow">Zone d'intervention</span>
          <h2 className="h-section">Le Perrey et tout le Pays de Risle</h2>
          <p className="lead">Basé au Perrey, Hervé Duval intervient autour de Pont-Audemer et dans tout l'est de l'Eure, dans un rayon d'environ 30 km.</p>
          <ul className="commune-list">
            {COMMUNES.map((c, i) => (
              <li key={i}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--meadow)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                {c}
              </li>
            ))}
          </ul>
          <p className="muted zone-note">Votre commune n'est pas listée ? Demandez quand même — on couvre les environs.</p>
          <button className="btn btn--ghost" onClick={onQuote}>Vérifier ma commune & demander un devis</button>
        </div>
        <div className="zone-map-wrap card reveal">
          <StylizedMap />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  Header, Hero, TrustBar, Prestations, Pourquoi, Avis, Zone, Icon, Mark,
  PHONE_DISPLAY, PHONE_TEL, EMAIL,
});
