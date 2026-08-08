import { LogOut } from "lucide-react";
import { and, eq, inArray } from "drizzle-orm";
import { signOut } from "@/auth";
import { db } from "@/db";
import { brands, dealerBrands, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";

export default async function DealerCatalogPage() {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const assignedBrands = await db
    .select({ id: brands.id, name: brands.name })
    .from(dealerBrands)
    .innerJoin(brands, eq(dealerBrands.brandId, brands.id))
    .where(and(eq(dealerBrands.dealerId, dealerId), eq(dealerBrands.isActive, true)))
    .orderBy(brands.name);

  const brandIds = assignedBrands.map((brand) => brand.id);

  const catalogProducts =
    brandIds.length > 0
      ? await db
          .select()
          .from(products)
          .where(and(inArray(products.brandId, brandIds), eq(products.isActive, true)))
          .orderBy(products.name)
      : [];

  const productsByBrand = new Map<string, typeof catalogProducts>();
  for (const product of catalogProducts) {
    const list = productsByBrand.get(product.brandId) ?? [];
    list.push(product);
    productsByBrand.set(product.brandId, list);
  }

  return (
    <div className="min-h-screen bg-content">
      <header className="flex items-center justify-between border-b border-navy-border bg-navy-950 px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">
            H
          </span>
          <span className="text-sm font-semibold text-white">
            Harmony<span className="text-accent-500">Blend</span>{" "}
            <span className="text-white/40">— Bayi Paneli</span>
          </span>
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

      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Ürün Kataloğu</h1>
          <p className="text-sm text-ink-400">Erişiminiz olan markaların ürünleri.</p>
        </div>

        {assignedBrands.length === 0 && (
          <p className={`${CARD} text-center text-sm text-ink-400`}>
            Henüz hiçbir markaya erişiminiz yok. Lütfen yöneticinizle iletişime geçin.
          </p>
        )}

        {assignedBrands.map((brand) => {
          const brandProducts = productsByBrand.get(brand.id) ?? [];
          return (
            <section key={brand.id} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-ink-900">{brand.name}</h2>
              <div className={CARD}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={TABLE_HEAD}>
                      <th className="pb-3 font-medium">Ürün</th>
                      <th className="pb-3 font-medium">SKU</th>
                      <th className="pb-3 font-medium">Birim</th>
                      <th className="pb-3 font-medium">Birim fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandProducts.map((product) => (
                      <tr key={product.id} className={TABLE_ROW}>
                        <td className="py-3 font-medium text-ink-900">{product.name}</td>
                        <td className="py-3 text-ink-400">{product.sku}</td>
                        <td className="py-3 text-ink-400">{product.unit}</td>
                        <td className="py-3 text-ink-600">{product.unitPrice}</td>
                      </tr>
                    ))}
                    {brandProducts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-10 text-center text-ink-400">
                          Bu markada henüz satışa açık ürün yok.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
