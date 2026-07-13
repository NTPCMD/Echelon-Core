import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CircleCheck,
  Compass,
  Handshake,
  MapPin,
  MessageSquareText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  WandSparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { AiSearch } from "../components/ai-search";
import { BrandLogo } from "../components/dashboard/brand-logo";
import { GlowOrb, Reveal } from "../components/marketing/reveal";
import { MarketingShell } from "../components/marketing/site-shell";
import { businesses } from "../lib/seed";

const modules = [
  {
    icon: Wrench,
    label: "Services",
    description: "Book trusted local experts without the usual search spiral.",
    href: "/services",
    live: true,
    tone: "text-violet-200 bg-violet-400/10 border-violet-400/10",
  },
  {
    icon: BriefcaseBusiness,
    label: "Jobs",
    description: "Discover work aligned to your skills, availability and ambition.",
    href: "/explore/jobs",
    live: false,
    tone: "text-sky-200 bg-sky-400/10 border-sky-400/10",
  },
  {
    icon: Zap,
    label: "Freelancing",
    description: "Match projects with independent talent, intelligently.",
    href: "/explore/freelancing",
    live: false,
    tone: "text-amber-100 bg-amber-300/10 border-amber-300/10",
  },
  {
    icon: Handshake,
    label: "One-Off Jobs",
    description: "Post a task and match with trusted locals who can start now.",
    href: "/explore/tasks",
    live: false,
    tone: "text-emerald-200 bg-emerald-400/10 border-emerald-400/10",
  },
  {
    icon: CalendarDays,
    label: "Events",
    description: "Find the rooms, people and moments worth showing up for.",
    href: "/explore/events",
    live: false,
    tone: "text-rose-200 bg-rose-400/10 border-rose-400/10",
  },
  {
    icon: BedDouble,
    label: "Accommodation",
    description: "Places to stay, shaped around why you are travelling.",
    href: "/explore/stays",
    live: false,
    tone: "text-cyan-200 bg-cyan-400/10 border-cyan-400/10",
  },
  {
    icon: Network,
    label: "Networking",
    description: "Meet relevant founders, collaborators, mentors and investors.",
    href: "/explore/networking",
    live: false,
    tone: "text-teal-200 bg-teal-400/10 border-teal-400/10",
  },
  {
    icon: Compass,
    label: "Concierge",
    description: "One intelligent layer for everything happening around you.",
    href: "/explore/concierge",
    live: false,
    tone: "text-fuchsia-200 bg-fuchsia-400/10 border-fuchsia-400/10",
  },
];

const gradients = [
  "from-violet-500/45 via-indigo-500/20 to-sky-400/25",
  "from-rose-500/35 via-orange-400/15 to-amber-300/25",
  "from-emerald-500/30 via-cyan-500/15 to-sky-400/25",
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free consult";
  return `From $${(cents / 100).toFixed(0)}`;
}

export default function Home() {
  const featured = businesses.slice(0, 3);

  return (
    <MarketingShell>
      <main>
        <section className="relative isolate overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:px-12 lg:pt-32">
          <div className="echelon-grid absolute inset-0 -z-20 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
          <GlowOrb className="-left-28 top-20 -z-10 size-[420px] bg-violet-600/30" />
          <GlowOrb className="-right-20 top-0 -z-10 size-[380px] bg-indigo-500/20" />

          <div className="mx-auto max-w-[1180px] text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[.065] px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[.14em] text-violet-200">
                <Sparkles className="size-3.5" /> The intelligence layer for local commerce
              </div>
              <h1 className="mx-auto mt-8 max-w-5xl text-[48px] font-semibold leading-[.98] tracking-[-.065em] text-white sm:text-[72px] lg:text-[92px]">
                Every local need.
                <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                  One intelligent place.
                </span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-[14px] leading-7 text-white/38 sm:text-[16px]">
                Ask naturally. Echelon understands what you need, discovers the right options and helps you
                complete the next step—from a single conversation.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mx-auto mt-10 max-w-4xl">
              <AiSearch />
            </Reveal>

            <Reveal delay={0.2} className="mt-12">
              <div className="mx-auto grid max-w-4xl gap-2 rounded-[24px] border border-white/[.07] bg-[#111116]/80 p-2 shadow-[0_32px_100px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.03)] backdrop-blur-xl sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="flex items-center gap-3 rounded-[18px] border border-white/[.045] bg-white/[.02] p-4 text-left">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/[.04] text-white/30">
                    <MessageSquareText className="size-4" />
                  </span>
                  <div>
                    <p className="text-[8px] uppercase tracking-[.12em] text-white/18">Your intent</p>
                    <p className="mt-1 text-[10px] font-medium text-white/55">
                      “A highly rated remedial massage tomorrow afternoon”
                    </p>
                  </div>
                </div>

                <div className="relative mx-auto grid size-14 place-items-center sm:mx-3">
                  <span className="absolute inset-0 animate-pulse rounded-full bg-violet-500/20 blur-xl" />
                  <BrandLogo compact className="relative" />
                </div>

                <div className="flex items-center gap-3 rounded-[18px] border border-emerald-400/10 bg-emerald-400/[.035] p-4 text-left">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CircleCheck className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold text-white/62">Zenith Wellness</p>
                      <span className="text-[8px] text-emerald-300">3:00 PM</span>
                    </div>
                    <p className="mt-1 text-[8px] text-white/22">4.8 rating · Subiaco · $95</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/[.055] pt-8 sm:grid-cols-4">
              {[
                ["One search", "Across every category"],
                ["Live in Perth", "Built for local intent"],
                ["AI-native", "Not AI added later"],
                ["Business ready", "Demand meets operations"],
              ].map(([value, label]) => (
                <Reveal key={value}>
                  <p className="text-[11px] font-semibold text-white/62">{value}</p>
                  <p className="mt-1 text-[8px] text-white/20">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1344px]">
            <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">
                  One platform
                </p>
                <h2 className="mt-4 max-w-2xl text-[34px] font-semibold leading-[1.06] tracking-[-.045em] text-white/92 sm:text-[48px]">
                  Stop switching platforms.
                  <span className="block text-white/32">Start with what you need.</span>
                </h2>
              </div>
              <Link
                href="/platform"
                className="inline-flex items-center gap-2 text-[10px] font-semibold text-violet-300 transition hover:text-violet-200"
              >
                Explore the platform <ArrowUpRight className="size-3.5" />
              </Link>
            </Reveal>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module, index) => (
                <Reveal key={module.label} delay={index * 0.035}>
                  <Link
                    href={module.href}
                    className="group flex min-h-52 flex-col rounded-[22px] border border-white/[.06] bg-[#121217]/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.025)] transition duration-300 hover:-translate-y-1 hover:border-white/[.12] hover:bg-[#15151b] hover:shadow-[0_26px_70px_rgba(0,0,0,.28)]"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`grid size-10 place-items-center rounded-xl border ${module.tone}`}>
                        <module.icon className="size-4" />
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[.08em] ${
                          module.live
                            ? "border border-emerald-400/10 bg-emerald-400/10 text-emerald-300"
                            : "border border-white/[.05] bg-white/[.03] text-white/20"
                        }`}
                      >
                        {module.live ? "Live" : "Soon"}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[14px] font-semibold text-white/72">{module.label}</h3>
                    <p className="mt-2 flex-1 text-[10px] leading-5 text-white/25">{module.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[8px] font-semibold text-white/24 transition group-hover:text-violet-300">
                      Discover <ArrowRight className="size-3" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <GlowOrb className="-right-32 top-20 size-96 bg-violet-600/18" />
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <Reveal>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">
                Echelon Intelligence
              </p>
              <h2 className="mt-4 text-[36px] font-semibold leading-[1.04] tracking-[-.05em] text-white/92 sm:text-[50px]">
                Search is not enough.
                <span className="block text-white/30">Echelon understands intent.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[12px] leading-6 text-white/30">
                Traditional marketplaces make you translate your need into filters. Echelon works the other way
                around: describe the outcome, and the platform handles category, context, timing and fit.
              </p>
              <div className="mt-8 space-y-4">
                {([
                  [WandSparkles, "Natural language discovery", "Ask the way you would ask a trusted local."],
                  [TrendingUp, "Ranked for real fit", "Availability, reputation, location and intent work together."],
                  [ShieldCheck, "Built around trust", "Clear profiles, verified signals and transparent next steps."],
                ] as Array<[LucideIcon, string, string]>).map(([Icon, title, description]) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/[.055] bg-white/[.03] text-violet-300">
                      <Icon className="size-3.5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold text-white/55">{title}</p>
                      <p className="mt-1 text-[9px] leading-4 text-white/22">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative rounded-[28px] border border-white/[.075] bg-[#111116] p-3 shadow-[0_34px_120px_rgba(0,0,0,.42),inset_0_1px_0_rgba(255,255,255,.035)]">
                <div className="rounded-[22px] border border-white/[.055] bg-[#0c0c10] p-5 sm:p-7">
                  <div className="flex items-center gap-3 border-b border-white/[.055] pb-5">
                    <BrandLogo compact />
                    <div>
                      <p className="text-[9px] font-semibold text-white/55">Echelon is thinking</p>
                      <p className="mt-1 text-[7px] text-white/18">Understanding context and matching live supply</p>
                    </div>
                    <span className="ml-auto flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <i key={dot} className="size-1 rounded-full bg-violet-300/70" />
                      ))}
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-400/[.045] p-4">
                    <div className="flex items-center gap-2 text-[8px] text-violet-200">
                      <Search className="size-3.5" /> Understood request
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-white/52">
                      “I need a photographer for a relaxed Fremantle wedding next spring.”
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Photography", "Wedding", "Fremantle", "Spring 2027", "Relaxed style"].map((tag) => (
                        <span key={tag} className="rounded-full border border-white/[.05] bg-white/[.03] px-2 py-1 text-[7px] text-white/25">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {[
                      ["North Star Weddings", "4.95 · Fremantle", "98% fit", "from-violet-500/25 to-indigo-500/5"],
                      ["Everlight Stories", "4.91 · East Fremantle", "94% fit", "from-rose-500/20 to-orange-500/5"],
                    ].map(([name, meta, fit, tone]) => (
                      <div key={name} className="rounded-2xl border border-white/[.055] bg-white/[.02] p-4">
                        <div className={`h-20 rounded-xl bg-gradient-to-br ${tone}`} />
                        <div className="mt-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-semibold text-white/52">{name}</p>
                            <p className="mt-1 text-[7px] text-white/18">{meta}</p>
                          </div>
                          <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[7px] font-semibold text-emerald-300">
                            {fit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Now live</p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[48px]">
                Exceptional services, closer than you think.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[11px] leading-6 text-white/26">
                Discover verified local businesses with transparent services, live times and clear pricing.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {featured.map((business, index) => (
                <Reveal key={business.id} delay={index * 0.06}>
                  <Link
                    href={`/businesses/${business.slug}`}
                    className="group block overflow-hidden rounded-[24px] border border-white/[.065] bg-[#121217] transition duration-300 hover:-translate-y-1 hover:border-white/[.12] hover:shadow-[0_28px_80px_rgba(0,0,0,.34)]"
                  >
                    <div className={`relative h-44 bg-gradient-to-br ${gradients[index]}`}>
                      <div className="echelon-grid absolute inset-0 opacity-25" />
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[8px] font-semibold text-white/70 backdrop-blur-xl">
                        {business.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[14px] font-semibold text-white/72">{business.name}</h3>
                          <p className="mt-1 flex items-center gap-1 text-[8px] text-white/22">
                            <MapPin className="size-3" /> {business.suburb}, {business.city}
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[9px] font-semibold text-amber-100">
                          <Star className="size-3 fill-current" /> {business.rating}
                        </span>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-white/[.055] pt-4">
                        <span className="text-[9px] text-white/30">
                          {formatPrice(business.services[0]?.priceCents ?? 0)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-violet-300 transition group-hover:text-violet-200">
                          View availability <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 text-center">
              <Link
                href="/services"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.025] px-4 text-[10px] font-semibold text-white/55 transition hover:bg-white/[.06] hover:text-white/80"
              >
                Browse all services <ArrowUpRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <GlowOrb className="-left-32 bottom-0 size-96 bg-indigo-600/16" />
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1fr_1.08fr] lg:items-center">
            <Reveal>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">
                For business
              </p>
              <h2 className="mt-4 text-[36px] font-semibold leading-[1.04] tracking-[-.05em] text-white/92 sm:text-[50px]">
                Turn local demand into
                <span className="block text-white/30">lasting customer value.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[12px] leading-6 text-white/30">
                Echelon gives businesses one elegant operating layer for bookings, customers, reviews, messages,
                analytics and automation—connected to the demand engine customers already use.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {["Bookings", "Customer CRM", "Reviews", "Messaging", "Analytics", "AI insights"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-[9px] text-white/38">
                    <Check className="size-3.5 text-emerald-300" /> {feature}
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/for-business"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] px-5 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] transition hover:-translate-y-px"
                >
                  Explore Echelon Business <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/business-dashboard"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[.08] bg-white/[.025] px-5 text-[10px] font-semibold text-white/55 transition hover:bg-white/[.06]"
                >
                  View live demo
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[28px] border border-white/[.075] bg-[#111116] p-3 shadow-[0_34px_120px_rgba(0,0,0,.42)]">
                <div className="overflow-hidden rounded-[22px] border border-white/[.055] bg-[#0c0c10]">
                  <div className="flex items-center gap-3 border-b border-white/[.055] p-4">
                    <BrandLogo compact />
                    <div>
                      <p className="text-[9px] font-semibold text-white/55">WS Labs</p>
                      <p className="mt-0.5 text-[7px] text-white/18">Business command centre</p>
                    </div>
                    <span className="ml-auto rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2.5 py-1 text-[7px] font-semibold text-emerald-300">
                      Live
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
                    {[
                      ["Revenue", "$48,620", "+22.4%"],
                      ["Bookings", "284", "+16.5%"],
                      ["Customers", "1,429", "+96"],
                      ["Rating", "4.96", "Excellent"],
                    ].map(([label, value, change]) => (
                      <div key={label} className="rounded-xl border border-white/[.05] bg-white/[.02] p-3">
                        <p className="text-[7px] uppercase tracking-[.1em] text-white/16">{label}</p>
                        <p className="mt-2 text-[13px] font-semibold text-white/68">{value}</p>
                        <p className="mt-1 text-[7px] text-emerald-300">{change}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2 px-4 pb-4 sm:grid-cols-[1.5fr_1fr]">
                    <div className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[8px] font-semibold text-white/38">Revenue momentum</p>
                        <span className="text-[7px] text-white/16">12 months</span>
                      </div>
                      <div className="mt-5 flex h-28 items-end gap-1.5">
                        {[32, 46, 42, 55, 50, 68, 64, 76, 72, 86, 91, 100].map((value, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-[3px] bg-gradient-to-t from-violet-600/30 to-violet-300/75"
                            style={{ height: `${value}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
                      <Sparkles className="size-4 text-violet-300" />
                      <p className="mt-5 text-[9px] font-semibold text-white/52">AI growth signal</p>
                      <p className="mt-2 text-[8px] leading-4 text-white/22">
                        Recurring advisory could add an estimated $184k in annual revenue.
                      </p>
                      <span className="mt-4 inline-flex text-[7px] font-semibold text-violet-300">Explore insight →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">
                Designed for completion
              </p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[46px]">
                From thought to done, without the detour.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-white/[.06] bg-white/[.055] md:grid-cols-3">
              {[
                ["01", "Describe the outcome", "Use natural language. No category maze, no rigid form, no guessing which platform to open."],
                ["02", "Echelon finds the fit", "Intent, context, availability, reputation and proximity become one intelligent decision."],
                ["03", "Complete the next step", "Book, apply, reserve, hire or connect without rebuilding your context somewhere else."],
              ].map(([step, title, description]) => (
                <Reveal key={step} className="h-full">
                  <div className="h-full bg-[#111116] p-7 sm:p-9">
                    <span className="font-mono text-[9px] font-semibold text-violet-300">{step}</span>
                    <h3 className="mt-6 text-[15px] font-semibold text-white/70">{title}</h3>
                    <p className="mt-3 text-[10px] leading-5 text-white/25">{description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
          <GlowOrb className="left-1/2 top-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 bg-violet-600/24" />
          <Reveal className="mx-auto max-w-4xl text-center">
            <BrandLogo className="mx-auto size-14" />
            <h2 className="mt-7 text-[42px] font-semibold leading-[1.02] tracking-[-.055em] text-white/92 sm:text-[62px]">
              The next opportunity starts with one question.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[12px] leading-6 text-white/30">
              Join the early Echelon community and help shape a simpler, more intelligent local economy.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#8777fa] to-[#6554df] px-6 text-[11px] font-semibold text-white shadow-[0_16px_48px_rgba(108,92,231,.28)] transition hover:-translate-y-px"
              >
                Join Echelon <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/[.09] bg-white/[.03] px-6 text-[11px] font-semibold text-white/58 transition hover:bg-white/[.065] hover:text-white/80"
              >
                Talk to the team
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
    </MarketingShell>
  );
}
