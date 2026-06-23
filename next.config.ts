import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint hataları deploy'u engellemeyecek
    // (CI pipeline'da ayrıca çalıştır)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript hatalarında da build devam etsin (geliştirme aşaması)
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.cloudflare.com" },
      { protocol: "https", hostname: "fal.media" },
      { protocol: "https", hostname: "v3.fal.media" },
      { protocol: "https", hostname: "**.fal.ai" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
