import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  return NextResponse.json({
    ok: true,
    id,
    provider: "lumen",
    status: "queued",
    progress: 0,
    message: "Request status route is ready. Connect a provider adapter to return live status.",
  });
}
