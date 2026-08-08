import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { requireAdminSession } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/roles";
import { AdminNav } from "./nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  const today = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date());

  const initials = (session.user.email ?? "??").slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen bg-content">
      <aside className="flex w-64 shrink-0 flex-col justify-between bg-navy-950 px-4 py-6">
        <div className="flex flex-col gap-8">
          <Link href="/admin" className="flex items-center gap-2 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
              H
            </span>
            <span className="text-sm font-semibold text-white">
              Harmony<span className="text-accent-500">Blend</span>
            </span>
          </Link>
          <AdminNav />
        </div>

        <div className="flex flex-col gap-3 border-t border-navy-border pt-4">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Çıkış yap
            </button>
          </form>
          <p className="px-3 text-xs text-white/30">© 2026 HarmonyBlend</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-navy-border bg-navy-950 px-8 py-4">
          <span className="text-sm capitalize text-white/60">{today}</span>
          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-white">{session.user.email}</p>
              <p className="text-xs text-white/40">{ROLE_LABELS[session.user.role]}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
              {initials}
            </span>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
