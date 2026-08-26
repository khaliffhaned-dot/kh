import { FEED_ITEMS, LANGUAGE_MIX, PLATFORM_MIX } from "../data";
import { LabeledBar, Panel, PanelTitle } from "../ui";
import type { ModuleId } from "../types";

const METRICS = [
  { label: "Total Mentions", value: "18,420", delta: "▲ 12% vs prior period", deltaColor: "#2E8B57" },
  { label: "Total Reach", value: "42.6M", delta: "▲ 8% vs prior period", deltaColor: "#2E8B57" },
  { label: "Engagement", value: "1.28M", delta: "▲ 15% vs prior period", deltaColor: "#2E8B57" },
  { label: "Share of Voice", value: "34%", delta: "vs. 3 tracked competitor events", deltaColor: "#5B6672" },
];

export function OverviewModule({ onNavigate }: { onNavigate: (module: ModuleId) => void }) {
  const previewItems = [FEED_ITEMS[0], FEED_ITEMS[2], FEED_ITEMS[1]];

  return (
    <div className="flex flex-col gap-[22px]">
      <div className="grid grid-cols-4 gap-[18px]">
        {METRICS.map((m) => (
          <Panel key={m.label} className="p-5">
            <div className="text-[11px] uppercase tracking-[0.5px] text-[#5B6672]">{m.label}</div>
            <div className="mt-1.5 font-[family-name:var(--font-space-grotesk)] text-[30px] font-bold text-[#0F2A44]">
              {m.value}
            </div>
            <div className="mt-1.5 text-[11.5px] font-semibold" style={{ color: m.deltaColor }}>
              {m.delta}
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-[18px]">
        <Panel>
          <PanelTitle>Mentions volume — last 14 days</PanelTitle>
          <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
            <polyline
              points="0,110 43,102 86,96 129,88 172,80 215,70 258,60 301,53 344,40 387,32 430,24 473,16 516,10 560,4"
              fill="none"
              stroke="#0E7C7B"
              strokeWidth="2.5"
            />
            <polygon
              points="0,110 43,102 86,96 129,88 172,80 215,70 258,60 301,53 344,40 387,32 430,24 473,16 516,10 560,4 560,140 0,140"
              fill="#0E7C7B"
              opacity="0.08"
            />
            <circle cx="560" cy="4" r="4.5" fill="#0E7C7B" />
          </svg>
        </Panel>
        <Panel>
          <PanelTitle>Sentiment split</PanelTitle>
          <div className="flex items-center gap-5">
            <div
              className="h-24 w-24 flex-none rounded-full"
              style={{
                background:
                  "conic-gradient(#2E8B57 0% 68%, #96917F 68% 92%, #C1443C 92% 100%)",
              }}
            />
            <div className="flex flex-col gap-2 text-[12.5px]">
              <div className="flex items-center gap-2">
                <div className="h-[9px] w-[9px] rounded-sm bg-[#2E8B57]" />
                Positive — 68%
              </div>
              <div className="flex items-center gap-2">
                <div className="h-[9px] w-[9px] rounded-sm bg-[#96917F]" />
                Neutral — 24%
              </div>
              <div className="flex items-center gap-2">
                <div className="h-[9px] w-[9px] rounded-sm bg-[#C1443C]" />
                Negative — 8%
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-[18px]">
        <Panel>
          <PanelTitle>Language mix</PanelTitle>
          <div className="flex flex-col gap-2.5">
            {LANGUAGE_MIX.map((l) => (
              <LabeledBar key={l.label} label={l.label} pct={l.pct} color={l.color} />
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle>Platform mix</PanelTitle>
          <div className="flex flex-col gap-2.5">
            {PLATFORM_MIX.map((p) => (
              <LabeledBar key={p.label} label={p.label} pct={p.pct} color="#0F2A44" />
            ))}
          </div>
        </Panel>
        <Panel className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-[13.5px] font-semibold text-[#0F2A44]">Latest mentions</div>
            <button
              type="button"
              onClick={() => onNavigate("feed")}
              className="text-[11.5px] text-[#0E7C7B] hover:text-[#0a5f5e]"
            >
              View all →
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {previewItems.map((item, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span
                  className="flex-none text-[11px] font-semibold"
                  style={{ color: item.sentimentKey === "negative" ? "#C1443C" : "#0E7C7B" }}
                >
                  {item.platform}
                </span>
                <span className="text-xs leading-[1.4] text-[#12202E]">{item.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#F0C7C1] bg-[#FBEAE8] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#C1443C]" />
          <div className="text-[13px] text-[#12202E]">
            <b>1 high-severity alert</b> — negative sentiment spike on X regarding registration queue
            delays.
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("crisis")}
          className="text-xs font-semibold text-[#0E7C7B] hover:text-[#0a5f5e]"
        >
          Review alert →
        </button>
      </div>
    </div>
  );
}
