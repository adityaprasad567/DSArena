import type { QueueStep } from "./types";

export type QueueOp = { type: "enqueue" | "dequeue"; value?: number };

export function* runQueueOps(ops: QueueOp[]): Generator<QueueStep> {
  const items: number[] = [];
  yield { items: [...items], operation: "idle", description: "Empty queue" };

  for (const op of ops) {
    if (op.type === "enqueue" && op.value !== undefined) {
      items.push(op.value);
      yield {
        items: [...items],
        activeIndex: items.length - 1,
        operation: "enqueue",
        description: `Enqueue ${op.value} at the back`,
      };
    } else if (op.type === "dequeue") {
      const removed = items.shift();
      yield {
        items: [...items],
        activeIndex: 0,
        operation: "dequeue",
        description: removed !== undefined ? `Dequeue ${removed} from the front` : "Queue is empty, nothing to dequeue",
      };
    }
  }
}
