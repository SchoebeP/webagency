// tweaks.jsx — Panneau de personnalisation (couleurs + versions de style)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "ocean",
  "theme": "dark",
  "glass": "standard",
  "radius": "standard",
  "background": "aurora"
}/*EDITMODE-END*/;

const PALETTES = [
  { key: 'ocean',   name: 'Océan — Indigo · Cyan',        sw: ['#6366f1', '#22d3ee', '#2dd4bf'] },
  { key: 'aurore',  name: 'Aurore — Violet · Magenta',    sw: ['#8b5cf6', '#d946ef', '#ec4899'] },
  { key: 'foret',   name: 'Forêt — Émeraude · Teal',      sw: ['#0d9488', '#10b981', '#34d399'] },
  { key: 'sunset',  name: 'Coucher de soleil — Orange',   sw: ['#fb7185', '#f97316', '#fbbf24'] },
  { key: 'nuit',    name: 'Nuit dorée — Bleu · Or',       sw: ['#4263eb', '#fcc419', '#f59f00'] },
  { key: 'ardoise', name: 'Ardoise — Bleu sobre',         sw: ['#64748b', '#38bdf8', '#60a5fa'] },
];
const swatchFor = (k) => (PALETTES.find((p) => p.key === k) || PALETTES[0]).sw;
const keyFor = (arr) => {
  const s = JSON.stringify(arr);
  const m = PALETTES.find((p) => JSON.stringify(p.sw) === s);
  return m ? m.key : 'ocean';
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync theme once from the existing header toggle / localStorage on mount.
  React.useEffect(() => {
    const saved = localStorage.getItem('awn-theme');
    if (saved && saved !== t.theme) setTweak('theme', saved);
    const onHeaderToggle = (e) => setTweak('theme', e.detail);
    window.addEventListener('awn-theme-change', onHeaderToggle);
    return () => window.removeEventListener('awn-theme-change', onHeaderToggle);
    // eslint-disable-next-line
  }, []);

  // Apply every tweak to <html> so the whole CSS system re-skins.
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-palette', t.palette);
    r.setAttribute('data-theme', t.theme);
    r.setAttribute('data-glass', t.glass);
    r.setAttribute('data-radius', t.radius);
    r.setAttribute('data-bg', t.background);
    localStorage.setItem('awn-theme', t.theme);
  }, [t]);

  const activeName = (PALETTES.find((p) => p.key === t.palette) || PALETTES[0]).name;

  return (
    <TweaksPanel title="Personnaliser">
      <TweakSection label="Couleurs" />
      <TweakColor label="Palette" value={swatchFor(t.palette)}
                  options={PALETTES.map((p) => p.sw)}
                  onChange={(arr) => setTweak('palette', keyFor(arr))} />
      <div style={{ fontSize: '10.5px', opacity: 0.6, marginTop: '-2px' }}>{activeName}</div>
      <TweakRadio label="Thème" value={t.theme}
                  options={[{ value: 'dark', label: 'Sombre' }, { value: 'light', label: 'Clair' }]}
                  onChange={(v) => setTweak('theme', v)} />

      <TweakSection label="Effet verre" />
      <TweakRadio label="Intensité du flou" value={t.glass}
                  options={[{ value: 'subtil', label: 'Subtil' }, { value: 'standard', label: 'Standard' }, { value: 'prononce', label: 'Prononcé' }]}
                  onChange={(v) => setTweak('glass', v)} />
      <TweakRadio label="Arrondi des angles" value={t.radius}
                  options={[{ value: 'doux', label: 'Doux' }, { value: 'standard', label: 'Standard' }, { value: 'genereux', label: 'Généreux' }]}
                  onChange={(v) => setTweak('radius', v)} />

      <TweakSection label="Arrière-plan" />
      <TweakRadio label="Style de fond" value={t.background}
                  options={[{ value: 'aurora', label: 'Aurora' }, { value: 'degrade', label: 'Fixe' }, { value: 'minimal', label: 'Minimal' }]}
                  onChange={(v) => setTweak('background', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
