import { categories } from "@/lib/catalogue";

export function Marquee() {
  const items = categories.map((c) => c.short);
  const row = [...items, ...items];
  return (
    <div className="marquee-pause relative overflow-hidden border-y border-white/10 bg-ink py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="animate-marquee flex w-max items-center [--marquee-duration:140s]">
        {row.map((label, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="px-7 font-display text-xl font-medium tracking-[0.14em] whitespace-nowrap text-white/55 uppercase md:px-9 md:text-2xl">
              {label}
            </span>
            <span className="size-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
