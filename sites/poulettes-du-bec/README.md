# Les Poulettes du Bec — site vitrine restaurant / salon de thé

Modèle de site **one-page** pour un bar–restaurant–salon de thé de village (réservation +
consultation de la carte). Application **Next.js 15** autonome : elle ne dépend de rien d'autre
dans ce dépôt — on peut la copier-coller ailleurs telle quelle.

## Lancer en local

```bash
cd sites/poulettes-du-bec
npm install
npm run dev          # http://localhost:3000
```

Build statique prêt à héberger n'importe où (`out/`) :

```bash
npm run build        # génère ./out (HTML/CSS/JS statiques)
```

## Forker pour un autre restaurant

```bash
cp -r sites/poulettes-du-bec sites/<nouveau-client>
```

Puis, **deux fichiers à éditer** :

1. **`content.ts`** — tout : carte (catégories, plats, prix), horaires, avis, infos, coordonnées,
   SEO… C'est typé : votre éditeur signale ce qui manque.
2. **Le haut de `app/globals.css`** (bloc `:root`) — les couleurs et les polices de la marque.
   Changez `--terracotta`, `--bordeaux`, etc. → tout le site se re-thème.

Et remplacez les photos (voir ci-dessous).

## À remplacer avant la mise en ligne

- [ ] **Téléphone / adresse** → `content.ts` (`business`).
- [ ] **Coordonnées GPS** (`business.geo`) → fiche Google.
- [ ] **Photos** : placeholders Unsplash (libres de droits). Priorité : un **vrai portrait de
      Laurence** pour « Notre histoire » (`content.ts` → `histoire.portrait` + `images`).
- [ ] **Carte & prix** (`content.ts` → `carte`) et **horaires** (`hours`) → données réelles.
      Les horaires alimentent aussi les données structurées SEO (`opens`/`closes`).
- [ ] **Avis & note** (`content.ts` → `avis`, `business.rating/reviewCount`) → vraies données Google.
- [ ] **Domaine** (`seo.url`). Une carte de partage (Open Graph, 1200×630) de marque est fournie
      dans `public/og.png` — remplacez-la par votre propre visuel avant le lancement.
- [ ] **Formulaire de réservation** : aujourd'hui une maquette (validation → confirmation à
      l'écran, sans envoi). Pour un envoi réel, voir le `TODO` dans `components/Reservation.tsx`
      (Formspree, Web3Forms, route API…). Si vous ajoutez une vraie route serveur, retirez
      `output: "export"` de `next.config.mjs`.
- [ ] **Mise en page / photo du hero** : `content.ts` → `hero` (`variant`, `photo`, `showStrip`).

## Détails utiles

- Les **créneaux de réservation** (jour de fermeture, services déjeuner / salon de thé / dîner,
  jours avec dîner) sont éditables dans `content.ts` → `reserver.slots` ; le libellé du jour de
  fermeture est repris automatiquement de `hours`.
- Le **bandeau sous le hero** (« Ouvert aujourd'hui », lieu, cuisine) se modifie dans
  `content.ts` → `heroStrip`.
- Le surlignage « Aujourd'hui » des horaires et le « Ouvert aujourd'hui » sont calculés **côté
  client** (jour du visiteur), car le site est exporté en statique.

## Structure

```
app/         layout (polices, SEO, JSON-LD Restaurant + horaires), page, globals.css, sitemap, robots, favicon
components/  une section par fichier + icônes + Img (repli) + petits modules interactifs
content.ts   ← LE contenu éditable
public/      favicon, photos
```

Les sections statiques sont des composants serveur ; seuls les éléments réellement interactifs
sont des composants client (`"use client"`) : en-tête collant, bandeau du jour, horaires du jour,
formulaire de réservation, barre d'action mobile.
