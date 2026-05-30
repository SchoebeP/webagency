/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a minimal, self-contained server bundle for a small Docker image.
  output: "standalone",
  // In dev inside a container, file-change events over the bind mount aren't
  // reliably delivered to webpack, so force polling for hot reload. Guarded by
  // `dev` so production builds are unaffected. (Opt in via DOCKER_DEV=1.)
  webpack: (config, { dev }) => {
    if (dev && process.env.DOCKER_DEV === "1") {
      config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
    }
    return config;
  },
};

export default nextConfig;
