import { fal } from "@fal-ai/client";
import { findResultUrl } from "@/lib/generation/findResultUrl";

export async function POST(req: Request) {
  try {
    const { prompt, model = "fal-ai/flux/dev", ...params } = await req.json();

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
        image_size: params.image_size || "landscape_16_9",
        num_images: params.num_images || 1,
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
      result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
