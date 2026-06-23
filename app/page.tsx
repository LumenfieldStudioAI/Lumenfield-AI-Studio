import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

const PARTNERS = [
  "ByteDance", "KlingAI", "Runway", "Black Forest Labs",
  "ElevenLabs", "Stability AI", "OpenAI", "Google DeepMind",
  "ByteDance", "KlingAI", "Runway", "Black Forest Labs",
  "ElevenLabs", "Stability AI", "OpenAI", "Google DeepMind",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1113]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8006f] animate-pulse" />
            Şimdi daha güçlü modeller mevcut
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Saniyeler içinde{" "}
            <span className="text-[#e8006f]">viral</span> içerik
            <br />üret
          </h1>

          <p className="text-xl text-white/40 mb-10 max-w-2xl mx-auto leading-relaxed">
            En iyi yapay zeka modelleriyle görsel, video ve ses üret.
            Tek bir stüdyoda, kredi sistemiyle.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/generate"
              className="px-8 py-3.5 rounded-xl bg-[#e8006f] hover:bg-[#c4005e] text-white font-semibold text-base transition-colors"
            >
              Hemen Başla →
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-base transition-colors"
            >
              Fiyatlar
            </Link>
          </div>
        </div>
      </section>

      {/* Partner marquee */}
      <section className="py-10 border-y border-white/5 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {PARTNERS.map((p, i) => (
            <span key={i} className="text-white/20 text-sm font-medium tracking-wider uppercase">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "✦",
              title: "25+ AI Modeli",
              desc: "Kling, Seedance, FLUX, Runway ve daha fazlası — hepsi tek yerden.",
            },
            {
              icon: "⚡",
              title: "Saniyeler İçinde",
              desc: "Async kuyruk sistemi ile üretimler arka planda hızla tamamlanır.",
            },
            {
              icon: "💎",
              title: "Kredi Sistemi",
              desc: "Sadece kullandığın kadar öde. Abonelik veya kredi paketi seç.",
            },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-white/20 text-sm">
        © 2026 Lumenfield AI Studio — Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
