'use client'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

type Generation = {
  id: string
  type: string
  prompt: string
  model: string
  status: string
  result_url: string | null
  created_at: string
}

const TABS = ['All', 'Images', 'Videos', 'Audio']

export default function LibraryPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [tab, setTab] = useState('All')
  const [items, setItems] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/library')
      .then(r => r.json())
      .then(d => setItems(d.generations || []))
      .finally(() => setLoading(false))
  }, [isSignedIn])

  if (isLoaded && !isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">Sign in to see your library</p>
        <Link href="/sign-in" className="px-6 py-3 bg-white text-black font-semibold rounded-xl">Sign in</Link>
      </div>
    )
  }

  const filtered = tab === 'All' ? items : items.filter(i => i.type?.toLowerCase() === tab.toLowerCase().slice(0,-1))

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-2">Library</p>
            <h1 className="text-3xl font-light">Your Generations</h1>
          </div>
          <Link href="/generate" className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-sm hover:bg-zinc-200 transition-colors">
            + Create New
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab===t ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-5xl">🎨</span>
            <p className="text-zinc-400">No generations yet</p>
            <Link href="/generate" className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-sm">
              Start creating
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="group relative bg-zinc-900 rounded-2xl overflow-hidden aspect-square">
                {item.result_url ? (
                  item.type === 'video' ? (
                    <video src={item.result_url} className="w-full h-full object-cover" muted loop />
                  ) : (
                    <img src={item.result_url} alt={item.prompt} className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
                    {item.status === 'processing' ? '⏳ Processing...' : '❌ Failed'}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-white text-xs line-clamp-2">{item.prompt}</p>
                  <p className="text-zinc-400 text-xs mt-1">{item.model}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
