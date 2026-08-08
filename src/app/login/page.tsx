import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-4">
      <div>
        <h1 className="text-xl font-semibold">HarmonyBlend</h1>
        <p className="text-sm text-neutral-500">Yönetici / bayi girişi</p>
      </div>

      <LoginForm searchParams={searchParams} />
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
    <form action={authenticate} className="flex flex-col gap-3">
      <input
        name="email"
        type="email"
        placeholder="E-posta"
        required
        className="rounded border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="password"
        type="password"
        placeholder="Şifre"
        required
        className="rounded border border-neutral-300 px-3 py-2 text-sm"
      />
      {error && <p className="text-sm text-red-600">E-posta veya şifre hatalı.</p>}
      <button
        type="submit"
        className="rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
      >
        Giriş yap
      </button>
    </form>
  );
}
