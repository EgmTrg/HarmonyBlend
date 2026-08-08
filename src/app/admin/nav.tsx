"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  Package,
  Tags,
  type LucideIcon,
} from "lucide-react";

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon; matchPrefixes?: string[] }[] = [
  { href: "/admin", label: "Genel Bakış", icon: LayoutDashboard },
  {
    href: "/admin/brands",
    label: "Markalar & Bayiler",
    icon: Tags,
    matchPrefixes: ["/admin/brands", "/admin/dealers"],
  },
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/orders", label: "Siparişler", icon: ClipboardList },
  { href: "/admin/payment-methods", label: "Ödeme Yöntemleri", icon: CreditCard },
];

export function AdminNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : (item.matchPrefixes ?? [item.href]).some((prefix) => pathname.startsWith(prefix));
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
              (isActive
                ? "bg-accent-600 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white")
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
