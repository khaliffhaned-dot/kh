import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  padding = "22px",
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div className={`rounded-xl border border-[#E3DFD3] bg-white ${className}`} style={{ padding }}>
      {children}
    </div>
  );
}

export function PanelTitle({ children }: { children: ReactNode }) {
  return <div className="mb-3.5 text-[13.5px] font-semibold text-[#0F2A44]">{children}</div>;
}

export function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-[#F0EEE7]">
      <div
        className="h-1.5 rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color }}
      />
    </div>
  );
}

export function LabeledBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-0.5 flex justify-between text-[11.5px] text-[#5B6672]">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <Bar pct={pct} color={color} />
    </div>
  );
}

export function SentimentSplitBar({
  positive,
  neutral,
  negative,
}: {
  positive: number;
  neutral: number;
  negative: number;
}) {
  return (
    <div className="flex h-2 overflow-hidden rounded-full">
      <div style={{ width: `${positive}%`, background: "#2E8B57" }} />
      <div style={{ width: `${neutral}%`, background: "#96917F" }} />
      <div style={{ width: `${negative}%`, background: "#C1443C" }} />
    </div>
  );
}
