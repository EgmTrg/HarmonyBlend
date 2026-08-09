"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { INPUT, LABEL } from "@/lib/ui";

interface Filters {
  ad: string;
  il: string;
  bolge: string;
}

const DEBOUNCE_MS = 300;

export function DealerFilterForm({ initialAd, initialIl, initialBolge }: {
  initialAd: string;
  initialIl: string;
  initialBolge: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<Filters>({
    ad: initialAd,
    il: initialIl,
    bolge: initialBolge,
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function applyFilters(next: Filters) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const params = new URLSearchParams();
    if (next.ad) params.set("ad", next.ad);
    if (next.il) params.set("il", next.il);
    if (next.bolge) params.set("bolge", next.bolge);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleChange(field: keyof Filters, value: string) {
    const next = { ...filters, [field]: value };
    setFilters(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => applyFilters(next), DEBOUNCE_MS);
  }

  const hasFilters = filters.ad || filters.il || filters.bolge;

  function clearFilters() {
    const empty = { ad: "", il: "", bolge: "" };
    setFilters(empty);
    applyFilters(empty);
  }

  return (
    <form
      className="flex flex-wrap items-end gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters(filters);
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="ad" className={LABEL}>
          Ad
        </label>
        <input
          id="ad"
          value={filters.ad}
          onChange={(e) => handleChange("ad", e.target.value)}
          className={INPUT}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="il" className={LABEL}>
          İl
        </label>
        <input
          id="il"
          value={filters.il}
          onChange={(e) => handleChange("il", e.target.value)}
          className={INPUT}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="bolge" className={LABEL}>
          Bölge
        </label>
        <input
          id="bolge"
          value={filters.bolge}
          onChange={(e) => handleChange("bolge", e.target.value)}
          className={INPUT}
        />
      </div>
      <button
        type="submit"
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-600 hover:bg-content"
      >
        Filtrele
      </button>
      {hasFilters && (
        <button type="button" onClick={clearFilters} className="text-sm text-accent-600 hover:underline">
          Filtreleri temizle
        </button>
      )}
    </form>
  );
}
