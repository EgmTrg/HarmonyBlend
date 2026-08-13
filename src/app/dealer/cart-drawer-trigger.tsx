"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/lib/toast";

export function CartDrawerTrigger() {
  const { totalItemCount, openDrawer, clearCart } = useCart();
  const { showToast } = useToast();

  function handleClearCart() {
    clearCart();
    showToast({ title: "Sepet boşaltıldı", variant: "success" });
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleClearCart}
        disabled={totalItemCount === 0}
        className="text-xs font-medium text-white/60 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-white/60"
      >
        Sepeti boşalt
      </button>
      <button
        type="button"
        onClick={openDrawer}
        aria-label="Sepeti aç"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <ShoppingCart className="h-5 w-5" strokeWidth={2} />
        {totalItemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-600 px-1 text-[10px] font-semibold text-white">
            {totalItemCount}
          </span>
        )}
      </button>
    </div>
  );
}
