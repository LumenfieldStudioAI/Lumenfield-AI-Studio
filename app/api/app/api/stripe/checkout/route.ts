
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@clerk/nextjs/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

// Credit packages — matches your pricing page
const CREDIT_PACKAGES = {
  starter: { credits: 500, price: 999, name: 'Starter Pack' },      // $9.99
  creator: { credits: 1500, price: 2499, name: 'Creator Pack' },     // $24.99
  pro: { credits: 4000, price: 5999, name: 'Pro Pack' },             // $59.99
  studio: { credits: 10000, price: 12999, name: 'Studio Pack' },     // $129.99
} as const

type PackageKey = keyof typeof CREDIT_PACKAGES

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { packageId } = await req.json()

    if (!packageId || !(packageId in CREDIT_PACKAGES)) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    const pkg = CREDIT_PACKAGES[packageId as PackageKey]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lumenfield AI — ${pkg.name}`,
              description: `${pkg.credits.toLocaleString()} generation credits`,
              images: ['https://novaframe-ruddy.vercel.app/logo.png'],
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: pkg.credits.toString(),
        packageId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success&credits=${pkg.credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
