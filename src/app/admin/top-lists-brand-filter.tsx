"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BrandFilterButtons } from "@/components/brand-filter-buttons";

export function TopListsBrandFilter({
  brands,
  selectedId,
}: {
  brands: { id: string; name: string }[];
  selectedId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(brandId: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (brandId) params.set("productBrand", brandId);
    else params.delete("productBrand");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return <BrandFilterButtons brands={brands} selectedId={selectedId} onChange={onChange} />;
}
