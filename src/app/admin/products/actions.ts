"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, orderItems, orders, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { logActivity } from "@/lib/activity-log";

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

  const [created] = await db.insert(categories).values({ brandId, name, parentId }).returning();

  await logActivity({
    action: "category.created",
    message: `Kategori oluşturuldu: ${name}`,
    source: "admin.products.createCategory",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "category",
    entityId: created.id,
    meta: { brandId, parentId },
  });

  revalidatePath("/admin/products");
}

export async function deleteCategory(id: string, brandId: string, _formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  await db.delete(categories).where(and(eq(categories.id, id), eq(categories.brandId, brandId)));

  await logActivity({
    action: "category.deleted",
    level: "warn",
    message: `Kategori silindi: ${id}`,
    source: "admin.products.deleteCategory",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "category",
    entityId: id,
    meta: { brandId },
  });

  revalidatePath("/admin/products");
}

export async function createProduct(brandId: string, formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const unitPrice = String(formData.get("unitPrice") ?? "").trim();
  const vatRate = String(formData.get("vatRate") ?? "").trim();
  const orderMultiple = String(formData.get("orderMultiple") ?? "1").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;

  if (!name || !sku || !unit || !unitPrice || !vatRate) {
    throw new Error("Ad, SKU, birim, birim fiyat ve KDV oranı zorunlu.");
  }
  if (Number.isNaN(Number(unitPrice))) {
    throw new Error("Birim fiyat sayısal olmalı.");
  }
  if (Number.isNaN(Number(vatRate)) || Number(vatRate) < 0) {
    throw new Error("KDV oranı geçerli bir yüzde olmalı.");
  }
  if (!Number.isInteger(Number(orderMultiple)) || Number(orderMultiple) < 1) {
    throw new Error("Sipariş katı 1 veya daha büyük bir tam sayı olmalı.");
  }

  let createdId: string;
  try {
    const [created] = await db
      .insert(products)
      .values({
        brandId,
        categoryId,
        sku,
        name,
        unit,
        unitPrice,
        vatRate,
        orderMultiple: Number(orderMultiple),
      })
      .returning();
    createdId = created.id;
  } catch {
    throw new Error("Bu SKU bu markada zaten kullanılıyor.");
  }

  await logActivity({
    action: "product.created",
    message: `Ürün oluşturuldu: ${name} (${sku})`,
    source: "admin.products.createProduct",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "product",
    entityId: createdId,
    meta: { brandId, sku, unitPrice, vatRate },
  });

  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, brandId: string, formData: FormData) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const unitPrice = String(formData.get("unitPrice") ?? "").trim();
  const vatRate = String(formData.get("vatRate") ?? "").trim();
  const orderMultiple = String(formData.get("orderMultiple") ?? "1").trim();
  const categoryId = String(formData.get("categoryId") ?? "") || null;
  const isActive = formData.get("isActive") === "true";

  if (!name || !sku || !unit || !unitPrice || !vatRate) {
    throw new Error("Ad, SKU, birim, birim fiyat ve KDV oranı zorunlu.");
  }
  if (Number.isNaN(Number(unitPrice))) {
    throw new Error("Birim fiyat sayısal olmalı.");
  }
  if (Number.isNaN(Number(vatRate)) || Number(vatRate) < 0) {
    throw new Error("KDV oranı geçerli bir yüzde olmalı.");
  }
  if (!Number.isInteger(Number(orderMultiple)) || Number(orderMultiple) < 1) {
    throw new Error("Sipariş katı 1 veya daha büyük bir tam sayı olmalı.");
  }

  try {
    await db
      .update(products)
      .set({ name, sku, unit, unitPrice, vatRate, orderMultiple: Number(orderMultiple), categoryId, isActive })
      .where(and(eq(products.id, id), eq(products.brandId, brandId)));
  } catch {
    throw new Error("Bu SKU bu markada zaten kullanılıyor.");
  }

  await logActivity({
    action: "product.updated",
    message: `Ürün güncellendi: ${name} (${sku})`,
    source: "admin.products.updateProduct",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "product",
    entityId: id,
    meta: { brandId, sku, unitPrice, vatRate, isActive },
  });

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

  await logActivity({
    action: "product.toggled",
    message: `Ürün ${nextActive ? "aktif edildi" : "pasife alındı"}: ${id}`,
    source: "admin.products.toggleProductActive",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "product",
    entityId: id,
    meta: { brandId, nextActive },
  });

  revalidatePath("/admin/products");
}

export async function deleteProduct(
  id: string,
  brandId: string,
  force: boolean,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);
  let removedOrderCount = 0;

  if (force) {
    // order_items -> products FK'sinde cascade yok (sipariş kalemleri kasten
    // korunuyor) — zorla silmede önce bu ürünün geçtiği siparişleri kaldırıp
    // engeli açıyoruz. Yalnızca test/hatalı veri temizliği için; gerçek
    // sipariş geçmişini silmek üzere kullanılmamalı.
    const rows = await db
      .select({ orderId: orderItems.orderId })
      .from(orderItems)
      .where(eq(orderItems.productId, id));
    const orderIds = [...new Set(rows.map((r) => r.orderId))];
    if (orderIds.length > 0) {
      await db.delete(orders).where(inArray(orders.id, orderIds));
      removedOrderCount = orderIds.length;
    }
  }

  try {
    await db.delete(products).where(and(eq(products.id, id), eq(products.brandId, brandId)));
  } catch {
    throw new Error(
      "Bu ürün geçmiş siparişlerde kullanıldığı için silinemiyor — bunun yerine pasife alabilirsiniz."
    );
  }

  await logActivity({
    action: "product.deleted",
    level: "warn",
    message: `Ürün silindi: ${id}${force ? ` (zorla, ${removedOrderCount} sipariş de silindi)` : ""}`,
    source: "admin.products.deleteProduct",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "product",
    entityId: id,
    meta: { brandId, force, removedOrderCount },
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin/orders");
}
