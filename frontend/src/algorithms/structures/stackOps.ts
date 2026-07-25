import type { StackStep } from "./types";

export type StackOp = { type: "push" | "pop"; value?: number };

/** Replays a scripted sequence of push/pop operations, yielding one step per
 * operation so the shell's Controls (play/pause/step) work exactly like they
 * do for sorting -- just over structure operations instead of comparisons. */
export function* runStackOps(ops: StackOp[]): Generator<StackStep> {
  const items: number[] = [];
  yield { items: [...items], operation: "idle", description: "Empty stack" };

  for (const op of ops) {
    if (op.type === "push" && op.value !== undefined) {
      items.push(op.value);
      yield {
        items: [...items],
        activeIndex: items.length - 1,
        operation: "push",
        description: `Push ${op.value} -- it becomes the new top`,
      };
    } else if (op.type === "pop") {
      const popped = items.pop();
      yield {
        items: [...items],
        activeIndex: items.length,
        operation: "pop",
        description: popped !== undefined ? `Pop ${popped} off the top` : "Stack is empty, nothing to pop",
      };
    }
  }
}
