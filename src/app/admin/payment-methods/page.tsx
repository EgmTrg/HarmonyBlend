import { eq } from "drizzle-orm";
import { db } from "@/db";
import { paymentMethods } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { PAYMENT_METHOD_CODES, PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { createPaymentMethod, deletePaymentMethod } from "./actions";

export default async function PaymentMethodsPage() {
  const session = await requireAdminSession();

  const companyPaymentMethods = await db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.companyId, session.user.companyId))
    .orderBy(paymentMethods.label);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Ödeme Yöntemleri</h1>
        <p className="text-sm text-neutral-600">
          Firma genelinde kullanılabilecek ödeme tiplerini tanımlayın. Her tip yalnızca bir kez
          eklenebilir; bayi/marka bazlı aktivasyon bayi detay sayfasından yapılır.
        </p>
      </div>

      <form action={createPaymentMethod} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="code" className="text-xs text-neutral-500">
            Ödeme tipi
          </label>
          <select
            id="code"
            name="code"
            required
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          >
            {PAYMENT_METHOD_CODES.map((code) => (
              <option key={code} value={code}>
                {PAYMENT_METHOD_LABELS[code]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="label" className="text-xs text-neutral-500">
            Etiket
          </label>
          <input
            id="label"
            name="label"
            required
            placeholder="Ör. Cari (Açık Hesap)"
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

      <ul className="flex flex-col divide-y divide-neutral-100 rounded border border-neutral-200">
        {companyPaymentMethods.map((pm) => (
          <li key={pm.id} className="flex items-center justify-between px-3 py-2 text-sm">
            <span>
              {pm.label} <span className="text-neutral-400">({PAYMENT_METHOD_LABELS[pm.code]})</span>
            </span>
            <form action={deletePaymentMethod.bind(null, pm.id)}>
              <button type="submit" className="text-xs text-red-600 hover:underline">
                Sil
              </button>
            </form>
          </li>
        ))}
        {companyPaymentMethods.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-neutral-400">
            Henüz ödeme yöntemi tanımlanmadı.
          </li>
        )}
      </ul>
    </div>
  );
}
