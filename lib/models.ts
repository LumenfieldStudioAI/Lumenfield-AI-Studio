export type ModelCategory = "image" | "video" | "audio";
export type ModelBadge = "NEW" | "HOT" | "4K" | "FAST" | "PRO" | null;

export interface Model {
  id: string;
  name: string;
  provider: string;
  category: ModelCategory;
  badge: ModelBadge;
  credits: number;
  description: string;
  supportsStartFrame?: boolean;
  supportsCharacter?: boolean;
  maxDuration?: number;
  aspectRatios?: string[];
}

export const MODELS: Model[] = [
  // IMAGE
  {
    id: "fal-ai/flux/schnell",
    name: "FLUX Schnell",
    provider: "fal",
    category: "image",
    badge: "FAST",
    credits: 2,
    description: "Hızlı görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    id: "fal-ai/flux-pro/v1.1",
    name: "FLUX 1.1 Pro",
    provider: "fal",
    category: "image",
    badge: "PRO",
    credits: 6,
    description: "Yüksek kaliteli görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16", "4:3", "3:4"],
  },
  {
    id: "fal-ai/seedream-v3",
    name: "Seedream 4.5",
    provider: "fal",
    category: "image",
    badge: "NEW",
    credits: 4,
    description: "Sinematik görsel üretimi",
    aspectRatios: ["1:1", "16:9", "9:16"],
  },
  // VIDEO
  {
    id: "fal-ai/kling-video/v1.6/pro/text-to-video",
    name: "Kling 3.0 Pro",
    provider: "fal",
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
    name: "Kling Img→Vid",
    provider: "fal",
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
    provider: "fal",
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
    provider: "fal",
    category: "video",
    badge: "NEW",
    credits: 15,
    description: "Runway son model video üretimi",
    supportsStartFrame: true,
    maxDuration: 10,
    aspectRatios: ["16:9", "9:16"],
  },
  // AUDIO
  {
    id: "fal-ai/elevenlabs/tts",
    name: "ElevenLabs TTS",
    provider: "elevenlabs",
    category: "audio",
    badge: "PRO",
    credits: 6,
    description: "Gerçekçi sesli konuşma üretimi",
  },
  {
    id: "fal-ai/stable-audio",
    name: "Stable Audio",
    provider: "fal",
    category: "audio",
    badge: null,
    credits: 4,
    description: "Müzik ve ses efekti üretimi",
  },
];

// ─── Lookup helpers ─────────────────────────────────────────

/** ID'ye göre model bul */
export function getModel(id: string): Model | undefined {
  return MODELS.find((m) => m.id === id);
}

/** Kategori bazlı filtre */
export function getModelsByCategory(category: ModelCategory): Model[] {
  return MODELS.filter((m) => m.category === category);
}

/** Kredi maliyeti hesapla (params'a göre genişletilebilir) */
export function computeCost(
  model: Model,
  params?: Record<string, unknown>
): number {
  let cost = model.credits;

  // Uzun video ekstra maliyet
  if (model.category === "video" && params?.duration) {
    const duration = Number(params.duration);
    if (duration > 10) cost += 4;
    else if (duration > 5) cost += 2;
  }

  return cost;
}

/** ID → kredi maliyeti (legacy compat) */
export function getCreditCost(modelId: string): number {
  return getModel(modelId)?.credits ?? 4;
}

export const MODEL_COST_MAP = Object.fromEntries(
  MODELS.map((m) => [m.id, m.credits])
);
