import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/useToast";

export function FavoriteButton({ slug }: { slug: string }) {
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const { showToast } = useToast();

  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-1.5 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
      >
        <Star size={14} /> log in to save
      </Link>
    );
  }

  const active = isFavorite(slug);

  async function handleClick() {
    await toggle(slug);
    showToast(active ? "Removed from favorites" : "Added to favorites", "success");
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 rounded border px-3 py-1.5 font-tape text-xs transition-colors ${
        active ? "border-signal bg-signal/10 text-signal" : "border-ink-raised text-muted hover:border-signal hover:text-paper"
      }`}
    >
      <Star size={14} fill={active ? "currentColor" : "none"} />
      {active ? "favorited" : "favorite"}
    </button>
  );
}
