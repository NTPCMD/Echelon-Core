import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CircleCheck, Globe2, Handshake, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { MarketingCta, MarketingPageHero } from "../../components/marketing/page-sections";
import { Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";

export const metadata: Metadata = {
  title: "About Echelon — A simpler local economy",
  description:
    "Echelon is building one intelligent platform for discovering, booking and operating local commerce.",
};

const principles = [
  {
    icon: BrainCircuit,
    title: "Intent before interface",
    description: "People should begin with the outcome they want—not a category tree designed around a database.",
  },
  {
    icon: ShieldCheck,
    title: "Trust is infrastructure",
    description: "Reputation, identity, transparency and control are not features. They are the foundation.",
  },
  {
    icon: Handshake,
    title: "Both sides should win",
    description: "Customers get less friction. Businesses get higher-intent demand and better operating tools.",
  },
  {
    icon: Sparkles,
    title: "Intelligence should feel quiet",
    description: "The best AI disappears into a calmer, faster and more useful experience.",
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <main>
        <MarketingPageHero
          eyebrow="About Echelon"
          title={
            <>
              Local life is complex.
              <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                Finding what matters should not be.
              </span>
            </>
          }
          description="Echelon exists to make local opportunity easier to discover, easier to trust and easier to complete—for people and businesses alike."
        >
          <div className="flex flex-wrap justify-center gap-2">
            {["AI-native", "Local-first", "Built in Perth", "Designed for completion"].map((item) => (
              <span key={item} className="rounded-full border border-white/[.07] bg-white/[.025] px-3 py-1.5 text-[8px] font-medium text-white/28">
                {item}
              </span>
            ))}
          </div>
        </MarketingPageHero>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <p className="max-w-5xl text-[32px] font-medium leading-[1.18] tracking-[-.042em] text-white/78 sm:text-[46px] lg:text-[58px]">
                The internet made everything available.
                <span className="text-white/24"> It did not make everything simple.</span>
              </p>
            </Reveal>
            <div className="mt-14 grid gap-8 border-t border-white/[.055] pt-10 md:grid-cols-3">
              <Reveal>
                <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-violet-300/70">The problem</p>
                <p className="mt-4 text-[11px] leading-6 text-white/30">
                  Local commerce is spread across directories, social feeds, job boards, booking tools, review sites,
                  inboxes and disconnected apps. Every need starts with unnecessary navigation.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-violet-300/70">The insight</p>
                <p className="mt-4 text-[11px] leading-6 text-white/30">
                  People already know the outcome they want. An intelligent platform can understand that intent and
                  coordinate the categories, context and next steps behind it.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[9px] font-semibold uppercase tracking-[.18em] text-violet-300/70">The opportunity</p>
                <p className="mt-4 text-[11px] leading-6 text-white/30">
                  One trusted layer can connect demand and supply while giving local businesses the operating system
                  they need to grow lasting customer relationships.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Our mission</p>
                <h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[50px]">
                  Make local opportunity feel effortless.
                </h2>
              </div>
              <p className="max-w-2xl text-[13px] leading-7 text-white/32">
                We are building a platform where someone can describe what they need, understand their best options
                and complete the next step without losing context. At the same time, businesses gain one intelligent
                workspace for turning demand into excellent service and durable growth.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["One", "Shared identity across every marketplace"],
                ["Eight", "Connected local opportunity categories"],
                ["Two-sided", "Value for customers and businesses"],
                ["Local-first", "Starting in Perth, designed to scale"],
              ].map(([value, label], index) => (
                <Reveal key={value} delay={index * 0.045}>
                  <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-6">
                    <p className="text-[24px] font-semibold tracking-[-.045em] text-white/72">{value}</p>
                    <p className="mt-3 text-[9px] leading-4 text-white/22">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">How we build</p>
              <h2 className="mt-4 max-w-2xl text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[46px]">
                Principles before features.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.04}>
                  <div className="group h-full rounded-[24px] border border-white/[.06] bg-[#121217] p-6 transition hover:-translate-y-1 hover:border-white/[.11] hover:shadow-[0_26px_80px_rgba(0,0,0,.3)] sm:p-8">
                    <span className="grid size-10 place-items-center rounded-xl border border-violet-400/10 bg-violet-400/10 text-violet-300">
                      <principle.icon className="size-4" />
                    </span>
                    <h3 className="mt-7 text-[16px] font-semibold text-white/70">{principle.title}</h3>
                    <p className="mt-3 max-w-md text-[10px] leading-5 text-white/25">{principle.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">The trajectory</p>
                <h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[48px]">
                  Begin focused.
                  <span className="block text-white/28">Expand with purpose.</span>
                </h2>
                <p className="mt-5 max-w-md text-[11px] leading-6 text-white/27">
                  Echelon starts where utility is immediate, then compounds through a shared identity, shared trust and
                  shared intelligence layer.
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  phase: "Now",
                  title: "Services marketplace",
                  description: "Natural-language discovery, transparent business profiles, live services and a complete booking flow.",
                  icon: MapPin,
                  active: true,
                },
                {
                  phase: "Next",
                  title: "Connected local opportunity",
                  description: "Jobs, freelance projects, events, food, stays and networking connected by the same customer identity.",
                  icon: Users,
                  active: false,
                },
                {
                  phase: "Future",
                  title: "An operating system for local commerce",
                  description: "A trusted intelligence layer that helps people decide and helps businesses operate across markets.",
                  icon: Globe2,
                  active: false,
                },
              ].map((item, index) => (
                <Reveal key={item.phase} delay={index * 0.05}>
                  <div className={`rounded-[24px] border p-6 sm:p-8 ${item.active ? "border-violet-400/15 bg-violet-400/[.045]" : "border-white/[.06] bg-[#111116]"}`}>
                    <div className="flex items-start gap-4">
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.active ? "bg-violet-400/12 text-violet-300" : "bg-white/[.035] text-white/25"}`}>
                        <item.icon className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-semibold uppercase tracking-[.14em] text-violet-300/70">{item.phase}</span>
                          {item.active ? <span className="size-1.5 rounded-full bg-emerald-400" /> : null}
                        </div>
                        <h3 className="mt-3 text-[16px] font-semibold text-white/70">{item.title}</h3>
                        <p className="mt-3 text-[10px] leading-5 text-white/25">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-20 sm:px-8 lg:px-12">
          <Reveal className="mx-auto flex max-w-[1180px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald-400/10 bg-emerald-400/10 text-emerald-300">
                <CircleCheck className="size-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-white/65">See what Echelon already makes possible.</p>
                <p className="mt-1 text-[9px] text-white/22">Explore services live across Perth or open the business product demo.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/services" className="inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[9px] font-semibold text-white">
                Browse services <ArrowRight className="size-3.5" />
              </Link>
              <Link href="/business-dashboard" className="inline-flex h-10 items-center rounded-xl border border-white/[.08] px-4 text-[9px] font-semibold text-white/48">
                View business demo
              </Link>
            </div>
          </Reveal>
        </section>

        <MarketingCta
          title="Help shape a simpler local economy."
          description="Join the early Echelon community as a customer, business or collaborator."
        />
      </main>
    </MarketingShell>
  );
}
