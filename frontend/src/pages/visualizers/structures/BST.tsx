import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { runBSTOps, type BSTOp } from "@/algorithms/structures/bstOps";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { BSTVisual } from "@/components/visualizers/BSTVisual";
import { randomBSTScript } from "@/utils/randomOps";

export default function BST() {
  const [script, setScript] = useState<BSTOp[]>(() => randomBSTScript());
  const makeSteps = useCallback(() => runBSTOps(script), [script]);

  return (
    <VisualizerShell
      slug="bst"
      makeSteps={makeSteps}
      visual={(step) => <BSTVisual step={step} />}
      toolbar={
        <button
          onClick={() => setScript(randomBSTScript())}
          className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
        >
          <Shuffle size={14} /> new tree
        </button>
      }
    />
  );
}
