"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { brands, orderItems, orders, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { slugify } from "@/lib/slug";
import { logActivity } from "@/lib/activity-log";

export async function createBrand(formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Marka adı zorunlu.");

  let createdId: string;
  try {
    const [created] = await db
      .insert(brands)
      .values({
        companyId: session.user.companyId,
        name,
        slug: slugify(name),
      })
      .returning();
    createdId = created.id;
  } catch {
    throw new Error("Bu isimde (veya aynı slug'a sahip) bir marka zaten var.");
  }

  await logActivity({
    action: "brand.created",
    message: `Marka oluşturuldu: ${name}`,
    source: "admin.brands.createBrand",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "brand",
    entityId: createdId,
  });

  revalidatePath("/admin/brands");
}

export async function updateBrand(id: string, formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Marka adı zorunlu.");

  try {
    await db
      .update(brands)
      .set({ name, slug: slugify(name) })
      .where(and(eq(brands.id, id), eq(brands.companyId, session.user.companyId)));
  } catch {
    throw new Error("Bu isimde (veya aynı slug'a sahip) bir marka zaten var.");
  }

  await logActivity({
    action: "brand.updated",
    message: `Marka güncellendi: ${name}`,
    source: "admin.brands.updateBrand",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "brand",
    entityId: id,
  });

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/brands/${id}`);
}

export async function deleteBrand(id: string, force: boolean, _formData: FormData) {
  const session = await requireAdminSession();
  let removedOrderCount = 0;

  if (force) {
    // Marka silinince products cascade ile silinmeye çalışılıyor, ama
    // order_items -> products FK'sinde cascade yok. Zorla silmede önce bu
    // markadaki ürünlerin geçtiği siparişleri kaldırıp engeli açıyoruz.
    // Yalnızca test/hatalı veri temizliği için.
    const brandProducts = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.brandId, id));
    if (brandProducts.length > 0) {
      const productIds = brandProducts.map((p) => p.id);
      const rows = await db
        .select({ orderId: orderItems.orderId })
        .from(orderItems)
        .where(inArray(orderItems.productId, productIds));
      const orderIds = [...new Set(rows.map((r) => r.orderId))];
      if (orderIds.length > 0) {
        await db.delete(orders).where(inArray(orders.id, orderIds));
        removedOrderCount = orderIds.length;
      }
    }
  }

  try {
    await db
      .delete(brands)
      .where(and(eq(brands.id, id), eq(brands.companyId, session.user.companyId)));
  } catch {
    throw new Error(
      "Bu markadaki ürünler geçmiş siparişlerde kullanıldığı için marka silinemiyor."
    );
  }

  await logActivity({
    action: "brand.deleted",
    level: "warn",
    message: `Marka silindi: ${id}${force ? ` (zorla, ${removedOrderCount} sipariş de silindi)` : ""}`,
    source: "admin.brands.deleteBrand",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "brand",
    entityId: id,
    meta: { force, removedOrderCount },
  });

  revalidatePath("/admin/brands");
  revalidatePath("/admin/orders");
}
