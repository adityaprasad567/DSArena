import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchHistory, recordHistory } from "@/services/activityService";
import type { HistoryEntry } from "@/types/activity";

export function useHistory(limit = 10) {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!user) {
      setHistory([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      setHistory(await fetchHistory(limit));
    } finally {
      setIsLoading(false);
    }
  }, [user, limit]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { history, isLoading, reload };
}

/** Fire-and-forget: records a view without blocking the visualizer page on the request. */
export function useRecordView(slug: string) {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    recordHistory(slug).catch(() => {
      /* non-critical -- a missed history entry shouldn't interrupt the visualizer */
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, slug]);
}
