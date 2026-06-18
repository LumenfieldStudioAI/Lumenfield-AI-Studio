"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LumenMegaMenu from "./LumenMegaMenu";

export default function LumenTopNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"image" | "video" | "audio" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
      if (e.key === "Escape") {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const M = "#e8006f";
  const PURPLE = "#a78bfa";

  const menuItems: Array<{
    label: string;
    href?: string;
    menu?: "image" | "video" | "audio";
    badge?: string;
    badgeColor?: string;
  }> = [
    { label: "Explore", href: "/" },
    { label: "Image", menu: "image" },
    { label: "Video", menu: "video" },
    { label: "Audio", menu: "audio" },
    { label: "Supercomputer", href: "/supercomputer", badge: "New", badgeColor: PURPLE },
    { label: "MCP & CLI", href: "/mcp", badge: "New", badgeColor: PURPLE },
    { label: "Collab", href: "/collab" },
    { label: "Plugins", href: "/plugins", badge: "New", badgeColor: PURPLE },
    { label: "Marketing Studio", href: "/marketing" },
    { label: "Cinema Studio", href: "/generate", badge: "New", badgeColor: PURPLE },
    { label: "AI Influencer", href: "/character?mode=influencer" },
    { label: "Canvas", href: "/canvas" },
    { label: "Apps", href: "/apps" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          contain: "layout",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 16px",
          gap: 16,
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <img src="/logo.png" alt="Lumenfield" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "white", letterSpacing: -0.3 }}>
              Lumen<span style={{ color: M }}>field</span>
            </span>
          </Link>

          {/* Nav */}
          <nav style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flex: 1,
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}>
            {menuItems.map((item) => (
              <div key={item.label} style={{ position: "relative", flexShrink: 0 }}>
                {item.menu ? (
                  <button
                    onClick={() => setOpenMenu(openMenu === item.menu ? null : item.menu!)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "none",
                      background: openMenu === item.menu ? "rgba(255,255,255,0.07)" : "transparent",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "color 120ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = openMenu === item.menu ? "white" : "rgba(255,255,255,0.6)")}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 10px",
                      borderRadius: 8,
                      color: pathname === item.href ? "white" : "rgba(255,255,255,0.6)",
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "color 120ms",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = pathname === item.href ? "white" : "rgba(255,255,255,0.6)")}
                  >
                    {item.label}
                    {item.badge && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: item.badgeColor,
                        textTransform: "uppercase",
                        letterSpacing: 0.3,
                      }}>{item.badge}</span>
                    )}
                  </Link>
                )}
                {item.menu && openMenu === item.menu && (
                  <LumenMegaMenu kind={item.menu} />
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "0 10px",
                height: 34,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              Search
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "1px 5px" }}>⌘K</span>
            </button>

            {/* Pricing */}
            <Link href="/pricing" style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              Pricing
              <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>30% OFF</span>
            </Link>

            {/* Log in */}
            <Link href="/sign-in" style={{
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              Log in
            </Link>

            {/* Sign up */}
            <Link href="/sign-up" style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
              padding: "6px 16px",
              borderRadius: 20,
              background: M,
            }}>
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80 }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 8, width: "100%", maxWidth: 560, margin: "0 16px" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "8px 12px 12px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input autoFocus type="text" placeholder="Search tools, presets, models..." style={{ background: "transparent", border: "none", color: "white", flex: 1, fontSize: 15, outline: "none" }} />
              <kbd style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, color: "rgba(255,255,255,0.4)", fontSize: 11, padding: "2px 6px" }}>ESC</kbd>
            </div>
            <div style={{ padding: "8px 4px" }}>
              {[
                { label: "Generate Video", href: "/generate", icon: "🎬" },
                { label: "Generate Image", href: "/generate?mode=image", icon: "🖼️" },
                { label: "Pricing", href: "/pricing", icon: "💳" },
                { label: "Audio Studio", href: "/audio", icon: "🎙" },
                { label: "Marketing Studio", href: "/marketing", icon: "📣" },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setSearchOpen(false)}
                  style={{ alignItems: "center", borderRadius: 8, color: "white", display: "flex", fontSize: 14, gap: 10, padding: "8px 10px", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        padding: "8px 0 12px",
        background: "rgba(10,10,10,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
      }} className="mobile-bottom-nav">
        {[
          { label: "Home", href: "/", icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.565 2.638C9.468 1.936 10.732 1.936 11.635 2.638L18.112 7.675C18.481 7.958 18.5 8.504 18.257 8.845C18.093 9.056 17.848 9.165 17.6 9.165V16.25C17.6 17.4 16.667 18.333 15.517 18.333H4.683C3.533 18.333 2.6 17.4 2.6 16.25V9.165C2.352 9.165 2.106 9.056 1.942 8.845C1.66 8.482 1.725 7.958 2.088 7.675L8.565 2.638ZM10.933 11.666C9.7 11.666 8.609 11.667 8.411 11.68C8.222 11.693 8.149 11.715 8.114 11.73C7.91 11.814 7.748 11.977 7.663 12.181C7.649 12.215 7.627 12.288 7.614 12.478C7.6 12.675 7.6 12.933 7.6 13.333V16.666H12.6V13.333C12.6 12.933 12.6 12.675 12.586 12.478C12.573 12.288 12.551 12.215 12.536 12.181C12.452 11.977 12.29 11.814 12.086 11.73C12.051 11.715 11.978 11.693 11.789 11.68C11.591 11.667 11.333 11.666 10.933 11.666Z"/>
            </svg>
          )},
          { label: "Library", href: "/library", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          )},
          { label: "Generate", href: "/generate", isMain: true },
          { label: "Community", href: "/community", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          )},
          { label: "Profile", href: "/account", icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          )},
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            color: item.isMain ? M : (pathname === item.href ? "white" : "rgba(255,255,255,0.45)"),
            textDecoration: "none",
            fontSize: 10,
            fontWeight: 500,
            position: "relative",
          }}>
            {item.isMain ? (
              <span style={{
                position: "absolute",
                top: -16,
                width: 52,
                height: 44,
                borderRadius: 14,
                background: M,
                display: "grid",
                placeItems: "center",
                boxShadow: `0 0 20px ${M}66`,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12.737 2.61C12.669 2.256 12.36 2 12 2s-.669.256-.737.61c-.479 2.514-1.424 4.427-2.825 5.829C7.037 9.84 5.124 10.784 2.61 11.263 2.256 11.33 2 11.64 2 12s.256.669.61.737c2.514.479 4.427 1.424 5.829 2.825C9.84 16.963 10.784 18.876 11.263 21.39c.068.354.377.61.737.61s.669-.256.737-.61c.479-2.514 1.424-4.427 2.825-5.828C16.963 14.16 18.876 13.216 21.39 12.737c.354-.068.61-.377.61-.737s-.256-.669-.61-.737c-2.514-.479-4.427-1.424-5.828-2.825C14.16 7.037 13.216 5.124 12.737 2.61z"/>
                </svg>
              </span>
            ) : item.icon}
            <span style={{ marginTop: item.isMain ? 28 : 0 }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <style>{`
        @media (min-width: 768px) { .mobile-bottom-nav { display: none !important; } }
        nav a:hover { color: white !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
