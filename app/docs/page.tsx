import type { CSSProperties } from "react";

const endpoints = [
  ["GET", "/api/lumen/motions", "List camera motions and motion presets."],
  ["GET", "/api/lumen/soul-styles", "List reusable Soul visual styles."],
  ["GET", "/api/lumen/custom-references", "List saved characters, references and Soul IDs."],
  ["POST", "/api/lumen/soul", "Generate an image with a Soul style or character reference."],
  ["POST", "/api/lumen/generations", "Submit a general image generation job."],
  ["POST", "/api/lumen/generate-video", "Submit a video generation job."],
  ["POST", "/api/lumen/speak", "Create speech or speech-to-video output."],
  ["POST", "/api/lumen/files/upload-url", "Create a secure upload URL for input files."],
  ["POST", "/api/lumen/requests/{id}/cancel", "Cancel a running generation request."],
];

const liveEndpoints = [
  ["POST", "/api/studio-generate", "Main server-side generation route used by Lumenfield AI Studio."],
  ["POST", "/api/fal/image", "Image generation route."],
  ["POST", "/api/fal/video", "Video generation route."],
];

const models = ["nano-banana", "flux-dev", "flux-dev-lora", "flux-kontext-dev-t2i", "hidream-i1-fast", "hidream-i1-full", "bytedance-seedream-v3", "bytedance-seedream-v4", "flux-pulid", "flux-pro-kontext-max", "soul-standard", "minimax-image-01", "flux-2-klein-4b", "flux-2-klein-9b", "z-image-base"];

export default function DocsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#070707", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "92px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, alignItems: "start" }}>
          <aside style={{ position: "sticky", top: 24, padding: 18, borderRadius: 18, background: "#101010", border: "1px solid #222" }}>
            {["Quickstart", "Authentication", "Live Endpoints", "Planned Lumen API", "Models", "Upload Flow", "Polling & Webhooks"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} style={{ display: "block", color: "#aaa", textDecoration: "none", padding: "9px 8px", borderRadius: 10, fontWeight: 800, fontSize: 13 }}>{item}</a>
            ))}
          </aside>

          <div>
            <p style={{ display: "inline-flex", color: "#ff4da6", border: "1px solid rgba(255,77,166,.25)", background: "rgba(255,77,166,.1)", borderRadius: 999, padding: "7px 11px", fontWeight: 900, fontSize: 12 }}>Lumenfield AI Studio Developer Docs</p>
            <h1 style={{ fontSize: "clamp(44px, 7vw, 86px)", letterSpacing: "-.06em", lineHeight: .92, margin: "22px 0 16px" }}>Build creative generation workflows.</h1>
            <p style={{ color: "rgba(255,255,255,.64)", fontSize: 18, lineHeight: 1.65, maxWidth: 760 }}>This documentation describes the Lumenfield AI Studio API shape for image, video, Soul styles, uploads, polling, cancellation and webhooks.</p>

            <section id="quickstart" style={sectionStyle}><h2 style={h2Style}>Quickstart</h2><pre style={codeStyle}>{`await fetch("/api/studio-generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    mode: "video",
    prompt: "A cinematic product shot, dolly in, neon lighting",
    params: { duration: "5", aspect_ratio: "16:9", resolution: "720p" }
  })
});`}</pre></section>
            <section id="authentication" style={sectionStyle}><h2 style={h2Style}>Authentication</h2><p style={pStyle}>Secrets must stay server-side in Vercel Environment Variables. Public client components should call internal Lumenfield AI Studio routes only.</p><pre style={codeStyle}>{`FAL_KEY=server-side-only
LUMEN_API_KEY=optional-future-key
LUMEN_API_SECRET=optional-future-secret`}</pre></section>
            <section id="live-endpoints" style={sectionStyle}><h2 style={h2Style}>Live Endpoints</h2><div style={tableStyle}>{liveEndpoints.map(([method, path, desc]) => <EndpointRow key={path} method={method} path={path} desc={desc} />)}</div></section>
            <section id="planned-lumen-api" style={sectionStyle}><h2 style={h2Style}>Planned Lumen API</h2><p style={pStyle}>These routes mirror the product architecture we want without exposing third-party platform secrets or hardcoding external accounts.</p><div style={tableStyle}>{endpoints.map(([method, path, desc]) => <EndpointRow key={path} method={method} path={path} desc={desc} />)}</div></section>
            <section id="models" style={sectionStyle}><h2 style={h2Style}>Models</h2><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{models.map((model) => <span key={model} style={{ border: "1px solid #2a2a2a", background: "#121212", color: "#ddd", borderRadius: 999, padding: "8px 12px", fontWeight: 850, fontSize: 13 }}>{model}</span>)}</div></section>
            <section id="upload-flow" style={sectionStyle}><h2 style={h2Style}>Upload Flow</h2><pre style={codeStyle}>{`1. POST /api/lumen/files/upload-url
2. PUT file bytes to the returned signed URL
3. Pass uploaded file URL into a generation request
4. Store result URL in project history`}</pre></section>
            <section id="polling-and-webhooks" style={sectionStyle}><h2 style={h2Style}>Polling & Webhooks</h2><p style={pStyle}>The current FAL integration uses server-side subscribe behavior. Future queue routes can expose request IDs, status polling, cancellation and signed webhooks.</p><pre style={codeStyle}>{`POST /api/lumen/generations?webhook=https://your-app.com/api/webhooks/lumen
GET  /api/lumen/requests/{id}/status
POST /api/lumen/requests/{id}/cancel`}</pre></section>
          </div>
        </div>
      </section>
    </main>
  );
}

function EndpointRow({ method, path, desc }: { method: string; path: string; desc: string }) {
  return <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 14, padding: "14px 0", borderBottom: "1px solid #202020" }}><span style={{ color: method === "GET" ? "#7dd3fc" : "#d7ff1f", fontWeight: 950 }}>{method}</span><div><code style={{ color: "#fff", fontWeight: 850 }}>{path}</code><p style={{ margin: "6px 0 0", color: "#8e8e94", lineHeight: 1.5 }}>{desc}</p></div></div>;
}

const sectionStyle: CSSProperties = { marginTop: 42, padding: 24, borderRadius: 22, background: "linear-gradient(135deg, #101010, #0b0b0b)", border: "1px solid #222" };
const h2Style: CSSProperties = { margin: "0 0 14px", fontSize: 28, letterSpacing: "-.03em" };
const pStyle: CSSProperties = { color: "#9c9ca3", lineHeight: 1.65, margin: "0 0 14px" };
const codeStyle: CSSProperties = { whiteSpace: "pre-wrap", background: "#050505", border: "1px solid #1e1e1e", borderRadius: 14, padding: 18, color: "#d7ff1f", overflowX: "auto", lineHeight: 1.55 };
const tableStyle: CSSProperties = { border: "1px solid #222", borderRadius: 16, padding: "4px 18px", background: "#090909" };
