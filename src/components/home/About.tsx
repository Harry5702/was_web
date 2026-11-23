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
  const yTrack = useTransform(scrollYProgress, [0, 1], [60 * r, -60 * r]);
  const yTee = useTransform(scrollYProgress, [0, 1], [90 * r, -30 * r]);
  const yShorts = useTransform(scrollYProgress, [0, 1], [20 * r, -90 * r]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4 * r, 4 * r]);

  return (
    <section id="about" className="bg-slash-light relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-7xl items-center gap-16 px-5 md:px-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <Slash className="h-[3px] w-8" />
            <span className="font-tech text-[11px] font-bold tracking-[0.3em] text-gold-deep uppercase">
              About WAS
            </span>
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[0.92] font-extrabold uppercase md:text-6xl">
            <LineReveal lines={["We are", <span key="s" className="text-gold-deep">stubborn</span>, "about kit."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/70">
              WAS is a sportswear maker based in Sialkot, Pakistan. We make custom uniforms for
              football, basketball, baseball, softball, American football, ice hockey, volleyball
              and rugby, as well as sublimated tracksuits, t-shirts and shorts.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink/70">
              Every piece is made to order. Pick a design from our catalogue or send your own, then
              tell us your colours, names, numbers and logo.
            </p>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2">
            {options.map((o, i) => (
              <Reveal as="li" key={o.title} delay={0.1 + i * 0.07} className="group bg-paper p-5">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center bg-ink text-gold transition-transform duration-500 group-hover:-rotate-6">
                    <o.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase">{o.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/60">{o.text}</p>
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

        {/* product cut-out collage with parallax */}
        <div ref={ref} className="relative h-[460px] sm:h-[560px]">
          <motion.div
            style={{ rotate: rot }}
            className="absolute inset-x-[8%] top-[10%] bottom-[6%] bg-ink [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)]"
          />
          <div className="absolute inset-x-[8%] top-[10%] bottom-[6%] overflow-hidden [clip-path:polygon(12%_0,100%_0,88%_100%,0_100%)]">
            <span className="absolute -top-4 right-6 font-display text-[9rem] leading-none font-extrabold text-white/[0.05] italic">
              WAS
            </span>
          </div>
          <motion.div style={{ y: yTrack }} className="absolute top-[4%] right-[6%] w-[30%]">
            <Image
              src="/hero/cutout-tracksuit.webp"
              alt="WAS sublimation tracksuit"
              width={377}
              height={904}
              className="h-auto w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
          <motion.div style={{ y: yTee }} className="absolute top-[22%] left-[4%] w-[44%]">
            <Image
              src="/hero/cutout-tshirt.webp"
              alt="WAS sublimation t-shirt"
              width={465}
              height={580}
              className="h-auto w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
          <motion.div style={{ y: yShorts }} className="absolute bottom-[2%] left-[38%] w-[32%]">
            <Image
              src="/hero/cutout-shorts.webp"
              alt="WAS sublimation shorts"
              width={450}
              height={564}
              className="h-auto w-full drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
          <div className="absolute bottom-0 left-0 bg-gold px-4 py-3 font-tech text-[10px] font-bold tracking-[0.25em] text-ink uppercase">
            Made in Sialkot
          </div>
        </div>
      </div>
    </section>
  );
}
