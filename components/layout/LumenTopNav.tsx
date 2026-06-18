"use client";

import Link from "next/link";
import { useState, useEffect, type CSSProperties } from "react";
import LumenMegaMenu from "./LumenMegaMenu";

const M = "#e8006f";

const navItems = [
  { label: "Explore", href: "/" },
  { label: "Image", href: "/generate?mode=image", menu: "image" as const },
  { label: "Video", href: "/generate?mode=video", menu: "video" as const },
  { label: "Audio", href: "/audio", menu: "audio" as const },
  { label: "Supercomputer", href: "/supercomputer", badge: "New", badgeColor: "#10b981" },
  { label: "MCP & CLI", href: "/mcp", badge: "New", badgeColor: "#10b981" },
  { label: "Collab", href: "/collab" },
  { label: "Plugins", href: "/plugins", badge: "New", badgeColor: "#10b981" },
  { label: "Marketing Studio", href: "/marketing" },
  { label: "Cinema Studio", href: "/generate", badge: "New", badgeColor: "#10b981" },
  { label: "AI Influencer", href: "/character?mode=influencer" },
  { label: "Canvas", href: "/canvas" },
  { label: "Apps", href: "/apps" },
];

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export default function LumenTopNav() {
  const [openMenu, setOpenMenu] = useState<"image" | "video" | "audio" | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <>
      <header style={styles.header} onMouseLeave={() => setOpenMenu(null)}>
        {/* Logo */}
        <Link href="/" style={styles.brand}>
          <img src="/logo.png" alt="Lumenfield" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
          <strong style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.4 }}>
            Lumen<span style={{ color: M }}>field</span>
          </strong>
        </Link>

        {/* Nav */}
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <div
              key={item.label}
              style={styles.navWrap}
              onMouseEnter={() => setOpenMenu((item as { menu?: "image" | "video" | "audio" }).menu ?? null)}
            >
              <Link href={item.href} style={styles.navLink}>
                {item.label}
                {(item as { badge?: string; badgeColor?: string }).badge && (
                  <span style={{
                    background: `${(item as { badgeColor?: string }).badgeColor ?? M}22`,
                    color: (item as { badgeColor?: string }).badgeColor ?? M,
                    borderRadius: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "1px 5px",
                    marginLeft: 4,
                    textTransform: "uppercase",
                  }}>
                    {(item as { badge?: string }).badge}
                  </span>
                )}
              </Link>
              {(item as { menu?: string }).menu && openMenu === (item as { menu?: string }).menu && (
                <LumenMegaMenu kind={openMenu as "image" | "video" | "audio"} />
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div style={styles.actions}>
          {/* Search */}
          <button
            onClick={() => setSearchOpen(v => !v)}
            style={styles.searchBtn}
          >
            <SearchIcon />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Search</span>
            <kbd style={styles.kbd}>Ctrl</kbd>
            <kbd style={styles.kbd}>K</kbd>
          </button>

          {/* Upgrade */}
          <Link href="/pricing" style={styles.upgrade}>Upgrade</Link>

          {/* Log in */}
          <Link href="/sign-in" style={styles.login}>Log in</Link>

          {/* Sign up */}
          <Link href="/sign-up" style={styles.signup}>Sign up</Link>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSearchOpen(false)}
        >
          <div style={styles.searchBox} onClick={e => e.stopPropagation()}>
            <div style={styles.searchInput}>
              <SearchIcon />
              <input
                autoFocus
                type="text"
                placeholder="Search tools, presets, models..."
                style={{ background: "transparent", border: "none", color: "white", flex: 1, fontSize: 15, outline: "none" }}
              />
              <kbd style={styles.kbd}>ESC</kbd>
            </div>
            <div style={{ padding: "10px 4px" }}>
              {[
                { label: "Generate Video", href: "/generate", icon: "🎬" },
                { label: "Generate Image", href: "/generate?mode=image", icon: "🖼️" },
                { label: "Pricing", href: "/pricing", icon: "💳" },
                { label: "Presets Library", href: "/presets", icon: "⚡" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSearchOpen(false)}
                  style={{ alignItems: "center", borderRadius: 8, color: "white", display: "flex", fontSize: 14, gap: 10, padding: "8px 10px", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    height: 56,
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: 8,
    padding: "0 16px",
    background: "rgba(12,12,12,0.97)",
    color: "#fff",
    borderBottom: "1px solid rgba(255,255,255,.07)",
    position: "sticky",
    top: 0,
    zIndex: 99,
    backdropFilter: "blur(16px)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    textDecoration: "none",
    flexShrink: 0,
    marginRight: 8,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  navWrap: { position: "relative", flexShrink: 0 },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    color: "rgba(255,255,255,.6)",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
    padding: "6px 10px",
    borderRadius: 8,
    whiteSpace: "nowrap",
    transition: "color 120ms",
  },
  actions: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 },
  searchBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    height: 36,
    padding: "0 10px",
  },
  kbd: {
    background: "rgba(255,255,255,0.07)",
    borderRadius: 4,
    color: "rgba(255,255,255,0.35)",
    fontSize: 10,
    padding: "1px 5px",
  },
  upgrade: {
    alignItems: "center",
    background: "rgba(232,0,111,0.12)",
    border: "1px solid rgba(232,0,111,0.35)",
    borderRadius: 10,
    color: "#e8006f",
    display: "flex",
    fontSize: 14,
    fontWeight: 700,
    height: 36,
    padding: "0 12px",
    textDecoration: "none",
  },
  login: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: 500,
    height: 36,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  signup: {
    background: "#e8006f",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    height: 36,
    padding: "0 14px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 200,
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 80,
  },
  searchBox: {
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
    padding: 8,
    width: "100%",
    maxWidth: 560,
    margin: "0 16px",
  },
  searchInput: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "8px 12px 12px",
  },
};
