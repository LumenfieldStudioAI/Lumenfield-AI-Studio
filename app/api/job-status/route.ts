import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { spendCredits } from "@/lib/credits";

fal.config({ credentials: process.env.FAL_KEY! });

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobId = req.nextUrl.searchParams.get("id");
  if (!jobId) {
    return NextResponse.json({ error: "job_id gerekli" }, { status: 400 });
  }

  // DB'den çek — kullanıcı sahipliği doğrula
  const { data: job } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("request_id", jobId)
    .eq("clerk_user_id", userId)
    .single();

  if (!job) {
    return NextResponse.json({ error: "Job bulunamadı" }, { status: 404 });
  }

  // Zaten tamamlandıysa direkt dön (polling'i durdurur)
  if (job.status === "completed") {
    return NextResponse.json({
      status: "completed",
      output_url: job.output_url,
      thumbnail_url: job.thumbnail_url,
    });
  }
  if (job.status === "failed") {
    return NextResponse.json({ status: "failed" });
  }

  // fal.ai'den anlık durum sorgula
  try {
    const falStatus = await fal.queue.status(job.model, {
      requestId: jobId,
      logs: false,
    });

    if (falStatus.status === "COMPLETED") {
      // Sonucu çek
      const result = await fal.queue.result(job.model, { requestId: jobId });
      const r = result.data as Record<string, unknown>;

      // Farklı model çıktı formatlarını normalize et
      const outputUrl =
        (r?.video as { url?: string })?.url ??
        (r?.image as { url?: string })?.url ??
        ((r?.images as { url: string }[])?.[0]?.url) ??
        (r?.audio_url as string) ??
        null;

      const thumbnailUrl =
        (r?.image as { url?: string })?.url ??
        ((r?.images as { url: string }[])?.[0]?.url) ??
        null;

      // DB güncelle → COMPLETED
      await supabaseAdmin
        .from("jobs")
        .update({
          status: "completed",
          output_url: outputUrl,
          thumbnail_url: thumbnailUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("request_id", jobId);

      // Krediyi düş
      await spendCredits(userId, job.credits_cost);

      return NextResponse.json({
        status: "completed",
        output_url: outputUrl,
        thumbnail_url: thumbnailUrl,
      });
    }

    if (falStatus.status === "FAILED") {
      await supabaseAdmin
        .from("jobs")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("request_id", jobId);
      return NextResponse.json({ status: "failed" });
    }

    // Hâlâ işleniyor
    const queuePos = (falStatus as Record<string, unknown>).queue_position;
    return NextResponse.json({
      status: "pending",
      queue_position: typeof queuePos === "number" ? queuePos : null,
    });
  } catch (err: unknown) {
    console.error("[job-status] fal error:", err);
    // Geçici hata — polling devam etsin
    return NextResponse.json({ status: "pending" });
  }
}
