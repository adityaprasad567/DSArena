import { CategoryIndex } from "@/components/common/CategoryIndex";

export default function Searching() {
  return (
    <CategoryIndex
      title="Searching"
      description="Find a target value and see exactly which elements get checked."
      items={[
        { slug: "linear-search", name: "Linear search", to: "/searching/linear-search" },
        { slug: "binary-search", name: "Binary search", to: "/searching/binary-search" },
      ]}
    />
  );
}
