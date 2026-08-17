"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { payBalance } from "./actions";
import { useToast } from "@/lib/toast";
import { formatCurrency } from "@/lib/format";
import { BUTTON_PRIMARY, CARD, INPUT, LABEL, TABLE_HEAD, TABLE_ROW, badgeClass, type BadgeTone } from "@/lib/ui";

interface RecentPayment {
  id: string;
  amount: string;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  success: "Başarılı",
  failed: "Başarısız",
  pending: "Beklemede",
  refunded: "İade Edildi",
};

const STATUS_TONES: Record<string, BadgeTone> = {
  success: "success",
  failed: "danger",
  pending: "warning",
  refunded: "info",
};

export function BalanceForm({
  currentBalance,
  recentPayments,
}: {
  currentBalance: string;
  recentPayments: RecentPayment[];
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [amount, setAmount] = useState(currentBalance);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const balanceNumber = Number(currentBalance);

  async function handleSubmit() {
    setError(null);
    if (!amount || Number(amount) <= 0) {
      setError("Lütfen geçerli bir tutar girin.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await payBalance(amount, simulateFailure);
      if (result.status === "success") {
        showToast({ title: "Ödeme başarılı, bakiyeniz güncellendi", variant: "success" });
        router.refresh();
      } else {
        setError("Mock POS ödemesi başarısız oldu. Tekrar deneyebilirsiniz.");
        showToast({ title: "Ödeme başarısız", variant: "danger" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ödeme yapılamadı.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className={CARD}>
        <h2 className="mb-1 text-sm font-semibold text-ink-900">Güncel Cari Bakiye</h2>
        <p
          className={`text-2xl font-semibold ${balanceNumber > 0 ? "text-warning-fg" : "text-success-fg"}`}
        >
          {formatCurrency(balanceNumber)}
        </p>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Mock Sanal POS</h2>
        <p className="mb-3 text-xs text-ink-400">
          Bu bir test/mock ödeme sağlayıcısıdır — gerçek kart bilgisi işlenmez.
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className={LABEL}>Ödenecek tutar</span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={INPUT}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={LABEL}>Kart numarası</span>
            <input placeholder="4242 4242 4242 4242" disabled className={`${INPUT} opacity-60`} />
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
            />
            Ödemeyi başarısız olarak simüle et (test amaçlı)
          </label>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-danger-bg px-3 py-2 text-sm text-danger-fg">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`mt-4 self-start ${BUTTON_PRIMARY} disabled:opacity-50`}
        >
          {submitting ? "İşleniyor..." : "Ödemeyi Tamamla"}
        </button>
      </div>

      <div className={CARD}>
        <h2 className="mb-3 text-sm font-semibold text-ink-900">Ödeme Geçmişi</h2>
        {recentPayments.length === 0 ? (
          <p className="text-sm text-ink-400">Henüz bir bakiye ödemesi yapılmadı.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className={TABLE_HEAD}>
                <th className="pb-2">Tarih</th>
                <th className="pb-2 text-right">Tutar</th>
                <th className="pb-2 text-right">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p.id} className={TABLE_ROW}>
                  <td className="py-3 text-ink-600">
                    {new Date(p.createdAt).toLocaleString("tr-TR")}
                  </td>
                  <td className="py-3 text-right text-ink-900">{formatCurrency(Number(p.amount))}</td>
                  <td className="py-3 text-right">
                    <span className={badgeClass(STATUS_TONES[p.status] ?? "neutral")}>
                      {STATUS_LABELS[p.status] ?? p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
