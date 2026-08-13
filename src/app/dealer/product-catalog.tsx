"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/lib/toast";
import { BUTTON_GHOST, BUTTON_PRIMARY, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { buildCategoryTree, categoryHasItems, type CategoryLike, type CategoryNode } from "@/lib/category-tree";

interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
  vatRate: string;
  categoryId: string | null;
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
    addItem(
      brandId,
      {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        unit: product.unit,
        unitPrice: product.unitPrice,
        vatRate: product.vatRate,
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
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            min={0}
            step={1}
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

function CategoryGroup({
  node,
  depth,
  brandId,
  productsByCategory,
  resetSignal,
}: {
  node: CategoryNode;
  depth: number;
  brandId: string;
  productsByCategory: Map<string, CatalogProduct[]>;
  resetSignal: number;
}) {
  if (!categoryHasItems(node, productsByCategory)) return null;

  const ownProducts = productsByCategory.get(node.id) ?? [];

  return (
    <div className={depth > 0 ? "flex flex-col gap-3 border-l-2 border-border pl-4" : "flex flex-col gap-3"}>
      <h3 className={depth === 0 ? "text-lg font-semibold text-ink-900" : "text-base font-medium text-ink-600"}>
        {node.name}
      </h3>
      {ownProducts.length > 0 && (
        <ProductTable brandId={brandId} products={ownProducts} resetSignal={resetSignal} />
      )}
      {node.children.map((child) => (
        <CategoryGroup
          key={child.id}
          node={child}
          depth={depth + 1}
          brandId={brandId}
          productsByCategory={productsByCategory}
          resetSignal={resetSignal}
        />
      ))}
    </div>
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

  const productsByCategory = new Map<string, CatalogProduct[]>();
  const uncategorized: CatalogProduct[] = [];
  for (const product of products) {
    if (product.categoryId) {
      const list = productsByCategory.get(product.categoryId) ?? [];
      list.push(product);
      productsByCategory.set(product.categoryId, list);
    } else {
      uncategorized.push(product);
    }
  }

  const tree = buildCategoryTree(categories);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button type="button" onClick={() => setResetSignal((s) => s + 1)} className={BUTTON_GHOST}>
          Tüm miktarları temizle
        </button>
      </div>
      {tree.map((node) => (
        <CategoryGroup
          key={node.id}
          node={node}
          depth={0}
          brandId={brandId}
          productsByCategory={productsByCategory}
          resetSignal={resetSignal}
        />
      ))}
      {uncategorized.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-ink-900">Diğer</h3>
          <ProductTable brandId={brandId} products={uncategorized} resetSignal={resetSignal} />
        </div>
      )}
    </div>
  );
}
