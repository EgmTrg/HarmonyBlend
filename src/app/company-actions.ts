"use server";

import { resolveCompanyByCodeOrName } from "@/lib/companies";

export async function findCompanyAction(formData: FormData): Promise<{ code: string; name: string }> {
  const input = String(formData.get("companyInput") ?? "").trim();
  if (!input) throw new Error("Firma kodu veya adı gerekli.");

  const company = await resolveCompanyByCodeOrName(input);
  if (!company) throw new Error("Firma bulunamadı. Lütfen firma kodunu veya adını kontrol edin.");

  return { code: company.code, name: company.name };
}
