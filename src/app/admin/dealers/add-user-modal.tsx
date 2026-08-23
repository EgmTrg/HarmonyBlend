"use client";

import { useState, type ReactNode } from "react";
import { Pencil, Plus, X } from "lucide-react";
import { createDealerOrUser, saveDealerUser, updateDealerAndBrands } from "./actions";
import { BUTTON_GHOST, BUTTON_PRIMARY, INPUT, LABEL } from "@/lib/ui";
import { CurrencyInput } from "@/components/currency-input";
import { useToast } from "@/lib/toast";

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
  const { showToast } = useToast();
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
      showToast({ title: "Kaydedildi", variant: "success" });
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

            <form action={handleSubmit} className="flex flex-1 flex-col overflow-y-auto" autoComplete="off">
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
                    <input name="name" required autoComplete="off" className={INPUT} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>E-posta</span>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="off"
                      className={INPUT}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>Şifre</span>
                      <input
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className={INPUT}
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>Şifre tekrar</span>
                      <input
                        name="passwordConfirm"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className={INPUT}
                      />
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
                        <CurrencyInput name="maxBalanceLimit" placeholder="Boş bırakılırsa limitsiz" />
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

interface EditableDealer {
  id: string;
  name: string;
  taxNo: string | null;
  il: string | null;
  bolge: string | null;
  maxBalanceLimit: string | null;
}

interface PrimaryUser {
  id: string;
  name: string | null;
  email: string;
  isActive: boolean;
}

export function EditDealerModal({
  dealer,
  companyBrands,
  assignedBrandIds,
  primaryUser,
}: {
  dealer: EditableDealer;
  companyBrands: CompanyBrand[];
  assignedBrandIds: string[];
  primaryUser: PrimaryUser | null;
}) {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [userRole, setUserRole] = useState<Role>("dealer_user");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setIsOpen(false);
    setActiveTab(1);
    setUserRole("dealer_user");
    setError(null);
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    const userName = String(formData.get("userName") ?? "").trim();
    const userEmail = String(formData.get("userEmail") ?? "").trim();
    // Kullanıcı zaten varsa alanlar hep dolu geliyor, her kayıtta güncellenir.
    // Yoksa yalnızca admin gerçekten isim/e-posta girdiyse yeni hesap
    // oluşturmayı dene — aksi halde "Bayi Ayarları" sekmesinden yapılan
    // sıradan bir güncelleme, Kullanıcı sekmesine hiç bakılmadan
    // "Kullanıcı adı zorunlu" hatasına takılmasın.
    const wantsUserChange = primaryUser !== null || userName !== "" || userEmail !== "";

    if (!primaryUser && wantsUserChange) {
      const password = String(formData.get("userPassword") ?? "");
      const passwordConfirm = String(formData.get("userPasswordConfirm") ?? "");
      if (password !== passwordConfirm) {
        setError("Şifreler eşleşmiyor.");
        return;
      }
    }
    setSubmitting(true);
    try {
      await updateDealerAndBrands(dealer.id, formData);
      if (wantsUserChange) {
        await saveDealerUser(dealer.id, primaryUser?.id ?? null, formData);
      }
      close();
      showToast({ title: "Bayi güncellendi", variant: "success" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={`${BUTTON_GHOST} inline-flex items-center gap-1`}>
        <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
        Düzenle
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
              <h2 className="text-lg font-semibold text-ink-900">Bayi düzenle</h2>
              <button type="button" onClick={close} aria-label="Kapat" className="text-ink-400 hover:text-ink-900">
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <form action={handleSubmit} className="flex flex-1 flex-col overflow-y-auto" autoComplete="off">
              <div className="flex border-b border-border px-6">
                <TabButton active={activeTab === 1} onClick={() => setActiveTab(1)}>
                  Bayi Ayarları
                </TabButton>
                <TabButton active={activeTab === 2} onClick={() => setActiveTab(2)}>
                  Markalaşma
                </TabButton>
                <TabButton active={activeTab === 3} onClick={() => setActiveTab(3)}>
                  Kullanıcı
                </TabButton>
              </div>

              <div className="flex flex-col gap-4 px-6 py-5">
                <div className={activeTab === 1 ? "flex flex-col gap-4" : "hidden"}>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Bayi adı</span>
                    <input name="name" defaultValue={dealer.name} required className={INPUT} />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>VKN</span>
                    <input name="taxNo" defaultValue={dealer.taxNo ?? ""} className={INPUT} />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>İl</span>
                      <input name="il" defaultValue={dealer.il ?? ""} className={INPUT} />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className={LABEL}>Bölge</span>
                      <input name="bolge" defaultValue={dealer.bolge ?? ""} className={INPUT} />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Maksimum bakiye limiti</span>
                    <CurrencyInput
                      name="maxBalanceLimit"
                      defaultValue={dealer.maxBalanceLimit}
                      placeholder="Boş bırakılırsa limitsiz"
                    />
                    <span className="text-xs text-ink-400">
                      Bu tutar aşılırsa cari ile ödeme kapanır, bayi nakit/kapıda ödeme
                      kullanmak zorunda kalır.
                    </span>
                  </label>
                </div>

                <div className={activeTab === 2 ? "flex flex-col gap-2" : "hidden"}>
                  <span className={LABEL}>Markalar</span>
                  {companyBrands.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-2 text-sm text-ink-900">
                      <input
                        type="checkbox"
                        name="brandIds"
                        value={brand.id}
                        defaultChecked={assignedBrandIds.includes(brand.id)}
                      />
                      {brand.name}
                    </label>
                  ))}
                  {companyBrands.length === 0 && (
                    <p className="text-sm text-ink-400">Önce bir marka oluşturun.</p>
                  )}
                </div>

                <div className={activeTab === 3 ? "flex flex-col gap-4" : "hidden"}>
                  {!primaryUser && (
                    <p className="text-xs text-ink-400">
                      Bu bayi için henüz kullanıcı hesabı yok — aşağıdaki bilgilerle yeni bir
                      hesap oluşturulacak.
                    </p>
                  )}
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>Kullanıcı adı</span>
                    <input
                      name="userName"
                      defaultValue={primaryUser?.name ?? ""}
                      autoComplete="off"
                      className={INPUT}
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className={LABEL}>E-posta</span>
                    <input
                      name="userEmail"
                      type="email"
                      defaultValue={primaryUser?.email ?? ""}
                      autoComplete="off"
                      className={INPUT}
                    />
                  </label>
                  {!primaryUser && (
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>Şifre</span>
                        <input
                          name="userPassword"
                          type="password"
                          minLength={8}
                          autoComplete="new-password"
                          className={INPUT}
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className={LABEL}>Şifre tekrar</span>
                        <input
                          name="userPasswordConfirm"
                          type="password"
                          minLength={8}
                          autoComplete="new-password"
                          className={INPUT}
                        />
                      </label>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className={LABEL}>Rol</span>
                    <div className="flex gap-2">
                      {ROLE_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={
                            "flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition " +
                            (userRole === opt.value
                              ? "border-accent-600 bg-accent-600 text-white"
                              : "border-border text-ink-600 hover:border-accent-500")
                          }
                        >
                          <input
                            type="radio"
                            name="userRole"
                            value={opt.value}
                            checked={userRole === opt.value}
                            onChange={() => setUserRole(opt.value)}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                    {userRole !== "dealer_user" && (
                      <span className="text-xs text-ink-400">
                        Bu kullanıcı artık bu bayiye değil, firma geneline (head office) bağlı
                        olacak.
                      </span>
                    )}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-ink-600">
                    <input
                      name="userIsActive"
                      type="checkbox"
                      value="true"
                      defaultChecked={primaryUser?.isActive ?? true}
                    />
                    Hesap etkin (aktif)
                  </label>
                </div>
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
