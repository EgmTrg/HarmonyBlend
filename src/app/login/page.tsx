import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-navy-950 px-4">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-base font-bold text-white">
          H
        </span>
        <span className="text-lg font-semibold text-white">
          Harmony<span className="text-accent-500">Blend</span>
        </span>
      </div>

      <div className={`w-full max-w-sm ${CARD}`}>
        <h1 className="text-lg font-semibold text-ink-900">Giriş yap</h1>
        <p className="mb-6 text-sm text-ink-400">Yönetici / bayi girişi</p>
        <LoginForm searchParams={searchParams} />
      </div>
    </main>
  );
}

async function LoginForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function authenticate(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        throw new Error("CredentialsSignin");
      }
      throw err;
    }
  }

  return (
    <form action={authenticate} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className={LABEL}>E-posta</span>
        <input name="email" type="email" placeholder="ornek@harmonyblend.dev" required className={INPUT} />
      </label>
      <label className="flex flex-col gap-1">
        <span className={LABEL}>Şifre</span>
        <input name="password" type="password" placeholder="••••••••" required className={INPUT} />
      </label>
      {error && (
        <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
          E-posta veya şifre hatalı.
        </p>
      )}
      <button type="submit" className={`justify-center ${BUTTON_PRIMARY}`}>
        Giriş yap
      </button>
    </form>
  );
}
