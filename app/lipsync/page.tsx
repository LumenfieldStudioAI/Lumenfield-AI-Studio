'use client'
import { useState } from 'react'

export default function LipsyncPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Lipsync Studio</p>
        <h1 className="text-4xl font-light mb-2">Animate with Audio</h1>
        <p className="text-zinc-400 mb-12">Sync any face to any audio — realistic lip movement in seconds</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-zinc-400 text-sm mb-3">1. Upload face image or video</p>
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-zinc-500 transition-colors">
              <span className="text-4xl">👤</span>
              <p className="text-zinc-500 text-sm">Drop image or video</p>
            </div>
          </div>
          <div>
            <p className="text-zinc-400 text-sm mb-3">2. Upload or record audio</p>
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-zinc-500 transition-colors">
              <span className="text-4xl">🎙️</span>
              <p className="text-zinc-500 text-sm">Drop audio file</p>
              <p className="text-zinc-600 text-xs">MP3, WAV, M4A</p>
            </div>
          </div>
        </div>
        <button disabled={loading} className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-40">
          {loading ? 'Generating...' : 'Generate Lipsync'}
        </button>
      </div>
    </div>
  )
}
