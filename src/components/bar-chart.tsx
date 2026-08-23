"use client";

import { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/format";
import { niceTicks } from "@/lib/chart-ticks";

export interface BarChartDatum {
  label: string;
  value: number;
}

// Server component'ten fonksiyon prop'u geçirilemediği için (client
// boundary), formatlayıcı burada kendi içinde seçiliyor.
const FORMATTERS = {
  number: formatNumber,
  currency: formatCurrency,
};

const CHART_HEIGHT = 160;

// Y ekseni + gridline'lı kolon grafiği. Sütun üstünde kalıcı bir etiket yok —
// değer soldaki eksenden ve gridline'lardan tahmin edilir, imleç sütuna
// gelince tam değer sütunun üstünde beliren küçük bir etikette görünür.
export function BarChart({
  data,
  format = "number",
  color = "bg-accent-600",
}: {
  data: BarChartDatum[];
  format?: keyof typeof FORMATTERS;
  color?: string;
}) {
  const formatValue = FORMATTERS[format];
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-ink-400">Henüz veri yok.</p>;
  }

  const max = Math.max(1, ...data.map((d) => d.value));
  const ticks = niceTicks(max);
  const niceMax = ticks[ticks.length - 1];
  const ticksDesc = [...ticks].reverse();

  return (
    <div className="flex gap-3">
      <div
        className="flex flex-col justify-between text-right text-xs text-ink-400"
        style={{ height: CHART_HEIGHT }}
      >
        {ticksDesc.map((t) => (
          <span key={t}>{formatValue(t)}</span>
        ))}
      </div>
      <div className="flex-1">
        <div className="relative" style={{ height: CHART_HEIGHT }}>
          {ticksDesc.map((t) => (
            <div
              key={t}
              className="absolute left-0 right-0 border-t border-border"
              style={{ top: `${(1 - t / niceMax) * 100}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-end gap-3">
            {data.map((d, i) => {
              const heightPct = d.value === 0 ? 0 : Math.max(1, (d.value / niceMax) * 100);
              const isHovered = hovered === i;
              return (
                <div
                  key={d.label}
                  className="flex h-full flex-1 items-end justify-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                >
                  <div
                    className={`relative w-6 rounded-t-[4px] transition-opacity ${color} ${
                      isHovered ? "opacity-100" : "opacity-90"
                    }`}
                    style={{ height: `${heightPct}%` }}
                  >
                    {isHovered && (
                      <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-medium text-white shadow">
                        {formatValue(d.value)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          {data.map((d) => (
            <span key={d.label} className="flex-1 text-center text-xs text-ink-400">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
