'use client'
import { useState } from 'react'

export default function EditPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Edit Image</p>
        <h1 className="text-4xl font-light mb-2">Inpaint & Edit</h1>
        <p className="text-zinc-400 mb-12">Upload an image and describe what to change</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-dashed border-zinc-700 rounded-2xl aspect-square flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-zinc-500 transition-colors">
            <span className="text-4xl">🖼️</span>
            <p className="text-zinc-400 text-sm">Drop image or click to upload</p>
          </div>
          <div className="flex flex-col gap-4">
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe what you want to change..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-500 resize-none h-32 focus:outline-none focus:border-zinc-500"
            />
            <select className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none">
              <option>Inpaint — nano_banana_pro</option>
              <option>Canvas Edit</option>
              <option>Multi-region Edit</option>
              <option>Object Placement</option>
            </select>
            <button
              disabled={loading || !prompt}
              className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-40"
            >
              {loading ? 'Processing...' : 'Edit Image'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
