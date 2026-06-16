// =============================================================================
// LUMENFIELD — CINEMA STUDIO  (src/app/generate/page.tsx)
// =============================================================================
// Higgsfield /generate ekranının birebir kuzeni:
// • Sol menü: Home / My Elements / My Favorites / Community Feed / Projects
// • Kanvas + "YOUR FIRST PROJECT. THE IMPOSSIBLE." hero
// • Alt üretim çubuğu: Image/Video geçişi, model seçici, 16:9, 1080p, süre, GENERATE
// • Model açılır menü: Cinematic models + Featured models (rozet/etiketli)
// • Görünümler: /generate?view=elements  ve  /generate?view=favorites
// • GENERATE → /api/studio-generate (seçilen modeli gerçekten çağırır)
// =============================================================================

"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getModel, computeCost } from "@/lib/models";

type MenuModel = {
  id: string;        // gösterim id'si
  name: string;
  tag?: "NEW" | "EXCLUSIVE" | "TOP";
  badges?: string[];
  desc?: string;
  engine?: string;   // models.ts'teki gerçek id (yoksa id'nin kendisi)
};

// --- VIDEO modelleri (ekran görüntüsündeki gibi) ---
const VIDEO_CINEMATIC: MenuModel[] = [
  { id: "cs35", name: "Cinema Studio 3.5", tag: "NEW", desc: "Camera selection, style presets, and AI director", engine: "seedance-2" },
  { id: "cs30", name: "Cinema Studio 3.0", desc: "Enhanced camera and speed ramp control", engine: "kling-3" },
  { id: "cs25", name: "Cinema Studio 2.5", desc: "Camera movements with start frame", engine: "seedance-1-5-pro" },
];
const VIDEO_FEATURED: MenuModel[] = [
  { id: "seedance-2", name: "Seedance 2.0", tag: "NEW", badges: ["720p", "4s-15s"] },
  { id: "seedance-2-fast", name: "Seedance 2.0 Fast", tag: "NEW", badges: ["720p", "4s-15s"], engine: "seedance-2" },
  { id: "kling-3", name: "Kling 3.0", tag: "EXCLUSIVE", badges: ["4K", "3s-15s"] },
  { id: "kling-motion", name: "Kling 3.0 Motion Control", badges: ["1080p", "3s-30s"], engine: "kling-3" },
  { id: "happyhorse", name: "HappyHorse", tag: "NEW", badges: ["1080p", "3s-15s"] },
];

// --- IMAGE modelleri ---
const IMAGE_FEATURED: MenuModel[] = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", tag: "TOP", badges: ["4K"] },
  { id: "flux-2", name: "FLUX.2", badges: ["HD"] },
  { id: "gpt-image-2", name: "GPT Image 2", badges: ["4K"] },
  { id: "seedream-5-lite", name: "Seedream 5.0" },
  { id: "recraft", name: "Recraft V4.1" },
  { id: "grok-image", name: "Grok Imagine" },
];

function StudioInner() {
  const params = useSearchParams();
  const view = params.get("view"); // "elements" | "favorites" | null
  const initialModel = params.get("model");

  const [mode, setMode] = useState<"image" | "video">("video");
  const [selected, setSelected] = useState<MenuModel>(VIDEO_CINEMATIC[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState(4);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; type: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const engineId = selected.engine ?? selected.id;
  const engineModel = getModel(engineId);
  const cost = engineModel ? computeCost(engineModel, { duration }) : 8;

  function switchMode(m: "image" | "video") {
    setMode(m);
    setSelected(m === "video" ? VIDEO_CINEMATIC[0] : IMAGE_FEATURED[0]);
  }

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/studio-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: engineId,
          prompt,
          params: { aspect_ratio: aspect, duration },
        }),
      });
      const data = await res.json();
      if (data.url) setResult({ url: data.url, type: data.type });
      else setError(data.error ?? "Üretim başarısız");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "İstek başarısız");
    } finally {
      setLoading(false);
    }
  }

  const groups =
    mode === "video"
      ? [{ title: "Cinematic models", items: VIDEO_CINEMATIC }, { title: "Featured models", items: VIDEO_FEATURED }]
      : [{ title: "Featured models", items: IMAGE_FEATURED }];

  return (
    <div className="cs-root">
      <style>{`
        .cs-root{position:fixed;inset:0;display:flex;background:#0a0b0d;color:#e8e8e8;font-family:system-ui,sans-serif;overflow:hidden}
        .cs-side{width:240px;flex:none;background:#0d0e10;border-right:1px solid #1a1c20;display:flex;flex-direction:column;padding:14px 12px}
        .cs-brand{display:flex;align-items:center;justify-content:space-between;background:#16181c;border:1px solid #23262b;border-radius:10px;padding:9px 12px;font-weight:600;font-size:14px;margin-bottom:18px}
        .cs-navitem{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:9px;color:#cfcfcf;text-decoration:none;font-size:14px;cursor:pointer}
        .cs-navitem:hover{background:#16181c}
        .cs-navitem.active{background:#16181c;color:#fff}
        .cs-navicon{width:20px;height:20px;border-radius:6px;background:#23262b;display:flex;align-items:center;justify-content:center;font-size:12px}
        .cs-seclabel{font-size:12px;color:#6b7078;margin:18px 8px 8px;display:flex;justify-content:space-between;align-items:center}
        .cs-spacer{flex:1}
        .cs-pricing{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:9px;color:#ddd;text-decoration:none;font-size:14px}
        .cs-off{font-size:10px;background:#e0226e;color:#fff;padding:2px 7px;border-radius:20px;font-weight:700}
        .cs-main{flex:1;position:relative;background:#0a0b0d;background-image:linear-gradient(#101216 1px,transparent 1px),linear-gradient(90deg,#101216 1px,transparent 1px);background-size:40px 40px;overflow:hidden}
        .cs-top{position:absolute;top:16px;right:20px;display:flex;gap:10px;z-index:5}
        .cs-login{background:none;border:none;color:#ddd;font-size:14px;padding:8px 14px;border-radius:9px;cursor:pointer;text-decoration:none}
        .cs-signup{background:#d8f000;color:#111;border:none;font-weight:700;font-size:14px;padding:8px 16px;border-radius:9px;cursor:pointer;text-decoration:none}
        .cs-hero{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none}
        .cs-hero h1{font-size:54px;font-weight:800;line-height:1.05;margin:0;color:#e8e8e8}
        .cs-hero h1 .y{color:#d8f000}
        .cs-result{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:40px}
        .cs-result img,.cs-result video{max-width:80%;max-height:70%;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
        .cs-loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:16px;color:#d8f000}
        /* alt üretim çubuğu */
        .cs-dock{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);display:flex;gap:10px;align-items:flex-end;z-index:10}
        .cs-modetoggle{display:flex;flex-direction:column;gap:6px}
        .cs-modebtn{width:60px;background:#16181c;border:1px solid #23262b;border-radius:12px;padding:10px 0;text-align:center;color:#9aa0a8;font-size:11px;cursor:pointer}
        .cs-modebtn.active{background:#1f2329;color:#fff;border-color:#3a3f47}
        .cs-bar{background:#16181c;border:1px solid #23262b;border-radius:16px;padding:10px;display:flex;flex-direction:column;gap:10px;width:880px;max-width:78vw}
        .cs-promptrow{display:flex;align-items:center;gap:8px}
        .cs-prompt{flex:1;background:#0e0f11;border:1px solid #23262b;border-radius:10px;padding:11px 13px;color:#fff;font-size:14px;outline:none}
        .cs-controls{display:flex;align-items:center;gap:7px;flex-wrap:wrap}
        .cs-pill{display:flex;align-items:center;gap:6px;background:#0e0f11;border:1px solid #23262b;border-radius:9px;padding:7px 11px;color:#dcdcdc;font-size:13px;cursor:pointer}
        .cs-pill.model{color:#fff}
        .cs-pill .dot{color:#d8f000}
        .cs-count{display:flex;align-items:center;gap:9px;background:#0e0f11;border:1px solid #23262b;border-radius:9px;padding:5px 9px;font-size:13px}
        .cs-count button{background:none;border:none;color:#aaa;font-size:15px;cursor:pointer}
        .cs-frame{background:#0e0f11;border:1px dashed #2c3037;border-radius:11px;padding:8px 14px;text-align:center;color:#9aa0a8;font-size:11px;line-height:1.3;cursor:pointer}
        .cs-gen{background:#d8f000;color:#111;border:none;border-radius:12px;padding:0 26px;font-weight:800;font-size:14px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:58px}
        .cs-gen:disabled{opacity:.6;cursor:default}
        .cs-gen .cost{font-size:12px;font-weight:600;margin-top:2px}
        /* model dropdown */
        .cs-menu{position:absolute;bottom:74px;left:0;width:340px;max-height:440px;overflow-y:auto;background:#1a1d21;border:1px solid #2a2e34;border-radius:14px;padding:10px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
        .cs-search{width:100%;background:#0e0f11;border:1px solid #23262b;border-radius:9px;padding:9px 12px;color:#fff;font-size:13px;outline:none;margin-bottom:8px;box-sizing:border-box}
        .cs-grouptitle{font-size:12px;color:#7a8088;padding:8px 8px 4px;display:flex;align-items:center;gap:6px}
        .cs-mrow{display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;cursor:pointer}
        .cs-mrow:hover{background:#23262b}
        .cs-mrow.sel{background:#22251f;border:1px solid #4a5a14}
        .cs-mico{width:34px;height:34px;flex:none;border-radius:8px;background:#2a2e34;display:flex;align-items:center;justify-content:center;font-size:13px}
        .cs-mname{font-size:13.5px;font-weight:600;color:#fff;display:flex;align-items:center;gap:7px}
        .cs-mdesc{font-size:11.5px;color:#8b9097;margin-top:1px}
        .cs-badge{font-size:9px;font-weight:700;padding:1px 6px;border-radius:5px}
        .cs-badge.NEW{background:#d8f000;color:#111}
        .cs-badge.EXCLUSIVE{background:#7c4dff;color:#fff}
        .cs-badge.TOP{background:#1f9cf0;color:#fff}
        .cs-spec{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:#9aa0a8;background:#0e0f11;border-radius:5px;padding:2px 6px;margin-right:5px;margin-top:4px}
        .cs-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#9aa0a8;gap:10px}
        .cs-empty h2{color:#fff;font-size:22px;margin:0}
        .cs-empty button{background:#d8f000;color:#111;border:none;border-radius:10px;padding:10px 18px;font-weight:700;cursor:pointer;margin-top:6px}
      `}</style>

      {/* SOL MENÜ */}
      <aside className="cs-side">
        <div className="cs-brand"><span>≋ Cinema Studio</span><span>⌄</span></div>
        <Link href="/generate" className={`cs-navitem ${!view ? "active" : ""}`}><span className="cs-navicon">⌂</span> Home</Link>
        <Link href="/generate?view=elements" className={`cs-navitem ${view === "elements" ? "active" : ""}`}><span className="cs-navicon">@</span> My Elements</Link>
        <Link href="/generate?view=favorites" className={`cs-navitem ${view === "favorites" ? "active" : ""}`}><span className="cs-navicon">♥</span> My Favorites</Link>
        <Link href="#" className="cs-navitem"><span className="cs-navicon">◷</span> Community Feed</Link>
        <div className="cs-seclabel"><span>Projects</span><span>＋</span></div>
        <Link href="#" className="cs-navitem"><span className="cs-navicon">＋</span> New project</Link>
        <div className="cs-spacer" />
        <Link href="/pricing" className="cs-pricing">♦ Pricing <span className="cs-off">30% OFF</span></Link>
        <Link href="#auth" className="cs-navitem"><span className="cs-navicon">→</span> Log in</Link>
      </aside>

      {/* ANA ALAN */}
      <main className="cs-main">
        <div className="cs-top">
          <Link href="#auth" className="cs-login">Login</Link>
          <Link href="#auth" className="cs-signup">Sign up</Link>
        </div>

        {view === "elements" ? (
          <div className="cs-empty">
            <div style={{ fontSize: 40 }}>@</div>
            <h2>My Elements</h2>
            <p>Henüz element yok. Tekrar kullanılabilir karakter, mekan ve prop oluştur.</p>
            <button>Create element</button>
          </div>
        ) : view === "favorites" ? (
          <div className="cs-empty">
            <div style={{ fontSize: 40 }}>♥</div>
            <h2>My Favorites</h2>
            <p>Henüz favori yok. Beğendiğin üretimleri buraya kaydet.</p>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="cs-loading">Üretiliyor…</div>
            ) : result ? (
              <div className="cs-result">
                {result.type === "video" ? (
                  <video src={result.url} controls autoPlay loop />
                ) : (
                  <img src={result.url} alt="üretilen" />
                )}
              </div>
            ) : (
              <div className="cs-hero">
                <h1>YOUR FIRST PROJECT.<br /><span className="y">THE IMPOSSIBLE.</span></h1>
              </div>
            )}

            {error && (
              <div style={{ position: "absolute", bottom: 110, left: "50%", transform: "translateX(-50%)", color: "#ff6b6b", fontSize: 13 }}>
                {error}
              </div>
            )}

            {/* ALT ÜRETİM ÇUBUĞU */}
            <div className="cs-dock">
              <div className="cs-modetoggle">
                <div className={`cs-modebtn ${mode === "image" ? "active" : ""}`} onClick={() => switchMode("image")}>▢<br />Image</div>
                <div className={`cs-modebtn ${mode === "video" ? "active" : ""}`} onClick={() => switchMode("video")}>▷<br />Video</div>
              </div>

              <div className="cs-bar" style={{ position: "relative" }}>
                <div className="cs-promptrow">
                  <input
                    className="cs-prompt"
                    placeholder="Describe your shot…"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generate()}
                  />
                </div>

                <div className="cs-controls">
                  <span className="cs-pill">＋</span>
                  <span className="cs-pill model" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="dot">≋</span> {selected.name} ▾
                  </span>
                  <span className="cs-pill" onClick={() => setAspect(aspect === "16:9" ? "9:16" : aspect === "9:16" ? "1:1" : "16:9")}>▭ {aspect}</span>
                  <span className="cs-pill" onClick={() => setResolution(resolution === "1080p" ? "4K" : resolution === "4K" ? "720p" : "1080p")}>◇ {resolution}</span>
                  <span className="cs-count"><button onClick={() => {}}>−</button> 1/4 <button onClick={() => {}}>＋</button></span>
                  {mode === "video" && (
                    <>
                      <span className="cs-pill">Speed ramp · Auto</span>
                      <span className="cs-pill" onClick={() => setDuration(duration >= 15 ? 4 : duration + 1)}>⏱ {duration}s</span>
                      <span className="cs-frame">＋<br />START FRAME</span>
                      <span className="cs-frame">＋ Optional<br />END FRAME</span>
                    </>
                  )}
                  <button className="cs-gen" onClick={generate} disabled={loading || !prompt.trim()}>
                    GENERATE
                    <span className="cost">⚡ {cost}</span>
                  </button>
                </div>

                {/* MODEL AÇILIR MENÜ */}
                {menuOpen && (
                  <div className="cs-menu">
                    <input className="cs-search" placeholder="Search…" />
                    {groups.map((g) => (
                      <div key={g.title}>
                        <div className="cs-grouptitle">✦ {g.title}</div>
                        {g.items.map((m) => (
                          <div
                            key={m.id}
                            className={`cs-mrow ${selected.id === m.id ? "sel" : ""}`}
                            onClick={() => { setSelected(m); setMenuOpen(false); }}
                          >
                            <div className="cs-mico">≋</div>
                            <div style={{ flex: 1 }}>
                              <div className="cs-mname">
                                {m.name}
                                {m.tag && <span className={`cs-badge ${m.tag}`}>{m.tag}</span>}
                              </div>
                              {m.desc && <div className="cs-mdesc">{m.desc}</div>}
                              {m.badges && <div>{m.badges.map((b) => <span key={b} className="cs-spec">◷ {b}</span>)}</div>}
                            </div>
                            {selected.id === m.id && <span style={{ color: "#d8f000" }}>✓</span>}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "#fff", background: "#0a0b0d", minHeight: "100vh" }}>Yükleniyor…</div>}>
      <StudioInner />
    </Suspense>
  );
}
