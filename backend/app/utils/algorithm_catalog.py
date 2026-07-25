"""Static metadata for every visualizer. Not stored in the DB -- it ships with the code
and stays in lockstep with the frontend's algorithm slug constants."""

ALGORITHM_CATALOG = [
    {"slug": "bubble-sort", "name": "Bubble sort", "category": "sorting"},
    {"slug": "merge-sort", "name": "Merge sort", "category": "sorting"},
    {"slug": "quick-sort", "name": "Quick sort", "category": "sorting"},
    {"slug": "linear-search", "name": "Linear search", "category": "searching"},
    {"slug": "binary-search", "name": "Binary search", "category": "searching"},
    {"slug": "bfs", "name": "Breadth-first search", "category": "graph"},
    {"slug": "dfs", "name": "Depth-first search", "category": "graph"},
    {"slug": "stack", "name": "Stack", "category": "structures"},
    {"slug": "queue", "name": "Queue", "category": "structures"},
    {"slug": "linked-list", "name": "Singly linked list", "category": "structures"},
    {"slug": "bst", "name": "Binary search tree", "category": "structures"},
]
