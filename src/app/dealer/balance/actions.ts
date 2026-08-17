"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { postLedgerEntry } from "@/lib/ledger";
import { mockPosProvider } from "@/lib/payments/mock-provider";

export async function payBalance(amount: string, simulateFailure: boolean) {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error("Lütfen geçerli bir tutar girin.");
  }
  const normalizedAmount = numericAmount.toFixed(2);

  const chargeResult = await mockPosProvider.charge({
    amount: normalizedAmount,
    dealerId,
    simulateFailure,
  });

  const [payment] = await db
    .insert(payments)
    .values({
      dealerId,
      orderId: null,
      type: "standalone_collection",
      provider: "mock",
      amount: normalizedAmount,
      status: chargeResult.status,
      providerRef: chargeResult.providerRef,
    })
    .returning();

  if (chargeResult.status === "success") {
    await postLedgerEntry({
      dealerId,
      direction: "credit",
      amount: normalizedAmount,
      sourceType: "payment",
      sourceId: payment.id,
      note: "Bakiye ödemesi",
    });
  }

  revalidatePath("/dealer/balance");
  revalidatePath("/dealer");

  return { status: chargeResult.status };
}
