import type { ReactNode } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  isAtStart: boolean;
  isAtEnd: boolean;
  speed: number;
  stepIndex: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function Controls({
  isPlaying, isAtStart, isAtEnd, speed, stepIndex, totalSteps,
  onPlay, onPause, onNext, onPrev, onReset, onSpeedChange,
}: ControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-ink-raised bg-ink-raised/30 px-5 py-4">
      <div className="flex items-center gap-2">
        <IconButton onClick={onReset} label="Reset"><RotateCcw size={16} /></IconButton>
        <IconButton onClick={onPrev} disabled={isAtStart} label="Previous step"><SkipBack size={16} /></IconButton>
        {isPlaying ? (
          <IconButton onClick={onPause} primary label="Pause"><Pause size={16} /></IconButton>
        ) : (
          <IconButton onClick={onPlay} disabled={isAtEnd} primary label="Play"><Play size={16} /></IconButton>
        )}
        <IconButton onClick={onNext} disabled={isAtEnd} label="Next step"><SkipForward size={16} /></IconButton>
      </div>

      <div className="flex items-center gap-2 font-tape text-xs text-muted">
        <span>speed</span>
        <input
          type="range" min={0.5} max={3} step={0.5} value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-24 accent-signal"
        />
        <span className="w-8">{speed}x</span>
      </div>

      <div className="ml-auto font-tape text-xs text-muted">
        step {stepIndex + 1} / {totalSteps}
      </div>
    </div>
  );
}

function IconButton({
  children, onClick, disabled, primary, label,
}: { children: ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        primary ? "border-signal bg-signal text-ink hover:bg-signal/90" : "border-ink-raised text-paper hover:border-signal"
      }`}
    >
      {children}
    </button>
  );
}
