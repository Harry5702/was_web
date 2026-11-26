import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site, siteUrl } from "@/lib/site";
import { JsonLd, defaultShareImage, organizationLd } from "@/lib/seo";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WAS Sportswear | Custom Sportswear, Streetwear & Jackets Manufacturer",
    template: "%s | WAS Sportswear",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Apparel manufacturing",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: "WAS Sportswear | Custom Sportswear, Streetwear & Jackets",
    description: site.description,
    images: [defaultShareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAS Sportswear | Custom Sportswear, Streetwear & Jackets",
    description: site.description,
    images: [defaultShareImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${poppins.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationLd()} />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
