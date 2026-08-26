"use client";

import { useMemo, useState } from "react";
import { FEED_ITEMS, PLATFORM_FILTERS, SENTIMENT_COLORS, SENTIMENT_FILTERS } from "../data";
import type { PlatformKey, SentimentKey } from "../types";

function chipClass(active: boolean) {
  return `whitespace-nowrap rounded-full px-3.5 py-[7px] text-[12.5px] font-medium transition-colors ${
    active ? "border border-[#0F2A44] bg-[#0F2A44] text-white" : "border border-[#E3DFD3] bg-white text-[#5B6672]"
  }`;
}

export function FeedModule() {
  const [platform, setPlatform] = useState<PlatformKey>("all");
  const [sentiment, setSentiment] = useState<SentimentKey | "all">("all");

  const filtered = useMemo(
    () =>
      FEED_ITEMS.filter((item) => platform === "all" || item.platformKey === platform).filter(
        (item) => sentiment === "all" || item.sentimentKey === sentiment
      ),
    [platform, sentiment]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {PLATFORM_FILTERS.map((p) => (
          <button key={p.value} type="button" className={chipClass(p.value === platform)} onClick={() => setPlatform(p.value)}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-b border-[#E3DFD3] pb-1">
        {SENTIMENT_FILTERS.map((s) => (
          <button key={s.value} type="button" className={chipClass(s.value === sentiment)} onClick={() => setSentiment(s.value)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-[#5B6672]">{filtered.length} mentions matching filters</div>
      <div className="flex flex-col gap-2.5">
        {filtered.map((item, i) => {
          const colors = SENTIMENT_COLORS[item.sentimentKey];
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-[#E3DFD3] bg-white px-5 py-4"
            >
              <div className="w-[74px] flex-none text-[11.5px] font-semibold text-[#0F2A44]">
                {item.platform}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[12.5px] font-semibold text-[#12202E]">{item.handle}</span>
                  <span className="rounded-[5px] bg-[#F0EEE7] px-1.5 py-px text-[10px] text-[#5B6672]">
                    {item.language}
                  </span>
                  <span className="text-[10.5px] text-[#96917F]">{item.timeAgo}</span>
                </div>
                <div className="text-[13px] leading-[1.5] text-[#12202E]">{item.text}</div>
                <div className="mt-1.5 text-[11px] text-[#5B6672]">{item.metric}</div>
              </div>
              <div
                className="flex-none rounded-full px-2.5 py-1 text-[10.5px] font-semibold"
                style={{ color: colors.color, background: colors.bg }}
              >
                {item.sentimentLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
