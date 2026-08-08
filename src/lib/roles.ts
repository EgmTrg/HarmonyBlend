export const USER_ROLES = ["company_admin", "brand_manager", "dealer_user"] as const;

export type AppRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<AppRole, string> = {
  company_admin: "Firma Yöneticisi",
  brand_manager: "Marka Yöneticisi",
  dealer_user: "Bayi Kullanıcısı",
};
