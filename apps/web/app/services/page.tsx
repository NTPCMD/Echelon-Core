import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Check, Search, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { MarketingCta, MarketingPageHero } from "../../components/marketing/page-sections";
import { Reveal } from "../../components/marketing/reveal";
import { ServiceMarketplace } from "../../components/marketing/service-marketplace";
import { MarketingShell } from "../../components/marketing/site-shell";
import { businesses } from "../../lib/seed";

export const metadata: Metadata = {
  title: "Services on Echelon — Discover and book local experts",
  description: "Search trusted local services across Perth, compare transparent options and book live availability.",
};

export default function ServicesPage() {
  return (
    <MarketingShell>
      <main>
        <MarketingPageHero
          eyebrow="Services · Live in Perth"
          title={
            <>
              The right local expert.
              <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                Without the search spiral.
              </span>
            </>
          }
          description="Discover trusted businesses, understand services, compare reputation and book an available time—all in one clear experience."
        >
          <div className="flex flex-wrap justify-center gap-2">
            {["Transparent pricing", "Live availability", "Verified reviews", "Secure booking"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 rounded-full border border-white/[.07] bg-white/[.025] px-3 py-1.5 text-[8px] text-white/27">
                <Check className="size-3 text-emerald-300" /> {item}
              </span>
            ))}
          </div>
        </MarketingPageHero>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <ServiceMarketplace businesses={businesses} />
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Designed for confidence</p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[46px]">From discovery to confirmed in minutes.</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: Search, step: "01", title: "Describe or browse", description: "Search naturally or explore by category, service and suburb." },
                { icon: ShieldCheck, step: "02", title: "Choose with context", description: "See services, pricing, reputation and real availability clearly." },
                { icon: CalendarCheck, step: "03", title: "Book in one flow", description: "Choose a time, share the details and receive confirmation." },
              ].map((item, index) => (
                <Reveal key={item.step} delay={index * 0.05}>
                  <div className="h-full rounded-[24px] border border-white/[.06] bg-[#121217] p-7">
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><item.icon className="size-4" /></span>
                      <span className="font-mono text-[8px] font-semibold text-violet-300/55">{item.step}</span>
                    </div>
                    <h3 className="mt-7 text-[15px] font-semibold text-white/68">{item.title}</h3>
                    <p className="mt-3 text-[10px] leading-5 text-white/24">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-[9px] font-semibold text-violet-300 transition hover:text-violet-200">
                <Sparkles className="size-3.5" /> Prefer to ask? Try Echelon AI <ArrowRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        <MarketingCta
          title="Make your next local decision a better one."
          description="Browse businesses across Perth or ask Echelon exactly what you need."
          primaryLabel="Ask Echelon"
          primaryHref="/"
        />
      </main>
    </MarketingShell>
  );
}
