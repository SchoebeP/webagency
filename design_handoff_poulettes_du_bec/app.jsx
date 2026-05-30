/* App principale — Les Poulettes du Bec */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "classic",
  "heroPhoto": "heroIntimate",
  "heroTitle": "La table chaleureuse du Bec-Hellouin.",
  "accent": "#B0532F",
  "showStrip": true
}/*EDITMODE-END*/;

const HERO_PHOTOS = [
  { id: "heroIntimate", label: "Table dressée" },
  { id: "heroConvivial", label: "Convivial" },
  { id: "heroRoom", label: "La salle" }
];
const HERO_VARIANTS = ["classic", "split", "panel"];
const VARIANT_FR = { classic: "Plein cadre", split: "Latéral", panel: "Panneau" };
const ACCENTS = ["#B0532F", "#6E2A2A", "#8A9A7B", "#C2A14D"];

function MobileCTA() {
  const show = useScrolled(420);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className={"mobile-cta" + (show ? " show" : "")} aria-hidden={!show}>
      <a href="#carte" className="btn btn--ghost" onClick={(e) => { e.preventDefault(); go("carte"); }} tabIndex={show ? 0 : -1}>Voir la carte</a>
      <a href="#reserver" className="btn btn--primary" onClick={(e) => { e.preventDefault(); go("reserver"); }} tabIndex={show ? 0 : -1}>
        <Ico.calendar s={18} /> Réserver
      </a>
    </div>
  );
}

function Footer({ info }) {
  const go = (e, id) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <span className="brand__name" style={{ fontFamily: "var(--serif)", fontSize: "1.4rem" }}>Les Poulettes du Bec</span>
          <p>Bar, restaurant, salon de thé & petite boutique cadeaux, au cœur du Bec-Hellouin — l'un des Plus Beaux Villages de France.</p>
          <a href="#reserver" className="btn btn--primary" style={{ marginTop: "1.2rem" }} onClick={(e) => go(e, "reserver")}>
            <Ico.calendar s={18} /> Réserver une table
          </a>
        </div>
        <div className="footer">
          <h4>Le restaurant</h4>
          <ul>
            <li><a href="#histoire" onClick={(e) => go(e, "histoire")}>Notre histoire</a></li>
            <li><a href="#carte" onClick={(e) => go(e, "carte")}>La carte</a></li>
            <li><a href="#galerie" onClick={(e) => go(e, "galerie")}>Galerie</a></li>
            <li><a href="#avis" onClick={(e) => go(e, "avis")}>Avis</a></li>
          </ul>
        </div>
        <div className="footer">
          <h4>Nous contacter</h4>
          <ul>
            <li><a href={info.phoneHref}>{info.phone}</a></li>
            <li>{info.village}, Normandie</li>
            <li>Lun–Mer & Dim : 10h–18h30</li>
            <li>Ven–Sam : 10h–21h · Jeudi fermé</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} Les Poulettes du Bec — Tous droits réservés.</span>
        <span style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">Plan du site</a>
        </span>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const D = window.LPDB;
  const todayDow = new Date().getDay();
  const todayLabel = (() => {
    const h = D.hours.find((x) => x.dow === todayDow);
    return h && !h.closed ? "aujourd'hui · " + h.time : "ven & sam jusqu'à 21h";
  })();

  // appliquer la couleur d'accent
  React.useEffect(() => {
    document.documentElement.style.setProperty("--terracotta", t.accent);
  }, [t.accent]);

  const heroImg = D.images[t.heroPhoto] || D.images.heroIntimate;

  return (
    <>
      <a className="skip" href="#carte">Aller à la carte</a>
      <Header />
      <Hero variant={t.heroVariant} heroImg={heroImg} title={t.heroTitle}
        sub="Bar, restaurant & salon de thé de village — cuisine maison, produits frais et locaux, à deux pas de l'abbaye." />
      {t.showStrip && <HeroStrip todayLabel={todayLabel} />}
      <Histoire portraitSrc={D.images.pastry} />
      <Carte menu={D.menu} images={D.images} />
      <Galerie images={D.images} />
      <Avis reviews={D.reviews} />
      <Infos hours={D.hours} info={D.info} todayDow={todayDow} />
      <Reservation phone={D.info.phone} phoneHref={D.info.phoneHref} />
      <Footer info={D.info} />
      <MobileCTA />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Mise en page" value={t.heroVariant}
          options={HERO_VARIANTS.map((v) => ({ value: v, label: VARIANT_FR[v] }))}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakSelect label="Photo du hero" value={t.heroPhoto}
          options={HERO_PHOTOS.map((p) => ({ value: p.id, label: p.label }))}
          onChange={(v) => setTweak("heroPhoto", v)} />
        <TweakText label="Titre" value={t.heroTitle} onChange={(v) => setTweak("heroTitle", v)} />
        <TweakSection label="Ambiance" />
        <TweakColor label="Couleur d'accent" value={t.accent} options={ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakToggle label="Bandeau infos sous le hero" value={t.showStrip}
          onChange={(v) => setTweak("showStrip", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);