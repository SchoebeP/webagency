// Persistance JSON sur fichier — Rouvier Automobiles.
// Zéro dépendance : node:fs synchrone + écriture atomique (tmp + rename).
// Le fichier vit dans DATA_DIR (défaut : <site>/data), jamais commité.
// NB : à n'importer que depuis du code serveur (server components, routes, actions).
//
// ⚠️ Contrainte forte : UN SEUL processus Node par DATA_DIR. Pas de cluster,
// pas de réplicas ni de PM2 multi-instances pointant sur le même fichier :
// chaque écriture relit puis réécrit db.json en entier (last-write-wins),
// deux processus concurrents se perdraient silencieusement des données.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { AdminAccount, RequestStatus, TestDriveRequest, Vehicle } from "./types";

export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export const PHOTOS_DIR = path.join(DATA_DIR, "photos");
const DB_FILE = path.join(DATA_DIR, "db.json");

interface DbData {
  admin: AdminAccount;
  /** Secret HMAC des sessions, généré au seed (surchargé par env SESSION_SECRET). */
  sessionSecret: string;
  vehicles: Vehicle[];
  requests: TestDriveRequest[];
}

// ===== Hash de mot de passe (scrypt) =====

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

// ===== Seed : les 9 véhicules du prototype (cars-data.js) =====

function seedVehicles(): Vehicle[] {
  const cars: Omit<Vehicle, "sold" | "photos">[] = [
    {
      id: "clio-v",
      brand: "Renault", model: "Clio V", version: "1.0 TCe 90 ch Intens",
      year: 2021, km: 38500, price: 14990, monthly: 219,
      fuel: "Essence", gearbox: "Manuelle", power: "90 ch", doors: 5, color: "Gris Titanium",
      badges: ["Garantie 12 mois", "Contrôle technique OK"],
      featured: true,
      description: "Citadine polyvalente entretenue exclusivement en concession. Carnet d'entretien complet, distribution à jour. Idéale pour un usage urbain comme pour la route.",
      equipment: ["Carplay / Android Auto", "Régulateur de vitesse", "Capteurs de stationnement arrière", "Climatisation automatique", "Feux LED", "Écran tactile 7\""],
    },
    {
      id: "peugeot-3008",
      brand: "Peugeot", model: "3008", version: "1.5 BlueHDi 130 ch GT Line",
      year: 2019, km: 82300, price: 21490, monthly: 309,
      fuel: "Diesel", gearbox: "Automatique", power: "130 ch", doors: 5, color: "Blanc Nacré",
      badges: ["Garantie 12 mois", "Révision faite"],
      featured: true,
      description: "SUV familial en finition GT Line, très bien équipé. Quatre pneus neufs, freinage refait. Véhicule non fumeur, intérieur en parfait état.",
      equipment: ["i-Cockpit numérique", "Hayon électrique", "Caméra de recul", "Sièges chauffants", "Navigation 3D", "Jantes alliage 18\"", "Toit noir contrasté", "Aide au maintien de voie"],
    },
    {
      id: "golf-8",
      brand: "Volkswagen", model: "Golf 8", version: "2.0 TDI 150 ch Style DSG7",
      year: 2020, km: 64000, price: 23900, monthly: 339,
      fuel: "Diesel", gearbox: "Automatique", power: "150 ch", doors: 5, color: "Bleu Atlantique",
      badges: ["Garantie 12 mois", "Première main"],
      featured: false,
      description: "Compacte de référence en motorisation TDI 150 associée à la boîte DSG7. Première main, historique d'entretien intégral disponible.",
      equipment: ["Cockpit digital", "Phares LED Matrix", "Régulateur adaptatif ACC", "App-Connect sans fil", "Climatisation tri-zone", "Détecteur d'angle mort"],
    },
    {
      id: "yaris-hybride",
      brand: "Toyota", model: "Yaris", version: "Hybride 116h Design",
      year: 2022, km: 21700, price: 19490, monthly: 285,
      fuel: "Hybride", gearbox: "Automatique", power: "116 ch", doors: 5, color: "Rouge Intense",
      badges: ["Faible kilométrage", "Garantie 12 mois", "Première main"],
      featured: true,
      description: "Hybride récente et très sobre (3,8 L/100 en ville). Encore sous garantie constructeur. Parfaite pour les trajets quotidiens sans contrainte de recharge.",
      equipment: ["Caméra de recul", "Carplay / Android Auto", "Sécurité Toyota Safety Sense", "Feux automatiques", "Climatisation automatique"],
    },
    {
      id: "bmw-320d",
      brand: "BMW", model: "Série 3", version: "320d xDrive 190 ch Luxury",
      year: 2018, km: 98400, price: 24990, monthly: 355,
      fuel: "Diesel", gearbox: "Automatique", power: "190 ch", doors: 4, color: "Noir Saphir",
      badges: ["Contrôle technique OK", "Révision faite"],
      featured: false,
      description: "Berline routière en transmission intégrale xDrive, finition Luxury cuir. Suivi exclusif BMW, factures à l'appui. Excellent état général.",
      equipment: ["Intérieur cuir Dakota", "GPS Professional", "Sièges électriques à mémoire", "Toit ouvrant", "Harman Kardon", "Caméras 360°", "Accès confort"],
    },
    {
      id: "duster",
      brand: "Dacia", model: "Duster", version: "1.3 TCe 130 ch Prestige 4x2",
      year: 2021, km: 45200, price: 16990, monthly: 249,
      fuel: "Essence", gearbox: "Manuelle", power: "130 ch", doors: 5, color: "Orange Arizona",
      badges: ["Garantie 12 mois", "Contrôle technique OK"],
      featured: false,
      description: "SUV robuste et économique en finition haute Prestige. Attelage posé en concession. Un véhicule sain, prêt à partir.",
      equipment: ["Navigation", "Caméra multivues", "Carte mains libres", "Barres de toit", "Climatisation automatique", "Attelage amovible"],
    },
    {
      id: "model-3",
      brand: "Tesla", model: "Model 3", version: "Standard Plus RWD",
      year: 2021, km: 52000, price: 27900, monthly: 395,
      fuel: "Électrique", gearbox: "Automatique", power: "325 ch", doors: 4, color: "Blanc Nacré Multicouches",
      badges: ["Électrique", "Première main"],
      featured: true,
      description: "Berline 100 % électrique, autonomie réelle d'environ 380 km. Batterie contrôlée (santé 92 %). Superchargeurs et mises à jour à distance.",
      equipment: ["Autopilot", "Écran central 15\"", "Toit verre panoramique", "Pompe à chaleur", "Sièges chauffants AV/AR", "Conduite à une pédale"],
    },
    {
      id: "audi-a3",
      brand: "Audi", model: "A3 Sportback", version: "35 TFSI 150 ch S Line S tronic",
      year: 2020, km: 58900, price: 25490, monthly: 365,
      fuel: "Essence", gearbox: "Automatique", power: "150 ch", doors: 5, color: "Gris Daytona",
      badges: ["Garantie 12 mois", "Révision faite"],
      featured: false,
      description: "Compacte premium en finition S Line. Présentation intérieure et extérieure irréprochable, jantes sans frottement. Révision des 60 000 km effectuée.",
      equipment: ["Virtual Cockpit", "Sièges sport S Line", "Phares LED", "Hayon électrique", "Audi Smartphone Interface", "Jantes 18\" Audi Sport"],
    },
    {
      id: "citroen-c3",
      brand: "Citroën", model: "C3", version: "PureTech 83 ch Shine",
      year: 2022, km: 18300, price: 13990, monthly: 205,
      fuel: "Essence", gearbox: "Manuelle", power: "83 ch", doors: 5, color: "Bleu Elixir",
      badges: ["Faible kilométrage", "Première main", "Garantie 12 mois"],
      featured: false,
      description: "Petite citadine confortable au kilométrage très faible. Première main, achetée et entretenue chez nous. Une affaire sûre pour un premier véhicule.",
      equipment: ["Écran tactile 7\"", "Carplay / Android Auto", "Régulateur de vitesse", "Aide au freinage d'urgence", "Toit contrasté blanc"],
    },
  ];
  return cars.map((c) => ({ ...c, sold: false, photos: [] }));
}

function seedDb(): DbData {
  const salt = crypto.randomBytes(16).toString("hex");
  // Pas de mot de passe par défaut codé en dur : soit ADMIN_PASSWORD est
  // fourni via l'environnement, soit on en génère un aléatoire écrit dans
  // DATA_DIR/.admin-credentials (0600) pour l'opérateur. Modifiable ensuite
  // dans Admin → Paramètres.
  const credentialsFile = path.join(DATA_DIR, ".admin-credentials");
  let password = process.env.ADMIN_PASSWORD;
  if (password) {
    // Mot de passe imposé par l'env : aucun bootstrap en clair ne doit traîner.
    fs.rmSync(credentialsFile, { force: true });
  } else {
    password = crypto.randomBytes(9).toString("base64url");
    fs.mkdirSync(DATA_DIR, { recursive: true });
    // Supprimer d'abord : writeFileSync n'applique `mode` qu'à la CRÉATION du
    // fichier — un reliquat d'un seed précédent garderait ses permissions.
    fs.rmSync(credentialsFile, { force: true });
    fs.writeFileSync(
      credentialsFile,
      `email: admin@rouvier-automobiles.fr\npassword: ${password}\n`,
      { mode: 0o600 }
    );
  }
  return {
    admin: {
      email: "admin@rouvier-automobiles.fr",
      salt,
      passwordHash: hashPassword(password, salt),
    },
    sessionSecret: crypto.randomBytes(32).toString("hex"),
    vehicles: seedVehicles(),
    requests: [],
  };
}

// ===== Lecture / écriture atomique =====

function readDb(): DbData {
  if (!fs.existsSync(DB_FILE)) {
    const seeded = seedDb();
    writeDb(seeded);
    return seeded;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DbData;
}

function writeDb(data: DbData): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, DB_FILE);
}

// ===== Véhicules =====

export function getVehicles(): Vehicle[] {
  return readDb().vehicles;
}

export function getVehicle(id: string): Vehicle | undefined {
  return readDb().vehicles.find((v) => v.id === id);
}

/** Insère ou remplace (clé : vehicle.id). */
export function saveVehicle(vehicle: Vehicle): void {
  const db = readDb();
  const i = db.vehicles.findIndex((v) => v.id === vehicle.id);
  if (i === -1) db.vehicles.push(vehicle);
  else db.vehicles[i] = vehicle;
  writeDb(db);
}

export function deleteVehicle(id: string): void {
  const db = readDb();
  db.vehicles = db.vehicles.filter((v) => v.id !== id);
  writeDb(db);
}

// ===== Demandes d'essai =====

export function addRequest(
  input: Omit<TestDriveRequest, "id" | "createdAt" | "status">
): TestDriveRequest {
  const db = readDb();
  const request: TestDriveRequest = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  db.requests.push(request);
  writeDb(db);
  return request;
}

/** Triées de la plus récente à la plus ancienne. */
export function getRequests(): TestDriveRequest[] {
  return readDb().requests.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function setRequestStatus(id: string, status: RequestStatus): void {
  const db = readDb();
  const request = db.requests.find((r) => r.id === id);
  if (!request) return;
  request.status = status;
  writeDb(db);
}

// ===== Admin / auth =====

export function getAdmin(): AdminAccount {
  return readDb().admin;
}

/**
 * Change le mot de passe admin. Fait aussi tourner le secret de session
 * (tous les jetons en circulation deviennent invalides — l'appelant doit
 * reposer un cookie frais via setSessionCookie) et supprime l'éventuel
 * DATA_DIR/.admin-credentials, dont le mot de passe bootstrap en clair
 * est désormais obsolète.
 */
export function setAdminPassword(newPassword: string): void {
  const db = readDb();
  const salt = crypto.randomBytes(16).toString("hex");
  db.admin = { ...db.admin, salt, passwordHash: hashPassword(newPassword, salt) };
  db.sessionSecret = crypto.randomBytes(32).toString("hex");
  writeDb(db);
  fs.rmSync(path.join(DATA_DIR, ".admin-credentials"), { force: true });
}

export function verifyPassword(email: string, password: string): boolean {
  const admin = readDb().admin;
  const emailOk = email.trim().toLowerCase() === admin.email.toLowerCase();
  const expected = Buffer.from(admin.passwordHash, "hex");
  const actual = crypto.scryptSync(password, admin.salt, 64);
  const passwordOk =
    expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  return emailOk && passwordOk;
}

/** Secret HMAC des sessions (seedé en base, surchargé par env SESSION_SECRET dans lib/auth). */
export function getSessionSecret(): string {
  return readDb().sessionSecret;
}
