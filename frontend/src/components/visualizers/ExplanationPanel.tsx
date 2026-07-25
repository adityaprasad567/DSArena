export function ExplanationPanel({ description, summary }: { description: string; summary: string }) {
  return (
    <div className="rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <h3 className="mb-2 font-display text-sm font-medium text-muted">What's happening</h3>
      <p className="font-tape text-sm text-signal">{description}</p>
      <p className="mt-4 text-sm text-muted">{summary}</p>
    </div>
  );
}
