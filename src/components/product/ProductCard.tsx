"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { quoteActions, useQuote } from "@/components/quote/useQuote";
import { getCategory } from "@/lib/catalogue";

export type ProductCardData = {
  code: string;
  slug: string;
  name: string;
  image: string;
  categoryTitle: string;
  categorySlug: string;
};

export function ProductCard({ product, sizes }: { product: ProductCardData; sizes?: string }) {
  const quote = useQuote();
  const inList = quote.some((i) => i.slug === product.slug);
  const [flash, setFlash] = useState(false);
  const href = `/products/${product.categorySlug}/${product.slug}`;
  // singular product type, e.g. "Football Uniform"
  const item = getCategory(product.categorySlug)?.item ?? product.categoryTitle;

  const add = () => {
    quoteActions.add({
      slug: product.slug,
      code: product.code,
      name: product.name,
      category: product.categoryTitle,
      categorySlug: product.categorySlug,
      image: product.image,
    });
    setFlash(true);
    setTimeout(() => setFlash(false), 1400);
  };

  return (
    <article className="group relative bg-white">
      <Link href={href} className="block" aria-label={`${product.code} ${item}, ${product.name}`}>
        <div className="relative aspect-[1056/921] overflow-hidden bg-mist">
          <Image
            src={product.image}
            alt={`${product.code} ${product.categoryTitle}, ${product.name}`}
            fill
            sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-[1.06]"
          />
          {/* article code + product type tag */}
          {/* wraps the type onto a second line on narrow cards instead of cutting it off */}
          <span className="absolute top-3 right-3 left-3 flex flex-wrap items-start">
            <span className="flex items-stretch shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]">
              <span className="bg-ink px-2 py-1 font-tech text-[10px] leading-[1.6] font-bold tracking-widest text-gold">
                {product.code}
              </span>
            </span>
            <span className="bg-gold px-2 py-1 font-display text-[12px] leading-[1.35] font-bold tracking-wider whitespace-nowrap text-ink uppercase shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)]">
              {item}
            </span>
          </span>
        </div>
      </Link>

      <div className="relative flex items-start justify-between gap-3 p-4">
        <Link href={href} className="min-w-0">
          <p className="truncate text-[11px] font-semibold tracking-[0.14em] text-gold-deep uppercase">
            {item}
          </p>
          <h3 className="mt-1 truncate font-display text-xl leading-tight font-bold uppercase">
            {product.name}
          </h3>
        </Link>
        <button
          type="button"
          onClick={add}
          className={`relative grid size-10 shrink-0 place-items-center border-2 transition-colors duration-300 ${
            inList ? "border-gold bg-gold text-ink" : "border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-gold"
          }`}
          aria-label={inList ? `${product.code} is in your quote list, add another` : `Add ${product.code} to quote list`}
          title={inList ? "In your quote list" : "Add to quote list"}
        >
          {inList ? <Check className="size-[18px]" /> : <Plus className="size-[18px]" />}
          <AnimatePresence>
            {flash && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 bottom-full mb-2 bg-ink px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap text-white"
              >
                Added to quote list
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}
