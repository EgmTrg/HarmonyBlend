import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import { resolveCompanyByCodeOrName } from "@/lib/companies";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { ChangeCompanyButton } from "./change-company-button";
import { BrandMark } from "@/components/brand-mark";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reset?: string; company?: string }>;
}) {
  const { error, reset, company: companyParam } = await searchParams;

  if (!companyParam) redirect("/");
  const company = await resolveCompanyByCodeOrName(companyParam);
  if (!company) redirect("/?companyError=1");

  async function authenticate(formData: FormData) {
    "use server";
    const companyCode = String(formData.get("companyCode") ?? "");
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        companyCode,
        redirect: false,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/login?company=${encodeURIComponent(companyCode)}&error=CredentialsSignin`);
      }
      throw err;
    }
    // signIn() az önce oturumu kurdu — role, sipariş verirken önemli: bayi
    // kullanıcısı /admin'e gidip proxy.ts'te reddedilip "/" ekranına geri
    // savrulmasın diye, roline göre doğru panele yönlendiriyoruz.
    const session = await auth();
    redirect(session?.user?.role === "dealer_user" ? "/dealer" : "/admin");
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-navy-950 px-4 py-8">
      <div className="flex items-center gap-2">
        <BrandMark size={44} />
        <span className="text-lg font-semibold text-white">
          Harmony<span className="text-accent-500">Blend</span>
        </span>
      </div>

      <div className={`w-full max-w-sm ${CARD}`}>
        <h1 className="text-lg font-semibold text-ink-900">Giriş yap</h1>
        <p className="mb-6 text-sm text-ink-400">{company.name} için giriş yapın</p>

        <form action={authenticate} className="flex flex-col gap-4">
          <input type="hidden" name="companyCode" value={company.code} />
          <label className="flex flex-col gap-1">
            <span className={LABEL}>E-posta</span>
            <input name="email" type="email" placeholder="ornek@harmonyblend.dev" required className={INPUT} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={LABEL}>Şifre</span>
            <input name="password" type="password" placeholder="••••••••" required className={INPUT} />
          </label>
          <Link href="/forgot-password" className="self-end text-sm text-accent-600 hover:underline">
            Şifremi unuttum?
          </Link>
          {reset === "success" && (
            <p className="rounded-lg bg-success-bg px-3 py-2 text-sm text-success-fg">
              Şifreniz güncellendi, yeni şifrenizle giriş yapabilirsiniz.
            </p>
          )}
          {error && (
            <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
              E-posta veya şifre hatalı.
            </p>
          )}
          <button type="submit" className={`justify-center ${BUTTON_PRIMARY}`}>
            Giriş yap
          </button>
        </form>

        <ChangeCompanyButton />
      </div>
    </main>
  );
}
