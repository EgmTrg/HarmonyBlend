import { lastNMonths, monthKey } from "@/lib/month-range";
import type { PeriodKey, PeriodRange } from "@/lib/date-range";

export type ChartGrain = "hour" | "day" | "week" | "month";

export interface ChartBucket {
  key: string;
  label: string;
  start: Date;
  end: Date;
}

export interface ChartBucketPlan {
  grain: ChartGrain;
  buckets: ChartBucket[];
  // Trend verisinin çekileceği toplam aralık — bucket'ların birleşimi.
  rangeStart: Date;
  rangeEnd: Date;
}

const WEEKDAY_SHORT = new Intl.DateTimeFormat("tr-TR", { weekday: "short" });

function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

// hasExplicitPeriod=false ise varsayılan "son 6 ay" görünümü — mevcut
// davranışla birebir aynı. Bir dönem seçildiğinde ise dönemin uzunluğuna göre
// saatlik/günlük/haftalık bucket'lara geçilir.
export function buildChartBucketPlan(
  hasExplicitPeriod: boolean,
  period: PeriodKey,
  periodRange: PeriodRange,
  reference = new Date()
): ChartBucketPlan {
  if (!hasExplicitPeriod) {
    const months = lastNMonths(6, reference);
    return {
      grain: "month",
      rangeStart: months[0].start,
      rangeEnd: months[months.length - 1].end,
      buckets: months.map((m) => ({ key: m.key, label: m.label, start: m.start, end: m.end })),
    };
  }

  if (period === "today") {
    // Saatlik kırılım yerine tek bir "Bugün" bucket'ı — marka bazlı görünüm
    // açıkken zaten marka sayısı kadar sütun çıkıyor, saatlik detay gereksiz.
    const buckets: ChartBucket[] = [
      { key: "today", label: "Bugün", start: periodRange.start, end: periodRange.end },
    ];
    return { grain: "day", buckets, rangeStart: periodRange.start, rangeEnd: periodRange.end };
  }

  const spanDays = Math.round((periodRange.end.getTime() - periodRange.start.getTime()) / 86_400_000);

  if (period === "week" || (period === "custom" && spanDays <= 7)) {
    const buckets: ChartBucket[] = [];
    let cursor = new Date(periodRange.start.getFullYear(), periodRange.start.getMonth(), periodRange.start.getDate());
    while (cursor < periodRange.end) {
      const start = cursor;
      const end = addDays(start, 1);
      const label = `${WEEKDAY_SHORT.format(start)} ${start.getDate()}`;
      buckets.push({ key: isoDay(start), label, start, end });
      cursor = end;
    }
    return { grain: "day", buckets, rangeStart: periodRange.start, rangeEnd: periodRange.end };
  }

  // Ay (bu ay/geçen ay) ve uzunca özel aralıklar — grafiğe sığması için
  // günlük değil, sıralı 7 günlük "N. Hafta" bucket'larına bölünür.
  const buckets: ChartBucket[] = [];
  let cursor = new Date(periodRange.start.getFullYear(), periodRange.start.getMonth(), periodRange.start.getDate());
  let weekNumber = 1;
  while (cursor < periodRange.end) {
    const start = cursor;
    const end = addDays(start, 7);
    buckets.push({ key: `w${weekNumber}`, label: `${weekNumber}. Hafta`, start, end });
    cursor = end;
    weekNumber++;
  }
  return { grain: "week", buckets, rangeStart: periodRange.start, rangeEnd: periodRange.end };
}

export function bucketKeyForDate(plan: ChartBucketPlan, date: Date): string | null {
  if (plan.grain === "month") return monthKey(date);
  for (const bucket of plan.buckets) {
    if (date >= bucket.start && date < bucket.end) return bucket.key;
  }
  return null;
}
