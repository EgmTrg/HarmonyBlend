"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { slugify } from "@/lib/slug";

export async function createBrand(formData: FormData) {
  const session = await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Marka adı zorunlu.");

  try {
    await db.insert(brands).values({
      companyId: session.user.companyId,
      name,
      slug: slugify(name),
    });
  } catch {
    throw new Error("Bu isimde (veya aynı slug'a sahip) bir marka zaten var.");
  }

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

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/brands/${id}`);
}

export async function deleteBrand(id: string, _formData: FormData) {
  const session = await requireAdminSession();

  await db
    .delete(brands)
    .where(and(eq(brands.id, id), eq(brands.companyId, session.user.companyId)));

  revalidatePath("/admin/brands");
}
