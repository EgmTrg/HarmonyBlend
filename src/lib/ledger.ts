import { eq } from "drizzle-orm";
import { db } from "@/db";
import { dealers, ledgerEntries } from "@/db/schema";

interface PostLedgerEntryInput {
  dealerId: string;
  direction: "debit" | "credit";
  amount: string;
  sourceType: "order" | "payment" | "manual_adjustment";
  sourceId: string;
  note?: string;
}

// dealers.currentBalance yalnızca bir önbellek — gerçek kaynak
// ledger_entries'teki hareket geçmişi (bkz. docs/roadmap.md §2). Bu fonksiyon
// ikisini birlikte, tek yerden günceller ki çağıran kod hiçbir zaman
// currentBalance'ı doğrudan yazmasın.
export async function postLedgerEntry(input: PostLedgerEntryInput): Promise<string> {
  const [dealer] = await db
    .select({ currentBalance: dealers.currentBalance })
    .from(dealers)
    .where(eq(dealers.id, input.dealerId))
    .limit(1);
  if (!dealer) throw new Error("Bayi bulunamadı.");

  const current = Number(dealer.currentBalance);
  const delta = input.direction === "debit" ? Number(input.amount) : -Number(input.amount);
  const newBalance = (current + delta).toFixed(2);

  await db.insert(ledgerEntries).values({
    dealerId: input.dealerId,
    direction: input.direction,
    amount: input.amount,
    sourceType: input.sourceType,
    sourceId: input.sourceId,
    note: input.note,
    balanceAfter: newBalance,
  });

  await db.update(dealers).set({ currentBalance: newBalance }).where(eq(dealers.id, input.dealerId));

  return newBalance;
}
