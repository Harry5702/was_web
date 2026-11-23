import { Brush, Droplets, Layers, Scissors, Shirt, Wind } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  {
    icon: Droplets,
    title: "Full sublimation",
    text: "Colours, names, numbers and crests are printed into the fabric, so they will not crack, peel or fade.",
  },
  {
    icon: Layers,
    title: "Tackle twill",
    text: "Stitched tackle twill names and numbers for baseball and American football jerseys.",
  },
  {
    icon: Wind,
    title: "Performance fabrics",
    text: "Interlock, mesh, air-knit, tricot and stretch knits that wick moisture and dry quickly.",
  },
  {
    icon: Scissors,
    title: "Sport-specific cuts",
    text: "Pro-cut, oversized-over-pads, close-fitting and athletic cuts, depending on the sport.",
  },
  {
    icon: Brush,
    title: "Your artwork",
    text: "Use a catalogue design in your colours, or send us your own design to print.",
  },
  {
    icon: Shirt,
    title: "Full kits",
    text: "Jerseys with matching shorts, pants or pant shells, plus tracksuits and tees for the squad.",
  },
];

export function Capabilities() {
  return (
    <section className="bg-slash relative overflow-hidden py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading
          dark
          eyebrow="What you get"
          lines={["Built into", <span key="g" className="text-gold">every kit.</span>]}
          intro="These come straight from our product specifications. Exact fabric and finish depend on the product line."
        />

        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08} className="group relative overflow-hidden bg-ink p-8">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <it.icon className="size-8 text-gold transition-colors duration-500 group-hover:text-ink" />
                  <span className="font-tech text-xs text-white/25 transition-colors duration-500 group-hover:text-ink/50">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-extrabold uppercase transition-colors duration-500 group-hover:text-ink">
                  {it.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-ink/75">
                  {it.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
