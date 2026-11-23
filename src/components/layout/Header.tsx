"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, ClipboardList, Menu, X } from "lucide-react";
import { categories } from "@/lib/catalogue";
import { useQuote } from "@/components/quote/useQuote";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products", mega: true },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "How We Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const quote = useQuote();
  const count = quote.length;

  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // never hide while a menu is open, but always allow un-hiding
    setHidden(!megaOpen && !mobileOpen && y > 320 && y > prev);
  });

  // let other sticky elements sit under the header while it is visible
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", hidden ? "0px" : "74px");
  }, [hidden]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };
  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  const preview = categories[active];

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen && !megaOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.7, 0, 0.2, 1] }}
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        solid ? "bg-ink/95 backdrop-blur-md" : "bg-ink"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-5 md:px-6">
        <Link href="/" onNavigate={closeAll} className="relative shrink-0" aria-label="WAS Sportswear home">
          <Image
            src="/brand/logo-horizontal.png"
            alt="WAS - We Are Stubborn"
            width={1600}
            height={653}
            preload
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.mega ? (
              <div
                key={item.href}
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
                className="relative"
              >
                <Link
                  href={item.href}
                  onNavigate={closeAll}
                  onFocus={openMega}
                  aria-expanded={megaOpen}
                  className={`flex items-center gap-1 px-4 py-6 font-display text-[17px] font-semibold tracking-wide uppercase transition-colors hover:text-gold ${
                    isActive(item.href) ? "text-gold" : ""
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={closeAll}
                className={`group relative px-4 py-6 font-display text-[17px] font-semibold tracking-wide uppercase transition-colors hover:text-gold ${
                  isActive(item.href) ? "text-gold" : ""
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-4 h-0.5 origin-left bg-gold transition-transform duration-300 ${
                    isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/quote"
            onNavigate={closeAll}
            className="relative grid size-11 place-items-center text-white transition-colors hover:text-gold"
            aria-label={`Quote list, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ClipboardList className="size-[22px]" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute top-1 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 font-tech text-[10px] leading-[18px] font-bold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            href="/contact"
            onNavigate={closeAll}
            className="btn-sweep chamfer-sm hidden bg-gold px-5 py-3 font-display text-[16px] font-bold tracking-wider text-ink uppercase transition-colors [--sweep:#fff] sm:inline-block"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-11 place-items-center lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.7, 0, 0.2, 1] }}
            className="absolute inset-x-0 top-full hidden border-t-2 border-gold bg-ink-2 lg:block"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-[1fr_340px] gap-10 px-6 py-8">
              <ul className="grid grid-cols-2 gap-x-8">
                {categories.map((c, i) => (
                  <motion.li
                    key={c.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.025 }}
                  >
                    <Link
                      href={`/products/${c.slug}`}
                      onNavigate={closeAll}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`group flex items-center gap-4 border-b border-white/[0.07] py-3 transition-colors ${
                        active === i ? "text-gold" : "text-white/85"
                      }`}
                    >
                      <span className="w-7 font-tech text-xs text-gold/80">{c.number}</span>
                      <span className="font-display text-lg font-semibold tracking-wide uppercase">
                        {c.title}
                      </span>
                      <ArrowUpRight
                        className={`ml-auto size-4 transition-all duration-300 ${
                          active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        }`}
                      />
                    </Link>
                  </motion.li>
                ))}
                <li>
                  <Link
                    href="/products"
                    onNavigate={closeAll}
                    className="flex items-center gap-2 py-3 font-display text-lg font-bold tracking-wide text-gold uppercase"
                  >
                    View full catalogue <ArrowUpRight className="size-4" />
                  </Link>
                </li>
              </ul>

              <Link
                href={`/products/${preview.slug}`}
                onNavigate={closeAll}
                className="group relative block overflow-hidden bg-mist"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={preview.slug}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="relative aspect-[1056/921]"
                  >
                    <Image
                      src={preview.products[0].image}
                      alt={preview.title}
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="bg-ink p-4">
                  <p className="font-display text-xl font-bold tracking-wide uppercase">
                    {preview.title}
                  </p>
                  <p className="mt-1 text-[13px] text-white/60">{preview.tagline}</p>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
            className="bg-slash fixed inset-x-0 top-[74px] bottom-0 overflow-y-auto border-t-2 border-gold lg:hidden"
          >
            <MobileMenu onNavigate={closeAll} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [productsOpen, setProductsOpen] = useState(false);
  return (
    <nav className="px-6 py-6" aria-label="Mobile">
      {nav.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.05 }}
          className="border-b border-white/10"
        >
          {item.mega ? (
            <>
              <button
                type="button"
                onClick={() => setProductsOpen((o) => !o)}
                className="flex w-full items-center justify-between py-4 font-display text-3xl font-bold uppercase"
                aria-expanded={productsOpen}
              >
                {item.label}
                <ChevronDown
                  className={`size-6 text-gold transition-transform ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {productsOpen && (
                  <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/products/${c.slug}`}
                          onNavigate={onNavigate}
                          className="flex items-center gap-3 py-2.5 text-white/80"
                        >
                          <span className="w-6 font-tech text-[11px] text-gold">{c.number}</span>
                          {c.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/products"
                        onNavigate={onNavigate}
                        className="block py-3 font-semibold text-gold"
                      >
                        View full catalogue →
                      </Link>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={item.href}
              onNavigate={onNavigate}
              className="block py-4 font-display text-3xl font-bold uppercase"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
      <Link
        href="/contact"
        onNavigate={onNavigate}
        className="chamfer mt-8 block bg-gold py-4 text-center font-display text-xl font-bold tracking-wider text-ink uppercase"
      >
        Get a Quote
      </Link>
    </nav>
  );
}
