'use client'
import { useState, useRef, useEffect } from 'react'

export type Model = {
  id: string
  name: string
  desc: string
  badge?: string
  locked?: boolean
  provider: string
}

const MODELS: Model[] = [
  // Lumenfield
  { id: 'efficient', name: 'Efficient mode', desc: 'Quick results, lower credits', provider: 'Lumenfield' },
  { id: 'smart', name: 'Smart mode', desc: 'Deeper thinking, top quality', provider: 'Lumenfield', locked: true },
  // Google
  { id: 'gemini-flash-35', name: 'Gemini 3.5 Flash', desc: 'Fast, high-quality responses', provider: 'Google', badge: '$' },
  { id: 'gemini-pro-31', name: 'Gemini 3.1 Pro', desc: 'Powerful, well-rounded model', provider: 'Google', badge: '$' },
  { id: 'gemini-flash-30', name: 'Gemini 3.0 Flash', desc: 'Fast, lightweight everyday model', provider: 'Google' },
  // Moonshot
  { id: 'kimi-k26', name: 'Kimi K2.6', desc: 'Best for agentic coding and long builds', provider: 'Moonshot' },
  // DeepSeek
  { id: 'v4-flash', name: 'V4 Flash', desc: 'Fastest and cheapest for high volume', provider: 'DeepSeek' },
  { id: 'v4-pro', name: 'V4 Pro', desc: 'Top coding quality at low cost', provider: 'DeepSeek' },
  // Anthropic
  { id: 'opus-48', name: 'Opus 4.8', desc: 'Best for complex, analytical work', provider: 'Anthropic', badge: '$', locked: true },
  { id: 'opus-46', name: 'Opus 4.6', desc: 'Best for long-form creative work', provider: 'Anthropic', badge: '$', locked: true },
  { id: 'sonnet-46', name: 'Sonnet 4.6', desc: 'Responsive everyday work', provider: 'Anthropic' },
  // OpenAI
  { id: 'gpt-55', name: 'GPT-5.5', desc: 'Best for multi-step tasks', provider: 'OpenAI', badge: '$' },
  // xAI
  { id: 'grok-43', name: 'Grok 4.3', desc: 'Best for research and analysis', provider: 'xAI' },
]

export default function ModelPicker({ selected, onChange }: { selected: Model; onChange: (m: Model) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const providers = [...new Set(MODELS.map(m => m.provider))]

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
      >
        <span>⚡</span>
        <span>{selected.name}</span>
        <span style={{ opacity: 0.5, fontSize: 11 }}>▾</span>
      </button>

      {open && (
        <div style={{ position: 'absolute', bottom: '110%', left: 0, zIndex: 100, width: 300, maxHeight: 480, overflowY: 'auto', background: '#1a1a1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 0', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
          {providers.map(provider => (
            <div key={provider}>
              <p style={{ margin: '10px 14px 4px', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {provider === 'Google' ? '🇬 Google' : provider === 'Anthropic' ? '🔶 Anthropic' : provider === 'OpenAI' ? '⚪ OpenAI' : provider === 'Moonshot' ? '🌙 Moonshot' : provider === 'DeepSeek' ? '🔵 DeepSeek' : provider === 'xAI' ? '✖ xAI' : provider}
              </p>
              {MODELS.filter(m => m.provider === provider).map(m => (
                <button
                  key={m.id}
                  onClick={() => { if (!m.locked) { onChange(m); setOpen(false) } }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: selected.id === m.id ? 'rgba(255,255,255,0.06)' : 'transparent', border: 'none', color: m.locked ? 'rgba(255,255,255,0.35)' : '#fff', fontSize: 13, cursor: m.locked ? 'default' : 'pointer', textAlign: 'left' }}
                >
                  <div>
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                    {m.badge && <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>{m.badge}</span>}
                    <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{m.desc}</p>
                  </div>
                  {m.locked && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>Unlock</span>}
                  {selected.id === m.id && !m.locked && <span style={{ color: '#d7ff1f' }}>✓</span>}
                </button>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '6px 14px' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
