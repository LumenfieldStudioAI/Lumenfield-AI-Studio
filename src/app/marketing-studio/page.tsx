// src/app/marketing-studio/page.tsx  →  /marketing-studio
import StudioLanding from "@/components/StudioLanding";

export default function Page() {
  return (
    <StudioLanding
      eyebrow="Marketing Studio"
      title="One prompt, your entire campaign"
      tagline="Studio-quality UGC, product demos and video ads. Add a product via URL, pick an avatar, choose a mode and generate publish-ready content."
      features={[
        { title: "URL to ad", desc: "Drop a product link. We extract the name, description and images and build the ad: script, shots, camera and edit." },
        { title: "40+ avatars", desc: "Ready-to-use AI presenters or generate your own from a text prompt. Pin, rename and reuse across campaigns." },
        { title: "10 modes", desc: "UGC, TV Spot, Tutorial, Product Review, Unboxing, Try-On, Hyper Motion, Wild Card and more." },
        { title: "Hooks that stop the scroll", desc: "Pick a proven opener and the studio builds the rest around your product." },
        { title: "Ad reference", desc: "Upload a viral ad, attach your product and avatar — we copy the structure, you tweak the script." },
        { title: "Powered by Seedance 2.0", desc: "Motion, audio and speech in one pass with native lip-sync and consistent characters." },
      ]}
    />
  );
}
