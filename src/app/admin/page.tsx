import { auth, signOut } from "@/auth";

export default async function AdminHomePage() {
  const session = await auth();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-4 px-4 py-16">
      <h1 className="text-xl font-semibold">Yönetici Paneli</h1>
      <p className="text-sm text-neutral-600">
        Oturum açan kullanıcı: <strong>{session?.user?.email}</strong> ({session?.user?.role})
      </p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit" className="rounded border border-neutral-300 px-3 py-2 text-sm">
          Çıkış yap
        </button>
      </form>
    </main>
  );
}
