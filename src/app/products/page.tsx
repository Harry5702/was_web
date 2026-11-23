import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { CTABand } from "@/components/home/CTABand";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse all 44 WAS Sportswear designs: football, basketball, baseball, softball, American football, ice hockey, volleyball and rugby uniforms, plus sublimation t-shirts, tracksuits and shorts.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
        eyebrow="Products catalogue"
        title={["The full", "catalogue."]}
        intro="Eleven product lines, 44 designs. Every design can be made in your colours, with your names, numbers and logo, in youth and adult sizes."
        image={{ src: "/products/was-504.webp", alt: "WAS-504 American football uniform" }}
      />
      <div className="bg-paper">
        <CatalogueBrowser />
      </div>
      <CTABand />
    </>
  );
}
