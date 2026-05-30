/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useEffect: useEffectA, useState: useStateA } = React;

/* ----------------------------------------------------------------
   FOOTER
----------------------------------------------------------------- */
function Footer({ onQuote }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <div className="brand brand--footer">
            <window.Mark size={40} color="#7BA36F" />
            <span className="brand__text">
              <span className="brand__name">Duval Paysage</span>
              <span className="brand__tag">Hervé Duval · Paysagiste</span>
            </span>
          </div>
          <p className="muted-light">Élagage, taille, entretien et aménagement de jardins dans le Pays de Risle, autour de Pont-Audemer (Eure).</p>
        </div>
        <div className="site-footer__col">
          <h4>Contact</h4>
          <a href={"tel:" + window.PHONE_TEL}>{window.PHONE_DISPLAY}</a>
          <a href={"mailto:" + window.EMAIL}>{window.EMAIL}</a>
          <span>Le Perrey, 27500 Eure</span>
        </div>
        <div className="site-footer__col">
          <h4>Prestations</h4>
          <a href="#prestations">Élagage & abattage</a>
          <a href="#prestations">Taille de haies</a>
          <a href="#prestations">Clôtures & maçonnerie</a>
          <a href="#prestations">Entretien de jardins</a>
        </div>
        <div className="site-footer__cta">
          <h4>Un projet de jardin ?</h4>
          <button className="btn btn--onforest btn--block" onClick={onQuote}>Devis gratuit</button>
          <span className="stars">★★★★★</span>
          <span className="muted-light">5,0 / 5 · 92 avis Google</span>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        <span>© {new Date().getFullYear()} Duval Paysage — Hervé Duval. Tous droits réservés.</span>
        <span>SIRET à compléter · Crédit d'impôt services à la personne · Mentions légales</span>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------
   STICKY CTA mobile
----------------------------------------------------------------- */
function StickyCTA({ onQuote }) {
  const [show, setShow] = useStateA(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={"sticky-cta" + (show ? " is-show" : "")}>
      <a href={"tel:" + window.PHONE_TEL} className="sticky-cta__call">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
        <span>Appeler</span>
      </a>
      <button className="btn sticky-cta__quote" onClick={onQuote}>Devis gratuit</button>
    </div>
  );
}

/* ----------------------------------------------------------------
   Reveal on scroll
----------------------------------------------------------------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ----------------------------------------------------------------
   APP
----------------------------------------------------------------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "plein",
  "headFont": "Archivo",
  "ctaColor": "#C8772E",
  "beforeAfterLabels": true
}/*EDITMODE-END*/;

const HEAD_FONTS = {
  "Archivo": '"Archivo", system-ui, sans-serif',
  "Barlow Condensed": '"Barlow Condensed", system-ui, sans-serif',
  "Bricolage": '"Bricolage Grotesque", system-ui, sans-serif',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const goQuote = () => {
    const el = document.getElementById("devis");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--font-head", HEAD_FONTS[t.headFont] || HEAD_FONTS.Archivo);
    document.documentElement.style.setProperty("--cta", t.ctaColor);
    // assombrir légèrement pour l'état actif
    document.documentElement.style.setProperty("--cta-d", shade(t.ctaColor, -0.18));
    document.documentElement.style.setProperty("--head-weight", t.headFont === "Barlow Condensed" ? "700" : "800");
  }, [t.headFont, t.ctaColor]);

  useEffect(() => {
    document.body.classList.toggle("hide-ba-labels", !t.beforeAfterLabels);
  }, [t.beforeAfterLabels]);

  useReveal();

  return (
    <React.Fragment>
      <window.Header onQuote={goQuote} />
      <main>
        <window.Hero variant={t.heroVariant} onQuote={goQuote} />
        <window.Prestations onQuote={goQuote} />
        <window.Realisations onQuote={goQuote} />
        <window.Pourquoi />
        <window.Avis />
        <window.Zone onQuote={goQuote} />
        <window.Devis />
      </main>
      <Footer onQuote={goQuote} />
      <StickyCTA onQuote={goQuote} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Mise en page" value={t.heroVariant}
          options={["plein", "split", "editorial"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakSection label="Typographie" />
        <TweakRadio label="Titres" value={t.headFont}
          options={["Archivo", "Barlow Condensed", "Bricolage"]}
          onChange={(v) => setTweak("headFont", v)} />
        <TweakSection label="Couleur CTA" />
        <TweakColor label="Bouton" value={t.ctaColor}
          options={["#C8772E", "#B5471F", "#4F7A4A", "#1F3D2B"]}
          onChange={(v) => setTweak("ctaColor", v)} />
        <TweakSection label="Réalisations" />
        <TweakToggle label="Étiquettes Avant / Après" value={t.beforeAfterLabels}
          onChange={(v) => setTweak("beforeAfterLabels", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

/* éclaircir / assombrir une couleur hex */
function shade(hex, amt) {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + r * amt)));
  g = Math.max(0, Math.min(255, Math.round(g + g * amt)));
  b = Math.max(0, Math.min(255, Math.round(b + b * amt)));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
