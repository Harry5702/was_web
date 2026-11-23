import Image from "next/image";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export function CTABand({
  title = ["Ready to kit out", "your team?"],
}: {
  title?: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-gold">
      <div className="bg-slash-light absolute inset-0" />
      <Image
        src="/brand/emblem.png"
        alt=""
        width={779}
        height={846}
        className="pointer-events-none absolute -right-16 -bottom-24 w-[380px] opacity-[0.12] md:w-[520px]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-5 py-20 md:px-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-display text-5xl leading-[0.9] font-extrabold text-ink uppercase italic md:text-7xl">
            <LineReveal lines={title} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-[15px] text-ink/75">
              Send us the article codes you like, or your own design. Call{" "}
              <a href={`tel:+${site.phones[0].raw}`} className="font-semibold underline-offset-4 hover:underline">
                {site.phones[0].display}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold underline-offset-4 hover:underline">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="dark">
            Request a quote
          </ButtonLink>
          <ButtonAnchor
            variant="outline-dark"
            href={whatsappLink("Hi WAS Sportswear, I would like a quote for custom uniforms.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="size-[18px]" /> WhatsApp
          </ButtonAnchor>
        </Reveal>
      </div>
    </section>
  );
}
