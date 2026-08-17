export interface MonthBucket {
  key: string;
  label: string;
  start: Date;
  end: Date;
}

// Son n ayı (bulunulan ay dahil), her biri için ay başı/ay sonu sınırlarıyla
// birlikte döner — dashboard trend grafiklerinde ham sipariş satırlarını JS
// tarafında ay bazında gruplamak için kullanılır (SQL groupBy yerine).
export function lastNMonths(n: number, reference = new Date()): MonthBucket[] {
  const months: MonthBucket[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const start = new Date(reference.getFullYear(), reference.getMonth() - i, 1);
    const end = new Date(reference.getFullYear(), reference.getMonth() - i + 1, 1);
    const key = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("tr-TR", { month: "short" }).format(start);
    months.push({ key, label, start, end });
  }
  return months;
}

export function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function startOfCurrentMonth(reference = new Date()) {
  return new Date(reference.getFullYear(), reference.getMonth(), 1);
}
