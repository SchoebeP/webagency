import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section id="processus" className="wrap">
      <SectionHead
        center
        eyebrow="Processus"
        title={
          <>
            Une méthode simple, du brief au <GradientText>suivi SEO</GradientText>
          </>
        }
        description="Un accompagnement transparent en 5 étapes, pour avancer sereinement et garder le contrôle à chaque moment."
      />
      <div className="process-track">
        {processSteps.map((p, idx) => (
          <div className={"step-card glass reveal d" + (idx % 4)} key={p.t}>
            <div className="step-num">{idx + 1}</div>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
