import { ClipboardList, ShoppingBasket, TrendingUp, Wallet } from "lucide-react";
import { and, eq, gte, notInArray } from "drizzle-orm";
import { db } from "@/db";
import { categories, dealers, orderItems, orders, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { EXCLUDED_FROM_STATS_STATUSES } from "@/lib/order-status";
import { lastNMonths, monthKey, startOfCurrentMonth } from "@/lib/month-range";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CARD, TABLE_HEAD, TABLE_ROW } from "@/lib/ui";
import { StatTile } from "@/components/stat-tile";
import { BarChart } from "@/components/bar-chart";

export default async function DealerHomePage() {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const months = lastNMonths(6);
  const rangeStart = months[0].start;
  const thisMonthStart = startOfCurrentMonth();

  const [[dealer], trendRows, topProductRows] = await Promise.all([
    db.select().from(dealers).where(eq(dealers.id, dealerId)).limit(1),
    db
      .select({ createdAt: orders.createdAt, totalAmount: orders.totalAmount })
      .from(orders)
      .where(
        and(
          eq(orders.dealerId, dealerId),
          gte(orders.createdAt, rangeStart),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
        )
      ),
    db
      .select({
        productId: products.id,
        productName: products.name,
        categoryId: products.categoryId,
        categoryName: categories.name,
        quantity: orderItems.quantity,
      })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .innerJoin(products, eq(orderItems.productId, products.id))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(
        and(
          eq(orders.dealerId, dealerId),
          gte(orders.createdAt, thisMonthStart),
          notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES)
        )
      ),
  ]);

  // Ay bazlı trend: hazır ay kovalarını sipariş satırlarıyla dolduruyoruz.
  const orderCountByMonth = new Map(months.map((m) => [m.key, 0]));
  const totalByMonth = new Map(months.map((m) => [m.key, 0]));
  for (const row of trendRows) {
    const key = monthKey(row.createdAt);
    if (!orderCountByMonth.has(key)) continue;
    orderCountByMonth.set(key, (orderCountByMonth.get(key) ?? 0) + 1);
    totalByMonth.set(key, (totalByMonth.get(key) ?? 0) + Number(row.totalAmount));
  }

  const orderCountTrend = months.map((m) => ({ label: m.label, value: orderCountByMonth.get(m.key) ?? 0 }));
  const totalTrend = months.map((m) => ({ label: m.label, value: totalByMonth.get(m.key) ?? 0 }));

  const currentMonthKey = months[months.length - 1].key;
  const thisMonthOrderCount = orderCountByMonth.get(currentMonthKey) ?? 0;
  const thisMonthTotal = totalByMonth.get(currentMonthKey) ?? 0;

  // Kategori başına en çok sipariş edilen ürün ve adeti — her kategori için
  // ürün bazında toplam adedi hesaplayıp en yükseği seçiyoruz.
  const productsByCategory = new Map<string, Map<string, { productName: string; quantity: number }>>();
  const categoryNames = new Map<string, string>();
  for (const row of topProductRows) {
    const catKey = row.categoryId ?? "none";
    categoryNames.set(catKey, row.categoryName ?? "Kategorisiz");
    const productMap = productsByCategory.get(catKey) ?? new Map();
    const quantity = Number(row.quantity);
    const existing = productMap.get(row.productId);
    if (existing) existing.quantity += quantity;
    else productMap.set(row.productId, { productName: row.productName, quantity });
    productsByCategory.set(catKey, productMap);
  }
  const topProductByCategory = [...productsByCategory.entries()]
    .map(([catKey, productMap]) => {
      const ranked = [...productMap.values()].sort((a, b) => b.quantity - a.quantity);
      const categoryTotal = ranked.reduce((sum, p) => sum + p.quantity, 0);
      return {
        categoryName: categoryNames.get(catKey)!,
        topProductName: ranked[0].productName,
        topProductQuantity: ranked[0].quantity,
        categoryTotal,
      };
    })
    .sort((a, b) => b.categoryTotal - a.categoryTotal)
    .slice(0, 8);

  const currentBalance = Number(dealer?.currentBalance ?? 0);
  const maxLimit = dealer?.maxBalanceLimit != null ? Number(dealer.maxBalanceLimit) : null;
  const remainingLimit = maxLimit != null ? maxLimit - currentBalance : null;

  const stats = [
    {
      label: "Bu Ay Sipariş Sayım",
      value: formatNumber(thisMonthOrderCount),
      icon: ClipboardList,
      tone: "info" as const,
    },
    {
      label: "Bu Ay Sipariş Tutarım",
      value: formatCurrency(thisMonthTotal),
      icon: TrendingUp,
      tone: "success" as const,
    },
    {
      label: "Cari Bakiyem",
      value: formatCurrency(currentBalance),
      icon: Wallet,
      tone: currentBalance > 0 ? ("warning" as const) : ("success" as const),
    },
    {
      label: "Kalan Cari Limitim",
      value: remainingLimit != null ? formatCurrency(remainingLimit) : "Sınırsız",
      icon: ShoppingBasket,
      tone: "purple" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Hoş geldiniz, {session.user.email}</h1>
        <p className="text-sm text-ink-400">İşletmenize ait sipariş ve cari özetiniz aşağıda.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">Son 6 Ay Sipariş Sayım</h2>
          <div className="mt-6">
            <BarChart data={orderCountTrend} format="number" />
          </div>
        </div>
        <div className={CARD}>
          <h2 className="text-sm font-medium text-ink-900">Son 6 Ay Sipariş Tutarım</h2>
          <div className="mt-6">
            <BarChart data={totalTrend} format="currency" color="bg-purple-fg" />
          </div>
        </div>
      </div>

      <div className={CARD}>
        <h2 className="text-sm font-medium text-ink-900">Kategoriye Göre En Çok Sipariş Verdiğim Ürünler</h2>
        <p className="text-xs text-ink-400">Bu ay içindeki siparişlerinize göre.</p>
        {topProductByCategory.length === 0 ? (
          <p className="mt-4 text-sm text-ink-400">Bu ay henüz sipariş vermediniz.</p>
        ) : (
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2">Kategori</th>
                <th className="pb-2">En Çok Sipariş Edilen Ürün</th>
                <th className="pb-2 text-right">Adet</th>
              </tr>
            </thead>
            <tbody>
              {topProductByCategory.map((row) => (
                <tr key={row.categoryName} className={TABLE_ROW}>
                  <td className="py-3 font-medium text-ink-900">{row.categoryName}</td>
                  <td className="py-3 text-ink-400">{row.topProductName}</td>
                  <td className="py-3 text-right text-ink-600">{formatNumber(row.topProductQuantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
