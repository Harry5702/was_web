"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/ui/motion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";
import { allProducts, categories, departments } from "@/lib/catalogue";

// One model per collection, each wearing WAS: sportswear, streetwear and jackets.
const athletes = [
  {
    photo: "/hero/athlete-1.webp",
    label: "Sportswear",
    kit: "Team uniforms",
    href: "/products/sportswear",
    alt: "Athlete wearing a WAS black and gold football uniform",
  },
  {
    photo: "/hero/model-streetwear.webp",
    label: "Streetwear",
    kit: "Hoodies & sets",
    href: "/products/streetwear",
    alt: "Model wearing a WAS black puff print hoodie and joggers",
  },
  {
    photo: "/hero/model-jackets.webp",
    label: "Jackets",
    kit: "Varsity & outerwear",
    href: "/products/jackets",
    alt: "Model wearing a WAS black and gold varsity jacket",
  },
];

const facts = [
  { value: String(departments.length), label: "Collections" },
  { value: String(categories.length), label: "Product lines" },
  { value: String(allProducts.length), label: "Designs" },
  { value: "Custom", label: "Made to order" },
];

const EASE = [0.25, 1, 0.5, 1] as const;
const CYCLE_MS = 5000; // how long each athlete stays featured on tablet and desktop

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [swipeIndex, setSwipeIndex] = useState(0); // which card is in view on phones
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Feature the next athlete every few seconds; pause while the visitor hovers.
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % athletes.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce]);

  // Phones: true while the visitor is swiping, so their swipe sets the featured card
  // instead of the auto-scroll fighting it.
  const userSwiping = useRef(false);

  // Distance between two cards in the swipe row (card width + 12px gap).
  const cardStep = () => {
    const card = rowRef.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 12 : 0;
  };

  // Phones: track which card is snapped into view, for the dots.
  const onScroll = () => {
    const el = rowRef.current;
    const step = cardStep();
    if (!el || !step) return;
    const i = Math.min(athletes.length - 1, Math.round(el.scrollLeft / step));
    setSwipeIndex(i);
    if (userSwiping.current) setActive(i);
  };

  const scrollToCard = (i: number) => {
    const el = rowRef.current;
    const step = cardStep();
    if (!el || !step) return;
    userSwiping.current = false;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  // Phones: move the swipe row along with the featured card, like the panels on larger screens.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches || userSwiping.current) return;
    const el = rowRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollTo({ left: active * (card.offsetWidth + 12), behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  return (
    <section className="bg-glow relative overflow-hidden text-white">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-y-10 px-5 pt-10 pb-14 md:px-8 md:pt-16 lg:min-h-[calc(100svh-74px)] lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-14 lg:gap-y-0 lg:py-16">
        {/* copy */}
        <div className="relative z-10 lg:col-start-1 lg:row-start-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="eyebrow flex items-center gap-3 text-white/60"
          >
            <span className="h-px w-8 bg-gold" />
            {/* what WAS stands for: the initials in gold spell the name */}
            <span>
              {["We", "Are", "Stubborn"].map((word, i) => (
                <span key={word}>
                  {i > 0 && " "}
                  <span className="font-semibold text-gold">{word[0]}</span>
                  {word.slice(1)}
                </span>
              ))}
            </span>
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,11vw,4.5rem)] leading-[0.92] font-semibold tracking-tight uppercase lg:text-[clamp(3.6rem,5.2vw,5.4rem)]">
            <LineReveal
              immediate
              delay={0.2}
              lines={[
                "Custom apparel,",
                "made to order,",
                <span key="s" className="text-gold">
                  built stubborn.
                </span>,
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-6 max-w-md text-[15px] leading-relaxed font-light text-white/65 md:text-base"
          >
            Team sportswear, streetwear and jackets from Sialkot, Pakistan. Your colours, your logo,
            your names and numbers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap"
          >
            <ButtonLink href="/products">Explore catalogue</ButtonLink>
            <ButtonAnchor
              variant="outline-light"
              href={whatsappLink("Hi WAS Sportswear, I would like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-[18px]" /> WhatsApp us
            </ButtonAnchor>
          </motion.div>
        </div>

        {/* key facts: under the photos on phones, under the copy from laptop up */}
        <div className="order-last lg:order-none lg:col-start-1 lg:row-start-3">
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
            className="grid max-w-lg grid-cols-2 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4 lg:mt-12"
          >
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className={`pr-3 ${i % 2 ? "max-sm:border-l max-sm:border-white/10 max-sm:pl-5" : ""} ${
                  i > 0 ? "sm:border-l sm:border-white/10 sm:pl-4" : ""
                }`}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-[1.6rem] leading-none font-semibold whitespace-nowrap text-white">
                  {f.value}
                </dd>
                <dd className="mt-2 text-[11px] tracking-wide text-white/45 uppercase">{f.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* athletes: swipe row on phones, expanding panels from tablet up */}
        <div className="relative min-w-0 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-center">
          <div
            ref={rowRef}
            onScroll={onScroll}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => {
              userSwiping.current = true;
              setPaused(true);
            }}
            onTouchEnd={() => {
              setPaused(false);
              // let the swipe finish snapping, then hand control back to the auto-scroll
              setTimeout(() => (userSwiping.current = false), 800);
            }}
            className="no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:h-[clamp(440px,62vh,620px)] md:snap-none md:overflow-visible md:px-0"
          >
            {athletes.map((a, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={a.label}
                  data-active={isActive}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.1 }}
                  onMouseEnter={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className="group relative aspect-[3/4] w-[76%] shrink-0 snap-center overflow-hidden rounded-3xl bg-ink-3 ring-1 ring-white/10 transition-[flex-grow] duration-700 ease-[cubic-bezier(.25,1,.5,1)] min-[480px]:w-[58%] sm:w-[44%] md:aspect-auto md:w-auto md:shrink md:grow md:basis-0 md:data-[active=true]:grow-[2.6]"
                >
                  <Link
                    href={a.href}
                    onFocus={() => setActive(i)}
                    className="absolute inset-0 block"
                    aria-label={`WAS ${a.label.toLowerCase()}: ${a.kit.toLowerCase()}`}
                  >
                    <Image
                      src={a.photo}
                      alt={a.alt}
                      fill
                      preload={i === 0}
                      loading={i === 0 ? undefined : "eager"}
                      sizes="(max-width: 480px) 76vw, (max-width: 768px) 50vw, (max-width: 1024px) 60vw, 34vw"
                      className="object-cover object-[50%_30%] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-[1.04] md:brightness-[0.55] md:saturate-[0.8] md:group-data-[active=true]:brightness-100 md:group-data-[active=true]:saturate-100"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                    {/* full label: always on phones, featured panel only from tablet up */}
                    <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 transition-all duration-500 md:inset-x-6 md:bottom-6 md:translate-y-2 md:opacity-0 md:group-data-[active=true]:translate-y-0 md:group-data-[active=true]:opacity-100 md:group-data-[active=true]:delay-200">
                      <span className="min-w-0">
                        <span className="eyebrow block truncate text-gold">
                          {a.kit}
                        </span>
                        <span className="mt-1.5 block font-display text-2xl leading-[0.95] font-semibold text-balance uppercase md:text-3xl">
                          {a.label}
                        </span>
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors duration-300 group-hover:bg-gold">
                        <ArrowUpRight className="size-[18px]" />
                      </span>
                    </span>

                    {/* collapsed panels: vertical sport name */}
                    <span
                      aria-hidden
                      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-display text-lg font-semibold tracking-[0.12em] whitespace-nowrap text-white/80 uppercase [writing-mode:vertical-rl] rotate-180 transition-opacity duration-300 md:block md:group-data-[active=true]:opacity-0"
                    >
                      {a.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* phones: swipe dots */}
          <div className="mt-5 flex items-center justify-center gap-2 md:hidden" aria-label="Choose collection">
            {athletes.map((a, i) => (
              <button
                key={a.label}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Show ${a.label}`}
                aria-current={swipeIndex === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  swipeIndex === i ? "w-6 bg-gold" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* tablet and up: featured sport with a bar that fills until the next switch */}
          <div className="mt-5 hidden grid-cols-3 gap-4 md:grid" role="tablist" aria-label="Featured collection">
            {athletes.map((a, i) => (
              <button
                key={a.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="group text-left"
              >
                <span className="block h-[2px] overflow-hidden rounded-full bg-white/15">
                  {active === i && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="block h-full origin-left bg-gold"
                      initial={{ scaleX: paused || reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : CYCLE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span
                  className={`mt-2.5 block truncate text-[12px] tracking-wide uppercase transition-colors ${
                    active === i ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
