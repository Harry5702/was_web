import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/catalogue";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { CurrentYear } from "@/components/ui/CurrentYear";

export function Footer() {
  const half = Math.ceil(categories.length / 2);
  return (
    <footer className="bg-slash relative overflow-hidden text-white">
      {/* oversized motto */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-0 right-0 text-center font-display text-[18vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-white/[0.03] uppercase italic select-none"
      >
        We Are Stubborn
      </div>

      <div className="h-1.5 bg-gold" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
        <div>
          <Image
            src="/brand/logo-horizontal.png"
            alt="WAS - We Are Stubborn"
            width={1600}
            height={653}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Custom sublimated team uniforms, tracksuits, t-shirts and shorts, made to order in
            Sialkot, Pakistan. Your colours, your names and numbers, your logo.
          </p>
          <a
            href={whatsappLink("Hi WAS Sportswear, I would like a quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm transition-colors hover:border-[#25D366] hover:text-[#25D366]"
          >
            <WhatsAppIcon className="size-4" /> Chat on WhatsApp
          </a>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-lg font-bold tracking-widest text-gold uppercase">
            Products
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-x-8">
            {[categories.slice(0, half), categories.slice(half)].map((col, ci) => (
              <ul key={ci} className="space-y-2.5">
                {col.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/products/${c.slug}`}
                      className="link-grow text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold tracking-widest text-gold uppercase">
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
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail className="size-4 text-gold" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-gold" aria-hidden />
              {site.location}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/products" className="link-grow text-white/65 hover:text-white">
              Catalogue
            </Link>
            <Link href="/quote" className="link-grow text-white/65 hover:text-white">
              Quote list
            </Link>
            <Link href="/contact" className="link-grow text-white/65 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/45 sm:flex-row">
          <p>
            © <CurrentYear /> WAS Sportswear. All rights reserved.
          </p>
          <p className="font-tech tracking-[0.2em] uppercase">We Are Stubborn</p>
        </div>
      </div>
    </footer>
  );
}
