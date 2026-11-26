import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { LineReveal, Reveal } from "./motion";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[12px] tracking-wide ${dark ? "text-white/50" : "text-ink/50"}`}>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden />}
            {c.href ? (
              <Link href={c.href} className={`transition-colors ${dark ? "hover:text-gold" : "hover:text-ink"}`}>
                {c.label}
              </Link>
            ) : (
              <span className={dark ? "text-white/85" : "text-ink"} aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  number,
  image,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string[];
  intro?: string;
  number?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-glow relative overflow-hidden text-white">
      {number && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-[42%] font-display text-[14rem] leading-none font-semibold text-white/[0.03] select-none max-lg:hidden"
        >
          {number}
        </span>
      )}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <p className="eyebrow mt-7 flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.92] font-semibold tracking-tight uppercase">
            <LineReveal immediate lines={title} />
          </h1>
          {intro && (
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-light text-white/65">{intro}</p>
            </Reveal>
          )}
          {children}
        </div>
        {image && (
          <Reveal delay={0.2} y={40} className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[1056/921] overflow-hidden rounded-3xl bg-mist ring-1 ring-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <Image src={image.src} alt={image.alt} fill preload sizes="(max-width: 1024px) 90vw, 440px" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
