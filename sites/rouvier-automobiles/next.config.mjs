import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ce site est autonome : on fige sa racine ici pour qu'il n'aille pas chercher
  // le lockfile / la config de la racine du dépôt (Next détecte plusieurs lockfiles).
  outputFileTracingRoot: __dirname,
  // Le site a un back-office (/admin) + API (formulaire d'essai, photos) :
  // build "standalone" auto-hébergeable (node .next/standalone/server.js).
  output: "standalone",
  // Les photos passent par /api/photos/[filename] avec des <img> simples ;
  // on n'utilise pas l'optimiseur next/image.
  images: { unoptimized: true },
  // Préfixe optionnel de déploiement (ex. BASE_PATH=/rouvier pour servir le
  // site sous https://studio-albatre.fr/rouvier). Vide par défaut → racine.
  // Env de build — à fournir avec NEXT_PUBLIC_BASE_PATH (voir lib/base-path.ts).
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;
