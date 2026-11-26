import type { ReactNode } from "react";
import { LineReveal, Reveal, Slash } from "./motion";

export function SectionHeading({
  eyebrow,
  lines,
  intro,
  dark = false,
  align = "left",
  action,
}: {
  eyebrow: string;
  lines: ReactNode[];
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <Slash className="h-px w-8" />
          <span className={`eyebrow ${dark ? "text-gold" : "text-gold-deep"}`}>{eyebrow}</span>
        </div>
        <h2
          className={`mt-4 font-display text-[2.6rem] leading-[0.95] font-semibold tracking-tight uppercase sm:text-5xl md:text-[3.5rem] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          <LineReveal lines={lines} />
        </h2>
        {intro && (
          <Reveal delay={0.2}>
            <p
              className={`mt-5 text-[15px] leading-relaxed font-light ${center ? "mx-auto max-w-xl" : "max-w-xl"} ${
                dark ? "text-white/65" : "text-ink/65"
              }`}
            >
              {intro}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.25}>{action}</Reveal>}
    </div>
  );
}
