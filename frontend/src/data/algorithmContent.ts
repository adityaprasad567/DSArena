import type { ComplexityData } from "@/components/visualizers/ComplexityPanel";

export interface AlgorithmContent {
  slug: string;
  name: string;
  summary: string;
  complexity: ComplexityData;
  code: string;
}

export const algorithmContent: Record<string, AlgorithmContent> = {
  "bubble-sort": {
    slug: "bubble-sort",
    name: "Bubble sort",
    summary: "Repeatedly steps through the array, swapping adjacent elements that are out of order. Each pass 'bubbles' the largest remaining value to its final position.",
    complexity: {
      best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)",
      applications: ["Teaching sorting fundamentals", "Nearly-sorted small datasets"],
      advantages: ["Simple to implement", "In-place, O(1) extra space", "Stable sort"],
      disadvantages: ["Quadratic time on average", "Impractical for large datasets"],
    },
    code: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  },
  "merge-sort": {
    slug: "merge-sort",
    name: "Merge sort",
    summary: "Divides the array into halves, recursively sorts each half, then merges the sorted halves back together.",
    complexity: {
      best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)",
      applications: ["External sorting (large files)", "Stable sort requirements", "Linked list sorting"],
      advantages: ["Guaranteed O(n log n)", "Stable sort", "Predictable performance"],
      disadvantages: ["O(n) extra space", "Slower than quicksort in practice due to overhead"],
    },
    code: `void merge(std::vector<int>& arr, int lo, int mid, int hi) {
    std::vector<int> left(arr.begin() + lo, arr.begin() + mid);
    std::vector<int> right(arr.begin() + mid, arr.begin() + hi);
    int i = 0, j = 0, k = lo;
    while (i < left.size() && j < right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(std::vector<int>& arr, int lo, int hi) {
    if (hi - lo <= 1) return;
    int mid = (lo + hi) / 2;
    mergeSort(arr, lo, mid);
    mergeSort(arr, mid, hi);
    merge(arr, lo, mid, hi);
}`,
  },
  "quick-sort": {
    slug: "quick-sort",
    name: "Quick sort",
    summary: "Picks a pivot, partitions the array so smaller elements land left and larger ones land right, then recursively sorts each side.",
    complexity: {
      best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)",
      applications: ["General-purpose in-memory sorting", "Standard library sort implementations"],
      advantages: ["Fast in practice", "In-place, low memory overhead"],
      disadvantages: ["O(n²) worst case on already-sorted input", "Not stable"],
    },
    code: `int partition(std::vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[hi]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}`,
  },
  "linear-search": {
    slug: "linear-search",
    name: "Linear search",
    summary: "Checks each element in order until it finds the target or reaches the end of the array.",
    complexity: {
      best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)",
      applications: ["Unsorted data", "Small datasets", "Linked lists (no random access)"],
      advantages: ["Works on unsorted data", "No preprocessing required", "Simple"],
      disadvantages: ["Slow on large datasets", "Doesn't exploit any ordering"],
    },
    code: `int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
  },
  "binary-search": {
    slug: "binary-search",
    name: "Binary search",
    summary: "Repeatedly halves a sorted array's search window by comparing the target to the midpoint value.",
    complexity: {
      best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)",
      applications: ["Sorted arrays and lists", "Finding insertion points", "Search in sorted database indexes"],
      advantages: ["Very fast on large sorted datasets", "Low, constant memory use"],
      disadvantages: ["Requires sorted input", "Sorting cost may outweigh benefit for one-off searches"],
    },
    code: `int binarySearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
  },
  stack: {
    slug: "stack",
    name: "Stack",
    summary: "A last-in-first-out structure: the most recently pushed element is the first one popped.",
    complexity: {
      best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(n)",
      applications: ["Function call stacks / recursion", "Undo history", "Expression evaluation, parentheses matching", "Depth-first search"],
      advantages: ["Constant-time push and pop", "Simple to reason about ordering"],
      disadvantages: ["No random access to middle elements", "Fixed-size array implementations can overflow"],
    },
    code: `class Stack {
    std::vector<int> data;
public:
    void push(int value) { data.push_back(value); }
    void pop() { if (!data.empty()) data.pop_back(); }
    int top() const { return data.back(); }
    bool empty() const { return data.empty(); }
};`,
  },
  queue: {
    slug: "queue",
    name: "Queue",
    summary: "A first-in-first-out structure: the earliest element added is the first one removed.",
    complexity: {
      best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(n)",
      applications: ["Task scheduling", "Breadth-first search", "Buffering (I/O, print queues)", "Rate limiting"],
      advantages: ["Constant-time enqueue and dequeue with the right implementation", "Preserves arrival order"],
      disadvantages: ["No random access to middle elements", "Naive array shifting on dequeue is O(n) without a circular buffer"],
    },
    code: `class Queue {
    std::deque<int> data;
public:
    void enqueue(int value) { data.push_back(value); }
    void dequeue() { if (!data.empty()) data.pop_front(); }
    int front() const { return data.front(); }
    bool empty() const { return data.empty(); }
};`,
  },
  "linked-list": {
    slug: "linked-list",
    name: "Singly linked list",
    summary: "A chain of nodes where each node points to the next -- insertion and deletion don't require shifting elements.",
    complexity: {
      best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(n)",
      applications: ["Implementing stacks/queues", "LRU caches", "Adjacency lists for graphs"],
      advantages: ["O(1) insertion/deletion once you have a pointer to the spot", "No resizing needed as it grows"],
      disadvantages: ["O(n) to reach an arbitrary index", "Extra memory per node for the pointer", "Poor cache locality vs arrays"],
    },
    code: `struct Node {
    int value;
    Node* next;
};

void insertFront(Node*& head, int value) {
    Node* node = new Node{value, head};
    head = node;
}

void deleteValue(Node*& head, int value) {
    Node dummy{0, head};
    Node* prev = &dummy;
    while (prev->next && prev->next->value != value) prev = prev->next;
    if (prev->next) {
        Node* toDelete = prev->next;
        prev->next = toDelete->next;
        delete toDelete;
    }
    head = dummy.next;
}`,
  },
  bst: {
    slug: "bst",
    name: "Binary search tree",
    summary: "Every node's left subtree holds smaller values and its right subtree holds larger ones, so search halves the space at each step.",
    complexity: {
      best: "O(log n)", average: "O(log n)", worst: "O(n)", space: "O(n)",
      applications: ["Ordered maps and sets", "Database indexing (with balancing)", "Range queries"],
      advantages: ["In-order traversal yields sorted output", "Faster than a linked list for search when balanced"],
      disadvantages: ["Degrades to O(n) if inserted in sorted order (unbalanced)", "More complex than a plain array or hash map"],
    },
    code: `struct Node {
    int value;
    Node* left = nullptr;
    Node* right = nullptr;
};

Node* insert(Node* root, int value) {
    if (!root) return new Node{value};
    if (value < root->value) root->left = insert(root->left, value);
    else if (value > root->value) root->right = insert(root->right, value);
    return root;
}

bool search(Node* root, int value) {
    if (!root) return false;
    if (root->value == value) return true;
    return value < root->value ? search(root->left, value) : search(root->right, value);
}`,
  },
  bfs: {
    slug: "bfs",
    name: "Breadth-first search",
    summary: "Explores a graph level by level, visiting every neighbor of a node before moving further out, using a queue to track what's discovered but not yet processed.",
    complexity: {
      best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)",
      applications: ["Shortest path in unweighted graphs", "Web crawlers", "Social network 'degrees of separation'", "Level-order tree traversal"],
      advantages: ["Finds the shortest path in unweighted graphs", "Predictable, level-by-level exploration"],
      disadvantages: ["Higher memory use than DFS for wide graphs (stores a full frontier)", "Doesn't naturally support backtracking-style problems"],
    },
    code: `void bfs(const std::unordered_map<int, std::vector<int>>& adj, int start) {
    std::queue<int> q;
    std::unordered_set<int> discovered;
    q.push(start);
    discovered.insert(start);

    while (!q.empty()) {
        int current = q.front(); q.pop();
        // visit(current);
        for (int neighbor : adj.at(current)) {
            if (!discovered.count(neighbor)) {
                discovered.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`,
  },
  dfs: {
    slug: "dfs",
    name: "Depth-first search",
    summary: "Explores as far as possible down one path before backtracking, using a stack (explicit or via recursion) to remember where to return.",
    complexity: {
      best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)",
      applications: ["Cycle detection", "Topological sorting", "Maze/puzzle solving", "Connected components"],
      advantages: ["Lower memory use than BFS for deep graphs", "Naturally recursive, simple to implement"],
      disadvantages: ["Doesn't find shortest paths", "Can recurse very deep on large graphs (stack overflow risk)"],
    },
    code: `void dfs(const std::unordered_map<int, std::vector<int>>& adj, int current, std::unordered_set<int>& visited) {
    if (visited.count(current)) return;
    visited.insert(current);
    // visit(current);
    for (int neighbor : adj.at(current)) {
        dfs(adj, neighbor, visited);
    }
}`,
  },
};
