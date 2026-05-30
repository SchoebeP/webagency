"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

/** Payload the quote wizard hands to the contact form. */
export type QuotePrefill = {
  /** Value to select in the "Type de projet" <select> (matches an option). */
  projectValue: string;
  /** Pre-filled message body summarizing the estimate. */
  message: string;
  /** Bumped on every request so the form re-applies even with identical text. */
  nonce: number;
};

type QuotePrefillContextValue = {
  prefill: QuotePrefill | null;
  /** Called by the wizard; the contact form consumes it (fills, scrolls, focuses). */
  requestPrefill: (p: Omit<QuotePrefill, "nonce">) => void;
};

const QuotePrefillContext = createContext<QuotePrefillContextValue | null>(null);

export function QuotePrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);

  const requestPrefill = useCallback((p: Omit<QuotePrefill, "nonce">) => {
    setPrefill({ ...p, nonce: Date.now() });
  }, []);

  return (
    <QuotePrefillContext.Provider value={{ prefill, requestPrefill }}>
      {children}
    </QuotePrefillContext.Provider>
  );
}

export function useQuotePrefill(): QuotePrefillContextValue {
  const ctx = useContext(QuotePrefillContext);
  if (!ctx) throw new Error("useQuotePrefill must be used within QuotePrefillProvider");
  return ctx;
}
