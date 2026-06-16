'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 500,
    price: '$9.99',
    priceNum: 999,
    perCredit: '$0.020',
    highlight: false,
    features: ['500 credits', '~25 video generations', '~100 image generations', 'Standard queue'],
  },
  {
    id: 'creator',
    name: 'Creator',
    credits: 1500,
    price: '$24.99',
    priceNum: 2499,
    perCredit: '$0.017',
    highlight: true,
    features: ['1,500 credits', '~75 video generations', '~300 image generations', 'Priority queue'],
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 4000,
    price: '$59.99',
    priceNum: 5999,
    perCredit: '$0.015',
    highlight: false,
    features: ['4,000 credits', '~200 video generations', '~800 image generations', 'Priority queue', 'Batch processing'],
  },
  {
    id: 'studio',
    name: 'Studio',
    credits: 10000,
    price: '$129.99',
    priceNum: 12999,
    perCredit: '$0.013',
    highlight: false,
    features: ['10,000 credits', '~500 video generations', '~2,000 image generations', 'Ultra priority queue', 'Batch processing', 'API access'],
  },
]

export default function PricingPage() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

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
        alert('Checkout failed. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-16 text-center px-4">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-4">Credits</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
          Generate without limits
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Credits never expire. Use them across video, image, and audio generation.
        </p>
      </div>

      {/* Credit cost reference */}
      <div className="max-w-3xl mx-auto px-4 mb-16">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400 text-sm mb-4 text-center">Credit cost per generation</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: 'Video (5s)', cost: 20 },
              { label: 'Video (10s)', cost: 35 },
              { label: 'Image', cost: 5 },
              { label: 'Audio (30s)', cost: 8 },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-2xl font-light text-white">{item.cost}</p>
                <p className="text-xs text-zinc-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                pkg.highlight
                  ? 'border-white bg-white text-black'
                  : 'border-zinc-800 bg-zinc-900 text-white'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full border border-zinc-700 whitespace-nowrap">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <p className={`text-xs uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  {pkg.name}
                </p>
                <p className="text-4xl font-light">{pkg.price}</p>
                <p className={`text-sm mt-1 ${pkg.highlight ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  {pkg.perCredit} per credit
                </p>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${pkg.highlight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    <span className="mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={loading === pkg.id}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                  pkg.highlight
                    ? 'bg-black text-white hover:bg-zinc-800'
                    : 'bg-white text-black hover:bg-zinc-200'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === pkg.id ? 'Redirecting...' : `Buy ${pkg.credits.toLocaleString()} credits`}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-600 text-xs mt-12">
          Payments are processed securely by Stripe. Credits are added instantly after payment.
        </p>
      </div>
    </div>
  )
}
