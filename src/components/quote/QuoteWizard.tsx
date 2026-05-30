"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useQuotePrefill } from "@/components/providers/QuotePrefillContext";
import {
  steps,
  initialAnswers,
  compute,
  fmt,
  recapData,
  projectMapValue,
  buildPrefillMessage,
  type QuoteAnswers,
  type QuoteStep,
} from "@/lib/quote-steps";

/**
 * 5-step estimator + result screen (README §9), ported from quote.js.
 * State + pricing live in @/lib/quote-steps; the "Recevoir mon devis détaillé"
 * button hands a prefill to the contact form via QuotePrefillContext.
 */
export function QuoteWizard() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<QuoteAnswers>(initialAnswers);
  const { requestPrefill } = useQuotePrefill();

  const isResult = current >= steps.length;
  const range = compute(answers);
  const liveVal = range ? `${fmt(range.low)} – ${fmt(range.high)} €` : "—";

  const step: QuoteStep | null = isResult ? null : steps[current];
  const fillPct = isResult ? "100%" : `${(current / steps.length) * 100 + 100 / steps.length}%`;
  const label = isResult ? "Votre estimation" : step!.label;
  const count = isResult ? "Terminé" : `Étape ${current + 1} / ${steps.length}`;

  const isSelected = (s: QuoteStep, key: string) =>
    s.kind === "multi" ? answers.features.includes(key) : (answers[s.id] as string | null) === key;

  const canNext = step
    ? step.kind === "multi"
      ? true
      : !!(answers[step.id] as string | null)
    : false;

  function select(s: QuoteStep, key: string) {
    setAnswers((prev) => {
      if (s.kind === "multi") {
        const features = prev.features.includes(key)
          ? prev.features.filter((k) => k !== key)
          : [...prev.features, key];
        return { ...prev, features };
      }
      // Single-choice steps; cast resolves the computed-key union with `features`.
      return { ...prev, [s.id]: key } as QuoteAnswers;
    });
  }

  function next() {
    if (!canNext) return;
    if (current < steps.length) setCurrent((c) => c + 1);
  }
  function back() {
    if (current > 0) setCurrent((c) => c - 1);
  }
  function reset() {
    setCurrent(0);
    setAnswers(initialAnswers);
  }
  function sendToContact() {
    const projectValue = projectMapValue(answers);
    requestPrefill({
      projectValue: projectValue ?? "",
      message: buildPrefillMessage(answers),
    });
  }

  return (
    <section id="estimation" className="wrap">
      <SectionHead
        eyebrow="Devis personnalisé"
        title={
          <>
            Estimez votre projet en <GradientText>1 minute</GradientText>
          </>
        }
        description="Pas sûr du forfait idéal ? Répondez à quelques questions et obtenez une fourchette de prix immédiate, sans inscription ni engagement."
      />

      <div className="quote-panel glass reveal">
        <div className="quote-progress">
          <div className="qp-head">
            <span className="qp-step-label">{label}</span>
            <span className="qp-count">{count}</span>
          </div>
          <div className="qp-bar">
            <div className="qp-fill" style={{ width: fillPct }} />
          </div>
        </div>

        <div className="quote-body">
          {isResult ? (
            <div className="quote-step active quote-result" key="result">
              <span className="eyebrow" style={{ margin: "0 auto 14px" }}>
                Estimation personnalisée
              </span>
              <div className="result-amount gradient-text">
                {range ? `${fmt(range.low)} – ${fmt(range.high)} €` : "—"}
              </div>
              <p className="result-note">
                Fourchette indicative basée sur vos réponses. Recevez un{" "}
                <b>devis précis, détaillé et gratuit sous 24h</b>, adapté à votre projet exact.
              </p>
              <div className="recap">
                {recapData(answers).map(([k, v]) => (
                  <div className="recap-row" key={k}>
                    <span className="rk">{k}</span>
                    <span className="rv">{v}</span>
                  </div>
                ))}
              </div>
              <div className="result-cta">
                <Button variant="primary" onClick={sendToContact}>
                  <Icon name="send" strokeWidth={2.2} />
                  Recevoir mon devis détaillé
                </Button>
                <Button variant="ghost" onClick={reset}>
                  Recommencer
                </Button>
              </div>
            </div>
          ) : (
            <div className="quote-step active" key={current}>
              <h3>{step!.q}</h3>
              <p className="q-help">{step!.help}</p>
              <div className={`opt-grid cols-${step!.cols}`}>
                {step!.options.map((o) => {
                  const active = isSelected(step!, o.k);
                  return (
                    <button
                      type="button"
                      className={active ? "opt sel" : "opt"}
                      data-k={o.k}
                      key={o.k}
                      onClick={() => select(step!, o.k)}
                    >
                      <span className="opt-ico">
                        <Icon name={o.i} />
                      </span>
                      <span className="opt-txt">
                        <b>{o.t}</b>
                        <span>{o.d}</span>
                      </span>
                      <span className="opt-check">
                        <Icon name="check" strokeWidth={3} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {!isResult && (
          <div className="quote-foot">
            <div className="quote-live">
              <span className="ql-label">Estimation indicative</span>
              <span className="ql-val gradient-text">{liveVal}</span>
            </div>
            <div className="btns">
              <Button
                variant="ghost"
                onClick={back}
                style={{ visibility: current === 0 ? "hidden" : "visible" }}
              >
                Précédent
              </Button>
              <Button variant="primary" onClick={next} disabled={!canNext}>
                {current === steps.length - 1 ? "Voir mon estimation" : "Suivant"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
