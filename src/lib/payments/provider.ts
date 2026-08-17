export interface ChargeInput {
  amount: string;
  dealerId: string;
  // Sipariş dışı bağımsız tahsilatta (Faz 4 "Bakiye Öde") bağlı bir sipariş yok.
  orderId?: string;
  // Dev/test hook exposed as an explicit checkbox at checkout — lets the
  // payment_failed branch be exercised deliberately instead of faking it
  // with hidden randomness.
  simulateFailure?: boolean;
}

export interface ChargeResult {
  status: "success" | "failed";
  providerRef: string;
}

export interface PaymentProvider {
  charge(input: ChargeInput): Promise<ChargeResult>;
}
