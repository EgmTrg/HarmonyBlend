import type { PaymentMethodCode } from "@/lib/payment-methods";

export type OrderStatus =
  | "submitted"
  | "approved"
  | "preparing"
  | "shipped"
  | "delivered"
  | "closed"
  | "cancelled"
  | "rejected"
  | "awaiting_cash_collection"
  | "delivered_paid"
  | "delivered_unpaid"
  | "awaiting_payment"
  | "paid"
  | "payment_failed";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  submitted: "Gönderildi",
  approved: "Onaylandı",
  preparing: "Hazırlanıyor",
  shipped: "Sevk Edildi",
  delivered: "Teslim Edildi",
  closed: "Kapandı",
  cancelled: "İptal Edildi",
  rejected: "Reddedildi",
  awaiting_cash_collection: "Tahsilat Bekleniyor",
  delivered_paid: "Teslim Edildi (Tahsil Edildi)",
  delivered_unpaid: "Teslim Edildi (Tahsil Edilemedi)",
  awaiting_payment: "Ödeme Bekleniyor",
  paid: "Ödendi",
  payment_failed: "Ödeme Başarısız",
};

export type OrderStatusTone = "neutral" | "info" | "warning" | "success" | "danger";

export const ORDER_STATUS_TONES: Record<OrderStatus, OrderStatusTone> = {
  submitted: "neutral",
  approved: "info",
  preparing: "info",
  shipped: "info",
  delivered: "success",
  closed: "success",
  cancelled: "danger",
  rejected: "danger",
  awaiting_cash_collection: "warning",
  delivered_paid: "success",
  delivered_unpaid: "warning",
  awaiting_payment: "warning",
  paid: "success",
  payment_failed: "danger",
};

interface OrderFlow {
  initial: OrderStatus;
  transitions: Partial<Record<OrderStatus, OrderStatus[]>>;
  terminal: OrderStatus[];
}

// draft asla DB'ye yazılmaz — sepet client-side/ephemeral olduğu için akış
// doğrudan checkout anında oluşan ilk durumla başlıyor (bkz. docs/roadmap.md § 3).
const CARI_FLOW: OrderFlow = {
  initial: "submitted",
  transitions: {
    submitted: ["approved", "rejected", "cancelled"],
    approved: ["preparing", "cancelled"],
    preparing: ["shipped"],
    shipped: ["delivered"],
    delivered: ["closed"],
  },
  terminal: ["closed", "cancelled", "rejected"],
};

const CASH_ON_DELIVERY_FLOW: OrderFlow = {
  initial: "submitted",
  transitions: {
    submitted: ["approved", "rejected", "cancelled"],
    approved: ["preparing", "cancelled"],
    preparing: ["shipped"],
    shipped: ["awaiting_cash_collection"],
    // delivered_unpaid'in cari borca düşülüp kapanması ("Bakiye Öde") Faz 4'te.
    awaiting_cash_collection: ["delivered_paid", "delivered_unpaid"],
    delivered_paid: ["closed"],
  },
  terminal: ["closed", "cancelled", "rejected", "delivered_unpaid"],
};

const VIRTUAL_POS_FLOW: OrderFlow = {
  initial: "awaiting_payment",
  transitions: {
    awaiting_payment: ["paid", "payment_failed"],
    payment_failed: ["awaiting_payment", "cancelled"],
    paid: ["approved", "cancelled"],
    approved: ["preparing", "cancelled"],
    preparing: ["shipped"],
    shipped: ["delivered"],
    delivered: ["closed"],
  },
  terminal: ["closed", "cancelled"],
};

const FLOWS: Record<PaymentMethodCode, OrderFlow> = {
  cari: CARI_FLOW,
  cash_on_delivery: CASH_ON_DELIVERY_FLOW,
  virtual_pos: VIRTUAL_POS_FLOW,
};

export function initialOrderStatus(code: PaymentMethodCode): OrderStatus {
  return FLOWS[code].initial;
}

export function nextOrderStatuses(code: PaymentMethodCode, current: string): OrderStatus[] {
  return FLOWS[code].transitions[current as OrderStatus] ?? [];
}

export function isTerminalOrderStatus(code: PaymentMethodCode, current: string): boolean {
  return FLOWS[code].terminal.includes(current as OrderStatus);
}

// Genel bakış panellerindeki sipariş sayısı/ciro istatistiklerinden hariç
// tutulan durumlar — bunlar hiç gerçekleşmemiş sayılır. delivered_unpaid gibi
// "teslim edildi ama tahsil edilemedi" durumları bilinçli olarak DAHİL
// tutuluyor çünkü sipariş fiilen verildi/teslim edildi.
export const EXCLUDED_FROM_STATS_STATUSES: OrderStatus[] = ["cancelled", "rejected"];

export function canTransitionOrderStatus(
  code: PaymentMethodCode,
  from: string,
  to: string
): boolean {
  return nextOrderStatuses(code, from).includes(to as OrderStatus);
}
