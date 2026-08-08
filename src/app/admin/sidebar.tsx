"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useLocalStorageStore } from "@/lib/use-local-storage-store";
import { AdminNav } from "./nav";

const STORAGE_KEY = "hb_admin_sidebar_collapsed";

export function AdminSidebar({ signOutAction }: { signOutAction: () => Promise<void> }) {
  const [collapsed, setCollapsed] = useLocalStorageStore(STORAGE_KEY, false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <aside
      className={
        "flex shrink-0 flex-col justify-between bg-navy-950 px-3 py-6 transition-[width] duration-200 motion-reduce:transition-none " +
        (collapsed ? "w-20" : "w-64")
      }
    >
      <div className="flex flex-col gap-8">
        <Link href="/admin" className={"flex items-center gap-2 px-2" + (collapsed ? " justify-center" : "")}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
            H
          </span>
          {!collapsed && (
            <span className="text-sm font-semibold text-white">
              Harmony<span className="text-accent-500">Blend</span>
            </span>
          )}
        </Link>
        <AdminNav collapsed={collapsed} />
      </div>

      <div className="flex flex-col gap-3 border-t border-navy-border pt-4">
        <button
          onClick={toggle}
          aria-label={collapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
          className={
            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/5 hover:text-white " +
            (collapsed ? "justify-center" : "")
          }
        >
          {collapsed ? <ChevronRight className="h-4 w-4" strokeWidth={2} /> : (
            <>
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              Daralt
            </>
          )}
        </button>

        <form action={signOutAction}>
          <button
            type="submit"
            title={collapsed ? "Çıkış yap" : undefined}
            className={
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white " +
              (collapsed ? "justify-center" : "")
            }
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
            {!collapsed && "Çıkış yap"}
          </button>
        </form>

        {!collapsed && <p className="px-3 text-xs text-white/30">© 2026 HarmonyBlend</p>}
      </div>
    </aside>
  );
}
