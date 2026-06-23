"use client";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Search, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CINEMA_MODELS,
  CATEGORY_LABELS,
  type CinemaModel,
} from "@/lib/cinema-data";

const ACCENT       = "#D1FE17";
const GLASS_BG     = "rgba(35,38,42,0.97)";
const GLASS_BORDER = "rgba(217,217,217,0.08)";

const BADGE_STYLES: Record<string, string> = {
  FEATURED: "text-[#D1FE17] bg-[#D1FE17]/15",
  NEW:      "text-blue-400  bg-blue-400/15",
  PRO:      "text-purple-400 bg-purple-400/15",
  HOT:      "text-orange-400 bg-orange-400/15",
};

interface ModelSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const ref                 = useRef<HTMLDivElement>(null);
  const inputRef            = useRef<HTMLInputElement>(null);

  const selected = CINEMA_MODELS.find((m) => m.id === value) ?? CINEMA_MODELS[0];

  // Filter
  const filtered = search.trim()
    ? CINEMA_MODELS.filter(
        (m) =>
          m.label.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
      )
    : CINEMA_MODELS;

  // Group by category (preserve order: cinema → video → animation → experimental)
  const categoryOrder: CinemaModel["category"][] = ["cinema", "video", "animation", "experimental"];
  const grouped = categoryOrder.reduce<Record<string, CinemaModel[]>>((acc, cat) => {
    const models = filtered.filter((m) => m.category === cat);
    if (models.length) acc[cat] = models;
    return acc;
  }, {});

  // Close on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Close on Escape
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setSearch("");
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm hover:bg-white/10 transition-colors border border-white/5"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Cpu size={13} style={{ color: open ? ACCENT : "rgba(255,255,255,0.3)" }} />
        <span className="font-medium" style={{ color: open ? ACCENT : "rgba(255,255,255,0.75)" }}>
          {selected.label}
        </span>
        {selected.badge && (
          <span className={cn("text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide", BADGE_STYLES[selected.badge])}>
            {selected.badge}
          </span>
        )}
        <ChevronDown
          size={11}
          className={cn("text-white/25 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          className="absolute bottom-full mb-2 left-0 z-50 w-[340px] rounded-2xl border overflow-hidden"
          style={{
            background: GLASS_BG,
            borderColor: GLASS_BORDER,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Search */}
          <div className="p-3 border-b border-white/5">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
              <Search size={13} className="text-white/25 flex-shrink-0" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
              />
            </div>
          </div>

          {/* Model list */}
          <div className="max-h-[400px] overflow-y-auto p-2">
            {Object.entries(grouped).map(([cat, models]) => (
              <div key={cat} className="mb-1 last:mb-0">
                {/* Category header */}
                <div className="px-2 pt-2 pb-1 text-[10px] font-semibold text-white/20 uppercase tracking-widest">
                  {CATEGORY_LABELS[cat] ?? cat}
                </div>

                {models.map((model) => {
                  const isSelected = model.id === value;
                  return (
                    <button
                      key={model.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(model.id);
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors hover:bg-white/10 group"
                      style={isSelected ? { backgroundColor: "rgba(209,254,23,0.07)" } : {}}
                    >
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: isSelected ? ACCENT : "rgba(255,255,255,0.82)" }}
                        >
                          {model.label}
                        </div>
                        <div className="text-[11px] text-white/25 truncate mt-0.5">
                          {model.description}
                        </div>
                      </div>

                      {/* Badge + check */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {model.badge && (
                          <span className={cn("text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wide", BADGE_STYLES[model.badge] ?? "bg-white/10 text-white/40")}>
                            {model.badge}
                          </span>
                        )}
                        <Check
                          size={14}
                          style={{
                            color: ACCENT,
                            opacity: isSelected ? 1 : 0,
                            transition: "opacity 0.1s",
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-10 text-center text-white/20 text-sm">
                No models found for &ldquo;{search}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
