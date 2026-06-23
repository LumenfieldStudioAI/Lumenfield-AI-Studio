export type ModelCategory = "image" | "video" | "audio";
export type ModelBadge = "NEW" | "HOT" | "4K" | "FAST" | "PRO" | null;

export interface Model {
  id: string;           // fal.ai endpoint
  name: string;         // Görünen ad
  provider: string;     // ByteDance, KlingAI, vb.
  category: ModelCategory;
  badge: ModelBadge;
  credits: number;      // Üretim başına kredi maliyeti
  description: string;
  supportsStartFrame?: boolean;  // Video: görsel ile başlatma
  supportsCharacter?: boolean;   // Video: karakter seçimi
  maxDuration?: number;          // Video: saniye cinsinden
  aspectRatios?: string[];
}

export const MODELS: Model[] = [
  // ─── IMAGE ────────────────────────────────────────────────
  {
    id: "fal-ai/flux/schnell",
    name: "FLUX Schnell",
    provider: "Black Forest Labs",
    category: "image",
    badge: "FAST",
    credits: 2,
    description: "Hızlı görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    id: "fal-ai/flux-pro/v1.1",
    name: "FLUX 1.1 Pro",
    provider: "Black Forest Labs",
    category: "image",
    badge: "PRO",
    credits: 6,
    description: "Yüksek kaliteli görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    id: "fal-ai/seedream-v3",
    name: "Seedream 4.5",
    provider: "ByteDance",
    category: "image",
    badge: "NEW",
    credits: 4,
    description: "Sinematik görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16"],
  },
  {
    id: "fal-ai/stable-diffusion-xl",
    name: "SDXL",
    provider: "Stability AI",
    category: "image",
    badge: null,
    credits: 3,
    description: "Stabil görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16"],
  },

  // ─── VIDEO ────────────────────────────────────────────────
  {
    id: "fal-ai/kling-video/v1.6/pro/text-to-video",
    name: "Kling 3.0 Pro",
    provider: "KlingAI",
    category: "video",
    badge: "HOT",
    credits: 12,
    description: "Sinematik video üretimi",
    supportsStartFrame: true,
    supportsCharacter: true,
    maxDuration: 10,
    aspectRatios: ["16:9", "9:16", "1:1"],
  },
  {
    id: "fal-ai/kling-video/v1.6/pro/image-to-video",
    name: "Kling 3.0 Img→Vid",
    provider: "KlingAI",
    category: "video",
    badge: "HOT",
    credits: 14,
    description: "Görselden video üretimi",
    supportsStartFrame: true,
    maxDuration: 10,
    aspectRatios: ["16:9", "9:16"],
  },
  {
    id: "fal-ai/fast-animatediff/text-to-video",
    name: "Seedance 2.0",
    provider: "ByteDance",
    category: "video",
    badge: "4K",
    credits: 10,
    description: "4K kaliteli video üretimi",
    supportsStartFrame: true,
    maxDuration: 15,
    aspectRatios: ["16:9", "9:16", "1:1"],
  },
  {
    id: "fal-ai/runway-gen3a-turbo",
    name: "Runway Gen-4.5",
    provider: "Runway",
    category: "video",
    badge: "NEW",
    credits: 15,
    description: "Runway son model video üretimi",
    supportsStartFrame: true,
    maxDuration: 10,
    aspectRatios: ["16:9", "9:16"],
  },
  {
    id: "fal-ai/minimax/video-01",
    name: "MiniMax Video",
    provider: "MiniMax",
    category: "video",
    badge: null,
    credits: 8,
    description: "Hızlı video üretimi",
    maxDuration: 6,
    aspectRatios: ["16:9"],
  },

  // ─── AUDIO ────────────────────────────────────────────────
  {
    id: "fal-ai/elevenlabs/tts",
    name: "ElevenLabs TTS",
    provider: "ElevenLabs",
    category: "audio",
    badge: "PRO",
    credits: 6,
    description: "Gerçekçi sesli konuşma üretimi",
  },
  {
    id: "fal-ai/stable-audio",
    name: "Stable Audio",
    provider: "Stability AI",
    category: "audio",
    badge: null,
    credits: 4,
    description: "Müzik ve ses efekti üretimi",
  },
];

export function getModelsByCategory(category: ModelCategory) {
  return MODELS.filter((m) => m.category === category);
}

export function getModelById(id: string) {
  return MODELS.find((m) => m.id === id);
}

export const MODEL_COST_MAP = Object.fromEntries(
  MODELS.map((m) => [m.id, m.credits])
);
