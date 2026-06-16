'use client'
import { useState, useRef, useEffect } from 'react'
import ModelPicker, { type Model } from '@/components/supercomputer/ModelPicker'

const PRESETS = ['Cinematic trailer', 'Social media ad', 'Unboxing video', 'Product showcase', 'Virtual try-on', 'Animated infographic']

const MODULES = [
  { icon: '🎬', title: 'Video Generator', desc: 'Turn one prompt into ready-to-edit footage', badge: null },
  { icon: '🖼️', title: 'Image Generator', desc: 'Create campaign images, product frames', badge: 'TRY IN CHAT' },
  { icon: '📣', title: 'Ad Creative', desc: 'Build ad hooks, scripts, cuts and publish', badge: 'INSTALL' },
  { icon: '🧠', title: 'Memory Agent', desc: 'Remember brand rules, characters, workflows', badge: 'NEW' },
  { icon: '📦', title: 'Product Agent', desc: 'Read product details and generate content', badge: 'BETA' },
  { icon: '⚙️', title: 'Workflow Builder', desc: 'Connect models, tools, files and studio', badge: 'NEW' },
]

const DEFAULT_MODEL: Model = { id: 'gemini-flash', name: 'Gemini 3.5 Flash', desc: 'Fast, high-quality responses', provider: 'Google' }

export default function SupercomputerPage() {
  const [model, setModel] = useState<Model>(DEFAULT_MODEL)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0008', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* Sidebar */}
        <div style={{ width: 220, borderRight: '1px solid rgba(255,255,255,0.06)', padding: '80px 0 20px', display: 'flex', flexDirection: 'column' }}>
          <button style={{ margin: '0 12px 16px', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>+</span> New task
          </button>
          <p style={{ padding: '0 16px', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>No tasks yet</p>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Hero */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px', background: 'radial-gradient(ellipse at 50% 60%, rgba(180,0,120,0.18) 0%, transparent 70%)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg,#ff1493,#d7ff1f)', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 900, marginBottom: 28 }}>L</div>
            <h1 style={{ fontSize: 52, fontWeight: 900, textAlign: 'center', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12, maxWidth: 700 }}>
              SUPERCOMPUTER FOR<br />CREATIVE WORK
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 40 }}>Turn a simple chat into production-ready content at scale.</p>

            {/* Prompt Box */}
            <div style={{ width: '100%', maxWidth: 760, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 20 }}>
              <textarea
                ref={textRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
                placeholder="Create a cinematic trailer for my brand..."
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 16, resize: 'none', minHeight: 60, fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={{ padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', cursor: 'pointer' }}>+</button>
                  <ModelPicker selected={model} onChange={setModel} />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || loading}
                  style={{ width: 40, height: 40, borderRadius: '50%', background: loading ? 'rgba(215,255,31,0.4)' : '#d7ff1f', border: 'none', color: '#111', fontSize: 18, cursor: 'pointer', display: 'grid', placeItems: 'center', fontWeight: 900 }}
                >
                  {loading ? '⏳' : '↑'}
                </button>
              </div>
            </div>

            {/* Presets */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
              {PRESETS.map(p => (
                <button key={p} onClick={() => setPrompt(p)} style={{ padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>Supercomputer Modules</p>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>What can the Supercomputer do?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {MODULES.map(m => (
                <div key={m.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 22px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{m.icon}</span>
                    {m.badge && <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 6, background: m.badge === 'NEW' ? '#d7ff1f' : 'rgba(255,255,255,0.1)', color: m.badge === 'NEW' ? '#111' : '#fff' }}>{m.badge}</span>}
                  </div>
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>{m.title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel - Marketplace */}
        <div style={{ width: 260, borderLeft: '1px solid rgba(255,255,255,0.06)', padding: '80px 16px 20px' }}>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Marketplace</p>
          <input placeholder="Search agents, tools..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', marginBottom: 20, boxSizing: 'border-box' }} />
          {MODULES.map(m => (
            <div key={m.title} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0 }}>{m.icon}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{m.title}</p>
                {m.badge && <p style={{ fontSize: 10, fontWeight: 800, color: m.badge === 'NEW' ? '#d7ff1f' : 'rgba(255,255,255,0.4)' }}>{m.badge}</p>}
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.35 }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
