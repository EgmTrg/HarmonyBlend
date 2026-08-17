import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { dealers, payments } from "@/db/schema";
import { requireDealerSession } from "@/lib/session";
import { BalanceForm } from "./balance-form";

export default async function BalancePage() {
  const session = await requireDealerSession();
  const dealerId = session.user.dealerId as string;

  const [[dealer], recentPayments] = await Promise.all([
    db.select().from(dealers).where(eq(dealers.id, dealerId)).limit(1),
    db
      .select()
      .from(payments)
      .where(and(eq(payments.dealerId, dealerId), eq(payments.type, "standalone_collection")))
      .orderBy(desc(payments.createdAt))
      .limit(20),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Bakiye Öde</h1>
        <p className="text-sm text-ink-400">
          Siparişe bağlı olmadan cari bakiyenizi mock sanal POS ile kapatın.
        </p>
      </div>

      <BalanceForm
        currentBalance={dealer?.currentBalance ?? "0"}
        recentPayments={recentPayments.map((p) => ({
          id: p.id,
          amount: p.amount,
          status: p.status,
          createdAt: p.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
