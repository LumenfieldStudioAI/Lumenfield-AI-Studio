export const landingPresets = [
  "BASEBALL GAME",
  "STORM GIANT",
  "2000'S PAPARAZZI",
  "FREE FALL",
  "APEX HUNTER",
  "DRAGON FANTASY",
  "DRIFT RACING",
  "KUNG FU HIT",
];

export function LumenPresetGrid() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.4em] text-neutral-500">
          Viral Presets
        </p>
        <h2 className="mt-4 text-4xl font-bold md:text-6xl">
          Big-budget visual effects, ready in seconds.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {landingPresets.map((item) => (
            <div
              key={item}
              className="group min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-5"
            >
              <div className="h-40 rounded-2xl bg-gradient-to-br from-pink-500/40 via-purple-500/20 to-orange-400/30 transition group-hover:scale-105" />
              <h3 className="mt-5 font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LumenStudioCards() {
  const cards = [
    ["Cinema Studio", "Create cinematic scenes effortlessly."],
    ["Marketing Studio", "Launch full campaigns from one prompt."],
    ["Canvas", "Moodboard, chain workflows, and share with your team."],
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {cards.map(([title, desc]) => (
          <div key={title} className="rounded-3xl bg-white p-8 text-black">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-4 text-neutral-600">{desc}</p>
            <button className="mt-8 rounded-full bg-black px-5 py-3 text-sm text-white">
              Try now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
