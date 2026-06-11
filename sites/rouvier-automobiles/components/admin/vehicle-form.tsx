"use client";

// Formulaire véhicule — utilisé par /admin/vehicules/nouveau (création, POST)
// et /admin/vehicules/[id] (édition, PUT). Gère aussi les photos (4 max) :
// upload multipart vers /api/admin/photos, suppression incluse.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Vehicle } from "@/lib/types";

// Liste des badges du README (§ Components / Badge).
const BADGE_OPTIONS = [
  "Garantie 12 mois",
  "Contrôle technique OK",
  "Révision faite",
  "Première main",
  "Faible kilométrage",
  "Électrique",
];

const FUEL_OPTIONS = ["Essence", "Diesel", "Hybride", "Hybride rechargeable", "Électrique", "GPL"];
const GEARBOX_OPTIONS = ["Manuelle", "Automatique"];

const MAX_PHOTOS = 4;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 Mo
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface FormState {
  brand: string;
  model: string;
  version: string;
  year: string;
  km: string;
  price: string;
  monthly: string;
  fuel: string;
  gearbox: string;
  power: string;
  doors: string;
  color: string;
  badges: string[];
  featured: boolean;
  sold: boolean;
  description: string;
  equipmentText: string;
  photos: string[];
}

function initState(vehicle?: Vehicle): FormState {
  if (vehicle) {
    return {
      brand: vehicle.brand,
      model: vehicle.model,
      version: vehicle.version,
      year: String(vehicle.year),
      km: String(vehicle.km),
      price: String(vehicle.price),
      monthly: String(vehicle.monthly),
      fuel: vehicle.fuel,
      gearbox: vehicle.gearbox,
      power: vehicle.power,
      doors: String(vehicle.doors),
      color: vehicle.color,
      badges: [...vehicle.badges],
      featured: vehicle.featured,
      sold: vehicle.sold,
      description: vehicle.description,
      equipmentText: vehicle.equipment.join("\n"),
      photos: [...vehicle.photos],
    };
  }
  return {
    brand: "",
    model: "",
    version: "",
    year: "",
    km: "",
    price: "",
    monthly: "",
    fuel: "Essence",
    gearbox: "Manuelle",
    power: "",
    doors: "5",
    color: "",
    badges: [],
    featured: false,
    sold: false,
    description: "",
    equipmentText: "",
    photos: [],
  };
}

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => initState(vehicle));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // Photos présentes à l'ouverture : leur fichier n'est supprimé qu'à
  // l'enregistrement (côté serveur), pour ne jamais casser une fiche publiée.
  const initialPhotos = useRef<string[]>(vehicle ? [...vehicle.photos] : []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleBadge = (badge: string) =>
    set(
      "badges",
      form.badges.includes(badge)
        ? form.badges.filter((b) => b !== badge)
        : [...form.badges, badge]
    );

  async function uploadPhoto(file: File) {
    if (!PHOTO_TYPES.includes(file.type)) {
      setPhotoError("Format non pris en charge — JPEG, PNG ou WebP uniquement.");
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError("Photo trop lourde — 5 Mo maximum.");
      return;
    }
    setPhotoError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (vehicle) fd.append("vehicleId", vehicle.id);
      const res = await fetch("/api/admin/photos", { method: "POST", body: fd });
      const data = (await res.json().catch(() => null)) as
        | { filename?: string; error?: string }
        | null;
      if (!res.ok || !data?.filename) {
        setPhotoError(data?.error ?? "Envoi impossible. Réessayez.");
      } else {
        const filename = data.filename;
        setForm((f) =>
          f.photos.length >= MAX_PHOTOS ? f : { ...f, photos: [...f.photos, filename] }
        );
      }
    } catch {
      setPhotoError("Envoi impossible. Vérifiez votre connexion.");
    }
    setUploading(false);
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void uploadPhoto(file);
  }

  async function removePhoto(filename: string) {
    set("photos", form.photos.filter((f) => f !== filename));
    // Fichier uploadé pendant cette session (pas encore référencé par un
    // véhicule enregistré) : on le supprime immédiatement du disque.
    if (!initialPhotos.current.includes(filename)) {
      try {
        await fetch("/api/admin/photos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename }),
        });
      } catch {
        // fichier orphelin : sans gravité
      }
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const year = Number(form.year);
    const km = Number(form.km);
    const price = Number(form.price);
    const monthly = Number(form.monthly);
    const doors = Number(form.doors);
    if ([year, km, price, monthly, doors].some((n) => !Number.isFinite(n))) {
      setError("Veuillez vérifier les champs numériques.");
      return;
    }
    setSaving(true);
    setError(null);
    const payload = {
      brand: form.brand.trim(),
      model: form.model.trim(),
      version: form.version.trim(),
      year,
      km,
      price,
      monthly,
      fuel: form.fuel,
      gearbox: form.gearbox,
      power: form.power.trim(),
      doors,
      color: form.color.trim(),
      badges: form.badges,
      featured: form.featured,
      sold: form.sold,
      description: form.description.trim(),
      equipment: form.equipmentText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      photos: form.photos,
    };
    try {
      const res = await fetch(
        vehicle ? `/api/admin/vehicles/${encodeURIComponent(vehicle.id)}` : "/api/admin/vehicles",
        {
          method: vehicle ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Enregistrement impossible. Réessayez.");
        setSaving(false);
        return;
      }
      router.push("/admin/vehicules");
      router.refresh();
    } catch {
      setError("Enregistrement impossible. Vérifiez votre connexion.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <section className="admin-card">
        <h2>Informations</h2>
        <div className="admin-form-grid">
          <label className="field">
            <span className="field-label">Marque</span>
            <input className="input" required placeholder="Renault" value={form.brand} onChange={(e) => set("brand", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Modèle</span>
            <input className="input" required placeholder="Clio V" value={form.model} onChange={(e) => set("model", e.target.value)} />
          </label>
          <label className="field span-2">
            <span className="field-label">Version</span>
            <input className="input" required placeholder="1.0 TCe 90 ch Intens" value={form.version} onChange={(e) => set("version", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Année</span>
            <input className="input" type="number" required min={1900} max={2100} value={form.year} onChange={(e) => set("year", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Kilométrage (km)</span>
            <input className="input" type="number" required min={0} value={form.km} onChange={(e) => set("km", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Prix (€ TTC)</span>
            <input className="input" type="number" required min={1} value={form.price} onChange={(e) => set("price", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Mensualité indicative (€/mois)</span>
            <input className="input" type="number" required min={0} value={form.monthly} onChange={(e) => set("monthly", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Énergie</span>
            <span className="select-wrap">
              <select className="select" value={form.fuel} onChange={(e) => set("fuel", e.target.value)}>
                {FUEL_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </span>
          </label>
          <label className="field">
            <span className="field-label">Boîte</span>
            <span className="select-wrap">
              <select className="select" value={form.gearbox} onChange={(e) => set("gearbox", e.target.value)}>
                {GEARBOX_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </span>
          </label>
          <label className="field">
            <span className="field-label">Puissance</span>
            <input className="input" required placeholder="90 ch" value={form.power} onChange={(e) => set("power", e.target.value)} />
          </label>
          <label className="field">
            <span className="field-label">Portes</span>
            <input className="input" type="number" required min={2} max={7} value={form.doors} onChange={(e) => set("doors", e.target.value)} />
          </label>
          <label className="field span-2">
            <span className="field-label">Couleur</span>
            <input className="input" required placeholder="Gris Titanium" value={form.color} onChange={(e) => set("color", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="admin-card">
        <h2>Badges & mise en avant</h2>
        <div className="admin-checks">
          {BADGE_OPTIONS.map((badge) => (
            <label key={badge} className="admin-check">
              <input type="checkbox" checked={form.badges.includes(badge)} onChange={() => toggleBadge(badge)} />
              {badge}
            </label>
          ))}
        </div>
        <div className="admin-checks">
          <label className="admin-check">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
            Mettre en avant sur l&apos;accueil (« La sélection du moment »)
          </label>
          <label className="admin-check">
            <input type="checkbox" checked={form.sold} onChange={(e) => set("sold", e.target.checked)} />
            Véhicule vendu
          </label>
        </div>
      </section>

      <section className="admin-card">
        <h2>Description & équipements</h2>
        <div className="admin-form-grid">
          <label className="field span-2">
            <span className="field-label">Description</span>
            <textarea className="input" rows={4} placeholder="Historique, état, points forts…" value={form.description} onChange={(e) => set("description", e.target.value)} />
          </label>
          <label className="field span-2">
            <span className="field-label">Équipements (un par ligne)</span>
            <textarea
              className="input"
              rows={6}
              placeholder={"Caméra de recul\nRégulateur de vitesse\nClimatisation automatique"}
              value={form.equipmentText}
              onChange={(e) => set("equipmentText", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="admin-card">
        <h2>
          Photos <span className="admin-card-hint">({form.photos.length}/{MAX_PHOTOS})</span>
        </h2>
        <div className="photo-manager">
          {form.photos.map((filename) => (
            <div key={filename} className="photo-slot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/photos/${encodeURIComponent(filename)}`} alt="Photo du véhicule" />
              <button
                type="button"
                className="photo-del"
                aria-label="Supprimer la photo"
                title="Supprimer la photo"
                onClick={() => void removePhoto(filename)}
              >
                ×
              </button>
            </div>
          ))}
          {form.photos.length < MAX_PHOTOS ? (
            <button
              type="button"
              className="photo-slot photo-add"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Envoi…" : "+ Ajouter une photo"}
              <small>JPEG, PNG ou WebP — 5 Mo max</small>
            </button>
          ) : null}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        {photoError ? (
          <p className="form-error" role="alert">
            {photoError}
          </p>
        ) : null}
        <p className="admin-hint">La première photo sert de visuel principal (carte et galerie).</p>
      </section>

      <div className="admin-form-foot">
        <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
          {saving
            ? "Enregistrement…"
            : vehicle
              ? "Enregistrer les modifications"
              : "Ajouter le véhicule"}
        </button>
        <Link href="/admin/vehicules" className="btn btn-ghost">
          Annuler
        </Link>
        {error ? (
          <span className="form-error" role="alert">
            {error}
          </span>
        ) : null}
      </div>
    </form>
  );
}
