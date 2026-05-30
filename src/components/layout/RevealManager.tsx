"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal controller, ported from script.js. Observes every `.reveal`
 * element on the page and adds `.in` when it scrolls into view, with a
 * getBoundingClientRect fallback in case IntersectionObserver never fires.
 *
 * Mounted once in the layout so section markup can use `className="reveal d2"`
 * inline — exactly like the handoff HTML — without per-element wiring or extra
 * wrapper DOM that would break grid layouts. Renders nothing.
 */
export function RevealManager() {
  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const el of revealEls) {
        if (el.classList.contains("in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh - 40 && r.bottom > 0) el.classList.add("in");
      }
    };

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      revealEls.forEach((r) => io!.observe(r));
    }

    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView, { passive: true });
    revealInView();
    const raf = requestAnimationFrame(revealInView);
    const t = window.setTimeout(revealInView, 300);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", revealInView);
      window.removeEventListener("resize", revealInView);
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
