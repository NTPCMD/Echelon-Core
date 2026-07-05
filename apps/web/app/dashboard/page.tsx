import Link from "next/link";
import { Calendar, Heart, Star, ArrowRight, Clock, MapPin } from "lucide-react";
import { businesses } from "../../lib/seed";

export default function DashboardPage() {
  const suggested = businesses.slice(0, 3);

  return (
    <main className="min-h-screen">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <b className="text-xl tracking-tight">Echelon</b>
        <Link href="/" className="text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
          ← Home
        </Link>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Your dashboard</h1>
          <p className="mt-1 text-black/50 dark:text-white/40">Manage bookings, favourites and rewards.</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Calendar, label: "Upcoming bookings", value: "0", cta: "Book something" },
            { icon: Heart, label: "Saved businesses", value: "0", cta: "Browse services" },
            { icon: Star, label: "Rewards points", value: "0 pts", cta: "Learn more" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-white/5">
              <stat.icon className="size-5 text-brand" />
              <p className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-black/50 dark:text-white/40">{stat.label}</p>
              <p className="mt-4 text-xs font-semibold text-brand">{stat.cta} →</p>
            </div>
          ))}
        </div>

        {/* Upcoming bookings placeholder */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Upcoming bookings</h2>
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-10 text-center dark:border-white/5 dark:bg-white/5">
            <Calendar className="mx-auto size-10 text-black/20 dark:text-white/20" />
            <p className="mt-4 font-semibold text-black/40 dark:text-white/30">No bookings yet</p>
            <Link href="/" className="mt-4 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white">
              Find a service
            </Link>
          </div>
        </section>

        {/* Suggested */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Suggested for you</h2>
            <Link href="/" className="flex items-center gap-1 text-sm text-brand hover:underline">
              See all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {suggested.map((biz) => (
              <Link
                key={biz.id}
                href={`/businesses/${biz.slug}`}
                className="group rounded-2xl border border-black/5 bg-white p-5 transition hover:border-brand/30 hover:shadow-sm dark:border-white/5 dark:bg-white/5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-brand to-fuchsia-300" />
                  <div>
                    <p className="text-sm font-bold">{biz.name}</p>
                    <p className="text-xs text-black/40 dark:text-white/30">{biz.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-black/40 dark:text-white/30">
                  <span className="flex items-center gap-1"><MapPin className="size-3" /> {biz.suburb}</span>
                  <span className="flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" /> {biz.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
