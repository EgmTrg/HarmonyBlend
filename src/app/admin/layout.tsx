import { signOut } from "@/auth";
import { requireAdminSession } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/roles";
import { AdminSidebar } from "./sidebar";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

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
      <AdminSidebar signOutAction={signOutAction} />

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
