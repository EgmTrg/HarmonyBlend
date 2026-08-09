import { Building2, Package, Tags } from "lucide-react";
import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands, dealers, products } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { CARD } from "@/lib/ui";

export default async function AdminHomePage() {
  const session = await requireAdminSession();
  const companyId = session.user.companyId;

  const [[brandCount], [dealerCount], [productCount]] = await Promise.all([
    db.select({ value: count() }).from(brands).where(eq(brands.companyId, companyId)),
    db.select({ value: count() }).from(dealers).where(eq(dealers.companyId, companyId)),
    db
      .select({ value: count() })
      .from(products)
      .innerJoin(brands, eq(products.brandId, brands.id))
      .where(eq(brands.companyId, companyId)),
  ]);

  const stats = [
    { label: "Markalar", value: brandCount.value, icon: Tags, tone: "purple" as const },
    { label: "Bayiler", value: dealerCount.value, icon: Building2, tone: "success" as const },
    { label: "Ürünler", value: productCount.value, icon: Package, tone: "warning" as const },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">
          Hoş geldiniz, {session.user.email}
        </h1>
        <p className="text-sm text-ink-400">
          {ROLE_DESCRIPTIONS[session.user.role]}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={CARD}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-400">{stat.label}</span>
                <span
                  className={
                    "flex h-9 w-9 items-center justify-center rounded-xl " +
                    TONE_BG[stat.tone]
                  }
                >
                  <Icon className={"h-4 w-4 " + TONE_FG[stat.tone]} strokeWidth={2} />
                </span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-ink-900">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TONE_BG = {
  purple: "bg-purple-bg",
  success: "bg-success-bg",
  warning: "bg-warning-bg",
  info: "bg-info-bg",
};

const TONE_FG = {
  purple: "text-purple-fg",
  success: "text-success-fg",
  warning: "text-warning-fg",
  info: "text-info-fg",
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
  company_admin: "Firma genelindeki tüm markaları ve bayileri yönetebilirsiniz.",
  brand_manager: "Markalara ait katalog ve bayi ayarlarını yönetebilirsiniz.",
};
