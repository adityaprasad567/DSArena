import { api } from "./api";
import type { Favorite, HistoryEntry } from "@/types/activity";

export async function fetchFavorites(): Promise<Favorite[]> {
  const { data } = await api.get<Favorite[]>("/favorites");
  return data;
}

/** Toggles: adds the favorite if absent, removes it if present.
 * Returns the created row, or null if this call removed it. */
export async function toggleFavorite(algorithmSlug: string): Promise<Favorite | null> {
  const { data } = await api.post<Favorite | null>("/favorite", { algorithm_slug: algorithmSlug });
  return data;
}

export async function fetchHistory(limit = 10): Promise<HistoryEntry[]> {
  const { data } = await api.get<HistoryEntry[]>("/history", { params: { limit } });
  return data;
}

export async function recordHistory(algorithmSlug: string): Promise<HistoryEntry> {
  const { data } = await api.post<HistoryEntry>("/history", { algorithm_slug: algorithmSlug });
  return data;
}
