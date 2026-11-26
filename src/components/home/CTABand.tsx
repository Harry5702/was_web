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
    <section className="bg-paper px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-gold">
        <span className="pointer-events-none absolute -top-40 -left-40 size-[420px] rounded-full bg-white/25 blur-[100px]" />
        <Image
          src="/brand/emblem.png"
          alt=""
          width={779}
          height={846}
          className="pointer-events-none absolute -right-16 -bottom-24 w-[320px] opacity-[0.1] md:w-[460px]"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 py-16 md:px-12 md:py-20 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-[2.6rem] leading-[0.92] font-semibold tracking-tight text-ink uppercase sm:text-5xl md:text-[4.25rem]">
              <LineReveal lines={title} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/75">
                Send us the article codes you like, or your own design. Call{" "}
                <a href={`tel:+${site.phones[0].raw}`} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  {site.phones[0].display}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${site.email}`} className="font-medium break-all underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
            <ButtonLink href="/contact" variant="dark">
              Request a quote
            </ButtonLink>
            <ButtonAnchor
              variant="outline-dark"
              href={whatsappLink("Hi WAS Sportswear, I would like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="!border-ink/30"
            >
              <WhatsAppIcon className="size-[18px]" /> WhatsApp
            </ButtonAnchor>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
