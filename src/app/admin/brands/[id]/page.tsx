import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { brands } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
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
      <h1 className="text-xl font-semibold">Marka düzenle</h1>

      <form action={updateBrand.bind(null, brand.id)} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-neutral-500">Marka adı</span>
          <input
            name="name"
            defaultValue={brand.name}
            required
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="self-start rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
        >
          Kaydet
        </button>
      </form>

      <form action={deleteBrand.bind(null, brand.id)}>
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Markayı sil
        </button>
      </form>
    </div>
  );
}
