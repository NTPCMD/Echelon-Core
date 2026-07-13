import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "../dashboard/brand-logo";
import { GlowOrb, Reveal } from "./reveal";

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pb-32 lg:pt-32">
      <div className="echelon-grid absolute inset-0 -z-20 opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <GlowOrb className="-left-32 top-8 -z-10 size-[430px] bg-violet-600/24" />
      <GlowOrb className="-right-32 top-24 -z-10 size-[360px] bg-indigo-600/16" />
      <Reveal className="mx-auto max-w-[1180px] text-center">
        <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">{eyebrow}</p>
        <h1 className="mx-auto mt-6 max-w-5xl text-[46px] font-semibold leading-[1] tracking-[-.06em] text-white/94 sm:text-[68px] lg:text-[82px]">
          {title}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-[13px] leading-7 text-white/34 sm:text-[15px]">
          {description}
        </p>
        {children ? <div className="mt-9">{children}</div> : null}
      </Reveal>
    </section>
  );
}

export function MarketingCta({
  title,
  description,
  primaryLabel = "Join Echelon",
  primaryHref = "/auth/register",
  secondaryLabel = "Talk to the team",
  secondaryHref = "/contact",
}: {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/[.055] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <GlowOrb className="left-1/2 top-1/2 -z-10 size-[460px] -translate-x-1/2 -translate-y-1/2 bg-violet-600/22" />
      <Reveal className="mx-auto max-w-4xl text-center">
        <BrandLogo className="mx-auto size-14" />
        <h2 className="mt-7 text-[38px] font-semibold leading-[1.04] tracking-[-.052em] text-white/92 sm:text-[56px]">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[11px] leading-6 text-white/28">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#8777fa] to-[#6554df] px-6 text-[11px] font-semibold text-white shadow-[0_16px_48px_rgba(108,92,231,.26)] transition hover:-translate-y-px"
          >
            {primaryLabel} <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[.09] bg-white/[.03] px-6 text-[11px] font-semibold text-white/55 transition hover:bg-white/[.065] hover:text-white/80"
          >
            {secondaryLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
