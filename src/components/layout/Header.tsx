"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, ClipboardList, Menu, X } from "lucide-react";
import {
  categoriesOf,
  departments,
  getCategory,
  type DepartmentSlug,
} from "@/lib/catalogue";
import { useQuote } from "@/components/quote/useQuote";

type NavItem = { href: string; label: string; dept?: DepartmentSlug };

const nav: NavItem[] = [
  { href: "/", label: "Home" },
  ...departments.map((d) => ({ href: `/products/${d.slug}`, label: d.title, dept: d.slug })),
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.7, 0, 0.2, 1] as const;

/** Which collection the current page belongs to, if any. */
function departmentFromPath(pathname: string): DepartmentSlug | undefined {
  const seg = pathname.split("/")[2];
  if (!pathname.startsWith("/products/") || !seg) return undefined;
  return departments.find((d) => d.slug === seg)?.slug ?? getCategory(seg)?.department;
}

export function Header() {
  const pathname = usePathname();
  const quote = useQuote();
  const count = quote.length;

  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [openDept, setOpenDept] = useState<DepartmentSlug | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // never hide while a menu is open, but always allow un-hiding
    setHidden(!openDept && !mobileOpen && y > 320 && y > prev);
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

  const openMenu = (dept: DepartmentSlug) => {
    clearTimeout(closeTimer.current);
    if (dept !== openDept) setPreviewSlug(null);
    setOpenDept(dept);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDept(null), 140);
  };
  const closeAll = () => {
    setOpenDept(null);
    setMobileOpen(false);
  };

  const currentDept = departmentFromPath(pathname);
  const isActive = (item: NavItem) =>
    item.dept
      ? currentDept === item.dept
      : item.href === "/"
        ? pathname === "/"
        : !item.href.includes("#") && pathname.startsWith(item.href);

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen && !openDept ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        solid ? "border-b border-white/5 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent bg-ink"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" onNavigate={closeAll} className="relative shrink-0" aria-label="WAS Sportswear home">
          <Image
            src="/brand/logo-horizontal.png"
            alt="WAS - We Are Stubborn"
            width={1600}
            height={653}
            preload
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {nav.map((item) =>
            item.dept ? (
              <div
                key={item.href}
                onMouseEnter={() => openMenu(item.dept!)}
                onMouseLeave={scheduleClose}
                className="relative"
              >
                <Link
                  href={item.href}
                  onNavigate={closeAll}
                  onFocus={() => openMenu(item.dept!)}
                  aria-expanded={openDept === item.dept}
                  className={`flex items-center gap-1 px-3.5 py-6 text-[14px] font-medium tracking-wide transition-colors hover:text-white xl:px-4 ${
                    isActive(item) || openDept === item.dept ? "text-white" : "text-white/65"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${openDept === item.dept ? "rotate-180" : ""}`}
                  />
                </Link>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={closeAll}
                className={`group relative px-3.5 py-6 text-[14px] font-medium tracking-wide transition-colors hover:text-white xl:px-4 ${
                  isActive(item) ? "text-white" : "text-white/65"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 bottom-[18px] h-px origin-left bg-gold transition-transform duration-300 xl:inset-x-4 ${
                    isActive(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
            className="relative grid size-11 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/5 hover:text-white"
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
                  className="absolute top-1 right-0.5 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 font-label text-[10px] leading-[18px] font-bold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            href="/contact"
            onNavigate={closeAll}
            className="ml-1 hidden rounded-full bg-gold px-5 py-2.5 text-[13.5px] font-medium tracking-wide text-ink transition-colors hover:bg-white sm:inline-block"
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

      {/* Desktop dropdown for the open collection */}
      <AnimatePresence>
        {openDept && (
          <motion.div
            key="menu"
            onMouseEnter={() => openMenu(openDept)}
            onMouseLeave={scheduleClose}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-0 top-full hidden border-t border-white/10 bg-ink-2/95 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:block"
          >
            <DeptMenu
              dept={openDept}
              previewSlug={previewSlug}
              onPreview={setPreviewSlug}
              onNavigate={closeAll}
            />
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
            transition={{ duration: 0.45, ease: EASE }}
            className="bg-glow fixed inset-x-0 top-[74px] bottom-0 overflow-y-auto border-t border-white/10 lg:hidden"
          >
            <MobileMenu onNavigate={closeAll} initialOpen={currentDept} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function DeptMenu({
  dept,
  previewSlug,
  onPreview,
  onNavigate,
}: {
  dept: DepartmentSlug;
  previewSlug: string | null;
  onPreview: (slug: string) => void;
  onNavigate: () => void;
}) {
  const info = departments.find((d) => d.slug === dept)!;
  const list = categoriesOf(dept);
  const preview = list.find((c) => c.slug === previewSlug) ?? list[0];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-[240px_1fr_300px] gap-10 px-8 py-8">
      <div className="flex flex-col">
        <p className="eyebrow text-gold">Collection</p>
        <p className="mt-3 font-display text-4xl leading-none font-semibold uppercase">{info.title}</p>
        <p className="mt-3 text-[13px] leading-relaxed font-light text-white/55">{info.tagline}</p>
        <Link
          href={`/products/${dept}`}
          onNavigate={onNavigate}
          className="group mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-medium transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          View all {info.title.toLowerCase()}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className={`grid content-start gap-x-8 ${list.length > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
        {list.map((c, i) => (
          <motion.li
            key={c.slug}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 + i * 0.02 }}
          >
            <Link
              href={`/products/${c.slug}`}
              onNavigate={onNavigate}
              onMouseEnter={() => onPreview(c.slug)}
              onFocus={() => onPreview(c.slug)}
              className={`group flex items-center gap-3 border-b border-white/[0.06] py-2.5 transition-colors ${
                preview.slug === c.slug ? "text-gold" : "text-white/80"
              }`}
            >
              <span className="w-6 font-label text-[11px] text-white/30">{c.number}</span>
              <span className="text-[14px] font-medium">{c.title}</span>
              <ArrowUpRight
                className={`ml-auto size-4 transition-all duration-300 ${
                  preview.slug === c.slug ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                }`}
              />
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link
        href={`/products/${preview.slug}`}
        onNavigate={onNavigate}
        className="group relative block overflow-hidden rounded-2xl bg-mist"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={preview.slug}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative aspect-[1056/921]"
          >
            <Image src={preview.products[0].image} alt={preview.title} fill sizes="300px" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="bg-ink p-4">
          <p className="font-display text-lg leading-tight font-semibold tracking-wide uppercase">{preview.title}</p>
          <p className="mt-1 line-clamp-2 text-[12.5px] text-white/55">{preview.tagline}</p>
        </div>
      </Link>
    </div>
  );
}

function MobileMenu({
  onNavigate,
  initialOpen,
}: {
  onNavigate: () => void;
  initialOpen?: DepartmentSlug;
}) {
  const [open, setOpen] = useState<DepartmentSlug | null>(initialOpen ?? null);
  return (
    <nav className="mx-auto max-w-xl px-6 py-6 pb-28" aria-label="Mobile">
      {nav.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + i * 0.05 }}
          className="border-b border-white/10"
        >
          {item.dept ? (
            <>
              <button
                type="button"
                onClick={() => setOpen((o) => (o === item.dept ? null : item.dept!))}
                className="flex w-full items-center justify-between py-4 font-display text-[2rem] font-semibold uppercase"
                aria-expanded={open === item.dept}
              >
                {item.label}
                <ChevronDown
                  className={`size-6 text-gold transition-transform ${open === item.dept ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === item.dept && (
                  <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {categoriesOf(item.dept).map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/products/${c.slug}`}
                          onNavigate={onNavigate}
                          className="flex items-center gap-3 py-2.5 text-white/80"
                        >
                          <span className="w-6 font-label text-[11px] text-gold">{c.number}</span>
                          {c.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={item.href} onNavigate={onNavigate} className="block py-3 font-medium text-gold">
                        View all {item.label.toLowerCase()} →
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
              className="block py-4 font-display text-[2rem] font-semibold uppercase"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
      <Link
        href="/contact"
        onNavigate={onNavigate}
        className="mt-8 block rounded-full bg-gold py-4 text-center text-[15px] font-medium tracking-wide text-ink"
      >
        Get a Quote
      </Link>
    </nav>
  );
}
