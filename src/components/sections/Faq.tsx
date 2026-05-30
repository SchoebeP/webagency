"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Icon } from "@/components/ui/Icon";
import { faqs, type Faq as FaqType } from "@/lib/data";

type FaqItemProps = {
  f: FaqType;
  idx: number;
  open: boolean;
  onToggle: () => void;
};

function FaqItem({ f, idx, open, onToggle }: FaqItemProps) {
  const ansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ansRef.current) return;
    ansRef.current.style.maxHeight = open ? ansRef.current.scrollHeight + "px" : "";
  }, [open]);

  return (
    <div className={"faq-item glass reveal d" + (idx % 3) + (open ? " open" : "")}>
      <button className="faq-q" aria-expanded={open} onClick={onToggle}>
        {f.q}
        <span className="chev">
          <Icon name="chev" />
        </span>
      </button>
      <div className="faq-a" ref={ansRef}>
        <p>{f.a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="wrap">
      <SectionHead
        eyebrow="FAQ"
        title={
          <>
            Vos questions, mes <GradientText>réponses</GradientText>
          </>
        }
      />
      <div className="faq-list">
        {faqs.map((f, idx) => (
          <FaqItem
            key={f.q}
            f={f}
            idx={idx}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}
