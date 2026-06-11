/* Petits pictos SVG — trait fin, esprit bistrot */
const Ico = {
  clock: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  pin: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>
    </svg>
  ),
  star: (p) => (
    <svg width={p?.s||18} height={p?.s||18} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 2 2.9 6.3 6.8.7-5.1 4.6 1.4 6.7L12 17.5 6 20.3l1.4-6.7L2.3 9l6.8-.7L12 2Z"/>
    </svg>
  ),
  utensils: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M16 5c0-2 1-3 2.5-3S21 3 21 5v6h-5V5Zm0 6v11"/>
    </svg>
  ),
  leaf: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 13-9 .5 6-3 13-10 13Z"/><path d="M4 21c2-5 5-8 10-10"/>
    </svg>
  ),
  cup: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 8h3a2 2 0 0 1 0 6h-3M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM7 2v2M11 2v2"/>
    </svg>
  ),
  users: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11"/>
    </svg>
  ),
  calendar: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  check: (p) => (
    <svg width={p?.s||34} height={p?.s||34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m20 6-11 11-5-5"/>
    </svg>
  ),
  arrow: (p) => (
    <svg width={p?.s||18} height={p?.s||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  car: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M5 17h10M5 12h14"/>
    </svg>
  ),
  gift: (p) => (
    <svg width={p?.s||22} height={p?.s||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z"/>
    </svg>
  )
};
function Stars({ n = 5, s = 16 }) {
  return (
    <span className="stars" aria-label={n + " sur 5"} role="img" style={{ display: "inline-flex", gap: "1px" }}>
      {Array.from({ length: n }).map((_, i) => <Ico.star key={i} s={s} />)}
    </span>
  );
}
window.Ico = Ico;
window.Stars = Stars;