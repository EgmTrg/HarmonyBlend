export function formatCurrency(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} ₺`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("tr-TR");
}
