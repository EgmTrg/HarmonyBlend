"use client";

import { useRouter } from "next/navigation";
import { useLocalStorageStore } from "@/lib/use-local-storage-store";
import { COMPANY_STORAGE_KEY, type StoredCompany } from "@/lib/company-storage";
import { BUTTON_GHOST } from "@/lib/ui";

export function ChangeCompanyButton() {
  const router = useRouter();
  const [, setCompany] = useLocalStorageStore<StoredCompany | null>(COMPANY_STORAGE_KEY, null);

  return (
    <button
      type="button"
      onClick={() => {
        setCompany(null);
        router.push("/");
      }}
      className={`mt-4 block w-full text-center ${BUTTON_GHOST}`}
    >
      Firma değiştir
    </button>
  );
}
