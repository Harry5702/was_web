"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/ui/motion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

const panels = [
  { img: "/hero/athlete-1.webp", label: "Football", href: "/products/football-uniforms" },
  { img: "/hero/athlete-2.webp", label: "Basketball", href: "/products/basketball-uniforms" },
  { img: "/hero/athlete-3.webp", label: "Ice Hockey", href: "/products/ice-hockey-uniforms" },
  { img: "/hero/athlete-4.webp", label: "American Football", href: "/products/american-football-uniforms" },
];

const facts = [
  { value: "11", label: "Product lines" },
  { value: "44", label: "Catalogue designs" },
  { value: "100%", label: "Sublimated print" },
  { value: "Youth+Adult", label: "Size range" },
];

const EASE = [0.7, 0, 0.2, 1] as const;

export function Hero() {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const panelsY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 90]);
  const textY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -40]);

  return (
    <section className="bg-slash relative overflow-hidden text-white">
      {/* gold corner wedge, as on the catalogue cover */}
      <motion.div
        aria-hidden
        initial={{ x: "40%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className="absolute -top-10 right-0 h-28 w-[38%] bg-gold [clip-path:polygon(18%_0,100%_0,100%_100%)] md:h-64 md:w-[55%]"
      />
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="absolute top-[52%] -left-10 h-3 w-64 origin-left -rotate-[24deg] bg-gold md:w-96"
      />
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
        className="absolute top-[58%] -left-16 h-3 w-48 origin-left -rotate-[24deg] bg-white md:w-72"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pt-14 pb-10 md:px-6 lg:min-h-[calc(100svh-110px)] lg:grid-cols-[1fr_1.05fr] lg:py-16">
        <motion.div style={{ y: textY }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 font-tech text-[11px] font-bold tracking-[0.3em] text-gold uppercase"
          >
            <span className="h-[3px] w-8 bg-gold" />
            Sialkot, Pakistan · Made to order
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.2rem,5.6vw,5.9rem)] leading-[0.88] font-extrabold uppercase italic">
            <LineReveal
              immediate
              delay={0.3}
              lines={[
                "Custom team",
                "uniforms,",
                <span key="s" className="text-gold">
                  built stubborn.
                </span>,
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-white/65"
          >
            Fully sublimated kits for eight sports, plus tracksuits, t-shirts and shorts. Your
            colours, names, numbers and team logo, in youth and adult sizes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <ButtonLink href="/products">Explore catalogue</ButtonLink>
            <ButtonAnchor
              variant="outline-light"
              href={whatsappLink("Hi WAS Sportswear, I would like a quote for custom uniforms.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-[18px]" /> WhatsApp us
            </ButtonAnchor>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.05 } } }}
            className="mt-12 grid max-w-lg grid-cols-2 gap-px bg-white/10 sm:grid-cols-4"
          >
            {facts.map((f) => (
              <motion.div
                key={f.label}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="bg-ink px-3 py-4"
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-2xl leading-none font-extrabold text-gold">
                  {f.value}
                </dd>
                <dd className="mt-1.5 text-[11px] tracking-wide text-white/50 uppercase">{f.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        {/* slanted athlete panels */}
        <motion.div
          style={{ y: panelsY }}
          className="relative flex h-[420px] gap-2 sm:h-[520px] lg:h-[640px]"
          onMouseLeave={() => setHovered(null)}
        >
          {panels.map((p, i) => {
            const isHover = hovered === i;
            return (
              <motion.div
                key={p.img}
                onMouseEnter={() => setHovered(i)}
                animate={{ flexGrow: hovered === null ? 1 : isHover ? 2.4 : 0.7 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative basis-0"
                style={{ marginTop: `${(3 - i) * 22}px`, marginBottom: `${i * 22}px` }}
              >
                <motion.div
                  initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                  animate={{ clipPath: "polygon(22% 0, 100% 0, 78% 100%, 0 100%)" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.12 }}
                  className="absolute inset-0 -mx-[9%] overflow-hidden bg-ink-3"
                >
                  <Link href={p.href} className="group block h-full w-full" aria-label={`${p.label} uniforms`}>
                    <Image
                      src={p.img}
                      alt={`${p.label} uniform by WAS`}
                      fill
                      preload={i < 2}
                      sizes="(max-width: 1024px) 40vw, 22vw"
                      className={`object-cover transition-[transform,filter] duration-700 ${
                        hovered !== null && !isHover ? "grayscale-[70%] brightness-75" : ""
                      } ${isHover ? "scale-105" : "scale-100"}`}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span
                      className={`absolute bottom-6 left-[22%] flex items-center gap-1.5 font-display text-lg font-bold tracking-wide whitespace-nowrap uppercase transition-all duration-500 ${
                        isHover ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                    >
                      {p.label} <ArrowUpRight className="size-4 text-gold" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
