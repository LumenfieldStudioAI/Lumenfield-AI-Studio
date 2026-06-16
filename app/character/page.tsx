'use client'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function CharacterPage() {
  const { isSignedIn } = useUser()
  const [tab, setTab] = useState<'my'|'create'>('my')

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Character Studio</p>
        <h1 className="text-4xl font-light mb-2">Soul ID</h1>
        <p className="text-zinc-400 mb-8">Create consistent AI characters across all your generations</p>
        <div className="flex gap-2 mb-10">
          {(['my','create'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${tab===t ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              {t === 'my' ? 'My Characters' : 'Create New'}
            </button>
          ))}
        </div>
        {tab === 'my' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-600 transition-colors" onClick={() => setTab('create')}>
              <span className="text-3xl">+</span>
              <p className="text-zinc-500 text-sm">New Character</p>
            </div>
          </div>
        ) : (
          <div className="max-w-xl">
            <p className="text-zinc-400 text-sm mb-4">Upload 5–20 photos of the same person to train a Soul ID</p>
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 flex flex-col items-center gap-4 cursor-pointer hover:border-zinc-500 transition-colors mb-4">
              <span className="text-4xl">👤</span>
              <p className="text-zinc-400 text-sm">Drop photos here (5–20 images)</p>
              <p className="text-zinc-600 text-xs">Training takes ~10 minutes</p>
            </div>
            <input placeholder="Character name..." className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 mb-4 focus:outline-none focus:border-zinc-500" />
            <button className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
              Train Soul ID
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
