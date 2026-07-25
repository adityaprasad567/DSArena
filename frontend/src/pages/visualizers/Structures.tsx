import { CategoryIndex } from "@/components/common/CategoryIndex";

export default function Structures() {
  return (
    <CategoryIndex
      title="Data structures"
      description="Build and mutate each structure through a scripted operation sequence."
      items={[
        { slug: "stack", name: "Stack", to: "/structures/stack" },
        { slug: "queue", name: "Queue", to: "/structures/queue" },
        { slug: "linked-list", name: "Linked list", to: "/structures/linked-list" },
        { slug: "bst", name: "Binary search tree", to: "/structures/bst" },
      ]}
    />
  );
}
