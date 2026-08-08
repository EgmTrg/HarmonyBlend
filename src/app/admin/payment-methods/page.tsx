import { Plus } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { paymentMethods } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { PAYMENT_METHOD_CODES, PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { createPaymentMethod, deletePaymentMethod } from "./actions";

export default async function PaymentMethodsPage() {
  const session = await requireAdminSession();

  const companyPaymentMethods = await db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.companyId, session.user.companyId))
    .orderBy(paymentMethods.label);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Ödeme Yöntemleri</h1>
        <p className="text-sm text-ink-400">
          Firma genelinde kullanılabilecek ödeme tiplerini tanımlayın. Her tip yalnızca bir kez
          eklenebilir; bayi/marka bazlı aktivasyon bayi detay sayfasından yapılır.
        </p>
      </div>

      <p className="rounded-xl border border-warning-fg/20 bg-warning-bg px-4 py-3 text-sm text-warning-fg">
        Not: Bu ekran şu an yalnızca ödeme tipi ve etiket tanımlamaya yarıyor — limit, gecikme
        kuralı gibi ek ayarlar (bkz. maksimum bakiye limiti bayi tarafında) bu seviyede henüz
        uygulanmıyor. İhtiyaca göre ileride kaldırılabilir veya genişletilebilir.
      </p>

      <div className={CARD}>
        <form action={createPaymentMethod} className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="code" className={LABEL}>
              Ödeme tipi
            </label>
            <select id="code" name="code" required className={INPUT}>
              {PAYMENT_METHOD_CODES.map((code) => (
                <option key={code} value={code}>
                  {PAYMENT_METHOD_LABELS[code]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="label" className={LABEL}>
              Etiket
            </label>
            <input
              id="label"
              name="label"
              required
              placeholder="Ör. Cari (Açık Hesap)"
              className={INPUT}
            />
          </div>
          <button type="submit" className={BUTTON_PRIMARY}>
            <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
            Ekle
          </button>
        </form>
      </div>

      <div className={`${CARD} p-0`}>
        <ul className="flex flex-col divide-y divide-border">
          {companyPaymentMethods.map((pm) => (
            <li key={pm.id} className="flex items-center justify-between px-6 py-3 text-sm">
              <span className="text-ink-900">
                {pm.label}{" "}
                <span className="text-ink-400">({PAYMENT_METHOD_LABELS[pm.code]})</span>
              </span>
              <form action={deletePaymentMethod.bind(null, pm.id)}>
                <button type="submit" className={BUTTON_GHOST_DANGER}>
                  Sil
                </button>
              </form>
            </li>
          ))}
          {companyPaymentMethods.length === 0 && (
            <li className="px-6 py-10 text-center text-sm text-ink-400">
              Henüz ödeme yöntemi tanımlanmadı.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
