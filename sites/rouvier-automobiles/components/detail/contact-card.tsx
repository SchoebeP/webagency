"use client";

// Carte « Essayer ce véhicule » — formulaire de demande d'essai (fiche).
// Port du proto detail-page.jsx : Nom + Téléphone (2 col), créneau, message,
// bouton désactivé tant que nom + téléphone vides ; succès inline après POST.
// Production : POST /api/test-drive + honeypot "website" + gestion d'erreurs.

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Vehicle } from "@/lib/types";
import { Icon } from "@/components/ui";

type Status = "idle" | "sending" | "sent";

const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: "1px",
  height: "1px",
  overflow: "hidden",
};

export function ContactCard({ vehicle }: { vehicle: Vehicle }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", slot: "", msg: "", website: "" });
  const canSend = form.name.trim() !== "" && form.phone.trim() !== "";
  const successRef = useRef<HTMLDivElement>(null);

  // A11y : après envoi, le formulaire (et son bouton focalisé) disparaît ;
  // on déplace le focus sur la confirmation pour les lecteurs d'écran.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSend || status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          name: form.name,
          phone: form.phone,
          slot: form.slot,
          message: form.msg,
          website: form.website,
        }),
      });
      if (!res.ok) {
        let message = "Une erreur est survenue. Merci de réessayer ou de nous appeler.";
        try {
          const data: unknown = await res.json();
          if (
            data !== null &&
            typeof data === "object" &&
            "error" in data &&
            typeof (data as { error: unknown }).error === "string"
          ) {
            message = (data as { error: string }).error;
          }
        } catch {
          // réponse non-JSON : on garde le message générique
        }
        setError(message);
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Impossible d'envoyer la demande. Vérifiez votre connexion et réessayez.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="detail-card">
        <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
          <div className="form-success-icon">
            <Icon name="check" size={24} />
          </div>
          <strong>Demande envoyée</strong>
          <span>
            Merci {form.name.trim().split(/\s+/)[0]} — nous vous rappelons sous 2 h ouvrées pour
            confirmer votre rendez-vous.
          </span>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setStatus("idle")}
            style={{ marginTop: "8px" }}
          >
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-card">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Essayer ce véhicule</h3>
        <p className="contact-form-sub">Réponse sous 2 h ouvrées — essai sans engagement.</p>
        <div className="form-row">
          <div className="field">
            <label className="field-label" htmlFor="ct-name">Nom</label>
            <input
              id="ct-name"
              className="input"
              type="text"
              placeholder="Votre nom"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="ct-phone">Téléphone</label>
            <input
              id="ct-phone"
              className="input"
              type="tel"
              placeholder="06 12 34 56 78"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="ct-slot">Créneau souhaité</label>
          <div className="select-wrap">
            <select
              id="ct-slot"
              className="select"
              value={form.slot}
              onChange={(e) => setForm({ ...form, slot: e.target.value })}
            >
              <option value="">Indifférent</option>
              <option>En semaine — matin</option>
              <option>En semaine — après-midi</option>
              <option>Samedi</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="ct-msg">Message (optionnel)</label>
          <textarea
            id="ct-msg"
            className="input"
            rows={3}
            placeholder={`Question sur la ${vehicle.brand} ${vehicle.model}…`}
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
          />
        </div>
        {/* Honeypot anti-spam : invisible, doit rester vide (les bots le remplissent). */}
        <div style={honeypotStyle} aria-hidden="true">
          <label htmlFor="ct-website">Site web (ne pas remplir)</label>
          <input
            id="ct-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!canSend || status === "sending"}
        >
          <Icon name="calendar" size={16} />
          {status === "sending" ? "Envoi en cours…" : "Demander un essai"}
        </button>
        <a href="tel:+33241568080" className="btn btn-ghost btn-block">
          <Icon name="phone" size={15} />
          02 41 56 80 80
        </a>
      </form>
    </div>
  );
}
