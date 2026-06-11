# Handoff: Site d'annonces automobiles — « Rouvier Automobiles »

## Overview
Site vitrine pour un concessionnaire / garage indépendant qui vend ses propres véhicules d'occasion. Trois écrans : page d'accueil avec recherche, liste des annonces avec filtres, et fiche détaillée d'un véhicule avec formulaire de demande d'essai. Le tout est responsive (desktop + mobile), avec favoris persistants et un système de thèmes (3 directions visuelles × clair/sombre).

« Rouvier Automobiles » est un nom fictif — remplacer par le vrai nom, les vraies coordonnées et les vraies annonces.

## About the Design Files
Les fichiers de ce dossier sont des **références de design réalisées en HTML/React (Babel inline)** — des prototypes montrant le rendu et le comportement attendus, **pas du code de production à copier tel quel**. La tâche est de **recréer ces designs dans l'environnement du codebase cible** (React/Next, Vue, etc.) avec ses patterns et librairies existants. Si aucun environnement n'existe encore, choisir le framework le plus adapté (un site vitrine de ce type se prête bien à Next.js ou Astro avec rendu statique + un peu d'interactivité client).

Notes spécifiques aux prototypes :
- Les `<image-slot>` sont des placeholders de photos drag-and-drop propres à l'outil de design. En production, les remplacer par de vraies images (`<img>` / `next/image`) avec ratio fixe et `object-fit: cover`.
- `tweaks-panel.jsx` est un panneau de réglages de design (pour comparer les directions visuelles). Ne pas l'implémenter en production — il sert uniquement à choisir le thème final.
- Le routage est simulé en state React + localStorage. En production, utiliser de vraies routes (`/`, `/vehicules`, `/vehicules/[id]`).

## Fidelity
**High-fidelity (hifi).** Couleurs, typographies, espacements, rayons, ombres et interactions sont finaux. Recréer l'UI au pixel près avec les valeurs des tokens ci-dessous.

⚠️ Le prototype contient **3 directions visuelles** commutables (Épuré / Premium / Chaleureux) plus mode sombre. **La direction par défaut est « Épuré » clair** — implémenter celle que le client aura validée ; les autres jeux de tokens sont fournis à titre de référence.

## Screens / Views

### 1. Page d'accueil (`/`)
**Purpose** : présenter le garage, rassurer (garantie, révision, reprise), lancer une recherche, montrer une sélection de véhicules.

**Layout** : container max 1180px, padding latéral 28px (18px mobile).
1. **Header sticky** (68px de haut, fond `--bg` à 82 % d'opacité + `backdrop-filter: blur(14px)`, bordure basse 1px `--border`) : logo texte « ROUVIER » (font display 21px/700, letter-spacing 0.06em) + « AUTOMOBILES » (11px uppercase, letter-spacing 0.22em, couleur `--muted`) ; nav à droite (Accueil / Nos véhicules / Favoris avec compteur en pastille `--accent`) ; bouton téléphone pill (border 1px `--border`, fond `--surface`).
2. **Hero** (padding 64px 0 56px) : grille 2 colonnes `1.05fr 0.95fr`, gap 56px.
   - Colonne gauche : eyebrow accent (12.5px, uppercase, letter-spacing 0.18em, tiret 28×2px avant) « Garage indépendant depuis 1987 » ; H1 `clamp(38px, 4.6vw, 58px)` « Des occasions révisées, garanties, prêtes à rouler. » ; lead 17.5px `--muted` max 46ch ; **carte de recherche** (fond `--surface`, border 1px `--border`, radius `--radius`, padding 22px, ombre `--shadow`) en grille `1fr 1fr 1fr auto` : selects Marque / Énergie / Budget max + bouton primaire « Rechercher » avec icône loupe.
   - Colonne droite : photo 400px de haut radius 18px, avec tag flottant en bas à gauche (« 9 véhicules en stock », fond `--surface`, icône bouclier).
3. **Bandeau de confiance** : 3 cartes en grille (icône 40×40 radius 12px fond accent à 13 %, titre 15px bold, sous-texte 13.5px muted) : Garantie 12 mois / Révisés en atelier / Reprise de votre véhicule.
4. **Section « La sélection du moment »** (padding 52px 0) : titre `clamp(26px,3vw,34px)` + lien « Tout le stock → » couleur accent ; grille de 3 cartes véhicule (voir composant CarCard).
5. **Footer** : bordure haute 1px, 3 colonnes (adresse / horaires / contact), note légale 12.5px.

**Responsive** : <960px hero passe en 1 colonne, recherche en 2 colonnes (bouton pleine largeur), trust en 1 colonne ; <700px recherche 1 colonne, lien « Accueil » masqué, numéro de téléphone réduit à l'icône.

### 2. Liste des annonces (`/vehicules`)
**Purpose** : parcourir tout le stock, filtrer, trier, marquer des favoris.

**Layout** :
1. Page head (padding 44px 0 6px) : H1 `clamp(30px,3.6vw,42px)` « Nos véhicules » + sous-titre muted.
2. **Barre de filtres sticky** (sous le header, top 68px, fond `--bg` flouté) : selects Marque / Énergie / Boîte (hauteur 42px, fond `--surface`) ; **slider budget** 12 000 → 30 000 € pas 500 (dans une pill avec valeur affichée, `accent-color: var(--accent)`) ; toggle « Favoris » (actif = fond accent, texte `--on-accent`) ; select de tri (prix ↑/↓, kilométrage, plus récents) ; compteur de résultats aligné à droite.
3. Grille de cartes `repeat(auto-fill, minmax(300px, 1fr))`, gap 22px.
4. **État vide** : encart centré padding 70px, bordure 1px dashed, message adapté (aucun favori vs aucun résultat).

La vue « Favoris » est la même page avec le toggle Favoris pré-activé.

### 3. Fiche véhicule (`/vehicules/[id]`)
**Purpose** : consulter le détail d'une annonce et demander un essai.

**Layout** : lien retour (← Retour aux annonces) ; grille `1.45fr 1fr`, gap 36px.
- **Colonne gauche** : photo principale 430px radius 14px ; 3 vignettes 110px en grille ; **grille de specs** 4 colonnes (cellules `--surface`, border, radius `--radius-sm`, padding 14px 16px : icône accent + label 11.5px uppercase muted + valeur 15.5px bold) — Année, Kilométrage, Énergie, Boîte, Puissance, Portes, Couleur, Garantie ; section Description (H2 22px + paragraphe muted) ; section Équipements (grille 2 colonnes, item = check accent + texte 14.5px muted).
- **Colonne droite, sticky top 92px** :
  - **Carte titre** : H1 27px + bouton favori cœur ; version 14.5px muted ; badges ; prix 34px/800 + « ou dès X €/mois* » ; mention financement 13px.
  - **Carte contact « Essayer ce véhicule »** : sous-titre « Réponse sous 2 h ouvrées » ; champs Nom + Téléphone (2 colonnes), select Créneau (Indifférent / semaine matin / semaine après-midi / samedi), textarea Message optionnel ; bouton primaire pleine largeur « Demander un essai » (désactivé/opacité 0.45 tant que nom + téléphone vides) ; bouton ghost téléphone. Après envoi : état succès (icône check dans un disque accent 52px, « Demande envoyée », sous-texte de confirmation, bouton pour renvoyer).

**Responsive** : <960px une colonne, side non-sticky, specs en 2 colonnes, photo 300px.

## Components

### CarCard (carte véhicule)
- Conteneur : fond `--surface`, border 1px `--border`, radius `--radius`, overflow hidden, cursor pointer. Hover : `translateY(-3px)`, ombre `--shadow-lift`, bordure teintée accent. Transition 0.18s ease.
- Photo : ratio fixe, 200px de haut. Badges en overlay haut-gauche (max 2). Bouton favori haut-droit.
- Corps (padding 18px 20px 20px, flex column gap 10px) : titre « Marque Modèle » 18px/700 font display ; version 13.5px muted ; rangée de **spec-chips** (pills 12.5px, fond texte à 5 %, icône 13px : année, km, énergie, boîte) ; pied séparé par bordure 1px dashed : prix 21px/800 à gauche, « dès X €/mois » 12.5px muted à droite.

### Badge
Pill 11.5px/700, padding 4px 10px, fond `--surface` + border `--border` + ombre légère. Variante accent (fond `--accent`, texte blanc) pour « Électrique » et « Première main ». Labels utilisés : Garantie 12 mois, Contrôle technique OK, Révision faite, Première main, Faible kilométrage, Électrique.

### Bouton favori
38×38px rond, fond surface semi-transparent + blur 6px, icône cœur 18px stroke. Hover : scale 1.08 + couleur accent. Actif : cœur rempli couleur accent, bordure accent. Stoppe la propagation du clic (ne doit pas ouvrir la fiche).

### Boutons
- `btn-primary` : fond `--accent`, texte blanc, 15px/600, padding 13px 24px, radius `--radius-sm`. Hover : ombre portée accent 40 %. Active : scale 0.98.
- `btn-ghost` : transparent, border 1px `--border`. Hover : bordure et texte accent.

### Champs de formulaire
Hauteur 46px (42px dans la barre de filtres), border 1px `--border`, radius `--radius-sm`, fond `--bg` (ou `--surface` dans les filtres). Focus : bordure accent + ring `0 0 0 3px` accent à 18 %. Labels 12px/700 uppercase letter-spacing 0.08em muted. Les selects ont un chevron custom dessiné en CSS (carré 8px tourné 45°).

### Icônes
SVG inline 24×24, stroke 1.8px, `stroke-linecap/linejoin: round`, `currentColor`. Set : cœur, compteur, calendrier, pompe, boîte de vitesses, éclair, loupe, flèches, téléphone, check, bouclier, clé à molette, clé, portes, palette. Pas de librairie d'icônes dans le proto — en prod, Lucide est le match le plus proche (mêmes conventions de stroke).

## Interactions & Behavior
- **Navigation** : logo → accueil ; carte véhicule → fiche ; « Rechercher » (accueil) → liste avec filtres pré-remplis ; « Favoris » (header) → liste avec toggle favoris actif ; « Retour aux annonces » → liste.
- **Filtres** : application instantanée (pas de bouton « Appliquer »). Combinaison ET de tous les critères. Tri par défaut : prix croissant.
- **Favoris** : toggle au clic sur le cœur, persistés (localStorage dans le proto ; en prod localStorage suffit pour un site sans comptes). Compteur dans le header.
- **Formulaire d'essai** : validation minimale (nom + téléphone requis, bouton désactivé sinon) ; soumission → état succès inline (pas de redirection). En prod : POST vers un endpoint / service d'e-mail.
- **Animations d'entrée** : `fadeUp` 0.5s ease (translateY 14px → 0, opacity 0 → 1), délais en cascade 0.06s/0.12s/0.18s. Sous `@media (prefers-reduced-motion: no-preference)` uniquement.
- **Hover cartes** : lift -3px + ombre, 0.18s ease.
- **Scroll** : remonter en haut de page à chaque navigation.

## State Management
- `route` : page courante + id véhicule + filtres initiaux (→ vraies routes en prod).
- `favs` : tableau d'ids, persisté.
- Filtres locaux à la page liste : marque, énergie, boîte, budget max (slider), tri, toggle favoris.
- Formulaire contact : nom, téléphone, créneau, message, état envoyé.
- Données : tableau statique de 9 véhicules dans `cars-data.js` (champs : id, brand, model, version, year, km, price, monthly, fuel, gearbox, power, doors, color, badges[], featured, description, equipment[]). En prod, à remplacer par la vraie source (CMS, DB, flux du DMS du garage).

## Design Tokens

### Direction « Épuré » (défaut)
| Token | Clair | Sombre |
|---|---|---|
| `--bg` | `#F5F6F8` | `#0F1115` |
| `--surface` | `#FFFFFF` | `#171A21` |
| `--text` | `#15181E` | `#F2F4F8` |
| `--muted` | `#5E6673` | `#99A2B0` |
| `--border` | `#E3E6EB` | `#272C36` |
| `--accent` | `#2B5CE6` | `#6489F2` |
| `--on-accent` | `#FFFFFF` | `#FFFFFF` |
| `--radius` | `14px` | — |
| `--radius-sm` | `10px` | — |
| `--shadow` | `0 10px 30px -14px rgba(21,24,30,0.14)` | `0 12px 32px -14px rgba(0,0,0,0.55)` |
| `--shadow-lift` | `0 18px 40px -16px rgba(21,24,30,0.22)` | `0 20px 44px -16px rgba(0,0,0,0.65)` |

### Directions alternatives (référence)
- **Premium** : accent or `#A8842C` (sombre `#C9A24B`), fonds ivoire `#F5F2EA`/`#FFFDF8` (sombre `#0D0C09`/`#171510`), radius 6px/4px.
- **Chaleureux** : accent terracotta `#C8552F` (sombre `#E0714A`), fonds crème `#FAF4EB`/`#FFFFFF` (sombre `#1C1712`/`#27211A`), radius 20px/12px.
- Accents alternatifs proposés : `#2B5CE6`, `#A8842C`, `#C8552F`, `#1F6E50` (vert).

### Typographie
| Rôle | Défaut (« Moderne ») | Alt. « Élégante » | Alt. « Caractère » |
|---|---|---|---|
| Display (titres, prix, logo) | Space Grotesk 500–700 | Marcellus 400 | Bricolage Grotesque 500–800 |
| Body | Manrope 400–800 | Figtree 400–800 | Albert Sans 400–800 |
| Tracking display | `-0.015em` | `0.01em` | `-0.005em` |

Toutes via Google Fonts. Échelle : H1 hero `clamp(38px,4.6vw,58px)` ; H1 pages `clamp(30px,3.6vw,42px)` ; H2 sections `clamp(26px,3vw,34px)` ; H2 fiche 22px ; titre carte 18px ; prix carte 21px ; prix fiche 34px ; body 16px / 1.55 ; secondaire 13.5–14.5px ; labels 11.5–12px uppercase.

### Espacements
Container 1180px, gouttières 28px (18px mobile). Sections 52px vertical. Gaps de grilles : 22px (cartes), 36px (fiche), 56px (hero). Padding cartes : 22–26px. Échelle générale : 4 / 8 / 12 / 16 / 20 / 24 / 28 / 36 / 44 / 52 / 64.

## Assets
- **Aucune image fournie** — tous les visuels sont des emplacements à remplir par le client (photo hero, 1 photo par véhicule, 3 vignettes par fiche). Prévoir des ratios fixes : carte ~3:2 (300×200), hero ~4:3, galerie principale ~16:10.
- Icônes : SVG inline décrits ci-dessus (sources dans `ui-components.jsx`).
- Logo : texte stylé uniquement, pas de fichier logo.

## Files
| Fichier | Rôle |
|---|---|
| `Rouvier Automobiles.html` | Point d'entrée (charge React + Babel + les scripts) |
| `styles.css` | Toute la feuille de style (tokens consommés via `var(--*)`) |
| `cars-data.js` | Données des 9 véhicules + helpers de formatage FR |
| `ui-components.jsx` | Icônes, Badge, FavBtn, CarCard, Header, Footer |
| `pages.jsx` | HomePage + ListingPage (filtres/tri) |
| `detail-page.jsx` | DetailPage + formulaire de contact |
| `app.jsx` | App : thèmes/tokens, routage, favoris, panneau Tweaks |
| `image-slot.js` | Composant placeholder photo (outil de design — ne pas porter en prod) |
| `tweaks-panel.jsx` | Panneau de réglages (outil de design — ne pas porter en prod) |

Ouvrir `Rouvier Automobiles.html` dans un navigateur pour voir le prototype vivant (nécessite une connexion pour React/Babel/fonts via CDN).
