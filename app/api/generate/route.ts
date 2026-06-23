import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

import { computeCost, getModel } from "@/lib/models";

type GenerateRequest = {
  modelId?: string;
  prompt?: string;
  params?: Record<string, unknown>;
};

type FalOutput = {
  data?: {
    images?: Array<{ url?: string }>;
    video?: { url?: string };
    audio?: { url?: string };
  };
  images?: Array<{ url?: string }>;
  video?: { url?: string };
  audio?: { url?: string };
};

function extractOutputUrl(result: FalOutput): string | undefined {
  return (
    result.data?.images?.[0]?.url ??
    result.data?.video?.url ??
    result.data?.audio?.url ??
    result.images?.[0]?.url ??
    result.video?.url ??
    result.audio?.url
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateRequest;
    const model = body.modelId ? getModel(body.modelId) : undefined;

    if (!model) {
      return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }

    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const cost = computeCost(model, body.params);

    if (model.provider === "elevenlabs") {
      return NextResponse.json(
        { error: "ElevenLabs is registered but not enabled yet", cost, model },
        { status: 501 },
      );
    }

    if (model.provider !== "fal") {
      return NextResponse.json(
        { error: `${model.provider} is registered but not enabled yet`, cost, model },
        { status: 501 },
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: "FAL_KEY is not configured", cost, model },
        { status: 503 },
      );
    }

    fal.config({ credentials: process.env.FAL_KEY });

    // model.id IS the fal.ai endpoint string (e.g. "fal-ai/flux/schnell")
    const result = (await fal.subscribe(model.id, {
      input: { prompt: body.prompt, ...model.defaultParams, ...body.params },
    })) as FalOutput;

    const url = extractOutputUrl(result);

    if (!url) {
      return NextResponse.json(
        { error: "The provider did not return an asset URL", cost, result },
        { status: 502 },
      );
    }

    return NextResponse.json({
      url,
      cost,
      model: {
        id:       model.id,
        label:    model.name,
        type:     model.category,
        provider: model.provider,
      },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Generation failed", detail },
      { status: 500 },
    );
  }
}
