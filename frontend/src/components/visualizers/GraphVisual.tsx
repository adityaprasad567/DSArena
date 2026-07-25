import type { GraphEdge, GraphNode, GraphStep } from "@/algorithms/graph/types";

const SIZE = 320;
const RADIUS = 130;
const CENTER = SIZE / 2;

function nodePosition(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

export function GraphVisual({ step, nodes, edges }: { step: GraphStep; nodes: GraphNode[]; edges: GraphEdge[] }) {
  const positions = new Map(nodes.map((n, i) => [n.id, nodePosition(i, nodes.length)]));

  function nodeState(id: number) {
    if (step.activeId === id) return "active";
    if (step.checkingId === id) return "checking";
    if (step.visited.includes(id)) return "visited";
    if (step.frontier.includes(id)) return "frontier";
    return "default";
  }

  function nodeClass(state: string) {
    switch (state) {
      case "active": return "fill-paper stroke-paper";
      case "checking": return "fill-signal/20 stroke-signal";
      case "visited": return "fill-jade/20 stroke-jade";
      case "frontier": return "fill-signal/10 stroke-signal/60";
      default: return "fill-ink stroke-ink-raised";
    }
  }

  function isActiveEdge(edge: GraphEdge) {
    if (step.activeId === undefined || step.checkingId === undefined) return false;
    return (edge.from === step.activeId && edge.to === step.checkingId) || (edge.to === step.activeId && edge.from === step.checkingId);
  }

  return (
    <div className="flex h-80 items-center justify-center rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      <svg width={SIZE} height={SIZE}>
        {edges.map((edge, i) => {
          const from = positions.get(edge.from)!;
          const to = positions.get(edge.to)!;
          const active = isActiveEdge(edge);
          return (
            <line
              key={i}
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              strokeWidth={active ? 3 : 1.5}
              className={active ? "stroke-signal" : "stroke-ink-raised"}
            />
          );
        })}
        {nodes.map((node) => {
          const pos = positions.get(node.id)!;
          const state = nodeState(node.id);
          return (
            <g key={node.id}>
              <circle cx={pos.x} cy={pos.y} r={20} strokeWidth={2} className={nodeClass(state)} />
              <text x={pos.x} y={pos.y + 5} textAnchor="middle" className={state === "active" ? "fill-ink font-tape text-xs" : "fill-paper font-tape text-xs"}>
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
