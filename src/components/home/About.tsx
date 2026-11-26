"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Hash, Palette, Ruler, Shield } from "lucide-react";
import { LineReveal, Reveal, Slash } from "@/components/ui/motion";
import { ButtonLink } from "@/components/ui/Button";

const options = [
  { icon: Palette, title: "Custom colour & design", text: "Any colourway, or send us your own artwork." },
  { icon: Hash, title: "Names & numbers", text: "Sublimated or tackle twill, front, back and shoulders." },
  { icon: Shield, title: "Your team logo", text: "Club crests, sponsor logos and shoulder patches." },
  { icon: Ruler, title: "Youth & adult sizes", text: "Full size runs, with custom lengths on shorts." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r = reduce ? 0 : 1;
  const yTrack = useTransform(scrollYProgress, [0, 1], [40 * r, -40 * r]);
  const yTee = useTransform(scrollYProgress, [0, 1], [50 * r, -20 * r]);
  const yShorts = useTransform(scrollYProgress, [0, 1], [15 * r, -50 * r]);
  const rot = useTransform(scrollYProgress, [0, 1], [-1.5 * r, 1.5 * r]);

  return (
    <section id="about" className="relative overflow-hidden bg-paper py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <Slash className="h-px w-8" />
            <span className="eyebrow text-gold-deep">About WAS</span>
          </div>
          <h2 className="mt-4 font-display text-[2.6rem] leading-[0.95] font-semibold tracking-tight uppercase sm:text-5xl md:text-[3.5rem]">
            <LineReveal lines={["We are", <span key="s" className="text-gold-deep">stubborn</span>, "about kit."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed font-light text-ink/70">
              WAS is an apparel maker based in Sialkot, Pakistan. We make custom team uniforms for
              eight sports, streetwear such as hoodies, sweatsuits and oversized tees, and varsity,
              puffer and coach jackets.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed font-light text-ink/70">
              Every piece is made to order. Pick a design from our catalogue or send your own, then
              tell us your colours, names, numbers and logo.
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((o, i) => (
              <Reveal
                as="li"
                key={o.title}
                delay={0.1 + i * 0.07}
                className="group rounded-2xl border border-ink/[0.06] bg-white p-5 transition-shadow duration-500 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-deep transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                    <o.icon className="size-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium">{o.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/55">{o.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-10">
            <ButtonLink href="/products" variant="dark">
              View all products
            </ButtonLink>
          </Reveal>
        </div>

        {/* product cut-outs on a soft studio panel, with gentle parallax */}
        <div ref={ref} className="relative mx-auto aspect-[4/5] w-full max-w-[540px] sm:aspect-square lg:aspect-[4/5]">
          <motion.div
            style={{ rotate: rot }}
            className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white to-mist ring-1 ring-ink/[0.06]"
          />
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <span className="absolute top-6 right-8 font-display text-[7rem] leading-none font-semibold text-ink/[0.04] sm:text-[9rem]">
              WAS
            </span>
            <span className="absolute -bottom-24 left-1/2 size-[70%] -translate-x-1/2 rounded-full bg-gold/25 blur-[90px]" />
          </div>
          <motion.div style={{ y: yTrack }} className="absolute top-[8%] right-[8%] w-[28%]">
            <Image
              src="/hero/cutout-tracksuit.webp"
              alt="WAS sublimation tracksuit"
              width={377}
              height={904}
              sizes="(max-width: 1024px) 28vw, 150px"
              className="h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
          <motion.div style={{ y: yTee }} className="absolute top-[18%] left-[7%] w-[44%]">
            <Image
              src="/hero/cutout-tshirt.webp"
              alt="WAS sublimation t-shirt"
              width={465}
              height={580}
              sizes="(max-width: 1024px) 44vw, 240px"
              className="h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
          <motion.div style={{ y: yShorts }} className="absolute bottom-[8%] left-[36%] w-[30%]">
            <Image
              src="/hero/cutout-shorts.webp"
              alt="WAS sublimation shorts"
              width={450}
              height={564}
              sizes="(max-width: 1024px) 30vw, 160px"
              className="h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
          <div className="eyebrow absolute bottom-5 left-5 rounded-full bg-ink px-4 py-2 !text-[10px] text-gold">
            Made in Sialkot
          </div>
        </div>
      </div>
    </section>
  );
}
