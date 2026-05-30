import type { ReactNode } from "react";

/** Inline gradient text (.gradient-text) — indigo→blue→cyan clip. */
export function GradientText({ children }: { children: ReactNode }) {
  return <span className="gradient-text">{children}</span>;
}
