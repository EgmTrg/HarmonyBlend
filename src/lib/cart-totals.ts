export interface VatLineInput {
  unitPrice: string | number;
  quantity: string | number;
  vatRate: string | number; // yüzde, örn. 20 = %20
}

export interface CartTotals {
  subtotal: number; // KDV hariç
  vatAmount: number;
  total: number; // KDV dahil (brüt)
}

export function calculateLineNet(
  unitPrice: VatLineInput["unitPrice"],
  quantity: VatLineInput["quantity"]
): number {
  return Number(unitPrice) * Number(quantity);
}

export function calculateLineVat(lineNet: number, vatRate: VatLineInput["vatRate"]): number {
  // Eski (deploy öncesi) localStorage sepet kayıtlarında vatRate alanı
  // bulunmayabilir — eksik/geçersiz oranı %0 olarak ele alıp NaN'a düşmeyi
  // önlüyoruz.
  const rate = Number(vatRate);
  return lineNet * ((Number.isFinite(rate) ? rate : 0) / 100);
}

export function calculateCartTotals(items: VatLineInput[]): CartTotals {
  return items.reduce<CartTotals>(
    (acc, item) => {
      const lineNet = calculateLineNet(item.unitPrice, item.quantity);
      const lineVat = calculateLineVat(lineNet, item.vatRate);
      return {
        subtotal: acc.subtotal + lineNet,
        vatAmount: acc.vatAmount + lineVat,
        total: acc.total + lineNet + lineVat,
      };
    },
    { subtotal: 0, vatAmount: 0, total: 0 }
  );
}
