"use client";

import { useState, useRef, useEffect } from "react";

type MediaMode = "Image" | "Video";
type AspectRatio = "16:9" | "9:16" | "1:1" | "4:3";
type Resolution = "720p" | "1080p" | "4K";
type Duration = "4s" | "8s" | "12s" | "16s";
type CameraMove = "Dolly in" | "Dolly out" | "Pan left" | "Pan right" | "Orbit" | "Static";
type SpeedRamp = "Normal" | "Slow-mo" | "Timelapse";

type Project = {
  id: string;
  name: string;
  lastEdited: string;
  privacy: "Private" | "Public";
  initials: string;
  color: string;
};

type GenerateResponse = {
  ok?: boolean;
  url?: string;
  imageUrl?: string;
  videoUrl?: string;
  type?: "image" | "video" | string;
  error?: string;
};

const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "Karanlik Hat - Pilot", lastEdited: "1d ago", privacy: "Private", initials: "KH", color: "#7C3AED" },
  { id: "2", name: "Mila's Fruit Train", lastEdited: "1d ago", privacy: "Private", initials: "MF", color: "#0EA5E9" },
  { id: "3", name: "Lumenfield Demo", lastEdited: "2d ago", privacy: "Private", initials: "LD", color: "#C8FF00" },
  { id: "4", name: "Forest Friends", lastEdited: "2d ago", privacy: "Private", initials: "FF", color: "#10B981" },
  { id: "5", name: "Untitled", lastEdited: "3d ago", privacy: "Private", initials: "U", color: "#6B7280" },
  { id: "6", name: "New project", lastEdited: "4d ago", privacy: "Private", initials: "NP", color: "#6B7280" },
];

const Icon = {
  Home: () => <span>⌂</span>,
  Grid: () => <span>▦</span>,
  Layers: () => <span>▱</span>,
  Heart: () => <span>♡</span>,
  Users: () => <span>♢</span>,
  Plus: () => <span>+</span>,
  ChevronDown: () => <span>⌄</span>,
  Zap: () => <span>⚡</span>,
  Camera: () => <span>▣</span>,
  Video: () => <span>▷</span>,
  Image: () => <span>▧</span>,
  Bell: () => <span>◌</span>,
  Settings: () => <span>⚙</span>,
};

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
      <span>{icon}</span>{label}
    </button>
  );
}

function Dropdown<T extends string>({ value, options, onChange, icon }: { value: T; options: T[]; onChange: (v: T) => void; icon?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white hover:bg-white/10">
        {icon}<span>{value}</span><Icon.ChevronDown />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-lg border border-white/10 bg-[#1A1A24] shadow-2xl">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} className={`w-full px-3 py-2 text-left text-xs ${opt === value ? "bg-[#C8FF00]/10 text-[#C8FF00]" : "text-gray-300 hover:bg-white/5"}`}>{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, isNew }: { project?: Project; isNew?: boolean }) {
  if (isNew) return <div className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111118] text-gray-500 hover:border-white/20 hover:text-white"><span className="text-3xl">+</span><span className="text-sm">New project</span></div>;
  if (!project) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111118] hover:border-white/20">
      <div className="grid aspect-video grid-cols-3 gap-0.5 bg-[#0D0D14] p-0.5">
        <div className="flex items-center justify-center rounded-sm" style={{ backgroundColor: `${project.color}22` }}><span className="text-sm font-bold" style={{ color: project.color }}>{project.initials}</span></div>
        {[...Array(5)].map((_, i) => <div key={i} className="rounded-sm bg-white/[0.03]" />)}
      </div>
      <div className="p-3"><p className="truncate text-sm font-medium text-white">{project.name}</p><p className="mt-0.5 text-xs text-gray-500">Last edited {project.lastEdited} · {project.privacy}</p></div>
    </div>
  );
}

function DirectorPanel() {
  const [mediaMode, setMediaMode] = useState<MediaMode>("Image");
  const [prompt, setPrompt] = useState("");
  const [cameraMove, setCameraMove] = useState<CameraMove>("Dolly in");
  const [speedRamp, setSpeedRamp] = useState<SpeedRamp>("Slow-mo");
  const [duration, setDuration] = useState<Duration>("12s");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [resolution, setResolution] = useState<Resolution>("1080p");
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [resultType, setResultType] = useState<"image" | "video" | "unknown">("unknown");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setResultUrl("");
    setError("");

    try {
      const response = await fetch("/api/studio-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          mode: mediaMode.toLowerCase(),
          model: mediaMode === "Video" ? "seedance-2" : "flux-dev",
          params: {
            duration: duration.replace("s", ""),
            aspect_ratio: aspectRatio,
            resolution,
            camera_move: cameraMove,
            speed_ramp: speedRamp,
          },
        }),
      });

      const data = (await response.json()) as GenerateResponse;
      if (!response.ok || data.error) throw new Error(data.error || "Generation failed");

      const mediaUrl = data.url || data.imageUrl || data.videoUrl || "";
      setResultUrl(mediaUrl);
      setResultType(data.type === "video" ? "video" : data.type === "image" ? "image" : mediaMode === "Video" ? "video" : "image");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex items-center justify-between rounded-t-xl border border-white/10 bg-[#13131C] px-4 py-2.5"><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-[#C8FF00]" /><span className="text-xs font-semibold tracking-wide text-white">DIRECTOR PANEL</span></div><div className="flex items-center gap-2"><Dropdown value={cameraMove} options={["Dolly in","Dolly out","Pan left","Pan right","Orbit","Static"]} onChange={setCameraMove} icon={<Icon.Camera />} /><Dropdown value={speedRamp} options={["Normal","Slow-mo","Timelapse"]} onChange={setSpeedRamp} /><Dropdown value={duration} options={["4s","8s","12s","16s"]} onChange={setDuration} /></div></div>
      <div className="border-x border-white/10 bg-[#0F0F18]"><div className="flex gap-1 px-4 pb-0 pt-3">{(["Image", "Video"] as MediaMode[]).map((mode) => <button key={mode} onClick={() => setMediaMode(mode)} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium ${mediaMode === mode ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}>{mode === "Image" ? <Icon.Image /> : <Icon.Video />}{mode}</button>)}</div><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe your scene - use @ to add characters and locations" rows={3} className="w-full resize-none bg-transparent px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none" /></div>
      <div className="flex items-center gap-2 rounded-b-xl border border-white/10 bg-[#0F0F18] px-4 py-2.5"><button className="p-1 text-gray-400 hover:text-white"><Icon.Plus /></button><div className="h-4 w-px bg-white/10" /><span className="rounded border border-[#C8FF00]/20 bg-[#C8FF00]/10 px-2 py-0.5 font-mono text-xs text-[#C8FF00]">LF Cinema 1.0</span><Dropdown value={aspectRatio} options={["16:9","9:16","1:1","4:3"]} onChange={setAspectRatio} /><Dropdown value={resolution} options={["720p","1080p","4K"]} onChange={setResolution} /><div className="ml-auto border-l border-white/10 pl-2 text-xs text-gray-500">72 credits</div><button className="rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white">START FRAME</button><button className="rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white">END FRAME</button><button onClick={handleGenerate} disabled={generating || !prompt.trim()} className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold ${generating || !prompt.trim() ? "cursor-not-allowed bg-gray-700 text-gray-500" : "bg-[#C8FF00] text-black shadow-[0_0_20px_rgba(200,255,0,0.3)] hover:bg-[#d4ff20]"}`}><Icon.Zap />{generating ? "GENERATING..." : "GENERATE"}</button></div>
      {error && <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
      {resultUrl && <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black">{resultType === "video" ? <video src={resultUrl} controls className="w-full" /> : <img src={resultUrl} alt="Generated result" className="w-full" />}</div>}
    </div>
  );
}

export default function StudioDashboard() {
  const [activeNav, setActiveNav] = useState("Home");
  const navItems = [{ label: "Home", icon: <Icon.Home /> }, { label: "My Generations", icon: <Icon.Grid /> }, { label: "My Elements", icon: <Icon.Layers /> }, { label: "My Favorites", icon: <Icon.Heart /> }, { label: "Community Feed", icon: <Icon.Users /> }];
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F] text-white">
      <aside className="flex w-52 shrink-0 flex-col border-r border-white/10 bg-[#0D0D15]"><div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-4"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C8FF00]"><span className="text-xs font-black text-black">L</span></div><span className="text-sm font-semibold tracking-tight text-white">Lumenfield AI Studio</span></div><nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">{navItems.map((item) => <NavItem key={item.label} icon={item.icon} label={item.label} active={activeNav === item.label} onClick={() => setActiveNav(item.label)} />)}<div className="flex items-center justify-between px-3 pb-1 pt-5"><span className="text-xs font-medium uppercase tracking-wider text-gray-600">Projects</span><Icon.Plus /></div>{MOCK_PROJECTS.slice(0, 5).map((p) => <button key={p.id} className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs text-gray-400 hover:bg-white/5 hover:text-white"><span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[9px] font-bold" style={{ backgroundColor: `${p.color}33`, color: p.color }}>{p.initials[0]}</span><span className="truncate">{p.name}</span></button>)}</nav><div className="space-y-1 border-t border-white/10 px-2 py-3"><NavItem icon={<Icon.Settings />} label="Settings" /><div className="flex items-center gap-2 px-3 py-2"><div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C8FF00] to-[#7C3AED]" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-white">Hakan A.</p><p className="truncate text-xs text-gray-600">72 credits</p></div><Icon.Bell /></div></div></aside>
      <main className="flex flex-1 flex-col overflow-y-auto"><div className="relative flex flex-col items-center px-6 pb-8 pt-12"><div className="mb-6 flex gap-2 opacity-60">{["from-slate-700 to-slate-900","from-violet-900 to-slate-900","from-slate-800 to-slate-950","from-slate-700 to-violet-950"].map((cls, i) => <div key={i} className={`rounded-lg bg-gradient-to-br ${cls} ${i === 1 ? "h-20 w-28 scale-105 opacity-100" : "h-16 w-20"}`} />)}</div><h1 className="mb-1 text-center text-3xl font-black uppercase tracking-tight text-white">CREATE YOUR FIRST PROJECT.</h1><h2 className="mb-8 text-center text-3xl font-black uppercase tracking-tight text-[#C8FF00]">GENERATE THE IMPOSSIBLE.</h2><DirectorPanel /></div><div className="px-6 pb-10"><h3 className="mb-4 font-semibold text-white">My projects</h3><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"><ProjectCard isNew />{MOCK_PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}</div></div></main>
    </div>
  );
}
