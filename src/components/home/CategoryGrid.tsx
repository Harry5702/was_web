import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, materialOf } from "@/lib/catalogue";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function CategoryGrid() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          eyebrow="What we make"
          lines={["Eleven lines,", "one standard."]}
          intro="Eight team sports plus sublimated tracksuits, t-shirts and shorts. Hover a range to see another design from it."
          action={
            <ButtonLink href="/products" variant="outline-dark">
              Full catalogue
            </ButtonLink>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/products/${c.slug}`}
                className="group relative block overflow-hidden bg-paper"
              >
                <div className="relative aspect-[1056/921] overflow-hidden bg-mist">
                  <Image
                    src={c.products[0].image}
                    alt={`${c.title} by WAS`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-105 group-hover:opacity-0"
                  />
                  <Image
                    src={c.products[1].image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="scale-110 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-100 group-hover:opacity-100"
                  />
                  <span className="text-outline absolute -bottom-3 right-3 font-display text-8xl leading-none font-extrabold text-ink/20 italic transition-colors duration-500 group-hover:text-gold">
                    {c.number}
                  </span>
                </div>
                <div className="relative flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-2xl leading-none font-extrabold uppercase">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-[13px] text-ink/55">{materialOf(c)}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center bg-ink text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </Reveal>
          ))}

          {/* 12th tile: own artwork */}
          <Reveal delay={0.16}>
            <Link
              href="/contact"
              className="bg-slash group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden p-7 text-white"
            >
              <span className="absolute -top-8 -right-8 size-40 rotate-45 bg-gold transition-transform duration-700 group-hover:scale-125" />
              <span className="relative font-tech text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
                Your design
              </span>
              <div className="relative">
                <h3 className="font-display text-4xl leading-[0.95] font-extrabold uppercase">
                  Got your own artwork?
                </h3>
                <p className="mt-3 max-w-xs text-sm text-white/60">
                  Send us your design and we will print it on any product in the catalogue.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold tracking-wider text-gold uppercase">
                  Send artwork
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
