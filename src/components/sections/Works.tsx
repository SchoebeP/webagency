import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { works } from "@/lib/data";

export function Works() {
  return (
    <section id="realisations" className="wrap">
      <SectionHead
        eyebrow="Réalisations"
        title={
          <>
            Des projets pensés pour <GradientText>performer</GradientText>
          </>
        }
        description="Quelques exemples de sites conçus pour des activités locales, alliant design soigné et visibilité accrue."
      />
      <div className="grid grid-3">
        {works.map((w, idx) => (
          <div className={"work-card glass reveal d" + (idx % 3)} key={w.t}>
            <div className="work-preview" style={{ background: w.g }}>
              <span className="work-tag">{w.tag}</span>
              <div className="wp-mock"></div>
              <div className="wp-line" style={{ bottom: 38, left: 18, width: "45%" }}></div>
              <div className="wp-line" style={{ bottom: 24, left: 18, width: "60%", opacity: 0.6 }}></div>
            </div>
            <div className="work-body">
              <h3>{w.t}</h3>
              <p>{w.d}</p>
              <div className="work-metrics">
                <span>
                  <b>{w.m1}</b>
                  {w.l1}
                </span>
                <span>
                  <b>{w.m2}</b>
                  {w.l2}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
