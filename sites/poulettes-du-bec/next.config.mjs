import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ce site est autonome : on fige sa racine ici pour qu'il n'aille pas chercher
  // le lockfile / la config de la racine du dépôt (Next détecte plusieurs lockfiles).
  outputFileTracingRoot: __dirname,
  // Site vitrine statique : `next build` émet un dossier `out/` 100 % statique,
  // hébergeable partout. Si un client veut un vrai backend (formulaire serveur,
  // route API), retirez cette ligne.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
