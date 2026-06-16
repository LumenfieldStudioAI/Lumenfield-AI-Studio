import StudioLanding from "@/components/StudioLanding";

export default function McpPage() {
  return (
    <StudioLanding
      activeNav="mcp"
      ctaHref="/generate"
      ctaLabel="Connect"
      eyebrow="MCP & CLI"
      features={[
        { title: "Agent connector", desc: "Connect ChatGPT, Claude, Gemini, Cursor, VS Code Agent and custom clients as staged connectors." },
        { title: "CLI quickstart", desc: "Install the Lumenfield CLI, log in, list models and request protected generation jobs from your terminal." },
        { title: "Protected server routes", desc: "Provider secrets stay server-side while tools call Lumenfield API routes safely." },
        { title: "Image & video jobs", desc: "Send image, video, marketing and asset tasks through one command layer." },
        { title: "Shared asset history", desc: "Generated results can be reused later from the Lumenfield workspace and library." },
        { title: "Coming soon marketplace", desc: "Connectors, models and tools will be organized as a Lumenfield marketplace." },
      ]}
      tagline="Connect Lumenfield AI Studio to AI agents, editors and automation tools without exposing provider keys in the browser."
      title="MCP & CLI creative engine"
    />
  );
}
