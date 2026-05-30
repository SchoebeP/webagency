import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** The small uppercase pill (.eyebrow) with the glowing dot. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}
