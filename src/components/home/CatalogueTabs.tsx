"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categoriesOf, departments } from "@/lib/catalogue";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const FEATURED = 8;

/** One design from each line first, then second designs, so every tab shows variety. */
function featured(slug: (typeof departments)[number]["slug"]) {
  const lines = categoriesOf(slug);
  const most = Math.max(...lines.map((c) => c.products.length));
  const picks = [];
  for (let round = 0; round < most && picks.length < FEATURED; round++) {
    for (const c of lines) {
      const p = c.products[round];
      if (p && picks.length < FEATURED) picks.push({ ...p, categoryTitle: c.title, categorySlug: c.slug });
    }
  }
  return picks;
}

export function CatalogueTabs() {
  const [active, setActive] = useState(0);
  const dept = departments[active];

  return (
    <section className="bg-paper py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="The catalogue"
          lines={["Pick a design,", "make it yours."]}
          intro="Every design has an article code. Add the ones you like to your quote list and send them over in one go."
        />

        <div
          role="tablist"
          aria-label="Collections"
          className="mt-10 inline-flex rounded-full bg-white p-1 ring-1 ring-ink/[0.07] md:mt-12"
        >
          {departments.map((d, i) => (
            <button
              key={d.slug}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls="catalogue-panel"
              onClick={() => setActive(i)}
              className={`relative rounded-full px-4 py-2.5 text-[13.5px] font-medium whitespace-nowrap transition-colors sm:px-6 ${
                active === i ? "text-ink" : "text-ink/55 hover:text-ink"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{d.title}</span>
            </button>
          ))}
        </div>

        <div id="catalogue-panel" role="tabpanel" className="mt-8 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={dept.slug}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                show: { transition: { staggerChildren: 0.05 } },
                exit: { opacity: 0, transition: { duration: 0.15 } },
              }}
            >
              {/* phones: a swipeable row; wider screens: a grid */}
              <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 min-[480px]:mx-0 min-[480px]:grid min-[480px]:grid-cols-2 min-[480px]:gap-5 min-[480px]:overflow-visible min-[480px]:px-0 min-[480px]:pb-0 lg:grid-cols-4">
                {featured(dept.slug).map((p) => (
                  <motion.div
                    key={p.slug}
                    className="w-[78%] shrink-0 snap-start min-[480px]:w-auto"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
                    }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 flex justify-center md:mt-10">
                <ButtonLink href={`/products/${dept.slug}`} variant="dark">
                  All {dept.title.toLowerCase()}
                </ButtonLink>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
