import type { Metadata } from "next";
import {
  ArrowRight,
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleCheck,
  Compass,
  Fingerprint,
  Handshake,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  UserRoundSearch,
  WandSparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "../../components/dashboard/brand-logo";
import { MarketingCta, MarketingPageHero } from "../../components/marketing/page-sections";
import { Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";

export const metadata: Metadata = {
  title: "Echelon Platform — One AI for every local need",
  description:
    "Explore Echelon's shared intelligence, trust and transaction layers across services, jobs, events, food, stays and networking.",
};

const markets = [
  {
    id: "services",
    href: "/services",
    icon: Wrench,
    name: "Services",
    status: "Live",
    thesis: "Find and book trusted local experts through natural language.",
    examples: ["Beauty & wellness", "Trades & home", "Creative services", "Fitness & health"],
    tone: "from-violet-500/20 to-violet-500/[.025] text-violet-200",
  },
  {
    id: "jobs",
    href: "/explore/jobs",
    icon: BriefcaseBusiness,
    name: "Jobs",
    status: "Planned",
    thesis: "Match work with capability, availability and intent—not only keywords.",
    examples: ["Permanent roles", "Part-time work", "Casual shifts", "Local hiring"],
    tone: "from-sky-500/20 to-sky-500/[.025] text-sky-200",
  },
  {
    id: "freelance",
    href: "/explore/freelancing",
    icon: Zap,
    name: "Freelancing",
    status: "Planned",
    thesis: "Connect scoped projects with the right independent expertise.",
    examples: ["Design", "Development", "Marketing", "Operations"],
    tone: "from-amber-400/18 to-amber-400/[.025] text-amber-100",
  },
  {
    id: "tasks",
    href: "/explore/tasks",
    icon: Handshake,
    name: "One-Off Jobs",
    status: "Planned",
    thesis: "Post a task and match with trusted locals who can start now.",
    examples: ["Cleaning", "Moving", "Handy work", "Assembly"],
    tone: "from-emerald-500/18 to-emerald-500/[.025] text-emerald-200",
  },
  {
    id: "events",
    href: "/explore/events",
    icon: CalendarDays,
    name: "Events",
    status: "Planned",
    thesis: "Discover relevant experiences based on context, people and timing.",
    examples: ["Professional", "Community", "Music & culture", "Workshops"],
    tone: "from-rose-500/18 to-rose-500/[.025] text-rose-200",
  },
  {
    id: "stays",
    href: "/explore/stays",
    icon: BedDouble,
    name: "Accommodation",
    status: "Planned",
    thesis: "Find accommodation around the purpose and shape of your trip.",
    examples: ["Hotels", "Short stays", "Unique places", "Work travel"],
    tone: "from-cyan-500/18 to-cyan-500/[.025] text-cyan-200",
  },
  {
    id: "network",
    href: "/explore/networking",
    icon: Network,
    name: "Networking",
    status: "Planned",
    thesis: "Create high-relevance connections across local professional communities.",
    examples: ["Founders", "Mentors", "Investors", "Collaborators"],
    tone: "from-teal-500/18 to-teal-500/[.025] text-teal-200",
  },
  {
    id: "recruitment",
    href: "/explore/recruitment",
    icon: UserRoundSearch,
    name: "Recruitment",
    status: "Planned",
    thesis: "Join a private talent pool and let the right roles find you.",
    examples: ["Technology", "Healthcare", "Trades", "Hospitality"],
    tone: "from-indigo-500/20 to-indigo-500/[.025] text-indigo-200",
  },
  {
    id: "concierge",
    href: "/explore/concierge",
    icon: Compass,
    name: "Concierge",
    status: "Planned",
    thesis: "One AI that routes across every module to get things done.",
    examples: ["Plan", "Route", "Book", "Track"],
    tone: "from-fuchsia-500/18 to-fuchsia-500/[.025] text-fuchsia-200",
  },
];

export default function PlatformPage() {
  return (
    <MarketingShell>
      <main>
        <MarketingPageHero
          eyebrow="The Echelon platform"
          title={
            <>
              One intelligence layer.
              <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                Every local opportunity.
              </span>
            </>
          }
          description="Echelon connects discovery, trust, action and business operations across local commerce—without making people learn a different platform for every need."
        >
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/services" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white">
              Explore services live <ArrowRight className="size-3.5" />
            </Link>
            <Link href="/for-business" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[.09] bg-white/[.03] px-5 text-[10px] font-semibold text-white/52">
              See the business platform
            </Link>
          </div>
        </MarketingPageHero>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Shared architecture</p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[48px]">Three layers. One continuous experience.</h2>
            </Reveal>

            <div className="relative mt-14 grid gap-4 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent lg:block" />
              {[
                {
                  icon: WandSparkles,
                  number: "01",
                  title: "Intent",
                  description: "Natural language becomes structured context: category, location, timing, preferences and desired outcome.",
                  detail: "Understand before searching",
                },
                {
                  icon: ShieldCheck,
                  number: "02",
                  title: "Trust",
                  description: "Identity, reputation, transparency and fit combine into a decision people can understand and control.",
                  detail: "Rank what deserves attention",
                },
                {
                  icon: CircleCheck,
                  number: "03",
                  title: "Action",
                  description: "Book, reserve, apply, hire or connect without reconstructing the same context on another platform.",
                  detail: "Complete the next step",
                },
              ].map((layer, index) => (
                <Reveal key={layer.title} delay={index * 0.06}>
                  <div className="relative h-full rounded-[24px] border border-white/[.065] bg-[#121217] p-7 text-center">
                    <span className="relative z-10 mx-auto grid size-12 place-items-center rounded-2xl border border-violet-400/12 bg-violet-400/10 text-violet-300 shadow-[0_0_35px_rgba(124,108,248,.1)]">
                      <layer.icon className="size-5" />
                    </span>
                    <span className="mt-6 block font-mono text-[8px] font-semibold text-violet-300/60">{layer.number}</span>
                    <h3 className="mt-2 text-[17px] font-semibold text-white/72">{layer.title}</h3>
                    <p className="mx-auto mt-3 max-w-sm text-[10px] leading-5 text-white/25">{layer.description}</p>
                    <p className="mt-6 border-t border-white/[.055] pt-4 text-[8px] font-semibold uppercase tracking-[.1em] text-white/22">{layer.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Connected markets</p>
                <h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[50px]">Different needs. Shared intelligence.</h2>
              </div>
              <p className="max-w-2xl text-[12px] leading-6 text-white/28">
                Each market has its own workflows, but people should not need a new identity, trust model or interface every time their intent changes.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {markets.map((market, index) => (
                <Reveal key={market.id} delay={(index % 2) * 0.04}>
                  <Link id={market.id} href={market.href} className="group block h-full scroll-mt-28 rounded-[24px] border border-white/[.06] bg-[#111116] p-6 transition hover:-translate-y-1 hover:border-white/[.11] sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ring-1 ring-white/[.055] ${market.tone}`}>
                        <market.icon className="size-4" />
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[.08em] ${market.status === "Live" ? "border border-emerald-400/10 bg-emerald-400/10 text-emerald-300" : "border border-white/[.055] bg-white/[.025] text-white/18"}`}>
                        {market.status}
                      </span>
                    </div>
                    <h3 className="mt-6 flex items-center gap-1.5 text-[17px] font-semibold text-white/72">
                      {market.name}
                      <ArrowRight className="size-3.5 text-white/0 transition group-hover:text-violet-300" />
                    </h3>
                    <p className="mt-3 max-w-md text-[10px] leading-5 text-white/27">{market.thesis}</p>
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[.05] pt-5">
                      {market.examples.map((example) => (
                        <span key={example} className="rounded-full border border-white/[.05] bg-white/[.02] px-2.5 py-1.5 text-[7px] text-white/20">{example}</span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <Reveal>
              <div className="relative mx-auto max-w-xl rounded-[28px] border border-white/[.075] bg-[#111116] p-3 shadow-[0_30px_100px_rgba(0,0,0,.4)]">
                <div className="rounded-[22px] border border-white/[.055] bg-[#0c0c10] p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <BrandLogo compact />
                    <div>
                      <p className="text-[9px] font-semibold text-white/52">One Echelon identity</p>
                      <p className="mt-1 text-[7px] text-white/18">Context travels with you</p>
                    </div>
                    <Fingerprint className="ml-auto size-4 text-violet-300" />
                  </div>
                  <div className="relative mt-8 grid grid-cols-3 gap-3">
                    <div className="absolute left-[16%] right-[16%] top-5 h-px bg-gradient-to-r from-violet-400/0 via-violet-400/35 to-violet-400/0" />
                    {([
                      [Wrench, "Services", "2 bookings"],
                      [CalendarDays, "Events", "4 saved"],
                      [Network, "Network", "12 connections"],
                    ] as Array<[LucideIcon, string, string]>).map(([Icon, label, meta]) => (
                      <div key={label} className="relative rounded-xl border border-white/[.055] bg-white/[.025] p-3 text-center">
                        <span className="mx-auto grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                          <Icon className="size-3.5" />
                        </span>
                        <p className="mt-3 text-[8px] font-semibold text-white/42">{label}</p>
                        <p className="mt-1 text-[7px] text-white/16">{meta}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[.035] p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 size-4 text-emerald-300" />
                      <div>
                        <p className="text-[9px] font-semibold text-white/48">Context-aware recommendation</p>
                        <p className="mt-1 text-[8px] leading-4 text-white/20">Your saved Fremantle event and recent photography search suggest three relevant local creators.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Shared identity</p>
              <h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[50px]">Context should compound, not disappear.</h2>
              <p className="mt-6 max-w-lg text-[12px] leading-6 text-white/29">
                Preferences, trust signals, saved places and completed actions can make each new request faster and more relevant—while remaining visible and controllable.
              </p>
              <div className="mt-8 space-y-4">
                {([
                  [Fingerprint, "One profile", "A consistent identity across connected local markets."],
                  [ShieldCheck, "Clear control", "Understand and manage what the platform knows."],
                  [Sparkles, "Better over time", "Useful context improves relevance without adding friction."],
                ] as Array<[LucideIcon, string, string]>).map(([Icon, title, description]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/[.055] bg-white/[.03] text-violet-300"><Icon className="size-3.5" /></span>
                    <div><p className="text-[10px] font-semibold text-white/52">{title}</p><p className="mt-1 text-[9px] leading-4 text-white/22">{description}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">A two-sided system</p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[48px]">Demand and operations, finally connected.</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-[26px] border border-white/[.065] bg-[#121217] p-7 sm:p-9">
                  <span className="grid size-11 place-items-center rounded-xl bg-sky-400/10 text-sky-200"><Search className="size-4.5" /></span>
                  <p className="mt-7 text-[8px] font-semibold uppercase tracking-[.14em] text-sky-200/65">For people</p>
                  <h3 className="mt-3 text-[24px] font-semibold tracking-[-.035em] text-white/75">Less searching. Better decisions.</h3>
                  <div className="mt-6 space-y-3">
                    {["Ask naturally across categories", "Compare transparent, relevant options", "Complete actions without leaving context", "Carry one trusted identity forward"].map((feature) => (
                      <p key={feature} className="flex items-center gap-2 text-[9px] text-white/28"><Check className="size-3.5 text-emerald-300" />{feature}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="h-full rounded-[26px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[.065] to-[#121217] p-7 sm:p-9">
                  <span className="grid size-11 place-items-center rounded-xl bg-violet-400/10 text-violet-200"><Store className="size-4.5" /></span>
                  <p className="mt-7 text-[8px] font-semibold uppercase tracking-[.14em] text-violet-200/65">For businesses</p>
                  <h3 className="mt-3 text-[24px] font-semibold tracking-[-.035em] text-white/75">Higher-intent demand. One operating layer.</h3>
                  <div className="mt-6 space-y-3">
                    {["Convert intent into bookings and revenue", "Manage customers, messages and reputation", "Understand performance in real time", "Automate follow-up with useful intelligence"].map((feature) => (
                      <p key={feature} className="flex items-center gap-2 text-[9px] text-white/28"><Check className="size-3.5 text-emerald-300" />{feature}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <MarketingCta
          title="Start with one need. Discover what connects."
          description="Explore services today or join the early community shaping Echelon's connected platform."
          primaryLabel="Explore services"
          primaryHref="/services"
        />
      </main>
    </MarketingShell>
  );
}
