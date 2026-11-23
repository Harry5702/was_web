import Image from "next/image";
import { categories } from "@/lib/catalogue";

export function Marquee() {
  const items = categories.map((c) => c.short);
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -mt-px overflow-hidden bg-ink py-3">
      <div className="marquee-pause -rotate-[1.2deg] bg-gold py-3.5">
        <div className="animate-marquee flex w-max items-center [--marquee-duration:45s]">
          {row.map((label, i) => (
            <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
              <span
                className={`px-6 font-display text-3xl font-extrabold tracking-wide uppercase italic md:text-4xl ${
                  i % 2 ? "text-outline text-ink" : "text-ink"
                }`}
              >
                {label}
              </span>
              <Image src="/brand/emblem.png" alt="" width={28} height={30} className="h-7 w-auto" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
