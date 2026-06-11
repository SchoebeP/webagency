"use client";

// Formulaire de connexion — POST /api/admin/login puis navigation complète
// vers /admin (le cookie de session est posé par la route).

import { useState, type FormEvent } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.assign("/admin");
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Connexion impossible. Réessayez.");
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.");
    }
    setPending(false);
  }

  return (
    <form className="admin-fields" onSubmit={onSubmit}>
      <label className="field">
        <span className="field-label">E-mail</span>
        <input
          className="input"
          type="email"
          required
          autoComplete="username"
          placeholder="vous@exemple.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="field">
        <span className="field-label">Mot de passe</span>
        <input
          className="input"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
