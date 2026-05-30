import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { pricing } from "@/lib/data";

export function Pricing() {
  return (
    <section id="tarifs" className="wrap">
      <SectionHead
        center
        eyebrow="Tarifs"
        title={
          <>
            Des forfaits clairs, sans <GradientText>surprise</GradientText>
          </>
        }
        description="Des prix transparents « à partir de », adaptés à vos objectifs. Chaque projet fait l'objet d'un devis personnalisé et gratuit."
      />
      <div className="grid grid-3">
        {pricing.map((p, idx) => (
          <div
            className={"price-card glass reveal d" + idx + (p.featured ? " featured" : "")}
            key={p.name}
          >
            <div className="price-name">{p.name}</div>
            <p className="price-desc">{p.desc}</p>
            <div className="price-from">à partir de</div>
            <div className="price-amount">
              <span className="val">{p.price}</span>
              <span className="cur">€</span>
            </div>
            <div className="price-foot">{p.foot}</div>
            <ul className="price-features">
              {p.feats.map((f) => (
                <li key={f}>
                  <Icon name="check" strokeWidth={2.6} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button href="#contact" variant={p.featured ? "primary" : "ghost"}>
              Choisir {p.name}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
