import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProduct, materialOf } from "@/lib/catalogue";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { ZoomImage } from "@/components/product/ZoomImage";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";
import { OptionBadges, PrintSizes, SpecList } from "@/components/product/Specs";
import { Tabs } from "@/components/ui/Tabs";
import { Reveal } from "@/components/ui/motion";

// Every real product is prerendered below; only unknown slugs render on request (and 404).
export const instant = false;

export function generateStaticParams() {
  return categories.flatMap((c) => c.products.map((p) => ({ category: c.slug, product: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await params;
  const found = getProduct(category, product);
  if (!found) return {};
  const { category: c, product: p } = found;
  return {
    title: `${p.code} ${c.title.replace(/s$/, "")}, ${p.name}`,
    description: `${p.code} from the WAS ${c.title} range. ${materialOf(c)}. Custom colours, names, numbers and team logo, youth and adult sizes.`,
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await params;
  const found = getProduct(category, product);
  if (!found) notFound();
  const { category: c, product: p } = found;
  const others = c.products.filter((x) => x.slug !== p.slug);

  const tabs = [
    { label: "Description", content: <SpecList category={c} /> },
    {
      label: "Customisation",
      content: (
        <div className="space-y-5">
          <p className="text-[15px] text-ink/70">
            {p.code} is shown here in WAS colours. It can be made in your team colours with your own
            logo, sponsor, player names and numbers.
          </p>
          <OptionBadges />
        </div>
      ),
    },
    ...(c.printSizes ? [{ label: "Print sizes", content: <PrintSizes category={c} /> }] : []),
  ];

  return (
    <>
      <div className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-8 md:px-6">
          <Breadcrumbs
            dark={false}
            items={[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: `/products/${c.slug}`, label: c.title },
              { label: p.code },
            ]}
          />
        </div>

        <section className="mx-auto grid grid-cols-1 max-w-7xl gap-10 px-5 pt-8 pb-16 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-24">
          <Reveal y={20}>
            <ZoomImage src={p.image} alt={`${p.code} ${c.title}, ${p.name}, front and back`} />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {c.products.map((x) => (
                <Link
                  key={x.slug}
                  href={`/products/${c.slug}/${x.slug}`}
                  aria-label={`${x.code} ${x.name}`}
                  aria-current={x.slug === p.slug ? "page" : undefined}
                  className={`group relative aspect-[1056/921] overflow-hidden bg-mist outline-offset-2 ${
                    x.slug === p.slug ? "outline-[3px] outline-gold outline" : ""
                  }`}
                >
                  <Image
                    src={x.image}
                    alt=""
                    fill
                    sizes="160px"
                    className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                      x.slug === p.slug ? "" : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 bg-ink px-1.5 py-0.5 font-tech text-[9px] text-gold">
                    {x.code}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20} className="lg:pt-2">
            <p className="flex items-center gap-3 font-tech text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">
              <span className="h-[3px] w-8 bg-gold" />
              {p.code}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.9] font-extrabold uppercase md:text-6xl">
              {p.name}
            </h1>
            <p className="mt-3">
              <Link href={`/products/${c.slug}`} className="link-grow text-sm font-semibold text-ink/60 hover:text-ink">
                {c.title}
              </Link>
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/70">
              {c.tagline} {materialOf(c)}.
            </p>

            <dl className="mt-8 grid grid-cols-2 border-y border-ink/10 py-5 text-sm">
              <div>
                <dt className="text-xs tracking-widest text-ink/45 uppercase">Article</dt>
                <dd className="mt-1 font-tech font-bold">{p.code}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-ink/45 uppercase">Sizes</dt>
                <dd className="mt-1 font-semibold">Youth & Adult</dd>
              </div>
            </dl>

            <div className="mt-8">
              <ProductActions
                product={{
                  slug: p.slug,
                  code: p.code,
                  name: p.name,
                  category: c.title,
                  categorySlug: c.slug,
                  image: p.image,
                }}
              />
            </div>
            <p className="mt-4 text-xs text-ink/45">
              Pictures show design examples. Send us your quantity and sizes for a quote.
            </p>
          </Reveal>
        </section>
      </div>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <Tabs tabs={tabs} />
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h2 className="font-display text-4xl font-extrabold uppercase">More in this range</h2>
            <Link href={`/products/${c.slug}`} className="link-grow text-sm font-semibold">
              All {c.title.toLowerCase()}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {others.map((x, i) => (
              <Reveal key={x.slug} delay={i * 0.08}>
                <ProductCard
                  product={{ ...x, categoryTitle: c.title, categorySlug: c.slug }}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
