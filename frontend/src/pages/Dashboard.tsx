import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Star, History, ArrowRight, Compass } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { Skeleton } from "@/components/common/Skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { algorithmRoutes, algorithmOrder } from "@/data/algorithmRoutes";

export default function Dashboard() {
  const { user } = useAuth();
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const { history, isLoading: historyLoading } = useHistory(5);

  const viewedSlugs = new Set(history.map((h) => h.algorithm_slug));
  const nextUp = algorithmOrder.find((slug) => !viewedSlugs.has(slug)) ?? algorithmOrder[0];
  const nextUpInfo = algorithmRoutes[nextUp];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">Welcome back, {user?.username}</h1>
        <p className="text-muted">Pick up where you left off.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard title="Favorites" icon={<Star size={16} />}>
          {favoritesLoading ? (
            <SkeletonList />
          ) : favorites.length === 0 ? (
            <EmptyState
              icon={<Star size={20} />}
              title="No favorites yet"
              description="Star a visualizer to pin it here."
            />
          ) : (
            <ul className="space-y-2">
              {favorites.map((f) => (
                <AlgorithmLink key={f.id} slug={f.algorithm_slug} />
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard title="Recently viewed" icon={<History size={16} />}>
          {historyLoading ? (
            <SkeletonList />
          ) : history.length === 0 ? (
            <EmptyState
              icon={<History size={20} />}
              title="Nothing viewed yet"
              description="Open any visualizer and it'll show up here."
            />
          ) : (
            <ul className="space-y-2">
              {history.map((h) => (
                <AlgorithmLink key={h.id} slug={h.algorithm_slug} />
              ))}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard title="Continue learning" icon={<Compass size={16} />}>
          <div className="rounded-lg border border-ink-raised bg-ink/40 p-4">
            <p className="font-tape text-xs text-muted">{nextUpInfo.category}</p>
            <p className="mt-1 font-display font-medium">{nextUpInfo.name}</p>
            <Link
              to={nextUpInfo.path}
              className="mt-3 flex items-center gap-1.5 font-tape text-xs text-signal hover:underline"
            >
              start <ArrowRight size={12} />
            </Link>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

function DashboardCard({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-raised bg-ink-raised/30 p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-medium">
        <span className="text-signal">{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

function AlgorithmLink({ slug }: { slug: string }) {
  const info = algorithmRoutes[slug];
  if (!info) return null;
  return (
    <li>
      <Link to={info.path} className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-ink/40">
        <span className="text-sm">{info.name}</span>
        <ArrowRight size={12} className="text-muted" />
      </Link>
    </li>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}
