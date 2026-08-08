"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, CreditCard, LayoutDashboard, Package, Tags, type LucideIcon } from "lucide-react";

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard },
  { href: "/admin/brands", label: "Markalar", icon: Tags },
  { href: "/admin/dealers", label: "Bayiler", icon: Building2 },
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/payment-methods", label: "Ödeme Yöntemleri", icon: CreditCard },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition " +
              (isActive
                ? "bg-accent-600 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white")
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
