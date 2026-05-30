import { trustbar } from "@/content";

/** Bandeau de confiance (4 chiffres clés). variant : "row" | "ghost" | "card". */
export default function TrustBar({ variant = "row" }: { variant?: "row" | "ghost" | "card" }) {
  return (
    <ul className={"trustbar trustbar--" + variant}>
      {trustbar.map((it, i) => (
        <li key={i}>
          <strong className={it.star ? "stars-strong" : ""}>{it.strong}</strong>
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
