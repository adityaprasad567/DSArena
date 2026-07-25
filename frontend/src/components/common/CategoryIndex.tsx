import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Item { slug: string; name: string; to: string }

export function CategoryIndex({ title, description, items }: { title: string; description: string; items: Item[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-medium">{title}</h1>
        <p className="mt-1 text-muted">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={item.to}
            className="flex items-center justify-between rounded-xl border border-ink-raised bg-ink-raised/20 p-5 hover:border-signal"
          >
            <span className="font-display font-medium">{item.name}</span>
            <ArrowRight size={16} className="text-muted" />
          </Link>
        ))}
      </div>
    </div>
  );
}
