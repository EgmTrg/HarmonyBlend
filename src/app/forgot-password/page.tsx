import Link from "next/link";
import { ToastForm } from "@/components/toast-form";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { requestPasswordReset } from "./actions";
import { BrandMark } from "@/components/brand-mark";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-navy-950 px-4 py-8">
      <div className="flex items-center gap-2">
        <BrandMark size={44} />
        <span className="text-lg font-semibold text-white">
          Harmony<span className="text-accent-500">Blend</span>
        </span>
      </div>

      <div className={`w-full max-w-sm ${CARD}`}>
        <h1 className="text-lg font-semibold text-ink-900">Şifremi unuttum</h1>
        <p className="mb-6 text-sm text-ink-400">
          E-posta adresinizi girin, kayıtlıysa bir sıfırlama bağlantısı gönderelim.
        </p>
        <ToastForm
          action={requestPasswordReset}
          successMessage="E-posta kayıtlıysa bir sıfırlama bağlantısı gönderildi."
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          <label className="flex flex-col gap-1">
            <span className={LABEL}>E-posta</span>
            <input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="ornek@harmonyblend.dev"
              required
              className={INPUT}
            />
          </label>
          <button type="submit" className={`justify-center ${BUTTON_PRIMARY}`}>
            Bağlantı gönder
          </button>
        </ToastForm>
        <Link href="/login" className="mt-4 block text-center text-sm text-accent-600 hover:underline">
          Giriş sayfasına dön
        </Link>
      </div>
    </main>
  );
}
