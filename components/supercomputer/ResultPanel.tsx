"use client";

type ResultPanelProps = {
  text?: string;
  imageUrl?: string;
};

export default function ResultPanel({ text, imageUrl }: ResultPanelProps) {
  if (!text && !imageUrl) return null;

  return (
    <section style={styles.resultBox}>
      {imageUrl && <img src={imageUrl} alt="Generated result" style={styles.resultImage} />}
      {text && <pre style={styles.resultText}>{text}</pre>}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  resultBox: {
    width: "min(1020px, 100%)",
    margin: "18px auto",
    padding: 18,
    borderRadius: 18,
    background: "#1d1d20",
    color: "#d7ff1f",
    border: "1px solid #28282d",
  },
  resultText: {
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "#d7ff1f",
  },
  resultImage: {
    display: "block",
    width: "100%",
    maxHeight: 640,
    objectFit: "contain",
    borderRadius: 16,
    marginBottom: 14,
  },
};
