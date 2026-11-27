"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Set after the first page has hydrated, so only later in-site navigations fade in.
// The first load stays fully visible straight away (no flash, no delay for search engines).
let hydrated = false;

/** Fades each new page in after a navigation; the page itself opens at the top. */
export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hydrated && !reduce ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}
