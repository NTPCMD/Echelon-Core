import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarCheck,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { GlowOrb, Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";
import { consumerModules } from "../../lib/modules";

export const metadata: Metadata = {
  title: "How Echelon works — One search for every local need",
  description:
    "Describe what you need in plain language, compare trusted local options, and book or request in a few taps. Here's how the Echelon experience works.",
};

const steps = [
  {
    icon: Search,
    title: "Describe what you need",
    body: "Type it the way you'd say it — “book a haircut Saturday”, “find a DJ for my wedding”, “I need a cleaner”. No categories to learn, no forms to wrestle.",
  },
  {
    icon: Sparkles,
    title: "Echelon understands the intent",
    body: "It works out what you actually mean — the module, the timing, the location — and surfaces trusted options ranked by fit, not ad spend.",
  },
  {
    icon: CalendarCheck,
    title: "Book, apply or request",
    body: "Pick a live time, send an application or make a request in a few taps. Your details travel with you, so you never re-type them.",
  },
  {
    icon: MessagesSquare,
    title: "Manage it all in one place",
    body: "Every booking, application and saved option lives in your dashboard — across every module, in one calm thread.",
  },
];

const trust = [
  { icon: ShieldCheck, title: "Verified providers", body: "Businesses and people are checked before they appear." },
  { icon: Star, title: "Real reviews", body: "Ratings come from people who actually booked." },
  { icon: Wallet, title: "Transparent pricing", body: "See what things cost up front — no surprises at checkout." },
];

export default function HowItWorksPage() {
  return (
    <MarketingShell>
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-14 pt-16 sm:px-8 sm:pt-20 lg:px-12">
          <div className="echelon-grid absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
          <GlowOrb className="-left-24 top-10 -z-10 size-[380px] bg-violet-600/25" />

          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[.065] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[.14em] text-violet-200">
                <Sparkles className="size-3.5" /> How it works
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 max-w-3xl text-[40px] font-semibold leading-[1.0] tracking-[-.055em] text-white/92 sm:text-[60px]">
                One search.
                <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                  Everything local.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-[12px] leading-6 text-white/28">
                Echelon replaces a dozen apps with one intelligent front door. Here's the experience, step by step.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#0b0b0f] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-3 md:grid-cols-2">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05}>
                  <div className="flex h-full gap-4 rounded-[22px] border border-white/[.06] bg-[#121217] p-6">
                    <div>
                      <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-200">
                        <step.icon className="size-4" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-semibold text-violet-300/60">0{index + 1}</span>
                        <h3 className="text-[14px] font-semibold text-white/72">{step.title}</h3>
                      </div>
                      <p className="mt-2.5 text-[10px] leading-5 text-white/28">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.055] bg-[#08080b] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Built on trust</p>
              <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">
                Confidence in every booking.
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {trust.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-[20px] border border-white/[.06] bg-[#121217] p-6">
                    <span className="grid size-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                      <item.icon className="size-4" />
                    </span>
                    <h3 className="mt-5 text-[13px] font-semibold text-white/68">{item.title}</h3>
                    <p className="mt-2 text-[9px] leading-5 text-white/26">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b0f] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">One platform</p>
              <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">Nine ways in.</h2>
            </Reveal>
            <div className="mt-7 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {consumerModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.slug} delay={index * 0.03}>
                    <Link
                      href={module.slug === "services" ? "/services" : `/explore/${module.slug}`}
                      className="flex items-center gap-3 rounded-[16px] border border-white/[.055] bg-[#121217] px-4 py-3.5 transition hover:border-white/[.1]"
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${module.accent.bg} ${module.accent.text}`}>
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold text-white/62">{module.name}</p>
                        <p className="truncate text-[8px] text-white/24">{module.tagline}</p>
                      </div>
                      <ArrowRight className="size-3.5 shrink-0 text-white/20" />
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col items-center gap-4 rounded-[24px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[.08] to-[#121217] p-8 text-center">
                <h3 className="text-[20px] font-semibold tracking-[-.03em] text-white/80">Ready to try it?</h3>
                <p className="max-w-md text-[10px] leading-5 text-white/28">
                  Services is live in Perth today. Create a free account and book your first local expert.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link
                    href="/auth/register"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white"
                  >
                    Create account <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.08] px-5 text-[9px] font-semibold text-white/55 transition hover:text-white/85"
                  >
                    Browse services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
