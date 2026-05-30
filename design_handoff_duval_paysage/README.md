# Handoff — Duval Paysage (site vitrine paysagiste)

## Overview
One-page marketing/conversion website for **Duval Paysage**, a landscaping sole-trader (Hervé Duval) based in Le Perrey, in the *Pays de Risle* area of the Eure département (Normandy, France). The entire site funnels visitors toward a single goal: **request a free quote ("Devis gratuit")** by form or phone. Secondary goals: build trust (reviews, before/after proof) and communicate the service area.

Language: **French**. All UI copy is in French and should remain so.

## About the Design Files
The files in this bundle are **design references built in HTML/CSS/React (via in-browser Babel)** — a working prototype that demonstrates the intended look, layout, and interactions. They are **not** meant to be shipped as-is.

The task is to **recreate these designs in the target codebase's environment**, using its established conventions, component library, and build pipeline. If there is no existing environment, a static-site or lightweight React/Vue/Astro setup is appropriate — this is a brochure site with one interactive form and a couple of client-side widgets, so it does **not** need a heavy SPA framework. Plain HTML/CSS + a sprinkle of JS, or Astro, would be ideal for performance and SEO.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all defined here and should be reproduced faithfully. Exact tokens are listed below.

---

## Page Structure (single page, top → bottom)
1. **Header** — sticky, transparent over hero then solid on scroll
2. **Hero** — 3 layout variants exist (see below); default = `plein` (full-bleed photo)
3. **Prestations** — services grid (8 cards)
4. **Réalisations** — before/after draggable sliders (4 items)
5. **Pourquoi** — 4 reasons + tax-credit note (dark forest section)
6. **Avis** — 3 Google-style reviews (sand section)
7. **Zone** — service area copy + stylized SVG map
8. **Devis** — quote form (dark forest section)
9. **Footer** — contact, links, CTA (darkest forest)
10. **Sticky mobile CTA bar** — appears after scrolling, mobile only

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--forest` | `#1F3D2B` | Primary brand green, headings, dark sections |
| `--forest-d` | `#16301F` | Darker forest, footer bg, button shadows |
| `--meadow` | `#4F7A4A` | Accent green, eyebrows, icons, focus ring |
| `--meadow-d` | `#3E6239` | Meadow active/hover |
| `--earth` | `#6B5844` | Earth/taupe, brand tagline, "before" tag, dashed borders |
| `--sand` | `#F1ECE2` | Light sand section bg, icon chips |
| `--offwhite` | `#FBF8F1` | Page background |
| `--ink` | `#232323` | Body text |
| `--ink-soft` | `#4A4A45` | Muted/secondary text |
| `--line` | `#E2DAC9` | Borders, input outlines |
| `--cta` | `#C8772E` | **Primary CTA orange** (buttons) |
| `--cta-d` | `#AC621F` | CTA active/hover + 4px bottom shadow |
| `--star` | `#E8A21C` | Star rating gold |

CTA color is tweakable; alternatives offered: `#C8772E` (orange, default), `#B5471F` (terracotta), `#4F7A4A` (meadow), `#1F3D2B` (forest).

### Typography
- **Headings** (`--font-head`): **Archivo** (weights 700/800/900), default weight 800, letter-spacing `-0.01em`, line-height ~1.04, `text-wrap: balance`. Tweakable alternatives: *Barlow Condensed* (700), *Bricolage Grotesque*.
- **Body** (`--font-body`): **Inter** (400/500/600/700), base 17px, line-height 1.6.
- Loaded via Google Fonts. Swap for self-hosted in production.

Heading scale (clamp, responsive):
- `.h-display` (hero H1): `clamp(2.3rem, 6.2vw, 4.4rem)`, line-height 1.0
- `.h-section` (section H2): `clamp(1.9rem, 4.2vw, 3rem)`
- `.eyebrow` (kicker): Archivo 700, 0.82rem, uppercase, letter-spacing 0.16em, color meadow, with a 26×2px leading rule. Light variant `#BFE3B0` on dark sections.
- `.lead` (intro paragraph): `clamp(1.05rem, 1.6vw, 1.22rem)`, color ink-soft, max-width 56ch.

### Spacing / Shape / Elevation
- Section vertical padding: `clamp(56px, 8vw, 104px)`
- Page max width: `1200px`; gutter: `clamp(20px, 5vw, 56px)`
- Header height: `72px`
- Radius: `--radius: 8px`, `--radius-sm: 6px`
- Shadows: `--shadow-sm`, `--shadow`, `--shadow-lg` (soft, green-tinted — see styles.css)

### Buttons (signature element)
Bold, high-contrast, with a **solid 4px bottom shadow** that compresses on `:active` (translateY 3px) — a tactile "physical button" feel.
- `.btn` — orange CTA, Archivo 800, 1.08rem, min-height 58px, padding 18×30px, `box-shadow: 0 4px 0 var(--cta-d), <soft shadow>`
- `.btn--lg` — 1.2rem, min-height 66px (hero)
- `.btn--ghost` — transparent, 2px forest inset border
- `.btn--phone` — forest green fill (phone CTAs)
- `.btn--onforest` — white fill (on dark sections)
- `.btn--block` — full width

---

## Screens / Sections — detail

### 1. Header
- **Layout**: flex row, `min-height 72px`, max-width 1200 + gutter. Brand (mark + name) pushed left with `margin-right:auto`; center nav; right CTA cluster.
- **Brand**: SVG leaf/tree mark (36px) + "Duval Paysage" (Archivo 800, 1.32rem, forest) over tagline "Paysagiste · Pays de Risle" (0.72rem, earth).
- **Nav** (≥900px only): Prestations, Réalisations, Avis, Zone — Inter 600, 0.98rem, opacity 0.85 → 1 on hover.
- **CTA cluster**: phone link (Archivo 700, forest, ≥900px only) + orange "Devis gratuit" button (compact: min-height 48px).
- **Behavior**: transparent at top; on `scroll > 24px` adds `.is-solid` → offwhite bg, bottom border, subtle shadow (transition 0.25s).

### 2. Hero — THREE variants (toggle via Tweaks; default `plein`)
Shared content:
- Eyebrow: "Paysagiste · Le Perrey, Eure" (light variant on photo)
- **H1**: "Votre jardin entre de bonnes mains, dans le Pays de Risle."
- **Lead**: "Élagage, taille de haies, entretien et aménagement. Travail soigné, débris évacués, devis gratuit — par Hervé Duval, paysagiste au Perrey."
- **Actions**: orange "Demander un devis gratuit" (→ scrolls to #devis) + glassy/forest phone button.
- **TrustBar**: 4 stats — "5,0 ★★★★★ · 92 avis Google", "Devis gratuit & sans engagement", "Crédit d'impôt services à la personne", "20+ chantiers réalisés / an".

Variants:
- **`plein`** (default): full-bleed background photo, `min-height 86vh`, content bottom-left in a 760px column, left-weighted dark scrim so the photo stays visible on the right. White H1. Ghost trustbar.
- **`split`**: light bg, two-column grid (≥900px: 1.05fr / 1fr). Left = copy + card trustbar; right = portrait photo (aspect 3/4, max-h 560px) with a floating rating badge card overlapping the bottom-left.
- **`editorial`**: centered text over full-bleed photo, `min-height 84vh`, card-style trustbar strip below.

Scrims are layered linear-gradients (forest `#12281B` at varying alpha) — see `.hero__scrim` / `.hero__scrim--left` in site.css. Goal: legible white text left, photo visible right/center.

### 3. Prestations (services)
- **Layout**: responsive grid — 1 col (mobile) → 2 (≥600px) → 4 (≥900px), gap 16px.
- **8 cards** (`.service-card`, white, 1px line border, soft shadow, padding 26×24px): icon chip (58px, sand bg, forest stroke icon) + H3 (1.22rem) + description (0.97rem, ink-soft). Hover: lift 4px, meadow border, bigger shadow.
- Services: Élagage; Abattage; Taille de haies; Tonte & débroussaillage; Clôtures & portails; Maçonnerie paysagère; Dessouchage; Entretien de jardins. (Exact copy in `components.jsx` → `SERVICES`.)
- **CTA strip** below grid: sand panel, headline + orange button.
- Icons are inline SVG line icons (1.7 stroke), defined in `components.jsx` → `Icon`.

### 4. Réalisations (before/after)
- **Layout**: grid 1 col → 2 (≥600px), gap 22px.
- **4 before/after cards** (`.ba`). Each: a 4:3 frame containing two stacked images; the "before" (top) layer is clipped via `clip-path: inset(0 <100-pos>% 0 0)`; a draggable handle at `left: pos%`.
- **Handle**: white 3px vertical line + 46px white circular grip with a left/right chevron icon, centered.
- **Interaction**: drag with mouse OR touch (tracks pointer across the whole window during drag); keyboard accessible (`role="slider"`, tabIndex 0, ArrowLeft/Right ±4%). Position clamped 2–98%.
- **Tags**: "Avant" (earth bg, top-left), "Après" (meadow bg, top-right) — toggleable via Tweaks (`hide-ba-labels` body class hides them).
- **Caption**: title (1.18rem) + commune (muted).
- Items + copy in `gallery.jsx` → `PROJECTS`.

### 5. Pourquoi (dark forest section)
- `section--forest` (forest bg, white text). Eyebrow (light) + H2 "Le sérieux d'un artisan, la propreté d'un pro".
- **4 reasons** grid (1 → 4 cols ≥900px): each a left meadow 3px border, number kicker (`01`–`04`, light green), H3 (1.3rem white), description (white 82% alpha). Copy in `components.jsx` → `REASONS`.
- **Tax-credit note**: translucent white panel, check icon + "Éligible au crédit d'impôt services à la personne : 50 % de vos dépenses d'entretien déduites…".

### 6. Avis (sand section)
- `section--sand`. Head row: eyebrow + H2 "Ils nous ont confié leur jardin" on the left; a Google rating badge card ("★★★★★ 5,0 / 5 · 92 avis Google") on the right (stacks on mobile).
- **3 review cards** grid (1 → 3 cols ≥900px): gold stars, italicised quote in « » guillemets (1.05rem), footer = circular meadow avatar (first initial, Archivo 800 white) + name + commune. Copy in `components.jsx` → `REVIEWS`.

### 7. Zone (service area)
- Two-column grid (≥900px: 1.05fr / 0.95fr).
- **Left**: eyebrow + H2 "Le Perrey et tout le Pays de Risle" + lead + a 2–3 col checklist of 10 communes (meadow check icons) + muted note + ghost button.
- **Right**: **stylized SVG map** (`.zone-map`, 400×340 viewBox) — hand-drawn illustration, NOT Google Maps: fields, the river Risle (blue strokes), roads, woodland blobs, a dashed meadow service-radius circle, an orange map pin for Le Perrey, and 4 secondary town dots with labels. Wrapped in a white card.
- Communes list in `components.jsx` → `COMMUNES`.

### 8. Devis (quote form — dark forest section)
- `section--forest`, two-column grid (≥900px: 0.95fr / 1.05fr, top-aligned).
- **Left intro**: eyebrow + H2 "Décrivez votre projet, on vous rappelle vite" + lead + 3 assurances (check bullets) + a phone call-out panel.
- **Right card** (`.devis-card`, offwhite, padding up to 36×34px):
  - Fields: **Nom** (required), **Téléphone** (required, tel), **Type de travaux** (required — rendered as a row of selectable **chips**, single-select; chips: 7 options in `WORK_TYPES`), **Message** (textarea), optional **photo upload** (file input styled as a dashed button, shows thumbnail + filename after pick — client-side preview only).
  - Submit button: full-width orange "Envoyer ma demande de devis" + legal microcopy.
  - **Validation** (client-side, on submit): name non-empty; phone present & ≥9 digits; type selected. Errors show red border + message under field.
  - **On valid submit** → replaces form with a **success state**: green check, "Merci <prénom> !", confirmation that Hervé will call back within 48h, **plus two real CTAs**: "Envoyer par e-mail" (`mailto:` prefilled subject+body) and "Envoyer par SMS" (`sms:` prefilled body). A "← Modifier ma demande" link returns to the form.
- This is a **mock submit** (no backend). In production: wire submit to the real endpoint/email service; keep the mailto/SMS fallbacks as a nice-to-have. Form logic in `form.jsx`.

### 9. Footer
- `--forest-d` bg. 4-column grid (1 col mobile): brand + blurb; Contact (phone, email, "Le Perrey, 27500 Eure"); Prestations links; CTA column (white "Devis gratuit" button + rating). Legal row with © year, SIRET placeholder, mentions légales.

### 10. Sticky mobile CTA (`.sticky-cta`)
- Fixed bottom bar, **mobile only** (hidden ≥900px). Appears after `scroll > 520px` (slides up). Forest "Appeler" button (icon + label) + full-width orange "Devis gratuit". Respects `env(safe-area-inset-bottom)`.

---

## Interactions & Behavior summary
- **Sticky header** solidifies on scroll (>24px).
- **Smooth scroll** to #devis from every "devis" CTA (offset −56px).
- **Reveal on scroll**: `.reveal` elements fade+rise 22px via IntersectionObserver (threshold 0.12, staggered with `transition-delay`). Respect `prefers-reduced-motion` (disabled).
- **Before/after sliders**: pointer + touch drag, keyboard arrows.
- **Quote chips**: single-select toggle.
- **Form**: validate → success state → mailto/SMS handoff.
- **Sticky mobile CTA**: scroll-triggered slide-in.

## State Management
Minimal, all local component state:
- `Header.solid` (bool) — scroll position.
- `BeforeAfter.pos` (number 2–98) + `dragging` ref — per slider.
- `Devis`: `data` {nom, tel, type, msg}, `photo` {name,url}, `errors`, `sent` (bool).
- `StickyCTA.show` (bool).
- **Tweaks** (`heroVariant`, `headFont`, `ctaColor`, `beforeAfterLabels`) — persisted; this is a prototyping affordance, **drop it in production** (pick the chosen hero variant, font, and CTA color and hard-code them).

## Assets
- **Photos**: placeholder imagery from **Pexels** (free for commercial use, no attribution required) wired as defaults. URLs are in `components.jsx` (`IMG`) and `gallery.jsx` (`PROJECTS` → `bSrc`/`aSrc`). **Replace with Hervé's real job photos** — especially genuine "before" (overgrown) shots for stronger before/after contrast.
- **Logo mark**: inline SVG (leaf/tree), `components.jsx` → `Mark`. Replace with real logo if one exists.
- **Service & UI icons**: inline SVG line icons (`components.jsx` → `Icon`). Swap for the codebase's icon set (e.g. Lucide) if preferred.
- **Stylized map**: hand-authored inline SVG (`components.jsx` → `StylizedMap`).
- **Fonts**: Archivo, Inter (+ Barlow Condensed, Bricolage Grotesque for tweaks) via Google Fonts.

## Placeholders to replace before launch
- **Phone**: `02 32 56 00 00` / `tel:+33232560000`
- **Email**: `contact@duval-paysage.fr`
- **SIRET** + mentions légales (footer)
- **Reviews / rating count** ("5,0 / 5 · 92 avis") — use real Google data.
- **All photos** (see Assets).

## Files in this bundle
- `Duval Paysage.html` — entry point (fonts, CSS links, script tags, mount).
- `styles.css` — design tokens, base, buttons, helpers.
- `site.css` — all component/section styles + responsive breakpoints (600 / 900 / 1100px).
- `components.jsx` — Header, Hero (3 variants), TrustBar, Prestations, Pourquoi, Avis, Zone + StylizedMap, Icon, Mark, contact constants, `IMG`.
- `gallery.jsx` — Réalisations + BeforeAfter slider + `PROJECTS`.
- `form.jsx` — Devis quote form.
- `app.jsx` — App shell, Footer, StickyCTA, reveal-on-scroll, Tweaks wiring.
- `tweaks-panel.jsx`, `image-slot.js` — prototyping helpers (**not needed in production**; image-slot is a drag-to-fill placeholder widget, replace with normal `<img>`).

> Note: the prototype uses in-browser Babel + global `window` assignment to share components across `<script type="text/babel">` files. In a real build, convert these to proper modules/imports.
