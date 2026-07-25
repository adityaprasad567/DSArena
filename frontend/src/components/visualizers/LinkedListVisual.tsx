import { ArrowRight } from "lucide-react";
import type { LinkedListStep } from "@/algorithms/structures/types";

export function LinkedListVisual({ step }: { step: LinkedListStep }) {
  return (
    <div className="flex h-64 items-center gap-2 overflow-x-auto rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <span className="shrink-0 font-tape text-xs text-muted">head</span>
      <ArrowRight size={16} className="shrink-0 text-muted" />
      {step.nodes.length === 0 && <span className="font-tape text-sm text-muted">empty list</span>}
      {step.nodes.map((node, i) => (
        <div key={node.id} className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-12 w-16 items-center justify-center rounded border font-tape text-sm transition-colors ${
              step.activeId === node.id ? "border-signal bg-signal/10 text-signal" : "border-ink-raised bg-ink text-paper"
            }`}
          >
            {node.value}
          </div>
          {i < step.nodes.length - 1 && <ArrowRight size={16} className="text-muted" />}
        </div>
      ))}
      {step.nodes.length > 0 && (
        <>
          <ArrowRight size={16} className="shrink-0 text-muted" />
          <span className="shrink-0 font-tape text-xs text-muted">null</span>
        </>
      )}
    </div>
  );
}
