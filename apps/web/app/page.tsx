import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { AiSearch } from "../components/ai-search";
import { businesses } from "../lib/seed";

const categories = [
  { label: "Hair", slug: "Hair Salon" },
  { label: "Beauty", slug: "Beauty" },
  { label: "Massage", slug: "Massage" },
  { label: "Photography", slug: "Photography" },
  { label: "DJ & Events", slug: "DJ" },
  { label: "Fitness", slug: "Personal Training" },
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
          <Link href="/auth/login" className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-brand px-5 py-2 font-semibold text-white hover:opacity-90"
          >
            Sign up
          </Link>
          <Link
            href="/business-dashboard"
            className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
          >
            For business
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-16 pt-8 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 text-center">
          <div>
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand">
              AI-powered operating system for local commerce
            </span>
          </div>
          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Book exceptional local services with one intelligent search.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-black/55 dark:text-white/55">
            Describe what you need. Echelon understands, searches, and books — across every local service.
          </p>
          <AiSearch />
        </div>
      </section>

      {/* Category chips */}
      <section className="px-6 pb-6 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="cursor-default rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Businesses grid */}
      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured in Perth</h2>
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
                <div
                  className={`h-48 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} transition duration-300`}
                />
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
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight">How Echelon works</h2>
            <p className="mt-3 text-white/50">Three steps. One platform. Every local service.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell Echelon what you need",
                desc: "Type in plain language — time, style, location. No categories to browse.",
              },
              {
                step: "2",
                title: "Compare trusted businesses",
                desc: "AI ranks results by relevance, rating and availability.",
              },
              {
                step: "3",
                title: "Book and manage everything",
                desc: "Confirm your appointment, pay securely, track it all in one place.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl bg-white/8 p-8">
                <span className="text-4xl font-black text-brand opacity-60">{item.step}</span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="border-t border-black/5 px-6 py-16 dark:border-white/5 sm:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Coming next</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">One platform for every local need</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              "Jobs & Recruitment",
              "Freelancing",
              "Events",
              "Restaurants",
              "Hotels & Spas",
              "Networking",
              "Rewards",
            ].map((m) => (
              <span
                key={m}
                className="rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-sm font-medium text-brand/70"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-10 dark:border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm text-black/40 dark:text-white/30">
          <span>© 2025 Echelon</span>
          <span>Built for services today. Architected for everything tomorrow.</span>
        </div>
      </footer>
    </main>
  );
}
