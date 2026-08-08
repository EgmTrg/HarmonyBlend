import Link from "next/link";
import { signOut } from "@/auth";
import { requireAdminSession } from "@/lib/session";

const NAV_ITEMS = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/brands", label: "Markalar" },
  { href: "/admin/dealers", label: "Bayiler" },
  { href: "/admin/products", label: "Ürünler" },
  { href: "/admin/payment-methods", label: "Ödeme Yöntemleri" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm font-semibold">HarmonyBlend</span>
            <nav className="flex flex-wrap gap-4 text-sm text-neutral-600">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-neutral-900">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>
              {session.user.email} ({session.user.role})
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded border border-neutral-300 px-2 py-1 text-xs"
              >
                Çıkış yap
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
