"use server";

import { randomBytes, createHash } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { mockEmailProvider } from "@/lib/email/mock-provider";
import { getRequestOrigin } from "@/lib/request-origin";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 saat

export async function requestPasswordReset(_formData: FormData) {
  const email = String(_formData.get("email") ?? "").trim();
  if (!email) return;

  const [user] = await db
    .select({ id: users.id, email: users.email, isActive: users.isActive })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Kullanıcı bulunamasa bile sessizce dönüyoruz — e-posta numaralandırma
  // (enumeration) saldırısını önlemek için sayfa her durumda aynı genel
  // mesajı gösteriyor.
  if (!user || !user.isActive) return;

  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, user.id));

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const origin = await getRequestOrigin();
  const resetUrl = `${origin}/reset-password?token=${rawToken}`;

  await mockEmailProvider.sendPasswordResetEmail({ to: user.email, resetUrl });
}
