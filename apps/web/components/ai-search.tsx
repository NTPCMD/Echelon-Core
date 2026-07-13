"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, X, Star, Clock, MapPin } from "lucide-react";
import { useSearchStore } from "../store/search";
import Link from "next/link";
import type { FormEvent } from "react";

const SUGGESTIONS = [
  "I need a DJ for my wedding",
  "Book a haircut tomorrow",
  "Find me a marketing job",
  "Reserve dinner for six tonight",
  "Find networking events this weekend",
  "I need someone to build my website",
];

function formatPrice(cents: number) {
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(0)}`;
}

export function AiSearch() {
  const { query, setQuery, results, setResults, loading, setLoading, error, setError } = useSearchStore();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      });
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSuggestion(s: string) {
    setQuery(s);
    setResults(null);
  }

  function clearResults() {
    setResults(null);
    setQuery("");
    setError(null);
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-[22px] border border-white/[.09] bg-[#131319]/92 p-2.5 shadow-[0_24px_90px_rgba(0,0,0,.42),0_0_70px_rgba(108,92,231,.08),inset_0_1px_0_rgba(255,255,255,.04)] backdrop-blur-2xl transition focus-within:border-violet-400/30 focus-within:shadow-[0_28px_100px_rgba(0,0,0,.48),0_0_80px_rgba(108,92,231,.13)]"
      >
        {loading ? (
          <Loader2 className="ml-2 size-5 animate-spin text-violet-300 sm:ml-3" />
        ) : (
          <Search className="ml-2 size-5 text-violet-300 sm:ml-3" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Book a haircut tomorrow, find a DJ, massage near me…"
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-[12px] text-white/78 outline-none placeholder:text-white/22 sm:py-4 sm:text-[14px]"
        />
        {(query || results) && (
          <button
            type="button"
            onClick={clearResults}
            className="rounded-xl p-2 text-white/24 transition hover:bg-white/[.05] hover:text-white/65"
          >
            <X className="size-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="h-11 shrink-0 rounded-[14px] border border-violet-400/20 bg-gradient-to-b from-[#7c6cf8] to-[#6354dd] px-4 text-[10px] font-semibold text-white shadow-[0_12px_32px_rgba(108,92,231,.22)] transition hover:-translate-y-px disabled:translate-y-0 disabled:opacity-35 sm:h-12 sm:px-6 sm:text-[11px]"
        >
          Ask Echelon
        </button>
      </motion.form>

      <AnimatePresence>
        {!results && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/[.065] bg-white/[.025] px-3 py-1.5 text-[8px] text-white/26 backdrop-blur transition hover:border-violet-400/15 hover:bg-violet-400/[.05] hover:text-white/55 sm:px-4 sm:py-2 sm:text-[9px]"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 overflow-hidden rounded-[22px] border border-white/[.09] bg-[#131319]/95 shadow-[0_28px_100px_rgba(0,0,0,.48)] backdrop-blur-2xl"
          >
            <div className="border-b border-black/5 px-6 py-4 dark:border-white/5">
              <p className="text-[11px] font-medium text-white/72">{results.message}</p>
              {results.category && (
                <p className="mt-1 text-[8px] text-white/25">
                  {results.intent === "book_service" ? "Ready to book" : "Browsing"} · {results.category}
                  {results.location ? ` · ${results.location}` : ""}
                </p>
              )}
            </div>

            {results.businesses.length === 0 ? (
              <p className="px-6 py-8 text-center text-[10px] text-white/28">
                No businesses found. Try a different search.
              </p>
            ) : (
              <ul className="divide-y divide-black/5 dark:divide-white/5">
                {results.businesses.map((biz) => (
                  <li key={biz.id}>
                    <Link
                      href={`/businesses/${biz.slug}`}
                      className="flex items-center gap-4 px-5 py-4 transition hover:bg-violet-400/[.045] sm:px-6"
                    >
                      <div className="size-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-violet-500/70 to-indigo-300/50 ring-1 ring-white/10" />
                      <div className="flex-1 text-left">
                        <p className="text-[10px] font-semibold text-white/68">{biz.name}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-[8px] text-white/24">
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {biz.suburb}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="size-3 fill-current text-amber-400" />
                            {biz.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {biz.services[0]?.durationMinutes} min
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold text-white/62">
                          {formatPrice(biz.services[0]?.priceCents ?? 0)}
                        </p>
                        <p className="mt-1 text-[8px] text-violet-300">Book now →</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
