/* global React */
const { useState: useStateG, useRef: useRefG, useEffect: useEffectG } = React;

/* ----------------------------------------------------------------
   AVANT / APRÈS — slider à poignée
----------------------------------------------------------------- */
/* Photos libres de droits (Pexels — usage commercial, sans attribution).
   Visuels de démonstration ; Hervé peut déposer ses vraies photos avant/après par-dessus. */
const pxG = (id, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const PROJECTS = [
  { id: "ba-haie", t: "Taille d'une haie de thuyas", c: "Pont-Audemer",
    bSrc: pxG(17506144), aSrc: pxG(36713682),
    beforeP: "AVANT — haie envahissante non taillée", afterP: "APRÈS — haie nette et carrée" },
  { id: "ba-jardin", t: "Remise en état d'un jardin", c: "Le Perrey",
    bSrc: pxG(17332275), aSrc: pxG(31960327),
    beforeP: "AVANT — terrain en friche", afterP: "APRÈS — pelouse tondue et bordures nettes" },
  { id: "ba-elagage", t: "Élagage de grands arbres", c: "Cormeilles",
    bSrc: pxG(28157845), aSrc: pxG(19975452),
    beforeP: "AVANT — arbres denses et dangereux", afterP: "APRÈS — houppier allégé et sécurisé" },
  { id: "ba-terrasse", t: "Dalle & abords de terrasse", c: "Bourg-Achard",
    bSrc: pxG(36866669), aSrc: pxG(37042905),
    beforeP: "AVANT — sol irrégulier", afterP: "APRÈS — dalle propre et plane" },
];

function BeforeAfter({ p }) {
  const [pos, setPos] = useStateG(50);
  const ref = useRefG(null);
  const dragging = useRefG(false);

  const move = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let x = ((clientX - r.left) / r.width) * 100;
    x = Math.max(2, Math.min(98, x));
    setPos(x);
  };
  useEffectG(() => {
    const up = () => { dragging.current = false; };
    const mm = (e) => { if (dragging.current) move(e.clientX); };
    const tm = (e) => { if (dragging.current) move(e.touches[0].clientX); };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchend", up);
    window.addEventListener("touchmove", tm, { passive: true });
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchmove", tm);
    };
  }, []);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") setPos((v) => Math.max(2, v - 4));
    if (e.key === "ArrowRight") setPos((v) => Math.min(98, v + 4));
  };

  return (
    <article className="ba card reveal">
      <div
        className="ba__frame"
        ref={ref}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
      >
        {/* APRÈS (fond) */}
        <div className="ba__layer ba__after">
          <image-slot id={p.id + "-after"} shape="rect" src={p.aSrc} placeholder={p.afterP}></image-slot>
          <span className="ba__tag ba__tag--after">Après</span>
        </div>
        {/* AVANT (recadré par clip-path, image pleine taille) */}
        <div className="ba__layer ba__before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <image-slot id={p.id + "-before"} shape="rect" src={p.bSrc} placeholder={p.beforeP}></image-slot>
          <span className="ba__tag ba__tag--before">Avant</span>
        </div>
        {/* poignée */}
        <div
          className="ba__handle"
          style={{ left: pos + "%" }}
          role="slider"
          aria-label={"Comparer avant / après — " + p.t}
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKey}
        >
          <span className="ba__handle-line"></span>
          <span className="ba__handle-grip">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7 4 12l5 5M15 7l5 5-5 5"/></svg>
          </span>
        </div>
      </div>
      <div className="ba__caption">
        <h3 className="ba__title">{p.t}</h3>
        <span className="muted">{p.c}</span>
      </div>
    </article>
  );
}

function Realisations({ onQuote }) {
  return (
    <section className="section section--sand" id="realisations">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Réalisations</span>
          <h2 className="h-section">Avant / après : la différence se voit</h2>
          <p className="lead">Glissez la poignée pour comparer l'état initial et le résultat. Quelques chantiers récents dans le Pays de Risle.</p>
        </div>
        <div className="ba-grid">
          {PROJECTS.map((p) => <BeforeAfter key={p.id} p={p} />)}
        </div>
        <div className="services-cta reveal">
          <p>Envie du même résultat chez vous ?</p>
          <button className="btn" onClick={onQuote}>Demander un devis gratuit</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Realisations, BeforeAfter });
