/* ============================================================
   Atelier Web Normandie — interactions & content
   ============================================================ */

/* ---------- ICONS (line set) ---------- */
const ICONS = {
  vitrine: '<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M9 20v-6h6v6"/>',
  ecom: '<circle cx="9" cy="21" r="1.6"/><circle cx="18" cy="21" r="1.6"/><path d="M2 3h3l2.5 13h11l2-9H6"/>',
  landing: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M8 14h8M8 17h5"/>',
  seo: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M9 11l1.5 1.5L14 9"/>',
  local: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  maint: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/>',
  speed: '<path d="M12 14a4 4 0 1 0-4-4"/><path d="M12 14 16 8"/><path d="M4 20a9 9 0 1 1 16 0"/>',
  responsive: '<rect x="2" y="4" width="14" height="11" rx="1.5"/><path d="M2 18h11"/><rect x="16" y="9" width="6" height="11" rx="1.5"/>',
  host: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  star: '<path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" fill="currentColor" stroke="none"/>',
  chev: '<path d="m6 9 6 6 6-6"/>'
};
const svg = (d, w = 2.1) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

/* ---------- SERVICES ---------- */
const services = [
  { i: 'vitrine', t: 'Sites vitrines', d: 'Un site élégant et professionnel qui présente votre activité et inspire confiance dès la première visite.' },
  { i: 'ecom', t: 'Sites e-commerce', d: 'Une boutique en ligne fluide et sécurisée pour vendre vos produits 24h/24, partout en France.' },
  { i: 'landing', t: 'Landing pages', d: 'Des pages d\'atterrissage conçues pour une campagne précise et un taux de conversion maximal.' },
  { i: 'seo', t: 'Référencement SEO', d: 'Audit complet et optimisation technique, contenu et popularité pour grimper dans les résultats Google.' },
  { i: 'local', t: 'SEO local Normandie', d: 'Soyez visible auprès de vos clients de proximité : fiche Google, mots-clés locaux, avis et géolocalisation.' },
  { i: 'maint', t: 'Maintenance & mises à jour', d: 'Sécurité, sauvegardes et mises à jour régulières pour un site toujours rapide et fiable.' },
  { i: 'speed', t: 'Vitesse & performance', d: 'Optimisation du temps de chargement et des Core Web Vitals pour une expérience irréprochable.' },
  { i: 'responsive', t: 'Design responsive', d: 'Un affichage parfait sur mobile, tablette et ordinateur, là où se trouvent vos clients.' },
  { i: 'host', t: 'Hébergement & nom de domaine', d: 'Je m\'occupe de l\'hébergement, du nom de domaine et des emails professionnels, sans souci pour vous.' },
];

/* ---------- WHY US ---------- */
const why = [
  { t: 'Proximité locale', d: 'Un interlocuteur unique en Normandie, disponible et à votre écoute pour des échanges simples et humains.' },
  { t: 'Accompagnement personnalisé', d: 'Chaque projet est unique : je vous conseille selon vos objectifs réels, sans jargon technique.' },
  { t: 'Résultats mesurables', d: 'Trafic, positions Google, contacts générés : des indicateurs clairs pour suivre votre retour sur investissement.' },
  { t: 'Technologies modernes', d: 'Des sites rapides, sécurisés et durables, construits avec les standards web les plus récents.' },
  { t: 'Tarifs transparents', d: 'Des devis détaillés et sans surprise. Vous savez exactement ce que vous payez et pourquoi.' },
  { t: 'SEO dès la conception', d: 'Le référencement n\'est pas une option : il est intégré dès la première ligne de code de votre site.' },
];

/* ---------- PORTFOLIO ---------- */
const works = [
  { tag: 'Site vitrine', t: 'Menuiserie Lecomte', d: 'Refonte complète pour un artisan menuisier de la région rouennaise.', g: 'linear-gradient(135deg,#6366f1,#22d3ee)', m1: '+180%', l1: 'Demandes de devis', m2: 'Top 3', l2: 'Sur "menuisier Rouen"' },
  { tag: 'E-commerce', t: 'Cidres du Bocage', d: 'Boutique en ligne pour un producteur de cidre normand artisanal.', g: 'linear-gradient(135deg,#0ea5e9,#2dd4bf)', m1: 'x3', l1: 'Ventes en ligne', m2: '1,2s', l2: 'Temps de chargement' },
  { tag: 'Landing page', t: 'Coach Bien-être Caen', d: 'Page de capture pour le lancement d\'un programme de coaching.', g: 'linear-gradient(135deg,#8b5cf6,#3b82f6)', m1: '24%', l1: 'Taux de conversion', m2: '+320', l2: 'Inscrits / mois' },
  { tag: 'SEO local', t: 'Garage Auto Le Havre', d: 'Stratégie de référencement local et optimisation de la fiche Google.', g: 'linear-gradient(135deg,#06b6d4,#6366f1)', m1: '1ʳᵉ', l1: 'Page Google locale', m2: '+90%', l2: 'Appels reçus' },
  { tag: 'Site vitrine', t: 'Cabinet d\'avocats Évreux', d: 'Site institutionnel sobre et rassurant pour un cabinet juridique.', g: 'linear-gradient(135deg,#3b82f6,#22d3ee)', m1: '+150%', l1: 'Prises de contact', m2: '4,9/5', l2: 'Satisfaction client' },
  { tag: 'Refonte', t: 'Restaurant Le Port', d: 'Modernisation et ajout de la réservation en ligne pour un restaurant.', g: 'linear-gradient(135deg,#14b8a6,#0ea5e9)', m1: '+65%', l1: 'Réservations en ligne', m2: '0,9s', l2: 'Vitesse mobile' },
];

/* ---------- PRICING ---------- */
const pricing = [
  {
    name: 'Essentiel', desc: 'Idéal pour lancer une activité avec un site vitrine professionnel.',
    price: '890', foot: 'Projet livré en 2 à 3 semaines', featured: false,
    feats: ['Site vitrine jusqu\'à 5 pages', 'Design responsive sur-mesure', 'Optimisation SEO de base', 'Formulaire de contact', 'Mise en ligne & formation', '1 mois de support inclus'],
  },
  {
    name: 'Pro', desc: 'Le meilleur équilibre : un site complet avec un vrai travail de référencement.',
    price: '1 690', foot: 'Le choix de la plupart de mes clients', featured: true,
    feats: ['Site jusqu\'à 10 pages', 'Audit & optimisation SEO complète', 'SEO local Normandie + fiche Google', 'Rédaction des contenus optimisés', 'Suivi des positions 3 mois', 'Performance & vitesse optimisées', '3 mois de support inclus'],
  },
  {
    name: 'Premium', desc: 'Pour les projets ambitieux : e-commerce, SEO avancé et maintenance.',
    price: '2 990', foot: 'Solution clé en main & évolutive', featured: false,
    feats: ['Site e-commerce ou sur-mesure', 'Stratégie SEO avancée & contenu', 'SEO local multi-villes', 'Maintenance & mises à jour incluses', 'Tableau de bord analytics', 'Accompagnement prioritaire', '6 mois de support inclus'],
  },
];

/* ---------- PROCESS ---------- */
const process = [
  { t: 'Échange & besoins', d: 'On discute de votre activité, vos objectifs et vos attentes lors d\'un premier appel gratuit.' },
  { t: 'Devis détaillé', d: 'Vous recevez une proposition claire, chiffrée et sans engagement sous 48h.' },
  { t: 'Conception', d: 'Je conçois maquette puis site, avec vos retours intégrés à chaque étape.' },
  { t: 'Mise en ligne', d: 'Tests, optimisation, hébergement : votre site est lancé et vous êtes formé(e).' },
  { t: 'Suivi & SEO', d: 'On suit les performances et on améliore votre référencement dans la durée.' },
];

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  { q: 'Mon site est enfin à la hauteur de mon travail. En trois mois, j\'apparais en première page sur Google et je reçois beaucoup plus de demandes de devis. Un vrai professionnel, à l\'écoute.', n: 'Sophie Lemaire', r: 'Menuiserie Lecomte · Rouen', av: 'SL' },
  { q: 'Un accompagnement humain et efficace du début à la fin. Ma boutique en ligne tourne parfaitement et mes ventes ont triplé. Je recommande sans hésiter à tous les artisans normands.', n: 'Thomas Béquet', r: 'Cidres du Bocage · Bayeux', av: 'TB' },
  { q: 'Réactif, pédagogue et de bon conseil. Il a compris mes besoins immédiatement et le résultat dépasse mes attentes. Mon téléphone n\'arrête plus de sonner grâce au SEO local !', n: 'Karim Aziz', r: 'Garage Auto · Le Havre', av: 'KA' },
];

/* ---------- FAQ ---------- */
const faqs = [
  { q: 'Quels sont les délais de création d\'un site ?', a: 'Comptez généralement 2 à 3 semaines pour un site vitrine, et 4 à 8 semaines pour un site e-commerce ou un projet sur-mesure. Tout dépend du nombre de pages et de la rapidité des retours et contenus de votre côté. Les délais précis sont indiqués dans le devis.' },
  { q: 'Combien coûte un site internet ?', a: 'Mes forfaits démarrent à 890 € pour un site vitrine, 1 690 € pour un site avec référencement, et 2 990 € pour un projet e-commerce complet. Chaque projet étant unique, je vous établis toujours un devis personnalisé et gratuit après notre premier échange.' },
  { q: 'Le référencement (SEO) est-il inclus ?', a: 'Une optimisation SEO de base est intégrée dès le forfait Essentiel. Les forfaits Pro et Premium incluent un travail de référencement approfondi : audit, mots-clés, contenus optimisés, SEO local en Normandie et suivi des positions sur Google pendant plusieurs mois.' },
  { q: 'Proposez-vous la maintenance du site ?', a: 'Oui. La maintenance (sécurité, sauvegardes, mises à jour, petites modifications) est incluse dans le forfait Premium et disponible en option sur les autres forfaits, à partir d\'un abonnement mensuel simple et sans engagement.' },
  { q: 'Gérez-vous l\'hébergement et le nom de domaine ?', a: 'Absolument. Je peux m\'occuper entièrement de l\'hébergement, de la réservation de votre nom de domaine et de la configuration de vos emails professionnels. Vous n\'avez rien à gérer techniquement : tout est pris en charge.' },
  { q: 'Travaillez-vous uniquement en Normandie ?', a: 'Je suis basé en Normandie (Rouen, Caen, Le Havre, Évreux) où je privilégie les rencontres en personne, mais je travaille avec des clients partout en France, entièrement à distance. La qualité de l\'accompagnement reste la même, où que vous soyez.' },
];

/* ============================================================
   RENDER
   ============================================================ */
function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

const servicesGrid = document.getElementById('servicesGrid');
services.forEach((s, idx) => {
  servicesGrid.appendChild(el(`
    <div class="card glass reveal d${idx % 3}">
      <div class="svc-ico">${svg(ICONS[s.i])}</div>
      <h3>${s.t}</h3>
      <p>${s.d}</p>
    </div>`));
});

const whyGrid = document.getElementById('whyGrid');
why.forEach((w, idx) => {
  whyGrid.appendChild(el(`
    <div class="why-card glass reveal d${idx % 3}">
      <div class="num">${String(idx + 1).padStart(2, '0')}</div>
      <div><h3>${w.t}</h3><p>${w.d}</p></div>
    </div>`));
});

const workGrid = document.getElementById('workGrid');
works.forEach((w, idx) => {
  workGrid.appendChild(el(`
    <div class="work-card glass reveal d${idx % 3}">
      <div class="work-preview" style="background:${w.g}">
        <span class="work-tag">${w.tag}</span>
        <div class="wp-mock"></div>
        <div class="wp-line" style="bottom:38px;left:18px;width:45%"></div>
        <div class="wp-line" style="bottom:24px;left:18px;width:60%;opacity:.6"></div>
      </div>
      <div class="work-body">
        <h3>${w.t}</h3>
        <p>${w.d}</p>
        <div class="work-metrics">
          <span><b>${w.m1}</b>${w.l1}</span>
          <span><b>${w.m2}</b>${w.l2}</span>
        </div>
      </div>
    </div>`));
});

const pricingGrid = document.getElementById('pricingGrid');
pricing.forEach((p, idx) => {
  const feats = p.feats.map(f => `<li>${svg(ICONS.check, 2.6)}<span>${f}</span></li>`).join('');
  pricingGrid.appendChild(el(`
    <div class="price-card glass reveal d${idx} ${p.featured ? 'featured' : ''}">
      <div class="price-name">${p.name}</div>
      <p class="price-desc">${p.desc}</p>
      <div class="price-from">à partir de</div>
      <div class="price-amount"><span class="val">${p.price}</span><span class="cur">€</span></div>
      <div class="price-foot">${p.foot}</div>
      <ul class="price-features">${feats}</ul>
      <a href="#contact" class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'}">Choisir ${p.name}</a>
    </div>`));
});

const processTrack = document.getElementById('processTrack');
process.forEach((p, idx) => {
  processTrack.appendChild(el(`
    <div class="step-card glass reveal d${idx % 4}">
      <div class="step-num">${idx + 1}</div>
      <h3>${p.t}</h3>
      <p>${p.d}</p>
    </div>`));
});

const testimonialGrid = document.getElementById('testimonialGrid');
testimonials.forEach((t, idx) => {
  testimonialGrid.appendChild(el(`
    <div class="quote-card glass reveal d${idx}">
      <div class="stars">${svg(ICONS.star).repeat(5)}</div>
      <blockquote>« ${t.q} »</blockquote>
      <div class="quote-author">
        <div class="av">${t.av}</div>
        <div><b>${t.n}</b><span>${t.r}</span></div>
      </div>
    </div>`));
});

const faqList = document.getElementById('faqList');
faqs.forEach((f, idx) => {
  const item = el(`
    <div class="faq-item glass reveal d${idx % 3}">
      <button class="faq-q" aria-expanded="false">${f.q}<span class="chev">${svg(ICONS.chev)}</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`);
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
    if (!open) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; btn.setAttribute('aria-expanded', 'true'); }
  });
  faqList.appendChild(item);
});

/* ============================================================
   INTERACTIONS
   ============================================================ */

/* Theme toggle */
const root = document.documentElement;
const saved = localStorage.getItem('awn-theme');
if (saved) root.setAttribute('data-theme', saved);
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('awn-theme', next);
  window.dispatchEvent(new CustomEvent('awn-theme-change', { detail: next }));
});

/* Nav scroll state */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Mobile menu */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const toggleMenu = (open) => { mobileMenu.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : ''; };
burger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* Scroll reveal — IntersectionObserver with a getBoundingClientRect fallback
   (some embedded/offscreen iframes never fire IO callbacks). */
const revealEls = Array.from(document.querySelectorAll('.reveal'));
function revealInView() {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  let remaining = false;
  for (const el of revealEls) {
    if (el.classList.contains('in')) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh - 40 && r.bottom > 0) el.classList.add('in');
    else remaining = true;
  }
  return remaining;
}
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(r => io.observe(r));
}
// Fallback: run on load + scroll regardless, in case IO never fires.
window.addEventListener('scroll', revealInView, { passive: true });
window.addEventListener('resize', revealInView, { passive: true });
revealInView();
requestAnimationFrame(revealInView);
setTimeout(revealInView, 300);

/* Form validation */
const form = document.getElementById('contactForm');
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  const checks = [
    ['name', v => v.trim().length > 1],
    ['email', v => isEmail(v.trim())],
    ['project', v => v.trim() !== ''],
    ['message', v => v.trim().length > 4],
  ];
  checks.forEach(([id, fn]) => {
    const input = document.getElementById(id);
    const field = input.closest('.field');
    if (!fn(input.value)) { field.classList.add('error'); ok = false; } else { field.classList.remove('error'); }
  });
  if (!ok) return;
  form.style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
});
form.querySelectorAll('input, select, textarea').forEach(inp => {
  inp.addEventListener('input', () => inp.closest('.field').classList.remove('error'));
});
