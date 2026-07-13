import { ArrowRight, MapPin, Star } from "lucide-react";
import Link from "next/link";
import type { Listing } from "../../lib/listings";
import { getModule } from "../../lib/modules";

/**
 * Presentational card for a single non-services listing. No hooks, so it works
 * in both server (explore hub) and client (module listing grid) trees. Derives
 * its module — accent, verb, icon — from the listing's `module` slug.
 */
export function ListingCard({ listing, showModule = false }: { listing: Listing; showModule?: boolean }) {
  const module = getModule(listing.module);
  if (!module) return null;
  const Icon = module.icon;
  const { accent } = module;

  return (
    <Link
      href={`/explore/${listing.module}/${listing.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[.06] bg-[#121217] transition hover:-translate-y-1 hover:border-white/[.11]"
    >
      <div className={`relative h-28 bg-gradient-to-br ${accent.gradient}`}>
        <div className="echelon-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[7px] font-semibold ${accent.text} backdrop-blur-xl`}
        >
          <Icon className="size-2.5" /> {showModule ? module.name : listing.category}
        </span>
        {listing.price ? (
          <span className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[8px] font-semibold text-white/70 backdrop-blur-xl">
            {listing.price}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-semibold text-white/72">{listing.title}</h3>
            <p className="mt-1 truncate text-[9px] text-white/28">{listing.subtitle}</p>
          </div>
          {listing.rating ? (
            <span className="flex shrink-0 items-center gap-1 text-[9px] font-semibold text-amber-100">
              <Star className="size-3 fill-current" /> {listing.rating}
            </span>
          ) : null}
        </div>

        <p className="mt-1.5 flex items-center gap-1 text-[8px] text-white/22">
          <MapPin className="size-2.5" /> {listing.location}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {listing.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[.055] bg-white/[.02] px-2 py-1 text-[7px] text-white/26"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/[.05] pt-3.5">
          <span className="text-[7px] text-white/20">{listing.posted}</span>
          <span className={`flex items-center gap-1 text-[8px] font-semibold ${accent.text}`}>
            {module.actionVerb} <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
