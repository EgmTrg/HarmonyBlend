import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { BUTTON_GHOST_DANGER, BUTTON_PRIMARY, CARD, INPUT, LABEL } from "@/lib/ui";
import { updateBrand, deleteBrand } from "../actions";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireAdminSession();

  const [brand] = await db
    .select()
    .from(brands)
    .where(and(eq(brands.id, id), eq(brands.companyId, session.user.companyId)))
    .limit(1);

  if (!brand) notFound();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink-900">Marka düzenle</h1>

      <div className={CARD}>
        <form action={updateBrand.bind(null, brand.id)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className={LABEL}>Marka adı</span>
            <input name="name" defaultValue={brand.name} required className={INPUT} />
          </label>
          <button type="submit" className={`self-start ${BUTTON_PRIMARY}`}>
            Kaydet
          </button>
        </form>
      </div>

      <form action={deleteBrand.bind(null, brand.id)}>
        <button type="submit" className={BUTTON_GHOST_DANGER}>
          Markayı sil
        </button>
      </form>
    </div>
  );
}
