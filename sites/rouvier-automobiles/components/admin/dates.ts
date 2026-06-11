// Formatage des dates de demandes d'essai — fuseau Europe/Paris fixé pour
// être indépendant du fuseau du serveur (rendu côté serveur uniquement).

const formatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Paris",
});

export function formatRequestDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : formatter.format(date);
}
