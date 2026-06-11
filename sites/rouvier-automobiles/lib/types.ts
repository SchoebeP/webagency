// Types partagés — Rouvier Automobiles
// Champs véhicule portés du prototype (cars-data.js) + sold/photos pour le back-office.

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  km: number;
  /** Prix TTC en euros. */
  price: number;
  /** Mensualité indicative en euros ("dès X €/mois"). */
  monthly: number;
  fuel: string;
  gearbox: string;
  power: string;
  doors: number;
  color: string;
  badges: string[];
  /** Affiché dans « La sélection du moment » sur la page d'accueil. */
  featured: boolean;
  description: string;
  equipment: string[];
  /** Véhicule vendu (géré depuis /admin). */
  sold: boolean;
  /** Noms de fichiers uploadés (servis via /api/photos/[filename]). Peut être vide. */
  photos: string[];
}

export type RequestStatus = "new" | "handled";

export interface TestDriveRequest {
  id: string;
  vehicleId: string;
  /** Ex. "Renault Clio V — 1.0 TCe 90 ch Intens" (libellé figé au moment de la demande). */
  vehicleLabel: string;
  name: string;
  phone: string;
  /** Créneau souhaité : Indifférent / Semaine matin / Semaine après-midi / Samedi. */
  slot: string;
  message: string;
  /** ISO 8601. */
  createdAt: string;
  status: RequestStatus;
}

export interface AdminAccount {
  email: string;
  passwordHash: string;
  salt: string;
}
