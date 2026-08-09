import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealers, orders } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { CARD, INPUT, LABEL, TABLE_HEAD, TABLE_ROW, badgeClass } from "@/lib/ui";
import { ORDER_STATUS_LABELS, ORDER_STATUS_TONES, type OrderStatus } from "@/lib/order-status";
import { PAYMENT_METHOD_LABELS } from "@/lib/payment-methods";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { deleteOrder } from "./actions";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; status?: string }>;
}) {
  const session = await requireAdminSession();
  const { brand: brandFilter, status: statusFilter } = await searchParams;

  const companyBrands = await db
    .select()
    .from(brands)
    .where(eq(brands.companyId, session.user.companyId))
    .orderBy(brands.name);

  const conditions = [eq(brands.companyId, session.user.companyId)];
  if (brandFilter) conditions.push(eq(orders.brandId, brandFilter));
  if (statusFilter) conditions.push(eq(orders.status, statusFilter));

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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Siparişler</h1>
        <p className="text-sm text-ink-400">Gelen siparişleri görüntüleyin ve durumlarını yönetin.</p>
      </div>

      <div className={CARD}>
        <form className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="brand" className={LABEL}>
              Marka
            </label>
            <select id="brand" name="brand" defaultValue={brandFilter ?? ""} className={INPUT}>
              <option value="">Tümü</option>
              {companyBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status" className={LABEL}>
              Durum
            </label>
            <select id="status" name="status" defaultValue={statusFilter ?? ""} className={INPUT}>
              <option value="">Tümü</option>
              {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-600 hover:bg-content">
            Filtrele
          </button>
          {(brandFilter || statusFilter) && (
            <Link href="/admin/orders" className="text-sm text-accent-600 hover:underline">
              Filtreleri temizle
            </Link>
          )}
        </form>
      </div>

      <div className={CARD}>
        <table className="w-full text-sm">
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
                <td className="py-3 text-right">
                  <ConfirmDeleteButton
                    action={deleteOrder.bind(null, row.id)}
                    confirmLabel="Kalıcı olarak sil?"
                    successMessage="Sipariş silindi"
                  />
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
  );
}
