"use client";
import { AtSign, ImageIcon, Plus, UserCircle } from "lucide-react";
import { CameraControls } from "./CameraControls";
import { VideoControls }  from "./VideoControls";

const GLASS_BG     = "rgba(35,38,42,0.75)";
const GLASS_BORDER = "rgba(217,217,217,0.04)";

export interface ComposerState {
  prompt:      string;
  genre:       string;
  style:       string;
  camera:      string;
  model:       string;
  resolution:  string;
  duration:    string;
  quality:     string;
  aspectRatio: string;
  batch:       number;
  sound:       boolean;
}

interface GenerateComposerProps {
  state:        ComposerState;
  onChange:     (updates: Partial<ComposerState>) => void;
  onGenerate:   () => void;
  isGenerating: boolean;
}

export function GenerateComposer({
  state,
  onChange,
  onGenerate,
  isGenerating,
}: GenerateComposerProps) {
  const set = (updates: Partial<ComposerState>) => onChange(updates);

  return (
    <div
      className="rounded-[24px] border overflow-hidden"
      style={{
        background:               GLASS_BG,
        borderColor:              GLASS_BORDER,
        backdropFilter:           "blur(40px)",
        WebkitBackdropFilter:     "blur(40px)",
        boxShadow:                "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Row 1 — Genre / Style / Camera */}
      <CameraControls
        genre={state.genre}   onGenreChange={(v) => set({ genre: v })}
        style={state.style}   onStyleChange={(v) => set({ style: v })}
        camera={state.camera} onCameraChange={(v) => set({ camera: v })}
      />

      <div className="h-px bg-white/[0.04]" />

      {/* Row 2 — Prompt */}
      <div className="px-4 pt-3 pb-2">
        <textarea
          value={state.prompt}
          onChange={(e) => set({ prompt: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onGenerate();
          }}
          placeholder="Describe the video you want to create..."
          rows={3}
          className="w-full bg-transparent text-white/80 placeholder:text-white/18 text-sm resize-none outline-none leading-relaxed"
          style={{ caretColor: "#D1FE17" }}
        />

        {/* Prompt action buttons */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          {[
            { icon: Plus,        label: "Plus"        },
            { icon: AtSign,      label: "@"           },
            { icon: ImageIcon,   label: "Start Frame" },
            { icon: UserCircle,  label: "AI Cast"     },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/[0.06] text-white/35 hover:text-white/65 text-xs transition-colors"
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.04]" />

      {/* Row 3 — Model / Resolution / Duration / Quality / AR / Batch / Sound / Generate */}
      <VideoControls
        model={state.model}             onModelChange={(v) => set({ model: v })}
        resolution={state.resolution}   onResolutionChange={(v) => set({ resolution: v })}
        duration={state.duration}       onDurationChange={(v) => set({ duration: v })}
        quality={state.quality}         onQualityChange={(v) => set({ quality: v })}
        aspectRatio={state.aspectRatio} onAspectRatioChange={(v) => set({ aspectRatio: v })}
        batch={state.batch}             onBatchChange={(v) => set({ batch: v })}
        sound={state.sound}             onSoundToggle={() => set({ sound: !state.sound })}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
      />
    </div>
  );
}
