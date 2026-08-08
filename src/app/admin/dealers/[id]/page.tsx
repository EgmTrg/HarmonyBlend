import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealerPaymentMethods, dealers, paymentMethods, users } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { BUTTON_GHOST, BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import {
  assignDealerBrand,
  createDealerUser,
  deleteDealer,
  deleteDealerUser,
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

  const [companyBrands, assignedRows, companyPaymentMethods, dealerPaymentMethodRows, dealerUsers] =
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
      db.select().from(users).where(eq(users.dealerId, dealer.id)).orderBy(users.email),
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
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-ink-900">Bayi düzenle</h1>

        <div className={CARD}>
          <form action={updateDealer.bind(null, dealer.id)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Bayi adı</span>
              <input name="name" defaultValue={dealer.name} required className={INPUT} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Vergi no</span>
              <input name="taxNo" defaultValue={dealer.taxNo ?? ""} className={INPUT} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Adres</span>
              <input name="address" defaultValue={dealer.address ?? ""} className={INPUT} />
            </label>
            <button type="submit" className={`self-start ${BUTTON_PRIMARY}`}>
              Kaydet
            </button>
          </form>
        </div>

        <form action={deleteDealer.bind(null, dealer.id)}>
          <button type="submit" className={BUTTON_GHOST_DANGER}>
            Bayiyi sil
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Marka ataması</h2>
          <p className="text-sm text-ink-400">
            Bu bayinin erişebileceği markaları seçin. Yalnızca atanmış markaların kataloğu bayi
            panelinde görünür.
          </p>
        </div>
        <div className={`${CARD} p-0`}>
          <ul className="flex flex-col divide-y divide-border">
            {companyBrands.map((brand) => {
              const isAssigned = assignedBrandIds.has(brand.id);
              return (
                <li key={brand.id} className="flex items-center justify-between px-6 py-3 text-sm">
                  <span className="text-ink-900">{brand.name}</span>
                  {isAssigned ? (
                    <form action={unassignDealerBrand.bind(null, dealer.id, brand.id)}>
                      <button type="submit" className={BUTTON_GHOST_DANGER}>
                        Kaldır
                      </button>
                    </form>
                  ) : (
                    <form action={assignDealerBrand.bind(null, dealer.id, brand.id)}>
                      <button type="submit" className={BUTTON_GHOST}>
                        Bağla
                      </button>
                    </form>
                  )}
                </li>
              );
            })}
            {companyBrands.length === 0 && (
              <li className="px-6 py-10 text-center text-sm text-ink-400">
                Önce bir marka oluşturun.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Kullanıcılar</h2>
          <p className="text-sm text-ink-400">
            Bu bayinin panele giriş yapabileceği kullanıcı hesapları.
          </p>
        </div>
        <div className={CARD}>
          <form action={createDealerUser.bind(null, dealer.id)} className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="du-email" className={LABEL}>
                E-posta
              </label>
              <input id="du-email" name="email" type="email" required className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="du-password" className={LABEL}>
                Şifre
              </label>
              <input
                id="du-password"
                name="password"
                type="password"
                minLength={8}
                required
                className={INPUT}
              />
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              Hesap oluştur
            </button>
          </form>
        </div>
        <div className={`${CARD} p-0`}>
          <ul className="flex flex-col divide-y divide-border">
            {dealerUsers.map((u) => (
              <li key={u.id} className="flex items-center justify-between px-6 py-3 text-sm">
                <span className="text-ink-900">{u.email}</span>
                <form action={deleteDealerUser.bind(null, u.id, dealer.id)}>
                  <button type="submit" className={BUTTON_GHOST_DANGER}>
                    Sil
                  </button>
                </form>
              </li>
            ))}
            {dealerUsers.length === 0 && (
              <li className="px-6 py-10 text-center text-sm text-ink-400">
                Bu bayi için henüz kullanıcı hesabı oluşturulmadı.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink-900">Ödeme yöntemi aktivasyonu</h2>
          <p className="text-sm text-ink-400">
            Atanmış her marka için bu bayinin kullanabileceği ödeme tiplerini seçin.
          </p>
        </div>
        {assignedBrands.length === 0 && (
          <p className={`${CARD} text-center text-sm text-ink-400`}>
            Önce bu bayiye en az bir marka atayın.
          </p>
        )}
        {companyPaymentMethods.length === 0 && assignedBrands.length > 0 && (
          <p className={`${CARD} text-center text-sm text-ink-400`}>
            Henüz ödeme yöntemi tanımlanmadı.
          </p>
        )}
        {assignedBrands.map((brand) => (
          <div key={brand.id} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-ink-600">{brand.name}</h3>
            <div className={`${CARD} p-0`}>
              <ul className="flex flex-col divide-y divide-border">
                {companyPaymentMethods.map((pm) => {
                  const isEnabled = enabledPaymentMethodKeys.has(
                    enabledPaymentMethodKey(brand.id, pm.id)
                  );
                  return (
                    <li
                      key={pm.id}
                      className="flex items-center justify-between px-6 py-3 text-sm"
                    >
                      <span className="text-ink-900">{pm.label}</span>
                      {isEnabled ? (
                        <form
                          action={disableDealerPaymentMethod.bind(
                            null,
                            dealer.id,
                            brand.id,
                            pm.id
                          )}
                        >
                          <button type="submit" className={BUTTON_GHOST_DANGER}>
                            Devre dışı bırak
                          </button>
                        </form>
                      ) : (
                        <form
                          action={enableDealerPaymentMethod.bind(
                            null,
                            dealer.id,
                            brand.id,
                            pm.id
                          )}
                        >
                          <button type="submit" className={BUTTON_GHOST}>
                            Etkinleştir
                          </button>
                        </form>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
