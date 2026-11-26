import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CatalogueBrowser } from "@/components/product/CatalogueBrowser";
import { CTABand } from "@/components/home/CTABand";
import { allProducts, categories } from "@/lib/catalogue";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Product Catalogue: Sportswear, Streetwear & Jackets",
  description: `Browse ${allProducts.length} WAS designs across ${categories.length} product lines: team uniforms, hoodies, sweatsuits, caps, and varsity, puffer and coach jackets. Made to order in Sialkot.`,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Products" }]}
        eyebrow="Products catalogue"
        title={["The full", "catalogue."]}
        intro={`Sportswear, streetwear and jackets: ${categories.length} product lines and ${allProducts.length} designs. Every design can be made in your colours with your logo.`}
        image={{ src: "/products/was-2201.webp", alt: "WAS-2201 varsity jacket" }}
      />
      <div className="bg-paper">
        <CatalogueBrowser />
      </div>
      <CTABand />
    </>
  );
}
