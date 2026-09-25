"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { INPUT, LABEL } from "@/lib/ui";

const LEVELS: { value: string; label: string }[] = [
  { value: "", label: "Tümü" },
  { value: "info", label: "Bilgi" },
  { value: "warn", label: "Uyarı" },
  { value: "error", label: "Hata" },
];

export function LogLevelFilter({ initialLevel }: { initialLevel: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="level" className={LABEL}>
        Seviye
      </label>
      <select
        id="level"
        value={initialLevel}
        onChange={(e) => {
          const level = e.target.value;
          const params = new URLSearchParams(searchParams.toString());
          if (level) params.set("level", level);
          else params.delete("level");
          const query = params.toString();
          router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
        }}
        className={`${INPUT} max-w-xs`}
      >
        {LEVELS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
