"use client";

import { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/format";
import { niceTicks } from "@/lib/chart-ticks";

export interface GroupedBarSeries {
  id: string;
  name: string;
}

export interface GroupedBarDatum {
  label: string;
  values: Record<string, number>; // seriesId -> value
}

// Sabit sırayla atanan kategorik palet (dataviz skill'inin validate_palette.js
// ile doğrulanmış ilk 4 slotu) — marka rengi hiçbir zaman filtre/sıralamaya
// göre değişmez, her zaman aynı marka aynı renk.
const SERIES_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"];

const FORMATTERS = {
  number: formatNumber,
  currency: formatCurrency,
};

const CHART_HEIGHT = 160;

// Y ekseni + gridline'lı gruplu kolon grafiği. Sütunların üstünde kalıcı
// etiket yok; imleç bir sütuna gelince tam değer o sütunun üstünde belirir.
export function GroupedBarChart({
  data,
  series,
  format = "number",
}: {
  data: GroupedBarDatum[];
  series: GroupedBarSeries[];
  format?: keyof typeof FORMATTERS;
}) {
  const formatValue = FORMATTERS[format];
  const [hovered, setHovered] = useState<{ group: number; series: string } | null>(null);

  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-ink-400">Henüz veri yok.</p>;
  }

  const max = Math.max(1, ...data.flatMap((d) => series.map((s) => d.values[s.id] ?? 0)));
  const ticks = niceTicks(max);
  const niceMax = ticks[ticks.length - 1];
  const ticksDesc = [...ticks].reverse();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div
          className="flex flex-col justify-between text-right text-xs text-ink-400"
          style={{ height: CHART_HEIGHT }}
        >
          {ticksDesc.map((t) => (
            <span key={t}>{formatValue(t)}</span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="relative" style={{ height: CHART_HEIGHT, minWidth: data.length * 44 }}>
            {ticksDesc.map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t border-border"
                style={{ top: `${(1 - t / niceMax) * 100}%` }}
              />
            ))}
            <div className="absolute inset-0 flex items-end gap-3">
              {data.map((d, groupIndex) => (
                <div key={d.label} className="flex h-full flex-1 items-end justify-center gap-0.5">
                  {series.map((s, seriesIndex) => {
                    const value = d.values[s.id] ?? 0;
                    const heightPct = value === 0 ? 0 : Math.max(1, (value / niceMax) * 100);
                    const isHovered = hovered?.group === groupIndex && hovered.series === s.id;
                    return (
                      <div
                        key={s.id}
                        className="flex h-full w-2.5 items-end"
                        onMouseEnter={() => setHovered({ group: groupIndex, series: s.id })}
                        onMouseLeave={() =>
                          setHovered((h) => (h && h.group === groupIndex && h.series === s.id ? null : h))
                        }
                      >
                        <div
                          className="relative w-full rounded-t-[4px] transition-opacity"
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: SERIES_COLORS[seriesIndex % SERIES_COLORS.length],
                            opacity: isHovered ? 1 : 0.9,
                          }}
                        >
                          {isHovered && (
                            <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-medium text-white shadow">
                              {s.name}: {formatValue(value)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex gap-3" style={{ minWidth: data.length * 44 }}>
            {data.map((d) => (
              <span key={d.label} className="flex-1 text-center text-xs text-ink-400">
                {d.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {series.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1.5 text-xs text-ink-600">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
            />
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
