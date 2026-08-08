"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useLocalStorageStore } from "@/lib/use-local-storage-store";

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  unit: string;
  unitPrice: string;
  quantity: number;
}

// Sipariş tek bir markaya ait olduğu için (orders.brand_id), sepet de
// marka bazlı ayrı listeler halinde tutuluyor — bir bayi birden fazla
// markanın kataloğunda gezinip her biri için ayrı sepet biriktirebilir.
type CartsByBrand = Record<string, CartItem[]>;

interface CartContextValue {
  carts: CartsByBrand;
  addItem: (brandId: string, item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (brandId: string, productId: string) => void;
  setQuantity: (brandId: string, productId: string, quantity: number) => void;
  clearBrandCart: (brandId: string) => void;
  getBrandCart: (brandId: string) => CartItem[];
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "hb_cart";
const EMPTY_CARTS: CartsByBrand = {};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() bir <CartProvider> içinde çağrılmalı");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [carts, setCarts] = useLocalStorageStore<CartsByBrand>(STORAGE_KEY, EMPTY_CARTS);

  const addItem = useCallback(
    (brandId: string, item: Omit<CartItem, "quantity">, quantity: number) => {
      if (quantity <= 0) return;
      const existing = carts[brandId] ?? [];
      const idx = existing.findIndex((i) => i.productId === item.productId);
      const next =
        idx >= 0
          ? existing.map((i, index) => (index === idx ? { ...i, quantity: i.quantity + quantity } : i))
          : [...existing, { ...item, quantity }];
      setCarts({ ...carts, [brandId]: next });
    },
    [carts, setCarts]
  );

  const removeItem = useCallback(
    (brandId: string, productId: string) => {
      setCarts({
        ...carts,
        [brandId]: (carts[brandId] ?? []).filter((i) => i.productId !== productId),
      });
    },
    [carts, setCarts]
  );

  const setQuantity = useCallback(
    (brandId: string, productId: string, quantity: number) => {
      const existing = carts[brandId] ?? [];
      if (quantity <= 0) {
        setCarts({ ...carts, [brandId]: existing.filter((i) => i.productId !== productId) });
        return;
      }
      setCarts({
        ...carts,
        [brandId]: existing.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
      });
    },
    [carts, setCarts]
  );

  const clearBrandCart = useCallback(
    (brandId: string) => {
      setCarts({ ...carts, [brandId]: [] });
    },
    [carts, setCarts]
  );

  const getBrandCart = useCallback((brandId: string) => carts[brandId] ?? [], [carts]);

  return (
    <CartContext.Provider
      value={{ carts, addItem, removeItem, setQuantity, clearBrandCart, getBrandCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
