"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories } from "@/lib/catalogue";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function CatalogueTabs() {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          eyebrow="The catalogue"
          lines={["Pick a design,", "make it yours."]}
          intro="Every design comes with an article code. Add the ones you like to your quote list and send them over in one go."
        />

        <div className="relative mt-12 border-b border-ink/10">
          <div
            role="tablist"
            aria-label="Product categories"
            className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]"
          >
            {categories.map((c, i) => (
              <button
                key={c.slug}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls="catalogue-panel"
                onClick={() => setActive(i)}
                className={`relative shrink-0 px-4 py-3.5 font-display text-[17px] font-bold tracking-wide whitespace-nowrap uppercase transition-colors ${
                  active === i ? "text-ink" : "text-ink/40 hover:text-ink/75"
                }`}
              >
                {c.short}
                {active === i && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-gold"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div id="catalogue-panel" role="tabpanel" className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cat.slug}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                show: { transition: { staggerChildren: 0.06 } },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }}
            >
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-sm text-ink/60">
                  <span className="mr-2 font-tech text-xs font-bold text-gold-deep">{cat.number}</span>
                  {cat.tagline}
                </p>
                <ButtonLink
                  href={`/products/${cat.slug}`}
                  variant="dark"
                  className="!px-5 !py-2.5 !text-[15px]"
                >
                  {cat.title}
                </ButtonLink>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cat.products.map((p) => (
                  <motion.div
                    key={p.slug}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
                    }}
                  >
                    <ProductCard
                      product={{
                        ...p,
                        categoryTitle: cat.title,
                        categorySlug: cat.slug,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
