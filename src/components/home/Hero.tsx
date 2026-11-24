"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal } from "@/components/ui/motion";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/site";
import { allProducts } from "@/lib/catalogue";

type Slide = {
  kind: "photo" | "kit";
  src: string;
  label: string; // short sport label, e.g. "Football"
  code?: string; // article code for catalogue kits
  item?: string; // e.g. "Football Uniform"
  href: string;
};

// Each panel starts with its athlete photo, then cycles through catalogue kits.
// Kit images are background-free cut-outs of the catalogue mockups (public/hero/kits).
const lineup: { photo: string; label: string; href: string; kits: string[] }[] = [
  {
    photo: "/hero/athlete-1.webp",
    label: "Football",
    href: "/products/football-uniforms",
    kits: ["was-101", "was-801", "was-102", "was-802", "was-104", "was-804"],
  },
  {
    photo: "/hero/athlete-2.webp",
    label: "Basketball",
    href: "/products/basketball-uniforms",
    kits: ["was-201", "was-901", "was-202", "was-902", "was-204", "was-904"],
  },
  {
    photo: "/hero/athlete-3.webp",
    label: "Ice Hockey",
    href: "/products/ice-hockey-uniforms",
    kits: ["was-601", "was-1001", "was-602", "was-1002", "was-604", "was-1004"],
  },
  {
    photo: "/hero/athlete-4.webp",
    label: "American Football",
    href: "/products/american-football-uniforms",
    kits: ["was-501", "was-1101", "was-504", "was-1102", "was-402", "was-1104"],
  },
];

const panels: { slides: Slide[] }[] = lineup.map((l) => ({
  slides: [
    { kind: "photo", src: l.photo, label: l.label, href: l.href },
    ...l.kits.flatMap((slug): Slide[] => {
      const p = allProducts.find((x) => x.slug === slug);
      if (!p) return [];
      return [
        {
          kind: "kit",
          src: `/hero/kits/${slug}.webp`,
          label: p.category.short,
          code: p.code,
          item: p.category.item,
          href: `/products/${p.category.slug}/${p.slug}`,
        },
      ];
    }),
  ],
}));

const facts = [
  { value: "11", label: "Product lines" },
  { value: "44", label: "Catalogue designs" },
  { value: "100%", label: "Sublimated print" },
  { value: "Youth+Adult", label: "Size range" },
];

const EASE = [0.7, 0, 0.2, 1] as const;
const CYCLE_MS = 4500; // time each panel stays featured
const FIRST_MS = 2200; // wait for the intro wipe before the first switch

export function Hero() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [auto, setAuto] = useState<number | null>(null);
  const [round, setRound] = useState(0); // which slide every panel is on
  const reduce = useReducedMotion();

  // Every few seconds: feature the next panel and move every panel on to its next uniform.
  // Pauses while the visitor hovers a panel.
  useEffect(() => {
    if (reduce || hovered !== null) return;
    const t = setTimeout(
      () => {
        if (auto !== null) setRound((r) => r + 1); // first tick only highlights, photos stay
        setAuto((a) => (a === null ? 0 : (a + 1) % panels.length));
      },
      auto === null ? FIRST_MS : CYCLE_MS,
    );
    return () => clearTimeout(t);
  }, [auto, hovered, reduce]);

  const slideOf = (i: number, offset = 0) => {
    const s = panels[i].slides;
    return s[(round + offset) % s.length];
  };

  const active = hovered ?? auto;
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

      <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 px-5 pt-14 pb-10 md:px-6 lg:min-h-[calc(100svh-110px)] lg:grid-cols-[1fr_1.05fr] lg:py-16">
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
        <motion.div style={{ y: panelsY }}>
        <div
          className="relative flex h-[420px] gap-2 sm:h-[520px] lg:h-[600px]"
          onMouseLeave={() => setHovered(null)}
        >
          {panels.map((_, i) => {
            const isHover = active === i;
            const slide = slideOf(i);
            const next = slideOf(i, 1);
            const dim = active !== null && !isHover;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => {
                  setHovered(i);
                  setAuto(i); // carry on cycling from the panel the visitor chose
                }}
                animate={{ flexGrow: active === null ? 1 : isHover ? 2.4 : 0.7 }}
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
                  <Link
                    href={slide.href}
                    className="group relative block h-full w-full"
                    aria-label={slide.kind === "kit" ? `${slide.code} ${slide.item}` : `${slide.label} uniforms`}
                  >
                    {/* new uniform wipes up over the previous one; panels change one after another */}
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={slide.src}
                        className="absolute inset-0"
                        initial={{ clipPath: "inset(100% 0 0 0)", zIndex: 2 }}
                        animate={{ clipPath: "inset(0% 0 0 0)", zIndex: 2 }}
                        exit={{ zIndex: 1, transition: { duration: 0 } }}
                        transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                      >
                        {slide.kind === "photo" ? (
                          <Image
                            src={slide.src}
                            alt={`${slide.label} uniform by WAS`}
                            fill
                            preload={i < 2 && round === 0}
                            sizes="(max-width: 1024px) 40vw, 22vw"
                            className={`object-cover transition-[transform,filter] duration-700 ${
                              dim ? "grayscale-[70%] brightness-75" : ""
                            } ${isHover ? "scale-105" : "scale-100"}`}
                          />
                        ) : (
                          // catalogue kit on a dark studio backdrop with a gold spotlight
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(229,179,11,0.30),transparent_62%),linear-gradient(180deg,#1f1f1f,#0b0b0b)]">
                            <div className="absolute inset-x-[16%] top-[7%] bottom-[12%]">
                              <Image
                                src={slide.src}
                                alt={`${slide.code} ${slide.item}`}
                                fill
                                sizes="(max-width: 1024px) 40vw, 24vw"
                                className={`object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.6)] transition-[transform,filter] duration-700 ${
                                  dim ? "grayscale-[60%] brightness-75" : ""
                                } ${isHover ? "scale-105" : "scale-100"}`}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* load the next uniform ahead of time so the wipe never shows a blank */}
                    <Image
                      src={next.src}
                      alt=""
                      aria-hidden
                      width={8}
                      height={8}
                      loading="eager"
                      sizes={next.kind === "kit" ? "(max-width: 1024px) 40vw, 24vw" : "(max-width: 1024px) 40vw, 22vw"}
                      className="pointer-events-none invisible absolute h-px w-px"
                    />

                    <span className="absolute inset-0 z-[3] bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span
                      className={`absolute bottom-6 left-[22%] z-[4] flex flex-col gap-1 whitespace-nowrap transition-all duration-500 ${
                        isHover ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                      }`}
                    >
                      {slide.kind === "kit" && (
                        <span className="w-fit bg-gold px-1.5 py-0.5 font-tech text-[10px] font-bold tracking-widest text-ink">
                          {slide.code}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 font-display text-lg font-bold tracking-wide uppercase">
                        {slide.kind === "kit" ? slide.item : slide.label}
                        <ArrowUpRight className="size-4 text-gold" />
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* which panel is featured, with a bar that fills until the next switch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-5 grid grid-cols-4 gap-3"
          role="tablist"
          aria-label="Featured sport"
        >
          {panels.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setAuto(i)}
              className="group text-left"
            >
              <span className="block h-[3px] overflow-hidden bg-white/15">
                {active === i && (
                  <motion.span
                    // remount to restart the fill whenever the timer restarts
                    key={`${auto}-${hovered === null}`}
                    className="block h-full origin-left bg-gold"
                    initial={{ scaleX: hovered === null && !reduce ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: hovered === null && !reduce ? CYCLE_MS / 1000 : 0, ease: "linear" }}
                  />
                )}
              </span>
              <span
                className={`mt-2 flex items-baseline gap-1.5 font-display text-[13px] font-bold tracking-wide uppercase transition-colors sm:text-sm ${
                  active === i ? "text-white" : "text-white/40 group-hover:text-white/70"
                }`}
              >
                <span className="font-tech text-[10px] text-gold">0{i + 1}</span>
                <span className="truncate">{slideOf(i).label}</span>
              </span>
            </button>
          ))}
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
