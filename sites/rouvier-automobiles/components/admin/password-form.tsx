"use client";

// Changement du mot de passe admin — vérifie l'actuel côté serveur,
// exige 10 caractères minimum et une double saisie identique.

import { useState, type FormEvent } from "react";

const MIN_LENGTH = 10;

export function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(false);
    if (next.length < MIN_LENGTH) {
      setError(`Le nouveau mot de passe doit contenir au moins ${MIN_LENGTH} caractères.`);
      return;
    }
    if (next !== confirm) {
      setError("Les deux nouveaux mots de passe ne correspondent pas.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      if (res.ok) {
        setDone(true);
        setCurrent("");
        setNext("");
        setConfirm("");
      } else {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Mise à jour impossible. Réessayez.");
      }
    } catch {
      setError("Mise à jour impossible. Vérifiez votre connexion.");
    }
    setPending(false);
  }

  return (
    <form className="admin-fields" onSubmit={onSubmit}>
      <label className="field">
        <span className="field-label">Mot de passe actuel</span>
        <input
          className="input"
          type="password"
          required
          autoComplete="current-password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />
      </label>
      <label className="field">
        <span className="field-label">Nouveau mot de passe ({MIN_LENGTH} caractères min.)</span>
        <input
          className="input"
          type="password"
          required
          minLength={MIN_LENGTH}
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />
      </label>
      <label className="field">
        <span className="field-label">Confirmer le nouveau mot de passe</span>
        <input
          className="input"
          type="password"
          required
          minLength={MIN_LENGTH}
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p className="form-ok" role="status">
          Mot de passe mis à jour.
        </p>
      ) : null}
      <div>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Mise à jour…" : "Mettre à jour"}
        </button>
      </div>
    </form>
  );
}
