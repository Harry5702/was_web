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
    <section id="process" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          eyebrow="How we work"
          align="center"
          lines={["From idea to", "game day."]}
          intro="Ordering custom uniforms with us takes four steps."
        />

        <div ref={ref} className="relative mt-16">
          {/* track + scroll-linked fill (desktop: horizontal, mobile: vertical) */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-[3px] bg-ink/10 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" />
          </div>
          <div className="absolute top-0 bottom-0 left-7 w-[3px] bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gold" />
          </div>

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative flex gap-6 lg:block lg:text-center">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center bg-ink font-tech text-lg font-bold text-gold [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] lg:mx-auto">
                  0{i + 1}
                </span>
                <div className="lg:mt-6">
                  <h3 className="font-display text-2xl font-extrabold uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60 lg:mx-auto lg:max-w-[240px]">
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
