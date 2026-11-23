import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="relative z-50 hidden bg-ink-2 text-[12.5px] text-white/70 md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {site.phones.map((ph) => (
            <a
              key={ph.raw}
              href={`tel:+${ph.raw}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone className="size-3.5 text-gold" aria-hidden />
              {ph.display}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Mail className="size-3.5 text-gold" aria-hidden />
            {site.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-gold" aria-hidden />
          {site.location}
        </div>
      </div>
    </div>
  );
}
