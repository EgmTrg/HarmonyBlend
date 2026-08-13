import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands } from "@/db/schema";
import { signOut } from "@/auth";
import { requireDealerSession } from "@/lib/session";
import { ROLE_LABELS } from "@/lib/roles";
import { CartProvider } from "./cart-context";
import { CartDrawer } from "./cart-drawer";
import { CartDrawerTrigger } from "./cart-drawer-trigger";
import { DealerSidebar } from "./sidebar";
import { stopImpersonation } from "./actions";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function DealerLayout({ children }: { children: React.ReactNode }) {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const assignedBrands = await db
    .select({ id: brands.id, name: brands.name })
    .from(dealerBrands)
    .innerJoin(brands, eq(dealerBrands.brandId, brands.id))
    .where(and(eq(dealerBrands.dealerId, dealerId), eq(dealerBrands.isActive, true)))
    .orderBy(brands.name);

  const today = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date());

  const initials = (session.user.email ?? "??").slice(0, 2).toUpperCase();

  return (
    <CartProvider>
      <div className="flex min-h-screen bg-content">
        <DealerSidebar
          signOutAction={signOutAction}
          stopImpersonationAction={session.user.impersonatorEmail ? stopImpersonation : undefined}
          impersonatorEmail={session.user.impersonatorEmail}
        />

        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-navy-border bg-navy-950 px-8 py-4">
            <span className="text-sm capitalize text-white/60">{today}</span>
            <div className="flex items-center gap-3">
              <CartDrawerTrigger />
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

        <CartDrawer brands={assignedBrands} />
      </div>
    </CartProvider>
  );
}
