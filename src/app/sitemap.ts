import type { MetadataRoute } from "next";
import { categories, departments } from "@/lib/catalogue";
import { absolute } from "@/lib/seo";

// Bump when the catalogue changes so search engines know to re-crawl.
const UPDATED = new Date("2026-11-26");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" = "monthly",
    images?: string[],
  ) => ({
    url: absolute(path),
    lastModified: UPDATED,
    changeFrequency,
    priority,
    ...(images ? { images: images.map(absolute) } : {}),
  });

  return [
    page("/", 1, "weekly", ["/og-image.png"]),
    page("/products", 0.9, "weekly"),
    ...departments.map((d) => page(`/products/${d.slug}`, 0.9, "weekly", [d.image])),
    ...categories.map((c) =>
      page(`/products/${c.slug}`, 0.8, "monthly", c.products.map((p) => p.image)),
    ),
    ...categories.flatMap((c) =>
      c.products.map((p) => page(`/products/${c.slug}/${p.slug}`, 0.6, "monthly", [p.image])),
    ),
    page("/contact", 0.7),
  ];
}
