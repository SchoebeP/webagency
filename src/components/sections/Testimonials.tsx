import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="temoignages" className="wrap">
      <SectionHead
        center
        eyebrow="Témoignages"
        title={
          <>
            Ils m’ont fait <GradientText>confiance</GradientText>
          </>
        }
        description="Des entrepreneurs normands qui ont gagné en visibilité et en clients grâce à leur nouveau site."
      />
      <div className="grid grid-3">
        {testimonials.map((t, idx) => (
          <div className={"quote-card glass reveal d" + idx} key={t.n}>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon name="star" key={i} />
              ))}
            </div>
            <blockquote>« {t.q} »</blockquote>
            <div className="quote-author">
              <div className="av">{t.av}</div>
              <div>
                <b>{t.n}</b>
                <span>{t.r}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
