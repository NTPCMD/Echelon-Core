"use client";

import { ArrowRight, Clock3, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { businesses } from "../../lib/seed";
import { defaultSavedSlugs, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";
import { SaveButton } from "./save-button";

const gradients = [
  "from-violet-500/45 via-indigo-500/20 to-sky-400/25",
  "from-rose-500/38 via-orange-500/18 to-amber-300/24",
  "from-emerald-500/38 via-teal-500/18 to-cyan-400/24",
  "from-cyan-500/38 via-sky-500/18 to-blue-400/24",
];

/** The saved shortlist grid, driven by the persisted account store. */
export function SavedView() {
  const savedSlugs = useAccountStore((state) => state.savedSlugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const slugs = mounted ? savedSlugs : defaultSavedSlugs;
  const saved = slugs
    .map((slug) => businesses.find((business) => business.slug === slug))
    .filter((business): business is (typeof businesses)[number] => Boolean(business));

  if (saved.length === 0) {
    return (
      <div className="mt-10 grid min-h-60 place-items-center rounded-[24px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-rose-400/10 text-rose-200">
            <Heart className="size-5" />
          </span>
          <p className="mt-4 text-[12px] font-semibold text-white/42">No saves yet.</p>
          <p className="mx-auto mt-2 max-w-xs text-[9px] leading-4 text-white/18">
            Tap the heart on any business or listing to build your shortlist.
          </p>
          <Link
            href="/services"
            className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl bg-violet-500 px-4 text-[9px] font-semibold text-white"
          >
            Discover services <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((business, index) => (
        <Reveal key={business.id} delay={index * 0.045}>
          <div className="group relative overflow-hidden rounded-[22px] border border-white/[.06] bg-[#121217] transition hover:-translate-y-1 hover:border-white/[.11]">
            <div className="absolute right-3 top-3 z-10">
              <SaveButton slug={business.slug} />
            </div>
            <Link href={`/businesses/${business.slug}`}>
              <div className={`relative h-32 bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                <div className="echelon-grid absolute inset-0 opacity-25" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[7px] font-semibold text-white/60 backdrop-blur-xl">
                  {business.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[12px] font-semibold text-white/62">{business.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-[7px] text-white/18">
                      <MapPin className="size-2.5" /> {business.suburb}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[8px] font-semibold text-amber-100">
                    <Star className="size-3 fill-current" /> {business.rating}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[.05] pt-3">
                  <span className="flex items-center gap-1 text-[7px] text-emerald-300">
                    <Clock3 className="size-2.5" /> Available today
                  </span>
                  <ArrowRight className="size-3.5 text-white/18 transition group-hover:text-violet-300" />
                </div>
              </div>
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
