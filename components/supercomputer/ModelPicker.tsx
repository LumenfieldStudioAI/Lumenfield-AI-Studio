"use client";

type ModelPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const models = [
  { id: "flux", label: "FLUX Pro" },
  { id: "nano-banana", label: "Nano Banana" },
  { id: "seedance", label: "Seedance" },
  { id: "creative35", label: "Lumenfield Creative 3.5" },
];

export default function ModelPicker({ value, onChange }: ModelPickerProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.select}
    >
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.label}
        </option>
      ))}
    </select>
  );
}

const styles: Record<string, React.CSSProperties> = {
  select: {
    border: 0,
    background: "#272727",
    color: "#fff",
    borderRadius: 999,
    padding: "10px 12px",
    fontWeight: 800,
  },
};
