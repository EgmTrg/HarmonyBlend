"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, LogOut, Undo2 } from "lucide-react";
import { useLocalStorageStore } from "@/lib/use-local-storage-store";
import { useMobileNav } from "@/components/mobile-nav-context";
import { DealerNav } from "./nav";

const STORAGE_KEY = "hb_dealer_sidebar_collapsed";

export function DealerSidebar({
  signOutAction,
  stopImpersonationAction,
  impersonatorEmail,
}: {
  signOutAction: () => Promise<void>;
  stopImpersonationAction?: () => Promise<void>;
  impersonatorEmail: string | null;
}) {
  const [collapsed, setCollapsed] = useLocalStorageStore(STORAGE_KEY, false);
  const { open, close } = useMobileNav();

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <>
      <div
        className={"fixed inset-0 z-40 bg-black/40 md:hidden " + (open ? "" : "pointer-events-none opacity-0")}
        onClick={close}
        aria-hidden={!open}
      />
      <aside
        className={
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col justify-between overflow-y-auto bg-navy-950 px-3 py-6 transition-transform duration-200 motion-reduce:transition-none md:sticky md:top-0 md:transition-[width] md:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full") + " " +
          (collapsed ? "md:w-20" : "md:w-64")
        }
      >
      <div className="flex flex-col gap-8">
        <Link href="/dealer" className={"flex items-center gap-2 px-2" + (collapsed ? " justify-center" : "")}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
            H
          </span>
          {!collapsed && (
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white">
                Harmony<span className="text-accent-500">Blend</span>
              </span>
              <span className="block text-xs text-white/40">Bayi Paneli</span>
            </span>
          )}
        </Link>
        <DealerNav collapsed={collapsed} />
      </div>

      <div className="flex flex-col gap-3 border-t border-navy-border pt-4">
        <button
          onClick={toggle}
          aria-label={collapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
          className={
            "hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white/60 transition hover:bg-white/5 hover:text-white md:flex " +
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

        {stopImpersonationAction && (
          <form action={stopImpersonationAction}>
            <button
              type="submit"
              title={impersonatorEmail ? `${impersonatorEmail} olarak devam et` : undefined}
              className={
                "flex w-full items-center gap-3 rounded-lg border border-accent-500/40 bg-accent-500/10 px-3 py-2 text-sm font-medium text-accent-100 transition hover:bg-accent-500/20 " +
                (collapsed ? "justify-center" : "")
              }
            >
              <Undo2 className="h-4 w-4 shrink-0" strokeWidth={2} />
              {!collapsed && "Kendi hesabıma dön"}
            </button>
          </form>
        )}

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
    </>
  );
}
