import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock3,
  Gift,
  Heart,
  MapPin,
  MessageSquareText,
  Search,
  Sparkles,
  Star,
  Trophy,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { SavedShortlist } from "../../components/consumer/saved-shortlist";
import { UpcomingBookings } from "../../components/consumer/upcoming-bookings";
import { Reveal } from "../../components/marketing/reveal";
import { MarketingShell } from "../../components/marketing/site-shell";
import { accountStats, recentActivity, rewards } from "../../lib/account";
import { applicationStats } from "../../lib/applications";
import { requireConsumerContext } from "../../lib/auth-context";
import { consumerModules } from "../../lib/modules";
import { profileCompleteness } from "../../lib/profile";
import { requestStats } from "../../lib/requests";
import { businesses } from "../../lib/seed";

const gradients = [
  "from-violet-500/45 via-indigo-500/20 to-sky-400/25",
  "from-rose-500/38 via-orange-400/18 to-amber-300/24",
  "from-emerald-500/38 via-teal-500/18 to-cyan-400/24",
];

const activityIcon = {
  booking: CalendarCheck,
  review: Star,
  saved: Heart,
  reward: Trophy,
} as const;

export default async function DashboardPage() {
  await requireConsumerContext("/dashboard");

  const suggested = businesses.slice(2, 5);
  const rewardPct = Math.min(100, Math.round((rewards.points / rewards.tierCeiling) * 100));

  const stats = [
    { icon: CalendarDays, label: "Upcoming bookings", value: String(accountStats.upcoming), note: "Next: tomorrow 2:00 PM", tone: "text-violet-200", href: "/bookings" },
    { icon: Heart, label: "Saved businesses", value: String(accountStats.saved), note: "Your shortlist", tone: "text-rose-200", href: "/saved" },
    { icon: Trophy, label: "Rewards", value: `${accountStats.rewardPoints} pts`, note: `${rewards.tier} tier`, tone: "text-amber-100", href: "/rewards" },
    { icon: Star, label: "Reviews shared", value: String(accountStats.reviews), note: "Thanks for helping locals", tone: "text-sky-200", href: undefined },
  ];

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1280px]">
          {/* Header */}
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-violet-300/75">Your Echelon</p>
              <h1 className="mt-3 text-[38px] font-semibold tracking-[-.052em] text-white/90 sm:text-[52px]">Good morning.</h1>
              <p className="mt-3 text-[11px] text-white/26">Bookings, favourites and local opportunity in one calm place.</p>
            </div>
            <Link href="/explore" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[9px] font-semibold text-white transition hover:-translate-y-px">
              Explore Echelon <Search className="size-3.5" />
            </Link>
          </Reveal>

          {/* Stats */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((metric, index) => {
              const inner = (
                <div className="h-full rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:border-white/[.11]">
                  <div className="flex items-center justify-between">
                    <metric.icon className="size-4 text-white/22" />
                    {metric.href ? <ArrowRight className="size-3 text-white/18" /> : <span className="size-1.5 rounded-full bg-emerald-400" />}
                  </div>
                  <p className={`mt-6 text-[24px] font-semibold tracking-[-.04em] ${metric.tone}`}>{metric.value}</p>
                  <p className="mt-2 text-[9px] font-semibold text-white/38">{metric.label}</p>
                  <p className="mt-1 text-[8px] text-white/17">{metric.note}</p>
                </div>
              );
              return (
                <Reveal key={metric.label} delay={index * 0.04}>
                  {metric.href ? <Link href={metric.href}>{inner}</Link> : inner}
                </Reveal>
              );
            })}
          </div>

          {/* Upcoming + right rail */}
          <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
            <UpcomingBookings />

            <div className="grid gap-5">
              <Reveal delay={0.05}>
                <section className="rounded-[24px] border border-violet-400/10 bg-gradient-to-br from-violet-500/[.07] to-[#121217] p-6">
                  <Sparkles className="size-5 text-violet-300" />
                  <h2 className="mt-6 text-[17px] font-semibold tracking-[-.03em] text-white/68">Ask Echelon what's next.</h2>
                  <p className="mt-2.5 text-[9px] leading-5 text-white/22">Describe the service, outcome or local experience you want — the Concierge will connect the context.</p>
                  <Link href="/" className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[8px] font-semibold text-white">
                    <MessageSquareText className="size-3.5" /> Open Echelon AI
                  </Link>
                </section>
              </Reveal>

              <Reveal delay={0.1}>
                <section className="rounded-[24px] border border-white/[.06] bg-[#121217] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="size-4 text-amber-200" />
                      <h2 className="text-[12px] font-semibold text-white/60">Rewards</h2>
                    </div>
                    <span className="rounded-full bg-amber-300/10 px-2 py-1 text-[7px] font-semibold text-amber-100">{rewards.tier}</span>
                  </div>
                  <p className="mt-5 text-[22px] font-semibold tracking-[-.04em] text-amber-100">{rewards.points} pts</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[.06]">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500" style={{ width: `${rewardPct}%` }} />
                  </div>
                  <p className="mt-3 text-[8px] text-white/24">{rewards.toNextTier} pts to <span className="text-white/45">{rewards.nextTier}</span> — earn points every time you book.</p>
                  <Link href="/rewards" className="mt-4 inline-flex items-center gap-1 text-[8px] font-semibold text-amber-200/80 transition hover:text-amber-100">View rewards <ArrowRight className="size-3" /></Link>
                </section>
              </Reveal>
            </div>
          </div>

          {/* Quick actions across modules */}
          <section className="mt-14">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Jump back in</p>
              <h2 className="mt-3 text-[22px] font-semibold tracking-[-.04em] text-white/78">Everything local, one tap away.</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {consumerModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Reveal key={module.slug} delay={index * 0.025}>
                    <Link
                      href={module.slug === "services" ? "/services" : `/explore/${module.slug}`}
                      className="group flex items-center gap-2.5 rounded-[16px] border border-white/[.055] bg-[#121217] px-3.5 py-3 transition hover:-translate-y-0.5 hover:border-white/[.11]"
                    >
                      <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${module.accent.bg} ${module.accent.text}`}>
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[10px] font-semibold text-white/58">{module.name}</span>
                        <span className={`block text-[7px] font-semibold uppercase tracking-[.08em] ${module.status === "live" ? "text-emerald-300/70" : "text-white/22"}`}>
                          {module.status === "live" ? "Live" : "Preview"}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Your activity — profile, applications, requests */}
          <section className="mt-14">
            <Reveal>
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Your activity</p>
              <h2 className="mt-3 text-[22px] font-semibold tracking-[-.04em] text-white/78">Applications, requests and your profile.</h2>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Reveal>
                <Link href="/applications" className="group block rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:-translate-y-1 hover:border-white/[.11]">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-sky-400/10 text-sky-200"><BriefcaseBusiness className="size-4" /></span><ArrowRight className="size-3.5 text-white/18 transition group-hover:text-violet-300" /></div>
                  <p className="mt-5 text-[24px] font-semibold tracking-[-.04em] text-white/78">{applicationStats.active}</p>
                  <p className="mt-1 text-[9px] font-semibold text-white/40">Active applications</p>
                  <p className="mt-0.5 text-[8px] text-white/20">{applicationStats.total} total · jobs & freelance</p>
                </Link>
              </Reveal>
              <Reveal delay={0.04}>
                <Link href="/requests" className="group block rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:-translate-y-1 hover:border-white/[.11]">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-fuchsia-400/10 text-fuchsia-200"><ClipboardList className="size-4" /></span><ArrowRight className="size-3.5 text-white/18 transition group-hover:text-violet-300" /></div>
                  <p className="mt-5 text-[24px] font-semibold tracking-[-.04em] text-white/78">{requestStats.open}</p>
                  <p className="mt-1 text-[9px] font-semibold text-white/40">Open requests</p>
                  <p className="mt-0.5 text-[8px] text-white/20">Handled by the Concierge</p>
                </Link>
              </Reveal>
              <Reveal delay={0.08}>
                <Link href="/profile" className="group block rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:-translate-y-1 hover:border-white/[.11]">
                  <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-200"><BadgeCheck className="size-4" /></span><ArrowRight className="size-3.5 text-white/18 transition group-hover:text-violet-300" /></div>
                  <p className="mt-5 text-[24px] font-semibold tracking-[-.04em] text-white/78">{profileCompleteness()}%</p>
                  <p className="mt-1 text-[9px] font-semibold text-white/40">Profile complete</p>
                  <p className="mt-0.5 text-[8px] text-white/20">Job-seeker & freelancer</p>
                </Link>
              </Reveal>
            </div>
          </section>

          {/* Saved + Activity */}
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
            <section>
              <Reveal className="flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Your shortlist</p>
                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-.04em] text-white/78">Saved for later.</h2>
                </div>
                <Link href="/saved" className="hidden items-center gap-1 text-[8px] font-semibold text-violet-300 sm:flex">View all <ArrowRight className="size-3" /></Link>
              </Reveal>
              <SavedShortlist />
            </section>

            <Reveal delay={0.05}>
              <section className="rounded-[24px] border border-white/[.06] bg-[#121217] p-5 sm:p-6">
                <h2 className="text-[12px] font-semibold text-white/60">Recent activity</h2>
                <div className="mt-5 space-y-4">
                  {recentActivity.map((item) => {
                    const Icon = activityIcon[item.kind];
                    return (
                      <div key={item.id} className="flex gap-3">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-white/[.04] text-white/40">
                          <Icon className="size-3" />
                        </span>
                        <div className="min-w-0 flex-1 border-b border-white/[.04] pb-4 last:border-0 last:pb-0">
                          <p className="text-[9px] font-semibold text-white/50">{item.title}</p>
                          <p className="mt-0.5 text-[8px] leading-4 text-white/26">{item.detail}</p>
                          <p className="mt-1 text-[7px] text-white/16">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          </div>

          {/* Suggested */}
          <section className="mt-14">
            <Reveal className="flex items-end justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Suggested for you</p>
                <h2 className="mt-3 text-[22px] font-semibold tracking-[-.04em] text-white/78">Discover something new.</h2>
              </div>
              <Link href="/services" className="hidden items-center gap-1 text-[8px] font-semibold text-violet-300 sm:flex">View all <ArrowRight className="size-3" /></Link>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {suggested.map((business, index) => (
                <Reveal key={business.id} delay={index * 0.045}>
                  <Link href={`/businesses/${business.slug}`} className="group block overflow-hidden rounded-[22px] border border-white/[.06] bg-[#121217] transition hover:-translate-y-1 hover:border-white/[.11]">
                    <div className={`relative h-28 bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                      <div className="echelon-grid absolute inset-0 opacity-25" />
                      <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[7px] font-semibold text-white/60 backdrop-blur-xl">{business.category}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-[12px] font-semibold text-white/58">{business.name}</h3>
                          <p className="mt-1 flex items-center gap-1 text-[7px] text-white/18"><MapPin className="size-2.5" />{business.suburb}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 text-[8px] font-semibold text-amber-100"><Star className="size-3 fill-current" />{business.rating}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/[.05] pt-3">
                        <span className="flex items-center gap-1 text-[7px] text-emerald-300"><Clock3 className="size-2.5" />Available today</span>
                        <ArrowRight className="size-3.5 text-white/18 transition group-hover:text-violet-300" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Footer quick links */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[.055] pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <Link href="/bookings" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><CalendarDays className="size-3" />My bookings</Link>
              <Link href="/saved" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><Heart className="size-3" />Saved</Link>
              <Link href="/messages" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><MessageSquareText className="size-3" />Messages</Link>
              <Link href="/profile" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><BadgeCheck className="size-3" />Profile</Link>
              <Link href="/rewards" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><Trophy className="size-3" />Rewards</Link>
              <Link href="/notifications" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><Bell className="size-3" />Notifications</Link>
              <Link href="/explore" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><Search className="size-3" />Explore</Link>
              <Link href="/settings" className="flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2 text-[8px] font-semibold text-white/38 transition hover:text-white/70"><UserRound className="size-3" />Settings</Link>
            </div>
            <span className="text-[7px] text-white/12">Your context stays under your control.</span>
          </div>
        </div>
      </main>
    </MarketingShell>
  );
}
