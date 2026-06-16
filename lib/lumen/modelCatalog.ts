export type LumenBadge = "NEW" | "TOP" | "EXCLUSIVE" | "TRENDING";

export type LumenFeature = {
  icon: string;
  title: string;
  desc: string;
  badge?: LumenBadge;
};

export type LumenModel = {
  icon: string;
  name: string;
  desc: string;
  badge?: LumenBadge;
};

export type LumenProduct = {
  title: string;
  desc: string;
  badge?: LumenBadge;
};

export const imageFeatures: LumenFeature[] = [
  { icon: "IMG", title: "Create Image", desc: "Generate AI images" },
  { icon: "CAM", title: "Cinematic Cameras", desc: "Image generation with camera controls", badge: "TOP" },
  { icon: "CAN", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "MOO", title: "Moodboard", desc: "Turn references into a focused board" },
  { icon: "AI", title: "AI Influencer", desc: "Create and manage your AI influencer" },
  { icon: "LIT", title: "Relight", desc: "Adjust lighting and brightness" },
  { icon: "UP", title: "Image Upscale", desc: "Enhance image quality" },
  { icon: "CHR", title: "Character Swap", desc: "Create consistent character swaps" },
  { icon: "BG", title: "Background Remover", desc: "Remove or replace backgrounds instantly" },
  { icon: "TRY", title: "Virtual Try-On", desc: "Place garments on models and creators" },
  { icon: "TXT", title: "Text to Image", desc: "Create visuals from detailed prompts" },
  { icon: "REF", title: "Reference Remix", desc: "Use references to keep style and identity" },
];

export const imageModels: LumenModel[] = [
  { icon: "LS", name: "Lumenfield Soul 2.0", desc: "Ultra-realistic fashion visuals", badge: "TOP" },
  { icon: "LC", name: "Lumenfield Soul Cinema", desc: "Cinematic film-grade aesthetic" },
  { icon: "LP", name: "Lumenfield Popcorn", desc: "Storyboard, edit, create" },
  { icon: "GI", name: "GPT Image 2", desc: "4K images with strong text rendering", badge: "NEW" },
  { icon: "NB", name: "Nano Banana 2", desc: "Pro quality at flash speed", badge: "NEW" },
  { icon: "FX", name: "FLUX.2", desc: "Speed-optimized detail" },
  { icon: "FD", name: "FLUX Dev", desc: "Reliable image generation for production" },
  { icon: "FS", name: "FLUX Schnell", desc: "Fast draft generation" },
  { icon: "RC", name: "Recraft V4.1", desc: "Photorealistic and expressive generation" },
  { icon: "ZI", name: "Z-Image", desc: "Instant lifelike portraits" },
  { icon: "SD", name: "Seedream", desc: "Creative image generation and editing" },
  { icon: "ID", name: "Ideogram", desc: "Strong typography and poster generation" },
  { icon: "MJ", name: "Midjourney Style", desc: "Art-directed concept visuals" },
  { icon: "RV", name: "Runway Frames", desc: "Reference-based cinematic frames" },
];

export const videoFeatures: LumenFeature[] = [
  { icon: "VID", title: "Create Video", desc: "Generate AI videos" },
  { icon: "CIN", title: "Cinema Studio", desc: "Cinematic video with AI director", badge: "TOP" },
  { icon: "CAN", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "MIX", title: "Mixed Media", desc: "Create mixed media projects" },
  { icon: "AD", title: "Click to Ad", desc: "Turn product URLs into video ads" },
  { icon: "LIP", title: "Lip Sync Studio", desc: "Create talking clips" },
  { icon: "DRW", title: "Draw to Video", desc: "Sketch turns into a cinema" },
  { icon: "UP", title: "Video Upscale", desc: "Enhance video quality" },
  { icon: "TXT", title: "Text to Video", desc: "Generate clips from a prompt" },
  { icon: "I2V", title: "Image to Video", desc: "Animate a still image" },
  { icon: "MOT", title: "Motion Control", desc: "Guide camera and subject movement" },
  { icon: "SFX", title: "Video with Sound", desc: "Create video concepts with audio direction" },
];

export const videoModels: LumenModel[] = [
  { icon: "SD", name: "Seedance 2.0", desc: "Most advanced video model", badge: "TOP" },
  { icon: "S1", name: "Seedance 1.0 Lite", desc: "Fast text-to-video generation" },
  { icon: "KG", name: "Kling 3.0", desc: "Cinematic videos with audio", badge: "TOP" },
  { icon: "KM", name: "Kling 3.0 Motion Control", desc: "Transfer motion from video to image" },
  { icon: "K2", name: "Kling 2.1 Standard", desc: "Stable text-to-video model" },
  { icon: "S2", name: "Sora 2", desc: "Advanced video model" },
  { icon: "V3", name: "Veo 3.1", desc: "Advanced AI video with sound" },
  { icon: "RN", name: "Runway Gen-4", desc: "Cinematic generation and editing" },
  { icon: "PI", name: "Pika", desc: "Creative short-form clips" },
  { icon: "LU", name: "Luma Ray", desc: "Camera-aware video generation" },
  { icon: "HH", name: "HappyHorse", desc: "High ranked video and audio model" },
  { icon: "W2", name: "Wan 2.7", desc: "First and end frame control", badge: "NEW" },
  { icon: "LD", name: "Lumenfield DOP", desc: "VFX and camera control" },
];

export const audioFeatures: LumenFeature[] = [
  { icon: "AUD", title: "Create Audio", desc: "Generate voice, music, and sound ideas" },
  { icon: "VO", title: "Voiceover", desc: "Turn scripts into spoken scenes" },
  { icon: "LIP", title: "Lip Sync Audio", desc: "Prepare voice tracks for talking videos" },
  { icon: "MUS", title: "Music Prompt", desc: "Create music direction from text" },
  { icon: "SFX", title: "Sound Effects", desc: "Generate sound design prompts" },
  { icon: "DUB", title: "Dubbing", desc: "Localize creator videos" },
];

export const audioModels: LumenModel[] = [
  { icon: "EL", name: "ElevenLabs", desc: "Voiceover and dubbing workflow", badge: "TOP" },
  { icon: "SN", name: "Suno", desc: "Music concept generation" },
  { icon: "UD", name: "Udio", desc: "Song and music idea generation" },
  { icon: "OS", name: "OpenAI Audio", desc: "Speech, voice and realtime audio" },
  { icon: "ML", name: "MusicLM Style", desc: "Music direction and composition ideas" },
  { icon: "LM", name: "Lumenfield Voice", desc: "Brand-safe voice workflow", badge: "NEW" },
];

export const exploreProducts: LumenProduct[] = [
  { title: "SUPERCOMPUTER", desc: "Agents, automation, skills, connectors, AI drive and more", badge: "NEW" },
  { title: "MCP & CLI", desc: "Turn your assistant into a creative engine", badge: "NEW" },
  { title: "MARKETING STUDIO", desc: "Turn any product into a video ad", badge: "TRENDING" },
  { title: "CINEMA STUDIO", desc: "Direct cinematic image and video workflows", badge: "TOP" },
  { title: "AUDIO STUDIO", desc: "Voice, music and sound workflow hub", badge: "NEW" },
  { title: "AI INFLUENCER", desc: "Create consistent characters and campaigns", badge: "TRENDING" },
];

export const trendingTools: LumenFeature[] = [
  { icon: "CLI", title: "MCP & CLI", desc: "Automate your production", badge: "NEW" },
  { icon: "AI", title: "AI Influencer", desc: "Create and manage your AI influencer", badge: "TRENDING" },
  { icon: "MKT", title: "Marketing Studio", desc: "Turn any product into a video ad" },
  { icon: "KG", title: "Kling 3.0", desc: "Cinematic videos with audio", badge: "EXCLUSIVE" },
  { icon: "CIN", title: "Cinema Studio", desc: "Versatile image styles by xAI" },
  { icon: "CAN", title: "Canvas", desc: "Full workflow on one canvas" },
  { icon: "RUN", title: "Runway Gen-4", desc: "Cinematic generation and editing" },
  { icon: "ELE", title: "ElevenLabs", desc: "Voiceover and dubbing workflow" },
  { icon: "SUN", title: "Suno", desc: "Music concept generation" },
  { icon: "FLX", title: "FLUX", desc: "Fast image generation" },
];
