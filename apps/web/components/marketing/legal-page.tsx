import type { ReactNode } from "react";
import { MarketingShell } from "./site-shell";

export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <MarketingShell>
      <main>
        <section className="border-b border-white/[.055] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">{eyebrow}</p>
            <h1 className="mt-5 text-[44px] font-semibold tracking-[-.055em] text-white/92 sm:text-[62px]">{title}</h1>
            <p className="mt-5 max-w-2xl text-[12px] leading-6 text-white/30">{description}</p>
            <p className="mt-6 text-[8px] text-white/17">Last updated {updated}</p>
          </div>
        </section>
        <section className="bg-[#0b0b0f] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <article className="echelon-legal mx-auto max-w-4xl">{children}</article>
        </section>
      </main>
    </MarketingShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-white/[.055] py-8 first:pt-0 last:border-0">
      <h2 className="text-[16px] font-semibold text-white/68">{title}</h2>
      <div className="mt-4 space-y-3 text-[10px] leading-6 text-white/28">{children}</div>
    </section>
  );
}
