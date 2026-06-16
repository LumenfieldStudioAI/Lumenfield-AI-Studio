"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import LumenMegaMenu from "./LumenMegaMenu";

const navItems = [
  { label: "Explore", href: "/explore", menu: "explore" as const },
  { label: "Image", href: "/image", menu: "image" as const },
  { label: "Video", href: "/video", menu: "video" as const },
  { label: "Audio", href: "/audio" },
  { label: "Supercomputer", href: "/supercomputer" },
  { label: "MCP & CLI", href: "/apps" },
  { label: "Plugins", href: "/apps" },
  { label: "Marketing Studio", href: "/marketing-studio/product" },
  { label: "Cinema Studio", href: "/cinema-studio" },
  { label: "AI Influencer", href: "/ai-influencer-studio" },
  { label: "Canvas", href: "/canvas" },
  { label: "Apps", href: "/apps" },
];

export default function LumenTopNav() {
  const [openMenu, setOpenMenu] = useState<"explore" | "image" | "video" | null>(null);

  return (
    <header style={styles.header} onMouseLeave={() => setOpenMenu(null)}>
      <Link href="/" style={styles.brand}>
        <span style={styles.brandMark}>L</span>
        <strong>Lumenfield</strong>
      </Link>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <div key={item.label} style={styles.navWrap} onMouseEnter={() => setOpenMenu(item.menu ?? null)}>
            <Link href={item.href} style={styles.navLink}>{item.label}</Link>
            {item.menu && openMenu === item.menu && <LumenMegaMenu kind={item.menu} />}
          </div>
        ))}
      </nav>

      <div style={styles.actions}>
        <Link href="/pricing" style={styles.pricing}>Pricing</Link>
        <Link href="/login" style={styles.login}>Login</Link>
        <Link href="/signup" style={styles.signup}>Sign up</Link>
      </div>
    </header>
  );
}

const styles: Record<string, CSSProperties> = {
  header: { height: 58, display: "grid", gridTemplateColumns: "160px 1fr auto", alignItems: "center", gap: 16, padding: "0 18px", background: "#0f0f10", color: "#fff", borderBottom: "1px solid rgba(255,255,255,.08)", position: "sticky", top: 0, zIndex: 80 },
  brand: { display: "flex", alignItems: "center", gap: 9, color: "#fff", textDecoration: "none", fontSize: 15 },
  brandMark: { width: 30, height: 30, borderRadius: 10, display: "grid", placeItems: "center", background: "linear-gradient(135deg, #d7ff1f, #71ff00)", color: "#111", fontWeight: 950, boxShadow: "0 0 22px rgba(215,255,31,.28)" },
  nav: { display: "flex", alignItems: "center", gap: 3, minWidth: 0, overflowX: "auto" },
  navWrap: { position: "relative", flex: "0 0 auto" },
  navLink: { display: "block", color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 13, fontWeight: 800, padding: "10px 9px", borderRadius: 999, whiteSpace: "nowrap" },
  actions: { display: "flex", alignItems: "center", gap: 8 },
  pricing: { color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 13, fontWeight: 800 },
  login: { color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 13, fontWeight: 800, padding: "9px 12px", borderRadius: 999, background: "rgba(255,255,255,.07)" },
  signup: { color: "#111", textDecoration: "none", fontSize: 13, fontWeight: 950, padding: "9px 13px", borderRadius: 999, background: "#d7ff1f" },
};
