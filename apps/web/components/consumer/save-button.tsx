"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccountStore } from "../../store/account";

/** Heart toggle that persists a business to the user's saved shortlist. */
export function SaveButton({ slug, label = false }: { slug: string; label?: boolean }) {
  const savedSlugs = useAccountStore((state) => state.savedSlugs);
  const toggleSaved = useAccountStore((state) => state.toggleSaved);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = mounted && savedSlugs.includes(slug);

  if (label) {
    return (
      <button
        type="button"
        onClick={() => toggleSaved(slug)}
        aria-pressed={saved}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-[10px] font-semibold transition ${
          saved
            ? "border-rose-400/25 bg-rose-400/10 text-rose-200"
            : "border-white/[.1] bg-white/[.03] text-white/60 hover:text-white/85"
        }`}
      >
        <Heart className={`size-3.5 ${saved ? "fill-current" : ""}`} /> {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleSaved(slug)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save business"}
      className={`grid size-8 place-items-center rounded-full border border-white/10 bg-black/30 backdrop-blur-xl transition hover:bg-black/50 ${
        saved ? "text-rose-300" : "text-white/40"
      }`}
    >
      <Heart className={`size-3.5 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}
