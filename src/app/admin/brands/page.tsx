import Link from "next/link";
import { Plus } from "lucide-react";
import { and, eq, ilike, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealers, users } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { BUTTON_GHOST, BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { ToastForm } from "@/components/toast-form";
import { createBrand, deleteBrand } from "./actions";
import { deleteDealer, impersonateDealerUser } from "../dealers/actions";
import { AddDealerOrUserModal, EditDealerModal } from "../dealers/add-user-modal";
import { DealerFilterForm } from "../dealers/dealer-filter-form";

export default async function BrandsAndDealersPage({
  searchParams,
}: {
  searchParams: Promise<{ ad?: string; il?: string; bolge?: string }>;
}) {
  const session = await requireAdminSession();
  const { ad: adFilter, il: ilFilter, bolge: bolgeFilter } = await searchParams;

  const dealerConditions = [eq(dealers.companyId, session.user.companyId)];
  if (adFilter) dealerConditions.push(ilike(dealers.name, `%${adFilter}%`));
  if (ilFilter) dealerConditions.push(ilike(dealers.il, `%${ilFilter}%`));
  if (bolgeFilter) dealerConditions.push(ilike(dealers.bolge, `%${bolgeFilter}%`));

  const [companyBrands, companyDealers] = await Promise.all([
    db
      .select()
      .from(brands)
      .where(eq(brands.companyId, session.user.companyId))
      .orderBy(brands.name),
    db
      .select()
      .from(dealers)
      .where(and(...dealerConditions))
      .orderBy(dealers.name),
  ]);

  const dealerIds = companyDealers.map((dealer) => dealer.id);
  const [dealerBrandRows, dealerUserRows] = await Promise.all([
    dealerIds.length > 0
      ? db.select().from(dealerBrands).where(inArray(dealerBrands.dealerId, dealerIds))
      : Promise.resolve([]),
    dealerIds.length > 0
      ? db
          .select({ id: users.id, dealerId: users.dealerId, email: users.email, isActive: users.isActive })
          .from(users)
          .where(and(eq(users.role, "dealer_user"), inArray(users.dealerId, dealerIds)))
      : Promise.resolve([]),
  ]);
  const assignedBrandIdsByDealer = new Map<string, string[]>();
  for (const row of dealerBrandRows) {
    const list = assignedBrandIdsByDealer.get(row.dealerId) ?? [];
    list.push(row.brandId);
    assignedBrandIdsByDealer.set(row.dealerId, list);
  }
  const primaryUserByDealer = new Map<string, { id: string; email: string }>();
  for (const row of dealerUserRows) {
    if (!row.dealerId || !row.isActive || primaryUserByDealer.has(row.dealerId)) continue;
    primaryUserByDealer.set(row.dealerId, { id: row.id, email: row.email });
  }

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-ink-900">Bayiler</h1>
            <p className="text-sm text-ink-400">
              Bayileri tanımlayın ve hangi markalara erişebileceklerini atayın.
            </p>
          </div>
          <AddDealerOrUserModal companyBrands={companyBrands} />
        </div>

        <div className={CARD}>
          <DealerFilterForm
            initialAd={adFilter ?? ""}
            initialIl={ilFilter ?? ""}
            initialBolge={bolgeFilter ?? ""}
          />
        </div>

        <div className={CARD}>
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-3 font-medium">Ad</th>
                <th className="pb-3 font-medium">İl</th>
                <th className="pb-3 font-medium">Bölge</th>
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
                  <td className="py-3 text-ink-400">{dealer.il ?? "—"}</td>
                  <td className="py-3 text-ink-400">{dealer.bolge ?? "—"}</td>
                  <td className="py-3 text-ink-400">{dealer.currentBalance}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-4">
                      {primaryUserByDealer.has(dealer.id) ? (
                        <form action={impersonateDealerUser.bind(null, primaryUserByDealer.get(dealer.id)!.id)}>
                          <button
                            type="submit"
                            title={`${primaryUserByDealer.get(dealer.id)!.email} olarak giriş yap`}
                            className={BUTTON_GHOST}
                          >
                            Kullanıcı ile giriş yap
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-ink-300" title="Bu bayi için kullanıcı hesabı yok">
                          Kullanıcı yok
                        </span>
                      )}
                      <EditDealerModal
                        dealer={dealer}
                        companyBrands={companyBrands}
                        assignedBrandIds={assignedBrandIdsByDealer.get(dealer.id) ?? []}
                      />
                      <ToastForm action={deleteDealer.bind(null, dealer.id)} successMessage="Bayi silindi">
                        <button type="submit" className={BUTTON_GHOST_DANGER}>
                          Sil
                        </button>
                      </ToastForm>
                    </div>
                  </td>
                </tr>
              ))}
              {companyDealers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-ink-400">
                    Henüz bayi eklenmedi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-ink-900">Markalar</h2>
          <p className="text-sm text-ink-400">Firmaya bağlı alt markaları yönetin.</p>
        </div>

        <div className={CARD}>
          <ToastForm action={createBrand} successMessage="Marka eklendi" className="flex flex-wrap items-end gap-3">
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
          </ToastForm>
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
                    <ToastForm action={deleteBrand.bind(null, brand.id)} successMessage="Marka silindi">
                      <button type="submit" className={BUTTON_GHOST_DANGER}>
                        Sil
                      </button>
                    </ToastForm>
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
    </div>
  );
}
