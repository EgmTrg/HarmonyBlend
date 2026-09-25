import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealers, users } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { formatCurrency } from "@/lib/format";
import { BUTTON_GHOST, BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { CurrencyInput } from "@/components/currency-input";
import { ToastForm } from "@/components/toast-form";
import {
  assignDealerBrand,
  createDealerUser,
  deleteDealer,
  deleteDealerUser,
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

  const [companyBrands, assignedRows, dealerUsers] = await Promise.all([
    db
      .select()
      .from(brands)
      .where(eq(brands.companyId, session.user.companyId))
      .orderBy(brands.name),
    db.select().from(dealerBrands).where(eq(dealerBrands.dealerId, dealer.id)),
    db.select().from(users).where(eq(users.dealerId, dealer.id)).orderBy(users.email),
  ]);

  const assignedBrandIds = new Set(assignedRows.map((row) => row.brandId));

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-ink-900">Bayi düzenle</h1>

        <div className={CARD}>
          <ToastForm
            action={updateDealer.bind(null, dealer.id)}
            successMessage="Bayi güncellendi"
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Bayi adı</span>
              <input name="name" defaultValue={dealer.name} required className={INPUT} />
            </label>
            <label className="flex flex-col gap-1">
              <span className={LABEL}>VKN</span>
              <input name="taxNo" defaultValue={dealer.taxNo ?? ""} className={INPUT} />
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className={LABEL}>İl</span>
                <input name="il" defaultValue={dealer.il ?? ""} className={INPUT} />
              </label>
              <label className="flex flex-col gap-1">
                <span className={LABEL}>Bölge</span>
                <input name="bolge" defaultValue={dealer.bolge ?? ""} className={INPUT} />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Maksimum bakiye limiti</span>
              <CurrencyInput
                name="maxBalanceLimit"
                defaultValue={dealer.maxBalanceLimit}
                placeholder="Boş bırakılırsa limitsiz"
              />
              <span className="text-xs text-ink-400">
                Bu tutar aşılırsa cari ile ödeme kapanır, bayi nakit/kapıda ödeme kullanmak
                zorunda kalır.
              </span>
            </label>
            <button type="submit" className={`self-start ${BUTTON_PRIMARY}`}>
              Kaydet
            </button>
          </ToastForm>
        </div>

        <ToastForm action={deleteDealer.bind(null, dealer.id)} successMessage="Bayi silindi">
          <button type="submit" className={BUTTON_GHOST_DANGER}>
            Bayiyi sil
          </button>
        </ToastForm>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink-900">Cari Hesap</h2>
        <div className={`${CARD} flex items-center justify-between`}>
          <div>
            <p className="text-xs font-medium text-ink-400">Güncel Bakiye</p>
            <p
              className={`text-xl font-semibold ${
                Number(dealer.currentBalance) > 0 ? "text-warning-fg" : "text-success-fg"
              }`}
            >
              {formatCurrency(Number(dealer.currentBalance))}
            </p>
          </div>
          <Link
            href={`/admin/dealers/${dealer.id}/ledger`}
            className="text-sm font-medium text-accent-600 hover:underline"
          >
            Ekstreyi Görüntüle →
          </Link>
        </div>
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
                    <ToastForm
                      action={unassignDealerBrand.bind(null, dealer.id, brand.id)}
                      successMessage="Marka kaldırıldı"
                    >
                      <button type="submit" className={BUTTON_GHOST_DANGER}>
                        Kaldır
                      </button>
                    </ToastForm>
                  ) : (
                    <ToastForm
                      action={assignDealerBrand.bind(null, dealer.id, brand.id)}
                      successMessage="Marka bağlandı"
                    >
                      <button type="submit" className={BUTTON_GHOST}>
                        Bağla
                      </button>
                    </ToastForm>
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
          <ToastForm
            action={createDealerUser.bind(null, dealer.id)}
            successMessage="Kullanıcı oluşturuldu"
            className="flex flex-wrap items-end gap-3"
            autoComplete="off"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="du-email" className={LABEL}>
                E-posta
              </label>
              <input id="du-email" name="email" type="email" autoComplete="off" required className={INPUT} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="du-password" className={LABEL}>
                Şifre
              </label>
              <input
                id="du-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                className={INPUT}
              />
            </div>
            <button type="submit" className={BUTTON_PRIMARY}>
              Hesap oluştur
            </button>
          </ToastForm>
        </div>
        <div className={`${CARD} p-0`}>
          <ul className="flex flex-col divide-y divide-border">
            {dealerUsers.map((u) => (
              <li key={u.id} className="flex items-center justify-between px-6 py-3 text-sm">
                <span className="text-ink-900">{u.email}</span>
                <ToastForm
                  action={deleteDealerUser.bind(null, u.id, dealer.id)}
                  successMessage="Kullanıcı silindi"
                >
                  <button type="submit" className={BUTTON_GHOST_DANGER}>
                    Sil
                  </button>
                </ToastForm>
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

    </div>
  );
}
