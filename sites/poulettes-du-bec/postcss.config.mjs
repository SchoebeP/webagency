/**
 * PostCSS local au site — autoprefixer uniquement (pas de Tailwind).
 * Présent pour que ce site n'hérite PAS de la config PostCSS de la racine du
 * dépôt (qui charge Tailwind). Le CSS de ce site est du CSS pur.
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    autoprefixer: {},
  },
};

export default config;
