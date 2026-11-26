import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/catalogue";

/** A product line inside a collection: picture, name, one line, design count. */
export function SubcategoryCard({ category: c, sizes }: { category: Category; sizes?: string }) {
  const img = sizes ?? "(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw";
  return (
    <Link
      href={`/products/${c.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/[0.05] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
    >
      <div className="relative aspect-[1056/921] overflow-hidden bg-mist">
        <Image
          src={c.products[0].image}
          alt={`${c.title} by WAS`}
          fill
          sizes={img}
          className="object-cover transition-all duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-105 group-hover:opacity-0"
        />
        {c.products[1] && (
          <Image
            src={c.products[1].image}
            alt=""
            fill
            sizes={img}
            className="scale-110 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-100 group-hover:opacity-100"
          />
        )}
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-2.5 py-1 font-label text-[11px] font-medium tracking-wider text-ink/70 backdrop-blur">
          {c.number}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.6rem] leading-none font-semibold tracking-tight uppercase">
          {c.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/55">{c.tagline}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-[11px] font-medium tracking-[0.14em] text-gold-deep uppercase">
            {c.products.length} designs
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12.5px] font-medium text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
            View designs
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
