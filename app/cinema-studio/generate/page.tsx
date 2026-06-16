"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

type StudioMode = "image" | "video";
type MenuModel = { badges?: string[]; desc?: string; engine?: string; id: string; name: string; tag?: "NEW" | "EXCLUSIVE" | "TOP" };

const videoCinematic: MenuModel[] = [
  { id: "cs35", name: "Cinema Studio 3.5", tag: "NEW", desc: "Camera selection, style presets and AI director", engine: "seedance-2" },
  { id: "cs30", name: "Cinema Studio 3.0", desc: "Enhanced camera and speed ramp control", engine: "kling-3" },
  { id: "cs25", name: "Cinema Studio 2.5", desc: "Camera movements with start frame", engine: "seedance-2-fast" },
];

const videoFeatured: MenuModel[] = [
  { id: "seedance-2", name: "Seedance 2.0", tag: "NEW", badges: ["720p", "4s-15s"] },
  { id: "seedance-2-fast", name: "Seedance 2.0 Fast", tag: "NEW", badges: ["720p", "fast"] },
  { id: "kling-3", name: "Kling 3.0", tag: "EXCLUSIVE", badges: ["4K", "3s-15s"] },
  { id: "kling-3-mc", name: "Kling 3.0 MC", badges: ["1080p", "motion"] },
  { id: "happyhorse", name: "HappyHorse", tag: "NEW", badges: ["1080p", "3s-15s"] },
];

const imageFeatured: MenuModel[] = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", tag: "TOP", badges: ["4K"] },
  { id: "gpt-image-2", name: "GPT Image 2", badges: ["4K"] },
  { id: "flux-2", name: "FLUX.2", badges: ["HD"] },
  { id: "recraft", name: "Recraft V4.1" },
  { id: "seedream-5-lite", name: "Seedream 5.0 Lite" },
];

const sideProjects = ["My Generations", "Long Video Exa...", "New folder", "Untitled", "Untitled", "New project", "Untitled", "New project"];
const aspects = ["16:9", "9:16", "1:1", "4:3", "21:9"];
const durations = [4, 5, 8, 10, 12, 15];

const css = `
.cs-root{display:flex;min-height:100vh;background:#0c0c0c;color:#fff;font-family:Inter,ui-sans-serif,system-ui,sans-serif;overflow:hidden}.cs-side{width:150px;min-height:100vh;border-right:1px solid #1f1f1f;background:#111214;display:flex;flex-direction:column;padding:10px}.cs-brand{display:flex;align-items:center;justify-content:space-between;background:#242528;border-radius:10px;padding:10px;font-size:12px;font-weight:900}.cs-nav{display:flex;flex-direction:column;gap:5px;margin-top:12px}.cs-nav a,.cs-project{display:flex;align-items:center;gap:8px;padding:9px 8px;border-radius:10px;color:#cfcfd2;text-decoration:none;font-size:12px;font-weight:800;background:transparent;border:0;text-align:left}.cs-nav a.active{background:#2a2b2f;color:#fff}.cs-label{margin:22px 4px 8px;color:#777;font-size:12px;font-weight:800;display:flex;justify-content:space-between}.cs-pricing{margin-top:auto;background:#242528;border-radius:12px;padding:11px 8px;color:#fff;text-decoration:none;font-size:12px;font-weight:900}.cs-off{margin-left:6px;background:#e8006f;border-radius:999px;padding:2px 6px;font-size:10px}.cs-main{flex:1;min-height:100vh;overflow:auto;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px;padding:44px 28px 96px}.cs-hero{text-align:center;max-width:980px;margin:0 auto}.cs-strip{display:flex;justify-content:center;align-items:end;margin-bottom:28px}.cs-thumb{width:150px;height:70px;border-radius:14px;background:linear-gradient(135deg,#333,#111);border:1px solid rgba(255,255,255,.1)}.cs-thumb.big{width:260px;height:105px;margin:0 -20px;background:linear-gradient(135deg,#555,#171717);box-shadow:0 22px 70px rgba(0,0,0,.45)}.cs-title{font-size:clamp(34px,5vw,54px);line-height:.98;font-weight:1000;letter-spacing:-.05em}.cs-title span{color:#ccff00}.cs-panel{max-width:780px;margin:30px auto 0;background:#202224;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:12px;box-shadow:0 26px 90px rgba(0,0,0,.5)}.cs-panel-top{display:flex;align-items:center;justify-content:space-between;color:#aaa;font-size:12px;margin:0 6px 10px}.cs-grid{display:grid;grid-template-columns:1fr 132px 132px 130px;gap:8px}.cs-prompt{min-height:74px;border:0;outline:none;resize:none;border-radius:18px;background:#303236;color:#fff;padding:15px;font-size:13px}.cs-box{border-radius:18px;background:#303236;padding:12px;text-align:left;font-size:13px}.cs-box p{margin:0 0 4px;color:#9a9a9a;font-size:12px}.cs-generate{border:0;border-radius:18px;background:#ccff00;color:#000;font-weight:1000;cursor:pointer}.cs-chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.cs-chip{background:#303236;border:1px solid rgba(255,255,255,.06);color:#fff;border-radius:12px;padding:8px 11px;font-size:12px;font-weight:800}.cs-select{background:transparent;border:0;color:#fff;font-weight:900;outline:none;max-width:130px}.cs-result{max-width:780px;margin:18px auto 0;background:#171819;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:14px;text-align:left}.cs-result img,.cs-result video{width:100%;max-height:520px;object-fit:contain;border-radius:16px;background:#000}.cs-error{color:#ff6b8a;font-size:13px;margin-top:12px}.cs-menu{max-width:780px;margin:16px auto 0;background:#191a1c;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:14px;text-align:left}.cs-menu-head{display:flex;gap:8px;margin-bottom:12px}.cs-mode{border:1px solid rgba(255,255,255,.1);background:#242528;color:#fff;border-radius:999px;padding:8px 13px;font-weight:900}.cs-mode.active{background:#ccff00;color:#000}.cs-menu-group{margin:14px 0 7px;color:#888;font-size:12px;font-weight:900;text-transform:uppercase}.cs-mrow{width:100%;display:flex;gap:12px;align-items:center;background:#242528;border:1px solid transparent;color:#fff;border-radius:14px;padding:12px;text-align:left;margin-bottom:7px;cursor:pointer}.cs-mrow.sel{border-color:#ccff00}.cs-mrow small{display:block;color:#aaa;margin-top:4px}.cs-tag{margin-left:8px;background:#e8006f;color:#fff;border-radius:6px;padding:2px 6px;font-size:10px}.cs-projects{max-width:1180px;margin:58px auto 0}.cs-project-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.cs-card{min-height:170px;background:#1d1f22;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:18px}.cs-card h3{font-size:14px;margin:0}.cs-card p{font-size:12px;color:#777}.cs-card-art{margin-top:18px;height:90px;border-radius:14px;background:linear-gradient(135deg,#34363a,#222)}@media(max-width:900px){.cs-root{display:block}.cs-side{position:relative;width:100%;min-height:auto}.cs-main{padding:28px 16px 90px}.cs-grid{grid-template-columns:1fr}.cs-project-grid{grid-template-columns:1fr}.cs-thumb{display:none}.cs-thumb.big{display:block;margin:0;width:230px}}
`;

function GenerateStudio() {
  const qs = useSearchParams();
  const urlModel = qs.get("model") ?? "";
  const initialImage = imageFeatured.find((m) => m.id === urlModel);
  const initialVideo = videoFeatured.find((m) => m.id === urlModel);
  const [mode, setMode] = useState<StudioMode>(initialImage ? "image" : "video");
  const [selected, setSelected] = useState<MenuModel>(initialImage ?? initialVideo ?? videoCinematic[0]);
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [duration, setDuration] = useState(12);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const engineId = selected.engine ?? selected.id;
  const cost = mode === "video" ? Math.max(8, duration * 6) : 8;
  const groups = useMemo(() => mode === "video" ? [{ title: "Cinematic models", items: videoCinematic }, { title: "Featured models", items: videoFeatured }] : [{ title: "Featured models", items: imageFeatured }], [mode]);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/studio-generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ modelId: engineId, prompt, params: { aspect_ratio: aspect, duration, resolution: "1080p" } }) });
      const data = await res.json() as { error?: string; type?: string; url?: string; imageUrl?: string; videoUrl?: string };
      const url = data.url ?? data.imageUrl ?? data.videoUrl;
      if (!res.ok || !url) throw new Error(data.error ?? "Generation failed");
      setResult({ type: data.type ?? mode, url });
    } catch (e) { setError(e instanceof Error ? e.message : "Request failed"); }
    finally { setLoading(false); }
  }

  return <><style dangerouslySetInnerHTML={{ __html: css }} /><div className="cs-root"><aside className="cs-side"><div className="cs-brand"><span>Cinema Studio</span><span>L</span></div><nav className="cs-nav"><Link className="active" href="/cinema-studio">⌂ Home</Link><Link href="/cinema-studio/generate">▦ My Generations</Link><Link href="/cinema-studio/generate?view=elements">◈ My Elements</Link><Link href="/cinema-studio/generate?view=favorites">♡ My Favorites</Link><Link href="/cinema-studio/generate">◉ Community Feed</Link></nav><div className="cs-label"><span>Projects</span><span>+</span></div>{sideProjects.map((p, i) => <button key={`${p}-${i}`} className="cs-project">⌁ <span>{p}</span></button>)}<Link href="/pricing" className="cs-pricing">Pricing <span className="cs-off">30% OFF</span></Link></aside><main className="cs-main"><section className="cs-hero"><div className="cs-strip"><div className="cs-thumb" /><div className="cs-thumb big" /><div className="cs-thumb" /></div><h1 className="cs-title">CREATE YOUR FIRST PROJECT.<br /><span>GENERATE THE IMPOSSIBLE.</span></h1><div className="cs-panel"><div className="cs-panel-top"><span>▦ Director Panel</span><span>{selected.name}</span></div><div className="cs-grid"><textarea className="cs-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your scene - use @ to add characters & locations" /><div className="cs-box"><p>Mode</p><b>{mode}</b></div><div className="cs-box"><p>Duration</p><b>{duration}s</b></div><button className="cs-generate" onClick={generate} disabled={loading || !prompt.trim()}>{loading ? "GENERATING..." : `GENERATE ✦${cost}`}</button></div><div className="cs-chips"><span className="cs-chip"><select className="cs-select" value={aspect} onChange={(e) => setAspect(e.target.value)}>{aspects.map((x) => <option key={x}>{x}</option>)}</select></span><span className="cs-chip"><select className="cs-select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>{durations.map((x) => <option key={x} value={x}>{x}s</option>)}</select></span><span className="cs-chip">1080p</span><span className="cs-chip">Start frame</span><span className="cs-chip">End frame</span></div>{error && <div className="cs-error">{error}</div>}</div><div className="cs-menu"><div className="cs-menu-head"><button className={`cs-mode${mode === "video" ? " active" : ""}`} onClick={() => { setMode("video"); setSelected(videoCinematic[0]); }}>Video</button><button className={`cs-mode${mode === "image" ? " active" : ""}`} onClick={() => { setMode("image"); setSelected(imageFeatured[0]); }}>Image</button></div>{groups.map((group) => <div key={group.title}><div className="cs-menu-group">{group.title}</div>{group.items.map((model) => <button key={model.id} className={`cs-mrow${selected.id === model.id ? " sel" : ""}`} onClick={() => setSelected(model)}><span>L</span><span><strong>{model.name}{model.tag && <em className="cs-tag">{model.tag}</em>}</strong>{model.desc && <small>{model.desc}</small>}{model.badges && <small>{model.badges.join(" · ")}</small>}</span></button>)}</div>)}</div>{result && <div className="cs-result"><b>Result</b>{result.type === "video" ? <video src={result.url} controls /> : <img src={result.url} alt="Generated result" />}<p><a href={result.url} target="_blank" rel="noreferrer" style={{ color: "#ccff00" }}>Open result</a></p></div>}</section><section className="cs-projects"><p style={{ color: "#999", marginBottom: 16 }}>My projects</p><div className="cs-project-grid">{sideProjects.slice(0, 8).map((p, i) => <div className="cs-card" key={`${p}-card-${i}`}><h3>{p}</h3><p>Last edited {i + 1}d ago · Private</p><div className="cs-card-art" /></div>)}</div></section></main></div></>;
}

export default function GeneratePage() {
  return <Suspense fallback={<div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "#0c0c0c", color: "#777" }}>Loading...</div>}><GenerateStudio /></Suspense>;
}
