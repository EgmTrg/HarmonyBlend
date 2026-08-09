"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../cart-context";
import { createOrder } from "../actions";
import { useToast } from "@/lib/toast";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import type { PaymentMethodCode } from "@/lib/payment-methods";
import { PAYMENT_METHOD_CODES, PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";

export function CheckoutForm({
  brandId,
  currentBalance,
  maxBalanceLimit,
}: {
  brandId: string;
  currentBalance: string;
  maxBalanceLimit: string | null;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const { getBrandCart, clearBrandCart } = useCart();
  const items = getBrandCart(brandId);

  const total = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const cariAvailable =
    maxBalanceLimit === null || Number(currentBalance) + total <= Number(maxBalanceLimit);

  const [paymentCode, setPaymentCode] = useState<PaymentMethodCode>(
    cariAvailable ? "cari" : "cash_on_delivery"
  );
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className={`${CARD} flex flex-col items-center gap-3 text-center`}>
        <p className="text-sm text-ink-400">Sepetiniz boş.</p>
        <Link href="/dealer" className="text-sm font-medium text-accent-600 hover:underline">
          Kataloğa dön
        </Link>
      </div>
    );
  }

  const selectedCode = cariAvailable || paymentCode !== "cari" ? paymentCode : "cash_on_delivery";

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await createOrder(
        brandId,
        selectedCode,
        items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        simulateFailure
      );
      clearBrandCart(brandId);
      showToast({ title: "Sipariş oluşturuldu", variant: "success" });
      router.push(`/dealer/orders/${result.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sipariş oluşturulamadı.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Sepet Özeti</h2>
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center justify-between py-2 text-sm">
              <span className="text-ink-900">
                {item.name} <span className="text-ink-400">× {item.quantity} {item.unit}</span>
              </span>
              <span className="text-ink-600">
                {(Number(item.unitPrice) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-medium text-ink-900">Toplam</span>
          <span className="text-lg font-semibold text-ink-900">{total.toFixed(2)}</span>
        </div>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Ödeme Tipi</h2>
        <div className="flex flex-col gap-2">
          {PAYMENT_METHOD_CODES.map((code) => {
            const disabled = code === "cari" && !cariAvailable;
            return (
              <label
                key={code}
                className={
                  "flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50" +
                  (disabled ? " cursor-not-allowed opacity-50" : "")
                }
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={code}
                  disabled={disabled}
                  checked={selectedCode === code}
                  onChange={() => setPaymentCode(code)}
                />
                <span className="text-ink-900">{PAYMENT_METHOD_LABELS[code]}</span>
              </label>
            );
          })}
        </div>
        {!cariAvailable && (
          <p className="mt-3 text-xs text-ink-400">
            Bakiye limitiniz bu sipariş ile aşılacağı için cari ile ödeme kapalı — nakit/kapıda
            ödeme veya sanal POS kullanabilirsiniz.
          </p>
        )}
      </div>

      {selectedCode === "virtual_pos" && (
        <div className={CARD}>
          <h2 className="mb-3 text-sm font-semibold text-ink-900">Mock Sanal POS</h2>
          <p className="mb-3 text-xs text-ink-400">
            Bu bir test/mock ödeme sağlayıcısıdır — gerçek kart bilgisi işlenmez.
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Kart numarası</span>
              <input placeholder="4242 4242 4242 4242" disabled className={`${INPUT} opacity-60`} />
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
              />
              Ödemeyi başarısız olarak simüle et (test amaçlı)
            </label>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`self-start ${BUTTON_PRIMARY} disabled:opacity-50`}
      >
        {submitting
          ? "İşleniyor..."
          : selectedCode === "virtual_pos"
            ? "Ödemeyi Tamamla"
            : "Siparişi Oluştur"}
      </button>
    </div>
  );
}
