import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteList } from "@/components/quote/QuoteList";

export const metadata: Metadata = {
  title: "Your Quote List",
  description: "Review the WAS Sportswear designs you've selected and send them for a quote.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/", label: "Home" }, { label: "Quote list" }]}
        eyebrow="Quote list"
        title={["Your", "selection."]}
        intro="Adjust quantities, add your details and send the whole list to us in one message."
      />
      <QuoteList />
    </>
  );
}
