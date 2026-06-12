"use client";

// Actions d'une ligne du tableau véhicules : modifier, marquer vendu /
// remettre en vente (PATCH), supprimer avec confirmation (DELETE).

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { withBase } from "@/lib/base-path";

export function VehicleRowActions({
  id,
  sold,
  label,
}: {
  id: string;
  sold: boolean;
  label: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function toggleSold() {
    setPending(true);
    setError(false);
    try {
      const res = await fetch(withBase(`/api/admin/vehicles/${encodeURIComponent(id)}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sold: !sold }),
      });
      if (!res.ok) setError(true);
      else router.refresh();
    } catch {
      setError(true);
    }
    setPending(false);
  }

  async function remove() {
    if (!window.confirm(`Supprimer définitivement « ${label} » ?\nCette action est irréversible.`)) {
      return;
    }
    setPending(true);
    setError(false);
    try {
      const res = await fetch(withBase(`/api/admin/vehicles/${encodeURIComponent(id)}`), {
        method: "DELETE",
      });
      if (!res.ok) setError(true);
      else router.refresh();
    } catch {
      setError(true);
    }
    setPending(false);
  }

  return (
    <div className="admin-actions">
      {error ? <span className="form-error" role="alert">Échec, réessayez.</span> : null}
      <Link href={`/admin/vehicules/${encodeURIComponent(id)}`} className="btn btn-ghost btn-sm">
        Modifier
      </Link>
      <button type="button" className="btn btn-ghost btn-sm" onClick={toggleSold} disabled={pending}>
        {sold ? "Remettre en vente" : "Marquer vendu"}
      </button>
      <button type="button" className="btn btn-danger btn-sm" onClick={remove} disabled={pending}>
        Supprimer
      </button>
    </div>
  );
}
