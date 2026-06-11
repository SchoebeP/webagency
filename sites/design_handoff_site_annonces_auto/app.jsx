// Application principale — Rouvier Automobiles
const { useState: useAppState, useEffect: useAppEffect } = React;

// ===== Directions visuelles =====
const THEMES = {
  epure: {
    label: "Épuré",
    radius: "14px", radiusSm: "10px", accent: "#2B5CE6",
    light: { bg: "#F5F6F8", surface: "#FFFFFF", text: "#15181E", muted: "#5E6673", border: "#E3E6EB", shadow: "0 10px 30px -14px rgba(21,24,30,0.14)", lift: "0 18px 40px -16px rgba(21,24,30,0.22)" },
    dark: { bg: "#0F1115", surface: "#171A21", text: "#F2F4F8", muted: "#99A2B0", border: "#272C36", shadow: "0 12px 32px -14px rgba(0,0,0,0.55)", lift: "0 20px 44px -16px rgba(0,0,0,0.65)" }
  },
  premium: {
    label: "Premium",
    radius: "6px", radiusSm: "4px", accent: "#A8842C",
    light: { bg: "#F5F2EA", surface: "#FFFDF8", text: "#1D1A14", muted: "#6F675A", border: "#E4DCCB", shadow: "0 10px 30px -14px rgba(46,38,22,0.15)", lift: "0 18px 40px -16px rgba(46,38,22,0.24)" },
    dark: { bg: "#0D0C09", surface: "#171510", text: "#F1ECE0", muted: "#A59C89", border: "#2C2920", shadow: "0 12px 34px -14px rgba(0,0,0,0.6)", lift: "0 20px 46px -16px rgba(0,0,0,0.7)" }
  },
  chaleureux: {
    label: "Chaleureux",
    radius: "20px", radiusSm: "12px", accent: "#C8552F",
    light: { bg: "#FAF4EB", surface: "#FFFFFF", text: "#2B241C", muted: "#7A6F61", border: "#ECE0CD", shadow: "0 10px 30px -14px rgba(82,62,38,0.14)", lift: "0 18px 40px -16px rgba(82,62,38,0.22)" },
    dark: { bg: "#1C1712", surface: "#27211A", text: "#F5EEE3", muted: "#B2A593", border: "#3B3326", shadow: "0 12px 32px -14px rgba(0,0,0,0.55)", lift: "0 20px 44px -16px rgba(0,0,0,0.65)" }
  }
};

// Variante éclaircie de chaque accent pour le mode sombre
const DARK_ACCENT = {
  "#2B5CE6": "#6489F2",
  "#A8842C": "#C9A24B",
  "#C8552F": "#E0714A",
  "#1F6E50": "#3C9A75"
};

const TYPOS = {
  moderne: { label: "Moderne", display: "'Space Grotesk'", body: "'Manrope'", tracking: "-0.015em" },
  elegante: { label: "Élégante", display: "'Marcellus'", body: "'Figtree'", tracking: "0.01em" },
  caractere: { label: "Caractère", display: "'Bricolage Grotesque'", body: "'Albert Sans'", tracking: "-0.005em" }
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "epure",
  "typo": "moderne",
  "dark": false,
  "accent": ""
}/*EDITMODE-END*/;

// ===== Persistance route / favoris =====
function loadJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v == null ? fallback : v;
  } catch (e) { return fallback; }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useAppState(() => loadJSON("rouvier.route", { page: "home", carId: null, filters: {} }));
  const [favs, setFavs] = useAppState(() => loadJSON("rouvier.favs", []));

  useAppEffect(() => { localStorage.setItem("rouvier.route", JSON.stringify(route)); }, [route]);
  useAppEffect(() => { localStorage.setItem("rouvier.favs", JSON.stringify(favs)); }, [favs]);

  const navigate = (page, extra) => {
    setRoute({ page, carId: null, filters: {}, ...(extra || {}) });
    window.scrollTo(0, 0);
  };
  const toggleFav = (id) => {
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  // ===== Application du thème =====
  const theme = THEMES[t.direction] || THEMES.epure;
  const typo = TYPOS[t.typo] || TYPOS.moderne;
  const mode = t.dark ? theme.dark : theme.light;
  const baseAccent = t.accent || theme.accent;
  const accent = t.dark ? (DARK_ACCENT[baseAccent] || baseAccent) : baseAccent;

  const themeVars = {
    "--bg": mode.bg,
    "--surface": mode.surface,
    "--text": mode.text,
    "--muted": mode.muted,
    "--border": mode.border,
    "--shadow": mode.shadow,
    "--shadow-lift": mode.lift,
    "--accent": accent,
    "--on-accent": "#FFFFFF",
    "--radius": theme.radius,
    "--radius-sm": theme.radiusSm,
    "--font-display": typo.display,
    "--font-body": typo.body,
    "--display-tracking": typo.tracking
  };

  const headerPage = route.page === "listing" && route.favsOnly ? "favs" : route.page === "detail" ? "listing" : route.page;

  return (
    <div className="app" style={themeVars}>
      <Header
        page={headerPage}
        favCount={favs.length}
        onNav={(p) => {
          if (p === "favs") navigate("listing", { favsOnly: true });
          else navigate(p === "listing" ? "listing" : "home");
        }}
      />
      {route.page === "home" ? (
        <HomePage
          favs={favs}
          toggleFav={toggleFav}
          openCar={(id) => navigate("detail", { carId: id })}
          goListing={(filters) => navigate("listing", { filters: filters || {} })}
        />
      ) : null}
      {route.page === "listing" ? (
        <ListingPage
          key={JSON.stringify(route.filters) + (route.favsOnly ? "-favs" : "")}
          favs={favs}
          toggleFav={toggleFav}
          openCar={(id) => navigate("detail", { carId: id })}
          initialFilters={route.filters || {}}
          favsOnly={route.favsOnly}
        />
      ) : null}
      {route.page === "detail" ? (
        <DetailPage
          carId={route.carId}
          favs={favs}
          toggleFav={toggleFav}
          goBack={() => navigate("listing")}
        />
      ) : null}
      <Footer />

      <TweaksPanel>
        <TweakSection label="Direction visuelle" />
        <TweakRadio
          label="Ambiance"
          value={theme.label}
          options={Object.values(THEMES).map((th) => th.label)}
          onChange={(label) => {
            const key = Object.keys(THEMES).find((k) => THEMES[k].label === label);
            setTweak("direction", key);
          }}
        />
        <TweakToggle label="Mode sombre" value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakSection label="Style" />
        <TweakRadio
          label="Typographie"
          value={typo.label}
          options={Object.values(TYPOS).map((ty) => ty.label)}
          onChange={(label) => {
            const key = Object.keys(TYPOS).find((k) => TYPOS[k].label === label);
            setTweak("typo", key);
          }}
        />
        <TweakColor
          label="Couleur d'accent"
          value={baseAccent}
          options={["#2B5CE6", "#A8842C", "#C8552F", "#1F6E50"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakButton label="Accent par défaut de l'ambiance" onClick={() => setTweak("accent", "")} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
