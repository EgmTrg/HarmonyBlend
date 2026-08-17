"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";

export async function updateOrderApprovalSetting(formData: FormData) {
  const session = await requireAdminSession();
  if (session.user.role !== "company_admin") {
    throw new Error("Bu ayarı yalnızca firma yöneticileri değiştirebilir.");
  }

  const requiresOrderApproval = formData.get("requiresOrderApproval") === "on";

  await db
    .update(companies)
    .set({ requiresOrderApproval })
    .where(eq(companies.id, session.user.companyId));

  revalidatePath("/admin/settings");
}
