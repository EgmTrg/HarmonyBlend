"use client";

import { usePathname, useRouter } from "next/navigation";
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
          router.push(level ? `${pathname}?level=${level}` : pathname, { scroll: false });
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
