import { ICON_PATHS, type IconName } from "@/lib/icons";

type IconProps = {
  name: IconName;
  /** Matches the prototype's svg(d, w) helper; default stroke width 2.1. */
  strokeWidth?: number;
  className?: string;
  /** Override stroke color (e.g. the logo mark uses #fff on its gradient). */
  stroke?: string;
};

/**
 * Renders a 24x24 stroke icon from ICON_PATHS, mirroring the prototype helper:
 *   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
 *        stroke-width=w stroke-linecap="round" stroke-linejoin="round">{d}</svg>
 * Paths with their own fill/stroke (e.g. star) override the wrapper.
 */
export function Icon({ name, strokeWidth = 2.1, className, stroke = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
    />
  );
}
