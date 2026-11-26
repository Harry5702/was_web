# WAS Sportswear website

Next.js 16 (App Router) + Tailwind CSS 4 + Motion. All products come from the WAS product catalogue PDF.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| Product data (11 lines, 44 designs, specs) | `src/lib/catalogue.ts` |
| Phone numbers, email, WhatsApp links | `src/lib/site.ts` |
| Product images (`was-101.webp` …) | `public/products/` |
| Logos and emblem | `public/brand/` |
| Hero photos and cut-outs | `public/hero/` |

To add a design: drop the image in `public/products/` and add a `p(...)` entry to its category in `catalogue.ts`.

## Pages

- `/`: home (hero, about, product lines, capabilities, catalogue tabs, process)
- `/products`: full catalogue with filters
- `/products/[category]`: one product line with specs
- `/products/[category]/[product]`: product detail with zoom and enquiry
- `/quote`: quote list (saved in the visitor's browser)
- `/contact`: contact details and quote form

## Enquiries

The quote and contact forms don't need a server. They build the message and open WhatsApp
(+92 312 7536091) or the visitor's email app addressed to wasindustry0@gmail.com. To receive
form submissions directly instead, add a Server Action that sends email (for example through Resend or SMTP).

Set `NEXT_PUBLIC_SITE_URL` to the live domain (e.g. `https://wassportswear.com`) so canonical links, the sitemap and share images use it. On Vercel the production URL is used automatically if it is not set.
