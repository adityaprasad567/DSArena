import { CategoryIndex } from "@/components/common/CategoryIndex";

export default function Graph() {
  return (
    <CategoryIndex
      title="Graph"
      description="Traverse the same 8-node demo graph two different ways and compare the resulting order."
      items={[
        { slug: "bfs", name: "Breadth-first search", to: "/graph/bfs" },
        { slug: "dfs", name: "Depth-first search", to: "/graph/dfs" },
      ]}
    />
  );
}
