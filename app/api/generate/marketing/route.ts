import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type MarketingRequest = {
  count?: number;
  hookType?: string;
  productTab?: "product" | "app";
  prompt?: string;
  setting?: string;
  ugcType?: string;
};

const gradients = [
  "linear-gradient(160deg,#ec4899,#a855f7)",
  "linear-gradient(160deg,#f59e0b,#ef4444)",
  "linear-gradient(160deg,#6366f1,#06b6d4)",
  "linear-gradient(160deg,#10b981,#3b82f6)",
];

function fallbackScript(prompt: string, ugcType: string, hookType: string, setting: string) {
  return `[${hookType}] ${prompt}
Scene opens in a ${setting.toLowerCase()}.
The product is shown in use.
Real people. Real results.
[${ugcType}] authentic, relatable, compelling.
Try it today.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MarketingRequest;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const ugcType = body.ugcType ?? "UGC";
    const hookType = body.hookType ?? "Strong Hook";
    const setting = body.setting ?? "Studio";
    const productTab = body.productTab ?? "product";
    const count = Math.min(Math.max(body.count ?? 3, 1), 4);
    let adScript = fallbackScript(prompt, ugcType, hookType, setting);
    let provider = "simulation";

    if (process.env.OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        body: JSON.stringify({
          max_tokens: 300,
          messages: [
            {
              content: `Write a short ${ugcType} video ad script. Hook style: ${hookType}. Setting: ${setting}. No emojis.`,
              role: "system",
            },
            { content: `Write a 15-second ${productTab} ad for: ${prompt}`, role: "user" },
          ],
          model: "gpt-4o-mini",
          temperature: 0.8,
        }),
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
        adScript = data.choices?.[0]?.message?.content ?? adScript;
        provider = "openai+simulation";
      }
    }

    return NextResponse.json({
      adScript,
      provider,
      variants: Array.from({ length: count }, (_, index) => ({
        aspectRatio: "9:16",
        callToAction: "Try it today",
        duration: "15s",
        hook: hookType,
        id: `ad_${Date.now()}_${index}`,
        metadata: { hookType, productTab, ugcType },
        script: adScript,
        setting,
        status: "simulated",
        thumbnailGradient: gradients[index % gradients.length],
      })),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Marketing generation failed" }, { status: 500 });
  }
}
