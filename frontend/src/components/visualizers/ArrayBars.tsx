import type { AlgoStep } from "@/algorithms/types";

const BAR_AREA_HEIGHT = 180; // px -- fixed pixel budget for bar height, avoids
// percentage-height-in-flex-child issues (percentage heights don't resolve
// against an auto-height flex item, so bars were rendering at 0px before).

/** Renders the array as bars, color-coded by role: signal amber = comparing,
 * paper/white = swapping, jade = sorted/found, muted = untouched. Same component
 * used by every sorting and searching page. */
export function ArrayBars({ step }: { step: AlgoStep }) {
  const max = Math.max(...step.array, 1);

  return (
    <div className="flex h-64 items-end gap-1.5 rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      {step.array.map((value, i) => {
        const inRange = !step.range || (i >= step.range[0] && i <= step.range[1]);
        const state =
          step.found === i ? "found" :
          step.comparing.includes(i) ? "comparing" :
          step.swapping.includes(i) ? "swapping" :
          step.sorted.includes(i) ? "sorted" :
          !inRange ? "excluded" : "default";

        const heightPx = Math.max((value / max) * BAR_AREA_HEIGHT, 4);

        return (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div
              className={`w-full rounded-t transition-all duration-200 ${barClass(state)}`}
              style={{ height: `${heightPx}px` }}
            />
            <span className="font-tape text-[10px] text-muted">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

function barClass(state: string) {
  switch (state) {
    case "found": return "bg-jade";
    case "comparing": return "bg-signal";
    case "swapping": return "bg-paper";
    case "sorted": return "bg-jade/70";
    case "excluded": return "bg-ink-raised";
    default: return "bg-muted/40";
  }
}