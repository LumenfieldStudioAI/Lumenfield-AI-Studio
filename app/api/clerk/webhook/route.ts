import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function verifyWebhook(payload: string, headers: Headers, secret: string): boolean {
  const svixId = headers.get('svix-id') ?? ''
  const svixTimestamp = headers.get('svix-timestamp') ?? ''
  const svixSignature = headers.get('svix-signature') ?? ''

  const toSign = `${svixId}.${svixTimestamp}.${payload}`
  const secretBytes = Buffer.from(secret.replace('whsec_', ''), 'base64')
  const computed = crypto.createHmac('sha256', secretBytes).update(toSign).digest('base64')
  const expected = `v1,${computed}`

  return svixSignature.split(' ').some(sig => sig === expected)
}

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'No webhook secret' }, { status: 500 })
  }

  const body = await req.text()

  if (!verifyWebhook(body, req.headers, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const evt = JSON.parse(body)
  const { type, data } = evt

  if (type === 'user.created') {
    const email = data.email_addresses?.[0]?.email_address
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ')

    const { error } = await supabase.from('users').upsert({
      clerk_id: data.id,
      email,
      name,
      avatar_url: data.image_url,
      credits: 100,
      plan: 'free',
    }, { onConflict: 'clerk_id' })

    if (error) console.error('Supabase error:', error)
    else console.log(`✅ User synced: ${email}`)
  }

  if (type === 'user.updated') {
    const email = data.email_addresses?.[0]?.email_address
    const name = [data.first_name, data.last_name].filter(Boolean).join(' ')
    await supabase.from('users').update({ email, name, avatar_url: data.image_url }).eq('clerk_id', data.id)
  }

  return NextResponse.json({ received: true })
}
