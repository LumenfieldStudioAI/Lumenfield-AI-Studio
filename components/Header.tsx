"use client";

import Link from "next/link";
import { useState } from "react";

export type HeaderLocale = "en" | "de" | "fr";
export type HeaderNavId =
  | "explore"
  | "image"
  | "video"
  | "audio"
  | "supercomputer"
  | "mcp"
  | "collab"
  | "plugins"
  | "marketing"
  | "cinema"
  | "influencer"
  | "canvas"
  | "apps";

type MenuItem = { label: string; desc: string; href: string };

type HeaderProps = {
  activeNav: HeaderNavId;
  locale: HeaderLocale;
  navLabels: Record<HeaderNavId, string>;
  newLabel: string;
  loginLabel: string;
  launchLabel: string;
  setActiveNav: (value: HeaderNavId) => void;
  setLocale: (value: HeaderLocale) => void;
};

const imageFeatures: MenuItem[] = [
  { label: "Create Image", desc: "Generate AI images", href: "/generate?model=seedream-5-lite" },
  { label: "Cinematic Cameras", desc: "Image with camera controls", href: "/generate?mode=cinematic" },
  { label: "Moodboard", desc: "Turn references into a board", href: "#studio" },
  { label: "Soul ID Character", desc: "Create unique character", href: "#studio" },
  { label: "AI Influencer", desc: "Manage virtual talent", href: "#studio" },
  { label: "Photodump", desc: "Generate your aesthetic", href: "#studio" },
  { label: "Relight", desc: "Adjust lighting and color", href: "/generate?model=relight" },
  { label: "Inpaint", desc: "Select an area, describe change", href: "/generate?model=inpaint" },
  { label: "Image Upscale", desc: "Enhance image quality", href: "/generate?model=image-upscale" },
  { label: "Face Swap", desc: "Realistic face swaps", href: "/generate?model=face-swap" },
  { label: "Character Swap", desc: "Replace characters", href: "#studio" },
  { label: "Draw to Edit", desc: "From sketch to picture", href: "#studio" },
  { label: "Fashion Factory", desc: "Create fashion sets", href: "#studio" },
];

const imageModels: MenuItem[] = [
  { label: "Soul 2.0", desc: "Ultra-realistic fashion visuals", href: "#studio" },
  { label: "Soul Cinema", desc: "Film-grade aesthetic", href: "#studio" },
  { label: "Popcorn", desc: "Storyboard, edit, create", href: "#studio" },
  { label: "GPT Image 2", desc: "4K with near-perfect text", href: "/generate?model=gpt-image-2" },
  { label: "Recraft V4.1", desc: "Photorealistic and expressive", href: "/generate?model=recraft" },
  { label: "Nano Banana 2", desc: "Pro quality at Flash speed", href: "/generate?model=nano-banana-2" },
  { label: "Nano Banana Pro", desc: "Best 4K image model", href: "/generate?model=nano-banana-pro" },
  { label: "Seedream 5.0 lite", desc: "Intelligent visual reasoning", href: "/generate?model=seedream-5-lite" },
  { label: "GPT Image 1.5", desc: "True-color precision", href: "/generate?model=gpt-image-1-5" },
  { label: "Grok Imagine", desc: "Versatile styles by xAI", href: "/generate?model=grok-image" },
  { label: "FLUX.2", desc: "Speed-optimized detail", href: "/generate?model=flux-2" },
  { label: "Reve", desc: "Advanced image editing", href: "/generate?model=reve" },
  { label: "Z-Image", desc: "Instant lifelike portraits", href: "/generate?model=z-image" },
  { label: "Topaz", desc: "High-resolution upscaler", href: "/generate?model=image-upscale" },
];

const videoFeatures: MenuItem[] = [
  { label: "Create Video", desc: "Generate AI videos", href: "/generate?model=seedance-2" },
  { label: "Cinema Studio", desc: "Cinematic video with AI director", href: "#studio" },
  { label: "Mixed Media", desc: "Combine image, video and references", href: "#studio" },
  { label: "Edit Video", desc: "Edit scenes, shots and elements", href: "#studio" },
  { label: "Click to Ad", desc: "Product URLs into video ads", href: "#studio" },
  { label: "Sora 2 Trends", desc: "Ideas into viral formats", href: "#studio" },
  { label: "Lipsync Studio", desc: "Create talking clips", href: "/generate?model=lipsync" },
  { label: "Draw to Video", desc: "Sketch turns into cinema", href: "#studio" },
  { label: "Sketch to Video", desc: "From sketch to video", href: "#studio" },
  { label: "UGC Factory", desc: "Build creator-style video", href: "#studio" },
  { label: "Video Upscale", desc: "Enhance video quality", href: "/generate?model=video-upscale" },
  { label: "Animate", desc: "Video smart replacement", href: "#studio" },
  { label: "Vibe Motion", desc: "Professional motion graphics", href: "#studio" },
  { label: "Recast Studio", desc: "Swap characters in videos", href: "#studio" },
];

const videoModels: MenuItem[] = [
  { label: "Seedance 2.0", desc: "Most advanced video model", href: "/generate?model=seedance-2" },
  { label: "Kling 3.0", desc: "Cinematic videos with audio", href: "/generate?model=kling-3" },
  { label: "Kling Motion Control", desc: "Transfer motion to image", href: "#studio" },
  { label: "Kling O1 Edit", desc: "Advanced video editing", href: "#studio" },
  { label: "Sora 2", desc: "Advanced OpenAI video", href: "#studio" },
  { label: "Google Veo 3.1 Lite", desc: "Fast video by Google", href: "/generate?model=veo-3-1-lite" },
  { label: "Google Veo 3.1", desc: "Advanced AI video with sound", href: "/generate?model=veo-3-1" },
  { label: "HappyHorse", desc: "Video and audio model", href: "/generate?model=happyhorse" },
  { label: "Grok Imagine 1.5", desc: "Cinematic with synced audio", href: "/generate?model=grok-video" },
  { label: "Wan 2.7", desc: "First and end frame control", href: "/generate?model=wan-2-7" },
  { label: "Minimax Hailuo 2.3", desc: "Fast high-dynamic video", href: "/generate?model=minimax-hailuo" },
  { label: "Seedance 1.5 Pro", desc: "Pro-grade audio-visual sync", href: "/generate?model=seedance-1-5-pro" },
];

const audioFeatures: MenuItem[] = [
  { label: "Voiceover", desc: "Generate speech from text", href: "/generate?model=elevenlabs-v3" },
  { label: "Change Voice", desc: "Swap voices in any video", href: "#studio" },
  { label: "Translation", desc: "Translate speech in any video", href: "#studio" },
];

const audioModels: MenuItem[] = [
  { label: "Eleven v3", desc: "Expressive AI voice", href: "/generate?model=elevenlabs-v3" },
  { label: "MiniMax Speech 2.8 HD", desc: "Studio-quality TTS", href: "/generate?model=minimax-speech" },
  { label: "Seed Speech", desc: "Multilingual TTS", href: "/generate?model=seed-speech" },
  { label: "VibeVoice", desc: "Long-form expressive voice", href: "/generate?model=vibevoice" },
];

const megaMenus = {
  image: { features: imageFeatures, models: imageModels },
  video: { features: videoFeatures, models: videoModels },
  audio: { features: audioFeatures, models: audioModels },
} satisfies Record<"image" | "video" | "audio", { features: MenuItem[]; models: MenuItem[] }>;

const navOrder: HeaderNavId[] = [
  "explore",
  "image",
  "video",
  "audio",
  "supercomputer",
  "mcp",
  "collab",
  "plugins",
  "marketing",
  "cinema",
  "influencer",
  "canvas",
  "apps",
];

export default function Header({
  activeNav,
  locale,
  navLabels,
  newLabel,
  loginLabel,
  launchLabel,
  setActiveNav,
  setLocale,
}: HeaderProps) {
  const [open, setOpen] = useState<"image" | "video" | "audio" | null>(null);

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/92 backdrop-blur"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3">
        <Link className="flex shrink-0 items-center gap-3" href="#studio">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[#f4f1e8] text-base font-black text-[#09090b]">
            LF
          </span>
          <span className="text-xl font-semibold tracking-tight">Lumenfield AI Studio</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 overflow-x-auto lg:flex">
          {navOrder.map((item) => {
            const hasMega = item === "image" || item === "video" || item === "audio";

            return (
              <button
                className={`nav-pill ${activeNav === item ? "nav-pill-active" : ""}`}
                key={item}
                onClick={() => {
                  setActiveNav(item);
                  if (hasMega) setOpen(open === item ? null : item);
                }}
                onMouseEnter={() => setOpen(hasMega ? item : null)}
              >
                {navLabels[item]}
                {hasMega ? <span className="text-[10px]">v</span> : null}
                {["supercomputer", "mcp", "plugins"].includes(item) ? (
                  <span className="ml-1 rounded bg-[#c9ff5d] px-1.5 py-0.5 text-[10px] font-bold text-[#10130b]">
                    {newLabel}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="language-switch" aria-label="Language selector">
            {(["en", "de", "fr"] as HeaderLocale[]).map((item) => (
              <button
                className={locale === item ? "language-active" : ""}
                key={item}
                onClick={() => setLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <Link className="hidden rounded-md border border-white/15 px-3 py-2 text-sm text-white/80 sm:block" href="#auth">
            {loginLabel}
          </Link>
          <Link className="rounded-md bg-[#f4f1e8] px-4 py-2 text-sm font-semibold text-[#09090b]" href="/test">
            {launchLabel}
          </Link>
        </div>
      </div>

      {open ? (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#111315] px-4 py-5 shadow-2xl">
          <div className="mx-auto grid max-w-[1440px] gap-7 lg:grid-cols-[2fr_1.45fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-white/45">Features</p>
              <div className="mega-grid">
                {megaMenus[open].features.map((item) => (
                  <Link className="mega-link" href={item.href} key={item.label}>
                    <strong>{item.label}</strong>
                    <span>{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-white/45">Models</p>
              <div className="mega-grid mega-grid-models">
                {megaMenus[open].models.map((item) => (
                  <Link className="mega-link" href={item.href} key={item.label}>
                    <strong>{item.label}</strong>
                    <span>{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
