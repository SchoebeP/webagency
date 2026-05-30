/**
 * Inline SVG path sets, ported verbatim from the handoff (script.js `ICONS`,
 * quote.js `I`, and the one-off glyphs inline in index.html).
 *
 * Kept as exact inline paths rather than swapping to lucide-react: the README
 * notes lucide is only "quasi-1:1", and §3 demands pixel fidelity.
 *
 * All paths assume viewBox="0 0 24 24". Most are stroke-based (rendered with
 * stroke="currentColor", fill="none"); a few (e.g. `star`) carry their own
 * fill/stroke overrides inline so they render correctly inside the wrapper.
 * Brand/social marks (LinkedIn/Instagram/Facebook) are fill-based and live in
 * the Footer component directly.
 */
export const ICON_PATHS = {
  // ---- Services ----
  vitrine: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M9 20v-6h6v6"/>',
  ecom: '<circle cx="9" cy="21" r="1.6"/><circle cx="18" cy="21" r="1.6"/><path d="M2 3h3l2.5 13h11l2-9H6"/>',
  landing: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 14h8M8 17h5"/>',
  seo: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M9 11l1.5 1.5L14 9"/>',
  local: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  maint: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/>',
  speed: '<path d="M12 14a4 4 0 1 0-4-4"/><path d="M12 14 16 8"/><path d="M4 20a9 9 0 1 1 16 0"/>',
  responsive: '<rect x="2" y="4" width="14" height="11" rx="1.5"/><path d="M2 18h11"/><rect x="16" y="9" width="6" height="11" rx="1.5"/>',
  host: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',

  // ---- Generic / shared ----
  check: '<path d="m20 6-11 11-5-5"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" fill="currentColor" stroke="none"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',

  // ---- Quote wizard: project types ----
  refonte: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
  sur: '<path d="m8 18-6-6 6-6"/><path d="m16 6 6 6-6 6"/><path d="m13 4-2 16"/>',

  // ---- Quote wizard: sizes ----
  page1: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 7h4M10 11h4"/>',
  page2: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>',
  page3: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="8" height="6" rx="1.5"/><rect x="13" y="14" width="8" height="6" rx="1.5"/>',
  page4: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M15 9v12"/>',

  // ---- Quote wizard: features ----
  blog: '<path d="M4 4h11l5 5v11H4z"/><path d="M15 4v5h5"/><path d="M8 13h8M8 16h5"/>',
  booking: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="m9 15 2 2 4-4"/>',
  pay: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
  members: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  lang: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.6"/><path d="m21 16-5-5L5 21"/>',
  news: '<path d="M3 8l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/>',

  // ---- Quote wizard: SEO ----
  none: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
  seoBase: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  seoLocal: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  seoAdv: '<path d="M3 17l5-5 4 4 8-8"/><path d="M16 8h5v5"/>',

  // ---- Quote wizard: timing ----
  rocket: '<path d="M12 3c4 0 7 3 7 7 0 3-2 6-5 8l-2 2-2-2c-3-2-5-5-5-8 0-4 3-7 7-7z"/><circle cx="12" cy="10" r="2"/><path d="M8 16l-2 5 5-2"/>',
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',

  // ---- UI / chrome glyphs (from index.html) ----
  logo: '<path d="M4 7h16M4 12h10M4 17h7"/><circle cx="18" cy="15" r="3.2"/><path d="m20.5 17.5 2 2"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/>',
  burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  mail: '<path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
} as const;

export type IconName = keyof typeof ICON_PATHS;
