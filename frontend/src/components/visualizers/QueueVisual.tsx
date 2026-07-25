import type { QueueStep } from "@/algorithms/structures/types";

export function QueueVisual({ step }: { step: QueueStep }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <div className="flex w-full items-center justify-between px-2 font-tape text-xs text-muted">
        <span>front</span>
        <span>back</span>
      </div>
      <div className="flex min-h-[56px] flex-wrap items-center gap-1.5">
        {step.items.length === 0 && <span className="font-tape text-sm text-muted">empty</span>}
        {step.items.map((value, index) => (
          <div
            key={index}
            className={`flex h-12 w-12 items-center justify-center rounded border font-tape text-sm transition-colors ${
              step.activeIndex === index ? "border-signal bg-signal/10 text-signal" : "border-ink-raised bg-ink text-paper"
            }`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
