"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { and, eq, inArray, ne } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealerBrands, dealers, users } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { USER_ROLES, type AppRole } from "@/lib/roles";
import { unstable_update } from "@/auth";

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

export async function updateDealerAndBrands(id: string, formData: FormData) {
  const session = await requireAdminSession();

  const [dealer] = await db
    .select({ id: dealers.id })
    .from(dealers)
    .where(and(eq(dealers.id, id), eq(dealers.companyId, session.user.companyId)))
    .limit(1);
  if (!dealer) throw new Error("Bayi bulunamadı.");

  const name = String(formData.get("name") ?? "").trim();
  const taxNo = String(formData.get("taxNo") ?? "").trim() || null;
  const il = String(formData.get("il") ?? "").trim() || null;
  const bolge = String(formData.get("bolge") ?? "").trim() || null;
  const maxBalanceLimit = String(formData.get("maxBalanceLimit") ?? "").trim() || null;
  if (!name) throw new Error("Bayi adı zorunlu.");

  await db
    .update(dealers)
    .set({ name, taxNo, il, bolge, maxBalanceLimit })
    .where(eq(dealers.id, id));

  const requestedBrandIds = formData.getAll("brandIds").map(String);
  const validBrands =
    requestedBrandIds.length > 0
      ? await db
          .select({ id: brands.id })
          .from(brands)
          .where(and(eq(brands.companyId, session.user.companyId), inArray(brands.id, requestedBrandIds)))
      : [];
  const nextBrandIds = new Set(validBrands.map((b) => b.id));

  const currentRows = await db.select().from(dealerBrands).where(eq(dealerBrands.dealerId, id));
  const currentBrandIds = new Set(currentRows.map((row) => row.brandId));

  const toAdd = [...nextBrandIds].filter((brandId) => !currentBrandIds.has(brandId));
  const toRemove = [...currentBrandIds].filter((brandId) => !nextBrandIds.has(brandId));

  if (toAdd.length > 0) {
    await db.insert(dealerBrands).values(toAdd.map((brandId) => ({ dealerId: id, brandId })));
  }
  if (toRemove.length > 0) {
    await db
      .delete(dealerBrands)
      .where(and(eq(dealerBrands.dealerId, id), inArray(dealerBrands.brandId, toRemove)));
  }

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/dealers/${id}`);
}

// Bayi listesindeki "Düzenle" penceresinden tek bir formla hem bayinin
// "birincil" kullanıcısını düzenlemeye hem de (henüz yoksa) oluşturmaya
// yarar — bkz. add-user-modal.tsx EditDealerModal. Var olan kullanıcıda
// şifre alanı hiç gösterilmiyor/güncellenmiyor; yalnızca yeni oluştururken
// zorunlu. Rol dealer_user dışına çekilirse dealerId null'lanır (kullanıcı
// artık bu bayiye değil, head office'e bağlı olur).
export async function saveDealerUser(dealerId: string, existingUserId: string | null, formData: FormData) {
  const session = await requireAdminSession();

  const [dealer] = await db
    .select({ id: dealers.id })
    .from(dealers)
    .where(and(eq(dealers.id, dealerId), eq(dealers.companyId, session.user.companyId)))
    .limit(1);
  if (!dealer) throw new Error("Bayi bulunamadı.");

  const role = String(formData.get("userRole") ?? "dealer_user");
  if (!USER_ROLES.includes(role as AppRole)) throw new Error("Geçersiz rol.");
  const name = String(formData.get("userName") ?? "").trim();
  const email = String(formData.get("userEmail") ?? "").trim().toLowerCase();
  const isActive = formData.get("userIsActive") === "true";
  if (!name) throw new Error("Kullanıcı adı zorunlu.");
  if (!email) throw new Error("E-posta zorunlu.");

  const nextDealerId = role === "dealer_user" ? dealerId : null;

  if (existingUserId) {
    const [duplicate] = await db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.email, email), ne(users.id, existingUserId)))
      .limit(1);
    if (duplicate) throw new Error("Bu e-posta zaten kullanılıyor.");

    await db
      .update(users)
      .set({ name, email, role: role as AppRole, isActive, dealerId: nextDealerId })
      .where(and(eq(users.id, existingUserId), eq(users.companyId, session.user.companyId)));
  } else {
    const password = String(formData.get("userPassword") ?? "");
    if (password.length < 8) throw new Error("Şifre en az 8 karakter olmalı.");

    const [duplicate] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
    if (duplicate) throw new Error("Bu e-posta zaten kullanılıyor.");

    const passwordHash = await hash(password, 10);
    await db.insert(users).values({
      companyId: session.user.companyId,
      dealerId: nextDealerId,
      name,
      email,
      role: role as AppRole,
      isActive,
      passwordHash,
    });
  }

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/dealers/${dealerId}`);
}

export async function impersonateDealerUser(userId: string, _formData: FormData) {
  const session = await requireAdminSession();

  const [target] = await db
    .select({
      id: users.id,
      companyId: users.companyId,
      role: users.role,
      isActive: users.isActive,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (
    !target ||
    target.companyId !== session.user.companyId ||
    target.role !== "dealer_user" ||
    !target.isActive
  ) {
    throw new Error("Bu kullanıcıyla giriş yapılamıyor.");
  }

  // unstable_update()'in tipi yalnızca Session alanlarını kabul ediyor;
  // impersonateUserId, jwt callback'indeki "update" trigger'ına özel bir
  // sinyal — bkz. src/auth.ts.
  await unstable_update({ impersonateUserId: userId } as unknown as Parameters<
    typeof unstable_update
  >[0]);
  redirect("/dealer");
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
