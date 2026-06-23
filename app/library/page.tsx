import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Navbar } from "@/components/layout/Navbar";

export default async function LibraryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { data: jobs } = await supabaseAdmin
    .from("jobs")
    .select("*")
    .eq("clerk_user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="min-h-screen bg-[#0f1113]">
      <Navbar />
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold text-white mb-6">Kütüphane</h1>

        {!jobs?.length ? (
          <div className="text-center py-24 text-white/20 text-sm">
            Henüz üretiminiz yok. Generate sayfasına git.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5 group relative"
              >
                {job.output_url?.includes(".mp4") ||
                job.output_url?.includes(".webm") ? (
                  <video
                    src={job.output_url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={job.output_url ?? ""}
                    alt={job.prompt ?? ""}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-white text-xs line-clamp-2">{job.prompt}</p>
                  <a
                    href={job.output_url ?? "#"}
                    download
                    className="mt-2 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    İndir
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
