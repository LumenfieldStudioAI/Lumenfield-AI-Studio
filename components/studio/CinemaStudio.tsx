"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { GenerateComposer, type ComposerState } from "./GenerateComposer";
import { useGenerate } from "@/hooks/useGenerate";
import { FAL_MODEL_MAP, DEFAULT_FAL_ID } from "@/lib/cinema-data";

const ACCENT = "#D1FE17";

const DEFAULT_STATE: ComposerState = {
  prompt:      "",
  genre:       "General",
  style:       "Auto",
  camera:      "Full-Frame Cine Digital",
  model:       "seedance-2.0",
  resolution:  "1080p",
  duration:    "5s",
  quality:     "High",
  aspectRatio: "16:9",
  batch:       1,
  sound:       true,
};

export function CinemaStudio() {
  const router = useRouter();
  const [state, setState] = useState<ComposerState>(DEFAULT_STATE);
  const {
    generate, reset, status, outputUrl, error, queuePosition, isLoading,
  } = useGenerate();

  const handleChange = (updates: Partial<ComposerState>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handleGenerate = async () => {
    if (!state.prompt.trim() || isLoading) return;

    // Resolve fal.ai endpoint
    const falId = FAL_MODEL_MAP[state.model] ?? DEFAULT_FAL_ID;
    // Parse duration string e.g. "5s" → 5
    const durationSec = parseInt(state.duration, 10);

    const result = await generate({
      prompt: state.prompt,
      model:  falId,
      params: {
        aspect_ratio: state.aspectRatio,
        duration:     durationSec,
        // Style hint appended to prompt server-side if needed
      },
    });

    if (result?.requiresUpgrade) router.push("/pricing");
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#0a0a0c" }}
    >
      <Navbar />

      {/* ─── Canvas ─── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden pt-14">

        {/* Idle hero text */}
        {status === "idle" && (
          <div className="text-center select-none pointer-events-none px-8">
            <h1
              className="font-black tracking-tighter leading-none"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                color: "rgba(255,255,255,0.04)",
              }}
            >
              CREATE YOUR<br />FIRST PROJECT.
            </h1>
            <h2
              className="font-black tracking-tighter mt-3"
              style={{
                fontSize: "clamp(1.5rem, 5vw, 4.5rem)",
                color: `${ACCENT}0a`,
              }}
            >
              GENERATE THE<br />IMPOSSIBLE.
            </h2>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center">
            {/* Animated spinner using CSS */}
            <div
              className="w-12 h-12 rounded-full border-2 border-transparent mx-auto mb-4"
              style={{
                borderTopColor: ACCENT,
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              {status === "submitting"
                ? "Sending to queue..."
                : queuePosition != null
                ? `Queue position: ${queuePosition}`
                : "Generating your video..."}
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Output */}
        {status === "done" && outputUrl && (
          <div className="relative flex flex-col items-center gap-4 p-6 w-full h-full">
            <video
              src={outputUrl}
              controls
              autoPlay
              loop
              muted={!state.sound}
              className="max-w-full max-h-full rounded-2xl"
              style={{ border: `1px solid ${ACCENT}18` }}
            />
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <RotateCcw size={13} />
              New generation
            </button>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="text-center px-6">
            <p className="text-sm text-red-400 mb-4 max-w-sm">{error}</p>
            <button
              onClick={reset}
              className="px-5 py-2 rounded-xl text-sm bg-white/5 hover:bg-white/10 transition-colors"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* ─── Composer ─── */}
      <div className="px-4 pb-4 md:px-6 md:pb-5 flex-shrink-0">
        <GenerateComposer
          state={state}
          onChange={handleChange}
          onGenerate={handleGenerate}
          isGenerating={isLoading}
        />
      </div>
    </div>
  );
}
