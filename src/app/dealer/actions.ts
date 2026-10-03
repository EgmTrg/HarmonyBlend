"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { companies, dealerBrands, dealers, orderItems, orders, payments, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { canTransitionOrderStatus, initialOrderStatus } from "@/lib/order-status";
import { postLedgerEntry } from "@/lib/ledger";
import { recordOrderStatusChange } from "@/lib/order-events";
import { logActivity } from "@/lib/activity-log";
import { mockPosProvider } from "@/lib/payments/mock-provider";
import { PAYMENT_METHOD_CODES, type PaymentMethodCode } from "@/lib/payment-methods";
import { calculateLineNet, calculateLineVat } from "@/lib/cart-totals";
import { unstable_update } from "@/auth";

interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export async function createOrder(
  brandId: string,
  paymentCode: PaymentMethodCode,
  items: CreateOrderItemInput[],
  simulateFailure: boolean
) {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  if (items.length === 0) throw new Error("Sepetiniz boş.");
  if (!PAYMENT_METHOD_CODES.includes(paymentCode)) throw new Error("Geçersiz ödeme tipi.");

  const [dealerBrand] = await db
    .select({ id: dealerBrands.id })
    .from(dealerBrands)
    .where(
      and(
        eq(dealerBrands.dealerId, dealerId),
        eq(dealerBrands.brandId, brandId),
        eq(dealerBrands.isActive, true)
      )
    )
    .limit(1);
  if (!dealerBrand) throw new Error("Bu markaya erişiminiz yok.");

  // Fiyatlar ve ürün geçerliliği her zaman sunucuda yeniden doğrulanır —
  // istemciden gelen fiyata asla güvenilmez.
  const productIds = items.map((item) => item.productId);
  const dbProducts = await db
    .select()
    .from(products)
    .where(
      and(
        inArray(products.id, productIds),
        eq(products.brandId, brandId),
        eq(products.isActive, true)
      )
    );
  const productById = new Map(dbProducts.map((p) => [p.id, p]));

  const lineItems = items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) throw new Error("Sepetteki bir ürün artık satışa açık değil.");
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
      throw new Error("Miktar sıfırdan büyük olmalı.");
    }
    if (item.quantity % product.orderMultiple !== 0) {
      throw new Error(
        `${product.name} yalnızca ${product.orderMultiple} ve katları şeklinde sipariş edilebilir.`
      );
    }
    const lineNet = calculateLineNet(product.unitPrice, item.quantity);
    const lineVat = calculateLineVat(lineNet, product.vatRate);
    return {
      productId: product.id,
      quantity: String(item.quantity),
      unitPrice: product.unitPrice,
      lineTotal: lineNet.toFixed(2),
      vatRate: product.vatRate,
      vatAmount: lineVat.toFixed(2),
    };
  });

  const subtotalAmount = lineItems.reduce((sum, li) => sum + Number(li.lineTotal), 0).toFixed(2);
  const vatAmount = lineItems.reduce((sum, li) => sum + Number(li.vatAmount), 0).toFixed(2);
  const totalAmount = (Number(subtotalAmount) + Number(vatAmount)).toFixed(2);
  const startStatus = initialOrderStatus(paymentCode);

  const [dealerInfo] = await db
    .select({
      currentBalance: dealers.currentBalance,
      maxBalanceLimit: dealers.maxBalanceLimit,
      requiresOrderApproval: companies.requiresOrderApproval,
    })
    .from(dealers)
    .innerJoin(companies, eq(dealers.companyId, companies.id))
    .where(eq(dealers.id, dealerId))
    .limit(1);
  // Firma ayarı kapalıysa sipariş otomatik onaylanır (aşağıda submitted/paid
  // sonrası ek bir "approved" geçişi yazılır) — admin/marka yöneticisi manuel
  // onay vermek zorunda kalmaz. Yine de onaylanmış bir sipariş admin
  // tarafından iptal edilebilir, bu ayardan etkilenmez (bkz. order-status.ts).
  const autoApprove = dealerInfo?.requiresOrderApproval === false;

  if (paymentCode === "cari") {
    if (
      dealerInfo?.maxBalanceLimit !== null &&
      dealerInfo?.maxBalanceLimit !== undefined &&
      Number(dealerInfo.currentBalance) + Number(totalAmount) > Number(dealerInfo.maxBalanceLimit)
    ) {
      throw new Error(
        "Bakiye limitiniz aşılıyor, cari ile ödeme yapamazsınız. Lütfen nakit/merkezde ödeme seçin."
      );
    }
  }

  // NOT: @neondatabase/serverless'ın HTTP sürücüsü gerçek db.transaction()
  // desteklemiyor (her sorgu ayrı bir HTTP isteği) — bu yüzden adımlar sırayla
  // yazılıyor. Ortasında bir hata olursa (ör. order oluşur ama order_items
  // yazılamaz) sipariş eksik kalabilir; bu, sürücü seçiminin bilinen bir
  // ödünü. Faz 6 (production sertleştirme) öncesi WebSocket tabanlı bir
  // sürücüye geçiş bu riski ortadan kaldırır.
  const [order] = await db
    .insert(orders)
    .values({
      dealerId,
      brandId,
      paymentMethod: paymentCode,
      status: startStatus,
      subtotalAmount,
      vatAmount,
      totalAmount,
      createdBy: session.user.id,
    })
    .returning();

  await db.insert(orderItems).values(lineItems.map((li) => ({ ...li, orderId: order.id })));

  await recordOrderStatusChange({
    orderId: order.id,
    fromStatus: null,
    toStatus: startStatus,
    changedBy: session.user.id,
    note: "Sipariş oluşturuldu",
  });

  if (paymentCode === "cari") {
    await postLedgerEntry({
      dealerId,
      direction: "debit",
      amount: totalAmount,
      sourceType: "order",
      sourceId: order.id,
      note: "Cari sipariş",
    });
  }

  if (autoApprove && (paymentCode === "cari" || paymentCode === "cash_on_delivery")) {
    await db
      .update(orders)
      .set({ status: "approved", updatedAt: new Date() })
      .where(eq(orders.id, order.id));
    await recordOrderStatusChange({
      orderId: order.id,
      fromStatus: startStatus,
      toStatus: "approved",
      changedBy: null,
      note: "Otomatik onaylandı (onay ayarı kapalı)",
    });
  }

  if (paymentCode === "virtual_pos") {
    const chargeResult = await mockPosProvider.charge({
      amount: totalAmount,
      dealerId,
      orderId: order.id,
      simulateFailure,
    });

    await db.insert(payments).values({
      dealerId,
      orderId: order.id,
      type: "order_payment",
      provider: "mock",
      amount: totalAmount,
      status: chargeResult.status,
      providerRef: chargeResult.providerRef,
    });

    const nextStatus = chargeResult.status === "success" ? "paid" : "payment_failed";
    await db
      .update(orders)
      .set({ status: nextStatus, updatedAt: new Date() })
      .where(eq(orders.id, order.id));
    await recordOrderStatusChange({
      orderId: order.id,
      fromStatus: startStatus,
      toStatus: nextStatus,
      changedBy: null,
      note:
        chargeResult.status === "success"
          ? "Mock POS ödemesi başarılı"
          : "Mock POS ödemesi başarısız",
    });

    if (autoApprove && nextStatus === "paid") {
      await db
        .update(orders)
        .set({ status: "approved", updatedAt: new Date() })
        .where(eq(orders.id, order.id));
      await recordOrderStatusChange({
        orderId: order.id,
        fromStatus: "paid",
        toStatus: "approved",
        changedBy: null,
        note: "Otomatik onaylandı (onay ayarı kapalı)",
      });
    }
  }

  revalidatePath("/dealer/orders");
  return { orderId: order.id };
}

export interface ReorderItem {
  productId: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
  vatRate: string;
  categoryId: string | null;
  orderMultiple: number;
  quantity: number;
}

export async function getReorderItems(orderId: string) {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const [order] = await db
    .select({ id: orders.id, dealerId: orders.dealerId, brandId: orders.brandId })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  if (!order || order.dealerId !== dealerId) throw new Error("Sipariş bulunamadı.");

  const pastItems = await db
    .select({ productId: orderItems.productId, quantity: orderItems.quantity })
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  // Fiyat/KDV/kat gibi alanlar geçmiş siparişteki değerle değil, ürünün
  // *güncel* değerleriyle kopyalanır — createOrder'ın client fiyatına
  // güvenmeyip sunucuda yeniden okuduğu aynı ilke. İsim gösterebilmek için
  // pasif ürünler de sorguya dahil ediliyor, yalnızca aktif olanlar sepete
  // eklenecek listeye giriyor.
  const productIds = pastItems.map((item) => item.productId);
  const allProducts =
    productIds.length > 0
      ? await db.select().from(products).where(inArray(products.id, productIds))
      : [];
  const productById = new Map(allProducts.map((p) => [p.id, p]));

  const items: ReorderItem[] = [];
  const skippedNames: string[] = [];
  for (const pastItem of pastItems) {
    const product = productById.get(pastItem.productId);
    if (!product || !product.isActive) {
      skippedNames.push(product?.name ?? "Bilinmeyen ürün");
      continue;
    }
    items.push({
      productId: product.id,
      name: product.name,
      sku: product.sku,
      unit: product.unit,
      unitPrice: product.unitPrice,
      vatRate: product.vatRate,
      categoryId: product.categoryId,
      orderMultiple: product.orderMultiple,
      quantity: Number(pastItem.quantity),
    });
  }

  return { brandId: order.brandId, items, skippedNames };
}

export async function cancelOrder(orderId: string, formData: FormData) {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;
  const note = String(formData.get("note") ?? "").trim();
  if (!note) throw new Error("İptal için bir sebep girmelisiniz.");

  const [row] = await db
    .select({
      dealerId: orders.dealerId,
      paymentMethod: orders.paymentMethod,
      status: orders.status,
      totalAmount: orders.totalAmount,
    })
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!row || row.dealerId !== dealerId) throw new Error("Sipariş bulunamadı.");
  if (!canTransitionOrderStatus(row.paymentMethod, row.status, "cancelled")) {
    throw new Error("Bu sipariş artık iptal edilemez.");
  }

  await db
    .update(orders)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(orders.id, orderId));

  await recordOrderStatusChange({
    orderId,
    fromStatus: row.status,
    toStatus: "cancelled",
    changedBy: session.user.id,
    note,
  });

  // Cari borç sipariş oluşturulduğu anda yazılıyor (bkz. createOrder) —
  // bayi kendi siparişini iptal ettiğinde admin'in transitionOrderStatus'taki
  // aynı geri alma mantığı uygulanır.
  if (row.paymentMethod === "cari") {
    await postLedgerEntry({
      dealerId,
      direction: "credit",
      amount: row.totalAmount,
      sourceType: "order",
      sourceId: orderId,
      note: "Sipariş bayi tarafından iptal edildi — borç iptal edildi",
    });
  }

  revalidatePath(`/dealer/orders/${orderId}`);
  revalidatePath("/dealer/orders");
}

export async function stopImpersonation() {
  const session = await requireDealerSession();
  if (!session.user.impersonatorEmail) throw new Error("Aktif bir impersonation oturumu yok.");

  await logActivity({
    action: "impersonation.stopped",
    message: `Taklit oturumu sonlandırıldı: ${session.user.impersonatorEmail} -> ${session.user.email}`,
    source: "dealer.stopImpersonation",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "user",
    entityId: session.user.id,
  });

  await unstable_update({ stopImpersonation: true } as unknown as Parameters<
    typeof unstable_update
  >[0]);
  redirect("/admin");
}
