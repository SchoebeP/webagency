# Client site templates — Duval Paysage & Les Poulettes du Bec

Date: 2026-05-30
Status: approved (full autonomy granted — "make the best choices, don't stop until it's ready")

## Goal

Turn the two hi-fi handoffs (`design_handoff_duval_paysage/`, `design_handoff_poulettes_du_bec/`)
into production-quality sites that double as **reusable starting points** for future agency
clients. Two priorities, in order:

1. **As easy as possible to edit / fork** for a new client.
2. A **pixel-faithful, showable** end result.

## Decisions (locked with the user)

- **Fork model: self-contained folders.** Each site is its own standalone app under `sites/`,
  sharing nothing with the others or with the Studio Albâtre app at `src/` (which is untouched).
  Forking a new client = `cp -r` the folder, edit two files, swap photos.
- **Stack: Next.js 15 (App Router) + React 19 + TypeScript**, matching the team's existing stack.
  Each site has its own `package.json` and is independently runnable / deployable / forkable.

## Architecture (per site)

```
sites/<name>/
  package.json            standalone — own deps, scripts (dev/build/start/lint)
  next.config.mjs         output: "export"  → static, deploy anywhere, best perf/SEO
  tsconfig.json  .eslintrc.json  next-env.d.ts
  app/
    layout.tsx            next/font, <title>/description/OG metadata, JSON-LD LocalBusiness
    page.tsx              assembles the sections
    globals.css           ← handoff CSS ported VERBATIM; editable color/font tokens at top
    sitemap.ts  robots.ts SEO, generated at build
  components/             one component per section + shared icons + small client helpers
  content.ts             ← THE edit surface: all copy, prices, phone, hours, reviews, SEO
  public/                favicon + photos
  README.md              run / fork / what-to-replace-before-launch
```

### The two edit surfaces (the whole point)

- **`content.ts`** — every word, price, phone number, hour, review, commune, menu item, and the
  per-site SEO/business facts. Typed, so a forker gets autocomplete and typo-catching.
- **Top of `globals.css`** — the brand color + font CSS variables. Change `--cta` etc. → whole
  site re-themes.

Forking a new client of the same kind = copy the folder, edit those two files, drop new photos
in `public/`. Nothing else.

### Styling

Port each handoff's plain CSS **verbatim** into `app/globals.css` (it is the visual source of
truth — exact tokens, all states). No Tailwind for these sites (rebuilding would be lossy). Each
site is its own app, so there is zero token cross-contamination. The prototype `<image-slot>`
custom element is replaced with plain `<img>` (`object-fit: cover`); the CSS selectors that
targeted `image-slot` are retargeted to `img`.

### Server vs client

Default to **server components**. The prototype's `onQuote` smooth-scroll handler is replaced with
plain `<a href="#devis">` anchors + `html { scroll-padding-top }`, so most sections need no JS.
Client components (`'use client'`) only where there is genuine interactivity:

- **Duval:** Header (scroll → solid), before/after slider (pointer + touch + keyboard), quote form
  (validate → success → mailto/SMS), sticky mobile CTA, reveal-on-scroll manager.
- **Poulettes:** Header, reservation form (day-aware slots — Thursday closed, dinner Fri/Sat only,
  validation → confirmation), gallery (CSS-only hover), sticky mobile CTA, reveal.

### SEO (baked in — it is the product the agency sells)

Per-site `<title>` / description / OpenGraph in `layout.tsx`; **JSON-LD `LocalBusiness`** generated
from `content.ts` (NAP, geo, areaServed, aggregateRating; Poulettes adds `openingHoursSpecification`
from its hours data); `sitemap.ts` + `robots.ts`.

### Prototype cruft dropped

The `Tweaks` panel and `image-slot.js` are prototyping-only and are not ported. The chosen hero
variant is a field in `content.ts` (a fork switches layout by editing one line); CTA color is a
CSS token.

### Forms & photos

Stay as templates: mock submit with the handoff's real fallbacks (mailto/sms for Duval; an
on-page confirmation for Poulettes), placeholder Pexels/Unsplash photos, one clearly-marked
`TODO` + documented hook to wire a real endpoint per client.

## Build order

Build **Duval end-to-end first** (it sets the pattern), verify it builds + renders, then replicate
the pattern for **Poulettes**. Verify the risky interactive widgets in a real browser.

## Out of scope

Real backend wiring, real photos/content, legal pages, deployment config — these happen per real
client, after a fork. The templates leave clear hooks.
