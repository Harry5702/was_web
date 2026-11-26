"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import { categories, departments, type DepartmentSlug } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

type DeptFilter = DepartmentSlug | "all";

export function CatalogueBrowser() {
  const [dept, setDept] = useState<DeptFilter>("all");
  const [line, setLine] = useState<string>("all");
  const [grouped, setGrouped] = useState(true);

  const inDept = useMemo(
    () => (dept === "all" ? categories : categories.filter((c) => c.department === dept)),
    [dept],
  );
  const visible = line === "all" ? inDept : inDept.filter((c) => c.slug === line);
  const total = visible.reduce((n, c) => n + c.products.length, 0);

  const chooseDept = (d: DeptFilter) => {
    setDept(d);
    setLine("all");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
      {/* toolbar */}
      <div className="sticky top-[var(--header-offset,74px)] z-30 -mx-5 border-b border-ink/10 bg-paper/90 px-5 py-4 backdrop-blur-xl transition-[top] duration-[350ms] ease-[cubic-bezier(.7,0,.2,1)] md:-mx-8 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Collection"
            className="no-scrollbar -my-1 flex overflow-x-auto rounded-full bg-white p-1 ring-1 ring-ink/[0.07]"
          >
            {[{ slug: "all" as const, title: "All" }, ...departments].map((d) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => chooseDept(d.slug)}
                aria-pressed={dept === d.slug}
                className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-5 ${
                  dept === d.slug ? "text-white" : "text-ink/55 hover:text-ink"
                }`}
              >
                {dept === d.slug && (
                  <motion.span
                    layoutId="dept-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{d.title}</span>
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-1 sm:flex" role="group" aria-label="Layout">
            <button
              type="button"
              onClick={() => setGrouped(true)}
              aria-pressed={grouped}
              className={`grid size-9 place-items-center rounded-full transition-colors ${grouped ? "bg-ink text-gold" : "text-ink/50 hover:text-ink"}`}
              title="Grouped by line"
            >
              <Rows3 className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setGrouped(false)}
              aria-pressed={!grouped}
              className={`grid size-9 place-items-center rounded-full transition-colors ${!grouped ? "bg-ink text-gold" : "text-ink/50 hover:text-ink"}`}
              title="Single grid"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
        </div>

        {dept !== "all" && (
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
            {[{ slug: "all", short: "All lines" }, ...inDept].map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setLine(c.slug)}
                aria-pressed={line === c.slug}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  line === c.slug ? "text-ink" : "bg-white text-ink/55 ring-1 ring-ink/[0.07] hover:text-ink"
                }`}
              >
                {line === c.slug && (
                  <motion.span
                    layoutId="chip"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{c.short}</span>
              </button>
            ))}
          </div>
        )}

        <p className="mt-3 text-[12.5px] text-ink/50" aria-live="polite">
          Showing <strong className="font-medium text-ink">{total}</strong> design{total === 1 ? "" : "s"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${dept}-${line}-${grouped}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {grouped ? (
            visible.map((c) => (
              <section key={c.slug} className="mt-14 first:mt-10">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-ink/15 pb-3">
                  <h2 className="flex items-baseline gap-3 font-display text-3xl font-semibold tracking-tight uppercase md:text-4xl">
                    {c.title}
                  </h2>
                  <Link href={`/products/${c.slug}`} className="group flex items-center gap-1.5 text-sm font-medium">
                    Details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
                  {c.products.map((p) => (
                    <ProductCard key={p.slug} product={{ ...p, categoryTitle: c.title, categorySlug: c.slug }} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
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
