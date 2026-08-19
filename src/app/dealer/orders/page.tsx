import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, orders } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW, badgeClass } from "@/lib/ui";
import { canTransitionOrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_TONES, type OrderStatus } from "@/lib/order-status";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { ReorderButton } from "./reorder-button";
import { CancelOrderButton } from "./cancel-order-button";

export default async function DealerOrdersPage() {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const rows = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      brandName: brands.name,
      paymentMethod: orders.paymentMethod,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.dealerId, dealerId))
    .orderBy(desc(orders.createdAt));

  const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Siparişlerim</h1>
        <p className="text-sm text-ink-400">Geçmiş ve aktif siparişlerinizin durumu.</p>
      </div>

      <div className={CARD}>
        <table className="w-full text-sm">
          <thead>
            <tr className={TABLE_HEAD}>
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
                  <Link href={`/dealer/orders/${row.id}`} className="font-medium text-ink-900 hover:text-accent-600">
                    {row.brandName}
                  </Link>
                </td>
                <td className="py-3 text-ink-400">{PAYMENT_METHOD_LABELS[row.paymentMethod]}</td>
                <td className="py-3 text-ink-600">{row.totalAmount}</td>
                <td className="py-3">
                  <span className={badgeClass(ORDER_STATUS_TONES[row.status as OrderStatus])}>
                    {ORDER_STATUS_LABELS[row.status as OrderStatus] ?? row.status}
                  </span>
                </td>
                <td className="py-3 text-ink-400">{dateFormatter.format(row.createdAt)}</td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <ReorderButton orderId={row.id} />
                    {canTransitionOrderStatus(row.paymentMethod, row.status, "cancelled") && (
                      <CancelOrderButton orderId={row.id} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-ink-400">
                  Henüz sipariş vermediniz.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
