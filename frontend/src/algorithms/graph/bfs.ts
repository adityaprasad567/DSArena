import type { GraphEdge, GraphStep } from "./types";
import { buildAdjacency } from "./demoGraph";

export function* bfs(edges: GraphEdge[], start: number): Generator<GraphStep> {
  const adjacency = buildAdjacency(edges);
  const visited: number[] = [];
  const order: number[] = [];
  const queue: number[] = [start];
  const discovered = new Set<number>([start]);

  yield { visited: [], frontier: [...queue], order: [], description: `Enqueue start node ${start}` };

  while (queue.length > 0) {
    const current = queue.shift()!;
    yield { visited: [...visited], frontier: [...queue], activeId: current, order: [...order], description: `Dequeue node ${current}, visit it` };
    visited.push(current);
    order.push(current);

    for (const neighbor of adjacency.get(current) ?? []) {
      yield {
        visited: [...visited], frontier: [...queue], activeId: current, checkingId: neighbor, order: [...order],
        description: `Checking neighbor ${neighbor} of ${current}`,
      };
      if (!discovered.has(neighbor)) {
        discovered.add(neighbor);
        queue.push(neighbor);
        yield {
          visited: [...visited], frontier: [...queue], activeId: current, checkingId: neighbor, order: [...order],
          description: `${neighbor} not yet discovered, enqueue it`,
        };
      }
    }
  }

  yield { visited: [...visited], frontier: [], order: [...order], description: `BFS complete. Order: ${order.join(" → ")}` };
}
