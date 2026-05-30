import { cn } from "@/lib/cn";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  /** Compact pill (.btn-sm). */
  small?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

/**
 * Pill button matching .btn / .btn-primary / .btn-ghost / .btn-sm.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", small, className, children, ...rest } = props;
  const classes = cn(
    "btn",
    variant === "primary" ? "btn-primary" : "btn-ghost",
    small && "btn-sm",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
