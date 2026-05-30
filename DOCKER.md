# Docker

Two setups, both serving on **http://localhost:3000** (run one at a time).

## Production (verified)

Small, self-contained image built from Next.js `standalone` output, run as a non-root user.

```bash
docker compose up --build web        # http://localhost:3000
docker compose down                  # stop
```

- Image: `studio-albatre:prod` (~334 MB), `node server.js` from `.next/standalone`.
- `next build` runs **inside** the image — that stage needs network (next/font fetches Google Fonts at build time); Docker builds have it by default.
- OrbStack also exposes it at `http://web.webagency.orb.local`.

This is the image to use for self-hosting / demoing the built site. (For Vercel/Netlify you don't need Docker — they build from source.)

## Local development (hot reload)

Runs `next dev` with your source bind-mounted, so edits flow into the container.

```bash
docker compose --profile dev up --build dev    # http://localhost:3000
docker compose --profile dev down              # stop
```

- Source is mounted at `/app`; `node_modules` and `.next` are kept inside the container (anonymous volumes) so the host's macOS files don't shadow the Linux build.
- Hot reload uses **webpack polling** (`DOCKER_DEV=1` → `watchOptions.poll` in `next.config.mjs`), because native FS events aren't always delivered into a container over the bind mount.

### Verify hot reload on your machine (30 seconds)

OrbStack on Mac is built to deliver file events into containers, so this is expected to work. Confirm it once with a **clean dev cache** and a **real browser tab** (HMR uses a websocket — `curl` won't show it):

```bash
docker compose --profile dev down -v          # reset the anonymous .next cache volume
docker compose --profile dev up --build dev    # then open http://localhost:3000 in a browser
# edit e.g. src/components/sections/Hero.tsx and watch the tab refresh
```

The `-v` matters: a plain `down`/`restart` reattaches the old anonymous `.next` volume, which can carry a stale cache between runs.

> ℹ️ Heads-up: automatic recompile-on-save could **not** be reproduced in the (headless, curl-only) sandbox this was built in — but every attempt there reused one anonymous `.next` volume and never had a browser HMR client, so that result isn't representative of OrbStack-on-Mac. The clean check above is the real test.
>
> If saves still aren't picked up, the most reliable loop on macOS is to run the dev server **on the host** — `npm run dev` — and use the Docker dev service mainly for Linux/runtime parity.

## Notes

- `.dockerignore` keeps the build context lean (excludes `node_modules`, `.next`, `docs/`, `design_handoff_site_vitrine/`, screenshots, etc.).
- Both services bind port 3000; the `dev` service is gated behind the `dev` Compose profile so a bare `docker compose up` only starts production `web`.
