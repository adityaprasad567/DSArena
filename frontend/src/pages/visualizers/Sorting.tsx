import { CategoryIndex } from "@/components/common/CategoryIndex";

export default function Sorting() {
  return (
    <CategoryIndex
      title="Sorting"
      description="Watch each algorithm reorder the array one comparison at a time."
      items={[
        { slug: "bubble-sort", name: "Bubble sort", to: "/sorting/bubble-sort" },
        { slug: "merge-sort", name: "Merge sort", to: "/sorting/merge-sort" },
        { slug: "quick-sort", name: "Quick sort", to: "/sorting/quick-sort" },
      ]}
    />
  );
}
