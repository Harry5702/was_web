import type { Metadata } from "next";
import { Barlow_Condensed, Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the live domain when deploying
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "WAS Sportswear | Custom Team Uniforms from Sialkot",
    template: "%s | WAS Sportswear",
  },
  description:
    "Custom sublimated team uniforms, tracksuits, t-shirts and shorts made in Sialkot, Pakistan. Football, basketball, baseball, softball, American football, ice hockey, volleyball and rugby.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${orbitron.variable} ${poppins.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <ScrollProgress />
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
