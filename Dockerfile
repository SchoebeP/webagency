# syntax=docker/dockerfile:1

# ============================================================
# Studio Albâtre — multi-stage Dockerfile
# Targets:
#   - dev    : next dev with hot reload (source bind-mounted by compose)
#   - runner : small production image (Next.js standalone output)
# ============================================================

FROM node:22-alpine AS base
WORKDIR /app
# Some Node deps expect glibc; provide the compat shim on Alpine.
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

# ---- deps: install node_modules from a clean lockfile ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ---- dev: hot-reload development server ----
# Source is bind-mounted by docker-compose; node_modules come from this layer.
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
# Bind 0.0.0.0 so the dev server is reachable through the container's port map.
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]

# ---- builder: produce the standalone production build ----
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure public/ exists (it may be empty; the favicon lives in app/) so the
# runner COPY below succeeds even on a fresh clone.
# next/font fetches Google Fonts at build time, so this stage needs network
# (Docker build has it by default).
RUN mkdir -p public && npm run build

# ---- runner: minimal production image ----
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Run as a non-root user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone output + the assets it does not bundle (static chunks, public/).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
