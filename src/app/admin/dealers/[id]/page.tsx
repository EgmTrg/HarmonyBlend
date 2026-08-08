import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealerPaymentMethods, dealers, paymentMethods } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import {
  assignDealerBrand,
  deleteDealer,
  disableDealerPaymentMethod,
  enableDealerPaymentMethod,
  unassignDealerBrand,
  updateDealer,
} from "../actions";

export default async function DealerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireAdminSession();

  const [dealer] = await db
    .select()
    .from(dealers)
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)))
    .limit(1);

  if (!dealer) notFound();

  const [companyBrands, assignedRows, companyPaymentMethods, dealerPaymentMethodRows] =
    await Promise.all([
      db
        .select()
        .from(brands)
        .where(eq(brands.companyId, session.user.companyId))
        .orderBy(brands.name),
      db.select().from(dealerBrands).where(eq(dealerBrands.dealerId, dealer.id)),
      db
        .select()
        .from(paymentMethods)
        .where(eq(paymentMethods.companyId, session.user.companyId))
        .orderBy(paymentMethods.label),
      db.select().from(dealerPaymentMethods).where(eq(dealerPaymentMethods.dealerId, dealer.id)),
    ]);

  const assignedBrandIds = new Set(assignedRows.map((row) => row.brandId));
  const enabledPaymentMethodKey = (brandId: string, paymentMethodId: string) =>
    `${brandId}:${paymentMethodId}`;
  const enabledPaymentMethodKeys = new Set(
    dealerPaymentMethodRows.map((row) => enabledPaymentMethodKey(row.brandId, row.paymentMethodId))
  );
  const assignedBrands = companyBrands.filter((brand) => assignedBrandIds.has(brand.id));

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Bayi düzenle</h1>

        <form action={updateDealer.bind(null, dealer.id)} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs text-neutral-500">Bayi adı</span>
            <input
              name="name"
              defaultValue={dealer.name}
              required
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs text-neutral-500">Vergi no</span>
            <input
              name="taxNo"
              defaultValue={dealer.taxNo ?? ""}
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs text-neutral-500">Adres</span>
            <input
              name="address"
              defaultValue={dealer.address ?? ""}
              className="rounded border border-neutral-300 px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="self-start rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
          >
            Kaydet
          </button>
        </form>

        <form action={deleteDealer.bind(null, dealer.id)}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Bayiyi sil
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Marka ataması</h2>
        <p className="text-sm text-neutral-600">
          Bu bayinin erişebileceği markaları seçin. Yalnızca atanmış markaların kataloğu bayi
          panelinde görünür.
        </p>
        <ul className="flex flex-col divide-y divide-neutral-100 rounded border border-neutral-200">
          {companyBrands.map((brand) => {
            const isAssigned = assignedBrandIds.has(brand.id);
            return (
              <li key={brand.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span>{brand.name}</span>
                {isAssigned ? (
                  <form action={unassignDealerBrand.bind(null, dealer.id, brand.id)}>
                    <button type="submit" className="text-xs text-red-600 hover:underline">
                      Kaldır
                    </button>
                  </form>
                ) : (
                  <form action={assignDealerBrand.bind(null, dealer.id, brand.id)}>
                    <button type="submit" className="text-xs text-neutral-900 hover:underline">
                      Bağla
                    </button>
                  </form>
                )}
              </li>
            );
          })}
          {companyBrands.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-neutral-400">
              Önce bir marka oluşturun.
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Ödeme yöntemi aktivasyonu</h2>
        <p className="text-sm text-neutral-600">
          Atanmış her marka için bu bayinin kullanabileceği ödeme tiplerini seçin.
        </p>
        {assignedBrands.length === 0 && (
          <p className="rounded border border-neutral-200 px-3 py-6 text-center text-sm text-neutral-400">
            Önce bu bayiye en az bir marka atayın.
          </p>
        )}
        {companyPaymentMethods.length === 0 && assignedBrands.length > 0 && (
          <p className="rounded border border-neutral-200 px-3 py-6 text-center text-sm text-neutral-400">
            Henüz ödeme yöntemi tanımlanmadı.
          </p>
        )}
        {assignedBrands.map((brand) => (
          <div key={brand.id} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-neutral-700">{brand.name}</h3>
            <ul className="flex flex-col divide-y divide-neutral-100 rounded border border-neutral-200">
              {companyPaymentMethods.map((pm) => {
                const isEnabled = enabledPaymentMethodKeys.has(
                  enabledPaymentMethodKey(brand.id, pm.id)
                );
                return (
                  <li
                    key={pm.id}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <span>{pm.label}</span>
                    {isEnabled ? (
                      <form
                        action={disableDealerPaymentMethod.bind(null, dealer.id, brand.id, pm.id)}
                      >
                        <button type="submit" className="text-xs text-red-600 hover:underline">
                          Devre dışı bırak
                        </button>
                      </form>
                    ) : (
                      <form
                        action={enableDealerPaymentMethod.bind(null, dealer.id, brand.id, pm.id)}
                      >
                        <button
                          type="submit"
                          className="text-xs text-neutral-900 hover:underline"
                        >
                          Etkinleştir
                        </button>
                      </form>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
