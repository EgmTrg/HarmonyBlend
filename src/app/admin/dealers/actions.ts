"use server";

import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealerPaymentMethods, dealers, paymentMethods, users } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { USER_ROLES, type AppRole } from "@/lib/roles";

export async function createDealerOrUser(formData: FormData) {
  const session = await requireAdminSession();

  const role = String(formData.get("role") ?? "");
  if (!USER_ROLES.includes(role as AppRole)) throw new Error("Geçersiz rol.");

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const isActive = formData.get("isActive") === "true";

  if (!name) throw new Error("Kullanıcı adı zorunlu.");
  if (!email) throw new Error("E-posta zorunlu.");
  if (password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");

  // neon-http sürücüsü gerçek transaction desteklemiyor (bkz. src/app/dealer/actions.ts
  // içindeki not) — e-posta çakışmasını bayi satırını oluşturmadan ÖNCE kontrol
  // ederek kullanıcısız (yetim) bir bayi kaydı kalma riskini azaltıyoruz.
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser) throw new Error("Bu e-posta zaten kullanılıyor.");

  let dealerId: string | null = null;

  if (role === "dealer_user") {
    const taxNo = String(formData.get("taxNo") ?? "").trim() || null;
    const il = String(formData.get("il") ?? "").trim() || null;
    const bolge = String(formData.get("bolge") ?? "").trim() || null;
    const maxBalanceLimit = String(formData.get("maxBalanceLimit") ?? "").trim() || null;

    const [dealer] = await db
      .insert(dealers)
      .values({ companyId: session.user.companyId, name, taxNo, il, bolge, maxBalanceLimit })
      .returning();
    dealerId = dealer.id;

    const brandIds = formData.getAll("brandIds").map(String);
    if (brandIds.length > 0) {
      const validBrands = await db
        .select({ id: brands.id })
        .from(brands)
        .where(and(eq(brands.companyId, session.user.companyId), inArray(brands.id, brandIds)));
      if (validBrands.length > 0) {
        await db
          .insert(dealerBrands)
          .values(validBrands.map((brand) => ({ dealerId: dealer.id, brandId: brand.id })));
      }
    }
  }

  const passwordHash = await hash(password, 10);
  await db.insert(users).values({
    companyId: session.user.companyId,
    dealerId,
    name,
    email,
    role: role as AppRole,
    isActive,
    passwordHash,
  });

  revalidatePath("/admin/brands");
}

export async function updateDealer(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  const taxNo = String(formData.get("taxNo") ?? "").trim() || null;
  const il = String(formData.get("il") ?? "").trim() || null;
  const bolge = String(formData.get("bolge") ?? "").trim() || null;
  const maxBalanceLimit = String(formData.get("maxBalanceLimit") ?? "").trim() || null;
  if (!name) throw new Error("Bayi adı zorunlu.");

  await db
    .update(dealers)
    .set({ name, taxNo, il, bolge, maxBalanceLimit })
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)));

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/dealers/${id}`);
}

export async function deleteDealer(id: string, _formData: FormData) {
  const session = await requireAdminSession();

  await db
    .delete(dealers)
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)));

  revalidatePath("/admin/brands");
}

export async function createDealerUser(dealerId: string, formData: FormData) {
  const session = await requireAdminSession();

  const [dealer] = await db
    .select({ id: dealers.id })
    .from(dealers)
    .where(and(eq(dealers.id, dealerId), eq(dealers.companyId, session.user.companyId)))
    .limit(1);
  if (!dealer) throw new Error("Bayi bulunamadı.");

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email) throw new Error("E-posta zorunlu.");
  if (password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");

  const passwordHash = await hash(password, 10);

  try {
    await db.insert(users).values({
      companyId: session.user.companyId,
      dealerId,
      email,
      role: "dealer_user",
      passwordHash,
    });
  } catch {
    throw new Error("Bu e-posta zaten kullanılıyor.");
  }

  revalidatePath(`/admin/dealers/${dealerId}`);
}

export async function deleteDealerUser(userId: string, dealerId: string, _formData: FormData) {
  const session = await requireAdminSession();

  await db
    .delete(users)
    .where(
      and(
        eq(users.id, userId),
        eq(users.dealerId, dealerId),
        eq(users.companyId, session.user.companyId)
      )
    );

  revalidatePath(`/admin/dealers/${dealerId}`);
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
