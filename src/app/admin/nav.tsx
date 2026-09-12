"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  ExternalLink,
  FileBarChart2,
  FileSearch,
  LayoutDashboard,
  Package,
  Settings,
  Tags,
  Users,
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
  { href: "/admin/order-details", label: "Sipariş (Detaylı)", icon: FileSearch },
  { href: "/admin/external-orders", label: "Dış Sipariş", icon: ExternalLink },
  { href: "/admin/end-of-day", label: "Gün Sonu", icon: CalendarCheck },
  { href: "/admin/audit", label: "Denetim", icon: ClipboardCheck },
  { href: "/admin/reports", label: "Raporlar", icon: FileBarChart2 },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
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
