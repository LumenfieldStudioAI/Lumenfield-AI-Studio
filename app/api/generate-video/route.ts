import { fal } from "@fal-ai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      return Response.json({ ok: false, error: "FAL_KEY eksik." }, { status: 500 });
    }

    fal.config({ credentials: falKey });

    const body = await req.json();
    const prompt = body.prompt?.trim();

    if (!prompt || prompt.length < 3) {
      return Response.json({ ok: false, error: "Prompt yazman gerekiyor." }, { status: 400 });
    }

    const result = await fal.subscribe("fal-ai/kling-video/v1.6/standard/text-to-video", {
      input: {
        prompt,
        duration: "5",
        aspect_ratio: "16:9",
      },
    });

    return Response.json({
      ok: true,
      url: (result.data as { video?: { url?: string } }).video?.url,
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Video üretilemedi.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
