import { and, eq, inArray } from "drizzle-orm";
import { signOut } from "@/auth";
import { db } from "@/db";
import { brands, dealerBrands, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";

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
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">HarmonyBlend — Bayi Paneli</span>
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span>{session.user.email}</span>
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

      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-8">
        <div>
          <h1 className="text-xl font-semibold">Ürün Kataloğu</h1>
          <p className="text-sm text-neutral-600">Erişiminiz olan markaların ürünleri.</p>
        </div>

        {assignedBrands.length === 0 && (
          <p className="rounded border border-neutral-200 px-3 py-8 text-center text-sm text-neutral-400">
            Henüz hiçbir markaya erişiminiz yok. Lütfen yöneticinizle iletişime geçin.
          </p>
        )}

        {assignedBrands.map((brand) => {
          const brandProducts = productsByBrand.get(brand.id) ?? [];
          return (
            <section key={brand.id} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{brand.name}</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-neutral-500">
                    <th className="py-2 font-medium">Ürün</th>
                    <th className="py-2 font-medium">SKU</th>
                    <th className="py-2 font-medium">Birim</th>
                    <th className="py-2 font-medium">Birim fiyat</th>
                  </tr>
                </thead>
                <tbody>
                  {brandProducts.map((product) => (
                    <tr key={product.id} className="border-b border-neutral-100">
                      <td className="py-2">{product.name}</td>
                      <td className="py-2 text-neutral-500">{product.sku}</td>
                      <td className="py-2 text-neutral-500">{product.unit}</td>
                      <td className="py-2 text-neutral-500">{product.unitPrice}</td>
                    </tr>
                  ))}
                  {brandProducts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-neutral-400">
                        Bu markada henüz satışa açık ürün yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          );
        })}
      </main>
    </div>
  );
}
