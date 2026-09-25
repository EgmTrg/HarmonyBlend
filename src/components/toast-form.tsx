"use client";

import type { ReactNode } from "react";
import { useToast } from "@/lib/toast";

/**
 * `<form>` yerine geçer — server action'ı çağırıp sonucuna göre başarı/hata
 * toast'ı gösterir. Server action referansını doğrudan `action` prop'una
 * vermek yerine sarmalıyoruz ki try/catch ile toast tetikleyebilelim.
 */
export function ToastForm({
  action,
  successMessage,
  className,
  autoComplete,
  children,
}: {
  action: (formData: FormData) => Promise<unknown>;
  successMessage: string;
  className?: string;
  autoComplete?: string;
  children: ReactNode;
}) {
  const { showToast } = useToast();

  async function handleAction(formData: FormData) {
    try {
      await action(formData);
      showToast({ title: successMessage, variant: "success" });
    } catch (err) {
      showToast({
        title: err instanceof Error ? err.message : "Bir hata oluştu.",
        variant: "danger",
      });
    }
  }

  return (
    <form action={handleAction} className={className} autoComplete={autoComplete}>
      {children}
    </form>
  );
}
