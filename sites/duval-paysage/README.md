# Duval Paysage — site vitrine paysagiste

Modèle de site **one-page** pour un artisan paysagiste (référencement local + conversion
« devis gratuit »). Application **Next.js 15** autonome : elle ne dépend de rien d'autre dans
ce dépôt — on peut la copier-coller ailleurs telle quelle.

## Lancer en local

```bash
cd sites/duval-paysage
npm install
npm run dev          # http://localhost:3000
```

Build statique prêt à héberger n'importe où (`out/`) :

```bash
npm run build        # génère ./out (HTML/CSS/JS statiques)
```

## Forker pour un nouveau client paysagiste

```bash
cp -r sites/duval-paysage sites/<nouveau-client>
```

Puis, **deux fichiers à éditer** :

1. **`content.ts`** — tout le texte : nom, téléphone, e-mail, prestations, avis, communes,
   réalisations, SEO… C'est typé : votre éditeur signale ce qui manque.
2. **Le haut de `app/globals.css`** (bloc `:root`) — les couleurs et la police de la marque.
   Changez `--cta`, `--forest`, etc. → tout le site se re-thème.

Et remplacez les photos (voir ci-dessous).

## À remplacer avant la mise en ligne

- [ ] **Téléphone / e-mail / adresse** → `content.ts` (`business`).
- [ ] **Coordonnées GPS** (`business.geo`) et **SIRET** → fiche Google + mentions légales.
- [ ] **Photos** : les visuels sont des placeholders Pexels (libres de droits). Déposez les
      vraies photos d'Hervé dans `/public` et pointez-les dans `content.ts`
      (`images`, `realisations.projects`). Priorité : de vraies photos « avant » (terrain
      envahi) pour des avant/après percutants.
- [ ] **Avis & note Google** (`content.ts` → `avis`, `business.rating/reviewCount`) → vraies données.
- [ ] **Domaine** (`seo.url`). Une carte de partage (Open Graph, 1200×630) de marque est fournie
      dans `public/og.png` — remplacez-la par votre propre visuel avant le lancement.
- [ ] **Formulaire de devis** : aujourd'hui une maquette (validation → e-mail/SMS pré-remplis).
      Pour un envoi serveur, voir le `TODO` dans `components/Devis.tsx` (Formspree, Web3Forms,
      route API…). Si vous ajoutez une vraie route serveur, retirez `output: "export"` de
      `next.config.mjs`.
- [ ] **Mise en page du hero** : `content.ts` → `heroVariant` (`"plein"` | `"split"` | `"editorial"`).

## Structure

```
app/         layout (polices, SEO, JSON-LD), page, globals.css, sitemap, robots, favicon
components/  une section par fichier + icônes + petits modules interactifs
content.ts   ← LE contenu éditable
public/      favicon, photos
```

Les sections statiques sont des composants serveur ; seuls les éléments réellement interactifs
sont des composants client (`"use client"`) : en-tête collant, slider avant/après, formulaire,
barre d'action mobile, apparition au scroll.
