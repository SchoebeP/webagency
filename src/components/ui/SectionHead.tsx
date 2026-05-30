import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Centered head (default) vs left-aligned. */
  center?: boolean;
  /**
   * "stagger" (default): eyebrow / title / description reveal individually with
   * d1/d2 delays (matches the centered heads in the prototype).
   * "group": the whole head reveals as one block (matches the "Why us" head).
   */
  revealMode?: "stagger" | "group";
};

export function SectionHead({
  eyebrow,
  title,
  description,
  center = true,
  revealMode = "stagger",
}: SectionHeadProps) {
  const group = revealMode === "group";
  return (
    <div className={cn("section-head", center && "center", group && "reveal")}>
      <Eyebrow className={group ? undefined : "reveal"}>{eyebrow}</Eyebrow>
      <h2 className={cn("title", !group && "reveal d1")}>{title}</h2>
      {description ? <p className={cn(!group && "reveal d2")}>{description}</p> : null}
    </div>
  );
}
