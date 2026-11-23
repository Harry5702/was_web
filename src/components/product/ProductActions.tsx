"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ClipboardList, Mail, Minus, Plus } from "lucide-react";
import { quoteActions, useQuote } from "@/components/quote/useQuote";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { mailtoLink, whatsappLink } from "@/lib/site";

export function ProductActions({
  product,
}: {
  product: { slug: string; code: string; name: string; category: string; categorySlug: string; image: string };
}) {
  const [qty, setQty] = useState(15);
  const [added, setAdded] = useState(false);
  const quote = useQuote();
  const inList = quote.find((i) => i.slug === product.slug);

  const add = () => {
    quoteActions.add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const msg = `Hi WAS Sportswear, I'm interested in ${product.code} (${product.category}, ${product.name}). Quantity: about ${qty} pcs. Please send me a quote.`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center border-2 border-ink/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-12 place-items-center transition-colors hover:bg-ink hover:text-gold"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <label className="sr-only" htmlFor="qty">
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="w-16 [appearance:textfield] bg-transparent text-center font-tech text-sm font-bold outline-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="grid size-12 place-items-center transition-colors hover:bg-ink hover:text-gold"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={add}
          className="btn-sweep chamfer-sm relative flex min-h-12 flex-1 items-center justify-center gap-2.5 bg-gold px-4 font-display sm:px-6 text-[17px] font-bold tracking-wider text-ink uppercase [--sweep:var(--color-ink)] hover:text-gold"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span key="ok" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="flex items-center gap-2">
                <Check className="size-5" /> Added
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="flex items-center gap-2">
                <ClipboardList className="size-5" />
                <span className="whitespace-nowrap">
                  Add to quote<span className="hidden sm:inline"> list</span>
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {inList && (
        <p className="text-sm text-ink/60">
          {inList.qty} pcs in your{" "}
          <Link href="/quote" className="font-semibold text-ink underline underline-offset-4">
            quote list
          </Link>
          .
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-2 border-[#25D366] px-5 py-3 text-sm font-semibold text-[#128C4B] transition-colors hover:bg-[#25D366] hover:text-white"
        >
          <WhatsAppIcon className="size-[18px]" /> Enquire on WhatsApp
        </a>
        <a
          href={mailtoLink(`Quote request: ${product.code}`, msg)}
          className="flex items-center justify-center gap-2 border-2 border-ink/15 px-5 py-3 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-white"
        >
          <Mail className="size-[18px]" /> Enquire by email
        </a>
      </div>
    </div>
  );
}
