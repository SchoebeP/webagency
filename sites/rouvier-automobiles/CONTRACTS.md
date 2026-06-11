# CONTRACTS — Rouvier Automobiles (foundation → page/admin agents)

> Ce fichier est le **contrat de build figé** (interfaces convenues entre
> agents pendant la construction). Pour l'exploitation et le déploiement,
> **README.md fait foi**.

Skeleton Next.js 15 App Router, TypeScript strict, **zéro dépendance ajoutée**
(node:crypto pour l'auth, JSON-fichier pour la persistance). Direction visuelle
« Épuré » clair par défaut + mode sombre via `[data-theme="dark"]` sur `<html>`.

## Arborescence livrée

```
app/layout.tsx            chrome global (fonts, Header/Footer, script thème)
app/globals.css           feuille de style hi-fi portée du proto (voir inventaire CSS)
app/page.tsx              STUB — à remplacer (accueil)
app/vehicules/page.tsx    STUB — à remplacer (liste + filtres)
app/vehicules/[id]/page.tsx STUB — à remplacer (fiche)
app/admin/login/page.tsx  STUB — à remplacer (login)
components/ui.tsx         Icon, Badge, FavBtn, CarPhoto, CarCard, useFavorites
components/header.tsx     Header (client)
components/footer.tsx     Footer (client)
lib/types.ts  lib/db.ts  lib/auth.ts  lib/format.ts
middleware.ts             garde cookie sur /admin/*
```

## Accès aux données (règle d'or)

- **Server components / Server Actions / Route Handlers** : appeler `lib/db`
  directement (synchrone). Ne JAMAIS importer `lib/db` ou `lib/auth` depuis un
  composant client.
- **Composants clients** : reçoivent les données en props (objets `Vehicle`
  sérialisables).
- ⚠️ Toute page publique qui lit la base doit exporter
  `export const dynamic = "force-dynamic";` — sinon Next la prérend au build et
  fige les données (les modifs admin n'apparaîtraient pas).

## lib/types.ts

```ts
interface Vehicle {
  id: string; brand: string; model: string; version: string;
  year: number; km: number; price: number; monthly: number;
  fuel: string; gearbox: string; power: string; doors: number; color: string;
  badges: string[]; featured: boolean; description: string; equipment: string[];
  sold: boolean;            // géré depuis /admin
  photos: string[];         // noms de fichiers uploadés, peut être vide
}
type RequestStatus = "new" | "handled";
interface TestDriveRequest {
  id: string; vehicleId: string; vehicleLabel: string;
  name: string; phone: string; slot: string; message: string;
  createdAt: string;        // ISO 8601
  status: RequestStatus;
}
interface AdminAccount { email: string; passwordHash: string; salt: string; }
```

## lib/db.ts (synchrone, écriture atomique tmp+rename)

```ts
const DATA_DIR: string                 // env DATA_DIR || <cwd>/data
const PHOTOS_DIR: string               // DATA_DIR/photos (créé au premier write)
function getVehicles(): Vehicle[]
function getVehicle(id: string): Vehicle | undefined
function saveVehicle(vehicle: Vehicle): void          // upsert par id
function deleteVehicle(id: string): void              // ne supprime PAS les fichiers photo
function addRequest(input: Omit<TestDriveRequest, "id" | "createdAt" | "status">): TestDriveRequest
function getRequests(): TestDriveRequest[]            // triées plus récentes d'abord
function setRequestStatus(id: string, status: RequestStatus): void
function getAdmin(): AdminAccount
function setAdminPassword(newPassword: string): void  // re-sale + re-hash (scrypt), rotation sessionSecret, rm .admin-credentials
function verifyPassword(email: string, password: string): boolean  // timing-safe
function getSessionSecret(): string
```

Seed au premier accès : les 9 véhicules du proto (`photos: []`, `sold: false`),
admin `admin@rouvier-automobiles.fr`, `sessionSecret` aléatoire 32 octets.
Mot de passe : `env ADMIN_PASSWORD` si fourni ; sinon généré aléatoirement et
écrit dans `DATA_DIR/.admin-credentials` (0600) pour l'opérateur — **aucun
mot de passe par défaut codé en dur**. Hashé scrypt dans db.json.

## lib/auth.ts — flux d'authentification

Jeton : `admin.<expiryMs>.<hmacSha256Hex>` signé avec `env SESSION_SECRET`
(sinon `sessionSecret` de db.json). Validité 7 jours.
Cookie : **`rouvier_session`**, httpOnly, SameSite=Lax, path=/,
`secure` en production (NODE_ENV) — prévoir HTTPS derrière nginx.

```ts
const SESSION_COOKIE = "rouvier_session"
function createSessionToken(): string
function verifySessionToken(token: string | undefined | null): boolean
async function setSessionCookie(): Promise<void>   // Server Action / Route Handler uniquement
async function clearSessionCookie(): Promise<void> // idem
async function isAuthenticated(): Promise<boolean> // lit cookies(), vérifie le HMAC
```

### Approche layout-guard (décision documentée)

`node:crypto` n'existe pas sur l'edge runtime → **middleware.ts ne vérifie que
la PRÉSENCE du cookie** (`/admin/login` exempt, le reste de `/admin/*` redirige
vers `/admin/login` si cookie absent). La vérification cryptographique réelle
est faite côté Node :

1. **Agent admin** : créer `app/admin/(protected)/layout.tsx` (server component)
   qui fait `if (!(await isAuthenticated())) redirect("/admin/login");` et
   placer toutes les pages admin (sauf login) dans ce groupe.
2. **Chaque route API admin** (mutations, upload, etc.) doit revérifier :
   `if (!(await isAuthenticated())) return new Response(null, { status: 401 });`
3. Login = Server Action ou Route Handler : `verifyPassword(...)` puis
   `await setSessionCookie()` puis redirect. Logout : `await clearSessionCookie()`.

`middleware.ts` (matcher `/admin/:path*`) existe déjà — ne pas le durcir avec
du crypto, il casserait au build edge.

## lib/format.ts

```ts
formatPrice(n: number): string    // "14 990 €"   (séparateurs U+202F fr-FR)
formatKm(n: number): string       // "38 500 km"
formatMonthly(n: number): string  // "219 €/mois"  → préfixer "dès …" / "ou dès …*"
```

## components/ui.tsx (module CLIENT — "use client")

Importable depuis les server components (rendre du JSX) ; **ne jamais appeler
ses fonctions côté serveur** (ex. pas de `Icons.heart(18)` — utiliser `<Icon/>`).

```tsx
type IconName = "heart" | "gauge" | "calendar" | "fuel" | "gearbox" | "power"
  | "search" | "arrowRight" | "arrowLeft" | "phone" | "check" | "shield"
  | "wrench" | "key" | "doors" | "palette" | "sun" | "moon";
function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string })
function Badge({ label, accent }: { label: string; accent?: boolean })
  // accent auto pour "Électrique", "Première main", "Vendu"
function FavBtn({ vehicleId, staticPos }: { vehicleId: string; staticPos?: boolean })
  // staticPos → classe fav-btn-static (fiche véhicule) ; stopPropagation intégré
function CarPhoto({ vehicle, photoIndex = 0, alt, className }:
  { vehicle: Vehicle; photoIndex?: number; alt?: string; className?: string })
  // photos[photoIndex] → <img src="/api/photos/<filename>">, sinon placeholder
  // SVG déterministe (dégradé dérivé de vehicle.color + silhouette + "Photo à venir")
function CarCard({ vehicle, anim }: { vehicle: Vehicle; anim?: string })
  // navigue vers /vehicules/[id] ; anim = "fade-up-1" | "fade-up-2" | "fade-up-3"
function useFavorites(): { favs: string[]; ready: boolean;
  isFav(id: string): boolean; toggleFav(id: string): void }
const FAVORITES_KEY = "rouvier.favs"
```

### Favoris (localStorage, site public)

- Clé : **`rouvier.favs`** — `string[]` d'ids véhicule, JSON.
- `useFavorites()` synchronise tous les composants (event custom
  `rouvier:favs-changed` + event `storage` inter-onglets). `ready === false`
  tant que l'hydratation n'a pas lu le storage (rendre l'état "vide" avant).
- Compteur header inclus. La vue favoris est **`/vehicules?favoris=1`**
  (la page liste doit lire `searchParams.favoris === "1"` pour pré-activer le
  toggle « Favoris »).

## components/header.tsx / footer.tsx

`Header()` et `Footer()` sans props, déjà montés dans `app/layout.tsx` — les
agents pages ne les remontent PAS. Tous deux retournent `null` quand
`pathname.startsWith("/admin")` : l'agent admin fournit son propre chrome dans
son layout. Le header contient : logo, nav (Accueil masqué <700px, compteur
favoris), pill téléphone (icône seule <700px), bascule clair/sombre
(localStorage `rouvier.theme`, init avant paint dans layout.tsx). Le footer
contient le lien discret « Espace pro » → `/admin`.

## Contrat /api/photos/[filename] (à implémenter par l'agent admin)

- `GET /api/photos/<filename>` → sert `PHOTOS_DIR/<filename>` (import
  `PHOTOS_DIR` depuis `lib/db`).
- **Sanitiser** : rejeter tout filename contenant `/`, `\` ou `..` (404).
- `Content-Type` selon l'extension (jpg/jpeg, png, webp, avif, gif) ;
  `Cache-Control: public, max-age=31536000, immutable` (noms de fichiers
  uniques à l'upload, ex. `<vehicleId>-<random>.<ext>`).
- 404 si absent. CarPhoto encode le filename avec `encodeURIComponent`.
- Upload (admin) : écrire dans `PHOTOS_DIR`, ajouter le nom à
  `vehicle.photos[]` via `saveVehicle`. `deleteVehicle` ne supprime pas les
  fichiers (nettoyage optionnel côté admin).

## CSS — inventaire des classes portées (globals.css)

Tokens : `--bg --surface --text --muted --border --accent --on-accent --radius
--radius-sm --shadow --shadow-lift --display-tracking` sur `:root` (Épuré
clair) et `[data-theme="dark"]` (Épuré sombre). Fonts : `--font-display`
(Space Grotesk) / `--font-body` (Manrope) injectées par next/font sur `<html>`.

- Structure : `app container section section-head link-arrow`
- Header : `header header-inner logo logo-mark logo-sub nav nav-link
  nav-link.active nav-link.hide-mobile nav-fav-count header-phone theme-toggle*`
- Boutons : `btn btn-primary btn-ghost btn-block` (+ `:disabled` opacité 0.45)
- Hero : `hero hero-grid hero-eyebrow hero-lead hero-visual hero-tag`
- Recherche/formulaires : `search-card field field-label input select
  select-wrap` (chevron CSS), `textarea.input`
- Confiance : `trust-row trust-item trust-icon`
- Cartes : `car-grid car-card car-card-photo car-card-badges car-card-body
  car-card-title car-card-version car-card-specs spec-chip car-card-foot
  car-price car-price-monthly badge badge-accent fav-btn fav-btn.is-fav
  fav-btn-static`
- Photos : `car-photo*` (remplace les `<image-slot>` du proto ; ratio défaut
  3:2, hauteurs fixées par conteneur : carte 200px, hero 400px→320px <960,
  galerie 430px→300px <960, vignettes 110px)
- Liste : `page-head filters-bar price-filter filter-toggle filter-toggle.active
  results-count empty-state`
- Fiche : `back-link detail-layout gallery-main gallery-thumbs detail-side
  detail-card detail-title-row detail-version detail-badges detail-price-row
  detail-price detail-price-note spec-grid spec-cell spec-icon detail-section
  equip-grid equip-item contact-form contact-form-sub form-row form-success
  form-success-icon`
- Footer : `footer footer-grid footer-col footer-note footer-pro*`
- Animations : `fade-up fade-up-1 fade-up-2 fade-up-3` (prefers-reduced-motion)
- Breakpoints : 960px et 700px — comportements du README portés tels quels.

(* = ajout production, documenté dans le fichier.)

**Agent admin** : ajouter tes styles UNIQUEMENT à la fin de `globals.css`,
sous le marqueur `/* ===== ADMIN ===== */` déjà en place.

## Env vars

| Var | Défaut | Rôle |
|---|---|---|
| `DATA_DIR` | `<cwd>/data` | dossier db.json + photos/ |
| `ADMIN_PASSWORD` | aléatoire → `DATA_DIR/.admin-credentials` (0600) | mot de passe seedé au premier accès |
| `SESSION_SECRET` | secret seedé en db | clé HMAC des sessions |
