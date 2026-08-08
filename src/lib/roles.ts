export const USER_ROLES = ["company_admin", "brand_manager", "dealer_user"] as const;

export type AppRole = (typeof USER_ROLES)[number];
