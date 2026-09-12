"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateProduct } from "./actions";
import { BUTTON_GHOST, BUTTON_PRIMARY, INPUT, LABEL } from "@/lib/ui";
import { useToast } from "@/lib/toast";

export interface EditableProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
  vatRate: string;
  orderMultiple: number;
  categoryId: string | null;
  isActive: boolean;
}

interface CategoryOption {
  id: string;
  name: string;
}

export function EditProductModal({
  product,
  brandId,
  categories,
}: {
  product: EditableProduct;
  brandId: string;
  categories: CategoryOption[];
}) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setIsOpen(false);
    setError(null);
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSubmitting(true);
    try {
      await updateProduct(product.id, brandId, formData);
      close();
      showToast({ title: "Ürün güncellendi", variant: "success" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`${BUTTON_GHOST} inline-flex items-center gap-1`}
      >
        <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
        Düzenle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-ink-900">Ürünü düzenle</h2>
              <button type="button" onClick={close} aria-label="Kapat" className="text-ink-400 hover:text-ink-900">
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <form action={handleSubmit} className="flex flex-1 flex-col overflow-y-auto" autoComplete="off">
              <div className="flex flex-col gap-4 px-6 py-5">
                <label className="flex flex-col gap-1">
                  <span className={LABEL}>Ürün adı</span>
                  <input name="name" defaultValue={product.name} required className={INPUT} />
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>SKU</span>
                    <input name="sku" defaultValue={product.sku} required className={INPUT} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Birim</span>
                    <input
                      name="unit"
                      defaultValue={product.unit}
                      placeholder="koli / kg / adet"
                      required
                      className={INPUT}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Birim fiyat</span>
                    <input
                      name="unitPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={product.unitPrice}
                      required
                      className={INPUT}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>KDV %</span>
                    <input
                      name="vatRate"
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={product.vatRate}
                      required
                      className={INPUT}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1">
                  <span className={LABEL}>Sipariş Katı</span>
                  <input
                    name="orderMultiple"
                    type="number"
                    step="1"
                    min="1"
                    defaultValue={product.orderMultiple}
                    required
                    className={`w-24 ${INPUT}`}
                  />
                  <span className="text-xs text-ink-400">
                    Bu ürün yalnızca bu sayının katları şeklinde sipariş edilebilir (ör. 5 →
                    5, 10, 15...). Kısıtlama yoksa 1 bırakın.
                  </span>
                </label>
                <label className="flex flex-col gap-1">
                  <span className={LABEL}>Kategori</span>
                  <select name="categoryId" defaultValue={product.categoryId ?? ""} className={INPUT}>
                    <option value="">— Yok —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-ink-600">
                  <input name="isActive" type="checkbox" value="true" defaultChecked={product.isActive} />
                  Ürün aktif (satışa açık)
                </label>
              </div>

              {error && (
                <p className="mx-6 mb-4 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                <button type="button" onClick={close} className="text-sm text-ink-400 hover:text-ink-900">
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`${BUTTON_PRIMARY} disabled:opacity-50`}
                >
                  {submitting ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
