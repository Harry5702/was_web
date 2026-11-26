"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

/** Hover (or tap) to zoom; the zoom origin follows the cursor. */
export function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const move = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setZoom(true)}
      onPointerLeave={() => setZoom(false)}
      onPointerMove={move}
      onClick={() => setZoom((z) => !z)}
      className={`relative aspect-[1056/921] overflow-hidden rounded-3xl bg-mist ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload
        sizes="(max-width: 1024px) 100vw, 640px"
        style={{ transformOrigin: origin }}
        className={`object-cover transition-transform duration-500 ease-[cubic-bezier(.25,1,.5,1)] ${zoom ? "scale-[2]" : "scale-100"}`}
      />
      <span
        className={`pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-[11px] text-white backdrop-blur transition-opacity ${zoom ? "opacity-0" : "opacity-100"}`}
      >
        <ZoomIn className="size-3.5" /> <span className="max-md:hidden">Hover</span><span className="md:hidden">Tap</span> to zoom
      </span>
    </div>
  );
}
