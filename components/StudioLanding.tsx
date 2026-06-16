"use client";

import Link from "next/link";
import { useState } from "react";

import Header, { HeaderLocale, HeaderNavId } from "@/components/Header";

type Feature = { title: string; desc: string };

const navLabels: Record<HeaderNavId, string> = {
  explore: "Explore",
  image: "Image",
  video: "Video",
  audio: "Audio",
  supercomputer: "Supercomputer",
  mcp: "MCP & CLI",
  collab: "Collab",
  plugins: "Plugins",
  marketing: "Marketing Studio",
  cinema: "Cinema Studio",
  influencer: "AI Influencer",
  canvas: "Canvas",
  apps: "Apps",
};

type StudioLandingProps = {
  activeNav?: HeaderNavId;
  ctaHref?: string;
  ctaLabel?: string;
  eyebrow: string;
  features: Feature[];
  tagline: string;
  title: string;
};

export default function StudioLanding({
  activeNav = "explore",
  ctaHref = "/generate",
  ctaLabel = "Start creating",
  eyebrow,
  features,
  tagline,
  title,
}: StudioLandingProps) {
  const [locale, setLocale] = useState<HeaderLocale>("en");
  const [nav, setNav] = useState<HeaderNavId>(activeNav);

  return (
    <main className="min-h-screen bg-[#0a0b0d] text-white">
      <Header
        activeNav={nav}
        launchLabel="Launch studio"
        locale={locale}
        loginLabel="Sign in"
        navLabels={navLabels}
        newLabel="New"
        setActiveNav={setNav}
        setLocale={setLocale}
      />

      <section className="mx-auto max-w-[1180px] px-5 py-16 lg:py-20">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#c9ff5d]">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
          {tagline}
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-[#c9ff5d] px-5 py-3 text-sm font-black text-[#10130b]"
          href={ctaHref}
        >
          {ctaLabel}
        </Link>
      </section>

      <section className="mx-auto grid max-w-[1180px] grid-cols-1 gap-4 px-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            className="rounded-lg border border-white/10 bg-white/[0.055] p-5"
            key={feature.title}
          >
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{feature.desc}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
