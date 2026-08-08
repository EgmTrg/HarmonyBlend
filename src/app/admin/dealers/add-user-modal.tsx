"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { createDealerOrUser } from "./actions";
import { BUTTON_PRIMARY, INPUT, LABEL } from "@/lib/ui";

type Role = "dealer_user" | "company_admin" | "brand_manager";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "dealer_user", label: "Bayi" },
  { value: "company_admin", label: "Admin" },
  { value: "brand_manager", label: "Yönetici" },
];

interface CompanyBrand {
  id: string;
  name: string;
}

export function AddDealerOrUserModal({ companyBrands }: { companyBrands: CompanyBrand[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<Role>("dealer_user");
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setIsOpen(false);
    setRole("dealer_user");
    setActiveTab(1);
    setError(null);
  }

  function selectRole(next: Role) {
    setRole(next);
    if (next !== "dealer_user" && activeTab !== 1) setActiveTab(1);
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const password = String(formData.get("password") ?? "");
    const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
    if (password !== passwordConfirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    setSubmitting(true);
    try {
      await createDealerOrUser(formData);
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={BUTTON_PRIMARY}>
        <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
        Ekle
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={close}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-ink-900">Bayi / Kullanıcı Ekle</h2>
              <button type="button" onClick={close} aria-label="Kapat" className="text-ink-400 hover:text-ink-900">
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <form action={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-col gap-2 border-b border-border px-6 py-4">
                <span className={LABEL}>Rol</span>
                <div className="flex gap-2">
                  {ROLE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={
                        "flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition " +
                        (role === opt.value
                          ? "border-accent-600 bg-accent-600 text-white"
                          : "border-border text-ink-600 hover:border-accent-500")
                      }
                    >
                      <input
                        type="radio"
                        name="role"
                        value={opt.value}
                        checked={role === opt.value}
                        onChange={() => selectRole(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex border-b border-border px-6">
                <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Kullanıcı Bilgileri
                </TabButton>
                {role === "dealer_user" && (
                  <>
                    <TabButton active={activeTab === 2} onClick={() => setActiveTab(2)}>
                      Bayi Ayarları
                    </TabButton>
                    <TabButton active={activeTab === 3} onClick={() => setActiveTab(3)}>
                      Markalaşma
                    </TabButton>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 px-6 py-5">
                <div className={activeTab === 1 ? "flex flex-col gap-4" : "hidden"}>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Kullanıcı adı</span>
                    <input name="name" required className={INPUT} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>E-posta</span>
                    <input name="email" type="email" required className={INPUT} />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>Şifre</span>
                      <input name="password" type="password" required minLength={8} className={INPUT} />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>Şifre tekrar</span>
                      <input name="passwordConfirm" type="password" required minLength={8} className={INPUT} />
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-ink-600">
                    <input name="isActive" type="checkbox" value="true" defaultChecked />
                    Hesap etkin (aktif)
                  </label>
                </div>

                {role === "dealer_user" && (
                  <>
                    <div className={activeTab === 2 ? "flex flex-col gap-4" : "hidden"}>
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>VKN</span>
                        <input name="taxNo" className={INPUT} />
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1">
                          <span className={LABEL}>İl</span>
                          <input name="il" className={INPUT} />
                        </label>
                        <label className="flex flex-col gap-1">
                          <span className={LABEL}>Bölge</span>
                          <input name="bolge" className={INPUT} />
                        </label>
                      </div>
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>Depo seçimi</span>
                        <select disabled className={`${INPUT} opacity-60`}>
                          <option>Yakında eklenecek</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>Fiyat listesi seçimi</span>
                        <select disabled className={`${INPUT} opacity-60`}>
                          <option>Yakında eklenecek</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>Maksimum bakiye limiti</span>
                        <input
                          name="maxBalanceLimit"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="Boş bırakılırsa limitsiz"
                          className={INPUT}
                        />
                        <span className="text-xs text-ink-400">
                          Bu tutar aşılırsa cari ile ödeme kapanır, bayi nakit/kapıda ödeme
                          kullanmak zorunda kalır.
                        </span>
                      </label>
                    </div>

                    <div className={activeTab === 3 ? "flex flex-col gap-2" : "hidden"}>
                      <span className={LABEL}>Markalar</span>
                      {companyBrands.map((brand) => (
                        <label key={brand.id} className="flex items-center gap-2 text-sm text-ink-900">
                          <input type="checkbox" name="brandIds" value={brand.id} />
                          {brand.name}
                        </label>
                      ))}
                      {companyBrands.length === 0 && (
                        <p className="text-sm text-ink-400">Önce bir marka oluşturun.</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {error && (
                <p className="mx-6 mb-4 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                <button type="button" onClick={close} className="text-sm text-ink-400 hover:text-ink-900">
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`${BUTTON_PRIMARY} disabled:opacity-50`}
                >
                  {submitting ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "border-b-2 px-3 py-3 text-sm font-medium transition " +
        (active
          ? "border-accent-600 text-accent-600"
          : "border-transparent text-ink-400 hover:text-ink-600")
      }
    >
      {children}
    </button>
  );
}
