import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteList } from "@/components/quote/QuoteList";
import { pageMeta } from "@/lib/seo";

// The quote list is personal to each visitor, so it is kept out of search results.
export const metadata: Metadata = pageMeta({
  title: "Your Quote List",
  description: "Review the WAS designs you've selected and send them for a quote.",
  path: "/quote",
  noindex: true,
});

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
