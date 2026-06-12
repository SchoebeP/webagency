"use client";

// Badge de statut Nouvelle / Traitée + bouton de bascule (PATCH).

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RequestStatus } from "@/lib/types";
import { withBase } from "@/lib/base-path";

export function RequestStatusToggle({ id, status }: { id: string; status: RequestStatus }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function toggle() {
    setPending(true);
    setError(false);
    try {
      const res = await fetch(withBase(`/api/admin/requests/${encodeURIComponent(id)}`), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "new" ? "handled" : "new" }),
      });
      if (!res.ok) setError(true);
      else router.refresh();
    } catch {
      setError(true);
    }
    setPending(false);
  }

  return (
    <span className="admin-status-wrap">
      {error ? <span className="form-error">Échec, réessayez.</span> : null}
      <span className={"admin-status" + (status === "new" ? " is-new" : "")}>
        {status === "new" ? "Nouvelle" : "Traitée"}
      </span>
      <button type="button" className="btn btn-ghost btn-sm" onClick={toggle} disabled={pending}>
        {status === "new" ? "Marquer traitée" : "Rouvrir"}
      </button>
    </span>
  );
}
