export interface GraphNode { id: number; label: string }
export interface GraphEdge { from: number; to: number }

export interface GraphStep {
  /** Nodes fully processed (all neighbors checked). */
  visited: number[];
  /** Nodes discovered and queued/stacked, but not yet processed. */
  frontier: number[];
  /** Node being dequeued/popped and processed on this step. */
  activeId?: number;
  /** Node currently being checked as a neighbor of activeId. */
  checkingId?: number;
  /** Traversal order so far, for the step description / summary. */
  order: number[];
  description: string;
}
