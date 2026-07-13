import type { Metadata } from "next";
import { ArrowLeft, Check, MapPin, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryFlow } from "../../../../components/consumer/enquiry-flow";
import { Reveal } from "../../../../components/marketing/reveal";
import { MarketingShell } from "../../../../components/marketing/site-shell";
import { getListing, getListings } from "../../../../lib/listings";
import { exploreModules, getModule } from "../../../../lib/modules";

export function generateStaticParams() {
  return exploreModules.flatMap((module) =>
    getListings(module.slug).map((listing) => ({ module: module.slug, id: listing.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string; id: string }>;
}): Promise<Metadata> {
  const { module: slug, id } = await params;
  const listing = getListing(slug, id);
  return {
    title: listing ? `${listing.title} — ${listing.subtitle} · Echelon` : "Listing — Echelon",
    description: listing?.description ?? "Explore local opportunities on Echelon.",
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ module: string; id: string }>;
}) {
  const { module: slug, id } = await params;
  const module = getModule(slug);
  const listing = getListing(slug, id);
  if (!module || !listing) notFound();

  const Icon = module.icon;
  const related = getListings(slug).filter((item) => item.id !== listing.id).slice(0, 3);

  return (
    <MarketingShell>
      <main>
        <section className="relative overflow-hidden border-b border-white/[.055]">
          <div className={`relative h-44 bg-gradient-to-br ${module.accent.gradient} sm:h-52`}>
            <div className="echelon-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/20 to-transparent" />
            <div className="mx-auto flex h-full max-w-[1180px] items-start px-5 pt-6 sm:px-8 lg:px-12">
              <Link
                href={`/explore/${slug}`}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-[8px] font-semibold text-white/55 backdrop-blur-xl transition hover:bg-black/35 hover:text-white/80"
              >
                <ArrowLeft className="size-3.5" /> Back to {module.name}
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-[1180px] px-5 pb-8 sm:px-8 lg:px-12">
            <div className="-mt-10 flex flex-col gap-4">
              <span
                className={`inline-flex size-16 items-center justify-center rounded-[20px] border border-white/[.1] bg-[#121217] ${module.accent.text} shadow-[0_18px_60px_rgba(0,0,0,.45)]`}
              >
                <Icon className="size-7" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border ${module.accent.border} ${module.accent.bg} px-2.5 py-1 text-[8px] font-semibold ${module.accent.text}`}>
                    {listing.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2.5 py-1 text-[8px] font-semibold text-emerald-300">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                </div>
                <h1 className="mt-3 text-[28px] font-semibold tracking-[-.045em] text-white/92 sm:text-[38px]">
                  {listing.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[9px] text-white/28">
                  <span>{listing.subtitle}</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {listing.location}
                  </span>
                  {listing.rating ? (
                    <span className="flex items-center gap-1.5 text-amber-100">
                      <Star className="size-3.5 fill-current" /> {listing.rating}
                      {listing.reviewCount ? <span className="text-white/22">· {listing.reviewCount} reviews</span> : null}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b0f] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 space-y-8">
              <Reveal>
                <div className="grid grid-cols-3 gap-3">
                  {listing.meta.map((fact) => (
                    <div key={fact.label} className="rounded-[18px] border border-white/[.06] bg-[#121217] p-4">
                      <p className="text-[7px] font-semibold uppercase tracking-[.1em] text-white/22">{fact.label}</p>
                      <p className="mt-2 text-[12px] font-semibold text-white/68">{fact.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div>
                  <h2 className="text-[14px] font-semibold text-white/72">Overview</h2>
                  <p className="mt-3 max-w-2xl text-[11px] leading-6 text-white/32">{listing.description}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <h2 className="text-[14px] font-semibold text-white/72">What's included</h2>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {listing.highlights.map((item) => (
                      <p key={item} className="flex items-center gap-2 text-[10px] text-white/34">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                          <Check className="size-3" />
                        </span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {related.length > 0 ? (
                <Reveal delay={0.15}>
                  <div className="border-t border-white/[.055] pt-8">
                    <h2 className="text-[14px] font-semibold text-white/72">More {module.name.toLowerCase()}</h2>
                    <div className="mt-4 space-y-2.5">
                      {related.map((item) => (
                        <Link
                          key={item.id}
                          href={`/explore/${slug}/${item.id}`}
                          className="flex items-center justify-between gap-3 rounded-[16px] border border-white/[.055] bg-[#121217] px-4 py-3.5 transition hover:border-white/[.1]"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-semibold text-white/62">{item.title}</p>
                            <p className="mt-0.5 truncate text-[8px] text-white/24">
                              {item.subtitle} · {item.location}
                            </p>
                          </div>
                          {item.price ? (
                            <span className="shrink-0 text-[10px] font-semibold text-white/55">{item.price}</span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <Reveal>
                <EnquiryFlow listing={listing} />
              </Reveal>
            </aside>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
