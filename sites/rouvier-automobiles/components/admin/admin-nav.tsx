"use client";

// Navigation latérale de l'espace pro — états actifs via usePathname.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui";

const ITEMS: { href: string; label: string; icon: IconName; exact?: boolean }[] = [
  { href: "/admin", label: "Tableau de bord", icon: "gauge", exact: true },
  { href: "/admin/vehicules", label: "Véhicules", icon: "key" },
  { href: "/admin/demandes", label: "Demandes d'essai", icon: "calendar" },
  { href: "/admin/parametres", label: "Paramètres", icon: "wrench" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Navigation espace pro">
      {ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={"admin-nav-link" + (active ? " active" : "")}
            aria-current={active ? "page" : undefined}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
