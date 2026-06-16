import Link from "next/link";

const sections = [
  { title: "Cinema Studio", href: "/cinema-studio", text: "AI director, camera controls and cinematic video generation." },
  { title: "Generate", href: "/cinema-studio/generate", text: "Create images and videos from one prompt." },
  { title: "Audio Lab", href: "/audio-lab", text: "Voice, sound, speech and audio workflow design." },
  { title: "Supercomputer", href: "/supercomputer-lab", text: "Multi-agent creative command center." },
  { title: "Marketing Studio", href: "/marketing-studio/product", text: "Campaign, ad and product asset generation." },
  { title: "Docs", href: "/docs", text: "Developer API, endpoints, models and workflow docs." },
];

const presets = ["Product launch", "Fashion campaign", "Soul cinema", "Avatar reel", "UGC ads", "Music visualizer", "Photodump", "Brand kit"];

export default function ExploreLabPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#db277755,transparent_35%),radial-gradient(circle_at_center,#7c3aed33,transparent_30%),linear-gradient(180deg,#050505,#111,#050505)]" />
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/explore-lab" className="flex items-center gap-2 text-white no-underline"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 font-black text-white">L</span><span className="text-sm font-black">Lumenfield <span className="text-pink-500">AI</span> Studio</span></Link>
            <div className="hidden items-center gap-6 text-sm text-neutral-300 md:flex"><Link href="/explore-lab">Explore</Link><Link href="/image">Image</Link><Link href="/video">Video</Link><Link href="/audio-lab">Audio</Link><Link href="/pricing">Pricing</Link></div>
            <Link href="/cinema-studio/generate" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black no-underline">Generate</Link>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl text-center">
          <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">New · AI Video & Image Generation</span>
          <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-black leading-tight tracking-[-.06em] md:text-8xl">Create cinematic AI visuals with no limits.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300">Generate images, videos, campaigns, presets and creator-ready content from a single prompt.</p>
          <div className="mt-10 flex justify-center gap-4"><Link href="/cinema-studio/generate" className="rounded-full bg-white px-7 py-4 font-semibold text-black no-underline">Start creating</Link><Link href="#presets" className="rounded-full border border-white/20 px-7 py-4 font-semibold text-white no-underline">Explore presets</Link></div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {["Image", "Video", "Audio"].map((item) => <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6"><div className="h-56 rounded-2xl bg-gradient-to-br from-pink-600/40 via-purple-600/20 to-neutral-950" /><p className="mt-4 font-semibold">{item} Generation</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-black text-pink-500">Workspaces</p><h2 className="text-4xl font-black tracking-[-.05em]">Everything connected.</h2></div><Link href="/docs" className="text-sm font-bold text-neutral-400">Developer docs →</Link></div>
        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((s) => <Link key={s.title} href={s.href} className="rounded-[28px] border border-white/10 bg-[#111214] p-6 text-white no-underline transition hover:bg-[#18191b]"><div className="mb-8 h-36 rounded-3xl bg-gradient-to-br from-pink-600/30 via-lime-400/10 to-neutral-950" /><h3 className="text-2xl font-black">{s.title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{s.text}</p></Link>)}
        </div>
      </section>

      <section id="presets" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-8 text-4xl font-black tracking-[-.05em]">Viral presets</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {presets.map((p, i) => <Link key={p} href={`/cinema-studio/generate?preset=${encodeURIComponent(p)}`} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 text-white no-underline"><div className="mb-5 h-44 rounded-2xl bg-gradient-to-br from-neutral-800 via-pink-600/20 to-black" /><b>{p}</b><p className="mt-2 text-xs text-neutral-500">Preset #{i + 1}</p></Link>)}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4"><div><h3 className="text-xl font-black">Lumenfield <span className="text-pink-500">AI</span> Studio</h3><p className="mt-4 text-sm text-neutral-400">AI-powered camera control for filmmakers and creators.</p></div>{["Product", "Image", "Video"].map((section) => <div key={section}><h4 className="font-semibold">{section}</h4><div className="mt-4 flex flex-col gap-2 text-sm text-neutral-400"><Link href="/cinema-studio">Cinema Studio</Link><Link href="/cinema-studio/generate">Generate</Link><Link href="/supercomputer-lab">Supercomputer</Link><Link href="/docs">Docs</Link></div></div>)}</div>
        <div className="mx-auto mt-10 max-w-7xl text-sm text-neutral-500">© 2026 Lumenfield AI Studio. All rights reserved.</div>
      </footer>
    </main>
  );
}
