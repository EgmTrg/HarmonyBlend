import { eq } from "drizzle-orm";
import { db } from "@/db";
import { companies } from "@/db/schema";
import { requireAdminSession } from "@/lib/session";
import { BUTTON_PRIMARY, CARD } from "@/lib/ui";
import { ToastForm } from "@/components/toast-form";
import { updateOrderApprovalSetting } from "./actions";

export default async function AdminSettingsPage() {
  const session = await requireAdminSession();

  const [company] = await db
    .select({ requiresOrderApproval: companies.requiresOrderApproval })
    .from(companies)
    .where(eq(companies.id, session.user.companyId))
    .limit(1);

  const isCompanyAdmin = session.user.role === "company_admin";

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Ayarlar</h1>
        <p className="text-sm text-ink-400">Firma genelindeki sipariş ve onay kuralları.</p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink-900">Sipariş Onayı</h2>
        <div className={CARD}>
          {isCompanyAdmin ? (
            <ToastForm
              action={updateOrderApprovalSetting}
              successMessage="Ayar kaydedildi"
              className="flex flex-col gap-3"
            >
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="requiresOrderApproval"
                  defaultChecked={company?.requiresOrderApproval ?? true}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-accent-600"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-ink-900">
                    Bayi siparişleri fabrika/yönetici onayı gerektirsin
                  </span>
                  <span className="text-xs text-ink-400">
                    Açıkken bir bayi sipariş verdiğinde (veya sanal POS ödemesi başarılı
                    olduğunda) sipariş &quot;Gönderildi&quot; durumunda bekler, admin panelinden
                    manuel onaylanması gerekir. Kapalıyken siparişler otomatik olarak
                    onaylanmış sayılır — hazırlık sürecine doğrudan geçer. Her iki durumda
                    da onaylanmış bir sipariş yine de admin tarafından iptal edilebilir.
                  </span>
                </span>
              </label>
              <button type="submit" className={`self-start ${BUTTON_PRIMARY}`}>
                Kaydet
              </button>
            </ToastForm>
          ) : (
            <p className="text-sm text-ink-400">
              Bu ayarı yalnızca firma yöneticileri değiştirebilir. Güncel durum:{" "}
              <span className="font-medium text-ink-900">
                {company?.requiresOrderApproval ? "Onay gerekiyor" : "Otomatik onaylanıyor"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
