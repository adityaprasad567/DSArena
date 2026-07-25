import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { runStackOps, type StackOp } from "@/algorithms/structures/stackOps";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { StackVisual } from "@/components/visualizers/StackVisual";
import { randomStackScript } from "@/utils/randomOps";

export default function Stack() {
  const [script, setScript] = useState<StackOp[]>(() => randomStackScript());
  const makeSteps = useCallback(() => runStackOps(script), [script]);

  return (
    <VisualizerShell
      slug="stack"
      makeSteps={makeSteps}
      visual={(step) => <StackVisual step={step} />}
      toolbar={
        <button
          onClick={() => setScript(randomStackScript())}
          className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
        >
          <Shuffle size={14} /> new sequence
        </button>
      }
    />
  );
}
