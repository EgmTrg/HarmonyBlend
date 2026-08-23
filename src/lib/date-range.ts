export type PeriodKey = "today" | "week" | "month" | "last_month" | "custom";

export interface PeriodRange {
  start: Date;
  end: Date;
  label: string;
}

const PERIOD_LABELS: Record<Exclude<PeriodKey, "custom">, string> = {
  today: "Bugün",
  week: "Son Hafta",
  month: "Bu Ay",
  last_month: "Geçen Ay",
};

export const PERIOD_OPTIONS: { key: PeriodKey; label: string }[] = [
  { key: "today", label: "Bugün" },
  { key: "week", label: "Son Hafta" },
  { key: "month", label: "Bu Ay" },
  { key: "last_month", label: "Geçen Ay" },
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Seçili döneme göre [start, end) aralığını hesaplar. Geçersiz/eksik custom
// tarihlerde "month" (bu ay) varsayılana düşülür.
export function resolvePeriodRange(
  period: PeriodKey,
  customStart?: string,
  customEnd?: string,
  reference = new Date()
): PeriodRange {
  if (period === "today") {
    const start = startOfDay(reference);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end, label: PERIOD_LABELS.today };
  }
  if (period === "week") {
    const end = new Date(startOfDay(reference));
    end.setDate(end.getDate() + 1);
    const start = new Date(end);
    start.setDate(start.getDate() - 7);
    return { start, end, label: PERIOD_LABELS.week };
  }
  if (period === "last_month") {
    const start = new Date(reference.getFullYear(), reference.getMonth() - 1, 1);
    const end = new Date(reference.getFullYear(), reference.getMonth(), 1);
    return { start, end, label: PERIOD_LABELS.last_month };
  }
  if (period === "custom" && customStart) {
    const start = new Date(customStart);
    const end = customEnd ? new Date(customEnd) : new Date(reference);
    end.setDate(end.getDate() + 1); // bitiş günü dahil
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && start < end) {
      const label =
        customEnd && customEnd !== customStart
          ? `${customStart} – ${customEnd}`
          : customStart;
      return { start, end, label };
    }
  }
  // Varsayılan: bu ay
  const start = new Date(reference.getFullYear(), reference.getMonth(), 1);
  const end = new Date(reference);
  end.setDate(end.getDate() + 1);
  return { start, end, label: PERIOD_LABELS.month };
}
