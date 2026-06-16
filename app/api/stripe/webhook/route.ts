import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

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
  return error instanceof Error ? error.message : "Webhook request failed.";
}

type StripeWebhookEvent = {
  type?: string;
  data?: {
    object?: {
      id?: string;
      metadata?: Record<string, string> | null;
    };
  };
};

function verifyStripeSignature(body: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts
    .filter((part) => part.startsWith("v1="))
    .map((part) => part.slice(3));

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`, "utf8")
    .digest("hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  return signatures.some((signature) => {
    const actualBuffer = Buffer.from(signature, "hex");

    return (
      actualBuffer.length === expectedBuffer.length &&
      timingSafeEqual(actualBuffer, expectedBuffer)
    );
  });
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not configured." },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: StripeWebhookEvent;

  try {
    const body = await req.text();

    if (!verifyStripeSignature(body, signature, webhookSecret)) {
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }

    event = JSON.parse(body) as StripeWebhookEvent;
  } catch (error) {
    console.error("Webhook signature verification failed:", getErrorMessage(error));
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data?.object;
      if (!session) {
        return NextResponse.json({ received: true });
      }

      const userId = session.metadata?.userId;
      const credits = Number.parseInt(session.metadata?.credits ?? "0", 10);

      if (!userId || !Number.isFinite(credits) || credits <= 0) {
        return NextResponse.json({ received: true });
      }

      const supabase = getSupabaseAdmin();

      if (!supabase) {
        return NextResponse.json(
          { error: "Supabase service role is not configured." },
          { status: 503 },
        );
      }

      const { error: creditsError } = await supabase.rpc("add_credits", {
        p_user_id: userId,
        p_credits: credits,
      });

      if (creditsError) {
        console.error("Credits update failed:", creditsError);
        return NextResponse.json({ error: "Credits update failed." }, { status: 500 });
      }

      const { error: transactionError } = await supabase
        .from("credit_transactions")
        .insert({
          user_id: userId,
          amount: credits,
          type: "purchase",
          stripe_session_id: session.id,
          description: `Purchased ${credits} credits`,
        });

      if (transactionError) {
        console.error("Credit transaction log failed:", transactionError);
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
