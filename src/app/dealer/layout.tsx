import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { requireDealerSession } from "@/lib/session";
import { CartProvider } from "./cart-context";
import { DealerNav } from "./nav";

export default async function DealerLayout({ children }: { children: React.ReactNode }) {
  const session = await requireDealerSession();

  return (
    <CartProvider>
      <div className="min-h-screen bg-content">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-border bg-navy-950 px-8 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
                H
              </span>
              <span className="text-sm font-semibold text-white">
                Harmony<span className="text-accent-500">Blend</span>{" "}
                <span className="text-white/40">— Bayi Paneli</span>
              </span>
            </div>
            <DealerNav />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">{session.user.email}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
                Çıkış yap
              </button>
            </form>
          </div>
        </header>

        <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">{children}</main>
      </div>
    </CartProvider>
  );
}
