import type { BSTStep, TreeNode } from "@/algorithms/structures/types";

interface Positioned extends TreeNode { x: number; y: number }

/** In-order x position (spreads leaves evenly left-to-right), depth-based y.
 * Simple and legible at the small tree sizes this demo builds. */
function layout(nodes: TreeNode[], rootId: number | null): Positioned[] {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const positioned = new Map<number, Positioned>();
  let counter = 0;

  function visit(id: number | null, depth: number) {
    if (id === null) return;
    const node = byId.get(id);
    if (!node) return;
    visit(node.left, depth + 1);
    positioned.set(id, { ...node, x: counter * 70 + 40, y: depth * 70 + 30 });
    counter++;
    visit(node.right, depth + 1);
  }
  visit(rootId, 0);
  return [...positioned.values()];
}

export function BSTVisual({ step }: { step: BSTStep }) {
  const positioned = layout(step.nodes, step.rootId);
  const byId = new Map(positioned.map((n) => [n.id, n]));
  const width = Math.max(positioned.length * 70 + 40, 300);
  const height = Math.max(...positioned.map((n) => n.y), 0) + 70;

  return (
    <div className="flex h-64 items-center justify-center overflow-x-auto rounded-xl border border-ink-raised bg-ink-raised/20 p-6">
      {positioned.length === 0 ? (
        <span className="font-tape text-sm text-muted">empty tree</span>
      ) : (
        <svg width={width} height={height} className="overflow-visible">
          {positioned.map((node) =>
            [node.left, node.right].map((childId) => {
              if (childId === null) return null;
              const child = byId.get(childId);
              if (!child) return null;
              return (
                <line
                  key={`${node.id}-${childId}`}
                  x1={node.x} y1={node.y} x2={child.x} y2={child.y}
                  strokeWidth={2}
                  className="stroke-ink-raised"
                />
              );
            }),
          )}
          {positioned.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x} cy={node.y} r={20}
                className={step.activeId === node.id ? "fill-signal/10 stroke-signal" : "fill-ink stroke-ink-raised"}
                strokeWidth={2}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" className="fill-paper font-tape text-xs">
                {node.value}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
