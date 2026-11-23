import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { About } from "@/components/home/About";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CatalogueTabs } from "@/components/home/CatalogueTabs";
import { Capabilities } from "@/components/home/Capabilities";
import { Process } from "@/components/home/Process";
import { CTABand } from "@/components/home/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <CategoryGrid />
      <Capabilities />
      <CatalogueTabs />
      <Process />
      <CTABand />
    </>
  );
}
