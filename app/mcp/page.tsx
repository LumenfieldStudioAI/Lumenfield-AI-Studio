'use client'

export default function McpPage() {
  const M = '#e8006f'
  const ML = '#ff4da6'
  const BG = '#050505'
  const S1 = '#0f0f0f'
  const S2 = '#161616'
  const B1 = '#1f1f1f'
  const T1 = '#ffffff'
  const T2 = '#a0a0a0'
  const T3 = '#555555'

  const tools = [
    { i: '▶', t: 'Video Generator', d: 'Send a prompt to the active protected generation route.' },
    { i: '▧', t: 'Image Generator', d: 'Create campaign visuals and product shots from one command.' },
    { i: '📣', t: 'Marketing Brief', d: 'Turn URLs, hooks and CTAs into ad concepts.' },
    { i: '∿', t: 'Character Memory', d: 'Prepare consistent influencer and character references.' },
    { i: '▣', t: 'Asset Library', d: 'Store generated files in one reusable workspace.' },
    { i: '🔒', t: 'Server-Side Keys', d: 'Provider keys stay protected in backend routes only.' },
  ]

  const clients = [
    { name: 'ChatGPT', desc: 'Plan prompts, request image/video jobs and save outputs.', icon: '◎' },
    { name: 'Claude', desc: 'Use Lumenfield AI Studio tools inside long creative planning sessions.', icon: '◇' },
    { name: 'Gemini', desc: 'Route research, scripts and production briefs to studio actions.', icon: 'G' },
    { name: 'Cursor', desc: 'Generate assets from inside development workflows.', icon: '⌁' },
    { name: 'VS Code Agent', desc: 'Create media tasks while building campaigns and sites.', icon: '</>' },
    { name: 'OpenCode', desc: 'Connect custom agents to the Lumenfield AI Studio production layer.', icon: '⌘' },
  ]

  const commands = [
    'npm install -g @lumenfield/cli',
    'lumenfield auth login',
    'lumenfield models list --type video',
    'lumenfield generate image --prompt "magenta cinematic product shot"',
    'lumenfield generate video --prompt "slow orbit around a luxury bottle"',
  ]

  return (
    <div style={{ minHeight: '100vh', background: BG, color: T1, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px 80px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid ${B1}`, borderRadius: 20, padding: '5px 14px', fontSize: 11, color: T3, background: S1, marginBottom: 24, textTransform: 'uppercase' as const, letterSpacing: 1 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: M, boxShadow: `0 0 20px ${M}`, display: 'inline-block' }} />
            Developer Tools
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 950, letterSpacing: -3, lineHeight: 0.94, marginBottom: 20 }}>
            MCP & CLI<br />
            <span style={{ background: `linear-gradient(90deg, ${M}, ${ML})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>creative engine.</span>
          </h1>
          <p style={{ color: T2, fontSize: 16, lineHeight: 1.75, maxWidth: 600, marginBottom: 28 }}>
            Connect Lumenfield AI Studio to agents, code editors and automation tools. Keep provider keys protected while agents request image, video, marketing and asset tasks through one workspace.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
            {['MCP server', 'CLI commands', 'Protected API routes', 'Coming soon connectors'].map(x => (
              <span key={x} style={{ display: 'inline-flex', alignItems: 'center', background: `${M}10`, border: `1px solid ${M}30`, borderRadius: 6, padding: '5px 10px', fontSize: 11, color: ML, cursor: 'default' }}>{x}</span>
            ))}
          </div>
        </div>

        {/* CLI + MCP Config */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 1fr)', gap: 18, marginBottom: 32 }}>
          <div style={{ background: S1, border: `1px solid ${B1}`, borderRadius: 22, padding: 22 }}>
            <p style={{ color: T3, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 14 }}>CLI Quickstart</p>
            <div style={{ background: '#070707', border: `1px solid ${B1}`, borderRadius: 14, padding: 18, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' as const }}>
              {commands.map((cmd, i) => (
                <div key={cmd} style={{ color: i < 2 ? ML : T2, fontSize: 13, lineHeight: 1.9, whiteSpace: 'nowrap' as const }}>
                  <span style={{ color: T3 }}>$ </span>{cmd}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
              <button style={{ background: M, border: 'none', borderRadius: 8, color: '#fff', padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Copy setup</button>
              <button style={{ background: 'transparent', border: `1px solid ${B1}`, borderRadius: 8, color: T2, padding: '10px', fontSize: 13, cursor: 'pointer' }}>View docs</button>
            </div>
          </div>

          <div style={{ background: S1, border: `1px solid ${B1}`, borderRadius: 22, padding: 22 }}>
            <p style={{ color: T3, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 14 }}>MCP Config</p>
            <div style={{ background: '#070707', border: `1px solid ${B1}`, borderRadius: 14, padding: 18, fontFamily: 'ui-monospace, monospace', overflowX: 'auto' as const }}>
              {[
                '{',
                '  "mcpServers": {',
                '    "lumenfield": {',
                '      "command": "npx",',
                '      "args": ["@lumenfield/mcp"],',
                '      "env": { "LUMENFIELD_API_KEY": "server-side" }',
                '    }',
                '  }',
                '}',
              ].map((line, i) => (
                <div key={i} style={{ color: i > 1 && i < 7 ? ML : T2, fontSize: 13, lineHeight: 1.8 }}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Connectors */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: T3, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>Featured Connectors</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {clients.map(c => (
              <div key={c.name} style={{ background: S1, border: `1px solid ${B1}`, borderRadius: 14, padding: 16, cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${M}60` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = B1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: S2, border: `1px solid ${B1}`, display: 'grid', placeItems: 'center', fontWeight: 900, color: T1 }}>{c.icon}</div>
                  <span style={{ background: `${M}18`, color: ML, border: `1px solid ${M}30`, borderRadius: 4, padding: '2px 8px', fontSize: 9, fontWeight: 800 }}>Coming soon</span>
                </div>
                <div style={{ color: T1, fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{c.name}</div>
                <div style={{ color: T3, fontSize: 12, lineHeight: 1.55 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: T3, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>Agent Tools</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {tools.map(f => (
              <div key={f.t} style={{ background: S1, border: `1px solid ${B1}`, borderRadius: 14, padding: '18px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{f.i}</div>
                <div style={{ color: T1, fontSize: 13, fontWeight: 800, marginBottom: 5 }}>{f.t}</div>
                <div style={{ color: T3, fontSize: 12, lineHeight: 1.55 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active route */}
        <div style={{ background: `linear-gradient(135deg, ${M}18, ${S1})`, border: `1px solid ${M}30`, borderRadius: 18, padding: 24, display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' as const }}>
          <div>
            <div style={{ color: T1, fontSize: 18, fontWeight: 900 }}>Current active route</div>
            <div style={{ color: T2, fontSize: 13, marginTop: 6 }}>No provider secret is exposed in the browser.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {['POST /api/studio-generate', 'POST /api/generate-video', 'GET /api/check-video'].map(r => (
              <span key={r} style={{ display: 'inline-flex', alignItems: 'center', background: `${M}10`, border: `1px solid ${M}30`, borderRadius: 6, padding: '5px 10px', fontSize: 11, color: ML }}>{r}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
