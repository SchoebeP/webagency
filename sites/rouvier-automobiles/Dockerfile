# syntax=docker/dockerfile:1
# Rouvier Automobiles — image standalone (même recette que le site racine).
# Build args : BASE_PATH/NEXT_PUBLIC_BASE_PATH pour servir sous un préfixe
# (ex. /rouvier sur studio-albatre.fr) — vides par défaut (racine).

FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
ARG BASE_PATH=""
ARG NEXT_PUBLIC_BASE_PATH=""
ENV BASE_PATH=$BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN mkdir -p public && npm run build

FROM base AS runner
ARG BASE_PATH=""
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# BASE_PATH aussi au runtime (redirections serveur, ex. logout).
ENV BASE_PATH=$BASE_PATH
# Données persistantes (db.json + photos) : TOUJOURS monter un volume ici.
ENV DATA_DIR=/data
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p /data && chown nextjs:nodejs /data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
VOLUME /data
CMD ["node", "server.js"]
