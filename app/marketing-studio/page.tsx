import StudioLanding from "@/components/StudioLanding";

export default function MarketingStudioPage() {
  return (
    <StudioLanding
      activeNav="marketing"
      ctaHref="/generate"
      eyebrow="Marketing Studio"
      features={[
        { title: "URL to ad", desc: "Drop a product link and build the ad: script, shots, camera and edit." },
        { title: "40+ avatars", desc: "Use ready AI presenters or generate your own from a text prompt." },
        { title: "10 modes", desc: "UGC, TV spot, tutorial, product review, unboxing, try-on and more." },
        { title: "Hooks that stop the scroll", desc: "Pick a proven opener and let the studio build around the product." },
        { title: "Ad reference", desc: "Upload a viral ad, attach your product and reuse the structure." },
        { title: "Model routed", desc: "Video, motion, audio and speech models are selected by the campaign type." },
      ]}
      tagline="Studio-quality UGC, product demos and video ads from a product URL, avatar and campaign mode."
      title="One prompt, your entire campaign"
    />
  );
}
