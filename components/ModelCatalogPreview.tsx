import { lumenModels, modelCategories } from "@/lib/lumen-models";

export default function ModelCatalogPreview() {
  return (
    <section className="border-t border-white/10 bg-black px-5 py-16 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ff4da6]">
              Model Catalog
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Choose the right AI engine for every creative job.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-neutral-400">
            Image, video, audio and studio workflows are organized like a real AI production platform, ready for API connection later.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {modelCategories.map((category) => (
            <div key={category.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-lg font-bold">{category.label}</h3>
              <p className="mt-2 text-sm text-neutral-400">{category.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lumenModels.slice(0, 9).map((model) => (
            <article key={model.id} className="group rounded-3xl border border-white/10 bg-[#0f0f0f] p-5 transition hover:-translate-y-1 hover:border-[#ff4da6]/40 hover:bg-[#161616]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{model.category}</p>
                  <h3 className="mt-2 text-xl font-black">{model.name}</h3>
                </div>
                {model.badge ? (
                  <span className="rounded-full bg-[#e8006f] px-3 py-1 text-[10px] font-black text-white">
                    {model.badge}
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm text-neutral-400">{model.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                {model.provider}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {model.fields.slice(0, 4).map((field) => (
                  <span key={field} className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300">
                    {field}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
