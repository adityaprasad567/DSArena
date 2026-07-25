/** Maps each algorithm slug to its route and category -- used by the dashboard
 * to link favorites/history entries and to pick a "continue learning" suggestion. */
export const algorithmRoutes: Record<string, { name: string; path: string; category: string }> = {
  "bubble-sort": { name: "Bubble sort", path: "/sorting/bubble-sort", category: "Sorting" },
  "merge-sort": { name: "Merge sort", path: "/sorting/merge-sort", category: "Sorting" },
  "quick-sort": { name: "Quick sort", path: "/sorting/quick-sort", category: "Sorting" },
  "linear-search": { name: "Linear search", path: "/searching/linear-search", category: "Searching" },
  "binary-search": { name: "Binary search", path: "/searching/binary-search", category: "Searching" },
  bfs: { name: "Breadth-first search", path: "/graph/bfs", category: "Graph" },
  dfs: { name: "Depth-first search", path: "/graph/dfs", category: "Graph" },
  stack: { name: "Stack", path: "/structures/stack", category: "Structures" },
  queue: { name: "Queue", path: "/structures/queue", category: "Structures" },
  "linked-list": { name: "Linked list", path: "/structures/linked-list", category: "Structures" },
  bst: { name: "Binary search tree", path: "/structures/bst", category: "Structures" },
};

export const algorithmOrder = Object.keys(algorithmRoutes);
