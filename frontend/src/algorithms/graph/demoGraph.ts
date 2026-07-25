import type { GraphEdge, GraphNode } from "./types";

/** Fixed 8-node connected graph with one cycle, reused by both BFS and DFS so
 * the two traversal orders are directly comparable on the same structure. */
export const demoNodes: GraphNode[] = [0, 1, 2, 3, 4, 5, 6, 7].map((id) => ({ id, label: String(id) }));

export const demoEdges: GraphEdge[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 },
  { from: 1, to: 3 }, { from: 1, to: 4 },
  { from: 2, to: 5 }, { from: 2, to: 6 },
  { from: 3, to: 7 }, { from: 4, to: 7 },
  { from: 5, to: 6 },
];

export function buildAdjacency(edges: GraphEdge[]): Map<number, number[]> {
  const adjacency = new Map<number, number[]>();
  for (const { from, to } of edges) {
    if (!adjacency.has(from)) adjacency.set(from, []);
    if (!adjacency.has(to)) adjacency.set(to, []);
    adjacency.get(from)!.push(to);
    adjacency.get(to)!.push(from);
  }
  for (const neighbors of adjacency.values()) neighbors.sort((a, b) => a - b);
  return adjacency;
}
