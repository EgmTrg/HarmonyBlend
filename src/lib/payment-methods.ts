export const PAYMENT_METHOD_CODES = ["cari", "cash_on_delivery", "virtual_pos"] as const;

export type PaymentMethodCode = (typeof PAYMENT_METHOD_CODES)[number];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethodCode, string> = {
  cari: "Cari (Açık Hesap)",
  cash_on_delivery: "Nakit / Merkezde Ödeme",
  virtual_pos: "Sanal POS",
};
