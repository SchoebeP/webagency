# Studio Albâtre — Site vitrine : plan d'implémentation

**Date:** 2026-05-30
**Design source of truth:** `design_handoff_site_vitrine/` (README.md + index.html + styles.css + script.js + quote.js + tweaks*.jsx). The handoff is hi-fi and "définitif" — this document is **how** we port it faithfully, not a re-derivation of the design.

## Decisions (locked with the client)

| Topic | Decision |
|---|---|
| Stack | **Next.js (App Router) + TypeScript + Tailwind**, replacing the CRA scaffold |
| Brand | **Studio Albâtre** — rename from "Atelier Web Normandie"; **keep** the Normandy positioning & all French copy |
| Domain / email | `studio-albatre.fr` → `contact@studio-albatre.fr` |
| Theme switcher | Ship one frozen theme (**Océan + dark**) with the **light/dark toggle**; keep the palette/style switcher behind a **hidden trigger** (`?demo=1` or key combo) for client demos |
| Contact form | **Stubbed send** — full validation + success UX + honeypot; structured for a one-spot wire-up to Resend/Formspree/API route later |

## Load-bearing architecture decision

The whole prototype is **CSS-custom-property driven**: `data-theme` / `data-palette` / `data-glass` / `data-radius` / `data-bg` on `<html>` swap `--cyan`, `--glass-fill`, `--radius`, etc. That attribute→variable layer is exactly what powers **both** the light/dark toggle and the hidden demo switcher.

Therefore:
- Port `styles.css` **largely verbatim** into `app/globals.css` (tokens, palettes, `.glass` primitive, all component classes, responsive). Drop the Google Fonts `@import` (replaced by `next/font`).
- Use **Tailwind for layout/spacing/responsive structure**, not for re-expressing the tuned component CSS. Map brand colors to the CSS vars in `tailwind.config` (`colors: { cyan: 'var(--cyan)', ... }`) — **never** static hex. Rewriting 600 lines of CSS into utilities is high-risk and would break runtime theming.

## File tree (target)

```
app/
  layout.tsx          fonts (Space Grotesk + Manrope via next/font), <html> data-attrs,
                      SEO metadata, pre-paint theme script (no FOUC)
  page.tsx            assembles sections in handoff order
  globals.css         ported design system
components/
  layout/   Nav.tsx, MobileMenu.tsx, Aurora.tsx, Footer.tsx
  ui/       Button.tsx, Card.tsx, Eyebrow.tsx, SectionHead.tsx, Icon.tsx, Reveal.tsx
  sections/ Hero.tsx, Services.tsx, WhyUs.tsx, Works.tsx, Pricing.tsx, Process.tsx,
            Testimonials.tsx, Faq.tsx, Contact.tsx
  quote/    QuoteWizard.tsx
  demo/     DemoSwitcher.tsx   (hidden; ?demo=1 or Ctrl+Shift+D)
  providers/ ThemeProvider.tsx, QuotePrefillContext.tsx
lib/
  data.ts             services / why / works / pricing / process / testimonials / faqs
  quote-steps.ts      `steps` array + pricing math (ported VERBATIM from quote.js)
  icons.ts            inline SVG path set (kept exact — not lucide — for fidelity)
```

## Page section order (from README §5)

Nav → Hero → Services (9) → WhyUs (6) → Works (6) → Pricing (3, middle featured) → Quote wizard (5 steps ⭐) → Process (5) → Testimonials (3) → FAQ (6) → Contact → Footer.

## The things that bite (mitigations baked in)

1. **Theme FOUC / hydration:** inline `<script>` in `layout.tsx` sets `data-theme` from `localStorage` (key `studio-albatre-theme`) before paint. `suppressHydrationWarning` on `<html>`.
2. **Icons:** typed `Icon` component over the exact inline SVG paths from `script.js`/`quote.js`. Lucide is only "quasi-1:1" → kept inline for pixel fidelity.
3. **Wizard → contact prefill:** `QuotePrefillContext` holds the payload; "Recevoir mon devis détaillé" sets the form `<select>` + `<textarea>`, scrolls to `#contact`, focuses Nom. `steps` + pricing/rounding ported verbatim.
4. **Featured pricing scale trap (README §8):** the featured card's `scale(1.04)` is applied via a dedicated prop/class, never reset by the shared `.reveal.in { transform: none }`.
5. **Reveal-on-scroll:** `Reveal` wrapper using IntersectionObserver, respects `prefers-reduced-motion`, with `.d1`–`.d4` stagger.
6. **Form:** real `name`/`aria-*`, honeypot field, validation parity with prototype; success panel; no real network send yet.
7. **backdrop-filter cost:** keep the ported fallback (more opaque fill) and limit simultaneous `.glass` layers per README §13.

## Hidden demo switcher

Self-contained `DemoSwitcher` (NOT the prototype's host-protocol version). Sets the 5 `data-*` attrs on `<html>`. Controls: 6 palettes (ocean/aurore/foret/sunset/nuit/ardoise), theme dark/light, glass subtil/standard/prononcé, radius doux/standard/généreux, background aurora/dégradé/minimal. Mounts only when `?demo=1` is present OR after `Ctrl+Shift+D`. Defaults match the frozen production theme.

## Build order

1. **Foundation (solo, first):** scaffold Next.js+TS+Tailwind; `next/font`; port `globals.css`; tailwind config (colors→vars); `ThemeProvider` + pre-paint script; layout shell (Aurora, Nav, MobileMenu, Footer); UI primitives (Button, Card, Eyebrow, SectionHead, Icon, Reveal); `lib/data.ts`, `lib/quote-steps.ts`, `lib/icons.ts`.
2. **Leaf sections (parallel agents):** Hero, Services, WhyUs, Works, Pricing, Process, Testimonials, Faq, Contact — each agent matches the exact prototype HTML and consumes locked primitives + class names (own file → no conflicts).
3. **Wizard + form + demo switcher (solo):** QuoteWizard, Contact form logic + prefill context, DemoSwitcher.
4. **Assemble & verify:** wire `page.tsx`; `next build` + lint clean; **visual diff** original `index.html` vs Next build, dark & light, at desktop / 1000px / 720px.

## Deployment

Configure for static/SSG deploy (Vercel or Netlify). DNS for `studio-albatre.fr` documented but not modified by us.

## Out of scope (this pass)

Real email backend, real portfolio/testimonial content, phone/socials/legal page contents (kept as clearly-marked placeholders), analytics, CMS.
