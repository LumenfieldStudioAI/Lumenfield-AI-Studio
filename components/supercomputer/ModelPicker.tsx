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
  { id: 'gemini-flash', name: 'Gemini 3.5 Flash', desc: 'Fast, high-quality responses', provider: 'Google' },
  { id: 'gemini-pro', name: 'Gemini 3.1 Pro', desc: 'Powerful, well-rounded model', provider: 'Google' },
  { id: 'gemini-flash-3', name: 'Gemini 3.0 Flash', desc: 'Fast, lightweight everyday model', provider: 'Google' },
  { id: 'claude-sonnet', name: 'Claude Sonnet 4.6', desc: 'Responsive everyday work', provider: 'Anthropic' },
  { id: 'claude-opus', name: 'Claude Opus 4.6', desc: 'Best for long-form creative work', badge: '$', provider: 'Anthropic', locked: true },
  { id: 'gpt-4o', name: 'GPT-4o', desc: 'Best for multi-step tasks', provider: 'OpenAI' },
  { id: 'grok', name: 'Grok 4.3', desc: 'Best for research and analysis', provider: 'xAI' },
]

export default function ModelPicker({ selected, onChange }: { selected: Model; onChange: (m: Model) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
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
        <div style={{ position: 'absolute', bottom: '110%', left: 0, zIndex: 100, width: 280, background: '#1a1a1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 0', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
          <div style={{ padding: '6px 12px 10px', display: 'flex', gap: 8 }}>
            <button style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer' }}>⚡ Efficient mode</button>
            <button style={{ padding: '4px 10px', borderRadius: 6, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer' }}>✨ Smart mode</button>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 12px 8px' }} />
          {providers.map(provider => (
            <div key={provider}>
              <p style={{ margin: '8px 12px 4px', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.06em' }}>{provider}</p>
              {MODELS.filter(m => m.provider === provider).map(m => (
                <button
                  key={m.id}
                  onClick={() => { if (!m.locked) { onChange(m); setOpen(false) } }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', background: selected.id === m.id ? 'rgba(255,255,255,0.06)' : 'transparent', border: 'none', color: m.locked ? 'rgba(255,255,255,0.35)' : '#fff', fontSize: 13, cursor: m.locked ? 'default' : 'pointer', textAlign: 'left' }}
                >
                  <div>
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                    {m.badge && <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>{m.badge}</span>}
                    <p style={{ margin: '1px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{m.desc}</p>
                  </div>
                  {m.locked && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }}>Unlock</span>}
                  {selected.id === m.id && !m.locked && <span style={{ color: '#d7ff1f' }}>✓</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
