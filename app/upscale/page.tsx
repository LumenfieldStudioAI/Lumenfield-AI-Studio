'use client'
import { useState } from 'react'

export default function UpscalePage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Upscale</p>
        <h1 className="text-4xl font-light mb-2">Enhance Resolution</h1>
        <p className="text-zinc-400 mb-12">Upscale images and videos up to 4K with AI</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[{label:'2K Upscale',desc:'2x resolution boost',icon:'⬆️'},{label:'4K Upscale',desc:'4x resolution boost',icon:'🔼',top:true},{label:'Video Upscale',desc:'Enhance video quality',icon:'🎬'}].map(item => (
            <div key={item.label} className={`rounded-2xl border p-6 cursor-pointer transition-all ${item.top ? 'border-white bg-white text-black' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}>
              <span className="text-3xl block mb-3">{item.icon}</span>
              <p className={`font-semibold mb-1 ${item.top ? 'text-black' : 'text-white'}`}>{item.label}</p>
              <p className={`text-sm ${item.top ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="border-2 border-dashed border-zinc-700 rounded-2xl aspect-video flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-zinc-500 transition-colors mb-6">
          <span className="text-5xl">⬆️</span>
          <p className="text-zinc-400">Drop image or video to upscale</p>
          <p className="text-zinc-600 text-sm">Supports JPG, PNG, MP4 up to 500MB</p>
        </div>
        <button disabled={loading} className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-40">
          {loading ? 'Upscaling...' : 'Upscale Now'}
        </button>
      </div>
    </div>
  )
}
