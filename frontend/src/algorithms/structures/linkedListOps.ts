import type { LinkedListStep, ListNode } from "./types";

export type ListOp = { type: "insert" | "delete"; value: number };

let nextId = 1;

export function* runLinkedListOps(ops: ListOp[]): Generator<LinkedListStep> {
  nextId = 1;
  let nodes: ListNode[] = [];
  yield { nodes: [...nodes], operation: "idle", description: "Empty list" };

  for (const op of ops) {
    if (op.type === "insert") {
      const node = { id: nextId++, value: op.value };
      nodes = [...nodes, node];
      yield {
        nodes: [...nodes],
        activeId: node.id,
        operation: "insert",
        description: `Insert ${op.value} at the tail`,
      };
    } else {
      const target = nodes.find((n) => n.value === op.value);
      if (target) {
        yield { nodes: [...nodes], activeId: target.id, operation: "traverse", description: `Found ${op.value}, unlinking it` };
        nodes = nodes.filter((n) => n.id !== target.id);
        yield { nodes: [...nodes], operation: "delete", description: `Deleted ${op.value}` };
      } else {
        yield { nodes: [...nodes], operation: "delete", description: `${op.value} isn't in the list` };
      }
    }
  }
}
