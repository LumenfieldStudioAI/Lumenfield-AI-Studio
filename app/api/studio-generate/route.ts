import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { findResultUrl } from "@/lib/generation/findResultUrl";

export const runtime = "nodejs";

type StudioMode = "image" | "product" | "video" | "audio" | "apps";

const imageModelMap: Record<string, string> = {
  "flux-dev": "fal-ai/flux/dev",
  "flux-schnell": "fal-ai/flux/schnell",
  "nano-banana-pro": "fal-ai/flux/dev",
  "flux-2": "fal-ai/flux/dev",
  "lumenfield-creative-3-5": "fal-ai/flux/dev",
};

const videoModelMap: Record<string, string> = {
  "seedance-2": "fal-ai/bytedance/seedance/v1/lite/text-to-video",
  "kling-3": "fal-ai/kling-video/v2.1/standard/text-to-video",
};

function selectModel(mode: StudioMode, model?: string) {
  if (mode === "video") return videoModelMap[model || ""] || videoModelMap["seedance-2"];
  return imageModelMap[model || ""] || model || imageModelMap["flux-dev"];
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = "image", model, modelId, params = {}, ...rest } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const key = process.env.FAL_KEY;
    if (!key) {
      return NextResponse.json({ error: "FAL_KEY is missing in Vercel Environment Variables." }, { status: 500 });
    }

    if (!["image", "product", "video", "audio", "apps"].includes(mode)) {
      return NextResponse.json({ error: "Unsupported studio mode." }, { status: 400 });
    }

    if (mode === "audio" || mode === "apps") {
      return NextResponse.json({
        ok: true,
        status: "ready",
        mode,
        message: `${mode} mode is prepared. Connect a dedicated provider endpoint next.`,
      });
    }

    fal.config({ credentials: key });

    const providerModel = selectModel(mode, model || modelId);
    const result = await fal.subscribe(providerModel, {
      input: {
        prompt,
        ...(mode === "video"
          ? { duration: params.duration || rest.duration || "5" }
          : { image_size: params.image_size || rest.image_size || "landscape_16_9", num_images: params.num_images || rest.num_images || 1 }),
        ...params,
        ...rest,
      },
      logs: false,
    });

    const media = findResultUrl(result);

    return NextResponse.json({
      ok: true,
      provider: "fal",
      mode,
      model: providerModel,
      media,
      imageUrl: media.type === "image" ? media.url : undefined,
      videoUrl: media.type === "video" ? media.url : undefined,
      url: media.url,
      type: media.type,
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Studio generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
