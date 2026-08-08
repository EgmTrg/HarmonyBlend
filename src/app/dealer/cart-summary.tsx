"use client";

import Link from "next/link";
import { useCart } from "./cart-context";
import { BUTTON_GHOST_DANGER, BUTTON_PRIMARY } from "@/lib/ui";

export function CartSummary({ brandId }: { brandId: string }) {
  const { getBrandCart, setQuantity, removeItem } = useCart();
  const items = getBrandCart(brandId);

  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-ink-400">
        Sepetiniz boş. Yukarıdan ürün ekleyin.
      </p>
    );
  }

  const total = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col divide-y divide-border rounded-xl border border-border">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium text-ink-900">{item.name}</p>
              <p className="text-xs text-ink-400">
                {item.unitPrice} × {item.quantity} {item.unit}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                step={1}
                value={item.quantity}
                onChange={(e) =>
                  setQuantity(brandId, item.productId, Math.max(1, Number(e.target.value) || 1))
                }
                className="w-16 rounded-lg border border-border bg-card px-2 py-1 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              />
              <button
                type="button"
                onClick={() => removeItem(brandId, item.productId)}
                className={BUTTON_GHOST_DANGER}
              >
                Kaldır
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-600">
          Toplam: <span className="font-semibold text-ink-900">{total.toFixed(2)}</span>
        </p>
        <Link href={`/dealer/checkout?brand=${brandId}`} className={BUTTON_PRIMARY}>
          Ödemeye Geç
        </Link>
      </div>
    </div>
  );
}
