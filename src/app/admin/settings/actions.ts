"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { logActivity } from "@/lib/activity-log";

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

  await logActivity({
    action: "settings.updated",
    message: `Sipariş onay ayarı değiştirildi: ${requiresOrderApproval ? "onay gerekiyor" : "otomatik onay"}`,
    source: "admin.settings.updateOrderApprovalSetting",
    actor: { id: session.user.id, email: session.user.email, role: session.user.role },
    companyId: session.user.companyId,
    entityType: "company",
    entityId: session.user.companyId,
    meta: { requiresOrderApproval },
  });

  revalidatePath("/admin/settings");
}
