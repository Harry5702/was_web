import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories, getCategory } from "@/lib/catalogue";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/product/ProductCard";
import { OptionBadges, PrintSizes, SpecList } from "@/components/product/Specs";
import { Reveal } from "@/components/ui/motion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CTABand } from "@/components/home/CTABand";
import { whatsappLink } from "@/lib/site";

// Every real category is prerendered below; only unknown slugs render on request (and 404),
// so blocking on params there is acceptable.
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.title,
    description: `${c.title} by WAS Sportswear. ${c.tagline} ${c.description[0]}.`,
  };
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();

  const idx = categories.indexOf(c);
  const prev = categories[(idx - 1 + categories.length) % categories.length];
  const next = categories[(idx + 1) % categories.length];

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: c.title },
        ]}
        eyebrow={`Line ${c.number} of ${String(categories.length).padStart(2, "0")}`}
        title={[c.title.split(" ").slice(0, -1).join(" "), c.title.split(" ").at(-1)!]}
        intro={`${c.tagline} ${c.products.length} catalogue designs, all available in your own colours.`}
        number={c.number}
        image={{ src: c.products[0].image, alt: `${c.products[0].code} ${c.title}` }}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#designs">See designs</ButtonLink>
          <ButtonAnchor
            variant="outline-light"
            href={whatsappLink(`Hi WAS Sportswear, I'd like a quote for ${c.title}.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="size-[18px]" /> Ask on WhatsApp
          </ButtonAnchor>
        </div>
      </PageHero>

      <section id="designs" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h2 className="font-display text-4xl font-extrabold uppercase">Designs</h2>
            <p className="text-sm text-ink/55">
              Tap <strong className="text-ink">+</strong> to add a design to your quote list
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard product={{ ...p, categoryTitle: c.title, categorySlug: c.slug }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="font-tech text-[11px] font-bold tracking-[0.3em] text-gold-deep uppercase">
              Specifications
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase md:text-5xl">Description</h2>
            <div className="mt-8">
              <SpecList category={c} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-10">
            <div>
              <h3 className="font-display text-xl font-extrabold tracking-wide uppercase">Customisation</h3>
              <div className="mt-3">
                <OptionBadges />
              </div>
            </div>
            <PrintSizes category={c} />
            <div className="bg-ink p-6 text-white">
              <p className="font-display text-2xl font-extrabold uppercase">Need a different colourway?</p>
              <p className="mt-2 text-sm text-white/60">
                Every design in this range can be made in your team colours.
              </p>
              <ButtonLink href="/contact" className="mt-5 !px-5 !py-3 !text-[15px]">
                Request a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* prev / next line */}
      <nav aria-label="Other product lines" className="grid border-t border-ink/10 bg-paper sm:grid-cols-2">
        {[
          { c: prev, dir: "Previous line", Icon: ArrowLeft },
          { c: next, dir: "Next line", Icon: ArrowRight },
        ].map(({ c: o, dir, Icon }, i) => (
          <Link
            key={dir}
            href={`/products/${o.slug}`}
            className={`group relative flex items-center gap-5 overflow-hidden p-6 md:p-8 ${i === 1 ? "sm:flex-row-reverse sm:text-right" : ""} ${i === 0 ? "sm:border-r sm:border-ink/10" : ""}`}
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
            <div className="relative size-20 shrink-0 overflow-hidden bg-mist">
              <Image src={o.products[0].image} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="relative">
              <p className={`flex items-center gap-2 text-xs tracking-widest text-ink/50 uppercase transition-colors group-hover:text-gold ${i === 1 ? "sm:flex-row-reverse" : ""}`}>
                <Icon className="size-3.5" /> {dir}
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold uppercase transition-colors group-hover:text-white">
                {o.title}
              </p>
            </div>
          </Link>
        ))}
      </nav>

      <CTABand />
    </>
  );
}
