"use client";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT       = "#D1FE17";
const GLASS_BG     = "rgba(35,38,42,0.95)";
const GLASS_BORDER = "rgba(217,217,217,0.08)";

interface GlassDropdownProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  align?: "left" | "right";
  direction?: "up" | "down";
}

export function GlassDropdown({
  label,
  value,
  options,
  onChange,
  align = "left",
  direction = "up",
}: GlassDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm hover:bg-white/10 transition-colors border border-white/5 whitespace-nowrap"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {label && <span className="text-white/30 text-xs">{label}</span>}
        <span className="font-medium" style={{ color: open ? ACCENT : "rgba(255,255,255,0.75)" }}>
          {value}
        </span>
        <ChevronDown
          size={11}
          className={cn("transition-transform text-white/25", open && "rotate-180")}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute z-50 min-w-[140px] rounded-xl border overflow-hidden",
            align === "right" ? "right-0" : "left-0",
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          )}
          style={{
            background: GLASS_BG,
            borderColor: GLASS_BORDER,
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          <div className="p-1.5 max-h-[260px] overflow-y-auto">
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-sm text-left transition-colors hover:bg-white/10"
                  style={{ color: isSelected ? ACCENT : "rgba(255,255,255,0.65)" }}
                >
                  <span>{opt}</span>
                  {isSelected && <Check size={12} style={{ color: ACCENT }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
