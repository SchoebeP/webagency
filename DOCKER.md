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

- Source is mounted at `/app`; `node_modules` and `.next` are kept inside the container (named/anonymous volumes) so the host's macOS files don't shadow the Linux build.
- Hot reload uses **webpack polling** (`DOCKER_DEV=1` → `watchOptions.poll` in `next.config.mjs`), because native FS events aren't always delivered into a container over the bind mount.

> ⚠️ **Hot-reload caveat:** automatic recompile-on-save was **not reproducible in the sandbox used to build this** (no config — native events, `WATCHPACK_POLLING`, or `watchOptions.poll` — triggered a recompile there). It may work fine on your interactive Mac + OrbStack. If saves aren't picked up:
> - **Recommended for the tightest loop on macOS:** run the dev server on the host instead — `npm run dev` — which gives instant, reliable hot reload. Use the Docker dev service mainly for Linux/runtime parity.
> - Or restart the dev service to pick up changes: `docker compose --profile dev restart dev`.

## Notes

- `.dockerignore` keeps the build context lean (excludes `node_modules`, `.next`, `docs/`, `design_handoff_site_vitrine/`, screenshots, etc.).
- Both services bind port 3000; the `dev` service is gated behind the `dev` Compose profile so a bare `docker compose up` only starts production `web`.
