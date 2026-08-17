"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorageStore } from "@/lib/use-local-storage-store";
import { useToast } from "@/lib/toast";
import { COMPANY_STORAGE_KEY, type StoredCompany } from "@/lib/company-storage";
import { BUTTON_PRIMARY, INPUT, LABEL } from "@/lib/ui";
import { findCompanyAction } from "./company-actions";

export function CompanyGate({ invalidCompany }: { invalidCompany: boolean }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [company, setCompany] = useLocalStorageStore<StoredCompany | null>(COMPANY_STORAGE_KEY, null);
  const [error, setError] = useState<string | null>(
    invalidCompany ? "Kayıtlı firma artık geçerli değil. Lütfen tekrar girin." : null
  );
  const [pending, setPending] = useState(false);
  const cacheToastShown = useRef(false);

  useEffect(() => {
    if (invalidCompany && company) {
      setCompany(null);
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidCompany]);

  // Sayfa yüklendiğinde cache'te zaten bir firma varsa bunu bildiren bir
  // toast göster — localStorage doğrudan okunuyor ki bu, formdan yeni
  // seçilen bir firma için (setCompany çağrısı sonrası) tetiklenmesin,
  // yalnızca önceden önbelleklenmiş bir değer okunduğunda çalışsın.
  useEffect(() => {
    if (cacheToastShown.current) return;
    try {
      const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
      if (!raw || invalidCompany) return;
      const cached = JSON.parse(raw) as StoredCompany;
      if (cached?.code) {
        cacheToastShown.current = true;
        showToast({
          title: `${cached.name} (${cached.code}) firması ile giriş yapılacak`,
          variant: "info",
        });
      }
    } catch {
      // localStorage okunamazsa (gizli mod vb.) sessizce yoksay
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (company && !invalidCompany) {
    return (
      <Link href={`/login?company=${encodeURIComponent(company.code)}`} className={BUTTON_PRIMARY}>
        Giriş yap →
      </Link>
    );
  }

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    try {
      const resolved = await findCompanyAction(formData);
      setCompany(resolved);
      router.push(`/login?company=${encodeURIComponent(resolved.code)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="flex w-full max-w-xs flex-col gap-3">
      <label className="flex flex-col gap-1 text-left">
        <span className={LABEL}>Firma kodu veya adı</span>
        <input name="companyInput" placeholder="Örn. TUNAM" required className={INPUT} />
      </label>
      {error && (
        <p className="rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">{error}</p>
      )}
      <button type="submit" disabled={pending} className={`justify-center ${BUTTON_PRIMARY} disabled:opacity-50`}>
        {pending ? "..." : "Devam et →"}
      </button>
    </form>
  );
}
