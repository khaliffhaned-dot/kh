"use client";

import type { ModuleId } from "./types";
import {
  AmecIcon,
  CompetitorIcon,
  CrisisIcon,
  FeedIcon,
  KolIcon,
  MediaIcon,
  OverviewIcon,
  RoiIcon,
  SentimentIcon,
} from "./icons";

const NAV_ITEMS: { id: ModuleId; label: string; icon: JSX.Element }[] = [
  { id: "overview", label: "Overview", icon: <OverviewIcon /> },
  { id: "feed", label: "Media & Social Listening", icon: <FeedIcon /> },
  { id: "sentiment", label: "Sentiment Analysis", icon: <SentimentIcon /> },
  { id: "amec", label: "AMEC ROI Reporting", icon: <AmecIcon /> },
  { id: "roi", label: "PR Value & ROI Calculator", icon: <RoiIcon /> },
  { id: "kol", label: "Influencer & KOL Tracking", icon: <KolIcon /> },
  { id: "crisis", label: "Crisis & Spike Alerts", icon: <CrisisIcon /> },
  { id: "competitor", label: "Competitor Benchmarking", icon: <CompetitorIcon /> },
  { id: "media", label: "Journalist & Media Contacts", icon: <MediaIcon /> },
];

export function SemakSidebar({
  activeModule,
  onNavigate,
}: {
  activeModule: ModuleId;
  onNavigate: (module: ModuleId) => void;
}) {
  return (
    <div className="flex w-[250px] flex-none flex-col gap-[22px] bg-[#0F2A44] p-[22px_14px] text-[#B7C4D1]">
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#B9862F] font-[family-name:var(--font-space-grotesk)] text-[15px] font-bold text-[#0F2A44]">
          S
        </div>
        <div>
          <div className="font-[family-name:var(--font-space-grotesk)] text-base font-bold tracking-[0.3px] text-white">
            SEMAK
          </div>
          <div className="text-[10px] tracking-[0.4px] text-[#7E92A6]">PR INTELLIGENCE SUITE</div>
        </div>
      </div>

      <nav className="flex flex-col gap-[3px]">
        {NAV_ITEMS.map((item) => {
          const active = item.id === activeModule;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-[13.5px] transition-colors"
              style={{
                fontWeight: active ? 600 : 500,
                background: active ? "#1D4A73" : "transparent",
                color: active ? "#FFFFFF" : "#B7C4D1",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3.5">
        <div className="rounded-lg bg-white/[0.06] p-2.5 text-[11px] leading-[1.5] text-[#9FB0C0]">
          AMEC Barcelona Principles 3.0 aligned — no AVE reporting.
        </div>
        <div className="flex items-center gap-2.5 border-t border-white/10 px-2 pt-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16395C] text-xs font-semibold text-white">
            AR
          </div>
          <div>
            <div className="text-[12.5px] font-semibold text-white">Aiman Rahman</div>
            <div className="text-[10.5px] text-[#7E92A6]">PR Analyst · Kuala Lumpur</div>
          </div>
        </div>
      </div>
    </div>
  );
}
