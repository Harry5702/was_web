import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "dark" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-ink [--sweep:#fff]",
  dark: "bg-ink text-white [--sweep:var(--color-gold)] hover:text-ink",
  "outline-light":
    "border-2 border-white/30 text-white [--sweep:#fff] hover:text-ink hover:border-white",
  "outline-dark": "border-2 border-ink text-ink [--sweep:var(--color-ink)] hover:text-white",
};

const base =
  "btn-sweep chamfer-sm group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 font-display text-[17px] font-bold tracking-wider uppercase transition-colors duration-300";

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
        <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-1" />
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
