import type { ReactNode } from "react";

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-ink-raised py-10 text-center">
      {icon && <div className="text-muted">{icon}</div>}
      <p className="font-display text-sm font-medium">{title}</p>
      <p className="max-w-xs text-xs text-muted">{description}</p>
      {action}
    </div>
  );
}
