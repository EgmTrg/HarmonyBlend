"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, orderStatusHistory, orders } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { canTransitionOrderStatus } from "@/lib/order-status";

export async function transitionOrderStatus(orderId: string, toStatus: string, formData: FormData) {
  const session = await requireAdminSession();
  const note = String(formData.get("note") ?? "").trim();

  const [row] = await db
    .select({
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      brandCompanyId: brands.companyId,
    })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!row || row.brandCompanyId !== session.user.companyId) throw new Error("Sipariş bulunamadı.");

  const currentStatus = row.status;
  if (!canTransitionOrderStatus(row.paymentMethod, currentStatus, toStatus)) {
    throw new Error("Geçersiz durum geçişi.");
  }

  await db
    .update(orders)
    .set({ status: toStatus, updatedAt: new Date() })
    .where(eq(orders.id, orderId));

  await db.insert(orderStatusHistory).values({
    orderId,
    fromStatus: currentStatus,
    toStatus,
    changedBy: session.user.id,
    note: note || null,
  });

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: string, _formData: FormData) {
  const session = await requireAdminSession();

  const [row] = await db
    .select({ brandCompanyId: brands.companyId })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!row || row.brandCompanyId !== session.user.companyId) throw new Error("Sipariş bulunamadı.");

  // order_items / order_status_history / payments hepsi orders'a cascade
  // bağlı — sipariş silinince otomatik temizleniyor.
  await db.delete(orders).where(eq(orders.id, orderId));

  revalidatePath("/admin/orders");
}
