"use client";

import type { CSSProperties } from "react";
import LumenTopNav from "@/components/layout/LumenTopNav";
import { audioFeatures, audioModels, imageFeatures, imageModels, trendingTools, videoFeatures, videoModels, type LumenFeature, type LumenModel } from "@/lib/lumen/modelCatalog";

type StudioKind = "explore" | "image" | "video" | "audio" | "cinema" | "marketing" | "influencer" | "canvas";

type LumenStudioPageProps = {
  kind: StudioKind;
};

const copy: Record<StudioKind, { eyebrow: string; title: string; desc: string; prompt: string; accent: string }> = {
  explore: { eyebrow: "Explore", title: "Discover every Lumenfield AI Studio workflow", desc: "Browse models, products, apps, agents and creative workflows from one marketplace.", prompt: "Search models, products, characters, apps...", accent: "#d7ff1f" },
  image: { eyebrow: "Image Studio", title: "Create production-ready images", desc: "Generate product shots, ads, characters, fashion campaigns and cinematic frames.", prompt: "A cinematic product photo of a luxury perfume bottle...", accent: "#ff4da6" },
  video: { eyebrow: "Video Studio", title: "Direct cinematic AI videos", desc: "Use Seedance, Kling, Sora, Veo, Runway, Pika and Luma-style workflows in one place.", prompt: "A slow dolly shot of a futuristic perfume ad, neon lighting...", accent: "#71ff00" },
  audio: { eyebrow: "Audio Studio", title: "Give your scene a voice", desc: "Voiceover, dubbing, music prompts, sound effects and lip-sync audio workflows.", prompt: "A confident female voiceover for a luxury fashion campaign...", accent: "#8be7ff" },
  cinema: { eyebrow: "Cinema Studio", title: "Build film-grade visual scenes", desc: "Plan shots, choose models, control motion, generate frames and clips for campaigns.", prompt: "A dramatic car commercial in the rain, 35mm lens, slow motion...", accent: "#d7ff1f" },
  marketing: { eyebrow: "Marketing Studio", title: "Turn products into ads", desc: "Create DTC ads, product shots, hooks, UGC scripts and marketplace-ready creative packs.", prompt: "Create a viral TikTok ad for a skincare serum...", accent: "#ffb000" },
  influencer: { eyebrow: "AI Influencer Studio", title: "Create consistent AI creators", desc: "Build characters, campaigns, avatars, product placements and social content at scale.", prompt: "Create a consistent fashion influencer for a streetwear brand...", accent: "#ff4da6" },
  canvas: { eyebrow: "Canvas", title: "Plan, remix and generate on one board", desc: "Collect references, build moodboards, route prompts and create multi-step AI workflows.", prompt: "Build a moodboard for a cinematic sneaker campaign...", accent: "#c7a6ff" },
};

function getData(kind: StudioKind): { features: LumenFeature[]; models: LumenModel[] } {
  if (kind === "image") return { features: imageFeatures, models: imageModels };
  if (kind === "audio") return { features: audioFeatures, models: audioModels };
  if (kind === "marketing" || kind === "influencer") return { features: [...imageFeatures.slice(0, 6), ...videoFeatures.slice(0, 4)], models: [...imageModels.slice(0, 6), ...videoModels.slice(0, 4)] };
  if (kind === "explore" || kind === "canvas") return { features: trendingTools, models: [...imageModels.slice(0, 5), ...videoModels.slice(0, 5), ...audioModels.slice(0, 3)] };
  return { features: videoFeatures, models: videoModels };
}

function Card({ item }: { item: LumenFeature | LumenModel }) {
  const title = "name" in item ? item.name : item.title;
  return (
    <article style={styles.card}>
      <div style={styles.cardIcon}>{item.icon}</div>
      <div><h3 style={styles.cardTitle}>{title}</h3><p style={styles.cardDesc}>{item.desc}</p>{item.badge && <span style={styles.badge}>{item.badge}</span>}</div>
    </article>
  );
}

export default function LumenStudioPage({ kind }: LumenStudioPageProps) {
  const data = copy[kind];
  const { features, models } = getData(kind);

  return (
    <main style={styles.page}>
      <LumenTopNav />
      <section style={{ ...styles.hero, background: `radial-gradient(circle at 50% 100%, ${data.accent} 0%, rgba(40,44,25,.94) 30%, #111113 72%)` }}>
        <div style={styles.heroGlow} />
        <p style={styles.eyebrow}>{data.eyebrow}</p>
        <h1 style={styles.title}>{data.title}</h1>
        <p style={styles.desc}>{data.desc}</p>
        <div style={styles.promptBox}>
          <span style={styles.plus}>+</span>
          <input style={styles.input} placeholder={data.prompt} />
          <button style={styles.ask}>Generate</button>
        </div>
        <div style={styles.quickLinks}>
          <span>Task queued</span>
          <a href="/cinema-studio" style={styles.quickLink}>Cinema Studio</a>
          <a href="/marketing-studio/product" style={styles.quickLink}>Marketing Studio</a>
          <a href="/audio" style={styles.quickLink}>Audio Studio</a>
          <span>3 agents activated</span>
        </div>
      </section>
      <section style={styles.body}>
        <div style={styles.sectionHead}><div><h2 style={styles.h2}>Features</h2><p style={styles.muted}>Fast access to the workflows you asked for.</p></div><button style={styles.browse}>Browse all</button></div>
        <div style={styles.grid}>{features.map((item) => <Card key={item.title} item={item} />)}</div>
        <div style={styles.sectionHead}><div><h2 style={styles.h2}>AI Models</h2><p style={styles.muted}>Image, video and audio models inside Lumenfield AI Studio.</p></div></div>
        <div style={styles.grid}>{models.map((item) => <Card key={item.name} item={item} />)}</div>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#101012", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" },
  hero: { position: "relative", overflow: "hidden", minHeight: 560, display: "grid", placeItems: "center", alignContent: "center", textAlign: "center", padding: "96px 22px 70px", borderBottom: "1px solid rgba(255,255,255,.08)" },
  heroGlow: { position: "absolute", inset: 0, opacity: .14, backgroundImage: "radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "13px 13px" },
  eyebrow: { position: "relative", margin: 0, color: "#d7ff1f", fontWeight: 950, textTransform: "uppercase", letterSpacing: ".16em" },
  title: { position: "relative", width: "min(980px, 100%)", margin: "18px auto 0", fontSize: "clamp(42px, 7vw, 92px)", lineHeight: .88, letterSpacing: "-.07em" },
  desc: { position: "relative", width: "min(690px, 100%)", margin: "22px auto 0", color: "rgba(255,255,255,.68)", fontSize: 18, lineHeight: 1.45, fontWeight: 700 },
  promptBox: { position: "relative", width: "min(880px, 94vw)", minHeight: 76, margin: "34px auto 12px", display: "grid", gridTemplateColumns: "42px 1fr auto", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 28, background: "#1d1d1c", border: "2px solid rgba(255,255,255,.14)", boxShadow: "0 22px 70px rgba(0,0,0,.5)" },
  plus: { width: 38, height: 38, borderRadius: 999, display: "grid", placeItems: "center", background: "#303030", color: "#fff", fontWeight: 950 },
  input: { width: "100%", border: 0, outline: 0, background: "transparent", color: "#fff", fontSize: 16, fontWeight: 800 },
  ask: { border: 0, borderRadius: 999, padding: "13px 18px", background: "#d7ff1f", color: "#111", fontWeight: 950 },
  quickLinks: { position: "relative", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, color: "rgba(255,255,255,.62)", fontSize: 13, fontWeight: 800 },
  quickLink: { color: "#d7ff1f", textDecoration: "none" },
  body: { width: "min(1180px, calc(100% - 32px))", margin: "0 auto", padding: "42px 0 80px" },
  sectionHead: { margin: "10px 0 18px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16 },
  h2: { margin: 0, fontSize: 26 },
  muted: { margin: "8px 0 0", color: "rgba(255,255,255,.48)" },
  browse: { border: 0, borderRadius: 999, background: "#222", color: "#ddd", padding: "10px 14px", fontWeight: 900 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14, marginBottom: 40 },
  card: { minHeight: 118, display: "grid", gridTemplateColumns: "54px 1fr", gap: 14, alignItems: "center", padding: 16, borderRadius: 22, background: "#1b1b1f", border: "1px solid rgba(255,255,255,.08)" },
  cardIcon: { width: 52, height: 52, display: "grid", placeItems: "center", borderRadius: 16, background: "rgba(255,255,255,.07)", color: "#fff", fontSize: 12, fontWeight: 950 },
  cardTitle: { margin: 0, fontSize: 16 },
  cardDesc: { margin: "6px 0 0", color: "rgba(255,255,255,.48)", fontSize: 13, lineHeight: 1.35 },
  badge: { display: "inline-block", marginTop: 8, borderRadius: 999, padding: "3px 7px", background: "#d7ff1f", color: "#111", fontSize: 10, fontWeight: 950 },
};
