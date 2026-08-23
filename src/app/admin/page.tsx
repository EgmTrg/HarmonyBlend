import { Building2, ClipboardList, Package, TrendingUp, Wallet } from "lucide-react";
import { and, count, eq, gte, lt, notInArray, sum } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, dealers, orderItems, orders, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { EXCLUDED_FROM_STATS_STATUSES } from "@/lib/order-status";
import { startOfCurrentMonth } from "@/lib/month-range";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { buildChartBucketPlan, bucketKeyForDate } from "@/lib/chart-buckets";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CARD, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { StatTile } from "@/components/stat-tile";
import { BarChart } from "@/components/bar-chart";
import { GroupedBarChart, type GroupedBarDatum } from "@/components/grouped-bar-chart";
import { PeriodFilter } from "@/components/period-filter";
import { ByBrandToggle } from "@/components/by-brand-toggle";
import { TopListsBrandFilter } from "./top-lists-brand-filter";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{
    period?: string;
    start?: string;
    end?: string;
    productBrand?: string;
    byBrand?: string;
  }>;
}) {
  const session = await requireAdminSession();
  const companyId = session.user.companyId;

  const {
    period: periodParam,
    start: startParam,
    end: endParam,
    productBrand: productBrandFilter,
    byBrand: byBrandParam,
  } = await searchParams;
  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const period = hasExplicitPeriod ? (periodParam as PeriodKey) : "month";
  const periodRange = resolvePeriodRange(period, startParam, endParam);
  const byBrand = byBrandParam === "1";

  const chartPlan = buildChartBucketPlan(hasExplicitPeriod, period, periodRange);
  const thisMonthStart = startOfCurrentMonth();

  const [
    [dealerCount],
    [productCount],
    [balanceTotal],
    trendRows,
    [periodStats],
    companyBrands,
    topProductRows,
    topDealerOrderRows,
  ] = await Promise.all([
    db.select({ value: count() }).from(dealers).where(eq(dealers.companyId, companyId)),
    db
      .select({ value: count() })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .where(eq(brands.companyId, companyId)),
    db.select({ value: sum(dealers.currentBalance) }).from(dealers).where(eq(dealers.companyId, companyId)),
    db
      .select({ createdAt: orders.createdAt, totalAmount: orders.totalAmount, brandId: orders.brandId })
      .from(orders)
      .innerJoin(brands, eq(orders.brandId, brands.id))
      .where(
        and(
          eq(brands.companyId, companyId),
          gte(orders.createdAt, chartPlan.rangeStart),
          lt(orders.createdAt, chartPlan.rangeEnd),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
        )
      ),
    db
      .select({ value: count(), revenue: sum(orders.totalAmount) })
      .from(orders)
      .innerJoin(brands, eq(orders.brandId, brands.id))
      .where(
        and(
          eq(brands.companyId, companyId),
          gte(orders.createdAt, periodRange.start),
          lt(orders.createdAt, periodRange.end),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
        )
      ),
    db.select().from(brands).where(eq(brands.companyId, companyId)).orderBy(brands.name),
    db
      .select({
        productId: products.id,
        productName: products.name,
        brandName: brands.name,
        categoryName: categories.name,
        quantity: orderItems.quantity,
        lineTotal: orderItems.lineTotal,
        vatAmount: orderItems.vatAmount,
      })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .innerJoin(products, eq(orderItems.productId, products.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(
          eq(brands.companyId, companyId),
          gte(orders.createdAt, thisMonthStart),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES),
          productBrandFilter ? eq(brands.id, productBrandFilter) : undefined
        )
      ),
    db
      .select({
        dealerId: orders.dealerId,
        dealerName: dealers.name,
        brandName: brands.name,
        totalAmount: orders.totalAmount,
      })
      .from(orders)
      .innerJoin(brands, eq(orders.brandId, brands.id))
      .innerJoin(dealers, eq(orders.dealerId, dealers.id))
      .where(
        and(
          eq(brands.companyId, companyId),
          gte(orders.createdAt, thisMonthStart),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES),
          productBrandFilter ? eq(brands.id, productBrandFilter) : undefined
        )
      ),
  ]);

  const brandSeries = companyBrands.map((b) => ({ id: b.id, name: b.name }));

  // Bucket'lara göre trend: byBrand kapalıysa tek seri, açıksa marka bazlı.
  let orderCountTrend: { label: string; value: number }[] = [];
  let revenueTrend: { label: string; value: number }[] = [];
  let orderCountTrendGrouped: GroupedBarDatum[] = [];
  let revenueTrendGrouped: GroupedBarDatum[] = [];

  if (byBrand) {
    const countByBucket = new Map<string, Record<string, number>>(chartPlan.buckets.map((b) => [b.key, {}]));
    const revenueByBucket = new Map<string, Record<string, number>>(chartPlan.buckets.map((b) => [b.key, {}]));
    for (const row of trendRows) {
      const key = bucketKeyForDate(chartPlan, row.createdAt);
      if (key === null || !countByBucket.has(key)) continue;
      const countRec = countByBucket.get(key)!;
      countRec[row.brandId] = (countRec[row.brandId] ?? 0) + 1;
      const revRec = revenueByBucket.get(key)!;
      revRec[row.brandId] = (revRec[row.brandId] ?? 0) + Number(row.totalAmount);
    }
    orderCountTrendGrouped = chartPlan.buckets.map((b) => ({ label: b.label, values: countByBucket.get(b.key)! }));
    revenueTrendGrouped = chartPlan.buckets.map((b) => ({ label: b.label, values: revenueByBucket.get(b.key)! }));
  } else {
    const orderCountByBucket = new Map(chartPlan.buckets.map((b) => [b.key, 0]));
    const revenueByBucket = new Map(chartPlan.buckets.map((b) => [b.key, 0]));
    for (const row of trendRows) {
      const key = bucketKeyForDate(chartPlan, row.createdAt);
      if (key === null || !orderCountByBucket.has(key)) continue;
      orderCountByBucket.set(key, (orderCountByBucket.get(key) ?? 0) + 1);
      revenueByBucket.set(key, (revenueByBucket.get(key) ?? 0) + Number(row.totalAmount));
    }
    orderCountTrend = chartPlan.buckets.map((b) => ({ label: b.label, value: orderCountByBucket.get(b.key) ?? 0 }));
    revenueTrend = chartPlan.buckets.map((b) => ({ label: b.label, value: revenueByBucket.get(b.key) ?? 0 }));
  }

  const periodOrderCount = periodStats?.value ?? 0;
  const periodRevenue = Number(periodStats?.revenue ?? 0);
  const chartTitle = hasExplicitPeriod ? periodRange.label : "Son 6 Ay";

  // Ürün başına toplam adet + ciro — kategori/marka bilgisiyle birlikte.
  const productTotals = new Map<
    string,
    { productName: string; brandName: string; categoryName: string; quantity: number; revenue: number }
  >();
  for (const row of topProductRows) {
    const quantity = Number(row.quantity);
    const revenue = Number(row.lineTotal) + Number(row.vatAmount);
    const existing = productTotals.get(row.productId);
    if (existing) {
      existing.quantity += quantity;
      existing.revenue += revenue;
    } else {
      productTotals.set(row.productId, {
        productName: row.productName,
        brandName: row.brandName,
        categoryName: row.categoryName ?? "Kategorisiz",
        quantity,
        revenue,
      });
    }
  }
  const topProductsByQuantity = [...productTotals.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 8);
  const topProductsByRevenue = [...productTotals.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8);

  // Bayi başına sipariş sayısı ve toplam tutar — en çok sipariş geçenden aza.
  const dealerTotals = new Map<
    string,
    { dealerName: string; brandName: string; orderCount: number; totalAmount: number }
  >();
  for (const row of topDealerOrderRows) {
    const existing = dealerTotals.get(row.dealerId);
    if (existing) {
      existing.orderCount += 1;
      existing.totalAmount += Number(row.totalAmount);
    } else {
      dealerTotals.set(row.dealerId, {
        dealerName: row.dealerName,
        brandName: row.brandName,
        orderCount: 1,
        totalAmount: Number(row.totalAmount),
      });
    }
  }
  const topDealersByOrderCount = [...dealerTotals.values()]
    .sort((a, b) => b.orderCount - a.orderCount || b.totalAmount - a.totalAmount)
    .slice(0, 10);
  const topDealersByRevenue = [...dealerTotals.values()]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 10);

  const stats = [
    { label: "Bayiler", value: formatNumber(dealerCount.value), icon: Building2, tone: "success" as const },
    { label: "Ürünler", value: formatNumber(productCount.value), icon: Package, tone: "warning" as const },
    {
      label: `${periodRange.label} Sipariş Sayısı`,
      value: formatNumber(periodOrderCount),
      icon: ClipboardList,
      tone: "info" as const,
    },
    { label: `${periodRange.label} Ciro`, value: formatCurrency(periodRevenue), icon: TrendingUp, tone: "success" as const },
    {
      label: "Toplam Cari Alacak",
      value: formatCurrency(Number(balanceTotal.value ?? 0)),
      icon: Wallet,
      tone: "danger" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Hoş geldiniz, {session.user.email}</h1>
        <p className="text-sm text-ink-400">{ROLE_DESCRIPTIONS[session.user.role]}</p>
      </div>

      <div className={CARD}>
        <PeriodFilter
          period={hasExplicitPeriod ? period : ""}
          start={startParam ?? ""}
          end={endParam ?? ""}
          rightSlot={<ByBrandToggle checked={byBrand} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">{chartTitle} Sipariş Sayısı</h2>
          <div className="mt-6">
            {byBrand ? (
              <GroupedBarChart data={orderCountTrendGrouped} series={brandSeries} format="number" />
            ) : (
              <BarChart data={orderCountTrend} format="number" />
            )}
          </div>
        </div>
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">{chartTitle} Ciro</h2>
          <div className="mt-6">
            {byBrand ? (
              <GroupedBarChart data={revenueTrendGrouped} series={brandSeries} format="currency" />
            ) : (
              <BarChart data={revenueTrend} format="currency" color="bg-purple-fg" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <TopListsBrandFilter brands={companyBrands} selectedId={productBrandFilter ?? ""} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={CARD}>
            <h2 className="text-sm font-medium text-ink-900">Bu Ay En Çok Sipariş Geçen Bayiler</h2>
            {topDealersByOrderCount.length === 0 ? (
              <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş verilmedi.</p>
            ) : (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className={TABLE_HEAD}>
                    <th className="pb-2">Bayi</th>
                    <th className="pb-2">Marka</th>
                    <th className="pb-2 text-right">Sipariş Sayısı</th>
                    <th className="pb-2 text-right">Toplam Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  {topDealersByOrderCount.map((d) => (
                    <tr key={d.dealerName + d.brandName} className={TABLE_ROW}>
                      <td className="py-3 font-medium text-ink-900">{d.dealerName}</td>
                      <td className="py-3 text-ink-400">{d.brandName}</td>
                      <td className="py-3 text-right text-ink-600">{formatNumber(d.orderCount)}</td>
                      <td className="py-3 text-right text-ink-600">{formatCurrency(d.totalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={CARD}>
            <h2 className="text-sm font-medium text-ink-900">Bu Ay En Çok Ciro Yapan Bayiler</h2>
            {topDealersByRevenue.length === 0 ? (
              <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş verilmedi.</p>
            ) : (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className={TABLE_HEAD}>
                    <th className="pb-2">Bayi</th>
                    <th className="pb-2">Marka</th>
                    <th className="pb-2 text-right">Sipariş Sayısı</th>
                    <th className="pb-2 text-right">Toplam Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  {topDealersByRevenue.map((d) => (
                    <tr key={d.dealerName + d.brandName} className={TABLE_ROW}>
                      <td className="py-3 font-medium text-ink-900">{d.dealerName}</td>
                      <td className="py-3 text-ink-400">{d.brandName}</td>
                      <td className="py-3 text-right text-ink-600">{formatNumber(d.orderCount)}</td>
                      <td className="py-3 text-right text-ink-600">{formatCurrency(d.totalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className={CARD}>
            <h2 className="text-sm font-medium text-ink-900">Bu Ay En Çok Sipariş Edilen Ürünler</h2>
            {topProductsByQuantity.length === 0 ? (
              <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş verilmedi.</p>
            ) : (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className={TABLE_HEAD}>
                    <th className="pb-2">Ürün</th>
                    <th className="pb-2">Marka</th>
                    <th className="pb-2 text-right">Adet</th>
                  </tr>
                </thead>
                <tbody>
                  {topProductsByQuantity.map((p) => (
                    <tr key={p.productName + p.brandName} className={TABLE_ROW}>
                      <td className="py-3 font-medium text-ink-900">{p.productName}</td>
                      <td className="py-3 text-ink-400">{p.brandName}</td>
                      <td className="py-3 text-right text-ink-600">{formatNumber(p.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={CARD}>
            <h2 className="text-sm font-medium text-ink-900">Bu Ay En Çok Ciro Yapan Ürünler</h2>
            {topProductsByRevenue.length === 0 ? (
              <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş verilmedi.</p>
            ) : (
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className={TABLE_HEAD}>
                    <th className="pb-2">Ürün</th>
                    <th className="pb-2">Marka</th>
                    <th className="pb-2 text-right">Ciro</th>
                  </tr>
                </thead>
                <tbody>
                  {topProductsByRevenue.map((p) => (
                    <tr key={p.productName + p.brandName} className={TABLE_ROW}>
                      <td className="py-3 font-medium text-ink-900">{p.productName}</td>
                      <td className="py-3 text-ink-400">{p.brandName}</td>
                      <td className="py-3 text-right text-ink-600">{formatCurrency(p.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  company_admin: "Firma genelindeki tüm markaları ve bayileri yönetebilirsiniz.",
  brand_manager: "Markalara ait katalog ve bayi ayarlarını yönetebilirsiniz.",
};
