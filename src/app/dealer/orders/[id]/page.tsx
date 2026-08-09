import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, orderItems, orderStatusHistory, orders, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW, badgeClass } from "@/lib/ui";
import { ORDER_STATUS_LABELS, ORDER_STATUS_TONES, type OrderStatus } from "@/lib/order-status";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";

export default async function DealerOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const [row] = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      dealerId: orders.dealerId,
      brandName: brands.name,
      paymentMethod: orders.paymentMethod,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.id, id))
    .limit(1);

  if (!row || row.dealerId !== dealerId) notFound();

  const [items, history] = await Promise.all([
    db
      .select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
        lineTotal: orderItems.lineTotal,
        productName: products.name,
        productSku: products.sku,
        productUnit: products.unit,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id)),
    db
      .select({
        id: orderStatusHistory.id,
        fromStatus: orderStatusHistory.fromStatus,
        toStatus: orderStatusHistory.toStatus,
        note: orderStatusHistory.note,
        createdAt: orderStatusHistory.createdAt,
      })
      .from(orderStatusHistory)
      .where(eq(orderStatusHistory.orderId, id))
      .orderBy(asc(orderStatusHistory.createdAt)),
  ]);

  const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">{row.brandName}</h1>
          <p className="text-sm text-ink-400">
            {PAYMENT_METHOD_LABELS[row.paymentMethod]} — {dateFormatter.format(row.createdAt)}
          </p>
        </div>
        <span className={badgeClass(ORDER_STATUS_TONES[row.status as OrderStatus])}>
          {ORDER_STATUS_LABELS[row.status as OrderStatus] ?? row.status}
        </span>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Kalemler</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className={TABLE_HEAD}>
              <th className="pb-2 font-medium">Ürün</th>
              <th className="pb-2 font-medium">Miktar</th>
              <th className="pb-2 font-medium">Birim Fiyat</th>
              <th className="pb-2 font-medium">Tutar</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={TABLE_ROW}>
                <td className="py-2 font-medium text-ink-900">{item.productName}</td>
                <td className="py-2 text-ink-600">
                  {item.quantity} {item.productUnit}
                </td>
                <td className="py-2 text-ink-600">{item.unitPrice}</td>
                <td className="py-2 text-ink-900">{item.lineTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-medium text-ink-900">Toplam</span>
          <span className="text-lg font-semibold text-ink-900">{row.totalAmount}</span>
        </div>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Durum Geçmişi</h2>
        <ul className="flex flex-col gap-3">
          {history.map((entry) => (
            <li key={entry.id} className="text-sm">
              <p className="text-ink-900">
                {entry.fromStatus ? (
                  <>{ORDER_STATUS_LABELS[entry.fromStatus as OrderStatus] ?? entry.fromStatus} → </>
                ) : null}
                <span className="font-medium">
                  {ORDER_STATUS_LABELS[entry.toStatus as OrderStatus] ?? entry.toStatus}
                </span>
              </p>
              {entry.note && <p className="text-xs text-ink-400">{entry.note}</p>}
              <p className="text-xs text-ink-400">{dateFormatter.format(entry.createdAt)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
