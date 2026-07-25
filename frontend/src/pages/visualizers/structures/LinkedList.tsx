import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { runLinkedListOps, type ListOp } from "@/algorithms/structures/linkedListOps";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { LinkedListVisual } from "@/components/visualizers/LinkedListVisual";
import { randomListScript } from "@/utils/randomOps";

export default function LinkedList() {
  const [script, setScript] = useState<ListOp[]>(() => randomListScript());
  const makeSteps = useCallback(() => runLinkedListOps(script), [script]);

  return (
    <VisualizerShell
      slug="linked-list"
      makeSteps={makeSteps}
      visual={(step) => <LinkedListVisual step={step} />}
      toolbar={
        <button
          onClick={() => setScript(randomListScript())}
          className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
        >
          <Shuffle size={14} /> new sequence
        </button>
      }
    />
  );
}
