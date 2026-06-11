# Rouvier Automobiles — site d'annonces + espace pro

Site complet pour un garage indépendant vendant ses véhicules d'occasion,
construit d'après le handoff hi-fi `../design_handoff_site_annonces_auto/`
(direction « Épuré », clair + sombre). Next.js 15 App Router + TypeScript,
**zéro dépendance** au-delà de React/Next (persistance JSON sur fichier,
sessions signées HMAC via `node:crypto`).

> « Rouvier Automobiles » est un nom fictif — remplacer nom, coordonnées
> et annonces avant mise en production pour un vrai client.

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : recherche (marque/énergie/budget), sélection du moment, bandeau confiance |
| `/vehicules` | Tout le stock : filtres instantanés, tri, slider budget, favoris (localStorage) |
| `/vehicules/[id]` | Fiche véhicule : galerie, specs, équipements, **demande d'essai** |
| `/admin/*` | **Espace pro (compte maître)** : tableau de bord, CRUD véhicules + photos, demandes d'essai, changement de mot de passe |

## Démarrage

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production (output: standalone)
```

Production : `node .next/standalone/server.js` après avoir copié
`.next/static` dans `.next/standalone/.next/` (même procédure que le site racine).

## Compte maître (admin)

- URL : `/admin` (lien discret « Espace pro » dans le footer).
- Email : `admin@rouvier-automobiles.fr`.
- **Mot de passe** : généré aléatoirement au premier démarrage et écrit dans
  `DATA_DIR/.admin-credentials` (permissions 0600). Pour l'imposer :
  variable d'environnement `ADMIN_PASSWORD` **avant le premier démarrage**.
- Modifiable ensuite dans **Admin → Paramètres**.
- Connexion limitée à 5 échecs / 15 min / IP.

## Données (`DATA_DIR`)

Tout l'état vit dans `DATA_DIR` : `db.json` (véhicules, demandes, compte
admin) + `photos/` (uploads). Défaut : `<cwd>/data`.

> ⚠️ **En production, définir `DATA_DIR` vers un chemin hors du build**
> (ex. volume Docker). Le défaut tombe dans `.next/standalone/data`,
> détruit à chaque rebuild. Au premier démarrage la base est resemée avec
> les 9 véhicules de démonstration.

> ⚠️ **Un seul processus Node par `DATA_DIR`** — contrainte dure. Pas de
> cluster, pas de PM2 multi-instances, pas de réplicas pointant sur le même
> volume : chaque écriture relit puis réécrit `db.json` en entier
> (last-write-wins), deux processus concurrents perdraient silencieusement
> des données. Pour scaler, migrer d'abord vers une vraie base.

## Sécurité (résumé)

- Mot de passe : scrypt + sel ; session : cookie HTTP-only signé HMAC-SHA256
  (7 jours), vérifié côté serveur dans le layout admin **et** chaque route API.
- Changement de mot de passe (Admin → Paramètres) : fait tourner le secret de
  session (toutes les autres sessions sont invalidées, la session courante
  reçoit un cookie frais) et supprime `DATA_DIR/.admin-credentials`.
- Uploads : jpeg/png/webp, 5 Mo max, noms aléatoires, servis via
  `/api/photos/[filename]` avec validation stricte (pas de traversée).
- Formulaire d'essai : honeypot + rate-limit (5/10 min/IP), validation serveur.
- **Reverse proxy obligatoire pour les rate-limits** : les limitations (login,
  formulaire d'essai) se basent sur `X-Forwarded-For` tel que posé par le
  **dernier saut** avant Node. Le proxy DOIT donc écraser cet en-tête avec
  l'IP réelle du client — nginx :
  `proxy_set_header X-Forwarded-For $remote_addr;` (et non
  `$proxy_add_x_forwarded_for`, qui laisserait un client usurper l'IP en
  envoyant son propre en-tête).

## À personnaliser pour un vrai client

- [ ] Nom, téléphone, adresse, horaires (`components/header.tsx`, `footer.tsx`, fiche)
- [ ] Vraies annonces + photos via l'espace pro (les placeholders « Photo à venir » disparaissent dès la première photo)
- [ ] Mentions légales / confidentialité (voir les pages du site racine comme modèle)
- [ ] Domaine + `DATA_DIR` persistant + `ADMIN_PASSWORD`/`SESSION_SECRET` en env
