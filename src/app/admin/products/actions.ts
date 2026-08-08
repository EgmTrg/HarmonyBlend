"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";

async function assertCompanyOwnsBrand(companyId: string, brandId: string) {
  const [brand] = await db
    .select({ id: brands.id })
    .from(brands)
    .where(and(eq(brands.id, brandId), eq(brands.companyId, companyId)))
    .limit(1);
  if (!brand) throw new Error("Marka bulunamadı.");
}

export async function createCategory(brandId: string, formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  const name = String(formData.get("name") ?? "").trim();
  const parentId = String(formData.get("parentId") ?? "") || null;
  if (!name) throw new Error("Kategori adı zorunlu.");

  await db.insert(categories).values({ brandId, name, parentId });

  revalidatePath("/admin/products");
}

export async function deleteCategory(id: string, brandId: string, _formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  await db.delete(categories).where(and(eq(categories.id, id), eq(categories.brandId, brandId)));

  revalidatePath("/admin/products");
}

export async function createProduct(brandId: string, formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const unitPrice = String(formData.get("unitPrice") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;

  if (!name || !sku || !unit || !unitPrice) {
    throw new Error("Ad, SKU, birim ve birim fiyat zorunlu.");
  }
  if (Number.isNaN(Number(unitPrice))) {
    throw new Error("Birim fiyat sayısal olmalı.");
  }

  try {
    await db.insert(products).values({ brandId, categoryId, sku, name, unit, unitPrice });
  } catch {
    throw new Error("Bu SKU bu markada zaten kullanılıyor.");
  }

  revalidatePath("/admin/products");
}

export async function toggleProductActive(
  id: string,
  brandId: string,
  nextActive: boolean,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  await db
    .update(products)
    .set({ isActive: nextActive })
    .where(and(eq(products.id, id), eq(products.brandId, brandId)));

  revalidatePath("/admin/products");
}

export async function deleteProduct(id: string, brandId: string, _formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  await db.delete(products).where(and(eq(products.id, id), eq(products.brandId, brandId)));

  revalidatePath("/admin/products");
}
