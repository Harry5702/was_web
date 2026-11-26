"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-glow flex min-h-[60vh] items-center text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <p className="eyebrow text-gold">Something went wrong</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] font-semibold tracking-tight uppercase md:text-7xl">
          This page didn&apos;t load.
        </h1>
        <p className="mt-4 max-w-md font-light text-white/65">
          Please try again. If it keeps happening, contact us and we will help with your order.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-gold px-7 py-3.5 text-[14px] font-medium tracking-wide text-ink transition-colors hover:bg-white"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-medium tracking-wide transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
