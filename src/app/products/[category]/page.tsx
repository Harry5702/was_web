import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  categories,
  categoriesOf,
  departmentOf,
  departments,
  getCategory,
  getDepartment,
  materialOf,
  type Category,
  type Department,
} from "@/lib/catalogue";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/product/ProductCard";
import { SubcategoryCard } from "@/components/product/SubcategoryCard";
import { OptionBadges, PrintSizes, SpecList } from "@/components/product/Specs";
import { Reveal } from "@/components/ui/motion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CTABand } from "@/components/home/CTABand";
import { whatsappLink } from "@/lib/site";
import { JsonLd, breadcrumbLd, collectionLd, pageMeta } from "@/lib/seo";

// Serves both collection pages (/products/streetwear) and product line pages
// (/products/varsity-hoodies). Every real slug is prerendered below; only unknown slugs
// render on request (and 404), so blocking on params there is acceptable.
export const instant = false;

export function generateStaticParams() {
  return [...departments.map((d) => d.slug), ...categories.map((c) => c.slug)].map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const d = getDepartment(category);
  if (d) {
    return pageMeta({
      title: `Custom ${d.title} Manufacturer`,
      description: `${d.intro} Made to order in Sialkot, Pakistan, with private label and bulk orders.`,
      path: `/products/${d.slug}`,
      image: { url: d.image, alt: `WAS custom ${d.title.toLowerCase()}` },
    });
  }
  const c = getCategory(category);
  if (!c) return {};
  return pageMeta({
    title: `Custom ${c.title}`,
    description: `${c.tagline} ${materialOf(c)}. Custom ${c.title.toLowerCase()} made to order in Sialkot with your colours and logo.`,
    path: `/products/${c.slug}`,
    image: { url: c.products[0].image, alt: `${c.products[0].code} ${c.item}` },
  });
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category } = await params;
  const d = getDepartment(category);
  if (d) return <DepartmentView dept={d} />;
  const c = getCategory(category);
  if (!c) notFound();
  return <LineView c={c} />;
}

function enquiryButtons(label: string) {
  return (
    <ButtonAnchor
      variant="outline-light"
      href={whatsappLink(`Hi WAS Sportswear, I'd like a quote for ${label}.`)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon className="size-[18px]" /> Ask on WhatsApp
    </ButtonAnchor>
  );
}

/** A collection: Sportswear, Streetwear or Jackets, listing its product lines. */
function DepartmentView({ dept }: { dept: Department }) {
  const lines = categoriesOf(dept.slug);
  const designs = lines.reduce((n, c) => n + c.products.length, 0);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: dept.title, path: `/products/${dept.slug}` },
          ]),
          collectionLd({
            name: `${dept.title} by WAS Sportswear`,
            description: dept.intro,
            path: `/products/${dept.slug}`,
            items: lines.map((c) => ({ name: c.title, path: `/products/${c.slug}`, image: c.products[0].image })),
          }),
        ]}
      />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: dept.title },
        ]}
        eyebrow={`${lines.length} product lines · ${designs} designs`}
        title={[dept.title]}
        intro={dept.intro}
        image={{ src: dept.image, alt: `WAS ${dept.title.toLowerCase()}` }}
      >
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
          <ButtonLink href="#lines">Browse {dept.title.toLowerCase()}</ButtonLink>
          {enquiryButtons(dept.title.toLowerCase())}
        </div>
      </PageHero>

      <section id="lines" className="bg-paper py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase">Product lines</h2>
            <p className="text-sm text-ink/55">Choose a line to see its designs and details</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {lines.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.08}>
                <SubcategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <OtherCollections current={dept.slug} />
      <CTABand />
    </>
  );
}

/** Links to the other two collections, at the foot of a collection page. */
function OtherCollections({ current }: { current: Department["slug"] }) {
  return (
    <nav aria-label="Other collections" className="grid border-t border-ink/10 bg-white md:grid-cols-2">
      {departments
        .filter((o) => o.slug !== current)
        .map((o, i) => (
          <Link
            key={o.slug}
            href={`/products/${o.slug}`}
            className={`group relative flex items-center gap-5 overflow-hidden p-5 md:p-8 ${
              i === 1 ? "max-md:border-t max-md:border-ink/10 md:flex-row-reverse md:text-right" : "md:border-r md:border-ink/10"
            }`}
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-mist md:size-20">
              <Image src={o.image} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="relative">
              <p className="text-xs tracking-widest text-ink/50 uppercase transition-colors group-hover:text-gold">
                Collection
              </p>
              <p className="mt-1 font-display text-xl font-semibold uppercase transition-colors group-hover:text-white md:text-2xl">
                {o.title}
              </p>
            </div>
          </Link>
        ))}
    </nav>
  );
}

/** A product line, e.g. Varsity Hoodies: its designs, specification and customisation. */
function LineView({ c }: { c: Category }) {
  const dept = departmentOf(c);
  const siblings = categoriesOf(c.department);
  const idx = siblings.indexOf(c);
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const words = c.title.split(" ");
  const title = words.length > 1 ? [words.slice(0, -1).join(" "), words.at(-1)!] : [c.title];
  const few = c.products.length < 4;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: dept.title, path: `/products/${dept.slug}` },
            { name: c.title, path: `/products/${c.slug}` },
          ]),
          collectionLd({
            name: c.title,
            description: c.tagline,
            path: `/products/${c.slug}`,
            items: c.products.map((p) => ({
              name: `${p.code} ${c.item}, ${p.name}`,
              path: `/products/${c.slug}/${p.slug}`,
              image: p.image,
            })),
          }),
        ]}
      />
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: `/products/${dept.slug}`, label: dept.title },
          { label: c.title },
        ]}
        eyebrow={`${dept.title} · ${c.number} of ${String(siblings.length).padStart(2, "0")}`}
        title={title}
        intro={`${c.tagline} ${c.products.length} designs, all available in your own colours.`}
        number={c.number}
        image={{ src: c.products[0].image, alt: `${c.products[0].code} ${c.title}` }}
      >
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
          <ButtonLink href="#designs">See designs</ButtonLink>
          {enquiryButtons(c.title)}
        </div>
      </PageHero>

      <section id="designs" className="bg-paper py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4">
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase">Designs</h2>
            <p className="text-sm text-ink/55">
              Tap <strong className="text-ink">+</strong> to add a design to your quote list
            </p>
          </div>
          <div
            className={`mt-8 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 ${
              few ? "lg:max-w-4xl lg:gap-6" : "lg:grid-cols-4"
            }`}
          >
            {c.products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard
                  product={{ ...p, categoryTitle: c.title, categorySlug: c.slug }}
                  sizes={few ? "(max-width: 480px) 100vw, 440px" : undefined}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-gold-deep">Specifications</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight uppercase md:text-5xl">Details</h2>
            <div className="mt-8">
              <SpecList category={c} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-10">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-wide uppercase">Customisation</h3>
              <div className="mt-3">
                <OptionBadges category={c} />
              </div>
            </div>
            <PrintSizes category={c} />
            <div className="bg-glow rounded-3xl p-7 text-white">
              <p className="font-display text-2xl font-semibold uppercase">Need a different colourway?</p>
              <p className="mt-2 text-sm text-white/60">Every design in this line can be made in your own colours.</p>
              <ButtonLink href="/contact" className="mt-5 !px-5 !py-3">
                Request a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* prev / next line within the same collection */}
      <nav aria-label={`Other ${dept.title.toLowerCase()} lines`} className="grid border-t border-ink/10 bg-paper md:grid-cols-2">
        {[
          { c: prev, dir: "Previous line", Icon: ArrowLeft },
          { c: next, dir: "Next line", Icon: ArrowRight },
        ].map(({ c: o, dir, Icon }, i) => (
          <Link
            key={dir}
            href={`/products/${o.slug}`}
            className={`group relative flex items-center gap-5 overflow-hidden p-5 md:p-8 ${
              i === 1 ? "max-md:border-t max-md:border-ink/10 md:flex-row-reverse md:text-right" : "md:border-r md:border-ink/10"
            }`}
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-mist md:size-20">
              <Image src={o.products[0].image} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="relative">
              <p
                className={`flex items-center gap-2 text-xs tracking-widest text-ink/50 uppercase transition-colors group-hover:text-gold ${
                  i === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <Icon className="size-3.5" /> {dir}
              </p>
              <p className="mt-1 font-display text-xl font-semibold uppercase transition-colors group-hover:text-white md:text-2xl">
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
