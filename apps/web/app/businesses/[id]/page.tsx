import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BusinessReviews } from "../../../components/consumer/business-reviews";
import { SaveButton } from "../../../components/consumer/save-button";
import { Reveal } from "../../../components/marketing/reveal";
import { MarketingShell } from "../../../components/marketing/site-shell";
import { businesses } from "../../../lib/seed";

const gradients = [
  "from-violet-500/55 via-indigo-500/24 to-sky-400/30",
  "from-rose-500/42 via-orange-500/18 to-amber-300/30",
  "from-emerald-500/38 via-cyan-500/18 to-sky-400/28",
  "from-indigo-500/48 via-violet-500/20 to-fuchsia-400/28",
  "from-amber-500/38 via-orange-500/18 to-rose-400/26",
  "from-cyan-500/34 via-blue-500/18 to-indigo-400/26",
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

function findBusiness(id: string) {
  return businesses.find((business) => business.slug === id || business.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const business = findBusiness(id);
  return {
    title: business ? `${business.name} — Book on Echelon` : "Business — Echelon",
    description: business
      ? `View services, reviews and live availability for ${business.name} in ${business.suburb}.`
      : "Discover local services on Echelon.",
  };
}

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = findBusiness(id);
  if (!business) notFound();

  const index = businesses.indexOf(business);
  const gradient = gradients[index % gradients.length] ?? gradients[0];
  const primaryService = business.services[0];
  const initials = business.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <MarketingShell>
      <main>
        <section className="relative overflow-hidden border-b border-white/[.055]">
          <div className={`relative h-60 bg-gradient-to-br ${gradient} sm:h-72 lg:h-80`}>
            <div className="echelon-grid absolute inset-0 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-[#08080b]/15 to-transparent" />
            <div className="mx-auto flex h-full max-w-[1280px] items-start px-5 pt-7 sm:px-8 lg:px-12">
              <Link
                href="/services"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-[8px] font-semibold text-white/55 backdrop-blur-xl transition hover:bg-black/35 hover:text-white/80"
              >
                <ArrowLeft className="size-3.5" /> Back to services
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-[1280px] px-5 pb-8 sm:px-8 lg:px-12">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="grid size-24 shrink-0 place-items-center rounded-[24px] border border-white/[.1] bg-[#121217] text-2xl font-semibold text-violet-200 shadow-[0_22px_70px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.05)]">
                {initials}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-violet-400/10 bg-violet-400/10 px-2.5 py-1 text-[8px] font-semibold text-violet-200">
                    {business.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2.5 py-1 text-[8px] font-semibold text-emerald-300">
                    <ShieldCheck className="size-3" /> Verified
                  </span>
                </div>
                <h1 className="mt-3 text-[34px] font-semibold tracking-[-.05em] text-white/92 sm:text-[48px]">
                  {business.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-[9px] text-white/28">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" /> {business.suburb}, {business.city}
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-100">
                    <Star className="size-3.5 fill-current" /> {business.rating}
                    <span className="text-white/22">· {business.reviewCount} reviews</span>
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <SaveButton slug={business.slug} label />
                <Link
                  href="/messages"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[.1] bg-white/[.03] px-4 text-[10px] font-semibold text-white/60 transition hover:text-white/85"
                >
                  <MessageSquare className="size-3.5" /> Message
                </Link>
                {primaryService ? (
                  <Link
                    href={`/booking/${business.id}?service=${primaryService.id}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-[10px] font-semibold text-white shadow-[0_14px_38px_rgba(108,92,231,.22)] transition hover:-translate-y-px"
                  >
                    Book now <ArrowRight className="size-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-white/[.055] pt-5">
              {business.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/[.06] bg-white/[.02] px-3 py-1.5 text-[8px] text-white/24">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b0f] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <Reveal>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Bookable services</p>
                    <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">Choose what you need.</h2>
                  </div>
                  <span className="text-[8px] text-white/18">{business.services.length} services</span>
                </div>
              </Reveal>

              <div className="mt-6 space-y-3">
                {business.services.map((service, serviceIndex) => (
                  <Reveal key={service.id} delay={serviceIndex * 0.045}>
                    <article className="group rounded-[22px] border border-white/[.06] bg-[#121217] p-5 transition hover:border-white/[.11] sm:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[15px] font-semibold text-white/68">{service.name}</h3>
                            {serviceIndex === 0 ? (
                              <span className="rounded-full bg-violet-400/10 px-2 py-1 text-[7px] font-semibold text-violet-300">
                                Popular
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-3 max-w-2xl text-[10px] leading-5 text-white/25">{service.description}</p>
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-[8px] text-white/20">
                            <span className="flex items-center gap-1.5">
                              <Clock3 className="size-3" /> {service.durationMinutes} minutes
                            </span>
                            <span className="flex items-center gap-1.5 text-emerald-300">
                              <CalendarDays className="size-3" /> Available today
                            </span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center justify-between gap-5 sm:block sm:text-right">
                          <p className="text-[20px] font-semibold tracking-[-.035em] text-white/72">
                            {formatPrice(service.priceCents)}
                          </p>
                          <Link
                            href={`/booking/${business.id}?service=${service.id}`}
                            className="mt-0 inline-flex h-9 items-center gap-1.5 rounded-xl border border-violet-400/15 bg-violet-400/10 px-4 text-[8px] font-semibold text-violet-200 transition hover:bg-violet-500 hover:text-white sm:mt-3"
                          >
                            Select <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[.05] pt-4">
                        {service.availability.slice(0, 5).map((time) => (
                          <Link
                            key={time}
                            href={`/booking/${business.id}?service=${service.id}`}
                            className="rounded-lg border border-white/[.055] bg-white/[.02] px-2.5 py-1.5 text-[7px] font-medium text-white/28 transition hover:border-violet-400/20 hover:bg-violet-400/[.06] hover:text-violet-200"
                          >
                            {time}
                          </Link>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className="mt-14">
                <Reveal>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-violet-300/65">Client feedback</p>
                      <h2 className="mt-3 text-[26px] font-semibold tracking-[-.04em] text-white/80">Trusted by local customers.</h2>
                    </div>
                    <span className="hidden text-[8px] text-white/18 sm:block">{business.reviewCount} verified reviews</span>
                  </div>
                </Reveal>
                <BusinessReviews slug={business.slug} />
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
              <Reveal>
                <div className="rounded-[22px] border border-violet-400/12 bg-gradient-to-br from-violet-500/[.07] to-[#121217] p-5">
                  <Sparkles className="size-4 text-violet-300" />
                  <h2 className="mt-5 text-[14px] font-semibold text-white/62">Ready when you are.</h2>
                  <p className="mt-2 text-[9px] leading-5 text-white/24">
                    The next available appointment is today at {primaryService?.availability[0] ?? "a time on request"}.
                  </p>
                  {primaryService ? (
                    <Link
                      href={`/booking/${business.id}?service=${primaryService.id}`}
                      className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-[9px] font-semibold text-white"
                    >
                      Start booking <ArrowRight className="size-3.5" />
                    </Link>
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
                  <h2 className="text-[11px] font-semibold text-white/52">Business details</h2>
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-3.5 text-violet-300" />
                      <div>
                        <p className="text-[8px] font-medium text-white/38">Location</p>
                        <p className="mt-1 text-[8px] text-white/20">{business.suburb}, {business.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock3 className="mt-0.5 size-3.5 text-violet-300" />
                      <div>
                        <p className="text-[8px] font-medium text-white/38">Open today</p>
                        <p className="mt-1 text-[8px] text-emerald-300">8:30 AM – 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-0.5 size-3.5 text-violet-300" />
                      <div>
                        <p className="text-[8px] font-medium text-white/38">Response time</p>
                        <p className="mt-1 text-[8px] text-white/20">Usually within one hour</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-[22px] border border-white/[.06] bg-[#121217] p-5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-300" />
                    <h2 className="text-[11px] font-semibold text-white/52">Book with confidence</h2>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    {["Verified business profile", "Transparent service pricing", "Secure confirmation", "Customer support when needed"].map((item) => (
                      <p key={item} className="flex items-center gap-2 text-[8px] text-white/22">
                        <Check className="size-3 text-emerald-300" /> {item}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

export function generateStaticParams() {
  return businesses.map((business) => ({ id: business.slug }));
}
