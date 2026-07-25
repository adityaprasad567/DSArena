/**
 * Every algorithm generator yields these steps. Visualizer pages don't know
 * anything about bubble sort vs binary search -- they just render whatever the
 * generator yields. This is the piece that makes step mode, play/pause, and
 * speed control work identically across all ten visualizers.
 */
export interface AlgoStep {
  /** Current state of the array to render as bars/cells. */
  array: number[];
  /** Indices currently being compared (highlighted "signal" amber). */
  comparing: number[];
  /** Indices currently being swapped or written. */
  swapping: number[];
  /** Indices confirmed in final position (highlighted "jade"). */
  sorted: number[];
  /** For searching: the index found, if any, on this step. */
  found?: number;
  /** For binary search: the current [lo, hi] window being considered. */
  range?: [number, number];
  /** One-sentence, plain-language description of what's happening on this step. */
  description: string;
}

export type AlgoGenerator = (input: number[], target?: number) => Generator<AlgoStep>;
