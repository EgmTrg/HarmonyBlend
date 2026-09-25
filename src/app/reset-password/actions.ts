"use server";

import { createHash } from "crypto";
import { hash } from "bcryptjs";
import { and, eq, gt, isNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { logActivity } from "@/lib/activity-log";

// redirect() Next.js içinde özel bir hata fırlatarak çalışır — bu yüzden
// ToastForm'un try/catch'i içinde çağrılamaz (bkz. src/app/dealer/sidebar.tsx
// içindeki stopImpersonation'ın düz <form> ile çağrılma nedeni). Hatalar da
// aynı şekilde login sayfasındaki gibi ?error= query param'ıyla iletiliyor.
export async function resetPassword(rawToken: string, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");

  if (password.length < 8) {
    redirect(`/reset-password?token=${rawToken}&error=weak`);
  }
  if (password !== passwordConfirm) {
    redirect(`/reset-password?token=${rawToken}&error=mismatch`);
  }

  const tokenHash = createHash("sha256").update(rawToken).digest("hex");

  const [tokenRow] = await db
    .select({ id: passwordResetTokens.id, userId: passwordResetTokens.userId })
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        isNull(passwordResetTokens.usedAt),
        gt(passwordResetTokens.expiresAt, new Date())
      )
    )
    .limit(1);

  if (!tokenRow) {
    await logActivity({
      action: "auth.password_reset_completed",
      level: "warn",
      message: "Şifre sıfırlama denemesi — geçersiz/süresi dolmuş token",
      source: "reset-password.resetPassword",
    });
    redirect(`/reset-password?token=${rawToken}&error=invalid`);
  }

  const passwordHash = await hash(password, 10);

  await db.update(users).set({ passwordHash }).where(eq(users.id, tokenRow.userId));
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, tokenRow.id));

  const [user] = await db.select({ email: users.email }).from(users).where(eq(users.id, tokenRow.userId)).limit(1);
  await logActivity({
    action: "auth.password_reset_completed",
    message: `Şifre sıfırlandı: ${user?.email ?? tokenRow.userId}`,
    source: "reset-password.resetPassword",
    actor: { id: tokenRow.userId, email: user?.email ?? null },
  });

  redirect("/login?reset=success");
}
