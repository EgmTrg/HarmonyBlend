import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { AppRole } from "@/lib/roles";

const ADMIN_ROLES: AppRole[] = ["company_admin", "brand_manager"];

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user || !ADMIN_ROLES.includes(session.user.role)) {
    redirect("/login");
  }
  return session;
}

export async function requireDealerSession() {
  const session = await auth();
  if (!session?.user || session.user.role !== "dealer_user" || !session.user.dealerId) {
    redirect("/login");
  }
  return session;
}
