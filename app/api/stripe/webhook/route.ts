import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const credits = parseInt(session.metadata?.credits || '0')

        if (!userId || !credits) break

        const { error } = await supabase.rpc('add_credits', {
          p_user_id: userId,
          p_credits: credits,
        })

        if (error) {
          console.error('Credits update failed:', error)
          return NextResponse.json({ error: 'DB error' }, { status: 500 })
        }

        await supabase.from('credit_transactions').insert({
          user_id: userId,
          amount: credits,
          type: 'purchase',
          stripe_session_id: session.id,
          description: `Purchased ${credits} credits`,
        })

        console.log(`✅ ${credits} credits added to user ${userId}`)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
