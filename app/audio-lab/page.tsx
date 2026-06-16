"use client";

import Link from "next/link";
import { useState } from "react";

const voices = ["Narrator", "Cinematic", "Creator", "Fashion", "Product", "Podcast"];
const projects = ["Voiceover test", "Ad read", "Podcast intro", "Avatar speech", "Product demo", "Untitled"];

export default function AudioLabPage() {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("Cinematic");

  return (
    <main className="min-h-screen bg-[#0d0e10] text-white">
      <aside className="fixed left-0 top-0 h-screen w-56 border-r border-white/10 bg-[#17181a] p-4">
        <Link href="/explore" className="mb-5 flex items-center gap-2 text-sm font-black text-white no-underline"><span className="grid h-8 w-8 place-items-center rounded-lg bg-pink-600">L</span>Lumenfield AI Studio</Link>
        <nav className="space-y-2 text-sm font-bold text-neutral-300">
          <Link href="/audio-lab" className="block rounded-xl bg-[#27292d] px-4 py-3 text-white no-underline">Audio Studio</Link>
          <Link href="/cinema-studio" className="block rounded-xl px-4 py-3 no-underline text-neutral-300">Cinema Studio</Link>
          <Link href="/supercomputer" className="block rounded-xl px-4 py-3 no-underline text-neutral-300">Supercomputer</Link>
          <Link href="/docs" className="block rounded-xl px-4 py-3 no-underline text-neutral-300">Docs</Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#242528] p-4 text-xs text-neutral-400">Studio credits <b className="block pt-1 text-lime-400">72 remaining</b></div>
      </aside>

      <section className="ml-56 min-h-screen px-10 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div><p className="text-sm font-bold text-pink-500">Audio Studio</p><h1 className="text-5xl font-black tracking-[-.05em]">Generate voice, sound and speech-to-video.</h1></div>
            <Link href="/cinema-studio/generate" className="rounded-full bg-white px-5 py-3 text-sm font-black text-black no-underline">Open Generate</Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[28px] border border-white/10 bg-[#181a1d] p-5 shadow-2xl">
              <div className="mb-3 flex items-center justify-between text-sm text-neutral-400"><span>Prompt</span><span>{voice}</span></div>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the voice, tone, script or audio scene..." className="h-48 w-full resize-none rounded-3xl border border-white/10 bg-[#25272b] p-5 text-white outline-none" />
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {voices.map((v) => <button key={v} onClick={() => setVoice(v)} className={`rounded-2xl px-4 py-4 text-left text-sm font-black ${voice === v ? "bg-lime-400 text-black" : "bg-[#25272b] text-white"}`}>{v}<span className="mt-1 block text-xs opacity-60">voice preset</span></button>)}
              </div>
              <button className="mt-5 rounded-2xl bg-pink-600 px-7 py-4 font-black text-white">Generate audio ✦12</button>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#181a1d] p-5">
              <h2 className="mb-4 text-xl font-black">Waveform Preview</h2>
              <div className="flex h-56 items-center gap-2 rounded-3xl bg-[#0f1012] p-6">
                {Array.from({ length: 34 }).map((_, i) => <div key={i} className="w-2 rounded-full bg-lime-400/80" style={{ height: `${22 + ((i * 17) % 95)}px` }} />)}
              </div>
              <p className="mt-4 text-sm text-neutral-400">Server-side audio generation route can be connected later through /api/lumen/speak.</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-neutral-400">Recent audio projects</p>
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((p, i) => <div key={`${p}-${i}`} className="rounded-3xl border border-white/10 bg-[#181a1d] p-5"><h3 className="font-black">{p}</h3><p className="mt-1 text-xs text-neutral-500">Last edited {i + 1}d ago · Private</p><div className="mt-5 h-20 rounded-2xl bg-gradient-to-r from-pink-600/30 via-lime-400/20 to-neutral-900" /></div>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
