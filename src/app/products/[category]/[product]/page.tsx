import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoriesOf, departmentOf, getProduct, materialOf } from "@/lib/catalogue";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { ZoomImage } from "@/components/product/ZoomImage";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductCard } from "@/components/product/ProductCard";
import { OptionBadges, PrintSizes, SpecList } from "@/components/product/Specs";
import { Tabs } from "@/components/ui/Tabs";
import { Reveal } from "@/components/ui/motion";
import { JsonLd, breadcrumbLd, pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: `${p.code} ${c.item}, ${p.name}`,
    description: `${p.code} custom ${c.item.toLowerCase()} from WAS. ${materialOf(c)}. Made to order in Sialkot in your colours with your logo, ${departmentOf(c).sizes.toLowerCase()} sizes.`,
    path: `/products/${c.slug}/${p.slug}`,
    image: { url: p.image, alt: `${p.code} ${c.item}, ${p.name}` },
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { category, product } = await params;
  const found = getProduct(category, product);
  if (!found) notFound();
  const { category: c, product: p } = found;
  const dept = departmentOf(c);
  // the rest of this line, topped up to three with designs from the next lines in the collection
  const siblings = categoriesOf(c.department);
  const start = siblings.indexOf(c);
  const related = [
    ...c.products.filter((x) => x.slug !== p.slug).map((x) => ({ x, cat: c })),
    ...siblings
      .slice(start + 1)
      .concat(siblings.slice(0, start))
      .map((cat) => ({ x: cat.products[0], cat })),
  ].slice(0, 3);

  const tabs = [
    { label: "Description", content: <SpecList category={c} /> },
    {
      label: "Customisation",
      content: (
        <div className="space-y-5">
          <p className="text-[15px] text-ink/70">
            {p.code} is shown here in WAS colours. It can be made {dept.customNote}.
          </p>
          <OptionBadges category={c} />
        </div>
      ),
    },
    ...(c.printSizes ? [{ label: "Print sizes", content: <PrintSizes category={c} /> }] : []),
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: dept.title, path: `/products/${dept.slug}` },
          { name: c.title, path: `/products/${c.slug}` },
          { name: p.code, path: `/products/${c.slug}/${p.slug}` },
        ])}
      />
      <div className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
          <Breadcrumbs
            dark={false}
            items={[
              { href: "/", label: "Home" },
              { href: `/products/${dept.slug}`, label: dept.title },
              { href: `/products/${c.slug}`, label: c.title },
              { label: p.code },
            ]}
          />
        </div>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pt-6 pb-16 md:px-8 md:pt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:pb-24">
          <Reveal y={20}>
            <ZoomImage src={p.image} alt={`${p.code} ${c.title}, ${p.name}, front and back`} />
            <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
              {c.products.map((x) => (
                <Link
                  key={x.slug}
                  href={`/products/${c.slug}/${x.slug}`}
                  aria-label={`${x.code} ${x.name}`}
                  aria-current={x.slug === p.slug ? "page" : undefined}
                  className={`group relative aspect-[1056/921] overflow-hidden rounded-xl bg-mist outline-offset-2 ${
                    x.slug === p.slug ? "outline-2 outline-gold outline" : ""
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
                  <span className="absolute bottom-1 left-1 rounded-full bg-ink/85 px-1.5 py-0.5 font-label text-[9px] text-gold max-[420px]:hidden">
                    {x.code}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20} className="lg:pt-2">
            {/* article code + product type tag */}
            <p className="flex w-fit flex-wrap items-center gap-2">
              <span className="rounded-full bg-ink px-3 py-1.5 font-label text-xs font-medium tracking-[0.14em] text-gold">
                {p.code}
              </span>
              <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-medium tracking-wide text-ink">
                {c.item}
              </span>
            </p>
            <h1 className="mt-5 font-display text-[2.75rem] leading-[0.95] font-semibold tracking-tight uppercase sm:text-5xl md:text-6xl">
              {p.name}
            </h1>
            <p className="mt-3">
              <Link href={`/products/${c.slug}`} className="link-grow text-sm font-medium text-ink/60 hover:text-ink">
                {c.title}
              </Link>
            </p>
            <p className="mt-6 text-[15px] leading-relaxed font-light text-ink/70">
              {c.tagline} {materialOf(c)}.
            </p>

            <dl className="mt-8 grid grid-cols-2 border-y border-ink/10 py-5 text-sm">
              <div>
                <dt className="text-xs tracking-widest text-ink/45 uppercase">Article</dt>
                <dd className="mt-1 font-medium">{p.code}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-ink/45 uppercase">Sizes</dt>
                <dd className="mt-1 font-medium">{dept.sizes}</dd>
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

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Tabs tabs={tabs} />
        </div>
      </section>

      <section className="bg-paper py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight uppercase sm:text-4xl">You may also like</h2>
            <Link href={`/products/${dept.slug}`} className="link-grow text-sm font-medium">
              All {dept.title.toLowerCase()}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3">
            {related.map(({ x, cat }, i) => (
              <Reveal key={x.slug} delay={i * 0.08}>
                <ProductCard
                  product={{ ...x, categoryTitle: cat.title, categorySlug: cat.slug }}
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
