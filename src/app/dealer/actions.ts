"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { dealerBrands, dealers, orderItems, orderStatusHistory, orders, payments, products } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { initialOrderStatus } from "@/lib/order-status";
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

  if (paymentCode === "cari") {
    const [dealer] = await db
      .select({ currentBalance: dealers.currentBalance, maxBalanceLimit: dealers.maxBalanceLimit })
      .from(dealers)
      .where(eq(dealers.id, dealerId))
      .limit(1);
    if (
      dealer?.maxBalanceLimit !== null &&
      dealer?.maxBalanceLimit !== undefined &&
      Number(dealer.currentBalance) + Number(totalAmount) > Number(dealer.maxBalanceLimit)
    ) {
      throw new Error(
        "Bakiye limitiniz aşılıyor, cari ile ödeme yapamazsınız. Lütfen nakit/kapıda ödeme seçin."
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

  await db.insert(orderStatusHistory).values({
    orderId: order.id,
    fromStatus: null,
    toStatus: startStatus,
    changedBy: session.user.id,
    note: "Sipariş oluşturuldu",
  });

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
    await db.insert(orderStatusHistory).values({
      orderId: order.id,
      fromStatus: startStatus,
      toStatus: nextStatus,
      changedBy: null,
      note:
        chargeResult.status === "success"
          ? "Mock POS ödemesi başarılı"
          : "Mock POS ödemesi başarısız",
    });
  }

  revalidatePath("/dealer/orders");
  return { orderId: order.id };
}

export async function stopImpersonation() {
  const session = await requireDealerSession();
  if (!session.user.impersonatorEmail) throw new Error("Aktif bir impersonation oturumu yok.");

  await unstable_update({ stopImpersonation: true } as unknown as Parameters<
    typeof unstable_update
  >[0]);
  redirect("/admin");
}
