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
    <div className="mx-auto w-full max-w-3xl">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass flex items-center gap-3 rounded-full p-2"
      >
        {loading ? (
          <Loader2 className="ml-4 size-5 animate-spin text-brand" />
        ) : (
          <Search className="ml-4 size-5 text-brand" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Book a haircut tomorrow, find a DJ, massage near me…"
          className="min-w-0 flex-1 bg-transparent px-2 py-4 text-base outline-none placeholder:text-black/40 dark:placeholder:text-white/30"
        />
        {(query || results) && (
          <button
            type="button"
            onClick={clearResults}
            className="rounded-full p-2 text-black/40 hover:text-black dark:text-white/30 dark:hover:text-white"
          >
            <X className="size-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition disabled:opacity-50 dark:bg-white dark:text-ink"
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
                className="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs text-black/60 backdrop-blur transition hover:bg-white hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
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
            className="mt-4 overflow-hidden rounded-3xl border border-white/50 bg-white/90 shadow-glow backdrop-blur dark:border-white/10 dark:bg-white/5"
          >
            <div className="border-b border-black/5 px-6 py-4 dark:border-white/5">
              <p className="text-sm font-medium text-ink dark:text-white">{results.message}</p>
              {results.category && (
                <p className="mt-0.5 text-xs text-black/50 dark:text-white/40">
                  {results.intent === "book_service" ? "Ready to book" : "Browsing"} · {results.category}
                  {results.location ? ` · ${results.location}` : ""}
                </p>
              )}
            </div>

            {results.businesses.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-black/40 dark:text-white/30">
                No businesses found. Try a different search.
              </p>
            ) : (
              <ul className="divide-y divide-black/5 dark:divide-white/5">
                {results.businesses.map((biz) => (
                  <li key={biz.id}>
                    <Link
                      href={`/businesses/${biz.slug}`}
                      className="flex items-center gap-4 px-6 py-4 transition hover:bg-brand/5"
                    >
                      <div className="size-12 flex-shrink-0 rounded-2xl bg-gradient-to-br from-brand to-rose-300" />
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-ink dark:text-white">{biz.name}</p>
                        <div className="mt-0.5 flex items-center gap-3 text-xs text-black/50 dark:text-white/40">
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
                        <p className="text-sm font-semibold text-ink dark:text-white">
                          {formatPrice(biz.services[0]?.priceCents ?? 0)}
                        </p>
                        <p className="text-xs text-brand">Book now →</p>
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
