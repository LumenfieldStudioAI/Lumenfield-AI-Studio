import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { findResultUrl } from "@/lib/generation/findResultUrl";

export const runtime = "nodejs";

const imageModelMap: Record<string, string> = {
  "gpt-image-2":     "fal-ai/gpt-image-2",
  "nano-banana-pro": "fal-ai/nano-banana-pro",
  "nano-banana-2":   "fal-ai/nano-banana",
  "flux-2":          "fal-ai/flux-pro/v1.1",
  "flux-dev":        "fal-ai/flux/dev",
  "flux-schnell":    "fal-ai/flux/schnell",
  "recraft":         "fal-ai/recraft-v3",
  "seedream-5-lite": "fal-ai/bytedance/seedream/v4",
  "grok-image":      "fal-ai/grok-imagine/image",
  "z-image":         "fal-ai/z-image",
};

const videoModelMap: Record<string, string> = {
  "cs35":             "fal-ai/bytedance/seedance/v2/pro/text-to-video",
  "cs30":             "fal-ai/kling-video/v3/pro/text-to-video",
  "cs25":             "fal-ai/bytedance/seedance/v1/pro/text-to-video",
  "seedance-2":       "fal-ai/bytedance/seedance/v2/pro/text-to-video",
  "seedance-2-fast":  "fal-ai/bytedance/seedance/v2/lite/text-to-video",
  "seedance-1-5-pro": "fal-ai/bytedance/seedance/v1/pro/text-to-video",
  "kling-3":          "fal-ai/kling-video/v3/pro/text-to-video",
  "kling-3-mc":       "fal-ai/kling-video/v3/pro/text-to-video",
  "minimax-hailuo":   "fal-ai/minimax/hailuo-02/standard/text-to-video",
  "veo-3-1":          "fal-ai/veo3.1",
  "veo-3-1-lite":     "fal-ai/veo3.1/lite",
  "wan-2-7":          "fal-ai/wan/v2.7/text-to-video",
  "happyhorse":       "fal-ai/happy-horse",
};

function toImageSize(aspect?: string): string {
  const map: Record<string, string> = {
    "16:9": "landscape_16_9",
    "9:16": "portrait_9_16",
    "1:1":  "square_hd",
    "4:3":  "landscape_4_3",
    "3:4":  "portrait_4_3",
  };
  return map[aspect ?? "16:9"] ?? "landscape_16_9";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      prompt?: string;
      mode?: string;
      model?: string;
      modelId?: string;
      params?: Record<string, unknown>;
    };

    const { prompt, mode = "image", model, modelId, params = {} } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const key = process.env.FAL_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "FAL_KEY is missing in Vercel Environment Variables." },
        { status: 500 }
      );
    }

    if (mode === "audio" || mode === "apps") {
      return NextResponse.json({ ok: true, mode, message: `${mode} mode coming soon.` });
    }

    fal.config({ credentials: key });

    const resolvedId = modelId || model || (mode === "video" ? "seedance-2" : "gpt-image-2");
    const isVideo    = mode === "video" || resolvedId in videoModelMap;
    const endpoint   = isVideo
      ? (videoModelMap[resolvedId] ?? videoModelMap["seedance-2"])
      : (imageModelMap[resolvedId] ?? imageModelMap["gpt-image-2"]);

    const input: Record<string, unknown> = { prompt };

    if (isVideo) {
      input.duration     = Number(params.duration ?? 5);
      input.aspect_ratio = params.aspect_ratio ?? "16:9";
      if (params.resolution) input.resolution = params.resolution;
    } else {
      input.image_size = toImageSize(params.aspect_ratio as string | undefined);
      input.num_images = 1;
    }

    const result = await fal.subscribe(endpoint, { input, logs: false });
    const media  = findResultUrl(result);

    return NextResponse.json({
      ok:       true,
      url:      media.url,
      type:     media.type,
      model:    resolvedId,
      endpoint,
      provider: "fal",
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";
    console.error("[STUDIO-GENERATE]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
