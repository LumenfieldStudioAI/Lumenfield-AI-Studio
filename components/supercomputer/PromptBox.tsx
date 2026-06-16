"use client";

type PromptBoxProps = {
  prompt: string;
  mode: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onSubmit: () => void;
};

export default function PromptBox({
  prompt,
  mode,
  loading,
  onPromptChange,
  onModeChange,
  onSubmit,
}: PromptBoxProps) {
  return (
    <div style={styles.promptBox}>
      <button style={styles.plusButton} type="button">+</button>
      <div style={styles.modelBadge}>◆ Lumenfield Creative 3.5</div>
      <input
        style={styles.promptInput}
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        placeholder="Describe what you want to create..."
      />
      <select style={styles.modeSelect} value={mode} onChange={(event) => onModeChange(event.target.value)}>
        <option value="image">Image</option>
        <option value="video">Video</option>
        <option value="product">Product</option>
        <option value="apps">Apps</option>
      </select>
      <button style={styles.sendButton} onClick={onSubmit} disabled={loading} type="button">
        {loading ? "…" : "↑"}
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  promptBox: {
    width: "min(880px, 94%)",
    minHeight: 92,
    margin: "34px auto 18px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 16px",
    borderRadius: 24,
    background: "#1d1d1c",
    border: "2px solid rgba(255,255,255,.16)",
    boxShadow: "0 22px 80px rgba(0,0,0,.45)",
  },
  plusButton: {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: 0,
    background: "#303030",
    color: "#fff",
    fontSize: 22,
  },
  modelBadge: {
    fontSize: 13,
    color: "#fff",
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  promptInput: {
    flex: 1,
    minWidth: 120,
    border: 0,
    outline: 0,
    background: "transparent",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
  },
  modeSelect: {
    border: 0,
    background: "#272727",
    color: "#fff",
    borderRadius: 999,
    padding: "9px 10px",
    fontWeight: 800,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    border: 0,
    background: "#d7ff1f",
    color: "#111",
    fontWeight: 900,
    fontSize: 20,
    cursor: "pointer",
  },
};
