"use client";

interface BrandOption {
  id: string;
  name: string;
}

export function BrandFilterButtons({
  brands,
  selectedId,
  onChange,
}: {
  brands: BrandOption[];
  selectedId: string;
  onChange: (brandId: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => onChange("")} className={pillClass(selectedId === "")}>
        Tümü
      </button>
      {brands.map((brand) => (
        <button
          key={brand.id}
          type="button"
          onClick={() => onChange(selectedId === brand.id ? "" : brand.id)}
          className={pillClass(selectedId === brand.id)}
        >
          {brand.name}
        </button>
      ))}
    </div>
  );
}

function pillClass(active: boolean) {
  return `rounded-full border px-3 py-1.5 text-sm font-medium transition ${
    active
      ? "border-accent-600 bg-accent-600 text-white"
      : "border-border bg-card text-ink-600 hover:bg-content"
  }`;
}
