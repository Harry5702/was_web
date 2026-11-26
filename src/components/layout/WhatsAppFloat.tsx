import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi WAS Sportswear, I would like a quote.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WAS Sportswear on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex items-center"
    >
      <span className="pointer-events-none mr-3 translate-x-2 bg-ink px-3 py-2 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:-translate-y-1">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.4s]" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </a>
  );
}
