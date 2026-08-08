import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-3 px-4">
      <h1 className="text-2xl font-semibold">HarmonyBlend</h1>
      <p className="text-sm text-neutral-600">B2B Sipariş & Bayi Yönetim Sistemi</p>
      <Link href="/login" className="text-sm font-medium underline underline-offset-4">
        Giriş yap →
      </Link>
    </main>
  );
}
