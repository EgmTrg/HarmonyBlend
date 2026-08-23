export interface InactiveThresholdOption {
  key: string;
  label: string;
  days: number;
}

// Takvim günü bazlı eşikler — "Bugün" o gün sipariş vermeyenleri, "2 Hafta"
// en az iki haftadır sipariş vermeyenleri (rapordaki en sıkı/en pasif uç) gösterir.
export const INACTIVE_THRESHOLD_OPTIONS: InactiveThresholdOption[] = [
  { key: "today", label: "Bugün", days: 1 },
  { key: "yesterday", label: "Dün", days: 2 },
  { key: "week", label: "1 Hafta", days: 7 },
  { key: "two_weeks", label: "2 Hafta", days: 14 },
];

export function resolveInactiveThreshold(key?: string): InactiveThresholdOption {
  return INACTIVE_THRESHOLD_OPTIONS.find((o) => o.key === key) ?? INACTIVE_THRESHOLD_OPTIONS[0];
}
