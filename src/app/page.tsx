import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Departments } from "@/components/home/Departments";
import { About } from "@/components/home/About";
import { CatalogueTabs } from "@/components/home/CatalogueTabs";
import { Process } from "@/components/home/Process";
import { CTABand } from "@/components/home/CTABand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Custom Sportswear, Streetwear & Jackets Manufacturer",
  description:
    "Custom team uniforms, streetwear and jackets made to order in Sialkot, Pakistan. Sublimated kits, hoodies, varsity jackets and more, with your colours, logo and private label.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Departments />
      <CatalogueTabs />
      <About />
      <Process />
      <CTABand />
    </>
  );
}
