"use client";

import { useState } from "react";
import { useToast } from "@/lib/toast";
import { BUTTON_PRIMARY, INPUT, LABEL } from "@/lib/ui";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/order-status";
import { transitionOrderStatus } from "../actions";

export function StatusTransitionActions({
  orderId,
  statuses,
}: {
  orderId: string;
  statuses: OrderStatus[];
}) {
  const { showToast } = useToast();
  const [note, setNote] = useState("");
  const [pending, setPending] = useState<OrderStatus | null>(null);

  async function handleTransition(status: OrderStatus) {
    if ((status === "rejected" || status === "cancelled") && !note.trim()) {
      showToast({ title: "Reddetmek veya iptal etmek için not girmelisiniz.", variant: "danger" });
      return;
    }
    setPending(status);
    try {
      const formData = new FormData();
      formData.set("note", note);
      await transitionOrderStatus(orderId, status, formData);
      showToast({ title: `Durum güncellendi: ${ORDER_STATUS_LABELS[status]}`, variant: "success" });
      setNote("");
    } catch (err) {
      showToast({
        title: err instanceof Error ? err.message : "Durum güncellenemedi.",
        variant: "danger",
      });
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className={LABEL}>Not (red veya iptalde zorunlu)</span>
        <input value={note} onChange={(e) => setNote(e.target.value)} className={INPUT} />
      </label>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            disabled={pending !== null}
            onClick={() => handleTransition(status)}
            className={`${BUTTON_PRIMARY} text-xs disabled:opacity-50`}
          >
            {pending === status ? "..." : ORDER_STATUS_LABELS[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
