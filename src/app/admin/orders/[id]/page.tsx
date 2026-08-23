import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { Download } from "lucide-react";
import { db } from "@/db";
import {
  brands,
  categories,
  dealers,
  orderItems,
  orderStatusHistory,
  orders,
  products,
  users,
} from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { CARD, TABLE_HEAD, TABLE_ROW, BUTTON_PRIMARY, badgeClass } from "@/lib/ui";
import { ORDER_STATUS_LABELS, ORDER_STATUS_TONES, nextOrderStatuses, type OrderStatus } from "@/lib/order-status";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { CategoryGroupList } from "@/components/category-group-list";
import { deleteOrder } from "../actions";
import { StatusTransitionActions } from "./status-actions";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireAdminSession();

  const [row] = await db
    .select({
      id: orders.id,
      status: orders.status,
      subtotalAmount: orders.subtotalAmount,
      vatAmount: orders.vatAmount,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      dealerId: dealers.id,
      dealerName: dealers.name,
      brandId: brands.id,
      brandName: brands.name,
      brandCompanyId: brands.companyId,
      paymentMethod: orders.paymentMethod,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .innerJoin(dealers, eq(orders.dealerId, dealers.id))
    .where(eq(orders.id, id))
    .limit(1);

  if (!row || row.brandCompanyId !== session.user.companyId) notFound();

  const [items, history, brandCategories] = await Promise.all([
    db
      .select({
        id: orderItems.id,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
        lineTotal: orderItems.lineTotal,
        productName: products.name,
        productSku: products.sku,
        productUnit: products.unit,
        categoryId: products.categoryId,
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
        changedByEmail: users.email,
      })
      .from(orderStatusHistory)
      .leftJoin(users, eq(orderStatusHistory.changedBy, users.id))
      .where(eq(orderStatusHistory.orderId, id))
      .orderBy(asc(orderStatusHistory.createdAt)),
    db.select().from(categories).where(eq(categories.brandId, row.brandId)),
  ]);

  const possibleNextStatuses = nextOrderStatuses(row.paymentMethod, row.status);
  const dateFormatter = new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">{row.dealerName}</h1>
          <p className="text-sm text-ink-400">
            {row.brandName} — {PAYMENT_METHOD_LABELS[row.paymentMethod]} — {dateFormatter.format(row.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={badgeClass(ORDER_STATUS_TONES[row.status as OrderStatus])}>
            {ORDER_STATUS_LABELS[row.status as OrderStatus] ?? row.status}
          </span>
          <a href={`/admin/orders/${row.id}/document`} className={BUTTON_PRIMARY}>
            <Download className="mr-2 h-4 w-4" strokeWidth={2} />
            Sipariş Dökümanını İndir
          </a>
          <ConfirmDeleteButton
            action={deleteOrder.bind(null, row.id)}
            confirmLabel="Kalıcı olarak sil?"
            successMessage="Sipariş silindi"
            redirectTo="/admin/orders"
          />
        </div>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Kalemler</h2>
        <CategoryGroupList
          items={items}
          categories={brandCategories}
          headingSize="compact"
          renderItems={(catItems) => (
            <table className="w-full text-sm">
              <thead>
                <tr className={TABLE_HEAD}>
                  <th className="pb-2 font-medium">Ürün</th>
                  <th className="pb-2 font-medium">SKU</th>
                  <th className="pb-2 font-medium">Miktar</th>
                  <th className="pb-2 font-medium">Birim Fiyat</th>
                  <th className="pb-2 font-medium">Tutar</th>
                </tr>
              </thead>
              <tbody>
                {catItems.map((item) => (
                  <tr key={item.id} className={TABLE_ROW}>
                    <td className="py-2 font-medium text-ink-900">{item.productName}</td>
                    <td className="py-2 text-ink-400">{item.productSku}</td>
                    <td className="py-2 text-ink-600">
                      {item.quantity} {item.productUnit}
                    </td>
                    <td className="py-2 text-ink-600">{item.unitPrice}</td>
                    <td className="py-2 text-ink-900">{item.lineTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        />
        <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3 text-sm">
          <div className="flex items-center justify-between text-ink-600">
            <span>Ara Toplam</span>
            <span>{row.subtotalAmount}</span>
          </div>
          <div className="flex items-center justify-between text-ink-600">
            <span>KDV</span>
            <span>{row.vatAmount}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="font-medium text-ink-900">Genel Toplam</span>
            <span className="text-lg font-semibold text-ink-900">{row.totalAmount}</span>
          </div>
        </div>
      </div>

      {possibleNextStatuses.length > 0 && (
        <div className={CARD}>
          <h2 className="mb-3 text-sm font-semibold text-ink-900">Durum Güncelle</h2>
          <StatusTransitionActions orderId={row.id} statuses={possibleNextStatuses} />
        </div>
      )}

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Durum Geçmişi</h2>
        <ul className="flex flex-col gap-3">
          {history.map((entry) => (
            <li key={entry.id} className="flex items-start justify-between gap-4 text-sm">
              <div>
                <p className="text-ink-900">
                  {entry.fromStatus ? (
                    <>
                      {ORDER_STATUS_LABELS[entry.fromStatus as OrderStatus] ?? entry.fromStatus} →{" "}
                    </>
                  ) : null}
                  <span className="font-medium">
                    {ORDER_STATUS_LABELS[entry.toStatus as OrderStatus] ?? entry.toStatus}
                  </span>
                </p>
                {entry.note && <p className="text-xs text-ink-400">{entry.note}</p>}
                <p className="text-xs text-ink-400">
                  {entry.changedByEmail ?? "Sistem"} — {dateFormatter.format(entry.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
