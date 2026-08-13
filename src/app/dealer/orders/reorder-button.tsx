"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useCart } from "../cart-context";
import { useToast } from "@/lib/toast";
import { getReorderItems } from "../actions";
import { BUTTON_GHOST } from "@/lib/ui";

export function ReorderButton({ orderId }: { orderId: string }) {
  const { addItem, openDrawer } = useCart();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleReorder() {
    setLoading(true);
    try {
      const { brandId, items, skippedNames } = await getReorderItems(orderId);

      if (items.length === 0) {
        showToast({
          title: "Bu siparişteki hiçbir ürün artık satışta değil",
          variant: "danger",
        });
        return;
      }

      for (const item of items) {
        addItem(
          brandId,
          {
            productId: item.productId,
            name: item.name,
            sku: item.sku,
            unit: item.unit,
            unitPrice: item.unitPrice,
            vatRate: item.vatRate,
            categoryId: item.categoryId,
            orderMultiple: item.orderMultiple,
          },
          item.quantity
        );
      }

      openDrawer();
      showToast({
        title:
          skippedNames.length > 0
            ? `${items.length} ürün sepete eklendi — ${skippedNames.join(", ")} artık satışta değil`
            : "Sipariş sepete eklendi",
        variant: skippedNames.length > 0 ? "warning" : "success",
      });
    } catch (err) {
      showToast({
        title: err instanceof Error ? err.message : "Tekrar sipariş verilemedi.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleReorder}
      disabled={loading}
      className={`${BUTTON_GHOST} inline-flex items-center gap-1 disabled:opacity-50`}
    >
      <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
      {loading ? "Ekleniyor..." : "Tekrar Sipariş Ver"}
    </button>
  );
}
