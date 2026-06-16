// ─── Lumenfield Model Registry ───────────────────────────────────────────────

export type ModelCategory = "image" | "video" | "audio";
export type ModelProvider = "fal" | "runway" | "elevenlabs" | "replicate";

export interface Model {
  id: string;
  name: string;
  endpoint: string;
  provider: ModelProvider;
  category: ModelCategory;
  description: string;
  badge?: "TOP" | "NEW" | "EXCLUSIVE" | "FAST";
  pricePerUnit: string;
  features: string[];
  defaultParams?: Record<string, unknown>;
  needsImage?: boolean;
  needsMask?: boolean;
  creditCost?: number;
  perSecond?: number;
  tier?: 1 | 2 | 3;
}

// ─── IMAGE MODELS ─────────────────────────────────────────────────────────────
export const IMAGE_MODELS: Model[] = [
  { id: "flux-schnell", name: "FLUX Schnell", endpoint: "fal-ai/flux/schnell", provider: "fal", category: "image", description: "Fastest image generation", badge: "FAST", pricePerUnit: "$0.003/img", features: ["Fast", "1024px"], creditCost: 3, tier: 1 },
  { id: "flux-pro", name: "FLUX.2 Pro", endpoint: "fal-ai/flux-pro/v1.1", provider: "fal", category: "image", description: "Production-grade photorealistic output", badge: "TOP", pricePerUnit: "$0.03/mp", features: ["4K", "Photorealistic"], creditCost: 6, tier: 1 },
  { id: "nano-banana-pro", name: "Nano Banana Pro", endpoint: "fal-ai/nano-banana-pro", provider: "fal", category: "image", description: "Best 4K image model", badge: "TOP", pricePerUnit: "$0.15/img", features: ["4K", "Character consistency"], creditCost: 30, tier: 1 },
  { id: "nano-banana-2", name: "Nano Banana 2", endpoint: "fal-ai/nano-banana", provider: "fal", category: "image", description: "Fast vibrant image generation", badge: "NEW", pricePerUnit: "$0.06/img", features: ["Fast", "Text rendering"], creditCost: 12, tier: 1 },
  { id: "gpt-image-2", name: "GPT Image 2", endpoint: "fal-ai/gpt-image-2", provider: "fal", category: "image", description: "4K images with near-perfect text rendering", badge: "NEW", pricePerUnit: "$0.08/img", features: ["4K", "Text rendering"], creditCost: 14, tier: 1 },
  { id: "seedream-5-lite", name: "Seedream 5.0 Lite", endpoint: "fal-ai/bytedance/seedream/v4", provider: "fal", category: "image", description: "Intelligent visual reasoning", badge: "NEW", pricePerUnit: "$0.04/img", features: ["Editing", "Reasoning"], creditCost: 8, tier: 1 },
  { id: "recraft-v4-1", name: "Recraft V4.1", endpoint: "fal-ai/recraft-v3", provider: "fal", category: "image", description: "Photorealistic and expressive", badge: "NEW", pricePerUnit: "$0.05/img", features: ["Photorealistic", "4K"], creditCost: 8, tier: 1 },
  { id: "grok-imagine", name: "Grok Imagine", endpoint: "fal-ai/grok-imagine/image", provider: "fal", category: "image", description: "Versatile image styles by xAI", badge: "NEW", pricePerUnit: "$0.05/img", features: ["xAI", "Versatile"], creditCost: 8, tier: 1 },
  { id: "ideogram-v3", name: "Ideogram V3", endpoint: "fal-ai/ideogram/v3", provider: "fal", category: "image", description: "Marketing visuals with accurate text", pricePerUnit: "$0.06/img", features: ["Marketing", "Text accuracy"], creditCost: 6, tier: 1 },
  { id: "hidream-o1", name: "HiDream O1", endpoint: "fal-ai/hidream-o1/text-to-image", provider: "fal", category: "image", description: "Unified 2K image generation", badge: "NEW", pricePerUnit: "$0.05/img", features: ["2K", "Editing"], creditCost: 8, tier: 1 },
];

// ─── VIDEO MODELS ─────────────────────────────────────────────────────────────
export const VIDEO_MODELS: Model[] = [
  { id: "kling-v3-pro", name: "Kling 3.0 Pro", endpoint: "fal-ai/kling-video/v3/pro/text-to-video", provider: "fal", category: "video", description: "Top-tier cinematic video with native audio", badge: "TOP", pricePerUnit: "$0.112/s", features: ["4K", "Native audio", "Camera control"], creditCost: 90, perSecond: 18, tier: 1, defaultParams: { duration: 5, aspect_ratio: "16:9" } },
  { id: "kling-v2-1", name: "Kling v2.1", endpoint: "fal-ai/kling-video/v2.1/standard/text-to-video", provider: "fal", category: "video", description: "High quality cinematic video", badge: "TOP", pricePerUnit: "$0.05/video", features: ["1080p", "Camera control"], creditCost: 60, tier: 1, defaultParams: { duration: 5, aspect_ratio: "16:9" } },
  { id: "seedance-2-0", name: "Seedance 2.0", endpoint: "fal-ai/bytedance/seedance/v2/pro/text-to-video", provider: "fal", category: "video", description: "Most advanced video with native audio", badge: "TOP", pricePerUnit: "$0.08/video", features: ["720p", "Native audio", "Physics"], creditCost: 120, perSecond: 24, tier: 1, defaultParams: { duration: 5, aspect_ratio: "16:9", resolution: "1080p" } },
  { id: "seedance-2-0-fast", name: "Seedance 2.0 Fast", endpoint: "fal-ai/bytedance/seedance/v2/lite/text-to-video", provider: "fal", category: "video", description: "Fast tier Seedance with audio", badge: "FAST", pricePerUnit: "$0.05/video", features: ["720p", "Fast", "Audio"], creditCost: 70, tier: 1, defaultParams: { duration: 5 } },
  { id: "veo-3-1", name: "Google Veo 3.1", endpoint: "fal-ai/veo3.1", provider: "fal", category: "video", description: "Advanced AI video with synchronized sound", badge: "NEW", pricePerUnit: "$0.15/s", features: ["1080p", "Native audio", "Google"], creditCost: 200, perSecond: 40, tier: 1, defaultParams: { duration: 8, aspect_ratio: "16:9", generate_audio: true } },
  { id: "veo-3-1-fast", name: "Google Veo 3.1 Fast", endpoint: "fal-ai/veo3.1/lite", provider: "fal", category: "video", description: "Fast video generation by Google", badge: "FAST", pricePerUnit: "$0.08/s", features: ["1080p", "Fast"], creditCost: 100, tier: 1, defaultParams: { duration: 8 } },
  { id: "wan-2-7", name: "Wan 2.7", endpoint: "fal-ai/wan/v2.7/text-to-video", provider: "fal", category: "video", description: "AI video with frame control", pricePerUnit: "$0.06/video", features: ["1080p", "Frame control"], creditCost: 60, tier: 1, defaultParams: { duration: 5, resolution: "720p" } },
  { id: "minimax-hailuo", name: "Minimax Hailuo 2.3", endpoint: "fal-ai/minimax/hailuo-02/standard/text-to-video", provider: "fal", category: "video", description: "Fast high-dynamic video", badge: "FAST", pricePerUnit: "$0.49/video", features: ["1080p", "Fast"], creditCost: 80, tier: 1, defaultParams: { duration: 6 } },
  { id: "happyhorse", name: "HappyHorse", endpoint: "fal-ai/happy-horse", provider: "fal", category: "video", description: "Alibaba ranked video model", badge: "NEW", pricePerUnit: "$0.07/video", features: ["1080p", "Audio"], creditCost: 110, tier: 1, defaultParams: { duration: 5 } },
  { id: "grok-video", name: "Grok Video", endpoint: "fal-ai/grok-imagine/video", provider: "fal", category: "video", description: "Cinematic videos with audio by xAI", badge: "NEW", pricePerUnit: "$0.10/video", features: ["1080p", "Audio"], creditCost: 100, tier: 1, defaultParams: { duration: 5 } },
  { id: "runway-gen4", name: "Runway Gen-4.5", endpoint: "gen4_turbo", provider: "runway", category: "video", description: "Professional cinematic video", badge: "TOP", pricePerUnit: "$0.05/s", features: ["1080p", "Runway"], creditCost: 80, tier: 1 },
  { id: "lipsync", name: "Lipsync Studio", endpoint: "fal-ai/sync-lipsync", provider: "fal", category: "video", description: "Create realistic talking clips", pricePerUnit: "$0.08/video", features: ["Lipsync", "Avatar"], creditCost: 30, tier: 2, needsImage: true },
];

// ─── AUDIO MODELS ─────────────────────────────────────────────────────────────
export const AUDIO_MODELS: Model[] = [
  { id: "eleven-v3", name: "Eleven v3", endpoint: "https://api.elevenlabs.io/v1/text-to-speech", provider: "elevenlabs", category: "audio", description: "Expressive AI voice with emotion control", badge: "TOP", pricePerUnit: "$0.01/min", features: ["Emotion", "30+ languages"], creditCost: 10, tier: 1, defaultParams: { model_id: "eleven_v3" } },
  { id: "minimax-speech", name: "MiniMax Speech 2.8 HD", endpoint: "fal-ai/minimax/speech-02-hd", provider: "fal", category: "audio", description: "Studio-quality text-to-speech", badge: "NEW", pricePerUnit: "$0.008/min", features: ["HD quality", "Multilingual"], creditCost: 8, tier: 1 },
  { id: "seed-speech", name: "Seed Speech", endpoint: "fal-ai/bytedance/seed-speech", provider: "fal", category: "audio", description: "ByteDance multilingual voice", pricePerUnit: "$0.008/min", features: ["Multilingual", "Fast"], creditCost: 8, tier: 1 },
];

// ─── ALL MODELS ───────────────────────────────────────────────────────────────
export const ALL_MODELS = [...IMAGE_MODELS, ...VIDEO_MODELS, ...AUDIO_MODELS];

export function getModelById(id: string): Model | undefined {
  return ALL_MODELS.find(m => m.id === id);
}

export function getModelsByCategory(category: ModelCategory): Model[] {
  return ALL_MODELS.filter(m => m.category === category);
}

export const getModel = getModelById;

export function computeCost(model: Model, params?: Record<string, unknown>): number {
  if (model.perSecond) {
    const baseDuration = Number(model.defaultParams?.duration ?? 5);
    const duration = Number(params?.duration ?? baseDuration);
    const extra = Math.max(0, duration - baseDuration);
    return (model.creditCost ?? 5) + extra * model.perSecond;
  }
  return model.creditCost ?? 5;
}
