import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Credits could not be loaded.";
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase service role is not configured." },
        { status: 503 },
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select("credits, plan")
      .eq("clerk_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Credits lookup failed:", error);
      return NextResponse.json({ credits: 0, plan: "free" });
    }

    return NextResponse.json({
      credits: typeof data?.credits === "number" ? data.credits : 0,
      plan: typeof data?.plan === "string" ? data.plan : "free",
    });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
