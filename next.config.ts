import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.cloudflare.com" },
      { protocol: "https", hostname: "fal.media" },
      { protocol: "https", hostname: "**.fal.ai" },
      { protocol: "https", hostname: "v3.fal.media" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  // Belirli modülleri yalnızca sunucu tarafında çalıştır
  experimental: {
    serverComponentsExternalPackages: ["@aws-sdk/client-s3"],
  },
};

export default nextConfig;
