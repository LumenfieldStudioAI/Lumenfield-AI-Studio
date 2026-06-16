'use client'
import Link from 'next/link'

const MODELS = [
  { name: 'Soul V2', icon: '👁️', badge: 'TOP', href: '/image?model=soul-v2' },
  { name: 'Kling 3.0', icon: '🎯', badge: null, href: '/video?model=kling' },
  { name: 'Seedance 2.0', icon: '🎬', badge: 'NEW', href: '/video?model=seedance' },
  { name: 'Nano Banana Pro', icon: '🍌', badge: 'TOP', href: '/image?model=nano-banana' },
  { name: 'GPT Image', icon: '✨', badge: null, href: '/image?model=gpt' },
  { name: 'Seedream 5.0', icon: '🌱', badge: 'NEW', href: '/image?model=seedream' },
  { name: 'Flux 2', icon: '⚡', badge: null, href: '/image?model=flux' },
  { name: 'Topaz', icon: '💎', badge: null, href: '/upscale' },
  { name: 'Veo 3', icon: '🔮', badge: 'TOP', href: '/video?model=veo3' },
  { name: 'Claude MCP', icon: '🤖', badge: null, href: '/mcp' },
  { name: 'Wan 2.6', icon: '🌊', badge: null, href: '/video?model=wan' },
  { name: 'MiniMax', icon: '💨', badge: null, href: '/video?model=minimax' },
]

const FEATURES = [
  { icon: '🎬', title: 'Cinema Studio', desc: 'Cinematic video with AI director', href: '/cinema-studio' },
  { icon: '📣', title: 'Marketing Studio', desc: 'Product ads & campaigns in seconds', href: '/marketing-studio' },
  { icon: '⭐', title: 'AI Influencer', desc: 'Consistent virtual personas', href: '/ai-influencer-studio' },
  { icon: '⚡', title: 'Supercomputer', desc: 'Large-scale AI content creation', href: '/supercomputer' },
  { icon: '🎨', title: 'Canvas', desc: 'Workflow board & moodboard', href: '/canvas' },
  { icon: '👤', title: 'Soul ID', desc: 'Create consistent AI characters', href: '/character' },
]

export default function HomePage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 24px 80px', background: 'radial-gradient(ellipse at 50% 0%, rgba(215,255,31,0.08) 0%, transparent 60%)' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>AI Creative Studio</p>
        <h1 style={{ fontSize: 'clamp(40px,7vw,88px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24, maxWidth: 900, margin: '0 auto 24px' }}>
          Generate anything.<br />
          <span style={{ color: '#d7ff1f' }}>Ship faster.</span>
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Video, image, audio and more — powered by 30+ AI models in one place.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/generate" style={{ padding: '14px 32px', borderRadius: 12, background: '#d7ff1f', color: '#111', fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
            Start creating free
          </Link>
          <Link href="/explore" style={{ padding: '14px 32px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
            Explore gallery
          </Link>
        </div>
      </section>

      {/* Models strip */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginBottom: 32 }}>30+ AI Models</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, maxWidth: 1100, margin: '0 auto' }}>
          {MODELS.map(m => (
            <Link key={m.name} href={m.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none', position: 'relative' }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{m.name}</span>
              {m.badge && (
                <span style={{ position: 'absolute', top: -8, right: 8, fontSize: 9, fontWeight: 800, padding: '2px 5px', borderRadius: 4, background: m.badge === 'NEW' ? '#d7ff1f' : '#fff', color: '#111' }}>{m.badge}</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section style={{ padding: '20px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {[
            { label: '🖼️ Generate Image', href: '/image' },
            { label: '🎬 Generate Video', href: '/video' },
            { label: '✏️ Edit Image', href: '/edit' },
            { label: '⬆️ Upscale', href: '/upscale' },
            { label: '👄 Lipsync', href: '/lipsync' },
            { label: '📚 My Library', href: '/library' },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Studios */}
      <section style={{ padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Studios</p>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32 }}>Everything you need to create</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 16 }}>
          {FEATURES.map(f => (
            <Link key={f.title} href={f.href} style={{ display: 'block', padding: '24px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{f.icon}</span>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>Ready to create?</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontSize: 16 }}>Start free. No credit card required.</p>
        <Link href="/sign-up" style={{ padding: '16px 40px', borderRadius: 14, background: '#d7ff1f', color: '#111', fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>
          Get started free
        </Link>
      </section>

    </main>
  )
}
