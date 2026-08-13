import Link from "next/link";
import { Plus } from "lucide-react";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { ToastForm } from "@/components/toast-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import {
  BUTTON_GHOST_DANGER,
  BUTTON_PRIMARY,
  CARD,
  INPUT,
  LABEL,
  TABLE_HEAD,
  TABLE_ROW,
  badgeClass,
} from "@/lib/ui";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  toggleProductActive,
  updateProductVatRate,
} from "./actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const session = await requireAdminSession();
  const { brand: brandParam } = await searchParams;

  const companyBrands = await db
    .select()
    .from(brands)
    .where(eq(brands.companyId, session.user.companyId))
    .orderBy(brands.name);

  if (companyBrands.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold text-ink-900">Ürünler</h1>
        <p className="text-sm text-ink-400">
          Kategori ve ürün eklemek için önce bir marka oluşturmalısınız.
        </p>
        <Link href="/admin/brands" className="self-start text-sm font-medium text-accent-600 hover:underline">
          Marka oluştur
        </Link>
      </div>
    );
  }

  const selectedBrand =
    companyBrands.find((brand) => brand.id === brandParam) ?? companyBrands[0];

  const [brandCategories, brandProducts] = await Promise.all([
    db
      .select()
      .from(categories)
      .where(eq(categories.brandId, selectedBrand.id))
      .orderBy(categories.name),
    db
      .select()
      .from(products)
      .where(and(eq(products.brandId, selectedBrand.id)))
      .orderBy(products.name),
  ]);

  const categoryNameById = new Map(brandCategories.map((c) => [c.id, c.name]));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Ürünler</h1>
        <p className="text-sm text-ink-400">Marka bazlı kategori ve ürün kataloğu.</p>
      </div>

      <nav className="flex flex-wrap gap-2">
        {companyBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/admin/products?brand=${brand.id}`}
            className={
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition " +
              (brand.id === selectedBrand.id
                ? "border-accent-600 bg-accent-600 text-white"
                : "border-border bg-card text-ink-600 hover:border-accent-500 hover:text-accent-600")
            }
          >
            {brand.name}
          </Link>
        ))}
      </nav>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink-900">Ürünler</h2>
        <div className={CARD}>
          <ToastForm
            action={createProduct.bind(null, selectedBrand.id)}
            successMessage="Ürün eklendi"
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="p-name" className={LABEL}>
                Ürün adı
              </label>
              <input id="p-name" name="name" required className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="p-sku" className={LABEL}>
                SKU
              </label>
              <input id="p-sku" name="sku" required className={`w-28 ${INPUT}`} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="p-unit" className={LABEL}>
                Birim
              </label>
              <input
                id="p-unit"
                name="unit"
                placeholder="koli / kg / adet"
                required
                className={`w-32 ${INPUT}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="p-price" className={LABEL}>
                Birim fiyat
              </label>
              <input
                id="p-price"
                name="unitPrice"
                type="number"
                step="0.01"
                min="0"
                required
                className={`w-28 ${INPUT}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="p-vat" className={LABEL}>
                KDV %
              </label>
              <input
                id="p-vat"
                name="vatRate"
                type="number"
                step="0.01"
                min="0"
                defaultValue={20}
                required
                className={`w-24 ${INPUT}`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="p-category" className={LABEL}>
                Kategori
              </label>
              <select id="p-category" name="categoryId" className={INPUT}>
                <option value="">— Yok —</option>
                {brandCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
              Ekle
            </button>
          </ToastForm>
        </div>

        <div className={CARD}>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Ad</th>
                <th className="pb-3 font-medium">SKU</th>
                <th className="pb-3 font-medium">Kategori</th>
                <th className="pb-3 font-medium">Birim fiyat</th>
                <th className="pb-3 font-medium">KDV %</th>
                <th className="pb-3 font-medium">Durum</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {brandProducts.map((product) => (
                <tr key={product.id} className={TABLE_ROW}>
                  <td className="py-3 font-medium text-ink-900">{product.name}</td>
                  <td className="py-3 text-ink-400">{product.sku}</td>
                  <td className="py-3 text-ink-400">
                    {product.categoryId
                      ? (categoryNameById.get(product.categoryId) ?? "—")
                      : "—"}
                  </td>
                  <td className="py-3 text-ink-600">
                    {product.unit} — {product.unitPrice}
                  </td>
                  <td className="py-3">
                    <ToastForm
                      action={updateProductVatRate.bind(null, product.id, selectedBrand.id)}
                      successMessage="KDV oranı güncellendi"
                      className="flex items-center gap-1.5"
                    >
                      <input
                        name="vatRate"
                        type="number"
                        step="0.01"
                        min="0"
                        defaultValue={product.vatRate}
                        className={`w-16 px-2 py-1 text-xs ${INPUT}`}
                      />
                      <button type="submit" className={`${BUTTON_PRIMARY} px-2 py-1 text-xs`}>
                        Kaydet
                      </button>
                    </ToastForm>
                  </td>
                  <td className="py-3">
                    <ToastForm
                      action={toggleProductActive.bind(
                        null,
                        product.id,
                        selectedBrand.id,
                        !product.isActive
                      )}
                      successMessage={product.isActive ? "Ürün pasif yapıldı" : "Ürün aktif yapıldı"}
                    >
                      <button type="submit" className={badgeClass(product.isActive ? "success" : "neutral")}>
                        {product.isActive ? "Aktif" : "Pasif"}
                      </button>
                    </ToastForm>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <ConfirmDeleteButton
                        action={deleteProduct.bind(null, product.id, selectedBrand.id, true)}
                        idleLabel="Zorla sil"
                        confirmLabel="Siparişleriyle birlikte sil?"
                        successMessage="Ürün ve ilişkili siparişler silindi"
                        muted
                      />
                      <ToastForm
                        action={deleteProduct.bind(null, product.id, selectedBrand.id, false)}
                        successMessage="Ürün silindi"
                      >
                        <button type="submit" className={BUTTON_GHOST_DANGER}>
                          Sil
                        </button>
                      </ToastForm>
                    </div>
                  </td>
                </tr>
              ))}
              {brandProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-400">
                    Bu markada henüz ürün yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink-900">Kategoriler</h2>
        <div className={CARD}>
          <ToastForm
            action={createCategory.bind(null, selectedBrand.id)}
            successMessage="Kategori eklendi"
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="cat-name" className={LABEL}>
                Kategori adı
              </label>
              <input id="cat-name" name="name" required className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cat-parent" className={LABEL}>
                Üst kategori
              </label>
              <select id="cat-parent" name="parentId" className={INPUT}>
                <option value="">— Yok —</option>
                {brandCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
              Ekle
            </button>
          </ToastForm>
        </div>

        <div className={`${CARD} p-0`}>
          <ul className="flex flex-col divide-y divide-border">
            {brandCategories.map((category) => (
              <li
                key={category.id}
                className="flex items-center justify-between px-6 py-3 text-sm"
              >
                <span className="text-ink-900">
                  {category.name}
                  {category.parentId && (
                    <span className="text-ink-400">
                      {" "}
                      — üst: {categoryNameById.get(category.parentId) ?? "—"}
                    </span>
                  )}
                </span>
                <ToastForm
                  action={deleteCategory.bind(null, category.id, selectedBrand.id)}
                  successMessage="Kategori silindi"
                >
                  <button type="submit" className={BUTTON_GHOST_DANGER}>
                    Sil
                  </button>
                </ToastForm>
              </li>
            ))}
            {brandCategories.length === 0 && (
              <li className="px-6 py-10 text-center text-sm text-ink-400">
                Bu markada henüz kategori yok.
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
