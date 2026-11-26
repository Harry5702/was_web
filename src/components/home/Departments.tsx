import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoriesOf, departments } from "@/lib/catalogue";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/** The three collections: Sportswear, Streetwear and Jackets. */
export function Departments() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="What we make"
          lines={["Three collections,", "one standard."]}
          intro="Team sportswear, streetwear and jackets, all made to order in Sialkot in your colours."
          action={
            <ButtonLink href="/products" variant="outline-dark">
              Full catalogue
            </ButtonLink>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 lg:gap-6">
          {departments.map((d, i) => {
            const lines = categoriesOf(d.slug);
            const shown = lines.slice(0, 3);
            return (
              <Reveal key={d.slug} delay={i * 0.08}>
                <Link
                  href={`/products/${d.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper ring-1 ring-ink/[0.05] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
                >
                  {/* title first, then the picture */}
                  <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-5">
                    <h3 className="font-display text-[2rem] leading-none font-semibold tracking-tight uppercase">
                      {d.title}
                    </h3>
                    <span className="rounded-full bg-ink px-3 py-1 font-label text-[11px] font-medium tracking-wider whitespace-nowrap text-gold">
                      {lines.length} lines
                    </span>
                  </div>
                  <div className="relative aspect-[1056/921] overflow-hidden bg-mist">
                    <Image
                      src={d.image}
                      alt={`WAS ${d.title.toLowerCase()}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[13.5px] leading-relaxed text-ink/60">{d.tagline}</p>
                    <p className="mt-3 text-[12.5px] text-ink/45">
                      {shown.map((c) => c.short).join(" · ")}
                      {lines.length > shown.length && ` · +${lines.length - shown.length} more`}
                    </p>
                    <span className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium tracking-wide text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                        Explore {d.title.toLowerCase()}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
