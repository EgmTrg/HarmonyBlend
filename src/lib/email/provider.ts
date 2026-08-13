export interface SendPasswordResetEmailInput {
  to: string;
  resetUrl: string;
}

export interface EmailProvider {
  sendPasswordResetEmail(input: SendPasswordResetEmailInput): Promise<void>;
}
