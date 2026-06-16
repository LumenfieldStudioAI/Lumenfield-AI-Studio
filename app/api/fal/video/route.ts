import { fal } from "@fal-ai/client";
import { findResultUrl } from "@/lib/generation/findResultUrl";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const {
      prompt,
      model = "fal-ai/bytedance/seedance/v1/lite/text-to-video",
      duration = "5",
      aspect_ratio = "16:9",
      resolution = "720p",
      ...params
    } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required." }, { status: 400 });
    }

    const key = process.env.FAL_KEY;
    if (!key) {
      return Response.json({ error: "FAL_KEY is missing in Vercel Environment Variables." }, { status: 500 });
    }

    fal.config({ credentials: key });

    const result = await fal.subscribe(model, {
      input: {
        prompt,
        duration,
        aspect_ratio,
        resolution,
        ...params,
      },
      logs: false,
    });

    const media = findResultUrl(result);

    return Response.json({
      ok: true,
      provider: "fal",
      model,
      media,
      imageUrl: media.type === "image" ? media.url : undefined,
      videoUrl: media.type === "video" ? media.url : undefined,
      url: media.url,
      type: media.type,
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Video generation failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
