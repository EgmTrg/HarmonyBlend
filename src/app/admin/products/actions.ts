"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, categories, orderItems, orders, products } from "@/db/schema";
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
  const vatRate = String(formData.get("vatRate") ?? "").trim();
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

  try {
    await db.insert(products).values({ brandId, categoryId, sku, name, unit, unitPrice, vatRate });
  } catch {
    throw new Error("Bu SKU bu markada zaten kullanılıyor.");
  }

  revalidatePath("/admin/products");
}

export async function updateProductVatRate(
  id: string,
  brandId: string,
  formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

  const vatRate = String(formData.get("vatRate") ?? "").trim();
  if (!vatRate || Number.isNaN(Number(vatRate)) || Number(vatRate) < 0) {
    throw new Error("KDV oranı geçerli bir yüzde olmalı.");
  }

  await db
    .update(products)
    .set({ vatRate })
    .where(and(eq(products.id, id), eq(products.brandId, brandId)));

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

export async function deleteProduct(
  id: string,
  brandId: string,
  force: boolean,
  _formData: FormData
) {
  const session = await requireAdminSession();
  await assertCompanyOwnsBrand(session.user.companyId, brandId);

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
    }
  }

  try {
    await db.delete(products).where(and(eq(products.id, id), eq(products.brandId, brandId)));
  } catch {
    throw new Error(
      "Bu ürün geçmiş siparişlerde kullanıldığı için silinemiyor — bunun yerine pasife alabilirsiniz."
    );
  }

  revalidatePath("/admin/products");
  revalidatePath("/admin/orders");
}
