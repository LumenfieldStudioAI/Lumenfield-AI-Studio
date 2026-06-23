"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image, Video, Mic, Upload, User, Clock, Maximize2, Loader2, RotateCcw } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ModelSelector } from "@/components/studio/ModelSelector";
import { useGenerate } from "@/hooks/useGenerate";
import { MODELS, type Model, type ModelCategory } from "@/lib/models";
import { cn } from "@/lib/utils";

const DEFAULT_MODEL = MODELS.find((m) => m.id === "fal-ai/fast-animatediff/text-to-video")!;

const MODE_TABS: { id: ModelCategory; label: string; icon: typeof Image }[] = [
  { id: "image", label: "Görsel",  icon: Image },
  { id: "video", label: "Video",   icon: Video },
  { id: "audio", label: "Ses",     icon: Mic   },
];

const ASPECT_RATIOS = ["16:9", "9:16", "1:1", "4:3"];
const DURATIONS     = [5, 10, 15];

export default function GeneratePage() {
  const router = useRouter();
  const { generate, reset, status, outputUrl, error, queuePosition, isLoading } = useGenerate();

  const [mode, setMode]               = useState<ModelCategory>("video");
  const [selectedModel, setSelectedModel] = useState<Model>(DEFAULT_MODEL);
  const [prompt, setPrompt]           = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration]       = useState(5);

  const handleModelChange = (model: Model) => {
    setSelectedModel(model);
    setMode(model.category);
  };

  const handleModeSwitch = (m: ModelCategory) => {
    setMode(m);
    const first = MODELS.find((model) => model.category === m);
    if (first) setSelectedModel(first);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    const result = await generate({
      prompt,
      model: selectedModel.id,
      params: {
        aspect_ratio: aspectRatio,
        ...(mode === "video" && { duration }),
      },
    });
    if (result?.requiresUpgrade) {
      router.push("/pricing");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col">
      <Navbar />

      <div className="flex flex-1 pt-14 overflow-hidden h-screen">
        {/* ─── Left sidebar ─── */}
        <aside className="w-12 flex-shrink-0 border-r border-white/5 bg-[#0f1113] flex flex-col items-center py-4 gap-2">
          {MODE_TABS.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleModeSwitch(id)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                mode === id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"
              )}
            >
              <Icon size={16} />
            </button>
          ))}
        </aside>

        {/* ─── Main area ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mode tabs */}
          <div className="flex border-b border-white/5 bg-[#0f1113]">
            {MODE_TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleModeSwitch(id)}
                className={cn(
                  "px-5 py-3 text-sm transition-colors border-b-2",
                  mode === id
                    ? "text-white border-[#e8006f]"
                    : "text-white/40 border-transparent hover:text-white/70"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Canvas / output */}
          <div className="flex-1 flex items-center justify-center bg-[#0c0d0e] relative overflow-hidden">
            {status === "idle" && (
              <div className="text-center text-white/20">
                <div className="text-5xl mb-3">✦</div>
                <div className="text-sm">Aşağıdan bir prompt gir</div>
              </div>
            )}

            {isLoading && (
              <div className="text-center">
                <Loader2 size={36} className="animate-spin text-[#e8006f] mx-auto mb-4" />
                <p className="text-white/50 text-sm">
                  {status === "submitting"
                    ? "Gönderiliyor..."
                    : queuePosition != null
                    ? `Sırada ${queuePosition}. sıra...`
                    : "Üretiliyor..."}
                </p>
              </div>
            )}

            {status === "done" && outputUrl && (
              <div className="relative max-w-3xl w-full p-4">
                {mode === "video" ? (
                  <video
                    src={outputUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full rounded-xl border border-white/10"
                  />
                ) : mode === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={outputUrl}
                    alt="Üretilen görsel"
                    className="w-full rounded-xl border border-white/10"
                  />
                ) : (
                  <audio src={outputUrl} controls className="w-full" />
                )}
                <div className="flex gap-2 mt-3">
                  <a
                    href={outputUrl}
                    download
                    className="flex-1 text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    İndir
                  </a>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <RotateCcw size={14} />
                    Yeniden
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="text-center">
                <div className="text-red-400 text-sm mb-3">{error}</div>
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-white/70"
                >
                  Tekrar dene
                </button>
              </div>
            )}
          </div>

          {/* ─── Composer bar ─── */}
          <div className="border-t border-white/5 bg-[#0f1113] p-4">
            {/* Prompt */}
            <div className="relative mb-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleGenerate(); }}
                placeholder={
                  mode === "image"
                    ? "Görseli tanımla... (Ör: Gün batımında İstanbul silueti, sinematik)"
                    : mode === "video"
                    ? "Video sahnesini tanımla... (Ör: Yavaş çekim okyanus dalgaları)"
                    : "Seslendirmek istediğin metni yaz..."
                }
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-28 text-sm text-white placeholder:text-white/25 resize-none focus:outline-none focus:border-[#e8006f]/50 transition-colors"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isLoading}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                  prompt.trim() && !isLoading
                    ? "bg-[#e8006f] hover:bg-[#c4005e] text-white"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : "↑ Üret"}
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 flex-wrap">
              <ModelSelector
                value={selectedModel.id}
                onChange={handleModelChange}
                category={mode}
              />

              <div className="w-px h-5 bg-white/10" />

              {/* Aspect ratio */}
              <div className="flex gap-1">
                {ASPECT_RATIOS.map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-xs transition-colors",
                      aspectRatio === ar
                        ? "bg-white/15 text-white"
                        : "text-white/30 hover:text-white/60 hover:bg-white/5"
                    )}
                  >
                    {ar}
                  </button>
                ))}
              </div>

              {/* Video-only controls */}
              {mode === "video" && (
                <>
                  <div className="w-px h-5 bg-white/10" />

                  {/* Duration */}
                  <div className="flex gap-1">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={cn(
                          "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors",
                          duration === d
                            ? "bg-white/15 text-white"
                            : "text-white/30 hover:text-white/60 hover:bg-white/5"
                        )}
                      >
                        <Clock size={11} />
                        {d}s
                      </button>
                    ))}
                  </div>

                  {/* Start Frame (sadece destekleyen modellerde) */}
                  {selectedModel.supportsStartFrame && (
                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/10 transition-colors">
                      <Upload size={12} />
                      Start Frame
                    </button>
                  )}

                  {/* Character */}
                  {selectedModel.supportsCharacter && (
                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/10 transition-colors">
                      <User size={12} />
                      Karakter
                    </button>
                  )}

                  <button className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs text-white/40 hover:text-white/70 hover:bg-white/5 border border-white/10 transition-colors ml-auto">
                    <Maximize2 size={12} />
                    {selectedModel.credits} kredi
                  </button>
                </>
              )}

              {mode === "image" && (
                <span className="ml-auto text-xs text-white/25">
                  {selectedModel.credits} kredi
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ─── Right panel ─── */}
        <aside className="w-56 flex-shrink-0 border-l border-white/5 bg-[#0f1113] p-4 flex flex-col gap-4 overflow-y-auto">
          <div>
            <h3 className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Ayarlar</h3>
            <div className="space-y-3">
              {mode === "video" && (
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block flex justify-between">
                    Süre
                    <span className="text-white/70">{duration}s</span>
                  </label>
                  <input
                    type="range" min={5} max={15} step={5}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#e8006f]"
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">En-Boy Oranı</label>
                <div className="grid grid-cols-2 gap-1">
                  {ASPECT_RATIOS.map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setAspectRatio(ar)}
                      className={cn(
                        "py-1.5 rounded-md text-xs transition-colors",
                        aspectRatio === ar
                          ? "bg-[#e8006f]/20 text-[#e8006f] border border-[#e8006f]/30"
                          : "bg-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <h3 className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Model</h3>
            <div className="text-xs text-white/60 font-medium">{selectedModel.name}</div>
            <div className="text-[11px] text-white/30 mt-0.5">{selectedModel.provider}</div>
            <div className="mt-2 text-xs text-white/40">
              Maliyet:{" "}
              <span className="text-white/70">{selectedModel.credits} kredi</span>
            </div>
            {selectedModel.description && (
              <div className="mt-2 text-[11px] text-white/25 leading-relaxed">
                {selectedModel.description}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
