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
      <div className={center ? "max-w-3xl" : "max-w-2xl"}>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <Slash className="h-[3px] w-8" />
          <span
            className={`font-tech text-[11px] font-bold tracking-[0.3em] uppercase ${
              dark ? "text-gold" : "text-gold-deep"
            }`}
          >
            {eyebrow}
          </span>
        </div>
        <h2
          className={`mt-4 font-display text-5xl leading-[0.92] font-extrabold uppercase md:text-6xl ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          <LineReveal lines={lines} />
        </h2>
        {intro && (
          <Reveal delay={0.2}>
            <p className={`mt-5 text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-ink/65"}`}>
              {intro}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.25}>{action}</Reveal>}
    </div>
  );
}
