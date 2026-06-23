import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getCreditCost, getUserCredits } from "@/lib/credits";

fal.config({ credentials: process.env.FAL_KEY! });

export async function POST(req: NextRequest) {
  // ① Kimlik doğrulama
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Giriş yapman gerekiyor" },
      { status: 401 }
    );
  }

  // ② Body parse + validasyon
  let body: { prompt?: string; model?: string; params?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const { prompt, model, params = {} } = body;

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt boş olamaz" }, { status: 400 });
  }
  if (prompt.trim().length < 3) {
    return NextResponse.json(
      { error: "Prompt çok kısa, daha fazla detay ekle" },
      { status: 400 }
    );
  }
  if (!model) {
    return NextResponse.json({ error: "Model seçilmedi" }, { status: 400 });
  }

  // ③ Kredi kontrolü
  const cost = getCreditCost(model);
  const balance = await getUserCredits(userId);

  if (balance < cost) {
    return NextResponse.json(
      {
        error: `Yetersiz kredi. Bu işlem ${cost} kredi gerektirir, bakiyen: ${balance}`,
        balance,
        required: cost,
      },
      { status: 402 }
    );
  }

  // ④ fal.ai'ye async job gönder
  try {
    const { request_id } = await fal.queue.submit(model, {
      input: { prompt: prompt.trim(), ...params },
      webhookUrl: process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/fal-webhook`
        : undefined,
    });

    // ⑤ Supabase'e kaydet (PENDING)
    await supabaseAdmin.from("jobs").insert({
      clerk_user_id: userId,
      request_id,
      model,
      prompt: prompt.trim(),
      status: "pending",
      credits_cost: cost,
      metadata: { params },
    });

    return NextResponse.json({ job_id: request_id, cost }, { status: 200 });
  } catch (err: unknown) {
    console.error("[studio-generate] fal.ai error:", err);
    return NextResponse.json(
      {
        error: "Üretim başlatılamadı. Lütfen tekrar dene.",
        detail: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
