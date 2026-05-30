import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ce site est autonome : on fige sa racine ici pour qu'il n'aille pas chercher
  // le lockfile / la config de la racine du dépôt (Next détecte plusieurs lockfiles).
  outputFileTracingRoot: __dirname,
  // Static brochure site: `next build` emits a fully static `out/` folder you can
  // host anywhere (Netlify, GitHub Pages, S3, OVH…). Best perf + SEO, zero server.
  // If a client later needs a real form backend / server route, remove this line.
  output: "export",
  // Plain <img> tags are used (not next/image), but keep image optimization off so
  // static export never tries to run the optimizer.
  images: { unoptimized: true },
};

export default nextConfig;
