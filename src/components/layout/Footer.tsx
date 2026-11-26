import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { departments } from "@/lib/catalogue";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CurrentYear } from "@/components/ui/CurrentYear";

export function Footer() {
  return (
    <footer className="bg-glow relative overflow-hidden text-white">
      {/* oversized motto */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] left-0 right-0 text-center font-display text-[16vw] leading-none font-semibold tracking-tight whitespace-nowrap text-white/[0.025] uppercase select-none"
      >
        We Are Stubborn
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="col-span-2 lg:col-span-1">
          <Image
            src="/brand/logo-horizontal.png"
            alt="WAS - We Are Stubborn"
            width={1600}
            height={653}
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-white/55">
            Custom sportswear, streetwear and jackets, made to order in Sialkot, Pakistan. Your
            colours, your logo, your labels.
          </p>
          <a
            href={whatsappLink("Hi WAS Sportswear, I would like a quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <WhatsAppIcon className="size-4" /> Chat on WhatsApp
          </a>
        </div>

        <FooterList
          title="Collections"
          links={[
            ...departments.map((d) => ({ href: `/products/${d.slug}`, label: d.title })),
            { href: "/products", label: "Full catalogue" },
          ]}
        />
        <FooterList
          title="Company"
          links={[
            { href: "/#about", label: "About us" },
            { href: "/#process", label: "How we work" },
            { href: "/quote", label: "Quote list" },
            { href: "/contact", label: "Contact" },
          ]}
        />

        <div className="col-span-2 lg:col-span-1">
          <h3 className="eyebrow text-gold">
            Contact
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm text-white/70">
            {site.phones.map((ph) => (
              <li key={ph.raw}>
                <a href={`tel:+${ph.raw}`} className="flex items-center gap-3 hover:text-white">
                  <Phone className="size-4 text-gold" aria-hidden />
                  {ph.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="size-4 text-gold" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-gold" aria-hidden />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        {/* extra bottom space on phones so the floating WhatsApp button doesn't cover this row */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 pt-5 pb-24 text-xs text-white/40 sm:flex-row sm:pb-5 md:px-8">
          <p>
            © <CurrentYear /> WAS Sportswear. All rights reserved.
          </p>
          <p className="eyebrow !text-[10px]">We Are Stubborn</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-gold">{title}</h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-grow text-sm text-white/65 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
