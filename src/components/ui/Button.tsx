import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "dark" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-[#f0c428] shadow-[0_10px_30px_-12px_rgba(229,179,11,0.7)]",
  dark: "bg-ink text-white hover:bg-ink-3",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-ink",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
};

const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-[14px] font-medium tracking-wide transition-all duration-300 active:scale-[0.98] sm:px-7";

export function ButtonLink({
  variant = "gold",
  children,
  arrow = true,
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <Link {...props} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "gold",
  children,
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: Variant; children: ReactNode }) {
  return (
    <a {...props} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}

export const buttonClass = (variant: Variant = "gold") => `${base} ${styles[variant]}`;
