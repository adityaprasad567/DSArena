import { Link } from "react-router-dom";

const steps = [0, 1, 2, 3, 4, 5, 6, 7];
const activeIndex = 4;

export default function Landing() {
  return (
    <div className="flex flex-col items-center gap-16 py-16 text-center">
      <div>
        <p className="mb-4 font-tape text-sm text-signal">step-by-step, not just a wall of code</p>
        <h1 className="mx-auto max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
          Master data structures &amp; algorithms through interactive visualization
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-muted">
          Ten visualizers, real complexity analysis, and C++ implementations you can step through one comparison at a time.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register" className="rounded bg-signal px-5 py-2.5 font-medium text-ink hover:bg-signal/90">
            Start learning
          </Link>
          <Link to="/sorting" className="rounded border border-ink-raised px-5 py-2.5 hover:border-signal">
            Browse visualizers
          </Link>
        </div>
      </div>

      {/* Signature element: the "step tape" -- a trace of index cells with one active
          comparison, mirroring the actual visualizer UI users will spend time in. */}
      <div className="flex gap-1.5 font-tape text-sm">
        {steps.map((n) => (
          <div
            key={n}
            className={`flex h-11 w-11 items-center justify-center rounded border ${
              n === activeIndex
                ? "border-signal bg-signal/10 text-signal"
                : n < activeIndex
                  ? "border-jade/40 bg-jade/5 text-jade"
                  : "border-ink-raised text-muted"
            }`}
          >
            {n}
          </div>
        ))}
      </div>
      <p className="-mt-10 font-tape text-xs text-muted">comparing index 4 · O(n log n) average</p>
    </div>
  );
}
