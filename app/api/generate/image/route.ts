import { NextRequest, NextResponse } from "next/server";
import { uploadFromUrl, generateKey } from "@/lib/r2";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, aspectRatio = "16:9" } = body;

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const falKey = process.env.FAL_KEY;
    if (!falKey) return NextResponse.json({ error: "FAL_KEY not configured" }, { status: 500 });

    const sizeMap: Record<string, string> = {
      "16:9": "landscape_16_9",
      "9:16": "portrait_16_9",
      "1:1": "square",
      "4:3": "landscape_4_3",
    };

    const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        image_size: sizeMap[aspectRatio] || "landscape_16_9",
        num_images: 1,
        enable_safety_checker: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Image generation failed", detail: err }, { status: 500 });
    }

    const result = await response.json();
    const imageUrl = result?.images?.[0]?.url;
    if (!imageUrl) return NextResponse.json({ error: "No image URL in result" }, { status: 500 });

    let savedUrl = imageUrl;
    try {
      const key = generateKey("anonymous", "image", "webp");
      savedUrl = await uploadFromUrl(imageUrl, key, "image/webp");
    } catch (err) {
      console.error("R2 upload failed:", err);
    }

    return NextResponse.json({
      success: true,
      imageUrl: savedUrl,
      originalUrl: imageUrl,
    });
  } catch (err) {
    console.error("Image API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
