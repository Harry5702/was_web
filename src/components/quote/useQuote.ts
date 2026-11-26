"use client";

import { useSyncExternalStore } from "react";
import { allProducts } from "@/lib/catalogue";

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
export const MAX_QTY = 100000;

/** Whole number between 1 and MAX_QTY. */
export function clampQty(n: unknown) {
  const v = Math.floor(Number(n));
  return Number.isFinite(v) ? Math.min(MAX_QTY, Math.max(1, v)) : 1;
}

/**
 * Stored lists come from localStorage, which anyone can edit. Keep only designs that exist in
 * the catalogue and rebuild every field from it, so names and pictures are always current.
 */
function sanitize(raw: unknown): QuoteItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const out: QuoteItem[] = [];
  for (const entry of raw.slice(0, 200)) {
    const slug = entry && typeof entry === "object" ? (entry as { slug?: unknown }).slug : undefined;
    const found = allProducts.find((p) => p.slug === slug);
    if (!found || out.some((i) => i.slug === found.slug)) continue;
    out.push({
      slug: found.slug,
      code: found.code,
      name: found.name,
      category: found.category.title,
      categorySlug: found.category.slug,
      image: found.image,
      qty: clampQty((entry as { qty?: unknown }).qty),
    });
  }
  return out;
}
const EMPTY: QuoteItem[] = [];
let items: QuoteItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    items = raw ? sanitize(JSON.parse(raw)) : EMPTY;
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
      sanitize(
        existing
          ? items.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + clampQty(qty) } : i))
          : [...items, { ...item, qty: clampQty(qty) }],
      ),
    );
  },
  setQty(slug: string, qty: number) {
    commit(items.map((i) => (i.slug === slug ? { ...i, qty: clampQty(qty) } : i)));
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
