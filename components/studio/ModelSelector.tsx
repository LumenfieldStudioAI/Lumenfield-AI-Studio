"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Zap, Video, Mic } from "lucide-react";
import { MODELS, type Model, type ModelCategory } from "@/lib/models";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<string, string> = {
  NEW:  "bg-[#e8006f]/20 text-[#e8006f]",
  HOT:  "bg-orange-500/20 text-orange-400",
  "4K": "bg-blue-500/20 text-blue-400",
  FAST: "bg-green-500/20 text-green-400",
  PRO:  "bg-purple-500/20 text-purple-400",
};

const CATEGORY_ICONS = {
  image: Zap,
  video: Video,
  audio: Mic,
};

interface Props {
  value: string;
  onChange: (model: Model) => void;
  category: ModelCategory;
}

export function ModelSelector({ value, onChange, category }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = MODELS.find((m) => m.id === value);
  const byCategory = {
    image: MODELS.filter((m) => m.category === "image"),
    video: MODELS.filter((m) => m.category === "video"),
    audio: MODELS.filter((m) => m.category === "audio"),
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors"
      >
        <span>{selected?.name ?? "Model seç"}</span>
        {selected?.badge && (
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium", BADGE_STYLES[selected.badge])}>
            {selected.badge}
          </span>
        )}
        <ChevronDown size={14} className={cn("text-white/40 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 z-50 bg-[#1c1e21] border border-white/10 rounded-xl p-2 min-w-[240px] shadow-2xl">
          {(["image", "video", "audio"] as ModelCategory[]).map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const models = byCategory[cat];
            return (
              <div key={cat} className="mb-3 last:mb-0">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] text-white/30 uppercase tracking-widest">
                  <Icon size={10} />
                  {cat === "image" ? "Görsel" : cat === "video" ? "Video" : "Ses"}
                </div>
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => { onChange(model); setOpen(false); }}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                      model.id === value
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-[11px] text-white/30">{model.provider} · {model.credits} kredi</div>
                    </div>
                    {model.badge && (
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0", BADGE_STYLES[model.badge])}>
                        {model.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
