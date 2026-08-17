import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { dealers, ledgerEntries } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { formatCurrency } from "@/lib/format";
import { CARD, TABLE_HEAD, TABLE_ROW, badgeClass } from "@/lib/ui";

const SOURCE_LABELS: Record<string, string> = {
  order: "Sipariş",
  payment: "Ödeme",
  manual_adjustment: "Manuel Düzeltme",
};

export default async function DealerLedgerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireAdminSession();

  const [dealer] = await db
    .select()
    .from(dealers)
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)))
    .limit(1);

  if (!dealer) notFound();

  const entries = await db
    .select()
    .from(ledgerEntries)
    .where(eq(ledgerEntries.dealerId, dealer.id))
    .orderBy(desc(ledgerEntries.createdAt));

  const currentBalance = Number(dealer.currentBalance);
  const maxLimit = dealer.maxBalanceLimit != null ? Number(dealer.maxBalanceLimit) : null;

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <Link
          href={`/admin/dealers/${dealer.id}`}
          className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-accent-600 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          {dealer.name}
        </Link>
        <h1 className="text-2xl font-semibold text-ink-900">Cari Hesap Ekstresi</h1>
        <p className="text-sm text-ink-400">{dealer.name} — borç/alacak hareket dökümü.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={CARD}>
          <h2 className="mb-1 text-sm font-medium text-ink-400">Güncel Bakiye</h2>
          <p
            className={`text-2xl font-semibold ${currentBalance > 0 ? "text-warning-fg" : "text-success-fg"}`}
          >
            {formatCurrency(currentBalance)}
          </p>
        </div>
        <div className={CARD}>
          <h2 className="mb-1 text-sm font-medium text-ink-400">Maksimum Bakiye Limiti</h2>
          <p className="text-2xl font-semibold text-ink-900">
            {maxLimit != null ? formatCurrency(maxLimit) : "Sınırsız"}
          </p>
        </div>
      </div>

      <div className={`${CARD} p-0`}>
        {entries.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-ink-400">
            Bu bayi için henüz bir cari hareket yok.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="px-6 pb-2 pt-4">Tarih</th>
                <th className="pb-2 pt-4">Yön</th>
                <th className="pb-2 pt-4">Kaynak</th>
                <th className="pb-2 pt-4">Not</th>
                <th className="pb-2 pt-4 text-right">Tutar</th>
                <th className="px-6 pb-2 pt-4 text-right">Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className={TABLE_ROW}>
                  <td className="px-6 py-3 text-ink-600">
                    {entry.createdAt.toLocaleString("tr-TR")}
                  </td>
                  <td className="py-3">
                    <span className={badgeClass(entry.direction === "debit" ? "warning" : "success")}>
                      {entry.direction === "debit" ? "Borç" : "Alacak"}
                    </span>
                  </td>
                  <td className="py-3 text-ink-600">{SOURCE_LABELS[entry.sourceType] ?? entry.sourceType}</td>
                  <td className="py-3 text-ink-400">{entry.note ?? "—"}</td>
                  <td className="py-3 text-right text-ink-900">{formatCurrency(Number(entry.amount))}</td>
                  <td className="px-6 py-3 text-right font-medium text-ink-900">
                    {formatCurrency(Number(entry.balanceAfter))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
