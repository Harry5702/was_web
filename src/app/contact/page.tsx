import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/quote/EnquiryForm";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Request a Quote",
  description:
    "Request a quote for custom sportswear, streetwear or jackets from WAS Sportswear in Sialkot, Pakistan. Reach us on WhatsApp, phone or email.",
  path: "/contact",
});

export default function ContactPage() {
  const cards = [
    ...site.phones.map((ph, i) => ({
      icon: Phone,
      label: `Phone ${i + 1}`,
      value: ph.display,
      href: `tel:+${ph.raw}`,
      extra: { href: whatsappLink("Hi WAS Sportswear, I would like a quote.", i), label: "WhatsApp" },
    })),
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Location", value: site.location },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow="Get a quote"
        title={["Let's make", "your kit."]}
        intro="Tell us what you need: the product line or article codes, your quantity and sizes, and any artwork. We'll get back to you with a quote."
      />

      <section className="bg-paper py-14 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <div className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink/[0.05] transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep">
                    <c.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-widest text-ink/45 uppercase">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 block font-medium break-all hover:text-gold-deep">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium">{c.value}</p>
                    )}
                    {"extra" in c && c.extra && (
                      <a
                        href={c.extra.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#128C4B] hover:underline"
                      >
                        <WhatsAppIcon className="size-3.5" /> {c.extra.label}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="rounded-3xl bg-white p-6 ring-1 ring-ink/[0.05] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)] md:p-10">
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase">Request a quote</h2>
            <p className="mt-2 mb-8 text-sm text-ink/60">
              Fields marked * are required. Your enquiry opens in WhatsApp or your email app, ready to send.
            </p>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
