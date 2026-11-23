"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import { categories } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

export function CatalogueBrowser() {
  const [filter, setFilter] = useState<string>("all");
  const [grouped, setGrouped] = useState(true);

  const visible = useMemo(
    () => (filter === "all" ? categories : categories.filter((c) => c.slug === filter)),
    [filter],
  );
  const total = visible.reduce((n, c) => n + c.products.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-20">
      {/* toolbar */}
      <div className="sticky top-[var(--header-offset,74px)] z-30 transition-[top] duration-[350ms] ease-[cubic-bezier(.7,0,.2,1)]-mx-5 border-b border-ink/10 bg-paper/95 px-5 py-4 backdrop-blur md:-mx-6 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink/60" aria-live="polite">
            Showing <strong className="text-ink">{total}</strong> design{total === 1 ? "" : "s"}
          </p>
          <div className="flex items-center gap-1" role="group" aria-label="Layout">
            <button
              type="button"
              onClick={() => setGrouped(true)}
              aria-pressed={grouped}
              className={`grid size-9 place-items-center transition-colors ${grouped ? "bg-ink text-gold" : "text-ink/50 hover:text-ink"}`}
              title="Grouped by category"
            >
              <Rows3 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setGrouped(false)}
              aria-pressed={!grouped}
              className={`grid size-9 place-items-center transition-colors ${!grouped ? "bg-ink text-gold" : "text-ink/50 hover:text-ink"}`}
              title="Single grid"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {[{ slug: "all", short: "All" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setFilter(c.slug)}
              aria-pressed={filter === c.slug}
              className={`relative shrink-0 px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                filter === c.slug ? "text-ink" : "text-ink/55 hover:text-ink"
              }`}
            >
              {filter === c.slug && (
                <motion.span
                  layoutId="chip"
                  className="absolute inset-0 bg-gold"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{c.short}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${filter}-${grouped}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {grouped ? (
            visible.map((c) => (
              <section key={c.slug} className="mt-14 first:mt-10">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
                  <h2 className="flex items-baseline gap-3 font-display text-3xl font-extrabold uppercase md:text-4xl">
                    <span className="font-tech text-sm text-gold-deep">{c.number}</span>
                    {c.title}
                  </h2>
                  <Link
                    href={`/products/${c.slug}`}
                    className="group flex items-center gap-1.5 text-sm font-semibold"
                  >
                    Specs & details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {c.products.map((p) => (
                    <ProductCard key={p.slug} product={{ ...p, categoryTitle: c.title, categorySlug: c.slug }} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visible.flatMap((c) =>
                c.products.map((p) => (
                  <ProductCard key={p.slug} product={{ ...p, categoryTitle: c.title, categorySlug: c.slug }} />
                )),
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
