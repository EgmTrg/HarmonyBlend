"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, ShoppingBasket } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dealer", label: "Ürün Kataloğu", icon: ShoppingBasket },
  { href: "/dealer/orders", label: "Siparişlerim", icon: ClipboardList },
];

export function DealerNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/dealer" ? pathname === "/dealer" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition " +
              (collapsed ? "justify-center" : "") +
              " " +
              (isActive ? "bg-accent-600 text-white" : "text-white/60 hover:bg-white/5 hover:text-white")
            }
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
            {!collapsed && item.label}
          </Link>
        );
      })}
    </nav>
  );
}
