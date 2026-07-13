"use client";

import type { Business } from "@echelon/types";
import { motion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Search, SlidersHorizontal, Sparkles, Star, Store, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const gradients = [
  "from-violet-500/50 via-indigo-500/22 to-sky-400/30",
  "from-rose-500/38 via-orange-500/18 to-amber-300/28",
  "from-emerald-500/34 via-cyan-500/16 to-sky-400/28",
  "from-indigo-500/42 via-violet-500/18 to-fuchsia-400/25",
  "from-amber-500/32 via-orange-500/16 to-rose-400/24",
  "from-cyan-500/30 via-blue-500/16 to-indigo-400/24",
];

type SortMode = "Recommended" | "Highest rated" | "Most reviewed";

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

export function ServiceMarketplace({ businesses }: { businesses: Business[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("Recommended");

  const categories = ["All", ...Array.from(new Set(businesses.map((business) => business.category)))];
  const filtered = useMemo(() => {
    const matches = businesses.filter((business) => {
      const searchText = `${business.name} ${business.category} ${business.suburb} ${business.tags.join(" ")} ${business.services.map((service) => service.name).join(" ")}`.toLowerCase();
      return (category === "All" || business.category === category) && searchText.includes(query.toLowerCase());
    });

    return matches.sort((left, right) => {
      if (sort === "Highest rated") return right.rating - left.rating;
      if (sort === "Most reviewed") return right.reviewCount - left.reviewCount;
      return businesses.indexOf(left) - businesses.indexOf(right);
    });
  }, [businesses, category, query, sort]);

  return (
    <div>
      <div className="rounded-[22px] border border-white/[.07] bg-[#111116]/92 p-3 shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-violet-300" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search services, businesses or suburbs…"
              className="h-11 w-full rounded-xl border border-white/[.07] bg-white/[.03] pl-10 pr-10 text-[10px] text-white/70 outline-none transition placeholder:text-white/20 focus:border-violet-400/30 focus:bg-white/[.045]"
            />
            {query ? (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-lg text-white/22 transition hover:bg-white/[.05] hover:text-white/60"
                aria-label="Clear service search"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex gap-1 rounded-xl border border-white/[.055] bg-white/[.018] p-0.5">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-[9px] px-2.5 py-2 text-[8px] font-semibold transition ${
                    category === item
                      ? "bg-white/[.08] text-white/70"
                      : "text-white/20 hover:text-white/45"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="service-sort">
              Sort businesses
            </label>
            <div className="relative shrink-0">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-white/22" />
              <select
                id="service-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="h-10 rounded-xl border border-white/[.065] bg-white/[.025] pl-8 pr-3 text-[8px] font-semibold text-white/42 outline-none"
              >
                <option>Recommended</option>
                <option>Highest rated</option>
                <option>Most reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-white/52">
            {filtered.length} {filtered.length === 1 ? "business" : "businesses"}
          </p>
          <p className="mt-1 text-[8px] text-white/18">
            {category === "All" ? "Across Perth" : category}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Live availability
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((business, index) => {
            const primaryService = business.services[0];
            return (
              <motion.article
                key={business.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.045 }}
                className="group overflow-hidden rounded-[24px] border border-white/[.065] bg-[#121217] transition duration-300 hover:-translate-y-1 hover:border-white/[.12] hover:shadow-[0_28px_80px_rgba(0,0,0,.34)]"
              >
                <Link href={`/businesses/${business.slug}`} className="block">
                  <div className={`relative h-40 bg-gradient-to-br ${gradients[index % gradients.length] ?? gradients[0]}`}>
                    <div className="echelon-grid absolute inset-0 opacity-25" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[8px] font-semibold text-white/68 backdrop-blur-xl">
                      {business.category}
                    </span>
                    <span className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-2.5 py-1.5 text-[8px] font-semibold text-amber-100 backdrop-blur-xl">
                      <Star className="size-3 fill-current" /> {business.rating}
                    </span>
                  </div>
                </Link>

                <div className="p-5">
                  <Link href={`/businesses/${business.slug}`}>
                    <h2 className="text-[15px] font-semibold text-white/72 transition group-hover:text-white/88">
                      {business.name}
                    </h2>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[8px] text-white/21">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {business.suburb}
                    </span>
                    <span>{business.reviewCount} reviews</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {business.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[.05] bg-white/[.02] px-2 py-1 text-[7px] text-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-white/[.055] pt-4">
                    {business.services.slice(0, 2).map((service) => (
                      <div key={service.id} className="flex items-center gap-3 rounded-xl bg-white/[.018] px-3 py-2.5">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[9px] font-medium text-white/43">{service.name}</p>
                          <p className="mt-1 flex items-center gap-1 text-[7px] text-white/16">
                            <Clock3 className="size-2.5" /> {service.durationMinutes} min
                          </p>
                        </div>
                        <span className="text-[9px] font-semibold text-white/52">{formatPrice(service.priceCents)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[7px] uppercase tracking-[.1em] text-white/16">Next available</p>
                      <p className="mt-1 text-[9px] font-semibold text-emerald-300">
                        Today · {primaryService?.availability[0] ?? "On request"}
                      </p>
                    </div>
                    {primaryService ? (
                      <Link
                        href={`/booking/${business.id}?service=${primaryService.id}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-violet-500 px-3.5 text-[8px] font-semibold text-white transition hover:bg-violet-400"
                      >
                        Book <ArrowRight className="size-3" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 grid min-h-72 place-items-center rounded-[24px] border border-dashed border-white/[.08] bg-white/[.015] p-8 text-center">
          <div>
            <span className="mx-auto grid size-11 place-items-center rounded-xl border border-white/[.06] bg-white/[.03] text-white/28">
              <Store className="size-4" />
            </span>
            <h2 className="mt-4 text-[14px] font-semibold text-white/62">No services found</h2>
            <p className="mx-auto mt-2 max-w-xs text-[9px] leading-5 text-white/22">
              Try another business, category or suburb. Echelon is expanding local supply continuously.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl border border-white/[.08] px-4 text-[8px] font-semibold text-white/44"
            >
              <Sparkles className="size-3.5 text-violet-300" /> Reset discovery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
