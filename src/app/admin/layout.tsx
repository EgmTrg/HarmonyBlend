import { signOut } from "@/auth";
import { requireAdminSession } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/roles";
import { MobileNavProvider } from "@/components/mobile-nav-context";
import { MobileNavToggle } from "@/components/mobile-nav-toggle";
import { logActivity } from "@/lib/activity-log";
import { AdminSidebar } from "./sidebar";

async function signOutAction() {
  "use server";
  const session = await requireAdminSession();
  await logActivity({
    action: "auth.logout",
    message: `Çıkış yapıldı: ${session.user.email}`,
    source: "admin.layout.signOutAction",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
  });
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
    <MobileNavProvider>
      <div className="flex min-h-screen bg-content">
        <AdminSidebar signOutAction={signOutAction} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-navy-border bg-navy-950 px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <MobileNavToggle />
              <span className="hidden text-sm capitalize text-white/60 sm:inline">{today}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right leading-tight">
                <p className="max-w-[140px] truncate text-sm font-medium text-white sm:max-w-none">
                  {session.user.email}
                </p>
                <p className="text-xs text-white/40">{ROLE_LABELS[session.user.role]}</p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
                {initials}
              </span>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </MobileNavProvider>
  );
}
