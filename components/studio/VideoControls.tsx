"use client";
import { Loader2, Minus, Plus, Volume2, VolumeX } from "lucide-react";
import { GlassDropdown } from "./GlassDropdown";
import { ModelSelector } from "./ModelSelector";
import { RESOLUTIONS, DURATIONS, QUALITIES, ASPECT_RATIOS } from "@/lib/cinema-data";

const ACCENT = "#D1FE17";

interface VideoControlsProps {
  model:                string;
  resolution:           string;
  duration:             string;
  quality:              string;
  aspectRatio:          string;
  batch:                number;
  sound:                boolean;
  isGenerating:         boolean;
  onModelChange:        (v: string) => void;
  onResolutionChange:   (v: string) => void;
  onDurationChange:     (v: string) => void;
  onQualityChange:      (v: string) => void;
  onAspectRatioChange:  (v: string) => void;
  onBatchChange:        (v: number) => void;
  onSoundToggle:        () => void;
  onGenerate:           () => void;
}

export function VideoControls({
  model, resolution, duration, quality, aspectRatio, batch, sound, isGenerating,
  onModelChange, onResolutionChange, onDurationChange, onQualityChange,
  onAspectRatioChange, onBatchChange, onSoundToggle, onGenerate,
}: VideoControlsProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-2 flex-wrap">
      {/* Model selector */}
      <ModelSelector value={model} onChange={onModelChange} />

      <div className="w-px h-4 bg-white/10 mx-1" />

      {/* Dropdowns */}
      <GlassDropdown value={resolution}  options={RESOLUTIONS}   onChange={onResolutionChange}  />
      <GlassDropdown value={duration}    options={DURATIONS}     onChange={onDurationChange}    />
      <GlassDropdown value={quality}     options={QUALITIES}     onChange={onQualityChange}     />
      <GlassDropdown value={aspectRatio} options={ASPECT_RATIOS} onChange={onAspectRatioChange} />

      <div className="w-px h-4 bg-white/10 mx-1" />

      {/* Batch counter */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onBatchChange(Math.max(1, batch - 1))}
          disabled={batch <= 1}
          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Decrease batch"
        >
          <Minus size={10} className="text-white/60" />
        </button>
        <span className="text-sm font-medium text-white/60 w-5 text-center tabular-nums">
          {batch}
        </span>
        <button
          onClick={() => onBatchChange(Math.min(4, batch + 1))}
          disabled={batch >= 4}
          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Increase batch"
        >
          <Plus size={10} className="text-white/60" />
        </button>
      </div>

      {/* Sound toggle */}
      <button
        onClick={onSoundToggle}
        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        style={{ color: sound ? ACCENT : "rgba(255,255,255,0.25)" }}
        aria-label={sound ? "Mute" : "Unmute"}
        aria-pressed={sound}
      >
        {sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
      </button>

      {/* Push generate right */}
      <div className="flex-1" />

      {/* Generate */}
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        style={{ background: ACCENT, color: "#0a0a0c" }}
      >
        {isGenerating && <Loader2 size={14} className="animate-spin" />}
        {isGenerating ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
