import { useEffect, useMemo, useRef, useState } from "react";

interface StepBase {
  description: string;
}

/**
 * Runs a generator to completion up front (algorithm inputs here are small --
 * dozens of elements -- so precomputing every step is simpler and cheaper than
 * lazy iteration, and it lets the scrubber jump to any step instantly).
 * Every visualizer page hands this hook a generator and gets back the same
 * play/pause/next/prev/reset/speed controls. Generic over the step type so
 * sorting/searching (AlgoStep) and structures (StackStep, TreeStep, ...) share
 * the exact same state machine.
 */
export function useVisualizer<T extends StepBase>(makeSteps: () => Generator<T>) {
  const steps = useMemo(() => Array.from(makeSteps()), [makeSteps]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x - 3x
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setIndex(0);
    setIsPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700 / speed);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, steps.length]);

  return {
    step: steps[index] ?? steps[steps.length - 1],
    stepIndex: index,
    totalSteps: steps.length,
    isPlaying,
    speed,
    isAtStart: index === 0,
    isAtEnd: index >= steps.length - 1,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    next: () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
    prev: () => setIndex((i) => Math.max(i - 1, 0)),
    reset: () => { setIsPlaying(false); setIndex(0); },
    setSpeed,
    seek: (i: number) => setIndex(Math.max(0, Math.min(i, steps.length - 1))),
  };
}
