"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, ledgerEntries, orders, orderStatusHistory } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { canTransitionOrderStatus } from "@/lib/order-status";
import { postLedgerEntry } from "@/lib/ledger";

export async function transitionOrderStatus(orderId: string, toStatus: string, formData: FormData) {
  const session = await requireAdminSession();
  const note = String(formData.get("note") ?? "").trim();

  const [row] = await db
    .select({
      status: orders.status,
      paymentMethod: orders.paymentMethod,
      brandCompanyId: brands.companyId,
      dealerId: orders.dealerId,
      totalAmount: orders.totalAmount,
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

  if ((toStatus === "rejected" || toStatus === "cancelled") && !note) {
    throw new Error("Reddetmek veya iptal etmek için not girmelisiniz.");
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

  if (toStatus === "delivered_unpaid") {
    await postLedgerEntry({
      dealerId: row.dealerId,
      direction: "debit",
      amount: row.totalAmount,
      sourceType: "order",
      sourceId: orderId,
      note: "Kapıda tahsil edilemedi",
    });
  }

  // Cari siparişte borç, sipariş oluşturulduğu anda (onaydan önce) yazılıyor
  // (bkz. dealer/actions.ts::createOrder) — sipariş sonradan reddedilir veya
  // iptal edilirse bu borcun geri alınması gerekir, yoksa hiç gerçekleşmemiş
  // bir sipariş bayinin cari bakiyesinde kalıcı olarak görünür.
  if (row.paymentMethod === "cari" && (toStatus === "rejected" || toStatus === "cancelled")) {
    await postLedgerEntry({
      dealerId: row.dealerId,
      direction: "credit",
      amount: row.totalAmount,
      sourceType: "order",
      sourceId: orderId,
      note: toStatus === "rejected" ? "Sipariş reddedildi — borç iptal edildi" : "Sipariş iptal edildi — borç iptal edildi",
    });
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: string, _formData: FormData) {
  const session = await requireAdminSession();

  const [row] = await db
    .select({ brandCompanyId: brands.companyId, dealerId: orders.dealerId, paymentMethod: orders.paymentMethod })
    .from(orders)
    .innerJoin(brands, eq(orders.brandId, brands.id))
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!row || row.brandCompanyId !== session.user.companyId) throw new Error("Sipariş bulunamadı.");

  // Cari siparişin bıraktığı net borç/alacak, sipariş kaydıyla birlikte
  // silinmeden önce dengelenir — aksi halde ledger_entries'te artık var
  // olmayan bir siparişe referans veren, hiçbir zaman düzeltilemeyecek bir
  // bakiye kalır (bkz. transitionOrderStatus'taki aynı sınıftan düzeltme).
  if (row.paymentMethod === "cari") {
    const entries = await db
      .select({ direction: ledgerEntries.direction, amount: ledgerEntries.amount })
      .from(ledgerEntries)
      .where(eq(ledgerEntries.sourceId, orderId));
    const net = entries.reduce(
      (sum, e) => sum + (e.direction === "debit" ? Number(e.amount) : -Number(e.amount)),
      0
    );
    if (Math.abs(net) > 0.001) {
      await postLedgerEntry({
        dealerId: row.dealerId,
        direction: net > 0 ? "credit" : "debit",
        amount: Math.abs(net).toFixed(2),
        sourceType: "manual_adjustment",
        sourceId: orderId,
        note: "Sipariş kalıcı olarak silindi — cari borç/alacak dengelendi",
      });
    }
  }

  // order_items / order_status_history / payments hepsi orders'a cascade
  // bağlı — sipariş silinince otomatik temizleniyor.
  await db.delete(orders).where(eq(orders.id, orderId));

  revalidatePath("/admin/orders");
}
