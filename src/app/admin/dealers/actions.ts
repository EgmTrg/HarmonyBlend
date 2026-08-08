"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealerPaymentMethods, dealers, paymentMethods } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";

export async function createDealer(formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  const taxNo = String(formData.get("taxNo") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  if (!name) throw new Error("Bayi adı zorunlu.");

  await db.insert(dealers).values({
    companyId: session.user.companyId,
    name,
    taxNo: taxNo || null,
    address: address || null,
  });

  revalidatePath("/admin/dealers");
}

export async function updateDealer(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  const taxNo = String(formData.get("taxNo") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  if (!name) throw new Error("Bayi adı zorunlu.");

  await db
    .update(dealers)
    .set({ name, taxNo: taxNo || null, address: address || null })
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)));

  revalidatePath("/admin/dealers");
  revalidatePath(`/admin/dealers/${id}`);
}

export async function deleteDealer(id: string, _formData: FormData) {
  const session = await requireAdminSession();

  await db
    .delete(dealers)
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)));

  revalidatePath("/admin/dealers");
}

async function assertCompanyOwnsDealerAndBrand(
  companyId: string,
  dealerId: string,
  brandId: string
) {
  const [dealer] = await db
    .select({ id: dealers.id })
    .from(dealers)
    .where(and(eq(dealers.id, dealerId), eq(dealers.companyId, companyId)))
    .limit(1);
  const [brand] = await db
    .select({ id: brands.id })
    .from(brands)
    .where(and(eq(brands.id, brandId), eq(brands.companyId, companyId)))
    .limit(1);

  if (!dealer || !brand) throw new Error("Bayi veya marka bulunamadı.");
}

export async function assignDealerBrand(
  dealerId: string,
  brandId: string,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsDealerAndBrand(session.user.companyId, dealerId, brandId);

  await db.insert(dealerBrands).values({ dealerId, brandId }).onConflictDoNothing();

  revalidatePath(`/admin/dealers/${dealerId}`);
}

export async function unassignDealerBrand(
  dealerId: string,
  brandId: string,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsDealerAndBrand(session.user.companyId, dealerId, brandId);

  await db
    .delete(dealerBrands)
    .where(and(eq(dealerBrands.dealerId, dealerId), eq(dealerBrands.brandId, brandId)));

  revalidatePath(`/admin/dealers/${dealerId}`);
}

async function assertCompanyOwnsPaymentMethod(companyId: string, paymentMethodId: string) {
  const [pm] = await db
    .select({ id: paymentMethods.id })
    .from(paymentMethods)
    .where(and(eq(paymentMethods.id, paymentMethodId), eq(paymentMethods.companyId, companyId)))
    .limit(1);
  if (!pm) throw new Error("Ödeme yöntemi bulunamadı.");
}

export async function enableDealerPaymentMethod(
  dealerId: string,
  brandId: string,
  paymentMethodId: string,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsDealerAndBrand(session.user.companyId, dealerId, brandId);
  await assertCompanyOwnsPaymentMethod(session.user.companyId, paymentMethodId);

  await db
    .insert(dealerPaymentMethods)
    .values({ dealerId, brandId, paymentMethodId })
    .onConflictDoNothing();

  revalidatePath(`/admin/dealers/${dealerId}`);
}

export async function disableDealerPaymentMethod(
  dealerId: string,
  brandId: string,
  paymentMethodId: string,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsDealerAndBrand(session.user.companyId, dealerId, brandId);
  await assertCompanyOwnsPaymentMethod(session.user.companyId, paymentMethodId);

  await db
    .delete(dealerPaymentMethods)
    .where(
      and(
        eq(dealerPaymentMethods.dealerId, dealerId),
        eq(dealerPaymentMethods.brandId, brandId),
        eq(dealerPaymentMethods.paymentMethodId, paymentMethodId)
      )
    );

  revalidatePath(`/admin/dealers/${dealerId}`);
}
