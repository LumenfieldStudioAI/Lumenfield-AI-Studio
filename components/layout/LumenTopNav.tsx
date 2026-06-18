'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ── Types ────────────────────────────────────────────────────
type MegaMenuItem = {
  label: string
  href: string
  desc?: string
  badge?: string
  icon?: string
}

type MegaMenu = {
  id: string
  sections: {
    title?: string
    items: MegaMenuItem[]
  }[]
}

// ── Mega Menu Data ───────────────────────────────────────────
const IMAGE_MENU: MegaMenu = {
  id: 'image',
  sections: [
    {
      title: 'Generate',
      items: [
        { label: 'Text to Image', href: '/generate?mode=image', desc: 'Create images from prompts' },
        { label: 'AI Photo Studio', href: '/generate?mode=image&model=soul', desc: 'Fashion, portrait & editorial' },
        { label: 'Product Image', href: '/generate?mode=image&model=product', desc: 'Studio product photos' },
        { label: 'Character Creator', href: '/character', desc: 'Build reusable AI characters' },
      ],
    },
    {
      title: 'Edit',
      items: [
        { label: 'Edit Image', href: '/edit', desc: 'Inpaint, replace, transform' },
        { label: 'Image Upscale', href: '/upscale', desc: '2K/4K enhancement' },
        { label: 'Background Remove', href: '/edit?tool=bg-remove', desc: 'Clean cutouts instantly' },
        { label: 'Multi Reference', href: '/edit?tool=multi-ref', desc: 'Combine multiple references' },
      ],
    },
  ],
}

const VIDEO_MENU: MegaMenu = {
  id: 'video',
  sections: [
    {
      title: 'Generate',
      items: [
        { label: 'Text to Video', href: '/generate?mode=video', desc: 'Cinematic video from prompts' },
        { label: 'Image to Video', href: '/generate?mode=video&type=i2v', desc: 'Animate your images' },
        { label: 'Cinema Studio', href: '/generate', desc: 'AI director & camera control', badge: 'New' },
        { label: 'Marketing Studio', href: '/marketing', desc: 'Product ads in one click' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { label: 'Lipsync Studio', href: '/lipsync', desc: 'Sync audio to any video' },
        { label: 'Talking Avatar', href: '/character?mode=avatar', desc: 'Animated AI presenters' },
        { label: 'Video Upscale', href: '/upscale?mode=video', desc: '1080p / 4K enhancement' },
        { label: 'Viral Presets', href: '/presets', desc: 'One-click cinematic effects' },
      ],
    },
  ],
}

const AUDIO_MENU: MegaMenu = {
  id: 'audio',
  sections: [
    {
      title: 'Generate',
      items: [
        { label: 'AI Voice Over', href: '/audio?mode=voiceover', desc: 'Studio-quality narration' },
        { label: 'Voice Translation', href: '/audio?mode=translate', desc: 'Dub in any language' },
        { label: 'Music Generation', href: '/audio?mode=music', desc: 'Original AI music tracks' },
        { label: 'Sound Effects', href: '/audio?mode=sfx', desc: 'Cinematic sound design' },
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
        { label: 'Premiere Pro', href: '/plugins/premiere', desc: 'AI tools inside Premiere', badge: 'New' },
        { label: 'After Effects', href: '/plugins/after-effects', desc: 'Motion & VFX assistant', badge: 'New' },
        { label: 'DaVinci Resolve', href: '/plugins/davinci', desc: 'Color & edit assistant', badge: 'New' },
        { label: 'Figma', href: '/plugins/figma', desc: 'Design to video workflow' },
        { label: 'Photoshop', href: '/plugins/photoshop', desc: 'Real-time AI generation' },
        { label: 'MCP & CLI', href: '/mcp', desc: 'Use Lumenfield in any agent', badge: 'New' },
      ],
    },
  ],
}

// ── Main Nav Items ────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Explore', href: '/', exact: true },
  { label: 'Image', href: '/generate?mode=image', menu: 'image', routes: ['/generate'] },
  { label: 'Video', href: '/generate?mode=video', menu: 'video', routes: ['/generate'] },
  { label: 'Audio', href: '/audio', menu: 'audio', routes: ['/audio'] },
  { label: 'Plugins', href: '/plugins', menu: 'plugins', routes: ['/plugins'], badge: 'New' },
]

const STUDIO_LINKS = [
  { label: 'Cinema Studio', href: '/generate', badge: 'New' },
  { label: 'Marketing Studio', href: '/marketing' },
  { label: 'AI Influencer', href: '/character?mode=influencer' },
  { label: 'Storyboard', href: '/storyboard' },
  { label: 'Apps', href: '/apps' },
]

// ── Helpers ──────────────────────────────────────────────────
function LIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="currentColor">
      <rect width="80" height="80" rx="16" fill="currentColor" />
      <path d="M40 16L28 40h10l-6 24 20-28H38L40 16z" fill="#0f1113" opacity={0.9} />
    </svg>
  )
}

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

// ── Mega Menu Panel ───────────────────────────────────────────
function MegaMenuPanel({ menu, onClose }: { menu: MegaMenu; onClose: () => void }) {
  return (
    <div
      className="absolute top-full left-0 mt-2 z-50 rounded-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      style={{
        background: 'rgba(19,21,23,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        minWidth: menu.sections.length > 1 ? 520 : 280,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${menu.sections.length}, 1fr)`,
          gap: 0,
          padding: '12px',
        }}
      >
        {menu.sections.map((section, si) => (
          <div
            key={si}
            style={{
              borderRight: si < menu.sections.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              paddingRight: si < menu.sections.length - 1 ? '12px' : 0,
              paddingLeft: si > 0 ? '12px' : 0,
            }}
          >
            {section.title && (
              <p
                style={{
                  color: 'rgba(255,255,255,0.28)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  margin: '4px 8px 8px',
                  textTransform: 'uppercase',
                }}
              >
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="mega-link"
                style={{ display: 'block' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <strong style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>
                    {item.label}
                  </strong>
                  {item.badge && (
                    <span
                      style={{
                        background: 'rgba(209,254,23,0.15)',
                        borderRadius: 4,
                        color: '#d1fe17',
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '1px 5px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.desc && (
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 2, display: 'block' }}>
                    {item.desc}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function LumenNav() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close on outside click
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

  // Close on route change
  useEffect(() => {
    setOpenMenu(null)
    setSearchOpen(false)
  }, [pathname])

  // Keyboard shortcut Ctrl+K
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

  const menuMap: Record<string, MegaMenu> = {
    image: IMAGE_MENU,
    video: VIDEO_MENU,
    audio: AUDIO_MENU,
    plugins: PLUGINS_MENU,
  }

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.exact) return pathname === item.href
    if (item.routes) return item.routes.some((r) => pathname.startsWith(r))
    return pathname.startsWith(item.href)
  }

  return (
    <>
      {/* ── Nav Bar ── */}
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
            height: 52,
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 16px',
            gap: 8,
            position: 'relative',
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="Lumenfield home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginRight: 8,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #ff4da6, #e8006f 55%, #7c1dff)',
                boxShadow: '0 0 20px rgba(232,0,111,0.34)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              L
            </span>
            <strong
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '-0.5px',
              }}
            >
              Lumen<span style={{ color: '#e8006f' }}>field</span>
            </strong>
          </Link>

          {/* ── Center Nav Links ── */}
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
            {/* Explore */}
            <Link
              href="/"
              style={{
                borderRadius: 8,
                color: pathname === '/' ? 'white' : 'rgba(255,255,255,0.52)',
                fontSize: 13,
                fontWeight: 500,
                padding: '6px 10px',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                background: pathname === '/' ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'all 120ms ease',
              }}
            >
              Explore
            </Link>

            {/* Separator */}
            <span
              style={{
                width: 1,
                height: 14,
                background: 'rgba(255,255,255,0.12)',
                flexShrink: 0,
                margin: '0 2px',
              }}
            />

            {/* Menus: Image / Video / Audio / Plugins */}
            {NAV_ITEMS.slice(1).map((item) => (
              <div key={item.label} style={{ position: 'relative' }}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === item.menu}
                  onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu!)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    borderRadius: 8,
                    border: 'none',
                    background: openMenu === item.menu ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: isActive(item) ? 'white' : 'rgba(255,255,255,0.52)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '6px 10px',
                    whiteSpace: 'nowrap',
                    transition: 'all 120ms ease',
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        background: 'rgba(209,254,23,0.15)',
                        borderRadius: 4,
                        color: '#d1fe17',
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

                {/* Mega menu dropdown */}
                {openMenu === item.menu && item.menu && menuMap[item.menu] && (
                  <MegaMenuPanel
                    menu={menuMap[item.menu]}
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </div>
            ))}

            {/* Separator */}
            <span
              style={{
                width: 1,
                height: 14,
                background: 'rgba(255,255,255,0.12)',
                flexShrink: 0,
                margin: '0 2px',
              }}
            />

            {/* Studio direct links */}
            {STUDIO_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  borderRadius: 8,
                  color: pathname === item.href ? 'white' : 'rgba(255,255,255,0.52)',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '6px 10px',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  background: pathname === item.href ? 'rgba(255,255,255,0.06)' : 'transparent',
                  transition: 'all 120ms ease',
                }}
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      background: 'rgba(209,254,23,0.15)',
                      borderRadius: 4,
                      color: '#d1fe17',
                      fontSize: 9,
                      fontWeight: 800,
                      padding: '1px 5px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {/* Search Button */}
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
                fontSize: 13,
                height: 36,
                padding: '0 10px',
                transition: 'all 120ms ease',
              }}
            >
              <SearchIcon />
              <span className="hidden-mobile">Search</span>
              <span
                style={{
                  display: 'flex',
                  gap: 3,
                  marginLeft: 4,
                }}
                className="hidden-mobile"
              >
                <kbd
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 4,
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 11,
                    padding: '1px 5px',
                  }}
                >
                  Ctrl
                </kbd>
                <kbd
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 4,
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 11,
                    padding: '1px 5px',
                  }}
                >
                  K
                </kbd>
              </span>
            </button>

            {/* Library */}
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
                fontSize: 13,
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

            {/* Upgrade */}
            <Link
              href="/pricing"
              style={{
                alignItems: 'center',
                background: 'rgba(209,254,23,0.08)',
                border: '1px solid rgba(209,254,23,0.2)',
                borderRadius: 10,
                color: '#d1fe17',
                display: 'flex',
                fontSize: 13,
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

            {/* Login */}
            <Link
              href="/sign-in"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: 'rgba(255,255,255,0.7)',
                fontSize: 13,
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

            {/* Sign up */}
            <Link
              href="/sign-up"
              style={{
                background: '#d1fe17',
                border: 'none',
                borderRadius: 10,
                color: '#131517',
                fontSize: 13,
                fontWeight: 700,
                height: 36,
                padding: '0 14px',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'opacity 120ms ease',
              }}
            >
              Start Free
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Search Overlay ── */}
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
            {/* Search input */}
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
              <kbd
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: 11,
                  padding: '2px 6px',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Quick links */}
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
                { label: 'Generate Video', href: '/generate', icon: '🎬' },
                { label: 'Generate Image', href: '/generate?mode=image', icon: '🖼️' },
                { label: 'Pricing', href: '/pricing', icon: '💳' },
                { label: 'Presets Library', href: '/presets', icon: '⚡' },
                { label: 'Community', href: '/community', icon: '🌐' },
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
                    fontSize: 14,
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
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile bottom nav ── */}
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
        className="mobile-only"
      >
        {[
          { label: 'Home', href: '/', icon: '🏠' },
          { label: 'Library', href: '/library', icon: '📁' },
          { label: 'Generate', href: '/generate', icon: '✨', accent: true },
          { label: 'Apps', href: '/apps', icon: '⚡' },
          { label: 'Account', href: '/account', icon: '👤' },
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
                  display: 'grid',
                  height: 40,
                  placeItems: 'center',
                  width: 52,
                  marginBottom: 2,
                  boxShadow: '0 0 20px rgba(209,254,23,0.3)',
                  position: 'relative',
                  bottom: 8,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#131517">
                  <path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6L4 9h6z" />
                </svg>
              </span>
            ) : (
              <span style={{ fontSize: 20 }}>{item.icon}</span>
            )}
            {item.label}
          </Link>
        ))}
      </nav>

      <style>{`
        .hidden-mobile { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only { display: grid !important; }
        }

        nav a:hover, nav button:hover {
          color: white !important;
          transform: none !important;
        }
      `}</style>
    </>
  )
}
