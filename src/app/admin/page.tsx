import { Building2, ClipboardList, Package, TrendingUp, Wallet } from "lucide-react";
import { and, count, eq, gte, notInArray, sum } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, dealers, orderItems, orders, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { EXCLUDED_FROM_STATS_STATUSES } from "@/lib/order-status";
import { lastNMonths, monthKey, startOfCurrentMonth } from "@/lib/month-range";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CARD, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { StatTile } from "@/components/stat-tile";
import { BarChart } from "@/components/bar-chart";

export default async function AdminHomePage() {
  const session = await requireAdminSession();
  const companyId = session.user.companyId;

  const months = lastNMonths(6);
  const rangeStart = months[0].start;
  const thisMonthStart = startOfCurrentMonth();

  const [[dealerCount], [productCount], [balanceTotal], trendRows, topProductRows] =
    await Promise.all([
      db.select({ value: count() }).from(dealers).where(eq(dealers.companyId, companyId)),
      db
        .select({ value: count() })
        .from(products)
        .innerJoin(brands, eq(products.brandId, brands.id))
        .where(eq(brands.companyId, companyId)),
      db.select({ value: sum(dealers.currentBalance) }).from(dealers).where(eq(dealers.companyId, companyId)),
      db
        .select({ createdAt: orders.createdAt, totalAmount: orders.totalAmount })
        .from(orders)
        .innerJoin(brands, eq(orders.brandId, brands.id))
        .where(
          and(
            eq(brands.companyId, companyId),
            gte(orders.createdAt, rangeStart),
            notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
          )
        ),
      db
        .select({
          productId: products.id,
          productName: products.name,
          brandName: brands.name,
          categoryName: categories.name,
          quantity: orderItems.quantity,
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
            notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
          )
        ),
    ]);

  // Ay bazlı trend: hazır ay kovalarını (bucket) sipariş satırlarıyla dolduruyoruz.
  const orderCountByMonth = new Map(months.map((m) => [m.key, 0]));
  const revenueByMonth = new Map(months.map((m) => [m.key, 0]));
  for (const row of trendRows) {
    const key = monthKey(row.createdAt);
    if (!orderCountByMonth.has(key)) continue;
    orderCountByMonth.set(key, (orderCountByMonth.get(key) ?? 0) + 1);
    revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + Number(row.totalAmount));
  }

  const orderCountTrend = months.map((m) => ({ label: m.label, value: orderCountByMonth.get(m.key) ?? 0 }));
  const revenueTrend = months.map((m) => ({ label: m.label, value: revenueByMonth.get(m.key) ?? 0 }));

  const currentMonthKey = months[months.length - 1].key;
  const thisMonthOrderCount = orderCountByMonth.get(currentMonthKey) ?? 0;
  const thisMonthRevenue = revenueByMonth.get(currentMonthKey) ?? 0;

  // Ürün başına toplam adet — kategori/marka bilgisiyle birlikte, en çoktan aza.
  const productTotals = new Map<
    string,
    { productName: string; brandName: string; categoryName: string; quantity: number }
  >();
  for (const row of topProductRows) {
    const quantity = Number(row.quantity);
    const existing = productTotals.get(row.productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      productTotals.set(row.productId, {
        productName: row.productName,
        brandName: row.brandName,
        categoryName: row.categoryName ?? "Kategorisiz",
        quantity,
      });
    }
  }
  const topProducts = [...productTotals.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 8);

  const stats = [
    { label: "Bayiler", value: formatNumber(dealerCount.value), icon: Building2, tone: "success" as const },
    { label: "Ürünler", value: formatNumber(productCount.value), icon: Package, tone: "warning" as const },
    {
      label: "Bu Ay Sipariş Sayısı",
      value: formatNumber(thisMonthOrderCount),
      icon: ClipboardList,
      tone: "info" as const,
    },
    { label: "Bu Ay Ciro", value: formatCurrency(thisMonthRevenue), icon: TrendingUp, tone: "success" as const },
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">Son 6 Ay Sipariş Sayısı</h2>
          <div className="mt-6">
            <BarChart data={orderCountTrend} format="number" />
          </div>
        </div>
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">Son 6 Ay Ciro</h2>
          <div className="mt-6">
            <BarChart data={revenueTrend} format="currency" color="bg-purple-fg" />
          </div>
        </div>
      </div>

      <div className={CARD}>
        <h2 className="text-sm font-medium text-ink-900">Bu Ay En Çok Sipariş Edilen Ürünler</h2>
        {topProducts.length === 0 ? (
          <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş verilmedi.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2">Ürün</th>
                <th className="pb-2">Marka</th>
                <th className="pb-2">Kategori</th>
                <th className="pb-2 text-right">Adet</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.productName + p.brandName} className={TABLE_ROW}>
                  <td className="py-3 font-medium text-ink-900">{p.productName}</td>
                  <td className="py-3 text-ink-400">{p.brandName}</td>
                  <td className="py-3 text-ink-400">{p.categoryName}</td>
                  <td className="py-3 text-right text-ink-600">{formatNumber(p.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const ROLE_DESCRIPTIONS: Record<string, string> = {
  company_admin: "Firma genelindeki tüm markaları ve bayileri yönetebilirsiniz.",
  brand_manager: "Markalara ait katalog ve bayi ayarlarını yönetebilirsiniz.",
};
