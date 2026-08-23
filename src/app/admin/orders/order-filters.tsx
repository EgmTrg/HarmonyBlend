"use client";

import { usePathname, useRouter } from "next/navigation";
import { INPUT, LABEL } from "@/lib/ui";
import { BrandFilterButtons } from "@/components/brand-filter-buttons";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";

export function OrderFilters({
  companyBrands,
  initialBrand,
  initialStatus,
}: {
  companyBrands: { id: string; name: string }[];
  initialBrand: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function navigate(brand: string, status: string) {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (status) params.set("status", status);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const hasFilters = initialBrand || initialStatus;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className={LABEL}>Marka</span>
        <BrandFilterButtons
          brands={companyBrands}
          selectedId={initialBrand}
          onChange={(brandId) => navigate(brandId, initialStatus)}
        />
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className={LABEL}>
            Durum
          </label>
          <select
            id="status"
            value={initialStatus}
            onChange={(e) => navigate(initialBrand, e.target.value)}
            className={INPUT}
          >
            <option value="">Tümü</option>
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {hasFilters && (
          <button type="button" onClick={() => navigate("", "")} className="text-sm text-accent-600 hover:underline">
            Filtreleri temizle
          </button>
        )}
      </div>
    </div>
  );
}
