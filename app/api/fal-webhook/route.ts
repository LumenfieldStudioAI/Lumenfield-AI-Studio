import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { spendCredits } from "@/lib/credits";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { request_id, status, payload } = body as {
    request_id?: string;
    status?: string;
    payload?: Record<string, unknown>;
  };

  if (!request_id) {
    return NextResponse.json({ ok: false });
  }

  const { data: job } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("request_id", request_id)
    .single();

  if (!job) return NextResponse.json({ ok: false });

  if (status === "OK") {
    const p = payload ?? {};
    const outputUrl =
      (p?.video as { url?: string })?.url ??
      (p?.image as { url?: string })?.url ??
      ((p?.images as { url: string }[])?.[0]?.url) ??
      (p?.audio_url as string) ??
      null;

    await supabaseAdmin
      .from("jobs")
      .update({
        status: "completed",
        output_url: outputUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("request_id", request_id);

    await spendCredits(job.clerk_user_id, job.credits_cost);
  } else {
    await supabaseAdmin
      .from("jobs")
      .update({ status: "failed", updated_at: new Date().toISOString() })
      .eq("request_id", request_id);
  }

  return NextResponse.json({ ok: true });
}
