"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ByBrandToggle({ checked }: { checked: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggle() {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) params.delete("byBrand");
    else params.set("byBrand", "1");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600 select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? "bg-accent-600" : "bg-border"}`}
      >
        <span
          className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(16px)" : "translateX(0)" }}
        />
      </button>
      Marka bazlı göster
    </label>
  );
}
