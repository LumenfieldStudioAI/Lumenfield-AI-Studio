const items = [
  "Neon city chase",
  "Luxury product reveal",
  "Anime forest portal",
  "Cyberpunk portrait",
  "Desert fashion film",
  "Cinematic car ad",
  "AI character study",
  "Dreamlike music video",
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#09090d] px-6 py-16 text-white">
      <section className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c8ff00]">Community Gallery</p>
        <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">Explore generated worlds</h1>
        <p className="mt-5 max-w-2xl text-neutral-400">A showcase area for featured images, video concepts, campaign ideas and community creations from Lumenfield AI Studio.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <article key={item} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-950 to-black text-5xl font-black text-white/10">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="p-5">
                <h2 className="font-bold">{item}</h2>
                <p className="mt-2 text-sm text-neutral-500">Image/video concept</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
