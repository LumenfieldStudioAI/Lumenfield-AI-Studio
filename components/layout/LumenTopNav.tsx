'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LumenMegaMenu from '@/components/layout/LumenMegaMenu'

type MegaMenuItem = {
  label: string
  href: string
  desc?: string
  badge?: string
}

type MegaMenu = {
  id: string
  sections: {
    title?: string
    items: MegaMenuItem[]
  }[]
}

const IMAGE_MENU: MegaMenu = {
  id: 'image',
  sections: [
    {
      title: 'Features',
      items: [
        { label: 'Create Image', href: '/generate?mode=image', desc: 'Generate AI images' },
        { label: 'Cinematic Cameras', href: '/generate?mode=image&model=cinema', desc: 'Image generation with camera controls', badge: 'TOP' },
        { label: 'Canvas', href: '/canvas', desc: 'Visual ideation meets repeatable AI workflows', badge: 'NEW' },
        { label: 'Moodboard', href: '/generate?mode=image&tool=moodboard', desc: 'Turn your references into a focused moodboard' },
        { label: 'Soul ID Character', href: '/character', desc: 'Create unique reusable characters' },
        { label: 'AI Influencer', href: '/character?mode=influencer', desc: 'Create and manage your AI influencer' },
        { label: 'Photodump', href: '/generate?mode=image&tool=photodump', desc: 'Generate your aesthetic', badge: 'NEW' },
        { label: 'Relight', href: '/edit?tool=relight', desc: 'Adjust lighting position, color, and brightness' },
        { label: 'Inpaint', href: '/edit?tool=inpaint', desc: 'Select an area, describe the change' },
        { label: 'Image Upscale', href: '/upscale', desc: 'Enhance image quality' },
        { label: 'Face Swap', href: '/edit?tool=face-swap', desc: 'Create realistic face swaps' },
        { label: 'Character Swap', href: '/edit?tool=character-swap', desc: 'Create realistic character swaps' },
        { label: 'Draw to Edit', href: '/edit?tool=draw', desc: 'From sketch to picture' },
        { label: 'Fashion Factory', href: '/generate?mode=image&tool=fashion', desc: 'Create fashion sets' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Lumenfield Soul 2.0', href: '/generate?model=soul-2', desc: 'Next generation ultra-realistic fashion visuals', badge: 'TOP' },
        { label: 'Lumenfield Soul Cinema', href: '/generate?model=soul-cinema', desc: 'Cinematic film-grade aesthetic' },
        { label: 'Lumenfield Popcorn', href: '/generate?model=popcorn', desc: 'Storyboard, edit, create' },
        { label: 'GPT Image 2', href: '/generate?model=gpt-image-2', desc: '4K images with near-perfect text rendering', badge: 'NEW' },
        { label: 'Recraft V4.1', href: '/generate?model=recraft', desc: 'Photorealistic and expressive image generation', badge: 'NEW' },
        { label: 'Nano Banana 2', href: '/generate?model=nano-banana-2', desc: 'Pro quality at Flash speed' },
        { label: 'Nano Banana Pro', href: '/generate?model=nano-banana-pro', desc: 'Best 4K image model ever', badge: 'TOP' },
        { label: 'Seedream 5.0 Lite', href: '/generate?model=seedream-5-lite', desc: 'Intelligent visual reasoning' },
        { label: 'GPT Image 1.5', href: '/generate?model=gpt-image-1-5', desc: 'True-color precision rendering' },
        { label: 'Grok Imagine', href: '/generate?model=grok-imagine', desc: 'Versatile image styles by xAI' },
        { label: 'FLUX.2', href: '/generate?model=flux-2', desc: 'Speed-optimized detail' },
        { label: 'Reve', href: '/generate?model=reve', desc: 'Advanced image editing model' },
        { label: 'Z-Image', href: '/generate?model=z-image', desc: 'Instant lifelike portraits' },
        { label: 'Topaz', href: '/upscale?model=topaz', desc: 'High-resolution upscaler' },
      ],
    },
  ],
}

const VIDEO_MENU: MegaMenu = {
  id: 'video',
  sections: [
    {
      title: 'Features',
      items: [
        { label: 'Create Video', href: '/generate?mode=video', desc: 'Generate AI videos' },
        { label: 'Cinema Studio', href: '/generate', desc: 'Cinematic video with AI director', badge: 'TOP' },
        { label: 'Canvas', href: '/canvas', desc: 'Visual ideation meets repeatable workflows', badge: 'NEW' },
        { label: 'Mixed Media', href: '/generate?mode=video&tool=mixed', desc: 'Create mixed media projects' },
        { label: 'Edit Video', href: '/edit?mode=video', desc: 'Edit scenes, shots, elements' },
        { label: 'Click to Ad', href: '/marketing?tool=click-to-ad', desc: 'Turn product URLs into video ads' },
        { label: 'Sora 2 Trends', href: '/generate?model=sora-2', desc: 'Turn ideas into viral videos' },
        { label: 'Lipsync Studio', href: '/lipsync', desc: 'Create talking clips' },
        { label: 'Draw to Video', href: '/edit?tool=draw-to-video', desc: 'Sketch turns into a cinema' },
        { label: 'Sketch to Video', href: '/generate?tool=sketch-to-video', desc: 'From sketch to video with Sora 2' },
        { label: 'UGC Factory', href: '/marketing?tool=ugc', desc: 'Build UGC video with avatar' },
        { label: 'Video Upscale', href: '/upscale?mode=video', desc: 'Enhance video quality' },
        { label: 'Lumenfield Animate', href: '/generate?tool=animate', desc: 'Video smart replacement' },
        { label: 'Vibe Motion', href: '/generate?tool=vibe-motion', desc: 'Create professional motion graphics' },
        { label: 'Recast Studio', href: '/edit?tool=recast', desc: 'Swap characters in videos' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Seedance 2.0', href: '/generate?model=seedance-2', desc: 'Most advanced video model', badge: 'TOP' },
        { label: 'Kling 3.0', href: '/generate?model=kling-3', desc: 'Cinematic videos with audio', badge: 'TOP' },
        { label: 'Kling Motion Control', href: '/generate?model=kling-mc', desc: 'Transfer motion from video to image' },
        { label: 'Kling O1 Edit', href: '/generate?model=kling-o1-edit', desc: 'Advanced video editing' },
        { label: 'Sora 2', href: '/generate?model=sora-2', desc: "OpenAI's most advanced video model" },
        { label: 'Google Veo 3.1 Lite', href: '/generate?model=veo-3-lite', desc: 'Fast video generation by Google' },
        { label: 'Google Veo 3.1', href: '/generate?model=veo-3', desc: 'Advanced AI video with sound' },
        { label: 'HappyHorse', href: '/generate?model=happyhorse', desc: "Alibaba's ranked video and audio model" },
        { label: 'Grok Imagine Video', href: '/generate?model=grok-video', desc: 'Cinematic videos with synchronized audio', badge: 'NEW' },
        { label: 'Wan 2.7', href: '/generate?model=wan-2-7', desc: 'AI video generation with first and end frame control' },
        { label: 'Minimax Hailuo 2.3', href: '/generate?model=hailuo-2-3', desc: 'Fastest high-dynamic video' },
        { label: 'Seedance 1.5 Pro', href: '/generate?model=seedance-1-5-pro', desc: 'Pro-grade audio-visual sync' },
        { label: 'Lumenfield DOP', href: '/generate?model=lumenfield-dop', desc: 'VFX and camera control' },
      ],
    },
  ],
}

const AUDIO_MENU: MegaMenu = {
  id: 'audio',
  sections: [
    {
      title: 'Features',
      items: [
        { label: 'Voiceover', href: '/audio?mode=voiceover', desc: 'Generate speech from text' },
        { label: 'Change Voice', href: '/audio?mode=change-voice', desc: 'Swap voices in any video' },
        { label: 'Translation', href: '/audio?mode=translate', desc: 'Translate speech in any video' },
        { label: 'Text to Speech', href: '/audio?mode=tts', desc: 'Studio quality speech generation' },
        { label: 'Audio Localization', href: '/audio?mode=localization', desc: 'Match speech to markets and platforms' },
        { label: 'Lipsync Audio', href: '/lipsync', desc: 'Prepare audio for talking clips' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Eleven v3', href: '/audio?model=eleven-v3', desc: 'Expressive AI voice with emotion control', badge: 'TOP' },
        { label: 'MiniMax Speech 2.8 HD', href: '/audio?model=minimax-speech', desc: 'Studio-quality text-to-speech', badge: 'NEW' },
        { label: 'Seed Speech', href: '/audio?model=seed-speech', desc: 'ByteDance multilingual text-to-speech' },
        { label: 'VibeVoice', href: '/audio?model=vibevoice', desc: 'Long-form expressive voice synthesis' },
        { label: 'Calm Narrator', href: '/audio?model=calm-narrator', desc: 'Clean narration for explainers' },
        { label: 'Studio Voice Pro', href: '/audio?model=studio-voice-pro', desc: 'Premium voiceover production' },
      ],
    },
  ],
}

const PLUGINS_MENU: MegaMenu = {
  id: 'plugins',
  sections: [
    {
      title: 'Integrations',
      items: [
        { label: 'Adobe Photoshop', href: '/plugins/photoshop', desc: 'AI photo tools inside Photoshop' },
        { label: 'Adobe Premiere Pro', href: '/plugins/premiere', desc: 'AI video tools inside Premiere Pro', badge: 'NEW' },
        { label: 'Adobe After Effects', href: '/plugins/after-effects', desc: 'AI video tools inside After Effects', badge: 'NEW' },
        { label: 'DaVinci Resolve', href: '/plugins/davinci', desc: 'AI video tools inside DaVinci Resolve', badge: 'NEW' },
        { label: 'Figma', href: '/plugins/figma', desc: 'AI image & video tools inside Figma' },
        { label: 'Minecraft', href: '/plugins/minecraft', desc: 'AI generation tools inside Minecraft' },
      ],
    },
  ],
}

function ChevronDown({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function Badge({ label }: { label: string }) {
  const isTop = label === 'TOP'
  const isNew = label === 'NEW'
  return (
    <span style={{
      background: isTop ? '#e8006f' : isNew ? 'rgba(209,254,23,0.15)' : 'rgba(255,255,255,0.1)',
      color: isTop ? '#fff' : isNew ? '#d1fe17' : '#fff',
      borderRadius: 4,
      fontSize: 9,
      fontWeight: 800,
      padding: '1px 5px',
      letterSpacing: 0.5,
      flexShrink: 0,
    }}>
      {label}
    </span>
  )
}

function MegaMenuPanel({ menu, onClose }: { menu: MegaMenu; onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 8,
      zIndex: 999,
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
      background: 'rgba(15,15,15,0.98)',
      backdropFilter: 'blur(20px)',
      minWidth: menu.sections.length > 1 ? 680 : 320,
      maxHeight: 'calc(100vh - 80px)',
      overflowY: 'auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${menu.sections.length}, 1fr)`,
        gap: 0,
        padding: 16,
      }}>
        {menu.sections.map((section, si) => (
          <div key={si} style={{
            borderRight: si < menu.sections.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            paddingRight: si < menu.sections.length - 1 ? 16 : 0,
            paddingLeft: si > 0 ? 16 : 0,
          }}>
            {section.title && (
              <p style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                margin: '4px 8px 10px',
                textTransform: 'uppercase',
              }}>
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '7px 8px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  transition: 'background 120ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  background: '#1b1d21',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 900,
                  color: 'white',
                  flexShrink: 0,
                }}>L</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: item.desc ? 2 : 0 }}>
                    <strong style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{item.label}</strong>
                    {item.badge && <Badge label={item.badge} />}
                  </span>
                  {item.desc && (
                    <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: 12, display: 'block' }}>
                      {item.desc}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LumenNav() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(v => !v)
      }
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const menuMap: Record<string, MegaMenu> = {
    image: IMAGE_MENU,
    video: VIDEO_MENU,
    audio: AUDIO_MENU,
    plugins: PLUGINS_MENU,
  }

  const M = '#e8006f'

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 99,
        background: 'rgba(12,12,12,0.97)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <nav
          ref={navRef}
          aria-label="primary navigation"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            height: 56,
            maxWidth: 1600,
            margin: '0 auto',
            padding: '0 16px',
            gap: 8,
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginRight: 8,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <img
              src="/logo.png"
              alt="Lumenfield"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <strong style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-0.4px',
            }}>
              Lumen<span style={{ color: M }}>field</span>
            </strong>
          </Link>

          {/* Center nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {/* Explore */}
            <Link href="/" style={{
              borderRadius: 8,
              color: pathname === '/' ? 'white' : 'rgba(255,255,255,0.55)',
              fontSize: 15,
              fontWeight: 500,
              padding: '6px 10px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              background: pathname === '/' ? 'rgba(255,255,255,0.07)' : 'transparent',
              transition: 'all 120ms',
            }}>
              Explore
            </Link>

            <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', margin: '0 3px', flexShrink: 0 }} />

            {/* Mega menu items */}
            {(['image', 'video', 'audio', 'plugins'] as const).map(id => {
              const labels: Record<string, string> = { image: 'Image', video: 'Video', audio: 'Audio', plugins: 'Plugins' }
              const badges: Record<string, string> = { plugins: 'New' }
              return (
                <div key={id} style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setOpenMenu(openMenu === id ? null : id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      borderRadius: 8,
                      border: 'none',
                      background: openMenu === id ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: 'rgba(255,255,255,0.55)',
                      cursor: 'pointer',
                      fontSize: 15,
                      fontWeight: 500,
                      padding: '6px 10px',
                      whiteSpace: 'nowrap',
                      transition: 'all 120ms',
                    }}
                  >
                    {labels[id]}
                    {badges[id] && (
                      <span style={{
                        background: 'rgba(16,185,129,0.15)',
                        color: '#10b981',
                        borderRadius: 4,
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '1px 5px',
                      }}>{badges[id]}</span>
                    )}
                    <ChevronDown />
                  </button>
                  {openMenu === id && (id === 'image' || id === 'video' || id === 'audio') && (
                    <LumenMegaMenu kind={id as 'image' | 'video' | 'audio'} />
                  )}
                  {openMenu === id && id === 'plugins' && (
                    <MegaMenuPanel menu={menuMap[id]} onClose={() => setOpenMenu(null)} />
                  )}
                </div>
              )
            })}

            <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', margin: '0 3px', flexShrink: 0 }} />

            {/* Direct links */}
            {[
              { label: 'Supercomputer', href: '/supercomputer', badge: 'New', badgeColor: '#10b981' },
              { label: 'MCP & CLI', href: '/mcp', badge: 'New', badgeColor: '#10b981' },
              { label: 'Collab', href: '/collab' },
              { label: 'Marketing Studio', href: '/marketing' },
              { label: 'Cinema Studio', href: '/generate', badge: 'New', badgeColor: '#10b981' },
              { label: 'AI Influencer', href: '/character?mode=influencer' },
              { label: 'Canvas', href: '/canvas' },
              { label: 'Apps', href: '/apps' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  borderRadius: 8,
                  color: pathname === item.href ? 'white' : 'rgba(255,255,255,0.55)',
                  fontSize: 15,
                  fontWeight: 500,
                  padding: '6px 10px',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  background: pathname === item.href ? 'rgba(255,255,255,0.07)' : 'transparent',
                  transition: 'all 120ms',
                }}
              >
                {item.label}
                {item.badge && (
                  <span style={{
                    background: `${item.badgeColor}22`,
                    color: item.badgeColor,
                    borderRadius: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '1px 5px',
                  }}>{item.badge}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(v => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: 14,
                height: 36,
                padding: '0 10px',
              }}
            >
              <SearchIcon />
              <span>Search</span>
              <kbd style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, color: 'rgba(255,255,255,0.35)', fontSize: 10, padding: '1px 5px' }}>Ctrl</kbd>
              <kbd style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 4, color: 'rgba(255,255,255,0.35)', fontSize: 10, padding: '1px 5px' }}>K</kbd>
            </button>

            {/* Upgrade */}
            <Link href="/pricing" style={{
              alignItems: 'center',
              background: `${M}15`,
              border: `1px solid ${M}40`,
              borderRadius: 10,
              color: M,
              display: 'flex',
              fontSize: 14,
              fontWeight: 700,
              height: 36,
              padding: '0 12px',
              textDecoration: 'none',
            }}>
              Upgrade
            </Link>

            {/* Log in */}
            <Link href="/sign-in" style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 14,
              fontWeight: 500,
              height: 36,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}>
              Log in
            </Link>

            {/* Sign up */}
            <Link href="/sign-up" style={{
              background: M,
              border: 'none',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              height: 36,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}>
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 80,
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
              padding: 8,
              width: '100%',
              maxWidth: 560,
              margin: '0 16px',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 12px 12px',
            }}>
              <SearchIcon />
              <input
                autoFocus
                type="text"
                placeholder="Search tools, presets, models..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  flex: 1,
                  fontSize: 15,
                  outline: 'none',
                }}
              />
              <kbd style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '2px 6px' }}>ESC</kbd>
            </div>
            <div style={{ padding: '10px 4px' }}>
              {[
                { label: 'Generate Video', href: '/generate', icon: '🎬' },
                { label: 'Generate Image', href: '/generate?mode=image', icon: '🖼️' },
                { label: 'Pricing', href: '/pricing', icon: '💳' },
                { label: 'Presets Library', href: '/presets', icon: '⚡' },
                { label: 'Community', href: '/community', icon: '🌐' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    alignItems: 'center',
                    borderRadius: 8,
                    color: 'white',
                    display: 'flex',
                    fontSize: 14,
                    gap: 10,
                    padding: '8px 10px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        nav a:hover { color: white !important; }
        nav button:hover { color: white !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
