"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Mail } from "lucide-react";
import { categoriesOf, departments } from "@/lib/catalogue";
import { mailtoLink, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import type { QuoteItem } from "./useQuote";

type Channel = "whatsapp" | "email";

export function EnquiryForm({ items, onSent }: { items?: QuoteItem[]; onSent?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState<Channel | null>(null);

  // Clear the "sent" note if the page is hidden and shown again (Activity keeps state)
  useLayoutEffect(() => () => setSent(null), []);

  const hasItems = !!items?.length;

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    const opt = (label: string, key: string, suffix = "") =>
      get(key) ? [`${label}: ${get(key)}${suffix}`] : [];
    const sizes = d.getAll("sizes").map(String);
    const lines: string[] = [
      "Hi WAS Sportswear, I'd like a quote.",
      "",
      ...opt("Name", "name"),
      ...opt("Team / club", "team"),
      ...opt("Email", "email"),
      ...opt("Phone / WhatsApp", "phone"),
      ...opt("Country", "country"),
    ];
    if (hasItems) {
      lines.push("", "Designs:");
      items!.forEach((i) => lines.push(`- ${i.code} (${i.category}, ${i.name}) x ${i.qty} pcs`));
    } else {
      lines.push(...opt("Product", "product"), ...opt("Quantity", "quantity", " pcs"));
    }
    if (sizes.length) lines.push(`Sizes: ${sizes.join(" & ")}`);
    if (get("message")) lines.push("", get("message"));
    return lines.join("\n");
  }

  function send(channel: Channel) {
    const form = formRef.current;
    if (!form || !form.reportValidity()) return;
    const body = compose(form);
    const subject = hasItems
      ? `Quote request: ${items!.map((i) => i.code).join(", ")}`
      : "Quote request from website";
    const url = channel === "whatsapp" ? whatsappLink(body) : mailtoLink(subject, body);
    if (channel === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    setSent(channel);
    onSent?.();
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="space-y-5"
      noValidate={false}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Team / club" name="team" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={254} />
        <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" maxLength={30} />
      </div>

      {!hasItems && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.4fr_1fr]">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-medium text-ink/70">
              Product
            </span>
            <select name="product" className="field" defaultValue="">
              <option value="" disabled>
                Choose a product line
              </option>
              {departments.map((d) => (
                <optgroup key={d.slug} label={d.title}>
                  {categoriesOf(d.slug).map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <Field label="Quantity (pcs)" name="quantity" type="number" min={1} max={100000} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.4fr_1fr]">
        <fieldset>
          <legend className="mb-1.5 block text-[12.5px] font-medium text-ink/70">
            Sizes needed
          </legend>
          <div className="flex gap-3">
            {["Youth", "Adult"].map((s) => (
              <label
                key={s}
                className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-ink/12 bg-white px-4 py-3 text-sm transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white"
              >
                <input type="checkbox" name="sizes" value={s} className="accent-[#e5b30b]" />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Country" name="country" autoComplete="country-name" />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[12.5px] font-medium text-ink/70">
          Details
        </span>
        <textarea
          name="message"
          rows={5}
          maxLength={2000}
          className="field resize-y"
          placeholder="Team colours, logo, names & numbers, size breakdown, deadline..."
        />
      </label>

      <p className="text-xs text-ink/50">
        Have artwork or a logo? Attach it in the WhatsApp chat or email that opens next.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[14px] font-medium tracking-wide text-white transition-colors hover:bg-[#1fb857] max-sm:w-full"
        >
          <WhatsAppIcon className="size-[18px]" /> Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[14px] font-medium tracking-wide text-white transition-colors hover:bg-ink-3 max-sm:w-full"
        >
          <Mail className="size-[18px]" /> Send by email
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-white"
          >
            <Check className="size-4 text-gold" />
            {sent === "whatsapp"
              ? "WhatsApp opened with your enquiry. Press send there to reach us."
              : "Your email app opened with your enquiry. Press send there to reach us."}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-ink/70">
        {label}
        {required && <span className="text-gold-deep"> *</span>}
      </span>
      <input required={required} maxLength={120} className="field" {...props} />
    </label>
  );
}
