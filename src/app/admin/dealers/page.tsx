import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { dealers } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { createDealer, deleteDealer } from "./actions";

export default async function DealersPage() {
  const session = await requireAdminSession();

  const companyDealers = await db
    .select()
    .from(dealers)
    .where(eq(dealers.companyId, session.user.companyId))
    .orderBy(dealers.name);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Bayiler</h1>
        <p className="text-sm text-neutral-600">
          Bayileri tanımlayın ve hangi markalara erişebileceklerini atayın.
        </p>
      </div>

      <form action={createDealer} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs text-neutral-500">
            Bayi adı
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="taxNo" className="text-xs text-neutral-500">
            Vergi no
          </label>
          <input
            id="taxNo"
            name="taxNo"
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="address" className="text-xs text-neutral-500">
            Adres
          </label>
          <input
            id="address"
            name="address"
            className="rounded border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white"
        >
          Ekle
        </button>
      </form>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 text-left text-neutral-500">
            <th className="py-2 font-medium">Ad</th>
            <th className="py-2 font-medium">Vergi no</th>
            <th className="py-2 font-medium">Bakiye</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {companyDealers.map((dealer) => (
            <tr key={dealer.id} className="border-b border-neutral-100">
              <td className="py-2">
                <Link href={`/admin/dealers/${dealer.id}`} className="hover:underline">
                  {dealer.name}
                </Link>
              </td>
              <td className="py-2 text-neutral-500">{dealer.taxNo ?? "—"}</td>
              <td className="py-2 text-neutral-500">{dealer.currentBalance}</td>
              <td className="py-2 text-right">
                <form action={deleteDealer.bind(null, dealer.id)}>
                  <button type="submit" className="text-xs text-red-600 hover:underline">
                    Sil
                  </button>
                </form>
              </td>
            </tr>
          ))}
          {companyDealers.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-neutral-400">
                Henüz bayi eklenmedi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
