// src/app/ai-influencer/page.tsx  →  /ai-influencer
import StudioLanding from "@/components/StudioLanding";

export default function Page() {
  return (
    <StudioLanding
      eyebrow="AI Influencer"
      title="Create and manage virtual talent"
      tagline="Build a consistent virtual persona once and reuse it across every campaign, post and video."
      features={[
        { title: "Consistent identity", desc: "Train a character once; it stays the same face, look and style across every generation." },
        { title: "Any scene", desc: "Place your persona in new locations, outfits and moods without losing consistency." },
        { title: "Photo & video", desc: "Generate stills and short-form videos featuring your virtual talent." },
        { title: "Reusable across projects", desc: "Reference your persona in any studio with a single tag." },
      ]}
    />
  );
}
