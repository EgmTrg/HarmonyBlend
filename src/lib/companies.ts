import { eq, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { companies } from "@/db/schema";

export type ResolvedCompany = { id: string; code: string; name: string };

export async function resolveCompanyByCodeOrName(rawInput: string): Promise<ResolvedCompany | null> {
  const input = rawInput.trim();
  if (!input) return null;

  const [company] = await db
    .select({ id: companies.id, code: companies.code, name: companies.name })
    .from(companies)
    .where(
      or(
        eq(companies.code, input.toUpperCase()),
        sql`lower(${companies.name}) = lower(${input})`
      )
    )
    .limit(1);

  return company ?? null;
}
