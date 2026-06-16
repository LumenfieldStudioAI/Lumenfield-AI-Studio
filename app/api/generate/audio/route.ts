import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

type AudioRequest = {
  language?: string;
  mode?: string;
  speed?: number;
  text?: string;
  voiceId?: string;
  voiceModel?: string;
};

const voices: Record<string, string> = {
  british: "29vD33N1sMlS7gPQQHZT",
  female: "EXAVITQu4vr4xnSDxMaL",
  male: "TxGEqnHWrfWFTfGW9XjX",
  narrator: "21m00Tcm4TlvDq8ikWAM",
};

function waveform(points: number) {
  return Array.from({ length: points }, (_, index) => {
    const base = Math.sin(index * 0.3) * 30 + 50;
    const noise = (Math.random() - 0.5) * 40;
    return Math.max(5, Math.min(95, base + noise));
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AudioRequest;
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const voiceModel = body.voiceModel ?? "Eleven v3";
    const durationSeconds = Math.max(1, Math.ceil(text.split(/\s+/).length / 2.5));

    if (process.env.ELEVENLABS_API_KEY && voiceModel.toLowerCase().includes("eleven")) {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${body.voiceId ?? voices.narrator}`, {
        body: JSON.stringify({
          model_id: "eleven_multilingual_v2",
          text,
          voice_settings: {
            similarity_boost: 0.75,
            stability: 0.5,
            speed: body.speed ?? 1,
          },
        }),
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        method: "POST",
      });

      if (response.ok) {
        const audioBase64 = Buffer.from(await response.arrayBuffer()).toString("base64");
        return NextResponse.json({
          audioBase64,
          durationSeconds,
          format: "audio/mpeg",
          model: voiceModel,
          provider: "elevenlabs",
          waveform: waveform(60),
        });
      }
    }

    return NextResponse.json({
      audioUrl: null,
      durationSeconds,
      format: "audio/mpeg",
      model: voiceModel,
      provider: "simulation",
      simulated: true,
      waveform: waveform(80),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Audio generation failed" }, { status: 500 });
  }
}
