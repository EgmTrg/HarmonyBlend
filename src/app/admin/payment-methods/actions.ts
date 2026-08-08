"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { paymentMethods } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { PAYMENT_METHOD_CODES, type PaymentMethodCode } from "@/lib/payment-methods";

export async function createPaymentMethod(formData: FormData) {
  const session = await requireAdminSession();
  const code = String(formData.get("code") ?? "");
  const label = String(formData.get("label") ?? "").trim();

  if (!PAYMENT_METHOD_CODES.includes(code as PaymentMethodCode)) {
    throw new Error("Geçersiz ödeme tipi.");
  }
  if (!label) throw new Error("Etiket zorunlu.");

  try {
    await db.insert(paymentMethods).values({
      companyId: session.user.companyId,
      code: code as PaymentMethodCode,
      label,
    });
  } catch {
    throw new Error("Bu ödeme tipi bu firmada zaten tanımlı.");
  }

  revalidatePath("/admin/payment-methods");
}

export async function deletePaymentMethod(id: string, _formData: FormData) {
  const session = await requireAdminSession();

  await db
    .delete(paymentMethods)
    .where(and(eq(paymentMethods.id, id), eq(paymentMethods.companyId, session.user.companyId)));

  revalidatePath("/admin/payment-methods");
}
