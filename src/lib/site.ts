/**
 * The live address, used for canonical links, the sitemap and share images.
 * Set NEXT_PUBLIC_SITE_URL to your own domain; on Vercel the production URL is used otherwise.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "WAS Sportswear",
  tagline: "We Are Stubborn",
  email: "wasindustry0@gmail.com",
  phones: [
    { display: "+92 312 7536091", raw: "923127536091" },
    { display: "+92 339 7070787", raw: "923397070787" },
  ],
  location: "Sialkot, Pakistan",
  description:
    "WAS Sportswear is a custom apparel manufacturer in Sialkot, Pakistan, making team sportswear, streetwear and jackets to order, with private label and bulk orders.",
};

export function whatsappLink(message: string, phoneIndex = 0) {
  return `https://wa.me/${site.phones[phoneIndex].raw}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
