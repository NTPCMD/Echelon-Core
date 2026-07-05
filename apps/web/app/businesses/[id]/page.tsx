import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, MapPin, Clock, ArrowLeft, Check } from "lucide-react";
import { businesses } from "../../../lib/seed";

const GRADIENTS = [
  "from-violet-400 to-fuchsia-300",
  "from-rose-400 to-amber-300",
  "from-sky-400 to-teal-300",
  "from-indigo-400 to-violet-300",
  "from-amber-400 to-orange-300",
  "from-emerald-400 to-cyan-300",
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const biz = businesses.find((b) => b.slug === id || b.id === id);
  if (!biz) notFound();

  const idx = businesses.indexOf(biz);
  const gradient = GRADIENTS[idx % GRADIENTS.length];

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <b className="text-xl tracking-tight">Echelon</b>
        <Link href="/" className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white">
          <ArrowLeft className="size-4" /> Back
        </Link>
      </nav>

      {/* Cover */}
      <div className={`h-64 bg-gradient-to-br ${gradient} sm:h-80`} />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Header */}
        <div className="-mt-8 flex items-end gap-6">
          <div className="size-24 flex-shrink-0 rounded-3xl bg-white shadow-glow dark:bg-white/10" />
          <div className="pb-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              {biz.category}
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{biz.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-black/50 dark:text-white/40">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {biz.suburb}, {biz.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {biz.rating} · {biz.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {biz.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 px-4 py-1.5 text-sm dark:border-white/10">
              {tag}
            </span>
          ))}
        </div>

        {/* Services */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {biz.services.map((svc) => (
              <div
                key={svc.id}
                className="flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-white/5"
              >
                <h3 className="text-xl font-bold tracking-tight">{svc.name}</h3>
                <p className="mt-2 flex-1 text-sm text-black/55 dark:text-white/50">{svc.description}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-black/40 dark:text-white/30">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {svc.durationMinutes} min
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold tracking-tight">
                    {formatPrice(svc.priceCents)}
                  </span>
                  <Link
                    href={`/booking/${biz.id}?service=${svc.id}`}
                    className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-80 dark:bg-white dark:text-ink"
                  >
                    Book now
                  </Link>
                </div>

                {/* Availability */}
                <div className="mt-4 border-t border-black/5 pt-4 dark:border-white/5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/30 dark:text-white/30">
                    Available today
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {svc.availability.map((time) => (
                      <span
                        key={time}
                        className="rounded-xl border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews placeholder */}
        <section className="mt-12 mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { author: "Sarah M.", rating: 5, text: "Absolutely incredible service. I won't go anywhere else.", time: "2 weeks ago" },
              { author: "James K.", rating: 5, text: "Professional, on time, and the results speak for themselves.", time: "1 month ago" },
              { author: "Priya L.", rating: 4, text: "Great experience overall. Would highly recommend to friends.", time: "1 month ago" },
            ].map((r) => (
              <div key={r.author} className="rounded-3xl border border-black/5 bg-white p-6 dark:border-white/5 dark:bg-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{r.author}</p>
                    <p className="text-xs text-black/40 dark:text-white/30">{r.time}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-black/60 dark:text-white/50">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return businesses.map((b) => ({ id: b.slug }));
}
