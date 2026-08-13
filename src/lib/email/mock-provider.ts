import type { EmailProvider, SendPasswordResetEmailInput } from "./provider";

// Gerçek bir e-posta gönderim servisiyle (ör. Resend) değiştirilecek; çağıran
// kod yalnızca EmailProvider arayüzüne bağlı olduğu için o değişiklik izole
// kalır (bkz. src/lib/payments/mock-provider.ts'teki aynı desen).
class MockEmailProvider implements EmailProvider {
  async sendPasswordResetEmail({ to, resetUrl }: SendPasswordResetEmailInput): Promise<void> {
    console.log(`[MockEmailProvider] Şifre sıfırlama e-postası → ${to}\n${resetUrl}`);
  }
}

export const mockEmailProvider: EmailProvider = new MockEmailProvider();
