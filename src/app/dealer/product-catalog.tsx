"use client";

import { useCallback, useState } from "react";
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

function ProductRow({
  brandId,
  product,
  quantity,
  onQuantityChange,
}: {
  brandId: string;
  product: CatalogProduct;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}) {
  const { addItem, getBrandCart } = useCart();
  const { showToast } = useToast();
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
    // Sepette zaten varsa miktarları sessizce toplamak yerine eklemeyi tamamen
    // engelliyoruz — kullanıcı "bastım mı basmadım mı" diye tereddüt edip
    // aynı ürünü art arda birden fazla kez eklerse bayi fazla ödeme yapar.
    const alreadyInCart = getBrandCart(brandId).some((item) => item.productId === product.id);
    if (alreadyInCart) {
      showToast({
        title: `${product.name} zaten sepette olduğu için tekrar eklenmedi`,
        variant: "warning",
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
      <td className="py-1.5 text-[13px] font-medium text-ink-900">{product.name}</td>
      <td className="py-1.5 text-ink-400">{product.sku}</td>
      <td className="py-1.5 text-ink-400">{product.unit}</td>
      <td className="py-1.5 text-ink-600">{product.unitPrice}</td>
      <td className="py-1.5">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center justify-end gap-2">
            <input
              type="number"
              min={0}
              step={product.orderMultiple}
              value={quantity}
              onChange={(e) => onQuantityChange(product.id, Math.max(0, Number(e.target.value) || 0))}
              onFocus={(e) => e.target.select()}
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
  quantities,
  onQuantityChange,
}: {
  brandId: string;
  products: CatalogProduct[];
  quantities: Record<string, number>;
  onQuantityChange: (productId: string, quantity: number) => void;
}) {
  return (
    <div className="overflow-x-auto">
    <table className="w-full text-xs sm:text-sm">
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
          <ProductRow
            key={product.id}
            brandId={brandId}
            product={product}
            quantity={quantities[product.id] ?? 0}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </tbody>
    </table>
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
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem, getBrandCart } = useCart();
  const { showToast } = useToast();

  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  }, []);

  function handleClearAll() {
    setQuantities({});
  }

  // Miktar girilmiş, henüz sepete eklenmemiş tüm satırları tek seferde sepete
  // ekler. Sepette zaten olan bir ürün varsa (satırdaki "Ekle" ile daha önce
  // eklenmiş) o ürün atlanır ve hangi ürünlerin eklenmediği toast ile bildirilir
  // — miktarları sessizce sepettekiyle toplamak yerine kullanıcının haberi olsun.
  function handleBulkAdd() {
    const cartProductIds = new Set(getBrandCart(brandId).map((item) => item.productId));

    let addedCount = 0;
    const addedIds: string[] = [];
    const skippedInCart: string[] = [];
    const skippedInvalidMultiple: string[] = [];

    for (const product of products) {
      const quantity = quantities[product.id] ?? 0;
      if (quantity <= 0) continue;
      if (cartProductIds.has(product.id)) {
        skippedInCart.push(product.name);
        continue;
      }
      if (quantity % product.orderMultiple !== 0) {
        skippedInvalidMultiple.push(product.name);
        continue;
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
      addedCount++;
      addedIds.push(product.id);
    }

    if (addedCount === 0 && skippedInCart.length === 0 && skippedInvalidMultiple.length === 0) {
      showToast({ title: "Eklemek için en az bir ürüne miktar girin", variant: "danger" });
      return;
    }

    if (addedIds.length > 0) {
      setQuantities((prev) => {
        const next = { ...prev };
        for (const id of addedIds) delete next[id];
        return next;
      });
      showToast({ title: `${addedCount} ürün sepete eklendi`, variant: "success" });
    }
    if (skippedInCart.length > 0) {
      showToast({
        title: `Zaten sepette olduğu için eklenmedi: ${skippedInCart.join(", ")}`,
        variant: "warning",
      });
    }
    if (skippedInvalidMultiple.length > 0) {
      showToast({
        title: `Sipariş katına uymadığı için eklenmedi: ${skippedInvalidMultiple.join(", ")}`,
        variant: "danger",
      });
    }
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-ink-400">
        Bu markada henüz satışa açık ürün yok.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-3">
        <button type="button" onClick={handleBulkAdd} className={`${BUTTON_PRIMARY} px-3 py-1.5 text-xs`}>
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
          Miktar Girilenleri Ekle
        </button>
        <button type="button" onClick={handleClearAll} className={BUTTON_GHOST}>
          Tüm miktarları temizle
        </button>
      </div>
      <CategoryGroupList
        items={products}
        categories={categories}
        renderItems={(items) => (
          <ProductTable
            brandId={brandId}
            products={items}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
          />
        )}
      />
    </div>
  );
}
