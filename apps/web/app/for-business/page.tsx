import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CreditCard,
  MessageSquare,
  Plug,
  Search,
  Settings2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  WandSparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "../../components/dashboard/brand-logo";
import { MarketingCta, MarketingPageHero } from "../../components/marketing/page-sections";
import { GlowOrb, Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";

export const metadata: Metadata = {
  title: "Echelon for Business — Demand, operations and growth in one place",
  description:
    "Run bookings, customers, staff, messages, reviews, analytics and integrations from one intelligent business platform.",
};

const capabilities = [
  {
    icon: CalendarDays,
    title: "Operate",
    description: "Calendar, bookings, services, staff and capacity in one reliable operating view.",
    features: ["Smart calendar", "Booking workflows", "Service catalogue", "Team capacity"],
  },
  {
    icon: Users,
    title: "Build relationships",
    description: "Keep customer context, messages, reviews and follow-up connected to the work.",
    features: ["Customer CRM", "Unified inbox", "Review management", "Campaigns"],
  },
  {
    icon: BarChart3,
    title: "Understand",
    description: "See revenue, demand, conversion, retention and performance without spreadsheet archaeology.",
    features: ["Commercial analytics", "Demand signals", "Service performance", "Forecasting"],
  },
  {
    icon: WandSparkles,
    title: "Grow intelligently",
    description: "Use AI signals and connected systems to identify and act on the next best opportunity.",
    features: ["AI insights", "Automation", "Integrations", "Growth recommendations"],
  },
];

export default function ForBusinessPage() {
  return (
    <MarketingShell>
      <main>
        <MarketingPageHero
          eyebrow="Echelon for Business"
          title={
            <>
              Demand meets operations.
              <span className="block bg-gradient-to-r from-white via-violet-200 to-indigo-300 bg-clip-text text-transparent">
                Your business moves as one.
              </span>
            </>
          }
          description="Replace disconnected booking, customer, review and reporting tools with one intelligent command centre built around the way your business actually works."
        >
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/business-dashboard" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)]">
              View live dashboard <ArrowRight className="size-3.5" />
            </Link>
            <Link href="/auth/register?mode=business" className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[.09] bg-white/[.03] px-5 text-[10px] font-semibold text-white/52">
              Join as a business
            </Link>
          </div>
        </MarketingPageHero>

        <section className="relative -mt-4 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32">
          <GlowOrb className="left-1/2 top-1/2 -z-10 size-[480px] -translate-x-1/2 -translate-y-1/2 bg-violet-600/18" />
          <Reveal className="mx-auto max-w-[1280px]">
            <div className="rounded-[30px] border border-white/[.075] bg-[#111116] p-3 shadow-[0_42px_140px_rgba(0,0,0,.48),inset_0_1px_0_rgba(255,255,255,.035)]">
              <div className="overflow-hidden rounded-[24px] border border-white/[.055] bg-[#0c0c10]">
                <div className="flex items-center gap-3 border-b border-white/[.055] px-5 py-4">
                  <BrandLogo compact />
                  <div>
                    <p className="text-[9px] font-semibold text-white/52">WS Labs</p>
                    <p className="mt-0.5 text-[7px] text-white/18">Echelon Business</p>
                  </div>
                  <div className="ml-auto hidden items-center gap-2 sm:flex">
                    <div className="flex h-8 w-52 items-center gap-2 rounded-lg border border-white/[.055] bg-white/[.025] px-3 text-[7px] text-white/18"><Search className="size-3" /> Search workspace…</div>
                    <span className="grid size-8 place-items-center rounded-lg bg-violet-500 text-white"><Sparkles className="size-3.5" /></span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[180px_1fr]">
                  <aside className="hidden border-r border-white/[.055] p-3 lg:block">
                    <div className="space-y-1">
                      {([
                        [BarChart3, "Overview"],
                        [CalendarDays, "Calendar"],
                        [CreditCard, "Bookings"],
                        [Wrench, "Services"],
                        [Users, "Customers"],
                        [MessageSquare, "Messages"],
                        [Star, "Reviews"],
                        [Plug, "Integrations"],
                        [Settings2, "Settings"],
                      ] as Array<[LucideIcon, string]>).map(([Icon, label], index) => (
                        <div key={label} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[8px] ${index === 0 ? "bg-violet-400/10 text-violet-200" : "text-white/22"}`}>
                          <Icon className="size-3.5" /> {label}
                        </div>
                      ))}
                    </div>
                  </aside>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div><p className="text-[7px] uppercase tracking-[.14em] text-violet-300/65">Command centre</p><p className="mt-2 text-[18px] font-semibold tracking-[-.035em] text-white/75">Good morning, Rav.</p></div>
                      <span className="hidden h-9 items-center rounded-xl bg-violet-500 px-3 text-[8px] font-semibold text-white sm:inline-flex">+ New booking</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2 xl:grid-cols-4">
                      {[
                        ["Today’s revenue", "$12,480", "+18.6%"],
                        ["Bookings", "14", "11 confirmed"],
                        ["Customers", "1,429", "+96 this month"],
                        ["Review score", "4.96", "386 reviews"],
                      ].map(([label, value, note]) => (
                        <div key={label} className="rounded-xl border border-white/[.05] bg-white/[.02] p-3 sm:p-4">
                          <p className="text-[7px] uppercase tracking-[.1em] text-white/16">{label}</p>
                          <p className="mt-2 text-[15px] font-semibold text-white/68 sm:text-[18px]">{value}</p>
                          <p className="mt-1 text-[7px] text-emerald-300/75">{note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 grid gap-2 xl:grid-cols-[1.45fr_1fr]">
                      <div className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                        <div className="flex items-center justify-between"><p className="text-[8px] font-semibold text-white/35">Revenue performance</p><span className="text-[7px] text-white/15">12 months</span></div>
                        <div className="mt-5 flex h-32 items-end gap-1.5">
                          {[28, 39, 36, 51, 46, 62, 67, 73, 69, 84, 89, 100].map((value, index) => (
                            <div key={index} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-violet-600/28 to-violet-300/75" style={{ height: `${value}%` }} />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-violet-400/10 bg-violet-400/[.045] p-4">
                        <div className="flex items-center justify-between"><Sparkles className="size-4 text-violet-300" /><span className="rounded-full bg-violet-400/10 px-2 py-1 text-[6px] font-semibold text-violet-200">AI insight</span></div>
                        <p className="mt-6 text-[10px] font-semibold text-white/48">Your next growth opportunity</p>
                        <p className="mt-2 text-[8px] leading-4 text-white/20">Recurring AI advisory could add an estimated $184k in annual revenue.</p>
                        <span className="mt-5 inline-flex text-[7px] font-semibold text-violet-300">Explore recommendation →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1280px]">
            <Reveal className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">One business system</p>
              <h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[48px]">Everything connected to the customer.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[11px] leading-6 text-white/25">The operational details matter. The relationship is what makes them valuable.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {capabilities.map((capability, index) => (
                <Reveal key={capability.title} delay={index * 0.04}>
                  <div className="h-full rounded-[24px] border border-white/[.06] bg-[#121217] p-7 transition hover:-translate-y-1 hover:border-white/[.11]">
                    <span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><capability.icon className="size-4" /></span>
                    <h3 className="mt-6 text-[17px] font-semibold text-white/70">{capability.title}</h3>
                    <p className="mt-3 max-w-lg text-[10px] leading-5 text-white/25">{capability.description}</p>
                    <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/[.05] pt-5">
                      {capability.features.map((feature) => <p key={feature} className="flex items-center gap-2 text-[8px] text-white/24"><Check className="size-3 text-emerald-300" />{feature}</p>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">AI that earns its place</p>
              <h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[50px]">Useful signal, not another noisy assistant.</h2>
              <p className="mt-6 max-w-lg text-[12px] leading-6 text-white/28">Echelon’s intelligence is grounded in the operating reality of your business: availability, demand, customer history, service performance and commercial value.</p>
              <div className="mt-8 space-y-4">
                {([
                  [TrendingUp, "Spot growth patterns", "Identify service, customer and channel opportunities early."],
                  [MessageSquare, "Respond with context", "Draft thoughtful replies and messages from the relationship history."],
                  [CalendarDays, "Protect capacity", "See demand pressure and team availability before it becomes a problem."],
                ] as Array<[LucideIcon, string, string]>).map(([Icon, title, description]) => (
                  <div key={title} className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-xl border border-white/[.055] bg-white/[.03] text-violet-300"><Icon className="size-3.5" /></span><div><p className="text-[10px] font-semibold text-white/50">{title}</p><p className="mt-1 text-[9px] leading-4 text-white/21">{description}</p></div></div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-[26px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[.07] to-[#111116] p-3 shadow-[0_30px_100px_rgba(0,0,0,.36)]">
                <div className="rounded-[20px] border border-white/[.055] bg-[#0c0c10] p-5 sm:p-7">
                  <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-violet-500 text-white"><Sparkles className="size-4" /></span><div><p className="text-[10px] font-semibold text-white/55">Echelon Intelligence</p><p className="mt-1 text-[8px] text-white/18">3 high-confidence recommendations</p></div></div>
                  <div className="mt-6 space-y-2">
                    {[
                      ["Package recurring AI advisory", "+$184k estimated ARR", "92% confidence"],
                      ["Open Wednesday afternoon capacity", "9 bookings at risk", "88% confidence"],
                      ["Re-engage 12 high-value clients", "$86k expansion signal", "84% confidence"],
                    ].map(([title, impact, confidence], index) => (
                      <div key={title} className="rounded-xl border border-white/[.05] bg-white/[.02] p-4">
                        <div className="flex items-start gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-violet-400/10 text-[8px] font-semibold text-violet-200">{index + 1}</span><div className="min-w-0 flex-1"><p className="text-[9px] font-semibold text-white/45">{title}</p><p className="mt-1 text-[8px] text-emerald-300">{impact}</p></div><span className="text-[7px] text-white/16">{confidence}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-white/[.055] bg-[#0b0b0f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="text-center"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Connected by design</p><h2 className="mt-4 text-[34px] font-semibold tracking-[-.045em] text-white/90 sm:text-[46px]">Keep the tools that matter. Lose the fragmentation.</h2></Reveal>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {([
                ["Stripe", CreditCard],
                ["Google Calendar", CalendarDays],
                ["GoHighLevel", Sparkles],
                ["Google Business", Star],
                ["Mailchimp", MessageSquare],
                ["Zapier", Plug],
              ] as Array<[string, LucideIcon]>).map(([name, Icon], index) => (
                <Reveal key={name} delay={index * 0.035}>
                  <div className="grid min-h-28 place-items-center rounded-[18px] border border-white/[.055] bg-[#121217] p-4 text-center"><Icon className="size-5 text-violet-300/70" /><p className="mt-3 text-[8px] font-semibold text-white/30">{name}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Built to feel calm</p><h2 className="mt-4 text-[36px] font-semibold leading-[1.05] tracking-[-.05em] text-white/90 sm:text-[48px]">Enterprise capability without enterprise friction.</h2><p className="mt-5 text-[11px] leading-6 text-white/26">Fast to understand, responsive on every screen and designed around real decisions—not software administration.</p></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Responsive by default", "Desktop, laptop, tablet and mobile stay intentional."],
                  ["Accessible interactions", "Keyboard support, clear focus and readable contrast."],
                  ["Reusable systems", "Consistent patterns reduce complexity as the product grows."],
                  ["Frontend-ready", "Complete experience ready for backend and integration wiring."],
                ].map(([title, description]) => <div key={title} className="rounded-[20px] border border-white/[.055] bg-[#121217] p-5"><p className="text-[10px] font-semibold text-white/48">{title}</p><p className="mt-2 text-[9px] leading-4 text-white/20">{description}</p></div>)}
              </div>
            </Reveal>
          </div>
        </section>

        <MarketingCta
          title="Run the business you are becoming."
          description="Explore the complete Echelon Business demo or join the early access list."
          primaryLabel="View live dashboard"
          primaryHref="/business-dashboard"
          secondaryLabel="Contact sales"
          secondaryHref="/contact"
        />
      </main>
    </MarketingShell>
  );
}
