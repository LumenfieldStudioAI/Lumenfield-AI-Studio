export type LumenModelCategory = "image" | "video" | "audio" | "studio";

export type LumenModel = {
  id: string;
  name: string;
  category: LumenModelCategory;
  provider: string;
  description: string;
  badge?: "NEW" | "TOP" | "PRO" | "FAST";
  fields: string[];
};

export const lumenModels: LumenModel[] = [
  {
    id: "nano-banana-pro",
    name: "Nano Banana Pro",
    category: "image",
    provider: "Lumenfield",
    description: "Fast, high-quality image generation for creator-ready visuals.",
    badge: "TOP",
    fields: ["prompt", "aspect ratio", "quality", "seed"],
  },
  {
    id: "flux-dev",
    name: "Flux Dev",
    category: "image",
    provider: "Black Forest Labs",
    description: "Flexible text-to-image model for stylized and realistic outputs.",
    badge: "FAST",
    fields: ["prompt", "aspect ratio", "guidance", "seed"],
  },
  {
    id: "flux-kontext-dev-t2i",
    name: "Flux Kontext Dev T2I",
    category: "image",
    provider: "Black Forest Labs",
    description: "Context-aware image generation for product, fashion and story scenes.",
    fields: ["prompt", "reference", "aspect ratio"],
  },
  {
    id: "bytedance-seedream-v4",
    name: "Seedream v4",
    category: "image",
    provider: "ByteDance",
    description: "Sharp commercial image generation with strong prompt following.",
    badge: "NEW",
    fields: ["prompt", "resolution", "aspect ratio", "batch size"],
  },
  {
    id: "higgsfield-ai-soul-standard",
    name: "Soul Standard",
    category: "image",
    provider: "Soul",
    description: "Reusable character and identity-driven image generation workflow.",
    badge: "PRO",
    fields: ["prompt", "soul id", "style", "aspect ratio"],
  },
  {
    id: "kling-3",
    name: "Kling 3.0",
    category: "video",
    provider: "Kling",
    description: "Cinematic AI video generation with strong motion and scene control.",
    badge: "TOP",
    fields: ["prompt", "duration", "aspect ratio", "camera motion"],
  },
  {
    id: "google-veo-3",
    name: "Google Veo 3",
    category: "video",
    provider: "Google",
    description: "Advanced text-to-video generation for high-end cinematic clips.",
    badge: "PRO",
    fields: ["prompt", "duration", "style", "sound"],
  },
  {
    id: "sora-2",
    name: "Sora 2",
    category: "video",
    provider: "OpenAI",
    description: "Premium video model option for realistic, story-driven clips.",
    badge: "NEW",
    fields: ["prompt", "duration", "aspect ratio", "reference"],
  },
  {
    id: "wan-2-5",
    name: "Wan 2.5",
    category: "video",
    provider: "Wan",
    description: "Video generation with first-frame, end-frame and controlled scene flow.",
    fields: ["prompt", "start frame", "end frame", "duration"],
  },
  {
    id: "speech-to-video",
    name: "Speech to Video",
    category: "audio",
    provider: "Lumenfield",
    description: "Turn voice or script into talking creator clips and avatar-style videos.",
    fields: ["script", "voice", "avatar", "language"],
  },
  {
    id: "cinema-studio",
    name: "Cinema Studio",
    category: "studio",
    provider: "Lumenfield",
    description: "Director-style workflow for shots, cameras, scenes and cinematic presets.",
    badge: "TOP",
    fields: ["prompt", "shot type", "camera", "preset"],
  },
  {
    id: "marketing-studio",
    name: "Marketing Studio",
    category: "studio",
    provider: "Lumenfield",
    description: "Create campaign assets, product videos, UGC ads and social variations.",
    fields: ["product", "audience", "platform", "cta"],
  },
];

export const modelCategories: { id: LumenModelCategory; label: string; description: string }[] = [
  { id: "image", label: "Image", description: "Text-to-image, identity, product and fashion models." },
  { id: "video", label: "Video", description: "Cinematic video, camera motion and social clips." },
  { id: "audio", label: "Audio", description: "Voice, speech, translation and talking video flows." },
  { id: "studio", label: "Studio", description: "End-to-end creative workflows for campaigns and cinema." },
];
