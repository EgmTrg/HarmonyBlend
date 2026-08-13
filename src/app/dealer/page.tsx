import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { CARD } from "@/lib/ui";
import { ProductCatalog } from "./product-catalog";

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
    <div className="flex flex-col gap-10">
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
        const brandProducts = (productsByBrand.get(brand.id) ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          unit: p.unit,
          unitPrice: p.unitPrice,
          vatRate: p.vatRate,
        }));
        return (
          <section key={brand.id} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-ink-900">{brand.name}</h2>
            <div className={CARD}>
              <ProductCatalog brandId={brand.id} products={brandProducts} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
