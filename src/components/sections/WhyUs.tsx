import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { why } from "@/lib/data";

export function WhyUs() {
  return (
    <section id="apropos" className="wrap">
      <SectionHead
        center={false}
        revealMode="group"
        eyebrow="Pourquoi me choisir"
        title={
          <>
            Un partenaire local, des résultats <GradientText>mesurables</GradientText>
          </>
        }
        description="Indépendant basé en Normandie, je conjugue proximité humaine et exigence technique pour faire de votre site un véritable outil de croissance."
      />
      <div className="grid grid-3">
        {why.map((w, idx) => (
          <div className={"why-card glass reveal d" + (idx % 3)} key={w.t}>
            <div className="num">{String(idx + 1).padStart(2, "0")}</div>
            <div>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
