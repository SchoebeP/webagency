# Handoff : Les Poulettes du Bec — Site vitrine (one-page)

## Overview
Site vitrine **one-page, responsive et mobile-first** pour un bar–restaurant–salon de thé de village au Bec-Hellouin (Normandie). Les deux objectifs prioritaires, présents partout : **Réserver une table** et **Voir la carte**. L'ambiance visée est chaleureuse, appétissante, esprit bistrot de campagne — pas de look tech froid, pas de glassmorphism clinique.

## About the Design Files
Les fichiers de ce bundle sont des **références de design réalisées en HTML/CSS/React (via Babel in-browser)** — un prototype montrant l'apparence et le comportement souhaités, **pas du code de production à copier tel quel**. La tâche est de **recréer ce design dans l'environnement du codebase cible** (React, Vue, Next, Astro, SwiftUI, WordPress…) en suivant ses conventions, ses composants et sa librairie de styles. Si aucun environnement n'existe encore, choisir le framework le plus adapté (pour un site vitrine de restaurant, **Astro ou Next.js statique** est recommandé : SEO, performance, formulaire serverless).

Le React+Babel utilisé ici est un outil de prototypage rapide ; **ne pas le porter en production tel quel** (pas de transpilation navigateur en prod).

## Fidelity
**Haute fidélité (hifi).** Couleurs, typographie, espacements, états et interactions sont définitifs. Recréer l'UI au pixel près avec les librairies/patterns du codebase cible. Seules les **photos sont des placeholders libres de droits** (Unsplash) à remplacer par les vraies photos du restaurant.

---

## Structure de la page (ordre des sections)
1. **Header collant** — marque + nav + CTA « Voir la carte » / « Réserver »
2. **Hero** — photo plein cadre, titre, note, double CTA (3 variantes de mise en page)
3. **Bandeau infos** (optionnel) — horaires du jour / lieu / cuisine maison
4. **Notre histoire** — récit de Laurence + photo + signature
5. **La carte** — menu par catégories (Entrées / Plats / Desserts / Salon de thé)
6. **Galerie** — mosaïque de 8 photos (plats, ambiance, village)
7. **Avis** — badge note + 3 témoignages
8. **Infos & accès** — horaires détaillés + lieu/parking/téléphone/boutique
9. **Réserver** — formulaire interactif + numéro cliquable
10. **Footer** — marque, navigation, contact, mentions
11. **CTA collant mobile** — barre « Voir la carte » / « Réserver » (apparaît au scroll)

---

## Screens / Views

### 1. Header (collant)
- **Layout** : barre `position: sticky; top: 0; z-index: 60`, hauteur **68px**, `backdrop-filter: blur(10px)`, fond `color-mix(in srgb, #F7F1E6 86%, transparent)`. Contenu dans `.wrap` (max-width 1180px) en flex `space-between`.
- **Marque (gauche)** : pastille ronde 40px (dégradé radial doré `#D8BC73 → #C2A14D → #B0532F`) + icône poule au trait ; à droite « Les Poulettes du Bec » (Playfair 800, ~1.2rem, bordeaux `#6E2A2A`) au-dessus de « LE BEC-HELLOUIN » (Mulish 800, 0.62rem, lettre-spacing .2em, terre cuite). Le sous-titre se masque sous 400px.
- **Nav (centre, ≥900px seulement)** : liens « Notre histoire / La carte / Galerie / Infos & accès », Mulish 700, soulignement animé terre cuite au survol.
- **CTA (droite)** : « Voir la carte » (bouton fantôme, visible ≥900px) + « Réserver » (bouton plein terre cuite). En mobile, seul « Réserver » reste.
- **État scrollé** : à `scrollY > 20`, ajoute ombre douce + bordure basse `#e4d7c0`.

### 2. Hero
- **Layout** : section `isolation: isolate; overflow: hidden`, `min-height: min(86vh, 760px)`, contenu **aligné en bas** (`justify-content: flex-end`), padding haut `clamp(3rem,12vh,7rem)`.
- **Couches** : `z-index:-2` image plein cadre (`object-fit: cover`) ; `z-index:-1` scrim dégradé (voir variantes) ; contenu au-dessus.
- **Contenu** : eyebrow « Bar · Restaurant · Salon de thé » (doré) ; `h1` Playfair, `clamp(2.6rem, 9vw, 5.5rem)`, blanc, `max-width: 16ch`, text-shadow ; sous-titre `clamp(1.05rem,2.6vw,1.3rem)` ; ligne note « ★★★★★ **4,7/5** · ~130 avis · n°1 du village » ; bloc CTA.
- **CTA hero** : « Réserver une table » (bouton **verre** : `background: rgba(110,42,42,.34)`, `backdrop-filter: blur(8px)`, bordure `rgba(247,241,230,.55)`) + « Voir la carte » (bouton crème). En variante *panel*, le premier CTA devient plein terre cuite.
- **3 variantes (tweak `heroVariant`)** :
  - `classic` (Plein cadre) : scrim vertical sombre haut+bas, texte plein cadre.
  - `split` (Latéral) : scrim horizontal `linear-gradient(90deg, rgba(58,28,24,.9) → transparent)`, titre `max-width:14ch`.
  - `panel` (Panneau) : carte bordeaux opaque (`color-mix(#6E2A2A 90%, #000)`, radius 22px, bordure dorée `rgba(212,188,115,.3)`, max-width 540px) posée sur la photo.

### 3. Bandeau infos (sous le hero, optionnel — tweak `showStrip`)
- Fond bordeaux `#6E2A2A`, texte crème. 3 colonnes ≥760px (`border-left` doré entre elles), empilées en mobile (`border-bottom`).
- Items : icône horloge « Ouvert aujourd'hui · {horaire} / Jeudi fermé » · icône épingle « Le Bec-Hellouin / près de l'abbaye » · icône feuille « Cuisine maison / produits frais & locaux ». Icônes dorées `#D8BC73`.

### 4. Notre histoire
- **Layout** : grid `0.85fr 1fr` ≥860px, sinon empilé ; `gap: clamp(1.6rem,5vw,3.5rem)`, fond crème `#F7F1E6`.
- **Média (gauche)** : photo ratio **4/5**, `object-fit: cover`, radius 22px, ombre carte. Badge vert sauge `#8A9A7B` en bas-gauche débordant (`left:-8px; bottom:-18px`), radius 14px : sur-titre « DE LA CÔTE D'AZUR AU BEC » + « 30 ans de métier, un rêve enfin réalisé » (Playfair).
- **Texte (droite)** : eyebrow « Notre histoire » ; titre « Laurence, de retour au pays » ; paragraphe lead + paragraphe courant (brun chocolat adouci) ; signature « Laurence » (Playfair italique 1.4rem bordeaux) + « GÉRANTE & CUISINIÈRE ».

### 5. La carte
- **Layout** : fond **bordeaux `#6E2A2A`**, texte crème. Pseudo-élément `::before` avec 2 radial-gradients très subtils (opacity .06). En-tête (eyebrow doré « La carte » + titre blanc + lead).
- **Catégories** : grid `1fr 1fr` ≥800px (« Salon de thé » en pleine largeur via `menu-cat--wide`), sinon 1 colonne. Titre de catégorie : icône + nom doré `#D8BC73` Playfair, suivi d'un filet `flex:1; height:1px` doré translucide.
- **Item de menu** : grid `1fr auto` — nom (blanc, 800, 1.08rem) à gauche, prix (doré, Playfair, 1.12rem, `white-space:nowrap`) à droite ; description en pleine largeur (`grid-column:1/-1`) crème adoucie 0.98rem. La catégorie « Salon de thé » dispose ses items en sous-grille `repeat(auto-fit, minmax(260px,1fr))`.
- **Encart bas** : `rgba(212,188,115,.12)` bordure dorée — « **~ 30 €** » (Playfair doré) + texte « Le menu complet tourne autour de 30 €… La carte évolue avec les saisons » + bouton « Réserver une table ».

### 6. Galerie
- **Layout** : fond `#EFE5D2`. Grid `repeat(4,1fr)` ≥720px (sinon `repeat(2,1fr)`), `gap:.9rem`. Tuiles spéciales : `.wide` = `grid-column: span 2`, `.tall` = `grid-row: span 2`.
- **Tuile** : `figure` radius 14px overflow hidden ; image `object-fit:cover` qui **scale 1.06 au survol** (transition .7s) ; légende Playfair en bas sur dégradé sombre, **révélée au survol/focus** (`opacity 0→1`, translateY). `tabIndex={0}` pour l'accessibilité clavier.
- 8 tuiles : plats à partager (wide), belles viandes (tall), desserts, un verre, salle & terrasse (tall), Le Bec-Hellouin (wide), salon de thé, produits du coin.

### 7. Avis
- **Layout** : fond crème. En-tête flex `space-between` ≥480px : (titres) + **badge note** (carte blanche, score Playfair 2.6rem terre cuite, ★ dorées, « sur ~130 avis · Le Bec-Hellouin »).
- **Cartes avis** : grid `repeat(3,1fr)` ≥820px. Carte blanche radius 22px, ombre douce, bordure `#efe3cf`, guillemet décoratif `“` en haut-droite (Playfair 4rem crème). Contenu : ★ dorées, texte 1.06rem, puis avatar rond 42px (initiale, fond = couleur de l'avis) + nom (800) + méta (0.82rem).
- 3 avis : Élodie M. (terre cuite), Jean-Pierre L. (bordeaux), Sophie & Marc (sauge) — voir Données.

### 8. Infos & accès
- **Layout** : fond **vert sauge foncé `#6F7E62`**, texte blanc. Grid `1fr 1fr` ≥860px.
- **Carte horaires (gauche)** : carte crème radius 22px. Titre « Nos horaires » bordeaux. 7 lignes jour/heure séparées par tiret pointillé `#d9c9ad`. **Le jour courant** (`is-today`) : fond blanc, `box-shadow: inset 0 0 0 2px #C2A14D`, pastille dorée « Aujourd'hui ». Jour fermé : heure en terre cuite 800.
- **Détails (droite)** : 4 lignes icône+texte (épingle = lieu/abbaye ; voiture = parking/terrasse ; téléphone = numéro cliquable ; cadeau = bar/salon de thé/boutique). Puis **tags** d'accès en puces translucides : Terrasse, Accueil familial, Parking à proximité, Boutique cadeaux, Groupes bienvenus.

### 9. Réserver
- **Layout** : fond bordeaux, grid `0.8fr 1.1fr` ≥880px.
- **Aside (gauche)** : eyebrow + titre « Réservez votre table » + lead ; **bloc téléphone** cliquable (`rgba(212,188,115,.12)`, bordure dorée) « Par téléphone / 06 59 90 90 97 » (Playfair) ; note confirmation/groupes.
- **Carte formulaire (droite)** : carte crème radius 22px. Voir « Interactions & Behavior » pour la logique complète.

### 10. Footer
- Fond **brun chocolat `#3A2C22`**, texte crème adouci. Grid `1.4fr 1fr 1fr` ≥760px.
- Col 1 : marque + pitch + bouton « Réserver une table ». Col 2 « Le restaurant » (liens ancres). Col 3 « Nous contacter » (téléphone, lieu, horaires résumés).
- Bas : `border-top` translucide, « © {année} … » + liens Mentions légales / Confidentialité / Plan du site.

### 11. CTA collant mobile
- `position: fixed; bottom:0`, masqué ≥900px. Apparaît à `scrollY > 420` (translateY 120% → 0). 2 boutons 50% : « Voir la carte » (fantôme) + « Réserver » (plein). Respecte `env(safe-area-inset-bottom)`.

---

## Interactions & Behavior

### Navigation
- Tous les liens d'ancre font un **scroll fluide** (`scrollIntoView({behavior:'smooth'})`). `html { scroll-behavior: smooth; scroll-padding-top: 80px }` pour compenser le header collant. Respecter `prefers-reduced-motion`.

### Header
- Écoute du scroll (passif) → bascule la classe `scrolled` à `scrollY > 20`.

### Galerie
- Survol/focus d'une tuile : image `scale(1.06)` + légende révélée.

### Formulaire de réservation (cœur interactif)
State : `{ date, slot, covers (déf. 2), name, phone, email, message }`, `errors`, `done`.
- **Date** : `<input type="date">`, `min = aujourd'hui`. Changer la date réinitialise le créneau.
- **Couverts** : boutons 1–6 + « 7 + » (état `active` terre cuite). `aria-pressed`.
- **Créneaux dynamiques selon le jour** (`slotsForDate`) :
  - **Jeudi (dow 4)** → fermé : message « Fermé le jeudi — choisissez un autre jour », aucun créneau.
  - Groupes **Déjeuner** (12:00→14:00) et **Salon de thé** (15:00→17:00) toujours présents.
  - **Vendredi/Samedi (dow 5,6)** → ajoute **Dîner** (19:00→20:30).
  - Créneau sélectionné : `active` vert sauge.
- **Validation** (à la soumission, `noValidate`) :
  - date requise ; si jeudi → erreur fermé.
  - créneau requis (sauf si fermé).
  - nom non vide.
  - téléphone : regex `/^[0-9 +().-]{8,}$/`.
  - email : facultatif, mais si rempli doit matcher `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`.
  - Champs en erreur : classe `invalid` (bordure terre cuite + fond `#fdf3ee` + message). Focus auto sur le 1er champ invalide.
- **Succès** → vue **Confirmation** : pastille verte animée (`@keyframes pop`, scale .4→1), « Merci {prénom} ! », récap (date FR longue, horaire, couverts, nom, note éventuelle), bouton « Modifier ma demande » (revient au formulaire). Aucune carte bancaire, maquette — **aucun envoi réseau** (à brancher côté codebase : API/serverless/mailto).
- Helpers : `frDate(iso)` → `toLocaleDateString('fr-FR', {weekday, day, month})`.

### Reveal au scroll
- Classe `.reveal` animée en **CSS pur scroll-driven** (`animation-timeline: view()`), défaut **visible** si non supporté. Ne pas utiliser d'IntersectionObserver qui ajoute une classe (React écrase `className` au re-render — bug rencontré et corrigé).

---

## State Management
- **Formulaire** : state local (voir ci-dessus).
- **Tweaks** (panneau de démo, non destiné à la prod) : `heroVariant`, `heroPhoto`, `heroTitle`, `accent` (applique `--terracotta` via `documentElement.style.setProperty`), `showStrip`. Persistance localStorage côté prototype. **À retirer en production** ou remplacer par un vrai CMS si configurable.
- **Jour courant** : `new Date().getDay()` pour surligner l'horaire et calculer le libellé « Ouvert aujourd'hui ».

---

## Design Tokens

### Couleurs
| Token | Hex | Usage |
|---|---|---|
| Crème / lin | `#F7F1E6` | fond principal, texte sur foncé |
| Crème profond | `#EFE5D2` | fond galerie |
| Terre cuite | `#B0532F` | accent, CTA primaire (hover `#94431F`) |
| Bordeaux profond | `#6E2A2A` | sections carte/réserver, marque (foncé `#561F1F`) |
| Vert sauge | `#8A9A7B` | badges, créneaux actifs (foncé `#6F7E62` = fond infos) |
| Doré laiton | `#C2A14D` | accents, prix (clair `#D8BC73`) |
| Brun chocolat | `#3A2C22` | texte (`--ink`), footer ; texte adouci `#6b574a` |

### Typographie
- **Titres** : `Playfair Display` (500/600/700/800, italique 500/600). `line-height: 1.08`, `letter-spacing: -0.01em`.
- **Corps** : `Mulish` (400/500/600/700/800). Corps `line-height: 1.65`.
- **Échelle (clamp, mobile-first)** : display `clamp(2.6rem,9vw,5.5rem)` · h1 `clamp(2rem,6.5vw,3.4rem)` · h2 `clamp(1.6rem,5vw,2.6rem)` · h3 `clamp(1.2rem,3.6vw,1.5rem)` · lead `clamp(1.05rem,2.6vw,1.3rem)` · body `1.05rem` · small `0.9rem`.
- **Eyebrow** : Mulish 800, 0.78rem, `letter-spacing:.22em`, uppercase, terre cuite, avec trait doré 26×2px avant.

### Espacements & rayons
- `--pad-x: clamp(1.15rem,5vw,4.5rem)` · `--section-y: clamp(3.5rem,9vw,7rem)` · `--maxw: 1180px` · header `68px`.
- Rayons : `--radius: 14px`, `--radius-lg: 22px`, boutons `999px`.
- Ombres : douce `0 18px 40px -22px rgba(58,44,34,.45)` · carte `0 22px 50px -28px rgba(58,44,34,.55)`.

### Boutons
- Base : Mulish 800, `min-height: 52px` (lg 58px), radius 999px, `white-space: nowrap`, hover `translateY(-2px)`.
- Variantes : `primary` (terre cuite plein), `ghost` (bordure bordeaux), `cream` (crème/bordeaux), `glass` (translucide bordeaux + blur, **réservé au hero sur photo**), `lg`, `block`.

### Accessibilité
- `:focus-visible` : outline doré 3px, offset 3px. Hit targets ≥ 44–52px. Lien d'évitement « Aller à la carte ». Labels explicites, `aria-pressed` sur boutons-bascule, `aria-label` sur les ★.

---

## Assets
- **Photos** : placeholders **Unsplash** (libres de droits), chargées par URL avec `loading="lazy"`. Liste complète des `photo-id` dans `data.js` (clé `images`). **À remplacer par les vraies photos du restaurant** — en priorité un **vrai portrait de Laurence** pour « Notre histoire » (actuellement une photo « fait maison »).
- **Repli (`<Img>`)** : si une URL échoue, affiche un bloc dégradé terre-cuite→bordeaux avec icône couverts + libellé — aucune image cassée.
- **Icônes** : SVG inline au trait (`icons.jsx`), `stroke-width 1.8`, currentColor — aucune dépendance externe. Remplaçables par la librairie d'icônes du codebase (Lucide conviendrait, style identique).
- **Polices** : Google Fonts (Playfair Display + Mulish). En prod, préférer un self-host (`@fontsource`) pour la perf/RGPD.

## Files (références dans ce bundle)
- `Les Poulettes du Bec.html` — point d'entrée (monte React + scripts).
- `styles.css` — **tous les styles et tokens** (source de vérité visuelle).
- `data.js` — contenu : images, menu, avis, horaires, infos.
- `icons.jsx` — icônes SVG + composant `Stars`.
- `sections-a.jsx` — `Img`, header, hero, bandeau, histoire.
- `sections-b.jsx` — carte, galerie, avis, infos.
- `reservation.jsx` — formulaire interactif + confirmation (logique créneaux/validation).
- `app.jsx` — assemblage, footer, CTA mobile, panneau Tweaks (démo).
- `tweaks-panel.jsx` — shell du panneau de démo (**non destiné à la prod**).

> Source de vérité : `styles.css` pour le visuel, `data.js` pour le contenu, `reservation.jsx` pour la logique métier du formulaire.
