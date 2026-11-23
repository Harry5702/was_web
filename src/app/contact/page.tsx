import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryForm } from "@/components/quote/EnquiryForm";
import { Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Request a quote for custom team uniforms from WAS Sportswear, Sialkot, Pakistan.",
};

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
        title={["Let's talk", "uniforms."]}
        intro="Tell us what you need: the product line or article codes, your quantity and sizes, and any artwork. We'll get back to you with a quote."
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 md:px-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-4">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <div className="group flex items-start gap-4 bg-white p-5 transition-shadow hover:shadow-[6px_6px_0_var(--color-gold)]">
                  <span className="grid size-12 shrink-0 place-items-center bg-ink text-gold">
                    <c.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-widest text-ink/45 uppercase">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-0.5 block font-semibold break-words hover:text-gold-deep">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-semibold">{c.value}</p>
                    )}
                    {"extra" in c && c.extra && (
                      <a
                        href={c.extra.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#128C4B] hover:underline"
                      >
                        <WhatsAppIcon className="size-3.5" /> {c.extra.label}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-10">
            <h2 className="font-display text-4xl font-extrabold uppercase">Request a quote</h2>
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
