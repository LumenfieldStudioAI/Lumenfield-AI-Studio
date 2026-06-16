"use client";
import { useState } from "react";

function TurkishEmblem({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="22,18 25,28 35,28 27,34 30,44 22,38 14,44 17,34 9,28 19,28" fill="#e8006f" />
      <path d="M58,20 A22,22 0 1,1 58,80 A16,16 0 1,0 58,20 Z" fill="#e8006f" />
    </svg>
  );
}

function Check({ ok }: { ok: boolean }) {
  return (
    <span style={{ color: ok ? "#e8006f" : "#333", fontSize: 13, flexShrink: 0 }}>
      {ok ? "✓" : "✗"}
    </span>
  );
}

function Badge({ label, variant = "green" }: { label: string; variant?: "green" | "magenta" | "gray" }) {
  const styles = {
    green:   { bg: "rgba(200,255,0,0.12)",  color: "#c8ff00",  border: "rgba(200,255,0,0.25)" },
    magenta: { bg: "rgba(232,0,111,0.15)",  color: "#ff4da6",  border: "rgba(232,0,111,0.3)" },
    gray:    { bg: "rgba(255,255,255,0.05)", color: "#444",    border: "rgba(255,255,255,0.08)" },
  }[variant];
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 4,
      background: styles.bg, color: styles.color, border: `1px solid ${styles.border}`,
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{ fontSize: 10, color: "#555", fontWeight: 800, letterSpacing: 1, marginBottom: 8, marginTop: 16, display: "flex", alignItems: "center", gap: 5 }}>
      <span>{icon}</span> {label}
    </div>
  );
}

function RowItem({ label, access }: { label: string; access: string }) {
  const isNone = access === "NO ACCESS";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
      <span style={{ fontSize: 11, color: isNone ? "#444" : "#777" }}>{label}</span>
      <Badge label={access} variant={isNone ? "gray" : access.includes("UNLIMITED") || access === "FULL ACCESS" ? "green" : "magenta"} />
    </div>
  );
}

const PLANS = [
  {
    id: "starter",
    name: "STARTER",
    subtitle: "For first-time AI content creators",
    monthly: 19,
    annual: 15,
    annualSave: 48,
    creditLine: "+ 270 credits/mo",
    examples: ["135 Nano Banana Pro Generations", "31 Kling 3.0 videos"],
    fixedNote: "Fixed amount of 270 credits/mo",
    popular: false,
    accentColor: "#ffffff",
    cardBg: "#0d0d18",
    cardBorder: "#22223a",
    ctaBg: "#1a1a2e",
    ctaColor: "#fff",
    ctaBorder: "1px solid #3a3a5a",
    features: [
      { label: "Access to selected models only", ok: true },
      { label: "Parallel generations: up to 2 Videos, 4 Images", ok: true },
      { label: "Access to Supercomputer", ok: false },
      { label: "Access to all features", ok: false },
      { label: "Early access to advanced AI features", ok: false },
      { label: "Lowest cost per credit", ok: false },
      { label: "Turn your favorite model into 365-day Unlimited", ok: false },
    ],
    seedance: [
      { label: "Seedance 2.0", access: "NO ACCESS" },
      { label: "Seedance 2.0 Fast", access: "FULL ACCESS" },
    ],
    unlimited7: [
      { label: "Nano Banana 2", access: "NO ACCESS" },
      { label: "Nano Banana Pro", access: "NO ACCESS" },
      { label: "Kling 3.0", access: "NO ACCESS" },
    ],
    freeGens: [
      { label: "Soul V2 & Cinema", access: "300 FREE GENS" },
      { label: "Seedream 5.0 Lite", access: "365 UNLIMITED" },
    ],
  },
  {
    id: "plus",
    name: "PLUS",
    planBadge: "20% OFF",
    subtitle: "For consistent and easy AI content creation",
    monthly: 59,
    annual: 47,
    annualSave: 144,
    creditLine: "+ 1.2k credits/mo",
    examples: ["600 Nano Banana Pro Generations", "137 Kling 3.0 videos"],
    fixedNote: "Fixed amount of 1,200 credits/mo",
    popular: false,
    accentColor: "#c8ff00",
    cardBg: "#0b1400",
    cardBorder: "#3a5a00",
    ctaBg: "#c8ff00",
    ctaColor: "#000",
    ctaBorder: "none",
    features: [
      { label: "Access to all models", ok: true },
      { label: "Parallel generations: up to 6 Videos, 8 Images", ok: true },
      { label: "Access to Supercomputer", ok: true },
      { label: "Access to all features", ok: true },
      { label: "Early access to advanced AI features", ok: true },
      { label: "Lowest cost per credit", ok: false },
      { label: "Turn your favorite model into 365-day Unlimited", ok: false },
    ],
    seedance: [
      { label: "Seedance 2.0", access: "FULL ACCESS" },
      { label: "Seedance 2.0 Fast", access: "FULL ACCESS" },
    ],
    unlimited7: [
      { label: "Nano Banana 2", access: "2× UNLIMITED" },
      { label: "Nano Banana Pro", access: "NO ACCESS" },
      { label: "Kling 3.0", access: "UNLIMITED" },
    ],
    freeGens: [
      { label: "Soul V2 & Cinema", access: "1,000 FREE GENS" },
      { label: "Seedream 5.0 Lite", access: "365 UNLIMITED" },
      { label: "Flux 2 Pro (1K)", access: "365 UNLIMITED" },
      { label: "Seedream 4.5", access: "365 UNLIMITED" },
      { label: "Nano Banana", access: "365 UNLIMITED" },
      { label: "Kling OI Image", access: "365 UNLIMITED" },
      { label: "GPT Image", access: "NO ACCESS" },
    ],
  },
  {
    id: "ultra",
    name: "ULTRA",
    planBadge: "23% OFF",
    subtitle: "For creators building AI projects",
    monthly: 129,
    annual: 99,
    annualSave: 360,
    creditLine: "+ 3 credits/mo",
    examples: ["1,500 Nano Banana Pro Generations", "343 Kling 3.0 videos"],
    fixedNote: "Fixed amount of 3,000 credits/mo",
    popular: true,
    accentColor: "#ffffff",
    cardBg: "#16000d",
    cardBorder: "#e8006f",
    ctaBg: "linear-gradient(135deg,#e8006f,#9c004a)",
    ctaColor: "#fff",
    ctaBorder: "none",
    features: [
      { label: "Access to all models", ok: true },
      { label: "Parallel generations: up to 8 Videos, 8 Images", ok: true },
      { label: "Access to Supercomputer", ok: true },
      { label: "Access to all features", ok: true },
      { label: "Early access to advanced AI features", ok: true },
      { label: "Lowest cost per credit", ok: true },
      { label: "One 365-day Unlimited video model", ok: true },
    ],
    seedance: [
      { label: "Seedance 2.0", access: "FULL ACCESS" },
      { label: "Seedance 2.0 Fast", access: "FULL ACCESS" },
    ],
    unlimited7: [
      { label: "Nano Banana 2", access: "2× UNLIMITED" },
      { label: "Nano Banana Pro", access: "2× UNLIMITED" },
      { label: "Kling 3.0", access: "UNLIMITED" },
    ],
    freeGens: [
      { label: "Soul V2 & Cinema", access: "10,000 FREE GENS" },
      { label: "Seedream 5.0 Lite", access: "365 UNLIMITED" },
      { label: "Flux 2 Pro (1K)", access: "365 UNLIMITED" },
      { label: "Seedream 4.5", access: "365 UNLIMITED" },
      { label: "Nano Banana", access: "365 UNLIMITED" },
      { label: "Kling OI Image", access: "365 UNLIMITED" },
      { label: "GPT Image", access: "365 UNLIMITED" },
    ],
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", color: "#fff", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", borderBottom: "1px solid #14141f", background: "rgba(7,7,15,0.97)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#e8006f,#9c004a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17, color: "#fff" }}>L</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: -0.4 }}>Lumenfield <span style={{ color: "#e8006f" }}>AI</span> Studio</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/pricing" style={{ background: "linear-gradient(135deg,#e8006f,#9c004a)", borderRadius: 7, padding: "7px 14px", fontSize: 12, color: "#fff", fontWeight: 700, textDecoration: "none" }}>
            ◆ Pricing <span style={{ fontSize: 10, opacity: 0.85 }}>30% OFF</span>
          </a>
          <a href="/sign-in" style={{ border: "1px solid #252535", borderRadius: 7, padding: "7px 14px", fontSize: 12, color: "#aaa", textDecoration: "none" }}>Login</a>
          <a href="/sign-up" style={{ background: "#1a1a2e", border: "1px solid #3a3a5a", borderRadius: 7, padding: "7px 14px", fontSize: 12, color: "#fff", textDecoration: "none", fontWeight: 600 }}>Sign up</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "56px 20px 36px", position: "relative", overflow: "hidden" }}>
        {/* bg emblem */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.03, pointerEvents: "none" }}>
          <TurkishEmblem size={480} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 10 }}>
            <TurkishEmblem size={44} />
            <h1 style={{ margin: 0, fontSize: "clamp(30px,5vw,60px)", fontWeight: 950, letterSpacing: -2, background: "linear-gradient(90deg,#fff 35%,#e8006f 55%,#ff4da6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PRICING
            </h1>
            <TurkishEmblem size={44} />
          </div>
          <p style={{ color: "#666", fontSize: 15, margin: "0 0 28px" }}>Scale from hobbyist to studio. Cancel anytime.</p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#0e0e1a", border: "1px solid #1e1e30", borderRadius: 999, padding: "5px 18px" }}>
            <button onClick={() => setAnnual(false)} style={{ background: "none", border: "none", cursor: "pointer", color: !annual ? "#fff" : "#555", fontSize: 13, fontWeight: !annual ? 700 : 400, padding: "3px 6px" }}>Monthly</button>
            <div onClick={() => setAnnual(!annual)} style={{ width: 42, height: 22, borderRadius: 999, background: annual ? "#e8006f" : "#2a2a3a", position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 2, left: annual ? 21 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
            </div>
            <button onClick={() => setAnnual(true)} style={{ background: "none", border: "none", cursor: "pointer", color: annual ? "#fff" : "#555", fontSize: 13, fontWeight: annual ? 700 : 400, padding: "3px 6px" }}>Annual</button>
            {annual && <span style={{ background: "#e8006f", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999 }}>30% OFF</span>}
          </div>
        </div>
      </div>

      {/* PLAN CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(252px,1fr))", gap: 14, maxWidth: 1180, margin: "0 auto", padding: "0 16px" }}>
        {PLANS.map(plan => (
          <div key={plan.id} style={{ background: plan.cardBg, border: `1px solid ${plan.popular ? "#e8006f" : plan.cardBorder}`, borderRadius: 20, padding: "22px 20px", position: "relative", boxShadow: plan.popular ? "0 0 50px rgba(232,0,111,0.18)" : "none", display: "flex", flexDirection: "column" }}>

            {/* Popular badge */}
            {plan.popular && (
              <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#e8006f,#ff4da6)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 14px", borderRadius: 999, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
                <TurkishEmblem size={12} /> MOST POPULAR <TurkishEmblem size={12} />
              </div>
            )}

            {/* Plan badge */}
            {plan.planBadge && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.25)", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 800, color: "#c8ff00" }}>{plan.planBadge}</span>
                <TurkishEmblem size={14} />
              </div>
            )}

            {/* Name */}
            <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.5, color: plan.id === "plus" ? "#c8ff00" : "#777", marginBottom: 3 }}>{plan.name}</div>
            <div style={{ fontSize: 11, color: "#4a4a6a", marginBottom: 14, lineHeight: 1.5 }}>{plan.subtitle}</div>

            {/* Price */}
            <div style={{ marginBottom: 6 }}>
              {!annual && plan.planBadge && <span style={{ fontSize: 16, color: "#444", textDecoration: "line-through", marginRight: 6 }}>€{plan.monthly}</span>}
              <span style={{ fontSize: 38, fontWeight: 950, letterSpacing: -2 }}>€{annual ? plan.annual : plan.monthly}</span>
              <span style={{ fontSize: 12, color: "#555" }}> /month, billed annually</span>
            </div>
            {annual && <div style={{ fontSize: 11, color: "#e8006f", marginBottom: 14 }}>Save €{plan.annualSave} compared to monthly</div>}

            {/* CTA */}
            <button style={{ width: "100%", background: plan.ctaBg, color: plan.ctaColor, border: plan.ctaBorder, borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer", marginBottom: 18, transition: "opacity .15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Get Plan
            </button>

            {/* Credits info */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a2a", borderRadius: 10, padding: "10px 12px", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <span style={{ color: "#e8006f" }}>⚡</span>
                <strong style={{ fontSize: 13, color: "#fff" }}>{plan.creditLine}</strong>
              </div>
              {plan.examples.map(ex => <div key={ex} style={{ fontSize: 11, color: "#555", paddingLeft: 18 }}>→ {ex}</div>)}
              <div style={{ fontSize: 10, color: "#444", paddingLeft: 18, marginTop: 4 }}>✓ {plan.fixedNote}</div>
            </div>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {plan.features.map(f => (
                <div key={f.label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Check ok={f.ok} />
                  <span style={{ fontSize: 11, color: f.ok ? "#bbb" : "#3a3a5a", lineHeight: 1.5 }}>{f.label}</span>
                </div>
              ))}
            </div>

            {/* Seedance */}
            <SectionLabel icon="⚡" label="SEEDANCE 2.0" />
            {plan.seedance.map(s => <RowItem key={s.label} label={s.label} access={s.access} />)}

            {/* 7-day unlimited */}
            <SectionLabel icon="🔒" label="7-DAY UNLIMITED" />
            {plan.unlimited7.map(u => <RowItem key={u.label} label={u.label} access={u.access} />)}

            {/* 365-day free gens */}
            <SectionLabel icon="🎁" label="365-DAY UNLIMITED & FREE GENS" />
            {plan.freeGens.map(g => <RowItem key={g.label} label={g.label} access={g.access} />)}
          </div>
        ))}

        {/* TEAMS CARD */}
        <div style={{ background: "#0a0a18", border: "1px solid #22223a", borderRadius: 20, padding: "22px 20px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ background: "rgba(232,0,111,0.12)", border: "1px solid rgba(232,0,111,0.25)", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 800, color: "#ff4da6" }}>30% OFF</span>
            <span style={{ background: "rgba(232,0,111,0.08)", border: "1px solid rgba(232,0,111,0.15)", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 800, color: "#e8006f" }}>BEST VALUE</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1.5, color: "#777", marginBottom: 3 }}>FOR TEAMS</div>
          <div style={{ fontSize: 11, color: "#4a4a6a", marginBottom: 14, lineHeight: 1.5 }}>For teams, businesses, and enterprises</div>
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 34, fontWeight: 950, letterSpacing: -1.5 }}>From €65</span>
            <span style={{ fontSize: 12, color: "#555" }}> /seat/mo, billed annually</span>
          </div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 14 }}>Flexible billing tailored to your team</div>
          <button style={{ width: "100%", background: "linear-gradient(135deg,#1a1a3a,#0d0d22)", color: "#fff", border: "1px solid #3a3a6a", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 800, cursor: "pointer", marginBottom: 18 }}>
            Explore Plans
          </button>

          {/* Shared workspace */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1a1a2a", borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#555", letterSpacing: 1, marginBottom: 6 }}>👥 SHARED WORKSPACE & CREDITS</div>
            {["from 2 seats per workspace", "unlimited credits/mo pooled", "Starting from 1,000 credits/seat/mo"].map(t => (
              <div key={t} style={{ fontSize: 11, color: "#777", marginBottom: 3 }}>✓ {t}</div>
            ))}
          </div>

          {[
            { icon: "✓", label: "Access to all models & features" },
            { icon: "✓", label: "Access to Seedance 2.0" },
            { icon: "✓", label: "Access to Supercomputer" },
            { icon: "✓", label: "Early access to advanced AI features" },
            { icon: "✓", label: "Lowest cost per credit" },
          ].map(f => (
            <div key={f.label} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ color: "#e8006f", fontSize: 12 }}>{f.icon}</span>
              <span style={{ fontSize: 11, color: "#bbb" }}>{f.label}</span>
            </div>
          ))}

          <SectionLabel icon="🏢" label="WORKSPACE & COLLABORATION" />
          {["Shareable elements and Soul ID", "Shared workspace & projects with integrated chats", "Custom credits amount", "Unlimited members", "Admin control of workspace"].map(t => (
            <div key={t} style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>✓ {t}</div>
          ))}

          <SectionLabel icon="🔐" label="SECURITY & COMPLIANCE" />
          {["SOC 2 security", "Custom SSO access", "Retain rights to use, edit & publish generations", "No training clause", "Indemnification"].map(t => (
            <div key={t} style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>✓ {t}</div>
          ))}

          <SectionLabel icon="⭐" label="PERSONALIZED EXPERIENCE" />
          {["Dedicated capacity (SLA)", "Higher concurrency", "Priority queue", "Detailed analytics", "Automated billing invoice", "Personal Stack Support", "AI Educator", "Volume based discounts"].map(t => (
            <div key={t} style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>✓ {t}</div>
          ))}
        </div>
      </div>

      {/* COMPARE PLANS */}
      <div style={{ textAlign: "center", padding: "64px 20px 20px" }}>
        <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 950, letterSpacing: -2, margin: 0 }}>COMPARE PLANS</h2>
      </div>

      {/* Footer note */}
      <div style={{ maxWidth: 780, margin: "40px auto 0", padding: "0 20px", textAlign: "center", fontSize: 11, color: "#3a3a5a", lineHeight: 1.8 }}>
        <p>Note: Unlimited models and Free Generations are accessible only via lumenfield.ai and are not accessible on MCP/CLI, Canvas or Supercomputer.</p>
        <p>Prices exclude VAT and local taxes, calculated at checkout. Unlimited usage may be subject to dynamic speed adjustments during high traffic periods.</p>
        <p>Access to new models and advanced features may be done on a rolling basis and not available to all users at launch.</p>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 560, margin: "56px auto 0", padding: "36px 20px", textAlign: "center", background: "linear-gradient(135deg,rgba(232,0,111,0.08),rgba(156,0,74,0.04))", border: "1px solid rgba(232,0,111,0.18)", borderRadius: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#e8006f,transparent)" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <TurkishEmblem size={36} />
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 950, letterSpacing: -1, margin: "0 0 8px" }}>Ready to generate the impossible?</h2>
        <p style={{ color: "#666", fontSize: 13, margin: "0 0 22px" }}>Join 2 million creators. No credit card required.</p>
        <a href="/sign-up" style={{ display: "inline-block", background: "linear-gradient(135deg,#e8006f,#9c004a)", color: "#fff", borderRadius: 11, padding: "13px 34px", fontSize: 14, fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 28px rgba(232,0,111,0.35)" }}>
          Start for Free →
        </a>
      </div>
    </div>
  );
}
