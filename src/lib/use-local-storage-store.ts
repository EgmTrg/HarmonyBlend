"use client";

import { useCallback, useSyncExternalStore } from "react";

interface Store<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (value: T) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stores = new Map<string, Store<any>>();

function getStore<T>(key: string, initial: T): Store<T> {
  const existing = stores.get(key);
  if (existing) return existing as Store<T>;

  let cache: T = initial;
  let hydrated = false;
  const listeners = new Set<() => void>();

  const store: Store<T> = {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    // İlk çağrıda localStorage'dan okunur ve önbelleğe alınır; React,
    // referansı sabit tutmadıkça (Object.is) bu fonksiyonu her render'da
    // tekrar çağırabileceğinden burada her seferinde yeniden parse etmiyoruz.
    getSnapshot() {
      if (!hydrated) {
        try {
          const raw = localStorage.getItem(key);
          cache = raw ? (JSON.parse(raw) as T) : initial;
        } catch {
          cache = initial;
        }
        hydrated = true;
      }
      return cache;
    },
    getServerSnapshot() {
      return initial;
    },
    set(value) {
      cache = value;
      hydrated = true;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // ör. gizli modda kota hatası — sessizce yoksay
      }
      listeners.forEach((listener) => listener());
    },
  };

  stores.set(key, store);
  return store;
}

export function useLocalStorageStore<T>(key: string, initial: T) {
  const store = getStore(key, initial);
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  const setValue = useCallback((next: T) => store.set(next), [store]);
  return [value, setValue] as const;
}
