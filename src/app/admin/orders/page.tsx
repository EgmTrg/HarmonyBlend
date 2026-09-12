import Link from "next/link";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { Download } from "lucide-react";
import { db } from "@/db";
import { brands, dealers, orders } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW, BUTTON_PRIMARY, badgeClass } from "@/lib/ui";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TONES,
  nextOrderStatuses,
  type OrderStatus,
} from "@/lib/order-status";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { resolvePeriodRange, type PeriodKey } from "@/lib/date-range";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { PeriodFilter } from "@/components/period-filter";
import { OrderQuickActions } from "./order-quick-actions";
import { OrderFilters } from "./order-filters";
import { deleteOrder } from "./actions";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; status?: string; period?: string; start?: string; end?: string }>;
}) {
  const session = await requireAdminSession();
  const {
    brand: brandFilter,
    status: statusFilter,
    period: periodParam,
    start: startParam,
    end: endParam,
  } = await searchParams;

  const companyBrands = await db
    .select()
    .from(brands)
    .where(eq(brands.companyId, session.user.companyId))
    .orderBy(brands.name);

  const hasExplicitPeriod = (["today", "week", "month", "last_month", "custom"] as PeriodKey[]).includes(
    periodParam as PeriodKey
  );
  const periodRange = hasExplicitPeriod ? resolvePeriodRange(periodParam as PeriodKey, startParam, endParam) : null;

  const conditions = [eq(brands.companyId, session.user.companyId)];
  if (brandFilter) conditions.push(eq(orders.brandId, brandFilter));
  if (statusFilter) conditions.push(eq(orders.status, statusFilter));
  if (periodRange) {
    conditions.push(gte(orders.createdAt, periodRange.start));
    conditions.push(lt(orders.createdAt, periodRange.end));
  }

  const rows = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      dealerName: dealers.name,
      brandName: brands.name,
      paymentMethod: orders.paymentMethod,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .innerJoin(dealers, eq(orders.dealerId, dealers.id))
    .where(and(...conditions))
    .orderBy(desc(orders.createdAt));

  const documentExportParams = new URLSearchParams();
  if (brandFilter) documentExportParams.set("brand", brandFilter);
  if (statusFilter) documentExportParams.set("status", statusFilter);
  if (hasExplicitPeriod) {
    documentExportParams.set("period", periodParam as PeriodKey);
    if (startParam) documentExportParams.set("start", startParam);
    if (endParam) documentExportParams.set("end", endParam);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Siparişler</h1>
          <p className="text-sm text-ink-400">Gelen siparişleri görüntüleyin ve durumlarını yönetin.</p>
        </div>
        <a href={`/admin/orders/document?${documentExportParams.toString()}`} className={BUTTON_PRIMARY}>
          <Download className="mr-2 h-4 w-4" strokeWidth={2} />
          PDF Olarak İndir
        </a>
      </div>

      <div className={CARD}>
        <div className="flex flex-col gap-4">
          <PeriodFilter period={hasExplicitPeriod ? (periodParam as PeriodKey) : ""} start={startParam ?? ""} end={endParam ?? ""} />
          <OrderFilters
            companyBrands={companyBrands}
            initialBrand={brandFilter ?? ""}
            initialStatus={statusFilter ?? ""}
          />
        </div>
      </div>

      <div className={CARD}>
        <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className={TABLE_HEAD}>
              <th className="pb-3 font-medium">Bayi</th>
              <th className="pb-3 font-medium">Marka</th>
              <th className="pb-3 font-medium">Ödeme Tipi</th>
              <th className="pb-3 font-medium">Toplam</th>
              <th className="pb-3 font-medium">Durum</th>
              <th className="pb-3 font-medium">Tarih</th>
              <th className="pb-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={TABLE_ROW}>
                <td className="py-3">
                  <Link href={`/admin/orders/${row.id}`} className="font-medium text-ink-900 hover:text-accent-600">
                    {row.dealerName}
                  </Link>
                </td>
                <td className="py-3 text-ink-400">{row.brandName}</td>
                <td className="py-3 text-ink-400">{PAYMENT_METHOD_LABELS[row.paymentMethod]}</td>
                <td className="py-3 text-ink-600">{row.totalAmount}</td>
                <td className="py-3">
                  <span className={badgeClass(ORDER_STATUS_TONES[row.status as OrderStatus])}>
                    {ORDER_STATUS_LABELS[row.status as OrderStatus] ?? row.status}
                  </span>
                </td>
                <td className="py-3 text-ink-400">
                  {new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(
                    row.createdAt
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-3">
                    <a
                      href={`/admin/orders/${row.id}/document`}
                      title="Dökümanı indir"
                      className="text-ink-400 transition hover:text-accent-600"
                    >
                      <Download className="h-4 w-4" strokeWidth={2} />
                    </a>
                    <OrderQuickActions
                      orderId={row.id}
                      statuses={nextOrderStatuses(row.paymentMethod, row.status)}
                    />
                    <ConfirmDeleteButton
                      action={deleteOrder.bind(null, row.id)}
                      confirmLabel="Kalıcı olarak sil?"
                      successMessage="Sipariş silindi"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-ink-400">
                  Kayıtlı sipariş yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
