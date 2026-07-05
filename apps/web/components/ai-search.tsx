"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { Business } from "@echelon/types";
import { chat } from "../lib/api";
import { useSearchStore } from "../store/search";

export function AiSearch() {
  const { query, setQuery } = useSearchStore();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex items-center gap-3 rounded-full p-2"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!query.trim()) return;
          setIsLoading(true);
          try {
            const result = await chat(query);
            setBusinesses(result.businesses);
            setMessage(result.message);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <Search className="ml-4 size-5 text-brand" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Book a haircut tomorrow, find a DJ, massage near me..." className="min-w-0 flex-1 bg-transparent px-2 py-4 outline-none" />
        <button className="rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white dark:bg-white dark:text-ink">{isLoading ? "Searching" : "Ask Echelon"}</button>
      </motion.form>
      {message ? <p className="mt-4 text-sm text-black/60 dark:text-white/60">{message}</p> : null}
      {businesses.length > 0 ? <div className="mt-4 grid gap-3 text-left">{businesses.map((business) => <a className="rounded-2xl bg-white p-4 shadow-sm dark:bg-white/10" href={`/businesses/${business.slug}`} key={business.id}>{business.name} · {business.category} · {business.suburb}</a>)}</div> : null}
    </div>
  );
}
