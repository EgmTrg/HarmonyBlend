import Image from "next/image";

// HarmonyBlend kanatlı merkez amblemi (kaynak: docs/logo/logo-2-kanatli-merkez-icon.svg)
export function BrandMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return <Image src="/brand/hb-mark.svg" alt="" width={size} height={size} className={"shrink-0 " + className} priority />;
}
