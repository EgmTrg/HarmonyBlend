"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, ShoppingBasket } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dealer", label: "Ürün Kataloğu", icon: ShoppingBasket },
  { href: "/dealer/orders", label: "Siparişlerim", icon: ClipboardList },
];

export function DealerNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/dealer" ? pathname === "/dealer" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition " +
              (isActive ? "bg-accent-600 text-white" : "text-white/60 hover:bg-white/5 hover:text-white")
            }
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
