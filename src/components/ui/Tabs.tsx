"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div>
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-ink/10 [scrollbar-width:none]">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            type="button"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel`}
            onClick={() => setActive(i)}
            className={`relative shrink-0 px-4 py-3 font-display text-lg font-bold tracking-wide uppercase transition-colors ${
              active === i ? "text-ink" : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {t.label}
            {active === i && (
              <motion.span layoutId={`${id}-underline`} className="absolute inset-x-0 -bottom-px h-[3px] bg-gold" />
            )}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="pt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
