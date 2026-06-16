import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 45;

type InfluencerRequest = {
  age?: string;
  characterType?: string;
  ethnicity?: string;
  eyeColor?: string;
  gender?: string;
  skinColor?: string;
  skinConditions?: string[];
};

const personalities = [
  "Bold, confident, and visually magnetic.",
  "Mysterious, elegant, and quietly intense.",
  "Playful, energetic, and highly shareable.",
  "Sophisticated, aspirational, and brand-safe.",
];

const niches = ["Fashion & Lifestyle", "Tech & Innovation", "Wellness & Fitness", "Gaming & Entertainment", "Art & Creativity"];

function promptFor(body: InfluencerRequest) {
  return [
    `Ultra-realistic ${body.age ?? "young adult"} ${body.gender ?? "person"} ${body.characterType ?? "human"} character`,
    `${body.ethnicity ?? "global"} origin`,
    `${body.skinColor ?? "natural"} skin`,
    `${body.eyeColor ?? "expressive"} eyes`,
    ...(body.skinConditions ?? []),
    "professional portrait photography",
    "studio lighting",
    "social media influencer portrait",
  ].join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as InfluencerRequest;
    const characterId = `inf_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const names = ["Nova", "Zara", "Kai", "Aurora", "Vex", "Luna", "Orion", "Nyx"];
    const suffixes = ["X", "Prime", "AI", "Studio", "One"];
    const name = `${names[Math.floor(Math.random() * names.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    const profile = {
      bio: `${name} is a ${body.age ?? "young adult"} ${body.characterType ?? "virtual"} creator built for campaigns, reels and brand partnerships.`,
      contentStyle: "Cinematic reels, editorial stills, product stories",
      niche: niches[Math.floor(Math.random() * niches.length)],
      personality: personalities[Math.floor(Math.random() * personalities.length)],
      voiceStyle: "Warm, confident, aspirational",
    };

    if (process.env.FAL_KEY) {
      const response = await fetch("https://fal.run/fal-ai/flux/dev", {
        body: JSON.stringify({
          image_size: { height: 1024, width: 768 },
          num_images: 1,
          prompt: promptFor(body),
        }),
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as { images?: Array<{ url?: string }> };
        return NextResponse.json({
          attributes: body,
          characterId,
          imageUrl: data.images?.[0]?.url ?? "",
          name,
          profile,
          provider: "fal",
        });
      }
    }

    return NextResponse.json({
      attributes: body,
      characterId,
      imageUrl: `https://picsum.photos/seed/${characterId}/768/1024`,
      name,
      profile,
      provider: "simulation",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Influencer generation failed" }, { status: 500 });
  }
}
