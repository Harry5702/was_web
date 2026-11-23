import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-slash relative flex min-h-[70vh] items-center overflow-hidden text-white">
      <span className="text-outline-gold pointer-events-none absolute -right-6 bottom-0 font-display text-[40vw] leading-none font-extrabold italic opacity-20 select-none">
        404
      </span>
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-6">
        <Image src="/brand/emblem.png" alt="" width={779} height={846} className="w-20" />
        <h1 className="mt-6 font-display text-6xl leading-[0.9] font-extrabold uppercase italic md:text-8xl">
          Off the pitch.
        </h1>
        <p className="mt-4 max-w-md text-white/65">
          This page doesn&apos;t exist. The catalogue is a better place to be.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">Browse catalogue</ButtonLink>
          <ButtonLink href="/" variant="outline-light" arrow={false}>
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
