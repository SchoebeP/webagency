import type { Config } from "tailwindcss";

/**
 * Tailwind is used for layout / spacing / responsive structure only.
 * All brand colors, radii, shadows and fonts map to the CSS custom properties
 * defined in globals.css so that runtime theming (light/dark toggle + the hidden
 * demo switcher, driven by data-* attributes on <html>) keeps working through
 * Tailwind utilities. Never hard-code hex here.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        indigo: "var(--indigo)",
        "indigo-deep": "var(--indigo-deep)",
        blue: "var(--blue)",
        cyan: "var(--cyan)",
        turquoise: "var(--turquoise)",
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent-text)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        sans: "var(--font-body)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      maxWidth: {
        wrap: "var(--maxw)",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
        soft: "var(--shadow-soft)",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
