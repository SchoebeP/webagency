// Helpers de formatage FR — portés du prototype (cars-data.js).
// toLocaleString("fr-FR") insère des espaces fines insécables (U+202F) :
// identique côté serveur (Node ICU) et navigateur.

export function formatPrice(n: number): string {
  return n.toLocaleString("fr-FR") + " €";
}

export function formatKm(n: number): string {
  return n.toLocaleString("fr-FR") + " km";
}

/** "219 €/mois" — à préfixer selon le contexte ("dès …", "ou dès …*"). */
export function formatMonthly(n: number): string {
  return n.toLocaleString("fr-FR") + " €/mois";
}
