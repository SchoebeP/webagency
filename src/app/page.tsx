import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";

// PLACEHOLDER — replaced once the section components are built (Phase 2/3).
export default function Home() {
  return (
    <section id="hero" className="wrap" style={{ paddingTop: 190 }}>
      <SectionHead
        eyebrow="Foundation"
        title={
          <>
            Studio Albâtre <GradientText>en construction</GradientText>
          </>
        }
        description="Design system foundation in place. Sections are being assembled."
      />
    </section>
  );
}
