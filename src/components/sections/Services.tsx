import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="wrap">
      <SectionHead
        center
        eyebrow="Services"
        title={
          <>
            Tout ce qu'il faut pour réussir <GradientText>en ligne</GradientText>
          </>
        }
        description="De la conception au référencement, je vous accompagne à chaque étape avec des solutions modernes et sur-mesure."
      />
      <div className="grid grid-3">
        {services.map((s, idx) => (
          <div className={"card glass reveal d" + (idx % 3)} key={s.t}>
            <div className="svc-ico">
              <Icon name={s.i} />
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
