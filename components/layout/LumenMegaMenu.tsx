"use client";
import Link from "next/link";
import type { CSSProperties } from "react";

type MenuKind = "create" | "studios" | "models" | "integrations";

const MENUS = {
  create: {
    sections: [
      {
        title: "Generate",
        items: [
          { label: "AI Image", desc: "Text to image with 10+ models", href: "/image", icon: "🖼️" },
          { label: "AI Video", desc: "Text & image to video", href: "/video", icon: "🎬" },
          { label: "Edit Image", desc: "Inpaint, outpaint, replace", href: "/edit", icon: "✏️" },
          { label: "Upscale", desc: "4K resolution enhancement", href: "/upscale", icon: "⬆️" },
          { label: "Audio", desc: "Music, voice, sound effects", href: "/audio", icon: "🎵" },
          { label: "Lipsync", desc: "Animate faces with audio", href: "/lipsync", icon: "👄" },
        ],
      },
      {
        title: "My Work",
        items: [
          { label: "Library", desc: "Your generation history", href: "/library", icon: "📚" },
          { label: "Projects", desc: "Organize your work", href: "/projects", icon: "📁" },
          { label: "Characters", desc: "Your Soul IDs", href: "/character", icon: "👤" },
        ],
      },
    ],
  },
  studios: {
    sections: [
      {
        title: "Creative Studios",
        items: [
          { label: "Cinema Studio", desc: "Cinematic video production", href: "/cinema-studio", icon: "🎥" },
          { label: "Marketing Studio", desc: "Product ads & campaigns", href: "/marketing-studio", icon: "📣" },
          { label: "AI Influencer", desc: "Consistent virtual personas", href: "/ai-influencer-studio", icon: "⭐" },
          { label: "Canvas", desc: "Workflow board & moodboard", href: "/canvas", icon: "🎨" },
        ],
      },
      {
        title: "Power Tools",
        items: [
          { label: "Supercomputer", desc: "Large-scale AI content", href: "/supercomputer", icon: "⚡" },
          { label: "Storyboard", desc: "Scene planning & sequencing", href: "/storyboard", icon: "📋" },
          { label: "Community", desc: "Browse & share creations", href: "/explore", icon: "🌐" },
        ],
      },
    ],
  },
  models: {
    sections: [
      {
        title: "Image Models",
        items: [
          { label: "Soul V2", desc: "Character consistency", href: "/image?model=soul-v2", icon: "👁️", badge: "TOP" },
          { label: "Nano Banana Pro", desc: "Fast, high quality", href: "/image?model=nano-banana-pro", icon: "🍌", badge: "NEW" },
          { label: "GPT Image", desc: "OpenAI image generation", href: "/image?model=gpt", icon: "✨" },
          { label: "Seedream", desc: "Artistic & creative", href: "/image?model=seedream", icon: "🌱" },
          { label: "Flux", desc: "Photorealistic output", href: "/image?model=flux", icon: "⚡" },
          { label: "Kontext", desc: "Context-aware editing", href: "/image?model=kontext", icon: "🧠" },
        ],
      },
      {
        title: "Video Models",
        items: [
          { label: "Seedance 2.0", desc: "Cinematic video generation", href: "/video?model=seedance_2_0", icon: "🎬", badge: "NEW" },
          { label: "Kling 3.0", desc: "High motion quality", href: "/video?model=kling", icon: "🎯" },
          { label: "Veo 3", desc: "Google DeepMind video", href: "/video?model=veo-3", icon: "🔮", badge: "TOP" },
          { label: "Sora", desc: "OpenAI video model", href: "/video?model=sora", icon: "☀️" },
          { label: "MiniMax Hailuo", desc: "Fast video generation", href: "/video?model=minimax", icon: "💨" },
          { label: "Wan 2.6", desc: "Open source video", href: "/video?model=wan", icon: "🌊" },
        ],
      },
    ],
  },
  integrations: {
    sections: [
      {
        title: "Developer",
        items: [
          { label: "MCP Server", desc: "Connect Claude & AI agents", href: "/mcp", icon: "🤖" },
          { label: "API Access", desc: "REST API for developers", href: "/docs", icon: "📡" },
          { label: "CLI Tool", desc: "Command line interface", href: "/mcp", icon: "💻" },
        ],
      },
      {
        title: "App Plugins",
        items: [
          { label: "Photoshop Plugin", desc: "Generate inside Photoshop", href: "/apps", icon: "🅿️" },
          { label: "DaVinci Plugin", desc: "AI in your timeline", href: "/apps", icon: "🎞️" },
          { label: "Chrome Extension", desc: "Lumenfield anywhere", href: "/apps", icon: "🌐" },
          { label: "Mobile App", desc: "iOS & Android", href: "/apps", icon: "📱" },
        ],
      },
    ],
  },
};

export default function LumenMegaMenu({ kind, onMouseEnter }: { kind: MenuKind; onMouseEnter?: () => void }) {
  const menu = MENUS[kind];
  return (
    <div style={s.panel} onMouseEnter={onMouseEnter}>
      {menu.sections.map((section) => (
        <div key={section.title}>
          <p style={s.label}>{section.title}</p>
          {section.items.map((item) => (
            <Link key={item.label} href={item.href} style={s.item}>
              <span style={s.icon}>{item.icon}</span>
              <span>
                <span style={s.itemLabel}>
                  {item.label}
                  {"badge" in item && item.badge && (
                    <span style={s.badge}>{item.badge}</span>
                  )}
                </span>
                <span style={s.itemDesc}>{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  panel: { position: "absolute", top: 44, left: 0, zIndex: 200, width: 680, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: 20, borderRadius: 16, background: "#141416", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 80px rgba(0,0,0,.7)" },
  label: { margin: "0 0 8px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" },
  item: { display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 10, textDecoration: "none", marginBottom: 2, transition: "background .15s" },
  icon: { width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.06)", display: "grid", placeItems: "center", fontSize: 14, flexShrink: 0 },
  itemLabel: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 },
  itemDesc: { display: "block", fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.4 },
  badge: { fontSize: 9, fontWeight: 800, padding: "2px 5px", borderRadius: 4, background: "#d7ff1f", color: "#111" },
};
