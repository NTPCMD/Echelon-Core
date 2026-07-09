import Link from "next/link";
import { Star, MapPin, ArrowRight, Briefcase, Wrench, Calendar, UtensilsCrossed, BedDouble, Users, Zap, ClipboardList, ChevronRight } from "lucide-react";
import { AiSearch } from "../components/ai-search";
import { AuthControls } from "../components/auth-controls";
import { businesses } from "../lib/seed";
import { clerkEnabled } from "../lib/clerk";

const MODULES = [
  {
    icon: Wrench,
    label: "Services",
    desc: "Book beauty, trades, health, fitness, photography and more.",
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    href: "/services",
    live: true,
  },
  {
    icon: Briefcase,
    label: "Jobs",
    desc: "Find full-time, part-time, casual and contract opportunities.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    href: "/jobs",
    live: false,
  },
  {
    icon: Zap,
    label: "Freelancing",
    desc: "Post projects. Find developers, designers, marketers and more.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    href: "/freelancing",
    live: false,
  },
  {
    icon: ClipboardList,
    label: "One-Off Jobs",
    desc: "Post a task. Hire local workers for cleaning, moving, handyman work.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    href: "/tasks",
    live: false,
  },
  {
    icon: Calendar,
    label: "Events",
    desc: "Discover conferences, networking, concerts, workshops and more.",
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    href: "/events",
    live: false,
  },
  {
    icon: BedDouble,
    label: "Accommodation",
    desc: "Book hotels, resorts, holiday homes, cabins and unique stays.",
    color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
    href: "/accommodation",
    live: false,
  },
  {
    icon: UtensilsCrossed,
    label: "Food",
    desc: "Discover restaurants, reserve tables and join waitlists.",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    href: "/food",
    live: false,
  },
  {
    icon: Users,
    label: "Networking",
    desc: "Meet founders, investors, mentors and collaborators.",
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    href: "/networking",
    live: false,
  },
];

const EXAMPLE_QUERIES = [
  "I need a DJ for my wedding.",
  "Book a haircut tomorrow.",
  "Find me a marketing job.",
  "I need someone to build my website.",
  "Reserve dinner for six tonight.",
  "Find networking events this weekend.",
];

const GRADIENTS = [
  "from-violet-400 to-fuchsia-300",
  "from-rose-400 to-amber-300",
  "from-sky-400 to-teal-300",
  "from-indigo-400 to-violet-300",
  "from-amber-400 to-orange-300",
  "from-emerald-400 to-cyan-300",
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free consult";
  return `From $${(cents / 100).toFixed(0)}`;
}

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <b className="text-2xl tracking-tight">Echelon</b>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/business-dashboard" className="hidden text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white sm:block">
            For business
          </Link>
          {clerkEnabled ? (
            <AuthControls />
          ) : (
            <>
              <Link href="/auth/login" className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
                Login
              </Link>
              <Link href="/auth/register" className="rounded-full bg-brand px-5 py-2 font-semibold text-white hover:opacity-90">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-16 pt-6 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 text-center">
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              The AI operating system for local commerce
            </span>
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            What do you need today?
          </h1>
          <p className="mx-auto max-w-xl text-lg text-black/55 dark:text-white/55">
            One search. One platform. One AI. Whether you're booking a service, finding a job, hiring a freelancer, or reserving a table — it all starts here.
          </p>
          <AiSearch />

          {/* Example queries */}
          <div className="mt-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/30 dark:text-white/30">Try asking</p>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLE_QUERIES.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-black/8 bg-white/80 px-4 py-2 text-xs text-black/50 dark:border-white/8 dark:bg-white/5 dark:text-white/40"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="border-t border-black/5 px-6 py-16 dark:border-white/5 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Platform</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Every marketplace. One platform.</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODULES.map((mod) => (
              <div
                key={mod.label}
                className="group relative flex flex-col rounded-3xl border border-black/5 bg-white p-6 transition hover:border-brand/20 hover:shadow-sm dark:border-white/5 dark:bg-white/5"
              >
                <div className={`mb-4 inline-flex size-10 items-center justify-center rounded-2xl ${mod.color}`}>
                  <mod.icon className="size-5" />
                </div>
                <h3 className="font-bold tracking-tight">{mod.label}</h3>
                <p className="mt-1.5 flex-1 text-sm text-black/50 dark:text-white/40">{mod.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  {mod.live ? (
                    <span className="rounded-full bg-done/15 px-2.5 py-1 text-xs font-semibold text-done">Live</span>
                  ) : (
                    <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold text-black/30 dark:bg-white/5 dark:text-white/30">Coming soon</span>
                  )}
                  <ChevronRight className="size-4 text-black/20 transition group-hover:text-brand dark:text-white/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured businesses */}
      <section className="border-t border-black/5 px-6 py-16 dark:border-white/5 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Services</p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">Featured in Perth</h2>
            </div>
            <Link href="/dashboard" className="flex items-center gap-1 text-sm text-brand hover:underline">
              See all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((biz, i) => (
              <Link
                key={biz.id}
                href={`/businesses/${biz.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow dark:bg-white/5"
              >
                <div className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`} />
                <div className="p-6">
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                    {biz.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight">{biz.name}</h3>
                  <div className="mt-2 flex items-center gap-3 text-sm text-black/50 dark:text-white/40">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {biz.suburb}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      {biz.rating} ({biz.reviewCount})
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/5">
                    <span className="text-sm text-black/50 dark:text-white/40">
                      {formatPrice(biz.services[0]?.priceCents ?? 0)}
                    </span>
                    <span className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-ink">
                      Book now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink px-6 py-24 text-white sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">How it works</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">One AI. Every opportunity.</h2>
            <p className="mt-3 text-white/50">The AI understands your intent and routes you to the right marketplace automatically.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Describe what you need",
                desc: "Type in plain language. No categories to browse, no forms to fill. Just tell Echelon what you're looking for.",
              },
              {
                step: "02",
                title: "AI finds the best options",
                desc: "The AI detects your intent, searches the right marketplace, and surfaces ranked results personalised to you.",
              },
              {
                step: "03",
                title: "Book, apply or connect",
                desc: "Complete the task — book an appointment, apply for a job, hire a freelancer, or reserve a table — in one place.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 p-8">
                <span className="font-mono text-sm font-bold text-brand">{item.step}</span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business platform */}
      <section className="border-t border-black/5 px-6 py-20 dark:border-white/5 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">For business</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">Everything your business needs. One platform.</h2>
              <p className="mt-4 text-lg text-black/55 dark:text-white/55">
                Replace your disconnected stack with one intelligent business platform. Manage bookings, customers, reviews, payments and marketing — all integrated with GoHighLevel CRM.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Business Profile", "Booking Management", "Customer CRM",
                  "Calendar", "Reviews", "Messaging",
                  "Analytics", "Payments", "AI Automation",
                  "GoHighLevel Integration",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <div className="size-1.5 flex-shrink-0 rounded-full bg-brand" />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/business-dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-ink"
              >
                Open business dashboard <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Bookings this month", value: "—" },
                { label: "Total customers", value: "—" },
                { label: "Avg. rating", value: "—" },
                { label: "Revenue (MTD)", value: "—" },
              ].map((s) => (
                <div key={s.label} className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/5 dark:bg-white/5">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="mt-1 text-xs text-black/40 dark:text-white/30">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision statement */}
      <section className="bg-brand px-6 py-20 text-white sm:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            One platform.<br />One AI.<br />Every opportunity.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-white/75">
            Echelon's ambition is to become the operating system that connects local commerce. Whether someone wants to hire, work, book, travel, network, recruit, organise or discover — they begin in one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/auth/register" className="rounded-full bg-white px-8 py-3.5 font-semibold text-brand hover:opacity-90">
              Get started free
            </Link>
            <Link href="/business-dashboard" className="rounded-full border border-white/30 px-8 py-3.5 font-semibold hover:border-white">
              List your business
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-10 dark:border-white/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-black/40 dark:text-white/30">
          <div className="flex items-center gap-6">
            <b className="text-black/60 dark:text-white/60">Echelon</b>
            <span>© 2025</span>
          </div>
          <div className="flex gap-6">
            <Link href="/auth/register" className="hover:text-brand">Sign up</Link>
            <Link href="/business-dashboard" className="hover:text-brand">For business</Link>
            <Link href="/auth/login" className="hover:text-brand">Login</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
