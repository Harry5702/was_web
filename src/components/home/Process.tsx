"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Choose a design",
    text: "Pick an article code from the catalogue, such as WAS-101, or send us your own artwork.",
  },
  {
    title: "Customise it",
    text: "Tell us your colours, team logo, sponsor, player names, numbers and size breakdown.",
  },
  {
    title: "Confirm details",
    text: "We go over the design, sizes and quantities with you before anything is made.",
  },
  {
    title: "Production & delivery",
    text: "Your order is made in Sialkot and shipped out to your team.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="How we work"
          align="center"
          lines={["From idea to", "game day."]}
          intro="Ordering from us takes four simple steps."
        />

        <div ref={ref} className="relative mt-16">
          {/* track + scroll-linked fill (desktop: horizontal, mobile: vertical) */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-ink/10 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" />
          </div>
          <div className="absolute top-0 bottom-0 left-7 w-px -translate-x-1/2 bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gold" />
          </div>

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative flex gap-6 lg:block lg:text-center">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-ink/10 bg-white font-display text-xl font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)] lg:mx-auto">
                  0{i + 1}
                </span>
                <div className="pt-2 lg:mt-6 lg:pt-0">
                  <h3 className="font-display text-2xl font-semibold tracking-tight uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed font-light text-ink/60 lg:mx-auto lg:max-w-[240px]">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
