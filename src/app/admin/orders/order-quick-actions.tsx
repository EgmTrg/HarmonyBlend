"use client";

import { useState } from "react";
import { Ban, CheckCircle2, X, XCircle } from "lucide-react";
import { useToast } from "@/lib/toast";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/order-status";
import { transitionOrderStatus } from "./actions";

type ReasonMode = "rejected" | "cancelled" | null;

// Sipariş listesinden, detay sayfasına girmeden tek tıkla onaylama / iki
// tıkla reddetme-iptal etme. Onaylama not gerektirmediği için tek tık
// yeterli; reddetme ve iptalde sunucu tarafı bir not zorunlu tutuyor
// (bkz. actions.ts::transitionOrderStatus) — bu yüzden ilk tık küçük bir
// sebep kutusu açar, ikinci tık (onay ikonu) o notla işlemi tamamlar.
export function OrderQuickActions({
  orderId,
  statuses,
}: {
  orderId: string;
  statuses: OrderStatus[];
}) {
  const { showToast } = useToast();
  const [reasonMode, setReasonMode] = useState<ReasonMode>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canApprove = statuses.includes("approved");
  const canReject = statuses.includes("rejected");
  const canCancel = statuses.includes("cancelled");

  if (!canApprove && !canReject && !canCancel) return null;

  async function runTransition(status: OrderStatus, noteValue?: string) {
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (noteValue) formData.set("note", noteValue);
      await transitionOrderStatus(orderId, status, formData);
      showToast({ title: `Durum güncellendi: ${ORDER_STATUS_LABELS[status]}`, variant: "success" });
      setReasonMode(null);
      setNote("");
    } catch (err) {
      showToast({ title: err instanceof Error ? err.message : "Bir hata oluştu.", variant: "danger" });
    } finally {
      setSubmitting(false);
    }
  }

  if (reasonMode) {
    return (
      <div className="flex items-center justify-end gap-1.5">
        <input
          type="text"
          autoFocus
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={reasonMode === "rejected" ? "Red sebebi..." : "İptal sebebi..."}
          className="w-36 rounded-lg border border-border bg-card px-2 py-1 text-xs outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
        />
        <button
          type="button"
          title="Onayla"
          disabled={!note.trim() || submitting}
          onClick={() => runTransition(reasonMode, note.trim())}
          className="rounded-lg p-1.5 text-success-fg transition hover:bg-success-bg disabled:opacity-40"
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          title="Vazgeç"
          disabled={submitting}
          onClick={() => {
            setReasonMode(null);
            setNote("");
          }}
          className="rounded-lg p-1.5 text-ink-400 transition hover:bg-content"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-1.5">
      {canApprove && (
        <button
          type="button"
          title="Onayla"
          disabled={submitting}
          onClick={() => runTransition("approved")}
          className="rounded-lg p-1.5 text-success-fg transition hover:bg-success-bg disabled:opacity-40"
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
      {canReject && (
        <button
          type="button"
          title="Reddet"
          disabled={submitting}
          onClick={() => setReasonMode("rejected")}
          className="rounded-lg p-1.5 text-danger-fg transition hover:bg-danger-bg disabled:opacity-40"
        >
          <XCircle className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
      {canCancel && (
        <button
          type="button"
          title="İptal Et"
          disabled={submitting}
          onClick={() => setReasonMode("cancelled")}
          className="rounded-lg p-1.5 text-warning-fg transition hover:bg-warning-bg disabled:opacity-40"
        >
          <Ban className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
