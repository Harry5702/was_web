import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { LineReveal, Reveal } from "./motion";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-[12px] tracking-wide uppercase ${dark ? "text-white/50" : "text-ink/50"}`}>
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
    <section className="bg-slash relative overflow-hidden text-white">
      <span
        aria-hidden
        className="absolute top-0 right-0 h-full w-[38%] bg-gold [clip-path:polygon(35%_0,100%_0,100%_100%,0_100%)] max-lg:hidden"
      />
      {number && (
        <span
          aria-hidden
          className="text-outline pointer-events-none absolute -bottom-10 left-[40%] font-display text-[16rem] leading-none font-extrabold text-white/[0.06] italic select-none max-md:hidden"
        >
          {number}
        </span>
      )}
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <p className="mt-6 flex items-center gap-3 font-tech text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
              <span className="h-[3px] w-8 bg-gold" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.88] font-extrabold uppercase italic">
            <LineReveal immediate lines={title} />
          </h1>
          {intro && (
            <Reveal delay={0.3}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">{intro}</p>
            </Reveal>
          )}
          {children}
        </div>
        {image && (
          <Reveal delay={0.2} y={40} className="relative mx-auto w-full max-w-md">
            <div className="chamfer relative aspect-[1056/921] overflow-hidden bg-mist shadow-[0_40px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image src={image.src} alt={image.alt} fill preload sizes="(max-width: 1024px) 90vw, 440px" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
