"use client";

import { useState, type CSSProperties } from "react";

const categories = ["All", "Professional", "Enhance & Style", "Face & Identity", "Video Editing", "Ads & Products", "Games & Characters", "Extras", "Trending Templates"];

const apps = [
  { icon: "🎬", name: "Cinema Studio", desc: "Professional filmmaking workspace", category: "Professional" },
  { icon: "📸", name: "Lumenfield Soul", desc: "Photorealistic image generation", category: "Face & Identity" },
  { icon: "🎥", name: "AI Video", desc: "Create cinematic clips and ads", category: "Video Editing" },
  { icon: "🗣️", name: "Lip Sync Studio", desc: "Talking avatars and lipsync", category: "Video Editing" },
  { icon: "🎨", name: "Canvas", desc: "Advanced image editing", category: "Enhance & Style" },
  { icon: "📱", name: "UGC Factory", desc: "Social-ready UGC ads", category: "Ads & Products" },
  { icon: "👗", name: "Virtual Try-On", desc: "Put products on models", category: "Ads & Products" },
  { icon: "🖌️", name: "Motion Design", desc: "Clean motion graphics", category: "Professional" },
  { icon: "🎵", name: "AI Meme Generator", desc: "Create viral meme concepts", category: "Trending Templates" },
  { icon: "🖼️", name: "Background Remover", desc: "Clean product cutouts", category: "Enhance & Style" },
  { icon: "🔥", name: "On Fire", desc: "Trend-ready transformation", category: "Trending Templates" },
  { icon: "⭐", name: "Idol", desc: "Music video style moment", category: "Trending Templates" },
];

export default function AppsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleApps = activeCategory === "All" ? apps : apps.filter((app) => app.category === activeCategory);

  return (
    <main style={styles.shell}>
      <section style={styles.header}>
        <div style={styles.badge}>📱 Apps</div>
        <h1 style={styles.title}>Lumenfield AI Studio Apps</h1>
        <p style={styles.subtitle}>One-click AI tools for ads, products, characters, videos, and social content.</p>
      </section>

      <section style={styles.filters}>
        {categories.map((category) => (
          <button key={category} style={activeCategory === category ? styles.filterActive : styles.filter} onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </section>

      <section style={styles.grid}>
        {visibleApps.map((app) => (
          <article key={app.name} style={styles.card}>
            <div style={styles.icon}>{app.icon}</div>
            <h2 style={styles.cardTitle}>{app.name}</h2>
            <p style={styles.cardDesc}>{app.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  shell: { minHeight: "100vh", background: "#0a0a0b", color: "#fff", padding: "72px 32px", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" },
  header: { maxWidth: 980, margin: "0 auto 28px" },
  badge: { display: "inline-flex", alignItems: "center", padding: "8px 14px", borderRadius: 999, background: "rgba(215,255,31,.12)", color: "#d7ff1f", border: "1px solid rgba(215,255,31,.24)", fontSize: 13, fontWeight: 800, marginBottom: 18 },
  title: { fontSize: "clamp(42px, 6vw, 72px)", letterSpacing: "-.06em", margin: 0, lineHeight: .95 },
  subtitle: { color: "rgba(255,255,255,.55)", fontSize: 18, maxWidth: 680, lineHeight: 1.55 },
  filters: { maxWidth: 980, margin: "0 auto 30px", display: "flex", gap: 8, flexWrap: "wrap" },
  filter: { border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.62)", borderRadius: 999, padding: "10px 14px", cursor: "pointer", fontWeight: 800 },
  filterActive: { border: "1px solid rgba(215,255,31,.35)", background: "rgba(215,255,31,.18)", color: "#d7ff1f", borderRadius: 999, padding: "10px 14px", cursor: "pointer", fontWeight: 900 },
  grid: { maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 },
  card: { minHeight: 162, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.04)", borderRadius: 18, padding: 18, textAlign: "center", cursor: "pointer" },
  icon: { width: 56, height: 56, borderRadius: 16, margin: "0 auto 13px", display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(215,255,31,.22), rgba(113,255,0,.08))", fontSize: 27 },
  cardTitle: { fontSize: 14, margin: "0 0 6px", color: "#fff" },
  cardDesc: { fontSize: 12, margin: 0, color: "rgba(255,255,255,.45)", lineHeight: 1.4 },
};
