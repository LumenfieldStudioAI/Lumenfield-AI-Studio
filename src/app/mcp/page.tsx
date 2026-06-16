// src/app/mcp/page.tsx  →  /mcp
import StudioLanding from "@/components/StudioLanding";

export default function Page() {
  return (
    <StudioLanding
      eyebrow="MCP & CLI"
      title="Lumenfield MCP for any AI agent"
      tagline="Connect Lumenfield to Claude, Cursor or any MCP-compatible client and generate cinematic images and videos straight from your prompts."
      ctaLabel="Connect"
      ctaHref="#"
      features={[
        { title: "One connection", desc: "Add the MCP server URL in your agent's settings and authenticate with your account. No API keys to manage." },
        { title: "30+ models", desc: "Your agent gets image, video and audio models behind a single endpoint and picks the best one per task." },
        { title: "Image & video generation", desc: "From stills to cinematic video — choose the model, set parameters, generate up to 4K." },
        { title: "Same credits", desc: "Tools use the same credit system as the platform. Existing plan credits work through any connected agent." },
        { title: "Asset history", desc: "Browse your full generation history and reference any past image or video as a starting point." },
        { title: "Works everywhere", desc: "Any MCP-compatible client connects — point it to the server and start generating." },
      ]}
    />
  );
}
