import { ToastForm } from "@/components/toast-form";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { BUTTON_GHOST_DANGER, TABLE_HEAD, TABLE_ROW, badgeClass } from "@/lib/ui";
import { deleteProduct, toggleProductActive } from "./actions";
import { EditProductModal, type EditableProduct } from "./edit-product-modal";

interface CategoryOption {
  id: string;
  name: string;
}

export function ProductTable({
  brandId,
  products,
  categories,
}: {
  brandId: string;
  products: EditableProduct[];
  categories: CategoryOption[];
}) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className={TABLE_HEAD}>
          <th className="pb-3 font-medium">Ad</th>
          <th className="pb-3 font-medium">SKU</th>
          <th className="pb-3 font-medium">Birim fiyat</th>
          <th className="pb-3 font-medium">KDV %</th>
          <th className="pb-3 font-medium">Sipariş Katı</th>
          <th className="pb-3 font-medium">Durum</th>
          <th className="pb-3" />
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className={TABLE_ROW}>
            <td className="py-3 font-medium text-ink-900">{product.name}</td>
            <td className="py-3 text-ink-400">{product.sku}</td>
            <td className="py-3 text-ink-600">
              {product.unit} — {product.unitPrice}
            </td>
            <td className="py-3 text-ink-600">{product.vatRate}</td>
            <td className="py-3 text-ink-600">{product.orderMultiple}</td>
            <td className="py-3">
              <ToastForm
                action={toggleProductActive.bind(null, product.id, brandId, !product.isActive)}
                successMessage={product.isActive ? "Ürün pasif yapıldı" : "Ürün aktif yapıldı"}
              >
                <button type="submit" className={badgeClass(product.isActive ? "success" : "neutral")}>
                  {product.isActive ? "Aktif" : "Pasif"}
                </button>
              </ToastForm>
            </td>
            <td className="py-3 text-right">
              <div className="flex items-center justify-end gap-3">
                <EditProductModal product={product} brandId={brandId} categories={categories} />
                <ConfirmDeleteButton
                  action={deleteProduct.bind(null, product.id, brandId, true)}
                  idleLabel="Zorla sil"
                  confirmLabel="Siparişleriyle birlikte sil?"
                  successMessage="Ürün ve ilişkili siparişler silindi"
                  muted
                />
                <ToastForm
                  action={deleteProduct.bind(null, product.id, brandId, false)}
                  successMessage="Ürün silindi"
                >
                  <button type="submit" className={BUTTON_GHOST_DANGER}>
                    Sil
                  </button>
                </ToastForm>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
