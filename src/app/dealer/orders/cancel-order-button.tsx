"use client";

import { useState } from "react";
import { Ban, CheckCircle2, X } from "lucide-react";
import { useToast } from "@/lib/toast";
import { cancelOrder } from "../actions";
import { BUTTON_GHOST } from "@/lib/ui";

export function CancelOrderButton({ orderId }: { orderId: string }) {
  const { showToast } = useToast();
  const [reasonMode, setReasonMode] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("note", note.trim());
      await cancelOrder(orderId, formData);
      showToast({ title: "Sipariş iptal edildi", variant: "success" });
      setReasonMode(false);
      setNote("");
    } catch (err) {
      showToast({
        title: err instanceof Error ? err.message : "Sipariş iptal edilemedi.",
        variant: "danger",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (reasonMode) {
    return (
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          autoFocus
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="İptal sebebi..."
          className="w-36 rounded-lg border border-border bg-card px-2 py-1 text-xs outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
        />
        <button
          type="button"
          title="Onayla"
          disabled={!note.trim() || submitting}
          onClick={handleConfirm}
          className="rounded-lg p-1.5 text-success-fg transition hover:bg-success-bg disabled:opacity-40"
        >
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          title="Vazgeç"
          disabled={submitting}
          onClick={() => {
            setReasonMode(false);
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
    <button
      type="button"
      onClick={() => setReasonMode(true)}
      className={`${BUTTON_GHOST} inline-flex items-center gap-1`}
    >
      <Ban className="h-3.5 w-3.5" strokeWidth={2} />
      İptal Et
    </button>
  );
}
