import type { ChargeInput, ChargeResult, PaymentProvider } from "./provider";

// Faz 6'da gerçek bir sağlayıcıyla (Iyzico/Paytr) değiştirilecek; çağıran kod
// yalnızca PaymentProvider arayüzüne bağlı olduğu için o değişiklik izole kalır.
class MockPosProvider implements PaymentProvider {
  async charge(input: ChargeInput): Promise<ChargeResult> {
    const providerRef = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    if (input.simulateFailure) {
      return { status: "failed", providerRef };
    }
    return { status: "success", providerRef };
  }
}

export const mockPosProvider: PaymentProvider = new MockPosProvider();
