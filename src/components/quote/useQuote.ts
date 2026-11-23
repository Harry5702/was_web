"use client";

import { useSyncExternalStore } from "react";

export type QuoteItem = {
  slug: string; // product slug, e.g. "was-101"
  code: string; // "WAS-101"
  name: string;
  category: string; // category title
  categorySlug: string;
  image: string;
  qty: number;
};

const KEY = "was-quote-list";
const EMPTY: QuoteItem[] = [];
let items: QuoteItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    items = EMPTY;
  }
}

function commit(next: QuoteItem[]) {
  items = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep the list in memory for this visit */
  }
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key !== KEY) return;
  loaded = false;
  load();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return items;
}

export const quoteActions = {
  add(item: Omit<QuoteItem, "qty">, qty = 1) {
    load();
    const existing = items.find((i) => i.slug === item.slug);
    commit(
      existing
        ? items.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i))
        : [...items, { ...item, qty }],
    );
  },
  setQty(slug: string, qty: number) {
    commit(items.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)));
  },
  remove(slug: string) {
    commit(items.filter((i) => i.slug !== slug));
  },
  clear() {
    commit([]);
  },
};

export function useQuote() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
