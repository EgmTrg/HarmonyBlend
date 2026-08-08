"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../cart-context";
import { createOrder } from "../actions";
import { useToast } from "@/lib/toast";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import type { PaymentMethodCode } from "@/lib/payment-methods";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";

interface CheckoutPaymentMethod {
  id: string;
  code: PaymentMethodCode;
  label: string;
}

export function CheckoutForm({
  brandId,
  paymentMethods,
}: {
  brandId: string;
  paymentMethods: CheckoutPaymentMethod[];
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const { getBrandCart, clearBrandCart } = useCart();
  const items = getBrandCart(brandId);

  const [paymentMethodId, setPaymentMethodId] = useState(paymentMethods[0]?.id ?? "");
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

  if (paymentMethods.length === 0) {
    return (
      <div className={`${CARD} text-center text-sm text-ink-400`}>
        Bu marka için sizin adınıza etkinleştirilmiş bir ödeme yöntemi yok. Lütfen
        yöneticinizle iletişime geçin.
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const selectedCode = paymentMethods.find((pm) => pm.id === paymentMethodId)?.code;

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await createOrder(
        brandId,
        paymentMethodId,
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
          {paymentMethods.map((pm) => (
            <label
              key={pm.id}
              className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={pm.id}
                checked={paymentMethodId === pm.id}
                onChange={() => setPaymentMethodId(pm.id)}
              />
              <span className="text-ink-900">{pm.label}</span>
              <span className="text-xs text-ink-400">({PAYMENT_METHOD_LABELS[pm.code]})</span>
            </label>
          ))}
        </div>
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
