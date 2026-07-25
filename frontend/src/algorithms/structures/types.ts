export interface StackStep {
  items: number[];
  activeIndex?: number;
  operation: "push" | "pop" | "peek" | "idle";
  description: string;
}

export interface QueueStep {
  items: number[];
  activeIndex?: number;
  operation: "enqueue" | "dequeue" | "idle";
  description: string;
}

export interface ListNode { id: number; value: number }
export interface LinkedListStep {
  nodes: ListNode[];
  activeId?: number;
  operation: "insert" | "delete" | "traverse" | "idle";
  description: string;
}

export interface TreeNode { id: number; value: number; left: number | null; right: number | null }
export interface BSTStep {
  nodes: TreeNode[];
  rootId: number | null;
  activeId?: number;
  operation: "insert" | "search" | "found" | "not-found" | "idle";
  description: string;
}
