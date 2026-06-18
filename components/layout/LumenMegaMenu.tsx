"use client";

import type { CSSProperties } from "react";
import {
  audioFeatures,
  audioModels,
  exploreProducts,
  imageFeatures,
  imageModels,
  trendingTools,
  videoFeatures,
  videoModels,
  type LumenFeature,
  type LumenModel,
} from "@/lib/lumen/modelCatalog";

type MenuKind = "explore" | "image" | "video" | "audio";

type LumenMegaMenuProps = {
  kind: MenuKind;
};

type BadgeValue = "NEW" | "TOP" | "TRENDING" | "EXCLUSIVE" | undefined;

function Badge({ value }: { value: BadgeValue }) {
  if (!value) return null;
  return <span style={value === "TRENDING" ? styles.hotBadge : styles.badge}>{value}</span>;
}

function FeatureRow({ item }: { item: LumenFeature }) {
  return (
    <div style={styles.row}>
      <div style={styles.icon}>{item.icon}<Badge value={item.badge} /></div>
      <div><strong style={styles.rowTitle}>{item.title}</strong><p style={styles.rowDesc}>{item.desc}</p></div>
    </div>
  );
}

function ModelRow({ item }: { item: LumenModel }) {
  return (
    <div style={styles.row}>
      <div style={styles.icon}>{item.icon}<Badge value={item.badge} /></div>
      <div><strong style={styles.rowTitle}>{item.name}</strong><p style={styles.rowDesc}>{item.desc}</p></div>
    </div>
  );
}

function getMenuData(kind: MenuKind) {
  if (kind === "image") return { features: imageFeatures, models: imageModels };
  if (kind === "video") return { features: videoFeatures, models: videoModels };
  return { features: audioFeatures, models: audioModels };
}

export default function LumenMegaMenu({ kind }: LumenMegaMenuProps) {
  if (kind === "explore") {
    return (
      <div style={styles.explorePanel}>
        <div style={styles.search}>Search models, products, apps and creators</div>
        <div style={styles.tabs}><b>All</b><span>Models</span><span>Products</span><span>Characters</span><span>Community</span><span>Apps</span></div>
        <p style={styles.sectionLabel}>Popular products</p>
        <div style={styles.productGrid}>{exploreProducts.map((item) => <div key={item.title} style={styles.productCard}><div><small>{item.badge}</small><h3 style={styles.productTitle}>{item.title}</h3><p style={styles.productDesc}>{item.desc}</p></div></div>)}</div>
        <p style={styles.sectionLabel}>Trending</p>
        <div style={styles.trendingGrid}>{trendingTools.map((item) => <FeatureRow key={item.title} item={item} />)}</div>
      </div>
    );
  }

  const { features, models } = getMenuData(kind);

  return (
    <div style={styles.panel}>
      <div><p style={styles.sectionLabel}>Features</p>{features.map((item) => <FeatureRow key={item.title} item={item} />)}</div>
      <div><p style={styles.sectionLabel}>Models</p>{models.map((item) => <ModelRow key={item.name} item={item} />)}</div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  panel: { position: "absolute", top: 42, left: 0, zIndex: 40, width: 860, maxHeight: "calc(100vh - 70px)", overflow: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, padding: 22, borderRadius: 24, background: "#1b1d1f", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 24px 90px rgba(0,0,0,.55)" },
  explorePanel: { position: "absolute", top: 42, left: 0, zIndex: 40, width: 860, padding: 18, borderRadius: 24, background: "#282421", border: "1px solid rgba(255,255,255,.09)", boxShadow: "0 24px 90px rgba(0,0,0,.55)" },
  search: { height: 58, display: "flex", alignItems: "center", padding: "0 18px", borderRadius: 20, background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.45)", fontSize: 18, marginBottom: 12 },
  tabs: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18, color: "rgba(255,255,255,.62)", fontSize: 14 },
  sectionLabel: { margin: "0 0 12px", color: "rgba(255,255,255,.42)", fontSize: 14 },
  row: { display: "grid", gridTemplateColumns: "50px 1fr", alignItems: "center", gap: 12, minHeight: 64, marginBottom: 10 },
  icon: { position: "relative", width: 50, height: 50, borderRadius: 14, background: "rgba(255,255,255,.06)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 950, fontSize: 11 },
  rowTitle: { display: "block", color: "#fff", fontSize: 15, marginBottom: 4 },
  rowDesc: { margin: 0, color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.35 },
  badge: { position: "absolute", top: -8, right: -10, background: "#d7ff1f", color: "#111", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 950 },
  hotBadge: { position: "absolute", top: -8, right: -14, background: "#ff2c91", color: "#fff", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 950 },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 },
  productCard: { minHeight: 106, display: "flex", alignItems: "end", padding: 14, borderRadius: 14, background: "linear-gradient(135deg, rgba(215,255,31,.16), rgba(255,44,145,.18))", border: "1px solid rgba(255,255,255,.08)" },
  productTitle: { margin: "4px 0", fontSize: 15, color: "#fff" },
  productDesc: { margin: 0, color: "rgba(255,255,255,.5)", fontSize: 12, lineHeight: 1.35 },
  trendingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 18 },
};
