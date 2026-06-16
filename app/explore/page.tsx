import LumenStudioPage from "@/components/studio/LumenStudioPage";

export default function ExplorePage() {
  return (
    <>
      <style>{`
        .lumen-explore-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background:
            radial-gradient(circle at 50% 20%, rgba(120, 80, 255, 0.35), transparent 35%),
            linear-gradient(180deg, #050505 0%, #111 55%, #050505 100%);
          overflow: hidden;
          text-align: center;
          padding: 120px 24px 80px;
        }

        .lumen-explore-title {
          font-size: clamp(48px, 8vw, 120px);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: .9;
          animation: lumen-rise 1s ease forwards;
          margin: 0;
        }

        .lumen-explore-subtitle {
          margin-top: 20px;
          font-size: clamp(18px, 2vw, 28px);
          color: rgba(255,255,255,0.72);
          animation: lumen-rise 1.2s ease forwards;
        }

        @keyframes lumen-rise {
          from {
            opacity: 0;
            transform: translateY(42px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <section className="lumen-explore-hero">
        <div>
          <h1 className="lumen-explore-title">Lumenfield AI Studio</h1>
          <p className="lumen-explore-subtitle">Generate cinematic images, videos, ads, avatars, and creative campaigns from one prompt.</p>
        </div>
      </section>
      <LumenStudioPage kind="explore" />
    </>
  );
}
