import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import { ListingCard } from "../../components/consumer/listing-card";
import { GlowOrb, Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";
import { getFeaturedListings } from "../../lib/listings";
import { consumerModules } from "../../lib/modules";

export const metadata: Metadata = {
  title: "Explore Echelon — Every local opportunity in one place",
  description:
    "Browse every Echelon module: services, jobs, freelancing, one-off jobs, events, accommodation, networking, recruitment and the AI concierge.",
};

function moduleHref(slug: string) {
  return slug === "services" ? "/services" : `/explore/${slug}`;
}

export default function ExplorePage() {
  const featured = getFeaturedListings();

  return (
    <MarketingShell>
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12">
          <div className="echelon-grid absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
          <GlowOrb className="-left-24 top-10 -z-10 size-[380px] bg-violet-600/25" />
          <GlowOrb className="-right-20 top-0 -z-10 size-[340px] bg-indigo-500/18" />

          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[.065] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[.14em] text-violet-200">
                <Compass className="size-3.5" /> Explore the platform
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 max-w-3xl text-[40px] font-semibold leading-[1.0] tracking-[-.055em] text-white/92 sm:text-[64px]">
                Every local opportunity,
                <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                  one intelligent place.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[12px] leading-6 text-white/28">
                Nine modules, one platform, one AI. Services is live today — the rest are in preview. Explore what's
                coming and how each will work.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#0b0b0f] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Modules</p>
              <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">Pick a direction.</h2>
            </Reveal>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {consumerModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.slug} delay={index * 0.035}>
                    <Link
                      href={moduleHref(module.slug)}
                      className="group flex h-full flex-col rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:-translate-y-1 hover:border-white/[.11]"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex size-10 items-center justify-center rounded-xl border ${module.accent.border} ${module.accent.bg} ${module.accent.text}`}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-[7px] font-semibold uppercase tracking-[.1em] ${
                            module.status === "live"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-white/[.04] text-white/28"
                          }`}
                        >
                          {module.status === "live" ? "Live" : "Preview"}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[15px] font-semibold text-white/72">{module.name}</h3>
                      <p className="mt-2 flex-1 text-[9px] leading-5 text-white/26">{module.tagline}</p>
                      <span className={`mt-4 flex items-center gap-1 text-[8px] font-semibold ${module.accent.text}`}>
                        {module.status === "live" ? "Open" : "Preview"}
                        <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.055] bg-[#08080b] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Happening now</p>
                <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">A taste across modules.</h2>
              </div>
              <Link
                href="/how-it-works"
                className="hidden items-center gap-1 text-[8px] font-semibold text-violet-300 sm:flex"
              >
                How it works <ArrowUpRight className="size-3" />
              </Link>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((listing, index) => (
                <Reveal key={listing.id} delay={index * 0.04}>
                  <ListingCard listing={listing} showModule />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[24px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[.08] to-[#121217] p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-violet-400/10 text-violet-300">
                    <Sparkles className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white/78">One search for all of it.</h3>
                    <p className="mt-1.5 max-w-md text-[9px] leading-5 text-white/26">
                      Soon you'll just describe what you need and Echelon routes it to the right module. For now, explore
                      each one.
                    </p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white"
                >
                  Try the search <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
