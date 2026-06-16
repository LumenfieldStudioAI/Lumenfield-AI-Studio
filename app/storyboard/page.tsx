'use client'
import { useState } from 'react'

export default function StoryboardPage() {
  const [scenes, setScenes] = useState([{id:1,prompt:''},{id:2,prompt:''},{id:3,prompt:''}])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 mb-3">Storyboard</p>
        <h1 className="text-4xl font-light mb-2">Scene Planning</h1>
        <p className="text-zinc-400 mb-10">Plan your video scene by scene, then generate all at once</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {scenes.map((scene, i) => (
            <div key={scene.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="aspect-video bg-zinc-800 rounded-xl mb-3 flex items-center justify-center text-zinc-600 text-sm">
                Scene {i + 1}
              </div>
              <textarea
                value={scene.prompt}
                onChange={e => setScenes(s => s.map(sc => sc.id===scene.id ? {...sc,prompt:e.target.value} : sc))}
                placeholder={`Describe scene ${i + 1}...`}
                className="w-full bg-zinc-800 rounded-xl p-3 text-white placeholder-zinc-600 text-sm resize-none h-20 focus:outline-none border border-transparent focus:border-zinc-600"
              />
            </div>
          ))}
          <div
            onClick={() => setScenes(s => [...s, {id: Date.now(), prompt: ''}])}
            className="border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center cursor-pointer hover:border-zinc-600 transition-colors min-h-[200px]"
          >
            <span className="text-zinc-500">+ Add Scene</span>
          </div>
        </div>
        <button className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
          Generate All Scenes
        </button>
      </div>
    </div>
  )
}
