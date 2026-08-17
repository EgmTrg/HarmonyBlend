"use client";

import { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/format";

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

// Tek seriyi, ay bazlı özet trendler için tasarlanmış kompakt bir kolon
// grafiği (bkz. dataviz skill: sequential = tek renk, kolon üstünde değer,
// baseline'da kare/köşeleri yuvarlak uç, dokunan barlar arası boşluk).
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

  return (
    <div className="flex items-end gap-3">
      {data.map((d, i) => {
        const heightPct = d.value === 0 ? 0 : Math.max(4, Math.round((d.value / max) * 100));
        const isHovered = hovered === i;
        return (
          <div
            key={d.label}
            className="flex flex-1 flex-col items-center gap-2"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            <span className={`text-xs font-medium ${isHovered ? "text-ink-900" : "text-ink-400"}`}>
              {formatValue(d.value)}
            </span>
            <div className="flex h-28 w-full items-end justify-center">
              <div
                className={`w-6 rounded-t-[4px] transition-opacity ${color} ${
                  isHovered ? "opacity-100" : "opacity-90"
                }`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-xs text-ink-400">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
