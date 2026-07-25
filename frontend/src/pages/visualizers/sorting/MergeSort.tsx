import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { mergeSort } from "@/algorithms/sorting/mergeSort";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { ArrayBars } from "@/components/visualizers/ArrayBars";
import { randomArray } from "@/utils/randomArray";

export default function MergeSort() {
  const [array, setArray] = useState(() => randomArray());
  const makeSteps = useCallback(() => mergeSort(array), [array]);

  return (
    <VisualizerShell
      slug="merge-sort"
      makeSteps={makeSteps}
      visual={(step) => <ArrayBars step={step} />}
      toolbar={
        <button
          onClick={() => setArray(randomArray())}
          className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper"
        >
          <Shuffle size={14} /> new array
        </button>
      }
    />
  );
}
