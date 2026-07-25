import type { BSTStep, TreeNode } from "./types";

export type BSTOp = { type: "insert" | "search"; value: number };

export function* runBSTOps(ops: BSTOp[]): Generator<BSTStep> {
  const nodes: TreeNode[] = [];
  let rootId: number | null = null;
  let nextId = 1;

  yield { nodes: [...nodes], rootId, operation: "idle", description: "Empty tree" };

  for (const op of ops) {
    if (op.type === "insert") {
      if (rootId === null) {
        const node = { id: nextId++, value: op.value, left: null, right: null };
        nodes.push(node);
        rootId = node.id;
        yield { nodes: [...nodes], rootId, activeId: node.id, operation: "insert", description: `${op.value} becomes the root` };
        continue;
      }
      let currentId = rootId;
      while (true) {
        const current = nodes.find((n) => n.id === currentId)!;
        yield { nodes: [...nodes], rootId, activeId: current.id, operation: "search", description: `Comparing ${op.value} to ${current.value}` };
        if (op.value < current.value) {
          if (current.left === null) {
            const node = { id: nextId++, value: op.value, left: null, right: null };
            nodes.push(node);
            current.left = node.id;
            yield { nodes: [...nodes], rootId, activeId: node.id, operation: "insert", description: `${op.value} < ${current.value}, inserted as left child` };
            break;
          }
          currentId = current.left;
        } else if (op.value > current.value) {
          if (current.right === null) {
            const node = { id: nextId++, value: op.value, left: null, right: null };
            nodes.push(node);
            current.right = node.id;
            yield { nodes: [...nodes], rootId, activeId: node.id, operation: "insert", description: `${op.value} > ${current.value}, inserted as right child` };
            break;
          }
          currentId = current.right;
        } else {
          yield { nodes: [...nodes], rootId, activeId: current.id, operation: "insert", description: `${op.value} already exists, skipping` };
          break;
        }
      }
    } else {
      let currentId = rootId;
      let found = false;
      while (currentId !== null) {
        const current = nodes.find((n) => n.id === currentId)!;
        yield { nodes: [...nodes], rootId, activeId: current.id, operation: "search", description: `Comparing ${op.value} to ${current.value}` };
        if (op.value === current.value) { found = true; break; }
        currentId = op.value < current.value ? current.left : current.right;
      }
      yield {
        nodes: [...nodes], rootId,
        activeId: found ? currentId! : undefined,
        operation: found ? "found" : "not-found",
        description: found ? `Found ${op.value}` : `${op.value} is not in the tree`,
      };
    }
  }
}
