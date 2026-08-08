import Link from "next/link";
import { Plus } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealers } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { createBrand, deleteBrand } from "./actions";
import { createDealer, deleteDealer } from "../dealers/actions";

export default async function BrandsAndDealersPage() {
  const session = await requireAdminSession();

  const [companyBrands, companyDealers] = await Promise.all([
    db
      .select()
      .from(brands)
      .where(eq(brands.companyId, session.user.companyId))
      .orderBy(brands.name),
    db
      .select()
      .from(dealers)
      .where(eq(dealers.companyId, session.user.companyId))
      .orderBy(dealers.name),
  ]);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Markalar</h1>
          <p className="text-sm text-ink-400">Firmaya bağlı alt markaları yönetin.</p>
        </div>

        <div className={CARD}>
          <form action={createBrand} className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className={LABEL}>
                Marka adı
              </label>
              <input id="name" name="name" required className={INPUT} />
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
              Ekle
            </button>
          </form>
        </div>

        <div className={CARD}>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Ad</th>
                <th className="pb-3 font-medium">Slug</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {companyBrands.map((brand) => (
                <tr key={brand.id} className={TABLE_ROW}>
                  <td className="py-3">
                    <Link
                      href={`/admin/brands/${brand.id}`}
                      className="font-medium text-ink-900 hover:text-accent-600"
                    >
                      {brand.name}
                    </Link>
                  </td>
                  <td className="py-3 text-ink-400">{brand.slug}</td>
                  <td className="py-3 text-right">
                    <form action={deleteBrand.bind(null, brand.id)}>
                      <button type="submit" className={BUTTON_GHOST_DANGER}>
                        Sil
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {companyBrands.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-ink-400">
                    Henüz marka eklenmedi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900">Bayiler</h2>
          <p className="text-sm text-ink-400">
            Bayileri tanımlayın ve hangi markalara erişebileceklerini atayın.
          </p>
        </div>

        <div className={CARD}>
          <form action={createDealer} className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="dealer-name" className={LABEL}>
                Bayi adı
              </label>
              <input id="dealer-name" name="name" required className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="taxNo" className={LABEL}>
                Vergi no
              </label>
              <input id="taxNo" name="taxNo" className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="address" className={LABEL}>
                Adres
              </label>
              <input id="address" name="address" className={INPUT} />
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
              Ekle
            </button>
          </form>
        </div>

        <div className={CARD}>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Ad</th>
                <th className="pb-3 font-medium">Vergi no</th>
                <th className="pb-3 font-medium">Bakiye</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody>
              {companyDealers.map((dealer) => (
                <tr key={dealer.id} className={TABLE_ROW}>
                  <td className="py-3">
                    <Link
                      href={`/admin/dealers/${dealer.id}`}
                      className="font-medium text-ink-900 hover:text-accent-600"
                    >
                      {dealer.name}
                    </Link>
                  </td>
                  <td className="py-3 text-ink-400">{dealer.taxNo ?? "—"}</td>
                  <td className="py-3 text-ink-400">{dealer.currentBalance}</td>
                  <td className="py-3 text-right">
                    <form action={deleteDealer.bind(null, dealer.id)}>
                      <button type="submit" className={BUTTON_GHOST_DANGER}>
                        Sil
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {companyDealers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-ink-400">
                    Henüz bayi eklenmedi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
