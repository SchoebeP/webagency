/* ============================================================
   Atelier Web Normandie — Parcours d'estimation (devis personnalisé)
   ============================================================ */
(function () {
  const qsvg = (d, w = 2.1) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const I = {
    vitrine: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M9 20v-6h6v6"/>',
    ecom: '<circle cx="9" cy="21" r="1.6"/><circle cx="18" cy="21" r="1.6"/><path d="M2 3h3l2.5 13h11l2-9H6"/>',
    landing: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 14h8M8 17h5"/>',
    refonte: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>',
    sur: '<path d="m8 18-6-6 6-6"/><path d="m16 6 6 6-6 6"/><path d="m13 4-2 16"/>',
    page1: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 7h4M10 11h4"/>',
    page2: '<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>',
    page3: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="8" height="6" rx="1.5"/><rect x="13" y="14" width="8" height="6" rx="1.5"/>',
    page4: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M15 9v12"/>',
    blog: '<path d="M4 4h11l5 5v11H4z"/><path d="M15 4v5h5"/><path d="M8 13h8M8 16h5"/>',
    booking: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><path d="m9 15 2 2 4-4"/>',
    pay: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
    members: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    lang: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.6"/><path d="m21 16-5-5L5 21"/>',
    news: '<path d="M3 8l9 6 9-6"/><rect x="3" y="5" width="18" height="14" rx="2"/>',
    none: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
    seoBase: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    seoLocal: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    seoAdv: '<path d="M3 17l5-5 4 4 8-8"/><path d="M16 8h5v5"/>',
    rocket: '<path d="M12 3c4 0 7 3 7 7 0 3-2 6-5 8l-2 2-2-2c-3-2-5-5-5-8 0-4 3-7 7-7z"/><circle cx="12" cy="10" r="2"/><path d="M8 16l-2 5 5-2"/>',
    cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
  };

  /* ---------- STEP DEFINITIONS ---------- */
  const steps = [
    {
      id: 'type', label: 'Type de projet', kind: 'single',
      q: 'Quel type de projet souhaitez-vous&nbsp;?',
      help: 'Le point de départ de votre estimation.',
      cols: 2,
      options: [
        { k: 'vitrine', i: 'vitrine', t: 'Site vitrine', d: 'Présenter votre activité et générer des contacts.', base: 890, map: 'Site vitrine' },
        { k: 'ecom', i: 'ecom', t: 'Site e-commerce', d: 'Vendre vos produits en ligne, 24h/24.', base: 2490, map: 'Site e-commerce' },
        { k: 'landing', i: 'landing', t: 'Landing page', d: 'Une page unique pour une campagne ciblée.', base: 590, map: 'Landing page' },
        { k: 'refonte', i: 'refonte', t: 'Refonte de site', d: 'Moderniser un site existant.', base: 990, map: 'Refonte de site' },
        { k: 'sur', i: 'sur', t: 'Projet sur-mesure', d: 'Application web ou besoin spécifique.', base: 3500, map: 'Autre' },
      ],
    },
    {
      id: 'size', label: 'Taille du site', kind: 'single',
      q: 'Quelle taille pour votre site&nbsp;?',
      help: 'Une estimation du nombre de pages suffit.',
      cols: 2,
      options: [
        { k: 's1', i: 'page1', t: '1 à 3 pages', d: 'Site simple et essentiel.', add: 0 },
        { k: 's2', i: 'page2', t: '4 à 7 pages', d: 'Site complet et structuré.', add: 400 },
        { k: 's3', i: 'page3', t: '8 à 15 pages', d: 'Site riche, plusieurs rubriques.', add: 900 },
        { k: 's4', i: 'page4', t: 'Plus de 15 pages', d: 'Grand site ou catalogue.', add: 1800 },
      ],
    },
    {
      id: 'features', label: 'Fonctionnalités', kind: 'multi',
      q: 'Quelles fonctionnalités vous intéressent&nbsp;?',
      help: 'Plusieurs choix possibles — ou aucun si vous préférez l\'essentiel.',
      cols: 2,
      options: [
        { k: 'blog', i: 'blog', t: 'Blog / actualités', d: 'Publier des articles régulièrement.', add: 350 },
        { k: 'booking', i: 'booking', t: 'Prise de rendez-vous', d: 'Réservation ou agenda en ligne.', add: 450 },
        { k: 'pay', i: 'pay', t: 'Paiement en ligne', d: 'Encaisser des paiements sécurisés.', add: 600 },
        { k: 'members', i: 'members', t: 'Espace membre', d: 'Connexion et espace privé client.', add: 700 },
        { k: 'lang', i: 'lang', t: 'Site multilingue', d: 'Plusieurs langues disponibles.', add: 500 },
        { k: 'gallery', i: 'gallery', t: 'Galerie / portfolio', d: 'Mettre en valeur vos visuels.', add: 250 },
        { k: 'news', i: 'news', t: 'Newsletter', d: 'Collecter des emails et fidéliser.', add: 200 },
      ],
    },
    {
      id: 'seo', label: 'Référencement', kind: 'single',
      q: 'Quel niveau de référencement&nbsp;?',
      help: 'Le SEO rend votre site visible sur Google.',
      cols: 2,
      options: [
        { k: 'base', i: 'seoBase', t: 'SEO de base', d: 'Bonnes pratiques techniques incluses.', add: 0 },
        { k: 'local', i: 'seoLocal', t: 'SEO local Normandie', d: 'Visible auprès de vos clients de proximité.', add: 600 },
        { k: 'adv', i: 'seoAdv', t: 'SEO avancé + contenu', d: 'Stratégie complète et rédaction optimisée.', add: 1200 },
        { k: 'none', i: 'none', t: 'Pas pour le moment', d: 'À envisager plus tard.', add: 0 },
      ],
    },
    {
      id: 'timing', label: 'Délai souhaité', kind: 'single',
      q: 'Dans quel délai&nbsp;?',
      help: 'Un projet express mobilise davantage de ressources.',
      cols: 3,
      options: [
        { k: 'planned', i: 'cal', t: 'Pas pressé', d: 'Planifié dans les prochains mois.', mult: 1 },
        { k: 'standard', i: 'clock', t: 'Standard', d: 'Sous 4 à 6 semaines.', mult: 1 },
        { k: 'express', i: 'rocket', t: 'Express', d: 'Le plus vite possible (+20%).', mult: 1.2 },
      ],
    },
  ];

  const state = { current: 0, answers: {} };
  steps.forEach(s => { state.answers[s.id] = s.kind === 'multi' ? [] : null; });

  const body = document.getElementById('quoteBody');
  const fill = document.getElementById('qpFill');
  const label = document.getElementById('qpLabel');
  const count = document.getElementById('qpCount');
  const qlVal = document.getElementById('qlVal');
  const foot = document.getElementById('quoteFoot');
  const backBtn = document.getElementById('qBack');
  const nextBtn = document.getElementById('qNext');

  /* ---------- PRICING ---------- */
  function findOpt(stepId, key) { return steps.find(s => s.id === stepId).options.find(o => o.k === key); }
  function compute() {
    const a = state.answers;
    const type = a.type ? findOpt('type', a.type) : null;
    if (!type) return null;
    let total = type.base;
    if (a.size) total += findOpt('size', a.size).add;
    a.features.forEach(k => { total += findOpt('features', k).add; });
    if (a.seo) total += findOpt('seo', a.seo).add;
    const mult = a.timing ? findOpt('timing', a.timing).mult : 1;
    total = total * mult;
    const low = Math.round(total / 10) * 10;
    const high = Math.round((total * 1.18) / 10) * 10;
    return { low, high };
  }
  const fmt = n => n.toLocaleString('fr-FR');
  function updateLive() {
    const r = compute();
    qlVal.textContent = r ? `${fmt(r.low)} – ${fmt(r.high)} €` : '—';
  }

  /* ---------- RENDER A STEP ---------- */
  function renderStep() {
    const isResult = state.current >= steps.length;
    foot.style.display = isResult ? 'none' : 'flex';
    if (isResult) { renderResult(); return; }

    const step = steps[state.current];
    label.innerHTML = step.label;
    count.textContent = `Étape ${state.current + 1} / ${steps.length}`;
    fill.style.width = `${((state.current) / steps.length) * 100 + (100 / steps.length)}%`;

    const sel = state.answers[step.id];
    const opts = step.options.map(o => {
      const active = step.kind === 'multi' ? sel.includes(o.k) : sel === o.k;
      return `<button type="button" class="opt${active ? ' sel' : ''}" data-k="${o.k}">
        <span class="opt-ico">${qsvg(I[o.i])}</span>
        <span class="opt-txt"><b>${o.t}</b><span>${o.d}</span></span>
        <span class="opt-check">${qsvg(I.check, 3)}</span>
      </button>`;
    }).join('');

    body.innerHTML = `<div class="quote-step active">
      <h3>${step.q}</h3>
      <p class="q-help">${step.help}</p>
      <div class="opt-grid cols-${step.cols || 2}">${opts}</div>
    </div>`;

    body.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.k;
        if (step.kind === 'multi') {
          const arr = state.answers[step.id];
          const idx = arr.indexOf(k);
          if (idx >= 0) arr.splice(idx, 1); else arr.push(k);
          btn.classList.toggle('sel');
        } else {
          state.answers[step.id] = k;
          body.querySelectorAll('.opt').forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
        }
        updateLive();
        syncNav();
      });
    });

    backBtn.style.visibility = state.current === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = state.current === steps.length - 1 ? 'Voir mon estimation' : 'Suivant';
    syncNav();
    updateLive();
  }

  function syncNav() {
    const step = steps[state.current];
    if (!step) return;
    const sel = state.answers[step.id];
    const ok = step.kind === 'multi' ? true : !!sel; // multi can be empty
    nextBtn.disabled = !ok;
  }

  /* ---------- RESULT ---------- */
  function recapData() {
    const a = state.answers;
    const rows = [];
    rows.push(['Type de projet', findOpt('type', a.type).t]);
    if (a.size) rows.push(['Taille', findOpt('size', a.size).t]);
    const feats = a.features.map(k => findOpt('features', k).t);
    rows.push(['Fonctionnalités', feats.length ? feats.join(', ') : 'Essentiel uniquement']);
    if (a.seo) rows.push(['Référencement', findOpt('seo', a.seo).t]);
    if (a.timing) rows.push(['Délai', findOpt('timing', a.timing).t]);
    return rows;
  }

  function renderResult() {
    label.innerHTML = 'Votre estimation';
    count.textContent = 'Terminé';
    fill.style.width = '100%';
    const r = compute();
    const rows = recapData().map(([k, v]) => `<div class="recap-row"><span class="rk">${k}</span><span class="rv">${v}</span></div>`).join('');
    body.innerHTML = `<div class="quote-step active quote-result">
      <span class="eyebrow" style="margin:0 auto 14px">Estimation personnalisée</span>
      <div class="result-amount gradient-text">${fmt(r.low)} – ${fmt(r.high)} €</div>
      <p class="result-note">Fourchette indicative basée sur vos réponses. Recevez un <b>devis précis, détaillé et gratuit sous 24h</b>, adapté à votre projet exact.</p>
      <div class="recap">${rows}</div>
      <div class="result-cta">
        <button type="button" class="btn btn-primary" id="qSend">
          ${qsvg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>', 2.2)}
          Recevoir mon devis détaillé
        </button>
        <button type="button" class="btn btn-ghost" id="qRestart">Recommencer</button>
      </div>
    </div>`;
    document.getElementById('qRestart').addEventListener('click', reset);
    document.getElementById('qSend').addEventListener('click', sendToContact);
  }

  function sendToContact() {
    const a = state.answers;
    const type = findOpt('type', a.type);
    const r = compute();
    // prefill the contact form
    const projectSel = document.getElementById('project');
    if (projectSel) {
      const want = type.map;
      Array.from(projectSel.options).forEach(o => { if (o.value === want || o.text === want) projectSel.value = o.value; });
    }
    const msg = document.getElementById('message');
    if (msg) {
      const feats = a.features.map(k => findOpt('features', k).t);
      msg.value =
        `Bonjour, voici mon estimation réalisée en ligne :\n` +
        `• Type de projet : ${type.t}\n` +
        (a.size ? `• Taille : ${findOpt('size', a.size).t}\n` : '') +
        `• Fonctionnalités : ${feats.length ? feats.join(', ') : 'essentiel uniquement'}\n` +
        (a.seo ? `• Référencement : ${findOpt('seo', a.seo).t}\n` : '') +
        (a.timing ? `• Délai : ${findOpt('timing', a.timing).t}\n` : '') +
        `• Estimation indicative : ${fmt(r.low)} – ${fmt(r.high)} €\n\n` +
        `Merci de me recontacter pour un devis détaillé.`;
    }
    const contact = document.getElementById('contact');
    if (contact) window.scrollTo({ top: contact.offsetTop - 70, behavior: 'smooth' });
    setTimeout(() => { const n = document.getElementById('name'); if (n) n.focus({ preventScroll: true }); }, 600);
  }

  function reset() {
    state.current = 0;
    steps.forEach(s => { state.answers[s.id] = s.kind === 'multi' ? [] : null; });
    renderStep();
  }

  /* ---------- NAV ---------- */
  nextBtn.addEventListener('click', () => {
    if (nextBtn.disabled) return;
    if (state.current < steps.length) { state.current++; renderStep(); }
  });
  backBtn.addEventListener('click', () => {
    if (state.current > 0) { state.current--; renderStep(); }
  });

  renderStep();
})();
