# Studio Albâtre — webagency

Monorepo de **Studio Albâtre** (création de sites & SEO, Normandie) :

| Dossier | Contenu |
|---|---|
| `/` (racine, `src/`) | Le site vitrine one-page de l'agence — Next.js 15 App Router + TypeScript + Tailwind v3 |
| `sites/duval-paysage/` | Modèle client forkable : paysagiste (export statique, autonome) |
| `sites/poulettes-du-bec/` | Modèle client forkable : vente d'œufs fermiers (export statique, autonome) |
| `docs/design-archive/` | Maquettes hi-fi d'origine (handoffs design → code) |

Chaque dossier `sites/*` est **auto-suffisant** (son propre `package.json`, README et instructions de fork) — il ne partage rien avec la racine.

## Démarrage rapide (site racine)

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de production
npm run lint
npx tsc --noEmit     # typecheck
```

> ⚠️ En local, le port 3000 héberge souvent un build de prod (`npm start`) qui ne recharge pas les modifications — pour développer, lancer `npx next dev -p 3005`.

Docker (prod + dev hot-reload) : voir [DOCKER.md](DOCKER.md).

## Sélecteur de démo client

Le site embarque un sélecteur caché de palettes/thèmes pour les démos clients :
ouvrir avec **`?demo=1`** dans l'URL ou **Ctrl+Shift+D** (`src/components/demo/DemoSwitcher.tsx`).
Défaut de production figé : palette *ocean* + thème sombre.

## Formulaire de contact (Resend)

`src/app/api/contact/route.ts` relaie les demandes par email via [Resend](https://resend.com).
Variables d'environnement (voir `.env.example`) :

- `RESEND_API_KEY` — **requis en production**, sinon le formulaire répond 503 ;
- `CONTACT_TO_EMAIL` — destinataire des leads (défaut : `contact@studio-albatre.fr`) ;
- `CONTACT_FROM_EMAIL` — expéditeur (défaut : `onboarding@resend.dev`, utilisable avant la vérification du domaine dans Resend).

En production, ces variables se règlent dans l'environnement de la stack Portainer.

## Déploiement

Poussez sur `main` → une stack git Portainer (`studio-albatre`) sur le VPS poll la branche
toutes les ~5 min et reconstruit l'image (`docker-compose.yml`, service `web`, port hôte 3001).
La CI GitHub (`.github/workflows/ci.yml`) vérifie lint + types + build avant que ça parte en prod —
**ne pas merger sur `main` si la CI est rouge.**

Dernier kilomètre manuel : vhost nginx + DNS `studio-albatre.fr` → VPS.

## Avant le lancement (checklist)

- [ ] Pages légales : renseignées (PB Innovative Solutions / Hetzner). Reste le **médiateur de la consommation** dans `/cgv` (`[À COMPLÉTER]`) — adhérer à un service de médiation (CNPM, Medicys…) puis indiquer ses coordonnées.
- [ ] Renseigner `RESEND_API_KEY` dans l'environnement de prod et tester le formulaire.
- [ ] Remplacer les réseaux sociaux placeholder (`src/lib/site.ts` — les icônes restent masquées tant que l'URL vaut `#`).
- [ ] Remplacer le portfolio et les témoignages fictifs (`src/lib/data.ts`).
- [ ] Vérifier le domaine dans Resend puis passer `CONTACT_FROM_EMAIL` sur `contact@studio-albatre.fr`.

## Tests

```bash
npm test             # vitest — logique de pricing du devis (src/lib/quote-steps)
```
