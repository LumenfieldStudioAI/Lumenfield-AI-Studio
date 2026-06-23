export interface CinemaModel {
  id: string;
  label: string;
  description: string;
  category: "cinema" | "video" | "animation" | "experimental";
  badge?: string;
  falId?: string;
}

export const CINEMA_MODELS: CinemaModel[] = [
  // Cinema Models
  { id: "seedance-2.0",               label: "Seedance 2.0",                 description: "Premium cinematic video generation",  category: "cinema",  badge: "FEATURED", falId: "fal-ai/fast-animatediff/text-to-video" },
  { id: "seedance-2.0-fast",          label: "Seedance 2.0 Fast",            description: "Faster generation, same quality",     category: "cinema",                     falId: "fal-ai/fast-animatediff/text-to-video" },
  { id: "seedance-2.0-mini",          label: "Seedance 2.0 Mini",            description: "Compact and efficient",               category: "cinema"  },
  { id: "seedance-2.0-enhanced-fast", label: "Enhanced Seedance 2.0 Fast",   description: "Enhanced speed and quality",          category: "cinema",  badge: "NEW" },
  { id: "seedance-2.0-exclusive-mini",label: "Exclusive Seedance 2.0 Mini",  description: "Exclusive mini model",                category: "cinema"  },
  { id: "seedance-pro",               label: "Seedance Pro",                 description: "Professional grade output",           category: "cinema",  badge: "PRO" },
  { id: "seedance-pro-fast",          label: "Seedance Pro Fast",            description: "Pro quality at faster speed",         category: "cinema"  },
  { id: "seedance-lite",              label: "Seedance Lite",                description: "Lightweight model for quick tests",   category: "cinema"  },
  // Video Models
  { id: "kling-3.0",        label: "Kling 3.0",          description: "KlingAI latest flagship",           category: "video", badge: "HOT",  falId: "fal-ai/kling-video/v1.6/pro/text-to-video" },
  { id: "veo-3.1",          label: "Veo 3.1",            description: "Google DeepMind video model",       category: "video", badge: "NEW" },
  { id: "veo-3.1-fast",     label: "Veo 3.1 Fast",       description: "Faster Veo generation",            category: "video" },
  { id: "sora-2",           label: "Sora 2",             description: "OpenAI Sora second generation",    category: "video" },
  { id: "wan-2.6",          label: "Wan 2.6",            description: "Wanx video generation",            category: "video" },
  { id: "wan-2.7",          label: "Wan 2.7",            description: "Latest Wan model",                 category: "video", badge: "NEW" },
  { id: "minimax-hailuo-02",label: "MiniMax Hailuo",     description: "MiniMax cinematic video",          category: "video" },
  { id: "grok-imagine-1.5", label: "Grok Imagine Video", description: "xAI ranked #1 video model",       category: "video" },
  { id: "runway-gen-3",     label: "Runway Gen-3",       description: "Runway Gen-3 Alpha Turbo",        category: "video", falId: "fal-ai/runway-gen3a-turbo" },
  // Animation
  { id: "dream-motion",     label: "Dream Motion",       description: "Dream motion synthesis",           category: "animation" },
];

export const FAL_MODEL_MAP: Record<string, string> = Object.fromEntries(
  CINEMA_MODELS
    .filter(m => m.falId)
    .map(m => [m.id, m.falId!])
);

export const DEFAULT_FAL_ID = "fal-ai/fast-animatediff/text-to-video";

export const GENRES = [
  "General","Action","Horror","Comedy","Drama","Noir","Epic",
  "Western","Suspense","Intimate","Spectacle","Sci-Fi",
  "Documentary","Commercial","Music Video",
];

export const STYLES = [
  "Auto","Naturalistic Clean","Bleach Bypass","Hyper Neon",
  "Teal Orange Epic","Soft Cross","Orange Teal","Black and White",
  "Vintage","Monochrome","Pastel","Cinematic","3D Render",
  "Anime","Ghibli","Pixar","Simpsons","LEGO","Minecraft",
  "Retro Disney","Rick and Morty",
];

export const CAMERA_BODIES = [
  "Modular 8K Digital","Full-Frame Cine Digital","Grand Format 70mm Film",
  "Studio Digital S35","Classic 16mm Film","Premium Large Format Digital",
];

export const LENSES = [
  "Creative Tilt Lens","Compact Anamorphic","Extreme Macro",
  "70s Cinema Prime","Classic Anamorphic","Premium Modern Prime",
  "Warm Cinema Prime","Swirl Bokeh Portrait","Vintage Prime",
  "Halation Diffusion","Clinical Sharp Prime",
];

export const FOCAL_LENGTHS = ["8mm","14mm","24mm","35mm","50mm","85mm"];
export const APERTURES     = ["f/1.4","f/4","f/11"];
export const RESOLUTIONS   = ["480p","720p","1080p","2K","4K"];
export const QUALITIES     = ["Basic","High"];
export const DURATIONS     = ["3s","4s","5s","8s","10s","12s","15s"];
export const ASPECT_RATIOS = ["1:1","3:4","4:3","9:16","16:9","3:2","2:3","5:4","4:5","21:9"];

export const CATEGORY_LABELS: Record<string, string> = {
  cinema:       "Cinema Models",
  video:        "Video Models",
  animation:    "AI Animation",
  experimental: "Experimental",
};
