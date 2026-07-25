import { useCallback, useState } from "react";
import { dfs } from "@/algorithms/graph/dfs";
import { demoEdges, demoNodes } from "@/algorithms/graph/demoGraph";
import { VisualizerShell } from "@/components/visualizers/VisualizerShell";
import { GraphVisual } from "@/components/visualizers/GraphVisual";

export default function DFS() {
  const [start, setStart] = useState(0);
  const makeSteps = useCallback(() => dfs(demoEdges, start), [start]);

  return (
    <VisualizerShell
      slug="dfs"
      makeSteps={makeSteps}
      visual={(step) => <GraphVisual step={step} nodes={demoNodes} edges={demoEdges} />}
      toolbar={
        <label className="flex items-center gap-2 font-tape text-xs text-muted">
          start node
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="rounded border border-ink-raised bg-ink px-2 py-1 text-paper outline-none focus:border-signal"
          >
            {demoNodes.map((n) => (
              <option key={n.id} value={n.id}>{n.label}</option>
            ))}
          </select>
        </label>
      }
    />
  );
}
