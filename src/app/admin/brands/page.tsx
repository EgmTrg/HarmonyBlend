import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { createBrand, deleteBrand } from "./actions";

export default async function BrandsPage() {
  const session = await requireAdminSession();

  const companyBrands = await db
    .select()
    .from(brands)
    .where(eq(brands.companyId, session.user.companyId))
    .orderBy(brands.name);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Markalar</h1>
        <p className="text-sm text-neutral-600">Firmaya bağlı alt markaları yönetin.</p>
      </div>

      <form action={createBrand} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs text-neutral-500">
            Marka adı
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          />
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
            <th className="py-2 font-medium">Slug</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {companyBrands.map((brand) => (
            <tr key={brand.id} className="border-b border-neutral-100">
              <td className="py-2">
                <Link href={`/admin/brands/${brand.id}`} className="hover:underline">
                  {brand.name}
                </Link>
              </td>
              <td className="py-2 text-neutral-500">{brand.slug}</td>
              <td className="py-2 text-right">
                <form action={deleteBrand.bind(null, brand.id)}>
                  <button type="submit" className="text-xs text-red-600 hover:underline">
                    Sil
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {companyBrands.length === 0 && (
            <tr>
              <td colSpan={3} className="py-6 text-center text-neutral-400">
                Henüz marka eklenmedi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
