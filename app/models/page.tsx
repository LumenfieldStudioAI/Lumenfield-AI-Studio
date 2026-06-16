const models = [
  { name: "Flux Dev", type: "Image", desc: "Fast concept art, product shots, posters and social visuals." },
  { name: "Nano Banana Pro", type: "Image", desc: "Premium image generation direction for branded campaigns." },
  { name: "Seedream", type: "Image", desc: "Stylized cinematic images, thumbnails and moodboards." },
  { name: "Kling", type: "Video", desc: "Motion previews, cinematic shots and short video scenes." },
  { name: "Veo", type: "Video", desc: "High-end video generation slot for future expansion." },
  { name: "Sora", type: "Video", desc: "Experimental cinematic text-to-video workflow placeholder." },
];

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#c8ff00]">Lumenfield AI Studio Models</p>
        <h1 className="mt-4 text-4xl font-black uppercase md:text-6xl">AI model catalog</h1>
        <p className="mt-5 max-w-2xl text-neutral-400">Explore image, video and studio models planned for the Lumenfield AI Studio workflow. Some models depend on your active provider access and credits.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <article key={model.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
              <span className="rounded-full border border-[#c8ff00]/30 bg-[#c8ff00]/10 px-3 py-1 text-xs font-bold text-[#c8ff00]">{model.type}</span>
              <h2 className="mt-6 text-2xl font-black">{model.name}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{model.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
