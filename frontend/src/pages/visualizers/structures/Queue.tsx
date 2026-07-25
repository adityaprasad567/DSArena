import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { runQueueOps, type QueueOp } from "@/algorithms/structures/queueOps";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { QueueVisual } from "@/components/visualizers/QueueVisual";
import { randomQueueScript } from "@/utils/randomOps";

export default function Queue() {
  const [script, setScript] = useState<QueueOp[]>(() => randomQueueScript());
  const makeSteps = useCallback(() => runQueueOps(script), [script]);

  return (
    <VisualizerShell
      slug="queue"
      makeSteps={makeSteps}
      visual={(step) => <QueueVisual step={step} />}
      toolbar={
        <button
          onClick={() => setScript(randomQueueScript())}
          className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
        >
          <Shuffle size={14} /> new sequence
        </button>
      }
    />
  );
}
