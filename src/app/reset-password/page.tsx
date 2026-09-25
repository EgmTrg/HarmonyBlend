import Link from "next/link";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { resetPassword } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  weak: "Şifre en az 8 karakter olmalı.",
  mismatch: "Şifreler eşleşmiyor.",
  invalid: "Bağlantı geçersiz veya süresi dolmuş. Yeni bir sıfırlama bağlantısı isteyin.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-navy-950 px-4 py-8">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-base font-bold text-white">
          H
        </span>
        <span className="text-lg font-semibold text-white">
          Harmony<span className="text-accent-500">Blend</span>
        </span>
      </div>

      <div className={`w-full max-w-sm ${CARD}`}>
        <h1 className="text-lg font-semibold text-ink-900">Yeni şifre belirle</h1>
        <p className="mb-6 text-sm text-ink-400">Hesabınız için yeni bir şifre girin.</p>

        {!token ? (
          <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
            Bağlantı geçersiz. Şifremi unuttum sayfasından yeniden isteyin.
          </p>
        ) : (
          <form action={resetPassword.bind(null, token)} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Yeni şifre</span>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={8}
                className={INPUT}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={LABEL}>Şifre tekrar</span>
              <input
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                minLength={8}
                className={INPUT}
              />
            </label>
            {error && (
              <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
                {ERROR_MESSAGES[error] ?? "Bir hata oluştu."}
              </p>
            )}
            <button type="submit" className={`justify-center ${BUTTON_PRIMARY}`}>
              Şifreyi güncelle
            </button>
          </form>
        )}

        <Link href="/login" className="mt-4 block text-center text-sm text-accent-600 hover:underline">
          Giriş sayfasına dön
        </Link>
      </div>
    </main>
  );
}
