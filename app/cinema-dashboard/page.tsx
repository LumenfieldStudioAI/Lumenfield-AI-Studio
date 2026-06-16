import Link from "next/link";

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

const menu = ["Home", "My Generations", "My Elements", "My Favorites", "Community Feed"];

export default function CinemaDashboardPage() {
  return (
    <main className="min-h-screen bg-[#111214] text-white">
      <aside className="fixed left-0 top-0 h-screen w-56 border-r border-white/10 bg-[#18191b] p-3">
        <div className="mb-4 rounded-xl bg-[#242528] px-4 py-3 text-sm font-bold">
          <span className="text-lime-400">⌁</span> Cinema Studio
        </div>
        <nav className="space-y-2">
          {menu.map((item, i) => (
            <div key={item} className={`rounded-xl px-4 py-3 text-sm font-bold ${i === 0 ? "bg-[#2a2b2f]" : "text-neutral-300"}`}>
              {item}
            </div>
          ))}
        </nav>
        <p className="mt-8 px-2 text-sm text-neutral-500">Projects +</p>
        <div className="mt-3 space-y-2">
          {["Long Video Exa...", "New folder", "Untitled", "New project"].map((item) => (
            <div key={item} className="rounded-xl px-3 py-3 text-sm font-semibold">{item}</div>
          ))}
        </div>
        <div className="absolute bottom-4 left-3 right-3">
          <Link href="/pricing" className="block rounded-xl bg-[#242528] px-4 py-3 text-sm font-bold text-white no-underline">
            💎 Pricing <span className="ml-3 rounded-full bg-pink-600 px-2 text-xs">30% OFF</span>
          </Link>
        </div>
      </aside>

      <section className="ml-56 min-h-screen bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:48px_48px] px-10 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-8 flex w-fit items-end justify-center gap-[-20px]">
            <div className="h-20 w-36 rotate-[-8deg] rounded-xl bg-neutral-700" />
            <div className="-mx-4 h-28 w-72 rounded-xl border border-white/20 bg-neutral-600 shadow-2xl" />
            <div className="h-20 w-36 rotate-[8deg] rounded-xl bg-neutral-700" />
          </div>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            CREATE YOUR FIRST PROJECT.<br /><span className="text-lime-400">GENERATE THE IMPOSSIBLE.</span>
          </h1>
          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-[#242628] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-400"><span>▦ Director Panel</span><span>⌄</span></div>
            <div className="grid gap-2 md:grid-cols-[1fr_130px_130px_120px]">
              <Link href="/cinema-studio/generate" className="rounded-2xl bg-[#303236] p-4 text-left text-sm text-neutral-400 no-underline">Describe your scene - use @ to add characters & locations</Link>
              <div className="rounded-2xl bg-[#303236] p-3 text-sm"><p className="text-neutral-400">Speed ramp</p><b>Slow-mo</b></div>
              <div className="rounded-2xl bg-[#303236] p-3 text-sm"><p className="text-neutral-400">Duration</p><b>12s</b></div>
              <Link href="/cinema-studio/generate" className="rounded-2xl bg-lime-400 px-5 py-4 text-center text-sm font-black text-black no-underline">GENERATE ✦72</Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {["Cinema Studio 3.5", "16:9", "1080p", "4/4", "Off"].map((x) => <span key={x} className="rounded-xl bg-[#303236] px-4 py-2">{x}</span>)}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <p className="mb-4 text-neutral-400">My projects</p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/cinema-studio/generate" className="flex min-h-56 items-center justify-center rounded-3xl border border-white/10 bg-[#1d1f22] text-white no-underline"><div className="text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl">+</div><b>New project</b></div></Link>
            {projects.map((project, i) => (
              <Link href="/cinema-studio/generate" key={`${project}-${i}`} className="rounded-3xl border border-white/10 bg-[#1d1f22] p-5 text-white no-underline">
                <h3 className="font-bold">{project}</h3>
                <p className="mt-1 text-xs text-neutral-500">Last edited {i + 1}d ago · Private</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="col-span-2 row-span-2 flex h-32 items-center justify-center rounded-xl bg-[#34363a]">📁</div>
                  <div className="h-14 rounded-xl bg-[#2a2c30]" />
                  <div className="h-14 rounded-xl bg-[#2a2c30]" />
                  <div className="h-14 rounded-xl bg-[#2a2c30]" />
                  <div className="h-14 rounded-xl bg-[#2a2c30]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="fixed bottom-5 right-5 rounded-2xl bg-[#1f2022] px-5 py-4 text-sm shadow-xl">
          Credits are running low! <Link href="/pricing" className="ml-4 rounded-xl bg-lime-400 px-4 py-2 font-bold text-black no-underline">Upgrade</Link>
        </div>
      </section>
    </main>
  );
}
