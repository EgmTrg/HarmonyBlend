import { Download } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { getBrandSalesReport, getInactiveDealersReport } from "@/lib/reports";
import { resolveInactiveThreshold } from "@/lib/inactive-threshold";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CARD, TABLE_HEAD, TABLE_ROW, BUTTON_PRIMARY } from "@/lib/ui";
import { PeriodFilter } from "@/components/period-filter";
import { SalesBrandFilter, InactiveThresholdFilter } from "./reports-filters";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    start?: string;
    end?: string;
    brand?: string;
    threshold?: string;
  }>;
}) {
  const session = await requireAdminSession();
  const companyId = session.user.companyId;

  const { period: periodParam, start: startParam, end: endParam, brand: brandFilter, threshold: thresholdParam } =
    await searchParams;
  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const period = hasExplicitPeriod ? (periodParam as PeriodKey) : "month";
  const periodRange = resolvePeriodRange(period, startParam, endParam);
  const threshold = resolveInactiveThreshold(thresholdParam);

  const [companyBrands, salesRows, inactiveDealers] = await Promise.all([
    db.select().from(brands).where(eq(brands.companyId, companyId)).orderBy(brands.name),
    getBrandSalesReport(companyId, periodRange, brandFilter),
    getInactiveDealersReport(companyId, threshold.days),
  ]);

  const salesExportParams = new URLSearchParams({ type: "sales", period: hasExplicitPeriod ? period : "month" });
  if (hasExplicitPeriod && startParam) salesExportParams.set("start", startParam);
  if (hasExplicitPeriod && endParam) salesExportParams.set("end", endParam);
  if (brandFilter) salesExportParams.set("brand", brandFilter);

  const inactiveExportParams = new URLSearchParams({ type: "inactive-dealers", threshold: threshold.key });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Raporlar</h1>
        <p className="text-sm text-ink-400">Marka bazlı satış raporları ve pasif bayi takibi.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className={CARD}>
          <div className="flex flex-col gap-4">
            <PeriodFilter period={hasExplicitPeriod ? period : ""} start={startParam ?? ""} end={endParam ?? ""} />
            <SalesBrandFilter brands={companyBrands} selectedId={brandFilter ?? ""} />
          </div>
        </div>

        <div className={CARD}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-ink-900">{periodRange.label} Marka Bazlı Satışlar</h2>
            <a
              href={`/admin/reports/export?${salesExportParams.toString()}`}
              className={BUTTON_PRIMARY}
            >
              <Download className="mr-2 h-4 w-4" strokeWidth={2} />
              Excel&apos;e Aktar
            </a>
          </div>
          {salesRows.length === 0 ? (
            <p className="mt-4 text-sm text-ink-400">Seçili dönemde sipariş verilmedi.</p>
          ) : (
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2">Marka</th>
                  <th className="pb-2 text-right">Sipariş Sayısı</th>
                  <th className="pb-2 text-right">Ciro</th>
                </tr>
              </thead>
              <tbody>
                {salesRows.map((row) => (
                  <tr key={row.brandId} className={TABLE_ROW}>
                    <td className="py-3 font-medium text-ink-900">{row.brandName}</td>
                    <td className="py-3 text-right text-ink-600">{formatNumber(row.orderCount)}</td>
                    <td className="py-3 text-right text-ink-600">{formatCurrency(row.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className={CARD}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-medium text-ink-900">Sipariş Vermeyen Bayiler</h2>
              <InactiveThresholdFilter selected={threshold.key} />
            </div>
            <a
              href={`/admin/reports/export?${inactiveExportParams.toString()}`}
              className={BUTTON_PRIMARY}
            >
              <Download className="mr-2 h-4 w-4" strokeWidth={2} />
              Excel&apos;e Aktar
            </a>
          </div>
          {inactiveDealers.length === 0 ? (
            <p className="mt-4 text-sm text-ink-400">
              &quot;{threshold.label}&quot; filtresine göre sipariş vermeyen bayi yok.
            </p>
          ) : (
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2">Bayi</th>
                  <th className="pb-2">Marka(lar)</th>
                  <th className="pb-2">Son Sipariş Tarihi</th>
                  <th className="pb-2 text-right">Kaç Gündür Sipariş Yok</th>
                </tr>
              </thead>
              <tbody>
                {inactiveDealers.map((row) => (
                  <tr key={row.dealerId} className={TABLE_ROW}>
                    <td className="py-3 font-medium text-ink-900">{row.dealerName}</td>
                    <td className="py-3 text-ink-400">{row.brandNames}</td>
                    <td className="py-3 text-ink-600">
                      {row.lastOrderAt ? row.lastOrderAt.toLocaleDateString("tr-TR") : "Hiç sipariş vermedi"}
                    </td>
                    <td className="py-3 text-right text-ink-600">
                      {row.daysSinceLastOrder ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
