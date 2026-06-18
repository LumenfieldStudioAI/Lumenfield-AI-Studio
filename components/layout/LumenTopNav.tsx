'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MegaMenuId = 'image' | 'video' | 'audio' | 'plugins'

type MegaMenuItem = {
  label: string
  href: string
  desc?: string
  badge?: 'New' | 'Top'
  icon: string
}

type MegaMenu = {
  id: MegaMenuId
  sections: {
    title: string
    items: MegaMenuItem[]
  }[]
}

type NavItem = {
  label: string
  href: string
  exact?: boolean
  menu?: MegaMenuId
  routes?: string[]
  badge?: 'New'
}

const IMAGE_MENU: MegaMenu = {
  id: 'image',
  sections: [
    {
      title: 'Features',
      items: [
        { label: 'Create Image', href: '/generate?mode=image', desc: 'Generate AI images', icon: 'IMG' },
        { label: 'Cinematic Cameras', href: '/cinema-studio', desc: 'Image generation with camera controls', icon: 'CAM', badge: 'Top' },
        { label: 'Canvas', href: '/canvas', desc: 'Visual ideation meets repeatable AI workflows.', icon: 'CAN', badge: 'New' },
        { label: 'Moodboard - Lumenfield', href: '/canvas', desc: 'Turn your references into a focused moodboard', icon: 'MOO' },
        { label: 'Soul ID Character', href: '/character', desc: 'Create unique character', icon: 'ID' },
        { label: 'AI Influencer', href: '/ai-influencer-studio', desc: 'Create and manage your AI influencer', icon: 'AI' },
        { label: 'Photodump', href: '/gallery', desc: 'Generate your aesthetic', icon: 'GAL', badge: 'New' },
        { label: 'Relight', href: '/edit', desc: 'Adjust lighting position, color, and brightness', icon: 'LUX' },
        { label: 'Inpaint', href: '/edit', desc: 'Select an area, describe the change', icon: 'EDT' },
        { label: 'Image Upscale', href: '/upscale', desc: 'Enhance image quality', icon: '4K' },
        { label: 'Face Swap', href: '/character', desc: 'Create realistic face swaps', icon: 'FS' },
        { label: 'Character Swap', href: '/character', desc: 'Create realistic character swaps', icon: 'CS' },
        { label: 'Draw to Edit', href: '/edit', desc: 'From sketch to picture', icon: 'DRW' },
        { label: 'Fashion Factory', href: '/generate?mode=image', desc: 'Create fashion sets', icon: 'FIT' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Lumenfield Soul 2.0', href: '/generate?mode=image&model=soul-v2', desc: 'Next generation ultra-realistic fashion visuals', icon: 'LF', badge: 'Top' },
        { label: 'Lumenfield Soul Cinema', href: '/generate?mode=image&model=soul-cinema', desc: 'Cinematic film-grade aesthetic', icon: 'LF' },
        { label: 'Lumenfield Popcorn', href: '/storyboard', desc: 'Storyboard, edit, create', icon: 'POP' },
        { label: 'GPT Image 2', href: '/generate?mode=image&model=gpt-image-2', desc: '4K images with near-perfect text rendering', icon: 'GPT', badge: 'New' },
        { label: 'Recraft V4.1', href: '/generate?mode=image&model=recraft-v4-1', desc: 'Photorealistic and expressive image generation', icon: 'REC', badge: 'New' },
        { label: 'Nano Banana 2', href: '/generate?mode=image&model=nano-banana-2', desc: 'Pro quality at Flash speed', icon: 'NB' },
        { label: 'Nano Banana Pro', href: '/generate?mode=image&model=nano-banana-pro', desc: 'Best 4K image model ever', icon: 'NBP', badge: 'Top' },
        { label: 'Seedream 5.0 Lite', href: '/generate?mode=image&model=seedream-5-lite', desc: 'Intelligent visual reasoning', icon: 'SD' },
        { label: 'GPT Image 1.5', href: '/generate?mode=image&model=gpt-image-1-5', desc: 'True-color precision rendering', icon: 'GPT' },
        { label: 'Grok Imagine', href: '/generate?mode=image&model=grok-image', desc: 'Versatile image styles by xAI', icon: 'GRK' },
        { label: 'FLUX.2', href: '/generate?mode=image&model=flux-2', desc: 'Speed-optimized detail', icon: 'FLX' },
        { label: 'Reve', href: '/generate?mode=image&model=reve', desc: 'Advanced image editing model', icon: 'REV' },
        { label: 'Z-Image', href: '/generate?mode=image&model=z-image', desc: 'Instant lifelike portraits', icon: 'Z' },
        { label: 'Topaz', href: '/upscale', desc: 'High-resolution upscaler', icon: 'TPZ' },
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
        { label: 'Create Video', href: '/generate?mode=video', desc: 'Generate AI videos', icon: 'VID' },
        { label: 'Cinema Studio', href: '/cinema-studio', desc: 'Cinematic video with AI director', icon: 'CIN', badge: 'Top' },
        { label: 'Mixed Media', href: '/canvas', desc: 'Create mixed media projects', icon: 'MIX' },
        { label: 'Edit Video', href: '/edit', desc: 'Edit scenes, shots, elements', icon: 'EDT' },
        { label: 'Click to Ad', href: '/marketing-studio', desc: 'Turn product URLs into video ads', icon: 'AD' },
        { label: 'Sora 2 Trends', href: '/generate?mode=video&model=sora-2', desc: 'Turn ideas into viral videos', icon: 'S2' },
        { label: 'Lipsync Studio', href: '/lipsync', desc: 'Create talking clips', icon: 'LIP' },
        { label: 'Draw to Video', href: '/generate?mode=video', desc: 'Sketch turns into a cinema', icon: 'DRW' },
        { label: 'Sketch to Video', href: '/generate?mode=video', desc: 'From sketch to video with Sora 2', icon: 'SKT' },
        { label: 'UGC Factory', href: '/marketing-studio', desc: 'Build UGC video with avatar', icon: 'UGC', badge: 'New' },
        { label: 'Video Upscale', href: '/upscale?mode=video', desc: 'Enhance video quality', icon: '4K' },
        { label: 'Lumenfield Animate', href: '/generate?mode=video', desc: 'Video smart replacement', icon: 'ANI' },
        { label: 'Vibe Motion', href: '/generate?mode=video', desc: 'Create professional motion graphics', icon: 'VIB' },
        { label: 'Recast Studio', href: '/character', desc: 'Swap characters in videos', icon: 'REC' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Seedance 2.0', href: '/generate?mode=video&model=seedance-2', desc: 'Most advanced video model', icon: 'SD', badge: 'Top' },
        { label: 'Kling 3.0', href: '/generate?mode=video&model=kling-3', desc: 'Cinematic videos with audio', icon: 'K3', badge: 'Top' },
        { label: 'Kling 3.0 Turbo', href: '/generate?mode=video&model=kling-3-turbo', desc: 'Faster 3.0 generation with native audio', icon: 'K3T', badge: 'New' },
        { label: 'Kling 3.0 Motion Control', href: '/generate?mode=video&model=kling-3-motion', desc: 'Transfer motion from video to image', icon: 'KMC' },
        { label: 'Kling O1 Edit', href: '/generate?mode=video&model=kling-o1-edit', desc: 'Advanced video editing', icon: 'KO1' },
        { label: 'Sora 2', href: '/generate?mode=video&model=sora-2', desc: "OpenAI's most advanced video model", icon: 'S2' },
        { label: 'Google Veo 3.1 Lite', href: '/generate?mode=video&model=veo-3-1-lite', desc: 'Fast video generation by Google', icon: 'G' },
        { label: 'Google Veo 3.1', href: '/generate?mode=video&model=veo-3-1', desc: 'Advanced AI video with sound', icon: 'G' },
        { label: 'HappyHorse', href: '/generate?mode=video&model=happyhorse', desc: "Alibaba's #1 ranked video and audio model", icon: 'HH' },
        { label: 'Grok Imagine 1.5', href: '/generate?mode=video&model=grok-video', desc: 'Cinematic videos with synchronized audio', icon: 'GRK', badge: 'New' },
        { label: 'Wan 2.7', href: '/generate?mode=video&model=wan-2-7', desc: 'AI video generation with first and end frame control', icon: 'WAN' },
        { label: 'Minimax Hailuo 2.3', href: '/generate?mode=video&model=minimax-hailuo', desc: 'Fastest high-dynamic video', icon: 'MM' },
        { label: 'Seedance 1.5 Pro', href: '/generate?mode=video&model=seedance-1-5-pro', desc: 'Pro-grade audio-visual sync', icon: 'SDP' },
        { label: 'Lumenfield DOP', href: '/generate?mode=video&model=dop', desc: 'VFX and camera control', icon: 'LF' },
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
        { label: 'Voiceover', href: '/audio?mode=voiceover', desc: 'Generate speech from text', icon: 'VO' },
        { label: 'Change Voice', href: '/audio?mode=voice', desc: 'Swap voices in any video', icon: 'CHG' },
        { label: 'Translation', href: '/audio?mode=translate', desc: 'Translate speech in any video', icon: 'TR', badge: 'New' },
      ],
    },
    {
      title: 'Models',
      items: [
        { label: 'Eleven v3', href: '/audio?model=eleven-v3', desc: 'Expressive AI voice with emotion control', icon: '11' },
        { label: 'MiniMax Speech 2.8 HD', href: '/audio?model=minimax-speech', desc: 'Studio-quality text-to-speech', icon: 'MM' },
        { label: 'Seed Speech', href: '/audio?model=seed-speech', desc: 'ByteDance multilingual text-to-speech', icon: 'SD', badge: 'New' },
        { label: 'VibeVoice', href: '/audio?model=vibevoice', desc: 'Long-form expressive voice synthesis', icon: 'V' },
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
        { label: 'Premiere Pro', href: '/plugins/premiere', desc: 'AI tools inside Premiere', icon: 'PR', badge: 'New' },
        { label: 'After Effects', href: '/plugins/after-effects', desc: 'Motion and VFX assistant', icon: 'AE', badge: 'New' },
        { label: 'DaVinci Resolve', href: '/plugins/davinci', desc: 'Color and edit assistant', icon: 'DR', badge: 'New' },
        { label: 'Figma', href: '/plugins/figma', desc: 'Design to video workflow', icon: 'FIG' },
        { label: 'Photoshop', href: '/plugins/photoshop', desc: 'Real-time AI generation', icon: 'PS' },
        { label: 'MCP & CLI', href: '/mcp', desc: 'Use Lumenfield in any agent', icon: 'CLI', badge: 'New' },
      ],
    },
  ],
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Explore', href: '/', exact: true },
  { label: 'Image', href: '/generate?mode=image', menu: 'image', routes: ['/generate'] },
  { label: 'Video', href: '/generate?mode=video', menu: 'video', routes: ['/generate'] },
  { label: 'Audio', href: '/audio', menu: 'audio', routes: ['/audio'] },
  { label: 'Supercomputer', href: '/supercomputer', badge: 'New' },
  { label: 'MCP & CLI', href: '/mcp', badge: 'New' },
  { label: 'Collab', href: '/projects' },
  { label: 'Plugins', href: '/plugins', menu: 'plugins', routes: ['/plugins'], badge: 'New' },
  { label: 'Marketing', href: '/marketing-studio', routes: ['/marketing-studio'] },
]

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function ChevronDown({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function LumenMark() {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        background: '#f4f4f2',
        color: '#0f1113',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 900,
        fontSize: 16,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      LF
    </span>
  )
}

function MegaMenuPanel({ menu, onClose }: { menu: MegaMenu; onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-0 mt-2 z-50 rounded-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      style={{
        background: 'rgba(25,27,29,0.99)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        width: menu.id === 'audio' ? 'min(92vw, 630px)' : 'min(92vw, 720px)',
        maxHeight: 'calc(100vh - 76px)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${menu.sections.length}, minmax(0, 1fr))`,
          gap: 24,
          padding: 20,
        }}
      >
        {menu.sections.map((section) => (
          <div key={section.title}>
            <p
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: 13,
                fontWeight: 500,
                margin: '0 0 12px',
              }}
            >
              {section.title}
            </p>
            <div style={{ display: 'grid', gap: 9 }}>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px minmax(0, 1fr)',
                    alignItems: 'center',
                    gap: 12,
                    minHeight: 48,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: 13,
                  }}
                >
                  <span
                    style={{
                      position: 'relative',
                      width: 48,
                      height: 48,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: 10,
                      background: '#202327',
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 900,
                    }}
                  >
                    {item.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: -8,
                          left: 5,
                          padding: '1px 6px',
                          borderRadius: 4,
                          background: item.badge === 'Top' ? '#ff1c72' : '#d7ff1f',
                          color: item.badge === 'Top' ? '#fff' : '#111',
                          fontSize: 10,
                          fontWeight: 950,
                          transform: 'rotate(-5deg)',
                        }}
                      >
                        {item.badge.toUpperCase()}
                      </span>
                    )}
                    {item.icon}
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 850, lineHeight: 1.1 }}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span style={{ display: 'block', marginTop: 6, color: 'rgba(255,255,255,0.42)', fontSize: 13, lineHeight: 1.2 }}>
                        {item.desc}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LumenNav() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<MegaMenuId | null>(null)
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
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  const menuMap: Record<MegaMenuId, MegaMenu> = {
    image: IMAGE_MENU,
    video: VIDEO_MENU,
    audio: AUDIO_MENU,
    plugins: PLUGINS_MENU,
  }

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href
    if (item.routes) return item.routes.some((route) => pathname.startsWith(route))
    return pathname.startsWith(item.href)
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
          background: 'rgba(15,17,19,0.96)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <nav
          ref={navRef}
          aria-label="primary navigation"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            height: 56,
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 16px',
            gap: 8,
            position: 'relative',
          }}
        >
          <Link
            href="/"
            aria-label="Lumenfield AI Studio home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginRight: 8,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <LumenMark />
            <strong
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              Lumen<span style={{ color: '#d1fe17' }}>field</span>
            </strong>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
            className="hide-scrollbar"
          >
            {NAV_ITEMS.map((item, index) => (
              <div key={item.label} style={{ position: 'relative', flexShrink: 0 }}>
                {index === 1 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 14,
                      background: 'rgba(255,255,255,0.12)',
                      display: 'inline-block',
                      margin: '0 2px',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
                {item.menu ? (
                  <>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openMenu === item.menu}
                      onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu ?? null)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        borderRadius: 8,
                        border: 'none',
                        background: openMenu === item.menu ? 'rgba(255,255,255,0.08)' : 'transparent',
                        color: openMenu === item.menu || isActive(item) ? '#d1fe17' : 'rgba(255,255,255,0.62)',
                        cursor: 'pointer',
                        fontSize: 15,
                        fontWeight: 650,
                        padding: '6px 10px',
                        whiteSpace: 'nowrap',
                        transition: 'all 120ms ease',
                      }}
                    >
                      {item.label}
                      {item.badge && (
                        <span
                          style={{
                            background: '#d1fe17',
                            borderRadius: 4,
                            color: '#131517',
                            fontSize: 9,
                            fontWeight: 800,
                            padding: '1px 5px',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown />
                    </button>
                    {openMenu === item.menu && (
                      <MegaMenuPanel
                        menu={menuMap[item.menu]}
                        onClose={() => setOpenMenu(null)}
                      />
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      borderRadius: 8,
                      color: isActive(item) ? '#d1fe17' : 'rgba(255,255,255,0.62)',
                      fontSize: 15,
                      fontWeight: 650,
                      padding: '6px 10px',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      background: isActive(item) ? 'rgba(255,255,255,0.06)' : 'transparent',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        style={{
                          background: '#d1fe17',
                          borderRadius: 4,
                          color: '#131517',
                          fontSize: 9,
                          fontWeight: 800,
                          padding: '1px 5px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                color: 'rgba(255,255,255,0.52)',
                cursor: 'pointer',
                fontSize: 15,
                height: 36,
                padding: '0 10px',
                transition: 'all 120ms ease',
              }}
            >
              <SearchIcon />
              <span className="hidden-mobile">Search</span>
              <span style={{ display: 'flex', gap: 3, marginLeft: 4 }} className="hidden-mobile">
                <kbd style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '1px 5px' }}>
                  Ctrl
                </kbd>
                <kbd style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '1px 5px' }}>
                  K
                </kbd>
              </span>
            </button>

            <Link
              href="/library"
              aria-label="Library"
              style={{
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                backdropFilter: 'blur(12px)',
                color: 'rgba(255,255,255,0.52)',
                display: 'flex',
                gap: 5,
                fontSize: 15,
                height: 36,
                padding: '0 10px',
                textDecoration: 'none',
              }}
              className="hidden-mobile"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path d="M16 3v4M8 3v4M3 11h18" />
              </svg>
              Library
            </Link>

            <Link
              href="/pricing"
              style={{
                alignItems: 'center',
                background: 'rgba(209,254,23,0.08)',
                border: '1px solid rgba(209,254,23,0.2)',
                borderRadius: 10,
                color: '#d1fe17',
                display: 'flex',
                fontSize: 15,
                fontWeight: 700,
                gap: 5,
                height: 36,
                padding: '0 10px',
                position: 'relative',
                textDecoration: 'none',
                transition: 'background 120ms ease',
              }}
            >
              Upgrade
            </Link>

            <Link
              href="/sign-in"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
                height: 36,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'all 120ms ease',
              }}
            >
              Log in
            </Link>

            <Link
              href="/sign-up"
              style={{
                background: '#d1fe17',
                border: 'none',
                borderRadius: 10,
                color: '#131517',
                fontSize: 15,
                fontWeight: 700,
                height: 36,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'opacity 120ms ease',
              }}
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>

      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.7)',
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
              background: '#1c1e20',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              padding: 8,
              width: '100%',
              maxWidth: 580,
              margin: '0 16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '8px 12px 12px',
              }}
            >
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
              <kbd style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: 'rgba(255,255,255,0.4)', fontSize: 11, padding: '2px 6px' }}>
                ESC
              </kbd>
            </div>

            <div style={{ padding: '10px 4px' }}>
              <p
                style={{
                  color: 'rgba(255,255,255,0.28)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  margin: '4px 8px 8px',
                  textTransform: 'uppercase',
                }}
              >
                Quick links
              </p>
              {[
                { label: 'Generate Video', href: '/generate?mode=video', icon: 'VID' },
                { label: 'Generate Image', href: '/generate?mode=image', icon: 'IMG' },
                { label: 'Pricing', href: '/pricing', icon: 'PRO' },
                { label: 'Presets Library', href: '/presets', icon: 'PRE' },
                { label: 'Community', href: '/community', icon: 'COM' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSearchOpen(false)}
                  style={{
                    alignItems: 'center',
                    borderRadius: 8,
                    color: 'white',
                    display: 'flex',
                    fontSize: 16,
                    gap: 10,
                    padding: '8px 10px',
                    textDecoration: 'none',
                    transition: 'background 120ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span style={{ width: 28, color: '#d1fe17', fontSize: 11, fontWeight: 900 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="mobile navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(15,17,19,0.96)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: '1fr',
          padding: '8px 0 12px',
        }}
        className="mobile-bottom-nav"
      >
        {[
          { label: 'Home', href: '/', icon: 'HOME' },
          { label: 'Library', href: '/library', icon: 'LIB' },
          { label: 'Generate', href: '/generate', icon: 'GEN', accent: true },
          { label: 'Apps', href: '/apps', icon: 'APP' },
          { label: 'Account', href: '/account', icon: 'ME' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              alignItems: 'center',
              color: item.accent ? '#d1fe17' : pathname === item.href ? 'white' : 'rgba(255,255,255,0.45)',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              fontSize: 10,
              fontWeight: 500,
              justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            {item.accent ? (
              <span
                style={{
                  background: '#d1fe17',
                  borderRadius: 12,
                  color: '#131517',
                  display: 'grid',
                  height: 40,
                  placeItems: 'center',
                  width: 52,
                  marginBottom: 2,
                  boxShadow: '0 0 20px rgba(209,254,23,0.3)',
                  position: 'relative',
                  bottom: 8,
                  fontSize: 11,
                  fontWeight: 900,
                }}
              >
                {item.icon}
              </span>
            ) : (
              <span style={{ fontSize: 10, fontWeight: 900 }}>{item.icon}</span>
            )}
            {item.label}
          </Link>
        ))}
      </nav>

      <style>{`
        .hidden-mobile { display: flex; }
        .mobile-bottom-nav { display: none !important; }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-bottom-nav { display: grid !important; }
        }

        nav a:hover, nav button:hover {
          color: white !important;
          transform: none !important;
        }
      `}</style>
    </>
  )
}
