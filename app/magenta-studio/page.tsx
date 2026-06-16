const projects = [
  "New project",
  "My Generations",
  "Long Video Example",
  "New folder",
  "Untitled",
  "Untitled",
  "New project",
  "Untitled",
];

export default function MagentaStudioPage() {
  return (
    <main className="flex h-screen overflow-hidden bg-[#0b0610] text-white">
      <aside className="relative w-[156px] shrink-0 border-r border-[#3b1d4d] bg-[#14091d] p-1">
        <div className="mb-2 flex h-9 items-center rounded-lg bg-[#24112f] px-2 text-[11px] font-bold text-[#ff4dff]">
          ◇ Cinema Studio
        </div>

        {["Home", "My Generations", "My Elements", "My Favorites", "Community Feed"].map((item, i) => (
          <div key={item} className={`mb-1 flex h-8 items-center gap-2 rounded-lg px-2 text-[11px] font-bold ${i === 0 ? "border border-[#ff00ff55] bg-[#ff00ff22]" : "hover:bg-[#ff00ff14]"}`}>
            <span className="grid size-5 place-items-center rounded-md bg-[#522066] text-[10px]">{i === 0 ? "⌂" : "●"}</span>
            {item}
          </div>
        ))}

        <div className="mt-6 flex justify-between text-[11px] text-[#a78cb8]"><span>Projects</span><span>+</span></div>

        {["Long Video Exa...", "New folder", "Untitled", "Untitled", "New project", "Untitled"].map((item) => (
          <div key={item} className="flex h-11 items-center gap-2 text-[11px] font-bold"><div className="size-7 rounded-lg bg-[#2a1838]" />{item}</div>
        ))}

        <div className="absolute bottom-2 left-1 w-[146px]">
          <div className="flex h-8 items-center justify-between rounded-lg bg-[#21112d] px-2 text-[11px] font-black">Pricing <span className="rounded-full bg-[#ff00ff] px-2 py-0.5 text-[9px]">30%</span></div>
          <div className="mt-2 text-[11px] font-bold">🟢 koonstaco1587</div>
        </div>
      </aside>

      <section className="relative flex-1 overflow-y-auto bg-[linear-gradient(rgba(255,0,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,.05)_1px,transparent_1px)] bg-[size:56px_56px] px-5 pb-20">
        <div className="mt-16 text-center">
          <div className="mb-3 flex h-24 items-center justify-center"><div className="-mr-5 h-20 w-52 rotate-[-8deg] rounded-lg bg-[#24112f] shadow-2xl" /><div className="z-10 h-24 w-56 rounded-lg bg-[#3a1b4c] shadow-2xl" /><div className="-ml-5 h-20 w-52 rotate-[8deg] rounded-lg bg-[#24112f] shadow-2xl" /></div>
          <h1 className="text-[31px] font-black leading-[34px]">CREATE YOUR FIRST PROJECT.<br /><span className="text-[#ff00ff] drop-shadow-[0_0_20px_#ff00ff]">GENERATE THE IMPOSSIBLE.</span></h1>
        </div>

        <div className="mx-auto mt-5 w-[650px] rounded-2xl border border-[#3b1d4d] bg-[#1c1028] p-2 shadow-[0_0_45px_rgba(255,0,255,.15)]">
          <div className="mb-1 text-[10px] text-[#a78cb8]">▦ Director Panel</div>
          <div className="flex h-10 gap-1"><div className="w-10 rounded-lg bg-[#2a1838]" /><div className="w-10 rounded-lg bg-[#2a1838]" /><div className="w-10 rounded-lg bg-[#2a1838]" /><div className="w-36 rounded-lg bg-[#2a1838] px-2 py-1 text-[10px]">Movement<b className="block text-[13px]">Dolly in</b></div><div className="relative w-32 rounded-lg bg-[#2a1838]"><div className="absolute left-4 top-5 h-[2px] w-24 rotate-12 bg-[#ff00ff]" /></div><div className="w-24 rounded-lg bg-[#2a1838] px-2 py-1 text-[10px]">Speed ramp<b className="block text-[12px]">Slow-mo</b></div><div className="flex-1 rounded-lg bg-[#2a1838] px-2 py-1 text-[10px]">Duration<b className="block text-[12px]">12s</b></div></div>
          <div className="mt-2 flex gap-1.5"><div className="w-14 rounded-2xl bg-[#160b20] py-2 text-center text-[10px] text-[#a78cb8]"><div className="mb-3">▧<br />Image</div><div className="font-black text-white">▣<br />Video</div></div><div className="flex-1 rounded-2xl border border-[#3b1d4d] bg-[#100817] p-3"><textarea className="h-10 w-full resize-none bg-transparent text-xs outline-none placeholder:text-[#8a7199]" placeholder="Describe your scene - use @ to add characters & locations" /><div className="flex gap-1">{["+", "◇ Cinema Studio 3.5", "▭ 16:9", "◇ 1080p", "− 4/4 +"].map((b) => <button key={b} className="h-7 rounded-lg border border-[#47215d] bg-[#2a1838] px-2 text-[10px] font-bold hover:border-[#ff00ff]">{b}</button>)}</div></div><button className="w-16 rounded-xl bg-[#2a1838] text-[10px] font-black">＋<br />START<br />FRAME</button><button className="w-16 rounded-xl bg-[#2a1838] text-[10px] font-black">＋<br />END<br />FRAME</button><button className="w-24 rounded-xl bg-[#ff00ff] text-[11px] font-black text-white shadow-[0_0_25px_rgba(255,0,255,.7)]">GENERATE<br />✦ 72</button></div>
        </div>

        <div className="mx-auto mt-10 max-w-[1290px] text-xs text-[#a78cb8]">My projects</div>
        <div className="mx-auto mt-3 grid max-w-[1290px] grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <div key={i} className="h-48 rounded-2xl border border-[#3b1d4d] bg-[#21112d] p-3">
              {i === 0 ? <div className="flex h-full flex-col items-center justify-center"><div className="mb-3 grid size-9 place-items-center rounded-full border border-[#ff00ff88] bg-[#2a1838] text-2xl">+</div><b className="text-xs">New project</b></div> : <><h3 className="text-xs font-black">{project}</h3><p className="mb-5 mt-1 text-[10px] text-[#8a7199]">Last edited 1d ago · Private</p><div className="grid grid-cols-3 gap-2"><div className="row-span-2 grid h-28 place-items-center rounded-md bg-[#321943] text-3xl text-[#ff4dff]">📁</div><div className="h-14 rounded-md bg-[#2a1838]" /><div className="h-14 rounded-md bg-[#2a1838]" /><div className="h-14 rounded-md bg-[#2a1838]" /><div className="h-14 rounded-md bg-[#2a1838]" /></div></>}
            </div>
          ))}
        </div>

        <div className="fixed bottom-5 right-7 rounded-xl border border-[#3b1d4d] bg-[#1c1028] px-4 py-3 text-xs shadow-[0_0_30px_rgba(255,0,255,.2)]"><b>Credits are running low!</b> Over 90% already used<button className="ml-3 rounded-lg bg-[#ff00ff] px-4 py-2 font-black text-white">Upgrade</button></div>
      </section>
    </main>
  );
}
