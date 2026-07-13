import type { Metadata } from "next";
import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModuleHero } from "../../../components/consumer/module-hero";
import { ModuleListings } from "../../../components/consumer/module-listings";
import { Reveal } from "../../../components/marketing/reveal";
import { MarketingShell } from "../../../components/marketing/site-shell";
import { getListings } from "../../../lib/listings";
import { exploreModules, getModule } from "../../../lib/modules";

export function generateStaticParams() {
  return exploreModules.map((module) => ({ module: module.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: slug } = await params;
  const module = getModule(slug);
  return {
    title: module ? `${module.name} on Echelon — ${module.hero.eyebrow}` : "Explore — Echelon",
    description: module?.hero.description ?? "Explore the Echelon platform.",
  };
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module: slug } = await params;
  const module = getModule(slug);
  if (!module || module.slug === "services") notFound();

  const listings = getListings(slug);
  const isConcierge = slug === "concierge";

  return (
    <MarketingShell>
      <main>
        <ModuleHero module={module} />

        {/* How it works */}
        <section className="bg-[#0b0b0f] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">How it works</p>
              <h2 className="mt-3 text-[24px] font-semibold tracking-[-.04em] text-white/80">
                {module.name} in three steps.
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {module.howItWorks.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <div className="h-full rounded-[20px] border border-white/[.06] bg-[#121217] p-5">
                    <span
                      className={`inline-flex size-8 items-center justify-center rounded-lg ${module.accent.bg} text-[10px] font-semibold ${module.accent.text}`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="mt-4 text-[12px] font-semibold text-white/62">{step.title}</h3>
                    <p className="mt-2 text-[9px] leading-5 text-white/26">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Listings or concierge entry */}
        <section className="border-t border-white/[.055] bg-[#08080b] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1180px]">
            {isConcierge ? (
              <Reveal>
                <div className="mx-auto max-w-2xl rounded-[26px] border border-fuchsia-400/12 bg-gradient-to-br from-fuchsia-500/[.08] to-[#121217] p-8 text-center sm:p-12">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-fuchsia-400/10 text-fuchsia-200">
                    <Sparkles className="size-6" />
                  </span>
                  <h2 className="mt-6 text-[24px] font-semibold tracking-[-.04em] text-white/82">
                    The Concierge ties it all together.
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[11px] leading-6 text-white/30">
                    One place to ask for anything local — the Concierge routes across every module and keeps it in a
                    single thread. This is where Echelon's AI will live.
                  </p>
                  <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
                    <Link
                      href="/"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white"
                    >
                      <MessageSquareText className="size-3.5" /> Try the search
                    </Link>
                    <Link
                      href="/explore"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-5 text-[9px] font-semibold text-white/55 transition hover:text-white/85"
                    >
                      Browse modules
                    </Link>
                  </div>
                  <p className="mt-6 text-[7px] uppercase tracking-[.14em] text-white/18">Preview · AI coming soon</p>
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">
                        Browse {module.name.toLowerCase()}
                      </p>
                      <h2 className="mt-3 text-[24px] font-semibold tracking-[-.04em] text-white/80">
                        {module.status === "live" ? "Available now." : "A preview of what's coming."}
                      </h2>
                    </div>
                  </div>
                </Reveal>
                <div className="mt-7">
                  <ModuleListings slug={slug} listings={listings} />
                </div>
                <Reveal delay={0.1}>
                  <p className="mt-10 flex items-center justify-center gap-1.5 text-[8px] text-white/20">
                    <Sparkles className="size-3 text-violet-300/50" /> Preview data — {module.name} launches with live
                    listings and Echelon AI matching.
                  </p>
                </Reveal>
              </>
            )}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
