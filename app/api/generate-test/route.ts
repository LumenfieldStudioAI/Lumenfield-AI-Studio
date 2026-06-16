import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

type TestRequest = {
  prompt?: string;
};

type FalImageResult = {
  data?: {
    images?: Array<{ url?: string }>;
  };
  images?: Array<{ url?: string }>;
};

function getImageUrl(result: FalImageResult): string | undefined {
  return result.data?.images?.[0]?.url ?? result.images?.[0]?.url;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt } = (await req.json()) as TestRequest;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY is not configured in Vercel environment variables" },
        { status: 503 },
      );
    }

    fal.config({ credentials: process.env.FAL_KEY });

    const result = (await fal.subscribe("fal-ai/flux/dev", {
      input: { prompt, image_size: "landscape_16_9", num_images: 1 },
    })) as FalImageResult;

    const url = getImageUrl(result);

    if (!url) {
      return NextResponse.json(
        { error: "The provider did not return an image URL", result },
        { status: 502 },
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Test generation failed", detail },
      { status: 500 },
    );
  }
}
