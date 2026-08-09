"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast";
import { BUTTON_GHOST_DANGER } from "@/lib/ui";

/**
 * İki tıklamalı sil butonu — native confirm()/alert() kullanmadan onay ister
 * (bkz. Faz 3: bu proje bilinçli olarak alert()/confirm() yerine toast
 * kullanıyor). İlk tık "Emin misiniz?" durumuna geçer, ikinci tık action'ı
 * çalıştırır.
 */
export function ConfirmDeleteButton({
  action,
  confirmLabel,
  idleLabel = "Sil",
  successMessage,
  muted = false,
  redirectTo,
}: {
  action: (formData: FormData) => Promise<unknown>;
  confirmLabel: string;
  idleLabel?: string;
  successMessage: string;
  /** Zorla sil gibi ikincil/az öne çıkan aksiyonlar için soluk stil */
  muted?: boolean;
  /** Başarılı silme sonrası yönlendirilecek yol (ör. detay sayfasından listeye dönüş) */
  redirectTo?: string;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setPending(true);
    try {
      await action(new FormData());
      showToast({ title: successMessage, variant: "success" });
      if (redirectTo) router.push(redirectTo);
    } catch (err) {
      showToast({
        title: err instanceof Error ? err.message : "Bir hata oluştu.",
        variant: "danger",
      });
      setConfirming(false);
    } finally {
      setPending(false);
    }
  }

  const idleClassName = muted
    ? "text-xs text-ink-300 hover:text-danger-fg"
    : BUTTON_GHOST_DANGER;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`${confirming ? BUTTON_GHOST_DANGER : idleClassName} disabled:opacity-50`}
    >
      {pending ? "..." : confirming ? confirmLabel : idleLabel}
    </button>
  );
}
