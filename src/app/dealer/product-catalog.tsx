"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/lib/toast";
import { BUTTON_PRIMARY, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";

interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
}

function ProductRow({ brandId, product }: { brandId: string; product: CatalogProduct }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(
      brandId,
      { productId: product.id, name: product.name, sku: product.sku, unit: product.unit, unitPrice: product.unitPrice },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    showToast({ title: `${product.name} sepete eklendi (${quantity} ${product.unit})`, variant: "success" });
  }

  return (
    <tr className={TABLE_ROW}>
      <td className="py-3 font-medium text-ink-900">{product.name}</td>
      <td className="py-3 text-ink-400">{product.sku}</td>
      <td className="py-3 text-ink-400">{product.unit}</td>
      <td className="py-3 text-ink-600">{product.unitPrice}</td>
      <td className="py-3">
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            min={1}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
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
      </td>
    </tr>
  );
}

export function ProductCatalog({
  brandId,
  products,
}: {
  brandId: string;
  products: CatalogProduct[];
}) {
  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ink-400">
        Bu markada henüz satışa açık ürün yok.
      </p>
    );
  }

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
          <ProductRow key={product.id} brandId={brandId} product={product} />
        ))}
      </tbody>
    </table>
  );
}
