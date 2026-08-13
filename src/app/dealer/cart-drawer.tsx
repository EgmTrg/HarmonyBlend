"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart, type CartItem } from "./cart-context";
import { calculateCartTotals } from "@/lib/cart-totals";
import { BUTTON_GHOST_DANGER, BUTTON_PRIMARY } from "@/lib/ui";
import { CategoryGroupList } from "@/components/category-group-list";
import type { CategoryLike } from "@/lib/category-tree";

interface DrawerBrand {
  id: string;
  name: string;
}

function CartItemList({
  brandId,
  items,
}: {
  brandId: string;
  items: CartItem[];
}) {
  const { setQuantity, removeItem } = useCart();

  return (
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
  );
}

export function CartDrawer({
  brands,
  categoriesByBrand,
}: {
  brands: DrawerBrand[];
  categoriesByBrand: Record<string, CategoryLike[]>;
}) {
  const { carts, isDrawerOpen, closeDrawer } = useCart();

  const brandsWithItems = brands.filter((brand) => (carts[brand.id] ?? []).length > 0);

  return (
    <div
      className={
        "fixed inset-0 z-50 bg-black/40 transition-opacity " +
        (isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0")
      }
      onClick={closeDrawer}
      aria-hidden={!isDrawerOpen}
    >
      <div
        className={
          "ml-auto flex h-full w-full max-w-md flex-col overflow-hidden bg-card shadow-xl transition-transform " +
          (isDrawerOpen ? "translate-x-0" : "translate-x-full")
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-ink-900">Sepetim</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Kapat"
            className="text-ink-400 hover:text-ink-900"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-5">
          {brandsWithItems.length === 0 && (
            <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-ink-400">
              Sepetiniz boş. Kataloğdan ürün ekleyin.
            </p>
          )}

          {brandsWithItems.map((brand) => {
            const items = carts[brand.id] ?? [];
            const totals = calculateCartTotals(items);

            return (
              <div key={brand.id} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-ink-900">{brand.name}</h3>
                <CategoryGroupList
                  items={items}
                  categories={categoriesByBrand[brand.id] ?? []}
                  headingSize="compact"
                  renderItems={(catItems) => <CartItemList brandId={brand.id} items={catItems} />}
                />
                <div className="flex flex-col gap-1 rounded-xl border border-border px-4 py-3 text-sm">
                  <div className="flex items-center justify-between text-ink-600">
                    <span>Ara Toplam</span>
                    <span>{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-ink-600">
                    <span>KDV</span>
                    <span>{totals.vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-1 font-semibold text-ink-900">
                    <span>Genel Toplam</span>
                    <span>{totals.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href={`/dealer/checkout?brand=${brand.id}`}
                  onClick={closeDrawer}
                  className={`self-end ${BUTTON_PRIMARY}`}
                >
                  Ödemeye Geç
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
