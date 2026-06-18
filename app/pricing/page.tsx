'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const M = '#e8006f'
const ML = '#ff4da6'
const BG = '#050505'
const S1 = '#0f0f0f'
const S2 = '#161616'
const B1 = '#1f1f1f'
const T1 = '#ffffff'
const T2 = '#a0a0a0'
const T3 = '#555555'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$9.99',
    period: '/mo',
    desc: 'For creators just getting started.',
    credits: 500,
    highlight: false,
    features: [
      '500 credits/month',
      '~25 video generations',
      '~100 image generations',
      'Standard queue',
      'Core tools access',
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    price: '$24.99',
    period: '/mo',
    desc: 'For daily creative production.',
    credits: 1500,
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      '1,500 credits/month',
      '~75 video generations',
      '~300 image generations',
      'Priority queue',
      'All core tools',
      'Cinema Studio access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$59.99',
    period: '/mo',
    desc: 'For power users and studios.',
    credits: 4000,
    highlight: false,
    features: [
      '4,000 credits/month',
      '~200 video generations',
      '~800 image generations',
      'Priority queue',
      'Batch processing',
      'All tools + early access',
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '$129.99',
    period: '/mo',
    desc: 'For teams and agencies.',
    credits: 10000,
    highlight: false,
    features: [
      '10,000 credits/month',
      '~500 video generations',
      '~2,000 image generations',
      'Ultra priority queue',
      'Batch processing',
      'API access',
      'Team seats (5)',
    ],
  },
]

const COSTS = [
  { label: 'Video (5s)', cost: 20 },
  { label: 'Video (10s)', cost: 35 },
  { label: 'Image', cost: 5 },
  { label: 'Audio (30s)', cost: 8 },
]

const FAQ = [
  { q: 'Do credits expire?', a: 'No, credits never expire. Use them at your own pace.' },
  { q: 'Can I switch plans?', a: 'Yes, upgrade or downgrade anytime. Changes apply immediately.' },
  { q: 'What payment methods are accepted?', a: 'All major credit cards via Stripe. Secure and instant.' },
  { q: 'Is there a free tier?', a: 'New accounts receive 50 free credits to try the platform.' },
  { q: 'Do you offer refunds?', a: 'Unused credits can be refunded within 7 days of purchase.' },
]

export default function PricingPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handlePurchase = async (packageId: string) => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect=/pricing')
      return
    }
    setLoading(packageId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage('Checkout failed. Please try again.')
      }
    } catch {
      setMessage('Something went wrong.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: T1, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 24px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: `radial-gradient(ellipse, ${M}18, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${B1}`, borderRadius: 20, padding: '5px 14px', fontSize: 11, color: T3, background: S1, marginBottom: 24, textTransform: 'uppercase', letterSpacing: 1 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: M, display: 'inline-block' }} />
            Simple pricing
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, letterSpacing: -2.5, marginBottom: 16, lineHeight: 1 }}>
            Generate without limits
          </h1>
          <p style={{ color: T2, fontSize: 16, maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Credits never expire. Use them across video, image, and audio generation.
          </p>
          {message && (
            <p style={{ color: ML, fontSize: 13, marginBottom: 16 }}>{message}</p>
          )}
        </div>
      </section>

      {/* Credit costs */}
      <section style={{ maxWidth: 700, margin: '0 auto 56px', padding: '0 24px' }}>
        <div style={{ background: S1, border: `1px solid ${B1}`, borderRadius: 20, padding: '24px 32px' }}>
          <p style={{ color: T3, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', marginBottom: 20 }}>Credit cost per generation</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
            {COSTS.map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, color: T1 }}>{item.cost}</div>
                <div style={{ fontSize: 11, color: T3, marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: 1100, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              style={{
                background: plan.highlight ? `linear-gradient(160deg, ${M}18, ${S1})` : S1,
                border: `1px solid ${plan.highlight ? M : B1}`,
                borderRadius: 18,
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.highlight ? `0 0 40px ${M}22` : 'none',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: -1,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: M,
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1,
                  padding: '4px 14px',
                  borderRadius: '0 0 10px 10px',
                  textTransform: 'uppercase',
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 20, marginTop: plan.badge ? 16 : 0 }}>
                <div style={{ color: T3, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 6 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1.5, color: T1 }}>{plan.price}</span>
                  <span style={{ color: T3, fontSize: 12 }}>{plan.period}</span>
                </div>
                <div style={{ color: T2, fontSize: 13, lineHeight: 1.5 }}>{plan.desc}</div>
              </div>

              <div style={{ flex: 1, marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ color: M, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ color: T2, fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={loading === plan.id}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 12,
                  border: 'none',
                  background: plan.highlight ? M : 'rgba(255,255,255,0.07)',
                  color: plan.highlight ? '#fff' : T1,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                  opacity: loading === plan.id ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!plan.highlight) e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                onMouseLeave={e => { if (!plan.highlight) e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              >
                {loading === plan.id ? 'Redirecting...' : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 700, margin: '0 auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, marginBottom: 24, textAlign: 'center' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FAQ.map((item, i) => (
            <div
              key={i}
              style={{ background: S1, border: `1px solid ${openFaq === i ? M + '60' : B1}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', color: T1, fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                {item.q}
                <span style={{ color: T3, fontSize: 18, flexShrink: 0, marginLeft: 16 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 16px', color: T2, fontSize: 13, lineHeight: 1.65 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <div style={{ textAlign: 'center', paddingBottom: 60, color: T3, fontSize: 12 }}>
        Payments processed securely by Stripe · Credits added instantly after payment
      </div>

    </div>
  )
}
