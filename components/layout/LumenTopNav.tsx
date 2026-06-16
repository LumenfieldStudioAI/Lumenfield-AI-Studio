"use client";

import Link from "next/link";
import { useState, useRef, type CSSProperties } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import LumenMegaMenu from "./LumenMegaMenu";

type MenuKind = "create" | "studios" | "models" | "integrations" | null;

const NAV = [
  { label: "Create", menu: "create" as MenuKind, href: "/generate" },
  { label: "Studios", menu: "studios" as MenuKind, href: "/studio" },
  { label: "Models", menu: "models" as MenuKind, href: "/models" },
  { label: "Integrations", menu: "integrations" as MenuKind, href: "/apps" },
  { label: "Pricing", href: "/pricing", menu: null },
];

export default function LumenTopNav() {
  const [open, setOpen] = useState<MenuKind>(null);
  const { isSignedIn, user } = useUser();
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (menu: MenuKind) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(menu);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(null), 120);
  };

  return (
    <header style={s.header} onMouseLeave={handleLeave}>
      {/* Brand */}
      <Link href="/" style={s.brand}>
        <span style={s.mark}>L</span>
        <strong>Lumenfield</strong>
      </Link>

      {/* Nav */}
      <nav style={s.nav}>
        {NAV.map((item) => (
          <div key={item.label} style={s.wrap} onMouseEnter={() => handleEnter(item.menu)}>
            <Link href={item.href} style={s.link}>{item.label}</Link>
            {item.menu && open === item.menu && (
              <LumenMegaMenu kind={item.menu} onMouseEnter={() => handleEnter(item.menu)} />
            )}
          </div>
        ))}
      </nav>

      {/* Actions */}
      <div style={s.actions}>
        {isSignedIn ? (
          <>
            <Link href="/library" style={s.btn}>Library</Link>
            <Link href="/generate" style={s.cta}>+ Create</Link>
            <div style={s.avatar}>{user?.firstName?.[0] ?? "U"}</div>
          </>
        ) : (
          <>
            <Link href="/sign-in" style={s.btn}>Log in</Link>
            <Link href="/sign-up" style={s.cta}>Get started</Link>
          </>
        )}
      </div>
    </header>
  );
}

const s: Record<string, CSSProperties> = {
  header: { height: 56, display: "grid", gridTemplateColumns: "160px 1fr auto", alignItems: "center", gap: 16, padding: "0 18px", background: "#0c0c0d", borderBottom: "1px solid rgba(255,255,255,.07)", position: "sticky", top: 0, zIndex: 100 },
  brand: { display: "flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700 },
  mark: { width: 28, height: 28, borderRadius: 8, display: "grid", placeItems: "center", background: "linear-gradient(135deg,#d7ff1f,#71ff00)", color: "#111", fontWeight: 950, fontSize: 13 },
  nav: { display: "flex", alignItems: "center", gap: 2 },
  wrap: { position: "relative" },
  link: { display: "block", color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "8px 12px", borderRadius: 8, whiteSpace: "nowrap" },
  actions: { display: "flex", alignItems: "center", gap: 8 },
  btn: { color: "rgba(255,255,255,.7)", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "7px 12px", borderRadius: 8, background: "rgba(255,255,255,.07)" },
  cta: { color: "#111", textDecoration: "none", fontSize: 13, fontWeight: 800, padding: "7px 14px", borderRadius: 8, background: "#d7ff1f" },
  avatar: { width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#d7ff1f,#71ff00)", color: "#111", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 13, cursor: "pointer" },
};
