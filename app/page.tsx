'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ── VIRAL PRESETS ────────────────────────────────────────────────────────────
const PRESETS = [
  'BASEBALL GAME','DRIFT RACING','CGI BREAKDOWN','FOOTBALL INVADER',
  'SUMMER HAZE','KUNG FU HIT','FINAL SERVE','ANDROID ASSEMBLE',
  '3D RENDER','STORM GIANT','BLUE DEPTH','ORBITAL PRESENCE',
  'ZOMBIE DANCE','GOLF MAJOR','2000S PAPARAZZI','RACE TRACK',
  'DROWN IN MUSIC','NIGHTLINE','FREE FALL','RED CARPET',
  'NEON CITY','SOUL FIGHTER','TUSCAN YOGA','APEX HUNTER',
  'IN THE DARK','RED THREAD','EXIT THE DREAM','DRAGON FANTASY',
  'FAN MEETING','NIGHT VISION','OFFICE CCTV','RACE WINNER',
]

// ── FEATURE CARDS ────────────────────────────────────────────────────────────
const CARDS = [
  {
    title: 'Cinema Studio',
    desc: 'Cinematic video with AI director — shot composition, lighting, motion',
    tag: 'STUDIO', href: '/cinema-studio',
    gradient: 'linear-gradient(135deg,#1a0a2e,#2d1b69)',
    accent: '#9b5de5',
  },
  {
    title: 'Marketing Studio',
    desc: 'Launch full campaigns from one prompt. Ads, UGC, product shots.',
    tag: 'TRENDING', href: '/marketing-studio',
    gradient: 'linear-gradient(135deg,#0a1628,#1a3a5c)',
    accent: '#00b4d8',
  },
  {
    title: 'Supercomputer',
    desc: 'Agents, automation, skills & connectors. AI at scale.',
    tag: 'NEW', href: '/supercomputer',
    gradient: 'linear-gradient(135deg,#0d1f0d,#1a4a1a)',
    accent: '#d7ff1f',
  },
  {
    title: 'AI Influencer',
    desc: 'Consistent virtual personas. Same character, infinite scenes.',
    tag: 'STUDIO', href: '/ai-influencer-studio',
    gradient: 'linear-gradient(135deg,#1f0a0a,#4a1a1a)',
    accent: '#ff6b6b',
  },
]

// ── MODELS ───────────────────────────────────────────────────────────────────
const MODELS = [
  { name: 'Soul V2', tag: 'Image', badge: 'TOP', href: '/image?model=soul-v2', color: '#9b5de5' },
  { name: 'Nano Banana Pro', tag: 'Image', badge: 'TOP', href: '/image?model=nano-banana-pro', color: '#d7ff1f' },
  { name: 'Seedance 2.0', tag: 'Video', badge: 'NEW', href: '/video?model=seedance_2_0', color: '#00b4d8' },
  { name: 'Kling 3.0', tag: 'Video', badge: null, href: '/video?model=kling', color: '#ff6b6b' },
  { name: 'GPT Image 2', tag: 'Image', badge: 'NEW', href: '/image?model=gpt', color: '#74c69d' },
  { name: 'Seedream 5.0', tag: 'Image', badge: null, href: '/image?model=seedream', color: '#ffd166' },
  { name: 'Veo 3', tag: 'Video', badge: 'TOP', href: '/video?model=veo3', color: '#c77dff' },
  { name: 'Flux 2', tag: 'Image', badge: null, href: '/image?model=flux', color: '#4cc9f0' },
  { name: 'MiniMax Hailuo', tag: 'Video', badge: null, href: '/video?model=minimax', color: '#f72585' },
  { name: 'Wan 2.6', tag: 'Video', badge: null, href: '/video?model=wan', color: '#7209b7' },
  { name: 'Topaz', tag: 'Upscale', badge: null, href: '/upscale', color: '#3a86ff' },
  { name: 'Claude MCP', tag: 'Agent', badge: 'NEW', href: '/mcp', color: '#fb8500' },
]

// ── QUICK ACTIONS ─────────────────────────────────────────────────────────────
const QUICK = [
  { label: 'AI Image', icon: '🖼️', href: '/image' },
  { label: 'AI Video', icon: '🎬', href: '/video' },
  { label: 'Edit', icon: '✏️', href: '/edit' },
  { label: 'Upscale', icon: '⬆️', href: '/upscale' },
  { label: 'Lipsync', icon: '👄', href: '/lipsync' },
  { label: 'Library', icon: '📚', href: '/library' },
]

// ── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [...PRESETS, ...PRESETS]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 0', background: 'rgba(215,255,31,0.03)' }}>
      <div style={{ display: 'flex', gap: 40, animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((p, i) => (
          <span key={i} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)' }}>{p}</span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeModel, setActiveModel] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveModel(m => (m + 1) % MODELS.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,-apple-system,sans-serif', overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', overflow: 'hidden' }}>
        {/* bg glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(215,255,31,0.06) 0%, rgba(155,93,229,0.06) 40%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(215,255,31,0.08)', border: '1px solid rgba(215,255,31,0.2)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d7ff1f', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#d7ff1f' }}>30+ AI MODELS LIVE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(44px,8vw,96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 24, maxWidth: 900 }}>
          Create without<br />
          <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg,#d7ff1f,#71ff00)', backgroundClip: 'text' }}>limits.</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(255,255,255,0.45)', maxWidth: 520, lineHeight: 1.65, marginBottom: 44 }}>
          Video, image, audio and more — powered by the world's best AI models in one cinematic studio.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
          <Link href="/sign-up" style={{ padding: '15px 36px', borderRadius: 14, background: '#d7ff1f', color: '#111', fontWeight: 900, fontSize: 15, textDecoration: 'none', letterSpacing: '-0.01em' }}>
            Start for free
          </Link>
          <Link href="/explore" style={{ padding: '15px 28px', borderRadius: 14, background: 'rgba(255,255,255,0.07)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
            Explore gallery →
          </Link>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {QUICK.map(q => (
            <Link key={q.label} href={q.href} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'all 0.2s' }}>
              <span>{q.icon}</span>{q.label}
            </Link>
          ))}
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── FEATURE CARDS ── */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Studios</p>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 40, letterSpacing: '-0.02em' }}>
          Everything you need<br />to create at scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
          {CARDS.map(c => (
            <Link key={c.title} href={c.href} style={{ display: 'block', padding: '28px', borderRadius: 20, background: c.gradient, border: `1px solid ${c.accent}22`, textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6, background: `${c.accent}22`, color: c.accent, letterSpacing: '0.08em' }}>{c.tag}</div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.accent}22`, border: `1px solid ${c.accent}44`, marginBottom: 18 }} />
              <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>{c.title}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{c.desc}</p>
              <div style={{ marginTop: 24, fontSize: 13, color: c.accent, fontWeight: 700 }}>Try now →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MODELS ── */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Models</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 40, letterSpacing: '-0.02em' }}>
            30+ world-class AI models
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 10 }}>
            {MODELS.map((m, i) => (
              <Link key={m.name} href={m.href} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 18px', borderRadius: 14, background: activeModel === i ? `${m.color}12` : 'rgba(255,255,255,0.03)', border: `1px solid ${activeModel === i ? m.color + '44' : 'rgba(255,255,255,0.07)'}`, textDecoration: 'none', transition: 'all 0.3s' }}>
                {m.badge && (
                  <span style={{ position: 'absolute', top: -8, right: 10, fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 5, background: m.badge === 'NEW' ? '#d7ff1f' : '#fff', color: '#111', letterSpacing: '0.05em' }}>{m.badge}</span>
                )}
                <span style={{ fontSize: 11, color: m.color, fontWeight: 700, letterSpacing: '0.06em' }}>{m.tag}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{m.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIRAL PRESETS ── */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Viral Presets</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Big-budget effects,<br />one click
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 40, fontSize: 15 }}>From explosions to surreal transformations.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {PRESETS.map(p => (
              <Link key={p} href="/generate" style={{ padding: '10px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: '40px', borderRadius: 24, background: 'linear-gradient(135deg,#0d0d0d,#1a1a1a)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#d7ff1f', display: 'block', marginBottom: 20 }}>MCP & CLI</span>
            <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>Turn Claude into a<br />creative engine</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>Connect Lumenfield to Claude, Cursor, and any MCP-compatible AI agent.</p>
            <Link href="/mcp" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, background: '#d7ff1f', color: '#111', fontWeight: 800, fontSize: 14, textDecoration: 'none' }}>Try now</Link>
          </div>
          <div style={{ padding: '40px', borderRadius: 24, background: 'linear-gradient(135deg,#080d1a,#0d1a2e)', border: '1px solid rgba(0,180,216,0.15)' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', color: '#00b4d8', display: 'block', marginBottom: 20 }}>SUPERCOMPUTER</span>
            <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>Agents, automation,<br />skills & more</h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28, fontSize: 14, lineHeight: 1.6 }}>Build AI workflows that run autonomously. Connect models, tools, files and studios.</p>
            <Link href="/supercomputer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 10, background: 'rgba(0,180,216,0.15)', color: '#00b4d8', fontWeight: 800, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(0,180,216,0.3)' }}>Try now</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: 'center', padding: '100px 24px 120px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'radial-gradient(ellipse at 50% 100%,rgba(215,255,31,0.05) 0%,transparent 60%)' }}>
        <h2 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 20 }}>
          Ready to create?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 40, fontSize: 17 }}>Start free. No credit card required.</p>
        <Link href="/sign-up" style={{ padding: '18px 48px', borderRadius: 16, background: '#d7ff1f', color: '#111', fontWeight: 900, fontSize: 17, textDecoration: 'none', letterSpacing: '-0.01em' }}>
          Get started free →
        </Link>
      </section>

    </main>
  )
}
