const projects = [
  { name: 'Karanlik Hat', status: 'In Progress' },
  { name: 'Lumenfield AI Studio Launch', status: 'Draft' },
  { name: 'Fashion Campaign', status: 'Review' },
  { name: 'Product Teaser', status: 'Completed' },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-black uppercase">Projects</h1>
        <div className="mt-10 grid gap-4">
          {projects.map((project) => (
            <div key={project.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div>
                <h2 className="font-bold">{project.name}</h2>
                <p className="text-sm text-neutral-500">Studio workspace project</p>
              </div>
              <span className="rounded-full border border-[#c8ff00]/30 px-3 py-1 text-xs text-[#c8ff00]">{project.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
