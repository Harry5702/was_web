import type { Metadata } from "next";
import { site, siteUrl } from "./site";

type Json = Record<string, unknown>;

/**
 * Structured data for search engines. JSON.stringify does not escape "<", so it is replaced
 * with its unicode form to stop any value from closing the script tag (Next.js JSON-LD guide).
 */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** Default share picture (1200x630) for pages without a product image of their own. */
export const defaultShareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "WAS Sportswear: custom sportswear, streetwear and jackets made to order in Sialkot, Pakistan",
};

/** The business, shown on every page so Google can tie the site to WAS. */
export function organizationLd(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      alternateName: "WAS - We Are Stubborn",
      url: siteUrl,
      logo: `${siteUrl}/brand/logo-stacked.png`,
      description: site.description,
      email: site.email,
      telephone: `+${site.phones[0].raw}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sialkot",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      contactPoint: site.phones.map((ph) => ({
        "@type": "ContactPoint",
        telephone: `+${ph.raw}`,
        contactType: "sales",
        email: site.email,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Urdu"],
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: site.name,
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];
}

/** Breadcrumb trail, e.g. Home > Jackets > Varsity Jackets. */
export function breadcrumbLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

/** A collection or product line page listing the pages inside it. */
export function collectionLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string; image?: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absolute(opts.path),
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: absolute(it.path),
        ...(it.image ? { image: absolute(it.image) } : {}),
      })),
    },
  };
}

/**
 * Metadata for one page: title, description, canonical link and share previews.
 * Open Graph is rebuilt in full because a page's openGraph replaces the layout's, not merges.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
}): Metadata {
  const images = [opts.image ?? defaultShareImage];
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: opts.path,
      title: `${opts.title} | ${site.name}`,
      description: opts.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${site.name}`,
      description: opts.description,
      images,
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
