import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  toggleProductActive,
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
        <h1 className="text-xl font-semibold">Ürünler</h1>
        <p className="text-sm text-neutral-600">
          Kategori ve ürün eklemek için önce bir marka oluşturmalısınız.
        </p>
        <Link href="/admin/brands" className="self-start text-sm text-neutral-900 underline">
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
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-xl font-semibold">Ürünler</h1>
        <p className="text-sm text-neutral-600">Marka bazlı kategori ve ürün kataloğu.</p>
      </div>

      <nav className="flex flex-wrap gap-2">
        {companyBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/admin/products?brand=${brand.id}`}
            className={
              "rounded-full border px-3 py-1 text-sm " +
              (brand.id === selectedBrand.id
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-600")
            }
          >
            {brand.name}
          </Link>
        ))}
      </nav>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Kategoriler</h2>
        <form
          action={createCategory.bind(null, selectedBrand.id)}
          className="flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="cat-name" className="text-xs text-neutral-500">
              Kategori adı
            </label>
            <input
              id="cat-name"
              name="name"
              required
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cat-parent" className="text-xs text-neutral-500">
              Üst kategori
            </label>
            <select
              id="cat-parent"
              name="parentId"
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="">— Yok —</option>
              {brandCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
          >
            Ekle
          </button>
        </form>

        <ul className="flex flex-col divide-y divide-neutral-100 rounded border border-neutral-200">
          {brandCategories.map((category) => (
            <li key={category.id} className="flex items-center justify-between px-3 py-2 text-sm">
              <span>
                {category.name}
                {category.parentId && (
                  <span className="text-neutral-400">
                    {" "}
                    — üst: {categoryNameById.get(category.parentId) ?? "—"}
                  </span>
                )}
              </span>
              <form action={deleteCategory.bind(null, category.id, selectedBrand.id)}>
                <button type="submit" className="text-xs text-red-600 hover:underline">
                  Sil
                </button>
              </form>
            </li>
          ))}
          {brandCategories.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-neutral-400">
              Bu markada henüz kategori yok.
            </li>
          )}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Ürünler</h2>
        <form
          action={createProduct.bind(null, selectedBrand.id)}
          className="flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="p-name" className="text-xs text-neutral-500">
              Ürün adı
            </label>
            <input
              id="p-name"
              name="name"
              required
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="p-sku" className="text-xs text-neutral-500">
              SKU
            </label>
            <input
              id="p-sku"
              name="sku"
              required
              className="w-28 rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="p-unit" className="text-xs text-neutral-500">
              Birim
            </label>
            <input
              id="p-unit"
              name="unit"
              placeholder="koli / kg / adet"
              required
              className="w-28 rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="p-price" className="text-xs text-neutral-500">
              Birim fiyat
            </label>
            <input
              id="p-price"
              name="unitPrice"
              type="number"
              step="0.01"
              min="0"
              required
              className="w-28 rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="p-category" className="text-xs text-neutral-500">
              Kategori
            </label>
            <select
              id="p-category"
              name="categoryId"
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            >
              <option value="">— Yok —</option>
              {brandCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
          >
            Ekle
          </button>
        </form>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-neutral-500">
              <th className="py-2 font-medium">Ad</th>
              <th className="py-2 font-medium">SKU</th>
              <th className="py-2 font-medium">Kategori</th>
              <th className="py-2 font-medium">Birim fiyat</th>
              <th className="py-2 font-medium">Durum</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {brandProducts.map((product) => (
              <tr key={product.id} className="border-b border-neutral-100">
                <td className="py-2">{product.name}</td>
                <td className="py-2 text-neutral-500">{product.sku}</td>
                <td className="py-2 text-neutral-500">
                  {product.categoryId ? (categoryNameById.get(product.categoryId) ?? "—") : "—"}
                </td>
                <td className="py-2 text-neutral-500">
                  {product.unit} — {product.unitPrice}
                </td>
                <td className="py-2">
                  <form
                    action={toggleProductActive.bind(
                      null,
                      product.id,
                      selectedBrand.id,
                      !product.isActive
                    )}
                  >
                    <button
                      type="submit"
                      className={
                        "rounded-full px-2 py-0.5 text-xs " +
                        (product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-200 text-neutral-500")
                      }
                    >
                      {product.isActive ? "Aktif" : "Pasif"}
                    </button>
                  </form>
                </td>
                <td className="py-2 text-right">
                  <form action={deleteProduct.bind(null, product.id, selectedBrand.id)}>
                    <button type="submit" className="text-xs text-red-600 hover:underline">
                      Sil
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {brandProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-neutral-400">
                  Bu markada henüz ürün yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
