# Handoff : Site vitrine « Atelier Web Normandie »

> Site web vitrine one-page (création de sites internet + SEO en Normandie), style **glassmorphism**, entièrement en français, avec mode clair/sombre, un parcours d'estimation de devis en 5 étapes, et un panneau de personnalisation (6 palettes + variantes de style).

---

## 1. Aperçu

Site marketing one-page pour une agence/freelance de création de sites web et de référencement SEO basé en Normandie. Objectif : présenter les services, rassurer, et **convertir le visiteur en demande de devis**. Le point d'orgue est un **assistant d'estimation interactif** qui qualifie le projet et pré-remplit le formulaire de contact.

## 2. À propos des fichiers de design

Les fichiers de ce dossier sont des **références de design réalisées en HTML/CSS/JS** — des prototypes montrant l'apparence et le comportement attendus, **et non du code de production à copier tel quel**.

La tâche consiste à **recréer ce design dans l'environnement cible** (idéalement **Next.js + React + TypeScript + Tailwind CSS**, ou le framework déjà en place) en suivant ses conventions. Si aucun environnement n'existe, **Next.js (App Router) + Tailwind** est recommandé pour un site vitrine : SEO/SSR natif, performances, et déploiement simple (Vercel/Netlify).

> ⚠️ Le panneau de Tweaks (`tweaks.jsx` / `tweaks-panel.jsx`) est un **outil de prototypage interne** pour comparer les directions visuelles. **Il ne doit PAS être porté en production.** Choisissez UNE palette + UN jeu de variantes définitifs avec le client, puis figez-les en thème unique (voir §10).

## 3. Fidélité

**Haute fidélité (hi-fi).** Couleurs, typographie, espacements, rayons, ombres et interactions sont définitifs. Recréez l'UI au pixel près en utilisant les composants/librairies de la codebase cible. Les textes français sont rédigés et prêts ; les coordonnées et certaines données sont des **placeholders à remplacer** (voir §11).

---

## 4. Stack recommandée

- **Next.js (App Router)** + **React** + **TypeScript**
- **Tailwind CSS** avec les design tokens du §9 mappés dans `tailwind.config`, OU CSS Modules / variables CSS (le design actuel repose sur des variables CSS `--*`, facilement transposables).
- **Polices** : `next/font/google` pour Space Grotesk (display) + Manrope (body).
- **Icônes** : remplacer les SVG inline par **lucide-react** (le set actuel est du Lucide redessiné à la main → correspondance quasi 1:1, voir §8).
- **Formulaire** : `react-hook-form` + `zod` pour la validation ; brancher l'envoi sur un service (Resend, Formspree, route API Next).
- **Animations au scroll** : Intersection Observer natif, `framer-motion`, ou `react-intersection-observer`.

---

## 5. Structure de la page (ordre des sections)

Toutes les sections sont centrées dans un conteneur `max-width: 1180px` (`.wrap`), padding vertical `110px` (desktop) / `80px` (mobile).

1. **Barre de navigation** (sticky, flottante en verre)
2. **Hero** — titre + 2 CTA + 3 stats + carte visuelle « navigateur »
3. **Services** — grille de 9 cartes (icône + titre + description)
4. **Pourquoi me choisir** — grille de 6 cartes numérotées
5. **Réalisations** — grille de 6 cartes projet (aperçu dégradé + métriques)
6. **Tarifs** — 3 forfaits, celui du milieu (« Pro ») mis en avant
7. **Estimation / devis** — assistant 5 étapes ⭐ (pièce maîtresse)
8. **Processus** — 5 étapes numérotées
9. **Témoignages** — 3 cartes avis (5 étoiles + citation + auteur)
10. **FAQ** — 6 accordéons
11. **Contact** — formulaire en panneau de verre + cartes infos
12. **Footer** — marque, colonnes de liens, réseaux sociaux, mentions

Le contenu des grilles (services, why, works, pricing, process, testimonials, faq) est **généré en JS à partir de tableaux de données** dans `script.js`. En React, transformez ces tableaux en data + `.map()` sur des composants.

---

## 6. Le système visuel « glass »

La primitive centrale est la classe `.glass`, réutilisée partout :

```css
.glass {
  background: var(--glass-fill);                         /* blanc translucide */
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border: 1px solid var(--glass-border);                 /* fine bordure blanche */
  box-shadow: var(--shadow-glass), inset 0 1px 0 var(--glass-hi); /* reflet interne en haut */
  border-radius: var(--radius);
}
```

**Arrière-plan « aurora »** (`.aurora`, `position: fixed; inset:0; z-index:-2`) : 4 cercles colorés (`span.b1`–`.b4`) très floutés (`filter: blur(90px)`) qui dérivent lentement en boucle (`@keyframes drift1/2/3`, 22–30s, `alternate`). Une fine trame de points (`::after`, `radial-gradient` 4×4px, opacité 0.5) ajoute du grain. Les cercles utilisent des couleurs semi-transparentes (`--blob-1`…`--blob-4`).

**Survol des cartes** : `translateY(-7px)` + ombre renforcée + bordure plus marquée, transition `0.4s cubic-bezier(0.22,1,0.36,1)`.

**Apparition au scroll** (`.reveal`) : `opacity:0; translateY(28px)` → `.in` : `opacity:1; transform:none`, transition `0.7s`. Classes `.d1`–`.d4` = délais échelonnés (0.08s…0.32s) pour un effet en cascade. Respecte `prefers-reduced-motion`.

---

## 7. Design tokens

> Définis comme variables CSS dans `:root` / `[data-theme="…"]` de `styles.css`. La palette par défaut est **« Océan » (indigo → cyan)**.

### Couleurs de marque (palette Océan, défaut)
| Token | Hex | Usage |
|---|---|---|
| `--indigo` | `#6366f1` | Début des dégradés, logo |
| `--indigo-deep` | `#4338ca` | Variante foncée |
| `--blue` | `#3b82f6` | Milieu des dégradés |
| `--cyan` | `#22d3ee` | Accent principal, boutons |
| `--turquoise` | `#2dd4bf` | Accent lumineux, fin des dégradés |

**Dégradé signature** (titres, boutons primaires, barres) :
`linear-gradient(100deg, var(--indigo) 0%, var(--blue) 45%, var(--cyan) 100%)`
Le texte dégradé utilise `background-clip: text` + `-webkit-text-fill-color: transparent` (classe `.gradient-text`).

### Mode SOMBRE (défaut)
| Token | Valeur |
|---|---|
| `--bg` | `#070912` |
| `--bg-2` | `#0b0f22` |
| `--text` | `#f2f5ff` |
| `--text-muted` | `#aab2cf` |
| `--text-faint` | `#7a83a3` |
| `--glass-fill` | `rgba(255,255,255,0.055)` |
| `--glass-fill-strong` | `rgba(255,255,255,0.09)` |
| `--glass-border` | `rgba(255,255,255,0.13)` |
| `--glass-border-strong` | `rgba(255,255,255,0.22)` |
| `--glass-hi` (reflet) | `rgba(255,255,255,0.4)` |

### Mode CLAIR (`[data-theme="light"]`)
| Token | Valeur |
|---|---|
| `--bg` | `#eef1ff` |
| `--bg-2` | `#e6ecff` |
| `--text` | `#0f1230` |
| `--text-muted` | `#4a5273` |
| `--text-faint` | `#767ea0` |
| `--glass-fill` | `rgba(255,255,255,0.55)` |
| `--glass-fill-strong` | `rgba(255,255,255,0.72)` |
| `--glass-border` | `rgba(255,255,255,0.8)` |
| `--glass-hi` | `rgba(255,255,255,0.9)` |
| `--accent-text` | `#0c8aa6` |

### Typographie
| | Famille | Poids utilisés |
|---|---|---|
| Display (`--font-display`) | **Space Grotesk** | 400, 500, 600, 700 |
| Corps (`--font-body`) | **Manrope** | 400, 500, 600, 700, 800 |

Échelle (clamp responsive) :
- H1 hero : `clamp(2.5rem, 5.2vw, 4.2rem)`, weight 600, `line-height:1.08`, `letter-spacing:-0.02em`
- H2 titres de section : `clamp(2rem, 4vw, 3.1rem)`, weight 600
- H3 cartes : `1.1`–`1.22rem`
- Corps : `1rem` base, `line-height:1.6` ; sous-titres `1.1`–`1.18rem`
- Eyebrow (sur-titre) : `0.78rem`, weight 700, `letter-spacing:0.16em`, `text-transform:uppercase`, couleur `--accent-text`, dans une pilule en verre.

### Rayons
| Token | Défaut |
|---|---|
| `--radius-sm` | `14px` |
| `--radius` | `22px` |
| `--radius-lg` | `30px` |
| `--radius-xl` | `40px` |
| Boutons | `999px` (pilule) |

### Ombres
- `--shadow-glass` : `0 18px 50px -12px rgba(15,14,60,0.45)`
- `--shadow-soft` : `0 10px 34px -14px rgba(15,14,60,0.3)`
- Survol carte : `0 30px 60px -18px rgba(15,14,60,0.6)`
- Bouton primaire : `0 10px 30px -8px rgba(34,211,238,0.6)` (lueur cyan)

### Easing
Courbe unique partout : `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease`).

### Espacement
Padding sections `110px`/`80px`. Gap des grilles `20px`. Padding interne des cartes `26`–`34px`. Conteneur `max-width:1180px`, padding latéral `24px`.

---

## 8. Composants — spécifications détaillées

### Navigation (`.nav` / `.nav-inner`)
- `position: fixed; top: 16px`, centrée, largeur max 1180px. Barre en verre arrondie `999px`.
- Gauche : **logo** = carré dégradé 38px (icône lignes + loupe) + « Atelier Web » / petit label « NORMANDIE » en accent.
- Centre/droite : liens (Services, Réalisations, Tarifs, À propos, Contact), `white-space:nowrap`.
- Droite : **bouton thème** (rond 40px, soleil/lune), **CTA « Devis gratuit »**, **burger** (mobile only).
- État `.scrolled` (ajouté quand `scrollY>24`) : ombre portée renforcée.
- < 720px : liens + CTA masqués, burger visible → ouvre `.mobile-menu` plein écran en verre.

### Hero
- Grille 2 colonnes `1.15fr / 0.85fr`, gap 50px (1 colonne < 1000px).
- Gauche : eyebrow → H1 (avec « **convertissent** » en `.gradient-text`) → sous-titre → 2 boutons (`.btn-primary` + `.btn-ghost`) → 3 stats (`+40` projets, `x2,5` trafic, `100%` sur-mesure).
- Droite : carte « navigateur » en verre (barre à 3 points + URL factice, lignes squelette, **mini bar-chart** animé `@keyframes grow`) + **2 badges flottants** (`.float-badge`, animation `floaty` ±12px) : « 1ʳᵉ page Google » et « Chargement < 1s ».

### Boutons (`.btn`)
- Pilule `999px`, weight 700, padding `14px 26px` (`.btn-sm` = `10px 20px`).
- **Primaire** : fond dégradé cyan→turquoise, texte `#04121a`, lueur cyan. Survol : `translateY(-3px)` + lueur renforcée.
- **Ghost** : fond verre, bordure `--glass-border-strong`, texte `--text`. Survol : `translateY(-3px)` + fond plus opaque.

### Cartes Services (`.card` + `.svc-ico`)
9 items. Icône dans un carré 54px arrondi 16px (dégradé indigo/cyan léger, bordure verre, icône couleur cyan) + H3 + paragraphe `--text-muted`. Survol : élévation. Données : voir `script.js` → `const services`.

### Pourquoi me choisir (`.why-card`)
6 cartes, layout horizontal : numéro `01`–`06` (carré 44px en verre, couleur accent) + titre + description.

### Réalisations (`.work-card`)
6 cartes. Haut : `.work-preview` ratio 16/10 avec **fond dégradé** propre à chaque projet (`w.g`), badge catégorie en haut-gauche, faux blocs d'UI. Bas : titre + description + **2 métriques** (`b` en couleur accent + label faint). Survol : élévation.

### Tarifs (`.price-card`)
3 forfaits (Essentiel 890€, **Pro 1 690€ — featured**, Premium 2 990€).
- Carte featured : `transform: scale(1.04)`, bordure renforcée, ombre cyan, **badge « Le plus choisi »** en haut-droite (pseudo-élément), bouton primaire (les autres : ghost).
- Structure : nom → description → « à partir de » + montant (Space Grotesk 2.6rem) + « € » → note → liste de features (puce = check turquoise) → bouton pleine largeur.
- ⚠️ **Piège CSS connu** : la règle `.reveal.in { transform: none }` écrase le `scale(1.04)` du featured. Résolu ici par des sélecteurs plus spécifiques (`.price-card.featured.reveal.in { transform: scale(1.04) }`). En React/Framer Motion, gérez l'échelle via une prop dédiée pour éviter ce conflit.

### Processus (`.step-card`)
5 étapes, grille `repeat(5,1fr)` (2 puis 1 colonne en responsive). Cercle numéroté 50px (dégradé cyan→turquoise) + titre + description, centré.

### Témoignages (`.quote-card`)
3 cartes : 5 étoiles (turquoise) → citation `blockquote` → auteur (avatar initiales en dégradé 46px + nom + rôle/ville).

### FAQ (`.faq-item`)
6 accordéons en verre. `.faq-q` = bouton pleine largeur (question + chevron rond qui pivote 180° à l'ouverture). `.faq-a` animé via `max-height` 0 → `scrollHeight`. **Un seul ouvert à la fois.**

### Contact (`.contact-grid`)
Grille `1fr / 0.85fr`.
- **Gauche** : `.form-panel` en verre. Champs : Nom + Email (rangée 2 col), Téléphone + Type de projet `<select>` (rangée 2 col), Message `<textarea>`, bouton « Envoyer ma demande » pleine largeur.
- Champs : fond verre, bordure verre, rayon `--radius-sm` ; focus → bordure cyan + halo `0 0 0 3px rgba(34,211,238,0.18)` ; erreur → bordure/halo rouge `#f87171` + message `.err-msg`.
- À l'envoi valide → le formulaire est masqué et `.form-success` (coche + message de remerciement) s'affiche.
- **Droite** : 3 cartes infos (Email, Téléphone, Zone d'intervention avec tags Rouen/Caen/Le Havre/Évreux/À distance).

### Footer
Grille 4 colonnes (`1.6fr 1fr 1fr 1fr`) : marque + texte + réseaux (LinkedIn, Instagram, Facebook) | Services | Entreprise | Contact. Barre du bas : copyright + Mentions légales / Politique de confidentialité / CGV.

### Icônes (§ référence Lucide)
Le set `ICONS` (dans `script.js`) et `I` (dans `quote.js`) sont des SVG Lucide redessinés (stroke 2.1, linecap/linejoin round, viewBox 24). Correspondances **lucide-react** : vitrine→`Store`, ecom→`ShoppingCart`, landing→`LayoutTemplate`, seo→`Search`, local→`MapPin`, maint→`Wrench`, speed→`Gauge`, responsive→`MonitorSmartphone`, host→`Server`, check→`Check`, star→`Star`, chevron→`ChevronDown`, rocket→`Rocket`, calendar→`Calendar`, clock→`Clock`, etc.

---

## 9. ⭐ Parcours d'estimation (assistant de devis) — `quote.js`

C'est la fonctionnalité la plus importante à reproduire fidèlement.

### Comportement
Assistant **5 étapes** + **écran résultat**, dans un seul panneau en verre (`.quote-panel`, max-width 880px) :
1. En-tête : libellé de l'étape + « Étape X / 5 » + **barre de progression** (`.qp-fill`, largeur = `((step)/5)*100 + 20` %).
2. Corps : question + aide + grille d'**options cliquables** (`.opt`) ; sélection → bordure cyan + halo + coche animée + icône qui passe en plein.
3. Pied : **estimation live** à gauche (fourchette `bas – haut €`, mise à jour à chaque clic) + boutons Précédent / Suivant. « Suivant » **désactivé** tant qu'aucune option requise n'est choisie.

### Les 5 étapes (et leur impact sur le prix)
| # | Étape | Type | Effet sur le prix |
|---|---|---|---|
| 1 | **Type de projet** | choix unique (requis) | prix de base : Vitrine 890, E-commerce 2490, Landing 590, Refonte 990, Sur-mesure 3500 |
| 2 | **Taille du site** | choix unique | +0 / +400 / +900 / +1800 (selon nb de pages) |
| 3 | **Fonctionnalités** | **choix multiple** (peut être vide) | additionne : blog +350, RDV +450, paiement +600, espace membre +700, multilingue +500, galerie +250, newsletter +200 |
| 4 | **Référencement** | choix unique | base +0, local +600, avancé +1200, aucun +0 |
| 5 | **Délai** | choix unique | multiplicateur : pas pressé ×1, standard ×1, **express ×1.2** |

### Calcul de la fourchette
```
total = base(type) + add(taille) + Σ add(fonctionnalités) + add(seo)
total = total × mult(délai)
bas   = arrondi(total)            au plus proche 10
haut  = arrondi(total × 1.18)     au plus proche 10   // +18% de marge
```
Affichage : `fourchette.toLocaleString('fr-FR')` → ex. « 2 690 – 3 180 € ».

### Écran résultat
Eyebrow → **montant en grand** (`.gradient-text`) → phrase « devis précis sous 24h » → **récapitulatif** (lignes clé/valeur de toutes les réponses) → 2 boutons :
- **« Recevoir mon devis détaillé »** → `sendToContact()` : pré-remplit le `<select>` Type de projet + remplit le `<textarea>` Message avec un résumé formaté (type, taille, fonctionnalités, SEO, délai, estimation), puis défile jusqu'au formulaire de contact et y met le focus.
- **« Recommencer »** → réinitialise l'état.

### État (à porter en `useReducer` ou `useState`)
```
state = { current: 0, answers: { type:null, size:null, features:[], seo:null, timing:null } }
```
Toute la définition des étapes/options/prix est dans le tableau `steps` de `quote.js` — **réutilisez-le tel quel** comme source de données.

---

## 10. Thème & variantes (panneau Tweaks — NON destiné à la production)

Le prototype expose un panneau de personnalisation (`tweaks.jsx`) qui pilote des attributs sur `<html>` :
- `data-palette` : `ocean` (défaut), `aurore`, `foret`, `sunset`, `nuit`, `ardoise` — chaque palette redéfinit `--indigo/--blue/--cyan/--turquoise/--blob-*/--accent-text` (voir bloc « PALETTES » dans `styles.css`).
- `data-theme` : `dark` (défaut) / `light`.
- `data-glass` : `subtil` (blur 9px) / `standard` (20px) / `prononce` (34px).
- `data-radius` : `doux` / `standard` / `genereux`.
- `data-bg` : `aurora` (animé) / `degrade` (figé) / `minimal` (sans cercles).

**En production** : décidez d'UNE combinaison avec le client (par défaut : `ocean` + `dark` + `standard` + `standard` + `aurora`), figez ces valeurs, **supprimez `tweaks.jsx`, `tweaks-panel.jsx` et les blocs de variantes inutilisés**. Conservez en revanche le **toggle clair/sombre** de l'en-tête si vous voulez offrir les deux modes (état persisté dans `localStorage` sous la clé `awn-theme`).

---

## 11. Contenu & placeholders à remplacer

Tous les textes sont en français définitif, **sauf** ces placeholders (marque fictive cohérente, à valider avec le client) :
- **Nom** : « Atelier Web Normandie » (logo + footer) — alternatives proposées : Estuaire Digital, Pixel Normandie.
- **Email** : `contact@atelierwebnormandie.fr`
- **Téléphone** : `06 XX XX XX XX` (liens `tel:` + carte contact + footer)
- **Réseaux sociaux** : liens `href="#"` à remplacer (LinkedIn, Instagram, Facebook).
- **Pages légales** : Mentions légales / Politique de confidentialité / CGV → liens `#` à créer.
- **Réalisations & métriques** : projets et chiffres **fictifs** (Menuiserie Lecomte, Cidres du Bocage…) à remplacer par de vrais cas.
- **Témoignages** : avis fictifs à remplacer par de vrais témoignages.
- **Stats hero** (+40 projets, x2,5 trafic) : à ajuster selon la réalité.

---

## 12. Responsive

- **> 1000px** : pleines grilles (services/why 3 col, works 3 col, process 5 col, hero 2 col).
- **≤ 1000px** : grilles 3→2 et 4→2 col, process 2 col, hero 1 col, footer 2 col.
- **≤ 720px** : tout en 1 colonne ; nav → burger + menu plein écran ; sections padding `80px` ; featured pricing sans scale ; pied de l'assistant en colonne. Hit targets ≥ 44px.

## 13. Accessibilité & perfs

- `prefers-reduced-motion` : neutralise animations/reveals (déjà géré).
- `color-scheme` déclaré par thème. Vérifier les contrastes AA après choix de palette définitive (certaines palettes comme « sunset » ont un accent clair à valider sur fond clair).
- `backdrop-filter` est coûteux : limiter le nombre d'éléments `.glass` simultanés à l'écran ; prévoir un fallback (fond plus opaque) si non supporté.
- Polices via `next/font` (pas d'`@import` Google bloquant). Lazy-load des sections hors écran.
- Form : ajouter de vrais attributs `name`, `aria-*`, et un honeypot anti-spam.

---

## 14. Fichiers de ce bundle

| Fichier | Rôle |
|---|---|
| `index.html` | Structure des 12 sections + inclusion des scripts |
| `styles.css` | **Tout le design system** : tokens, thèmes, palettes, variantes, composants, responsive |
| `script.js` | Données des grilles + rendu + interactions (thème, menu, scroll-reveal, FAQ, validation formulaire) |
| `quote.js` | **Assistant d'estimation** (étapes, options, calcul, résultat, pré-remplissage contact) |
| `tweaks.jsx` | Panneau de personnalisation — **prototype uniquement, à ne pas porter** |
| `tweaks-panel.jsx` | Librairie interne du panneau de Tweaks — **prototype uniquement** |

> Pour faire tourner les prototypes localement : ouvrez `index.html` dans un navigateur (les polices et React sont chargés via CDN). Aucune étape de build nécessaire pour la référence.
