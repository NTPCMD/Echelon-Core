"use client";
import { create } from "zustand";
import type { AiSearchResult, Business } from "@echelon/types";

export interface SearchState {
  query: string;
  setQuery: (q: string) => void;
  results: (AiSearchResult & { businesses: Business[] }) | null;
  setResults: (r: (AiSearchResult & { businesses: Business[] }) | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  results: null,
  setResults: (results) => set({ results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));
