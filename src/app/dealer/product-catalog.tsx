"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/lib/toast";
import { BUTTON_GHOST, BUTTON_PRIMARY, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { CategoryGroupList } from "@/components/category-group-list";
import type { CategoryLike } from "@/lib/category-tree";

interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
  vatRate: string;
  categoryId: string | null;
  orderMultiple: number;
}

function ProductRow({ brandId, product }: { brandId: string; product: CatalogProduct }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(0);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (quantity <= 0) {
      showToast({ title: "Lütfen bir miktar girin", variant: "danger" });
      return;
    }
    if (quantity % product.orderMultiple !== 0) {
      showToast({
        title: `${product.name} yalnızca ${product.orderMultiple} ve katları şeklinde sipariş edilebilir`,
        variant: "danger",
      });
      return;
    }
    addItem(
      brandId,
      {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        unit: product.unit,
        unitPrice: product.unitPrice,
        vatRate: product.vatRate,
        categoryId: product.categoryId,
        orderMultiple: product.orderMultiple,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    showToast({ title: `${product.name} sepete eklendi (${quantity} ${product.unit})`, variant: "success" });
  }

  return (
    <tr className={TABLE_ROW}>
      <td className="py-3 text-xs font-medium text-ink-900">{product.name}</td>
      <td className="py-3 text-ink-400">{product.sku}</td>
      <td className="py-3 text-ink-400">{product.unit}</td>
      <td className="py-3 text-ink-600">{product.unitPrice}</td>
      <td className="py-3">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center justify-end gap-2">
            <input
              type="number"
              min={0}
              step={product.orderMultiple}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, Number(e.target.value) || 0))}
              className="w-16 rounded-lg border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
            />
            <button
              onClick={handleAdd}
              className={`${BUTTON_PRIMARY} px-3 py-1.5 text-xs`}
              type="button"
            >
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
              {added ? "Eklendi" : "Ekle"}
            </button>
          </div>
          {product.orderMultiple > 1 && (
            <span className="text-[11px] text-ink-400">{product.orderMultiple}'in katları</span>
          )}
        </div>
      </td>
    </tr>
  );
}

function ProductTable({
  brandId,
  products,
  resetSignal,
}: {
  brandId: string;
  products: CatalogProduct[];
  resetSignal: number;
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className={TABLE_HEAD}>
          <th className="pb-3 font-medium">Ürün</th>
          <th className="pb-3 font-medium">SKU</th>
          <th className="pb-3 font-medium">Birim</th>
          <th className="pb-3 font-medium">Birim fiyat</th>
          <th className="pb-3" />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          // key'e resetSignal eklenmesi, "Tüm miktarları temizle" tıklandığında
          // ProductRow'u tamamen yeniden mount ederek quantity/added state'ini
          // sıfırlıyor — ayrı bir imperative reset mekanizması gerekmeden.
          <ProductRow key={`${product.id}-${resetSignal}`} brandId={brandId} product={product} />
        ))}
      </tbody>
    </table>
  );
}

export function ProductCatalog({
  brandId,
  products,
  categories,
}: {
  brandId: string;
  products: CatalogProduct[];
  categories: CategoryLike[];
}) {
  const [resetSignal, setResetSignal] = useState(0);

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ink-400">
        Bu markada henüz satışa açık ürün yok.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button type="button" onClick={() => setResetSignal((s) => s + 1)} className={BUTTON_GHOST}>
          Tüm miktarları temizle
        </button>
      </div>
      <CategoryGroupList
        items={products}
        categories={categories}
        renderItems={(items) => <ProductTable brandId={brandId} products={items} resetSignal={resetSignal} />}
      />
    </div>
  );
}
