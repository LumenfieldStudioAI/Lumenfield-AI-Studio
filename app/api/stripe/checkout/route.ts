import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const CREDIT_PACKAGES = {
  starter: { credits: 500, price: 999, name: "Starter Pack" },
  creator: { credits: 1500, price: 2499, name: "Creator Pack" },
  pro: { credits: 4000, price: 5999, name: "Pro Pack" },
  studio: { credits: 10000, price: 12999, name: "Studio Pack" },
} as const;

type PackageKey = keyof typeof CREDIT_PACKAGES;

function getAppUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "https://lumenfield-ai-studio.vercel.app";

  return url.replace(/\/+$/, "");
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return null;
  }

  return secretKey;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Checkout could not be created.";
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stripeSecretKey = getStripe();

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
        { status: 503 },
      );
    }

    const { packageId } = (await req.json()) as { packageId?: string };

    if (!packageId || !(packageId in CREDIT_PACKAGES)) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const pkg = CREDIT_PACKAGES[packageId as PackageKey];
    const appUrl = getAppUrl();

    const checkoutParams = new URLSearchParams({
      "payment_method_types[0]": "card",
      mode: "payment",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][product_data][name]": `Lumenfield AI Studio - ${pkg.name}`,
      "line_items[0][price_data][product_data][description]": `${pkg.credits.toLocaleString()} generation credits`,
      "line_items[0][price_data][unit_amount]": pkg.price.toString(),
      "line_items[0][quantity]": "1",
      "metadata[userId]": userId,
      "metadata[credits]": pkg.credits.toString(),
      "metadata[packageId]": packageId,
      success_url: `${appUrl}/cinema-dashboard?payment=success&credits=${pkg.credits}`,
      cancel_url: `${appUrl}/pricing?payment=cancelled`,
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: checkoutParams,
    });

    const session = (await response.json()) as { url?: string; error?: { message?: string } };

    if (!response.ok || !session.url) {
      return NextResponse.json(
        { error: session.error?.message ?? "Checkout could not be created." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
