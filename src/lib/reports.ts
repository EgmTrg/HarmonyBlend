import { and, eq, gte, lt, notInArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealers, orders } from "@/db/schema";
import { EXCLUDED_FROM_STATS_STATUSES } from "@/lib/order-status";
import type { PeriodRange } from "@/lib/date-range";

export interface BrandSalesRow {
  brandId: string;
  brandName: string;
  orderCount: number;
  revenue: number;
}

// Seçili dönemde marka bazlı sipariş sayısı ve ciro — iptal/red hariç
// (bkz. EXCLUDED_FROM_STATS_STATUSES), genel bakış istatistikleriyle aynı kural.
export async function getBrandSalesReport(
  companyId: string,
  periodRange: PeriodRange,
  brandId?: string
): Promise<BrandSalesRow[]> {
  const rows = await db
    .select({
      brandId: orders.brandId,
      brandName: brands.name,
      totalAmount: orders.totalAmount,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(
      and(
        eq(brands.companyId, companyId),
        gte(orders.createdAt, periodRange.start),
        lt(orders.createdAt, periodRange.end),
        notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES),
        brandId ? eq(brands.id, brandId) : undefined
      )
    );

  const totals = new Map<string, BrandSalesRow>();
  for (const row of rows) {
    const existing = totals.get(row.brandId);
    if (existing) {
      existing.orderCount += 1;
      existing.revenue += Number(row.totalAmount);
    } else {
      totals.set(row.brandId, {
        brandId: row.brandId,
        brandName: row.brandName,
        orderCount: 1,
        revenue: Number(row.totalAmount),
      });
    }
  }
  return [...totals.values()].sort((a, b) => b.revenue - a.revenue);
}

export interface InactiveDealerRow {
  dealerId: string;
  dealerName: string;
  brandNames: string;
  lastOrderAt: Date | null;
  daysSinceLastOrder: number | null;
}

// thresholdDays gündür sipariş vermeyen (ya da hiç sipariş vermemiş) bayiler
// — iptal/red edilmiş siparişler "sipariş verdi" sayılmaz.
export async function getInactiveDealersReport(
  companyId: string,
  thresholdDays: number,
  reference = new Date()
): Promise<InactiveDealerRow[]> {
  const [companyDealers, dealerOrderRows, dealerBrandRows] = await Promise.all([
    db.select({ id: dealers.id, name: dealers.name }).from(dealers).where(eq(dealers.companyId, companyId)),
    db
      .select({ dealerId: orders.dealerId, createdAt: orders.createdAt })
      .from(orders)
      .innerJoin(brands, eq(orders.brandId, brands.id))
      .where(and(eq(brands.companyId, companyId), notInArray(orders.status, EXCLUDED_FROM_STATS_STATUSES))),
    db
      .select({ dealerId: dealerBrands.dealerId, brandName: brands.name })
      .from(dealerBrands)
      .innerJoin(brands, eq(dealerBrands.brandId, brands.id))
      .where(and(eq(brands.companyId, companyId), eq(dealerBrands.isActive, true))),
  ]);

  const lastOrderByDealer = new Map<string, Date>();
  for (const row of dealerOrderRows) {
    const current = lastOrderByDealer.get(row.dealerId);
    if (!current || row.createdAt > current) lastOrderByDealer.set(row.dealerId, row.createdAt);
  }

  const brandsByDealer = new Map<string, string[]>();
  for (const row of dealerBrandRows) {
    const list = brandsByDealer.get(row.dealerId) ?? [];
    list.push(row.brandName);
    brandsByDealer.set(row.dealerId, list);
  }

  const msPerDay = 86_400_000;
  const result: InactiveDealerRow[] = [];
  for (const dealer of companyDealers) {
    const lastOrderAt = lastOrderByDealer.get(dealer.id) ?? null;
    const daysSinceLastOrder = lastOrderAt
      ? Math.floor((reference.getTime() - lastOrderAt.getTime()) / msPerDay)
      : null;
    const isInactive = daysSinceLastOrder === null || daysSinceLastOrder >= thresholdDays;
    if (!isInactive) continue;
    result.push({
      dealerId: dealer.id,
      dealerName: dealer.name,
      brandNames: (brandsByDealer.get(dealer.id) ?? []).sort().join(", ") || "—",
      lastOrderAt,
      daysSinceLastOrder,
    });
  }

  return result.sort((a, b) => (b.daysSinceLastOrder ?? Infinity) - (a.daysSinceLastOrder ?? Infinity));
}
