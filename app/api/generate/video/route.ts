import { NextRequest, NextResponse } from "next/server";
import { uploadFromUrl, generateKey } from "@/lib/r2";

export const runtime = "nodejs";
export const maxDuration = 300;

type VideoRequest = {
  aspectRatio?: string;
  cameraMotion?: string;
  duration?: string;
  firstFrameUrl?: string;
  model?: string;
  prompt?: string;
  resolution?: string;
  speed?: string;
  provider?: string;
};

function cinematicPrompt(prompt: string, camera?: string, speed?: string) {
  return [
    prompt,
    camera && camera !== "Static" ? `camera movement: ${camera}` : "",
    speed && speed !== "Auto" ? `${speed.toLowerCase()} motion` : "",
    "cinematic quality, high detail, professional lighting",
  ].filter(Boolean).join(", ");
}

async function saveToR2(videoUrl: string, userId = "anonymous"): Promise<string> {
  try {
    const key = generateKey(userId, "video", "mp4");
    const r2Url = await uploadFromUrl(videoUrl, key, "video/mp4");
    return r2Url;
  } catch (err) {
    console.error("R2 upload failed, returning original URL:", err);
    return videoUrl;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VideoRequest;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const model = body.model ?? "Seedance 2.0";
    const duration = body.duration ?? "4s";
    const aspectRatio = body.aspectRatio ?? "16:9";
    const resolution = body.resolution ?? "1080p";
    const provider = body.provider ?? "fal";
    const modelLower = model.toLowerCase();

    if (process.env.FAL_KEY && provider === "fal") {
      const endpoint = modelLower.includes("kling")
        ? "fal-ai/kling-video/v3/pro/text-to-video"
        : "fal-ai/bytedance/seedance/v2/pro/text-to-video";

      const submitRes = await fetch(`https://queue.fal.run/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: cinematicPrompt(prompt, body.cameraMotion, body.speed),
          aspect_ratio: aspectRatio,
          duration: parseInt(duration, 10),
          image_url: body.firstFrameUrl,
        }),
      });

      if (!submitRes.ok) {
        const err = await submitRes.text();
        return NextResponse.json({ error: "fal.ai submit failed", detail: err }, { status: 500 });
      }

      const submitData = await submitRes.json() as { request_id?: string };
      const requestId = submitData.request_id;
      if (!requestId) return NextResponse.json({ error: "No request ID from fal.ai" }, { status: 500 });

      for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 5000));

        const statusRes = await fetch(`https://queue.fal.run/${endpoint}/requests/${requestId}/status`, {
          headers: { Authorization: `Key ${process.env.FAL_KEY}` },
        });
        const statusData = await statusRes.json() as { status?: string };

        if (statusData.status === "COMPLETED") {
          const resultRes = await fetch(`https://queue.fal.run/${endpoint}/requests/${requestId}`, {
            headers: { Authorization: `Key ${process.env.FAL_KEY}` },
          });
          const result = await resultRes.json() as { video?: { url?: string } };
          const videoUrl = result?.video?.url;

          if (!videoUrl) return NextResponse.json({ error: "No video URL in result" }, { status: 500 });

          const savedUrl = await saveToR2(videoUrl);

          return NextResponse.json({
            success: true,
            provider: "fal",
            videoUrl: savedUrl,
            originalUrl: videoUrl,
          });
        }

        if (statusData.status === "FAILED") {
          return NextResponse.json({ error: "fal.ai generation failed" }, { status: 500 });
        }
      }

      return NextResponse.json({ error: "Timeout — try again" }, { status: 504 });
    }

    if (provider === "runway") {
      const runwayKey = process.env.RUNWAY_API_KEY;
      if (!runwayKey) return NextResponse.json({ error: "RUNWAY_API_KEY not configured" }, { status: 500 });

      const submitRes = await fetch("https://api.dev.runwayml.com/v1/text_to_video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${runwayKey}`,
          "Content-Type": "application/json",
          "X-Runway-Version": "2024-11-06",
        },
        body: JSON.stringify({
          promptText: cinematicPrompt(prompt, body.cameraMotion, body.speed),
          model: "gen4_turbo",
          ratio: aspectRatio === "9:16" ? "720:1280" : aspectRatio === "1:1" ? "720:720" : "1280:720",
          duration: parseInt(duration, 10) <= 5 ? 5 : 10,
        }),
      });

      if (!submitRes.ok) {
        const err = await submitRes.text();
        return NextResponse.json({ error: "Runway submit failed", detail: err }, { status: 500 });
      }

      const task = await submitRes.json() as { id?: string };
      const taskId = task.id;
      if (!taskId) return NextResponse.json({ error: "No task ID from Runway" }, { status: 500 });

      for (let i = 0; i < 48; i++) {
        await new Promise(r => setTimeout(r, 5000));

        const pollRes = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${runwayKey}`,
            "X-Runway-Version": "2024-11-06",
          },
        });
        const pollData = await pollRes.json() as { status?: string; output?: string[]; failure?: string };

        if (pollData.status === "SUCCEEDED") {
          const videoUrl = pollData.output?.[0];
          if (!videoUrl) return NextResponse.json({ error: "No video URL from Runway" }, { status: 500 });

          const savedUrl = await saveToR2(videoUrl);

          return NextResponse.json({
            success: true,
            provider: "runway",
            videoUrl: savedUrl,
            originalUrl: videoUrl,
          });
        }

        if (pollData.status === "FAILED") {
          return NextResponse.json({ error: "Runway generation failed", detail: pollData.failure }, { status: 500 });
        }
      }

      return NextResponse.json({ error: "Runway timeout — try again" }, { status: 504 });
    }

    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Video generation failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });
  return NextResponse.json({ jobId, status: "processing" });
}
