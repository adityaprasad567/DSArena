import type { StackStep } from "@/algorithms/structures/types";

export function StackVisual({ step }: { step: StackStep }) {
  const reversed = [...step.items].map((v, i) => ({ value: v, index: i })).reverse();

  return (
    <div className="flex h-64 flex-col items-center justify-end gap-1 rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <span className="mb-2 font-tape text-xs text-muted">top</span>
      {reversed.length === 0 && <span className="font-tape text-sm text-muted">empty</span>}
      {reversed.map(({ value, index }) => (
        <div
          key={index}
          className={`flex h-10 w-32 items-center justify-center rounded border font-tape text-sm transition-colors ${
            step.activeIndex === index ? "border-signal bg-signal/10 text-signal" : "border-ink-raised bg-ink text-paper"
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}
