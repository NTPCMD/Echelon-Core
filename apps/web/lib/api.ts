import type { AiSearchResult, Business } from "@echelon/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${API_URL}${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  return response.json() as Promise<T>;
}

export const getBusinesses = () => apiFetch<Business[]>("/businesses");
export const getBusiness = (id: string) => apiFetch<Business | null>(`/businesses/${id}`);
export const chat = (message: string, location?: string) => apiFetch<AiSearchResult & { businesses: Business[] }>("/chat", { method: "POST", body: JSON.stringify({ message, location }) });
