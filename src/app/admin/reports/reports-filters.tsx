"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BrandFilterButtons } from "@/components/brand-filter-buttons";
import { INACTIVE_THRESHOLD_OPTIONS } from "@/lib/inactive-threshold";

export function SalesBrandFilter({ brands, selectedId }: { brands: { id: string; name: string }[]; selectedId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(brandId: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (brandId) params.set("brand", brandId);
    else params.delete("brand");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return <BrandFilterButtons brands={brands} selectedId={selectedId} onChange={onChange} />;
}

export function InactiveThresholdFilter({ selected }: { selected: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function select(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("threshold", key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {INACTIVE_THRESHOLD_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => select(option.key)}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            selected === option.key
              ? "border-accent-600 bg-accent-600 text-white"
              : "border-border bg-card text-ink-600 hover:bg-content"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
