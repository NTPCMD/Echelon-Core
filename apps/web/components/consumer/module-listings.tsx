"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import type { Listing } from "../../lib/listings";
import { getModule } from "../../lib/modules";
import { Reveal } from "../marketing/reveal";
import { ListingCard } from "./listing-card";

/**
 * Client wrapper for a module's listings: a visual-only search box and filter
 * chips over the mock listing grid. No AI yet — filtering is a simple local
 * text + category match so the UX reads as real.
 */
export function ModuleListings({ slug, listings }: { slug: string; listings: Listing[] }) {
  const module = getModule(slug);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(module?.filters[0] ?? "All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((listing) => {
      const matchesFilter = filter === "All" || listing.category === filter;
      const matchesQuery =
        !q ||
        listing.title.toLowerCase().includes(q) ||
        listing.subtitle.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q) ||
        listing.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [listings, filter, query]);

  if (!module) return null;

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-white/[.08] bg-[#121217] px-3.5 py-2.5">
          <Search className="size-4 shrink-0 text-white/28" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={module.searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-[11px] text-white/75 outline-none placeholder:text-white/22"
          />
        </div>
        <button
          type="button"
          className="hidden items-center gap-2 rounded-2xl border border-white/[.08] bg-[#121217] px-4 py-2.5 text-[9px] font-semibold text-white/40 transition hover:text-white/70 lg:inline-flex"
        >
          <SlidersHorizontal className="size-3.5" /> Filters
        </button>
      </div>

      {module.filters.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {module.filters.map((option) => {
            const active = option === filter;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-full border px-3.5 py-1.5 text-[9px] font-semibold transition ${
                  active
                    ? `${module.accent.border} ${module.accent.bg} ${module.accent.text}`
                    : "border-white/[.06] bg-white/[.02] text-white/32 hover:text-white/60"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-[9px] text-white/24">
          {filtered.length} {filtered.length === 1 ? module.itemNoun : `${module.itemNoun}s`}
          {filter !== "All" ? ` in ${filter}` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4 grid min-h-52 place-items-center rounded-[22px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
          <div className="px-6">
            <p className="text-[11px] font-semibold text-white/40">Nothing matches yet.</p>
            <p className="mx-auto mt-2 max-w-xs text-[8px] leading-4 text-white/18">
              Try a different filter or search term. In the full release, Echelon AI will widen the net for you.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, index) => (
            <Reveal key={listing.id} delay={index * 0.04}>
              <ListingCard listing={listing} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
