"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Hidden client-demo panel. NOT shown in production by default — appears only
 * when the URL has ?demo=1 or after pressing Ctrl+Shift+D. Lets you show clients
 * different visual directions live by toggling the data-* attributes on <html>
 * that the globals.css design system reacts to.
 *
 * Self-contained (scoped styles below); the prototype's host-protocol Tweaks
 * panel is intentionally NOT ported. Palette/glass/radius/background changes are
 * ephemeral (reset on reload); theme persists via ThemeProvider.
 */

type Opt = { v: string; label: string };

const PALETTES = [
  { key: "ocean", name: "Océan — Indigo · Cyan", sw: ["#6366f1", "#22d3ee", "#2dd4bf"] },
  { key: "aurore", name: "Aurore — Violet · Magenta", sw: ["#8b5cf6", "#d946ef", "#ec4899"] },
  { key: "foret", name: "Forêt — Émeraude · Teal", sw: ["#0d9488", "#10b981", "#34d399"] },
  { key: "sunset", name: "Coucher de soleil — Orange", sw: ["#fb7185", "#f97316", "#fbbf24"] },
  { key: "nuit", name: "Nuit dorée — Bleu · Or", sw: ["#4263eb", "#fcc419", "#f59f00"] },
  { key: "ardoise", name: "Ardoise — Bleu sobre", sw: ["#64748b", "#38bdf8", "#60a5fa"] },
];

const GLASS: Opt[] = [
  { v: "subtil", label: "Subtil" },
  { v: "standard", label: "Standard" },
  { v: "prononce", label: "Prononcé" },
];
const RADIUS: Opt[] = [
  { v: "doux", label: "Doux" },
  { v: "standard", label: "Standard" },
  { v: "genereux", label: "Généreux" },
];
const BG: Opt[] = [
  { v: "aurora", label: "Aurora" },
  { v: "degrade", label: "Fixe" },
  { v: "minimal", label: "Minimal" },
];

function Seg({ value, options, onChange }: { value: string; options: Opt[]; onChange: (v: string) => void }) {
  return (
    <div className="sa-demo-seg" role="radiogroup">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          className={value === o.v ? "on" : ""}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function DemoSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [palette, setPalette] = useState("ocean");
  const [glass, setGlass] = useState("standard");
  const [radius, setRadius] = useState("standard");
  const [bg, setBg] = useState("aurora");

  useEffect(() => {
    setMounted(true);
    const r = document.documentElement;
    setPalette(r.getAttribute("data-palette") || "ocean");
    setGlass(r.getAttribute("data-glass") || "standard");
    setRadius(r.getAttribute("data-radius") || "standard");
    setBg(r.getAttribute("data-bg") || "aurora");

    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "1") setOpen(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const applyAttr = (attr: string, val: string, setter: (v: string) => void) => {
    document.documentElement.setAttribute(attr, val);
    setter(val);
  };

  if (!mounted || !open) return null;

  return (
    <>
      <style>{STYLE}</style>
      <div className="sa-demo" role="dialog" aria-label="Personnaliser l’apparence">
        <div className="sa-demo-hd">
          <b>Personnaliser</b>
          <button type="button" className="sa-demo-x" aria-label="Fermer" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="sa-demo-body">
          <div className="sa-demo-sect">Couleurs</div>
          <div className="sa-demo-row">
            <span className="sa-demo-lbl">Palette</span>
            <div className="sa-demo-chips" role="radiogroup">
              {PALETTES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  role="radio"
                  aria-checked={palette === p.key}
                  aria-label={p.name}
                  title={p.name}
                  className={"sa-demo-chip" + (palette === p.key ? " on" : "")}
                  style={{ background: `linear-gradient(135deg, ${p.sw[0]}, ${p.sw[1]}, ${p.sw[2]})` }}
                  onClick={() => applyAttr("data-palette", p.key, setPalette)}
                />
              ))}
            </div>
          </div>
          <div className="sa-demo-row">
            <span className="sa-demo-lbl">Thème</span>
            <Seg
              value={theme}
              options={[
                { v: "dark", label: "Sombre" },
                { v: "light", label: "Clair" },
              ]}
              onChange={(v) => setTheme(v as "dark" | "light")}
            />
          </div>

          <div className="sa-demo-sect">Effet verre</div>
          <div className="sa-demo-row">
            <span className="sa-demo-lbl">Intensité du flou</span>
            <Seg value={glass} options={GLASS} onChange={(v) => applyAttr("data-glass", v, setGlass)} />
          </div>
          <div className="sa-demo-row">
            <span className="sa-demo-lbl">Arrondi des angles</span>
            <Seg value={radius} options={RADIUS} onChange={(v) => applyAttr("data-radius", v, setRadius)} />
          </div>

          <div className="sa-demo-sect">Arrière-plan</div>
          <div className="sa-demo-row">
            <span className="sa-demo-lbl">Style de fond</span>
            <Seg value={bg} options={BG} onChange={(v) => applyAttr("data-bg", v, setBg)} />
          </div>
        </div>
      </div>
    </>
  );
}

const STYLE = `
.sa-demo{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:288px;
  max-height:calc(100vh - 32px);display:flex;flex-direction:column;overflow:hidden;
  background:var(--glass-fill-strong);color:var(--text);
  -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
  border:1px solid var(--glass-border-strong);border-radius:16px;
  box-shadow:var(--shadow-glass),inset 0 1px 0 var(--glass-hi);
  font-family:var(--font-body);font-size:12px;line-height:1.4}
.sa-demo-hd{display:flex;align-items:center;justify-content:space-between;padding:12px 12px 10px 16px}
.sa-demo-hd b{font-family:var(--font-display);font-size:13px;font-weight:600}
.sa-demo-x{appearance:none;border:0;background:transparent;color:var(--text-faint);width:24px;height:24px;
  border-radius:7px;cursor:pointer;font-size:13px;line-height:1}
.sa-demo-x:hover{background:var(--glass-fill);color:var(--text)}
.sa-demo-body{padding:0 16px 16px;display:flex;flex-direction:column;gap:11px;overflow-y:auto}
.sa-demo-sect{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  color:var(--text-faint);padding-top:6px}
.sa-demo-row{display:flex;flex-direction:column;gap:6px}
.sa-demo-lbl{color:var(--text-muted);font-weight:600}
.sa-demo-seg{display:flex;gap:4px;padding:3px;border-radius:9px;background:var(--glass-fill);
  border:1px solid var(--glass-border)}
.sa-demo-seg button{flex:1;appearance:none;border:0;background:transparent;color:var(--text-muted);
  font:inherit;font-weight:600;padding:6px 4px;border-radius:6px;cursor:pointer;transition:background .15s,color .15s}
.sa-demo-seg button.on{background:linear-gradient(100deg,var(--cyan),var(--turquoise));color:#04121a}
.sa-demo-chips{display:flex;gap:7px}
.sa-demo-chip{flex:1;height:34px;appearance:none;border:1px solid var(--glass-border);border-radius:8px;
  cursor:pointer;padding:0;transition:transform .12s,box-shadow .12s,border-color .12s}
.sa-demo-chip:hover{transform:translateY(-1px)}
.sa-demo-chip.on{border-color:var(--text);box-shadow:0 0 0 2px var(--cyan)}
`;
