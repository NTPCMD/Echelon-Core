"use client";

import { Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { businesses } from "../../lib/seed";
import { defaultSavedSlugs, useAccountStore } from "../../store/account";
import { Reveal } from "../marketing/reveal";

const gradients = [
  "from-violet-500/45 via-indigo-500/20 to-sky-400/25",
  "from-rose-500/38 via-orange-400/18 to-amber-300/24",
  "from-emerald-500/38 via-teal-500/18 to-cyan-400/24",
];

/** Dashboard preview of the saved shortlist, driven by the account store. */
export function SavedShortlist() {
  const savedSlugs = useAccountStore((state) => state.savedSlugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const slugs = mounted ? savedSlugs : defaultSavedSlugs;
  const saved = slugs
    .map((slug) => businesses.find((business) => business.slug === slug))
    .filter((business): business is (typeof businesses)[number] => Boolean(business))
    .slice(0, 3);

  if (saved.length === 0) {
    return (
      <div className="mt-6 grid min-h-36 place-items-center rounded-[22px] border border-dashed border-white/[.075] bg-white/[.012] text-center">
        <p className="text-[9px] text-white/24">Nothing saved yet — tap the heart on any business.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {saved.map((business, index) => (
        <Reveal key={business.id} delay={index * 0.045}>
          <Link
            href={`/businesses/${business.slug}`}
            className="group block overflow-hidden rounded-[22px] border border-white/[.06] bg-[#121217] transition hover:-translate-y-1 hover:border-white/[.11]"
          >
            <div className={`relative h-24 bg-gradient-to-br ${gradients[index % gradients.length]}`}>
              <div className="echelon-grid absolute inset-0 opacity-25" />
              <Heart className="absolute right-3 top-3 size-3.5 fill-rose-300 text-rose-300" />
            </div>
            <div className="p-4">
              <h3 className="truncate text-[11px] font-semibold text-white/58">{business.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[7px] text-white/18">
                  <MapPin className="size-2.5" />
                  {business.suburb}
                </span>
                <span className="flex items-center gap-1 text-[8px] font-semibold text-amber-100">
                  <Star className="size-2.5 fill-current" />
                  {business.rating}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
