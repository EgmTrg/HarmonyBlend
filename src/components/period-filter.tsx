"use client";

import { useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { INPUT, LABEL } from "@/lib/ui";
import { PERIOD_OPTIONS, type PeriodKey } from "@/lib/date-range";

export function PeriodFilter({
  period,
  start,
  end,
  rightSlot,
}: {
  period: PeriodKey | "";
  start: string;
  end: string;
  rightSlot?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [customStart, setCustomStart] = useState(start);
  const [customEnd, setCustomEnd] = useState(end);

  function selectPreset(key: PeriodKey) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", key);
    params.delete("start");
    params.delete("end");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function applyCustom() {
    if (!customStart) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", "custom");
    params.set("start", customStart);
    if (customEnd) params.set("end", customEnd);
    else params.delete("end");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => selectPreset(opt.key)}
              className={pillClass(period === opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="period-start" className={LABEL}>
            Başlangıç
          </label>
          <input
            id="period-start"
            type="date"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            className={INPUT}
          />
          <label htmlFor="period-end" className={LABEL}>
            Bitiş
          </label>
          <input
            id="period-end"
            type="date"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            className={INPUT}
          />
          <button
            type="button"
            onClick={applyCustom}
            className={pillClass(period === "custom")}
          >
            Uygula
          </button>
        </div>
      </div>
      {rightSlot}
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
