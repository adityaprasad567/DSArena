import type { GraphEdge, GraphStep } from "./types";
import { buildAdjacency } from "./demoGraph";

export function* dfs(edges: GraphEdge[], start: number): Generator<GraphStep> {
  const adjacency = buildAdjacency(edges);
  const visited: number[] = [];
  const order: number[] = [];
  const stack: number[] = [start];
  const discovered = new Set<number>([start]);

  yield { visited: [], frontier: [...stack], order: [], description: `Push start node ${start} onto the stack` };

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    if (!visited.includes(current)) {
      visited.push(current);
      order.push(current);
      yield { visited: [...visited], frontier: [...stack], activeId: current, order: [...order], description: `Visit node ${current}` };
    }

    const neighbors = adjacency.get(current) ?? [];
    const next = neighbors.find((n) => !discovered.has(n));

    if (next !== undefined) {
      yield {
        visited: [...visited], frontier: [...stack], activeId: current, checkingId: next, order: [...order],
        description: `Checking neighbor ${next} of ${current}`,
      };
      discovered.add(next);
      stack.push(next);
      yield {
        visited: [...visited], frontier: [...stack], activeId: current, checkingId: next, order: [...order],
        description: `${next} not yet visited, push it and descend`,
      };
    } else {
      stack.pop();
      yield {
        visited: [...visited], frontier: [...stack], activeId: current, order: [...order],
        description: `${current} has no unvisited neighbors left, backtrack`,
      };
    }
  }

  yield { visited: [...visited], frontier: [], order: [...order], description: `DFS complete. Order: ${order.join(" → ")}` };
}
