"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useSearchStore } from "../store/search";
export function AiSearch() { const { query, setQuery } = useSearchStore(); return <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass mx-auto flex max-w-3xl items-center gap-3 rounded-full p-2"><Search className="ml-4 size-5 text-brand"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Book a haircut tomorrow, find a DJ, massage near me..." className="min-w-0 flex-1 bg-transparent px-2 py-4 outline-none"/><button className="rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white dark:bg-white dark:text-ink">Ask Echelon</button></motion.form>; }
