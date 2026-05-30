import type { ServiceIcon } from "@/content";
import type { JSX } from "react";

/* Logo — feuille / arbre */
export function Mark({ size = 34, color = "var(--meadow)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 36V20" stroke="var(--earth)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 24c-7 0-11-4-11-11 7 0 11 4 11 11Z" fill={color} />
      <path d="M20 20c0-7 4-11 11-11 0 7-4 11-11 11Z" fill="var(--forest)" />
    </svg>
  );
}

/* Icônes de prestations (trait) */
const SERVICE_PATHS: Record<ServiceIcon, JSX.Element> = {
  elagage: <><path d="M12 21v-6" /><path d="M12 15c-3 0-5-2-5-5 0 0 3 0 5 2" /><path d="M12 15c3 0 5-2 5-5 0 0-3 0-5 2" /><path d="M12 11c0-3 1.5-5 4-7" /><path d="M12 11C12 8 10.5 6 8 4" /></>,
  abattage: <><path d="M14 3 9 8l3 3" /><path d="m12 11-7 7 1 1 7-7" /><path d="M14 3l4 4-3 3-4-4" /><path d="M5 21h6" /></>,
  haies: <><rect x="3" y="9" width="18" height="9" rx="1.5" /><path d="M6 9V6m4 3V5m4 4V6m4 3V5" /><path d="M3 21h18" /></>,
  tonte: <><circle cx="7" cy="17" r="3" /><path d="M10 15h6l3-6h-4l-2 4" /><path d="M13 9V5h5" /></>,
  cloture: <><path d="M5 4 3 7v13h4V7L5 4Zm7 0L10 7v13h4V7l-2-3Zm7 0-2 3v13h4V7l-2-3Z" /><path d="M2 11h20M2 15h20" /></>,
  maconnerie: <><rect x="3" y="6" width="7" height="4" rx=".5" /><rect x="12" y="6" width="9" height="4" rx=".5" /><rect x="3" y="11" width="9" height="4" rx=".5" /><rect x="14" y="11" width="7" height="4" rx=".5" /><rect x="3" y="16" width="7" height="4" rx=".5" /><rect x="12" y="16" width="9" height="4" rx=".5" /></>,
  dessouchage: <><path d="M12 14v7" /><path d="M9 21h6" /><path d="M12 14c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4Z" /><path d="M12 14c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4Z" /><path d="M5 7c2 0 3 1 3 3M19 7c-2 0-3 1-3 3" /></>,
  entretien: <><path d="M3 21h18" /><path d="M7 21V11l5-4 5 4v10" /><path d="M10 21v-5h4v5" /><path d="M12 7V3" /></>,
};

export function ServiceGlyph({ name, size = 34 }: { name: ServiceIcon; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {SERVICE_PATHS[name]}
    </svg>
  );
}

/* Icônes UI réutilisables */
export function PhoneIcon({ size = 20, strokeWidth = 1.8 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ size = 16, strokeWidth = 2.4, color = "currentColor" }: { size?: number; strokeWidth?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CircleCheckIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function ChevronCompareIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
    </svg>
  );
}

export function CameraIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}
