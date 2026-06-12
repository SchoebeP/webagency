// Préfixe optionnel de déploiement (ex. "/rouvier" sous studio-albatre.fr).
// Next préfixe automatiquement <Link>, router.push/replace et les routes,
// mais PAS les URL écrites à la main (fetch("/api/..."), <img src>, <form
// action>) : celles-ci doivent passer par withBase().
// NEXT_PUBLIC_ → la valeur est inlinée dans les bundles au build ; doit donc
// être fournie au moment du build (en plus de BASE_PATH pour next.config).

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (p: string) => `${BASE_PATH}${p}`;
