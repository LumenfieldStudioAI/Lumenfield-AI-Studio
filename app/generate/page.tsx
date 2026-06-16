"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import { computeCost, getModel } from "@/lib/models";

type StudioMode = "image" | "video";
type MenuModel = {
  badges?: string[];
  desc?: string;
  engine?: string;
  id: string;
  name: string;
  tag?: "NEW" | "EXCLUSIVE" | "TOP";
};

const videoCinematic: MenuModel[] = [
  { id: "cs35", name: "Cinema Studio 3.5", tag: "NEW", desc: "Camera selection, style presets and AI director", engine: "seedance-2" },
  { id: "cs30", name: "Cinema Studio 3.0", desc: "Enhanced camera and speed ramp control", engine: "kling-3" },
  { id: "cs25", name: "Cinema Studio 2.5", desc: "Camera movements with start frame", engine: "seedance-1-5-pro" },
];

const videoFeatured: MenuModel[] = [
  { id: "seedance-2", name: "Seedance 2.0", tag: "NEW", badges: ["720p", "4s-15s"] },
  { id: "kling-3", name: "Kling 3.0", tag: "EXCLUSIVE", badges: ["4K", "3s-15s"] },
  { id: "veo-3-1", name: "Google Veo 3.1", badges: ["Sound", "8s"] },
  { id: "happyhorse", name: "HappyHorse", tag: "NEW", badges: ["1080p", "3s-15s"] },
  { id: "grok-video", name: "Grok Imagine 1.5", badges: ["Audio", "Cinematic"] },
  { id: "minimax-hailuo", name: "Minimax Hailuo 2.3", badges: ["Fast", "Dynamic"] },
];

const imageFeatured: MenuModel[] = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", tag: "TOP", badges: ["4K"] },
  { id: "flux-2", name: "FLUX.2", badges: ["HD"] },
  { id: "gpt-image-2", name: "GPT Image 2", badges: ["4K"] },
  { id: "seedream-5-lite", name: "Seedream 5.0 lite" },
  { id: "recraft", name: "Recraft V4.1" },
  { id: "grok-image", name: "Grok Imagine" },
];

function GenerateStudio() {
  const params = useSearchParams();
  const view = params.get("view");
  const urlModel = params.get("model");
  const initialImageModel = imageFeatured.find((model) => model.id === urlModel);
  const initialVideoModel = videoFeatured.find((model) => model.id === urlModel);

  const [mode, setMode] = useState<StudioMode>(initialImageModel ? "image" : "video");
  const [selected, setSelected] = useState<MenuModel>(
    initialImageModel ?? initialVideoModel ?? videoCinematic[0],
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState(4);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const engineId = selected.engine ?? selected.id;
  const engineModel = getModel(engineId);
  const cost = engineModel ? computeCost(engineModel, { duration }) : 8;
  const groups = useMemo(
    () =>
      mode === "video"
        ? [
            { items: videoCinematic, title: "Cinematic models" },
            { items: videoFeatured, title: "Featured models" },
          ]
        : [{ items: imageFeatured, title: "Featured models" }],
    [mode],
  );

  function switchMode(nextMode: StudioMode) {
    setMode(nextMode);
    setSelected(nextMode === "video" ? videoCinematic[0] : imageFeatured[0]);
    setMenuOpen(false);
  }

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/studio-generate", {
        body: JSON.stringify({
          modelId: engineId,
          params: { aspect_ratio: aspect, duration, resolution },
          prompt,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as {
        error?: string;
        type?: string;
        url?: string;
      };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Generation failed");
        return;
      }

      setResult({ type: data.type ?? mode, url: data.url });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cs-root">
      <aside className="cs-side">
        <div className="cs-brand">
          <span>Cinema Studio</span>
          <span>L</span>
        </div>
        <Link className={`cs-navitem ${!view ? "active" : ""}`} href="/generate">
          <span className="cs-navicon">H</span> Home
        </Link>
        <Link className={`cs-navitem ${view === "elements" ? "active" : ""}`} href="/generate?view=elements">
          <span className="cs-navicon">@</span> My Elements
        </Link>
        <Link className={`cs-navitem ${view === "favorites" ? "active" : ""}`} href="/generate?view=favorites">
          <span className="cs-navicon">*</span> My Favorites
        </Link>
        <Link className="cs-navitem" href="/apps">
          <span className="cs-navicon">A</span> Apps
        </Link>
        <div className="cs-seclabel">
          <span>Projects</span>
          <span>+</span>
        </div>
        <Link className="cs-navitem" href="/generate">
          <span className="cs-navicon">+</span> New project
        </Link>
        <div className="cs-spacer" />
        <Link className="cs-pricing" href="/#payments">
          Pricing <span className="cs-off">30% OFF</span>
        </Link>
        <Link className="cs-navitem" href="/#auth">
          <span className="cs-navicon">→</span> Log in
        </Link>
      </aside>

      <main className="cs-main">
        <div className="cs-top">
          <Link className="cs-login" href="/#auth">Login</Link>
          <Link className="cs-signup" href="/#auth">Sign up</Link>
        </div>

        {view === "elements" || view === "favorites" ? (
          <div className="cs-empty">
            <h1>{view === "elements" ? "My Elements" : "My Favorites"}</h1>
            <p>
              {view === "elements"
                ? "Create reusable characters, places and props for future generations."
                : "Save your best outputs here and reuse them as references."}
            </p>
            <Link href="/generate">Create new</Link>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="cs-loading">Generating...</div>
            ) : result ? (
              <div className="cs-result">
                {result.type === "video" ? (
                  <video autoPlay controls loop src={result.url} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="Generated result" src={result.url} />
                )}
              </div>
            ) : (
              <div className="cs-hero">
                <h1>
                  YOUR FIRST PROJECT.
                  <br />
                  <span>THE IMPOSSIBLE.</span>
                </h1>
              </div>
            )}

            {error ? <div className="cs-error">{error}</div> : null}

            <div className="cs-dock">
              <div className="cs-modetoggle">
                <button className={`cs-modebtn ${mode === "image" ? "active" : ""}`} onClick={() => switchMode("image")}>
                  Image
                </button>
                <button className={`cs-modebtn ${mode === "video" ? "active" : ""}`} onClick={() => switchMode("video")}>
                  Video
                </button>
              </div>

              <div className="cs-bar">
                <input
                  className="cs-prompt"
                  onChange={(event) => setPrompt(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") generate();
                  }}
                  placeholder="Describe your shot..."
                  value={prompt}
                />
                <div className="cs-controls">
                  <button className="cs-pill model" onClick={() => setMenuOpen(!menuOpen)}>
                    {selected.name} v
                  </button>
                  <button className="cs-pill" onClick={() => setAspect(aspect === "16:9" ? "9:16" : aspect === "9:16" ? "1:1" : "16:9")}>
                    {aspect}
                  </button>
                  <button className="cs-pill" onClick={() => setResolution(resolution === "1080p" ? "4K" : resolution === "4K" ? "720p" : "1080p")}>
                    {resolution}
                  </button>
                  {mode === "video" ? (
                    <button className="cs-pill" onClick={() => setDuration(duration >= 15 ? 4 : duration + 1)}>
                      {duration}s
                    </button>
                  ) : null}
                  <button className="cs-gen" disabled={loading || !prompt.trim()} onClick={generate}>
                    GENERATE <span>{cost} credits</span>
                  </button>
                </div>

                {menuOpen ? (
                  <div className="cs-menu">
                    {groups.map((group) => (
                      <div key={group.title}>
                        <p>{group.title}</p>
                        {group.items.map((model) => (
                          <button
                            className={`cs-mrow ${selected.id === model.id ? "sel" : ""}`}
                            key={model.id}
                            onClick={() => {
                              setSelected(model);
                              setMenuOpen(false);
                            }}
                          >
                            <span className="cs-mico">L</span>
                            <span>
                              <strong>
                                {model.name}
                                {model.tag ? <em>{model.tag}</em> : null}
                              </strong>
                              {model.desc ? <small>{model.desc}</small> : null}
                              {model.badges ? (
                                <span className="cs-specs">
                                  {model.badges.map((badge) => (
                                    <small key={badge}>{badge}</small>
                                  ))}
                                </span>
                              ) : null}
                            </span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
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
    <Suspense fallback={<div className="cs-root">Loading...</div>}>
      <GenerateStudio />
    </Suspense>
  );
}
