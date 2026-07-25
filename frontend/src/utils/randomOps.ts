import type { StackOp } from "@/algorithms/structures/stackOps";
import type { QueueOp } from "@/algorithms/structures/queueOps";
import type { ListOp } from "@/algorithms/structures/linkedListOps";
import type { BSTOp } from "@/algorithms/structures/bstOps";

function randVal(max = 99) {
  return Math.floor(Math.random() * max) + 1;
}

export function randomStackScript(count = 6): StackOp[] {
  const ops: StackOp[] = [];
  for (let i = 0; i < count; i++) {
    ops.push(Math.random() < 0.7 || i < 2 ? { type: "push", value: randVal() } : { type: "pop" });
  }
  return ops;
}

export function randomQueueScript(count = 6): QueueOp[] {
  const ops: QueueOp[] = [];
  for (let i = 0; i < count; i++) {
    ops.push(Math.random() < 0.7 || i < 2 ? { type: "enqueue", value: randVal() } : { type: "dequeue" });
  }
  return ops;
}

export function randomListScript(count = 5): ListOp[] {
  const values: number[] = [];
  const ops: ListOp[] = [];
  for (let i = 0; i < count; i++) {
    const value = randVal();
    values.push(value);
    ops.push({ type: "insert", value });
  }
  if (values.length > 1) {
    ops.push({ type: "delete", value: values[Math.floor(Math.random() * values.length)] });
  }
  return ops;
}

export function randomBSTScript(count = 7): BSTOp[] {
  const values = new Set<number>();
  while (values.size < count) values.add(randVal(50));
  const ops: BSTOp[] = [...values].map((value) => ({ type: "insert" as const, value }));
  ops.push({ type: "search", value: [...values][Math.floor(Math.random() * values.size)] });
  return ops;
}
