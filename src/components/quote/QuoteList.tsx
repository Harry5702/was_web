"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, Minus, Plus, X } from "lucide-react";
import { quoteActions, useQuote } from "./useQuote";
import { EnquiryForm } from "./EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";

export function QuoteList() {
  const items = useQuote();
  const total = items.reduce((n, i) => n + i.qty, 0);

  if (!items.length) {
    return (
      <section className="bg-paper py-24">
        <div className="mx-auto flex max-w-lg flex-col items-center px-5 text-center">
          <span className="grid size-20 place-items-center bg-ink text-gold">
            <ClipboardList className="size-9" />
          </span>
          <h2 className="mt-6 font-display text-4xl font-extrabold uppercase">Your list is empty</h2>
          <p className="mt-3 text-ink/60">
            Browse the catalogue and tap <strong>+</strong> on any design to add it here.
          </p>
          <ButtonLink href="/products" className="mt-8">
            Browse catalogue
          </ButtonLink>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex items-end justify-between border-b-2 border-ink pb-3">
            <h2 className="font-display text-3xl font-extrabold uppercase">
              {items.length} design{items.length === 1 ? "" : "s"}
            </h2>
            <p className="text-sm text-ink/60">
              <span className="font-tech font-bold text-ink">{total}</span> pcs in total
            </p>
          </div>
          <ul>
            <AnimatePresence initial={false}>
              {items.map((i) => (
                <motion.li
                  key={i.slug}
                  layout
                  exit={{ opacity: 0, x: -40, height: 0, transition: { duration: 0.3 } }}
                  className="flex items-center gap-4 overflow-hidden border-b border-ink/10 py-4"
                >
                  <Link
                    href={`/products/${i.categorySlug}/${i.slug}`}
                    className="relative size-24 shrink-0 overflow-hidden bg-mist sm:size-28"
                  >
                    <Image src={i.image} alt="" fill sizes="112px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="font-tech text-[11px] font-bold text-gold-deep">{i.code}</p>
                    <Link
                      href={`/products/${i.categorySlug}/${i.slug}`}
                      className="mt-0.5 block truncate font-display text-xl font-bold uppercase hover:text-gold-deep"
                    >
                      {i.name}
                    </Link>
                    <p className="text-xs text-ink/50">{i.category}</p>
                    <div className="mt-3 flex w-fit items-center border border-ink/15 bg-white">
                      <button
                        type="button"
                        onClick={() => quoteActions.setQty(i.slug, i.qty - 1)}
                        className="grid size-8 place-items-center hover:bg-ink hover:text-gold"
                        aria-label={`Decrease ${i.code} quantity`}
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={i.qty}
                        onChange={(e) => quoteActions.setQty(i.slug, Number(e.target.value) || 1)}
                        aria-label={`${i.code} quantity`}
                        className="w-14 [appearance:textfield] bg-transparent text-center font-tech text-xs font-bold outline-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => quoteActions.setQty(i.slug, i.qty + 1)}
                        className="grid size-8 place-items-center hover:bg-ink hover:text-gold"
                        aria-label={`Increase ${i.code} quantity`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => quoteActions.remove(i.slug)}
                    className="grid size-10 shrink-0 place-items-center text-ink/40 transition-colors hover:bg-ink hover:text-white"
                    aria-label={`Remove ${i.code}`}
                  >
                    <X className="size-5" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm">
            <Link href="/products" className="link-grow font-semibold">
              + Add more designs
            </Link>
            <button type="button" onClick={() => quoteActions.clear()} className="text-ink/50 hover:text-ink">
              Clear list
            </button>
          </div>
        </div>

        <div className="h-fit bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-9 lg:sticky lg:top-[calc(var(--header-offset,74px)+24px)]">
          <h2 className="font-display text-3xl font-extrabold uppercase">Your details</h2>
          <p className="mt-1 mb-7 text-sm text-ink/60">
            We&apos;ll include your list of designs and quantities automatically.
          </p>
          <EnquiryForm items={items} />
        </div>
      </div>
    </section>
  );
}
