import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchFavorites, toggleFavorite as toggleFavoriteRequest } from "@/services/activityService";
import type { Favorite } from "@/types/activity";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      setFavorites(await fetchFavorites());
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    reload();
  }, [reload]);

  const isFavorite = useCallback((slug: string) => favorites.some((f) => f.algorithm_slug === slug), [favorites]);

  async function toggle(slug: string) {
    if (!user) return;
    // optimistic update, corrected by reload if the request fails
    const wasFavorite = isFavorite(slug);
    setFavorites((prev) => (wasFavorite ? prev.filter((f) => f.algorithm_slug !== slug) : prev));
    try {
      const result = await toggleFavoriteRequest(slug);
      await reload();
      return result;
    } catch {
      await reload();
    }
  }

  return { favorites, isLoading, isFavorite, toggle, reload };
}
