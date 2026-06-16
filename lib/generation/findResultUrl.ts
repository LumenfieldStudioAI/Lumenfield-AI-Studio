export type GenerationMediaType = "image" | "video" | "unknown";

export type GenerationMedia = {
  url?: string;
  type: GenerationMediaType;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function inferType(url: string): GenerationMediaType {
  const lower = url.toLowerCase();
  if (lower.includes(".mp4") || lower.includes(".webm") || lower.includes("video")) return "video";
  if (lower.includes(".png") || lower.includes(".jpg") || lower.includes(".jpeg") || lower.includes(".webp") || lower.includes("image")) return "image";
  return "unknown";
}

export function findResultUrl(value: unknown): GenerationMedia {
  if (typeof value === "string" && value.startsWith("http")) {
    return { url: value, type: inferType(value) };
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const media = findResultUrl(item);
      if (media.url) return media;
    }
    return { type: "unknown" };
  }

  if (!isRecord(value)) return { type: "unknown" };

  const commonKeys = ["url", "image_url", "video_url", "output", "result", "file", "media"];
  for (const key of commonKeys) {
    const media = findResultUrl(value[key]);
    if (media.url) return media;
  }

  const collectionKeys = ["images", "videos", "files", "results", "data", "jobs"];
  for (const key of collectionKeys) {
    const media = findResultUrl(value[key]);
    if (media.url) return media;
  }

  return { type: "unknown" };
}
