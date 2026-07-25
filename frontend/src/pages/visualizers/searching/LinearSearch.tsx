import { useCallback, useState } from "react";
import { Shuffle } from "lucide-react";
import { linearSearch } from "@/algorithms/searching/linearSearch";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { ArrayBars } from "@/components/visualizers/ArrayBars";
import { randomArray } from "@/utils/randomArray";

export default function LinearSearch() {
  const [array, setArray] = useState(() => randomArray());
  const [target, setTarget] = useState(() => array[Math.floor(Math.random() * array.length)]);
  const makeSteps = useCallback(() => linearSearch(array, target), [array, target]);

  function regenerate() {
    const next = randomArray();
    setArray(next);
    setTarget(next[Math.floor(Math.random() * next.length)]);
  }

  return (
    <VisualizerShell
      slug="linear-search"
      makeSteps={makeSteps}
      visual={(step) => <ArrayBars step={step} />}
      toolbar={
        <div className="flex items-center gap-3">
          <button onClick={regenerate} className="flex items-center gap-2 rounded border border-ink-raised px-3 py-1.5 font-tape text-xs text-muted hover:border-signal hover:text-paper">
            <Shuffle size={14} /> new array
          </button>
          <label className="flex items-center gap-2 font-tape text-xs text-muted">
            target
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-20 rounded border border-ink-raised bg-ink px-2 py-1 text-paper outline-none focus:border-signal"
            />
          </label>
        </div>
      }
    />
  );
}
