import type { ReactNode } from "react";
import { useVisualizer } from "@/hooks/useVisualizer";
import { useRecordView } from "@/hooks/useHistory";
import { algorithmContent } from "@/data/algorithmContent";
import { Controls } from "./Controls";
import { ComplexityPanel } from "./ComplexityPanel";
import { CodePanel } from "./CodePanel";
import { ExplanationPanel } from "./ExplanationPanel";
import { FavoriteButton } from "./FavoriteButton";

interface StepBase { description: string }

interface VisualizerShellProps<T extends StepBase> {
  slug: keyof typeof algorithmContent;
  makeSteps: () => Generator<T>;
  /** Renders the current step -- bars for sorting/searching, a stack/tree/list/graph
   * drawing for structures and graph traversal. This is the one piece that differs
   * per visualizer; everything else (controls, complexity, code, explanation) is shared. */
  visual: (step: T) => ReactNode;
  /** Optional controls above the visual (e.g. "regenerate array", search target input). */
  toolbar?: ReactNode;
}

export function VisualizerShell<T extends StepBase>({ slug, makeSteps, visual, toolbar }: VisualizerShellProps<T>) {
  const content = algorithmContent[slug];
  const vis = useVisualizer(makeSteps);
  useRecordView(slug);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium">{content.name}</h1>
          <p className="mt-1 max-w-2xl text-muted">{content.summary}</p>
        </div>
        <FavoriteButton slug={slug} />
      </div>

      {toolbar}

      {visual(vis.step)}

      <Controls
        isPlaying={vis.isPlaying}
        isAtStart={vis.isAtStart}
        isAtEnd={vis.isAtEnd}
        speed={vis.speed}
        stepIndex={vis.stepIndex}
        totalSteps={vis.totalSteps}
        onPlay={vis.play}
        onPause={vis.pause}
        onNext={vis.next}
        onPrev={vis.prev}
        onReset={vis.reset}
        onSpeedChange={vis.setSpeed}
      />

      <ExplanationPanel description={vis.step.description} summary={content.summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ComplexityPanel data={content.complexity} />
        <CodePanel code={content.code} />
      </div>
    </div>
  );
}
