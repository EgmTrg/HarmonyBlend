import { CompanyGate } from "./company-gate";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ companyError?: string }>;
}) {
  const { companyError } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-950 px-4 text-center">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-600 text-lg font-bold text-white">
          H
        </span>
        <span className="text-xl font-semibold text-white">
          Harmony<span className="text-accent-500">Blend</span>
        </span>
      </div>
      <p className="max-w-sm text-sm text-white/50">B2B Sipariş &amp; Bayi Yönetim Sistemi</p>
      <CompanyGate invalidCompany={companyError === "1"} />
    </main>
  );
}
