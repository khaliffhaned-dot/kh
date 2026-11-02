"use client";

import { useMemo, useState } from "react";
import { Bar, Panel } from "../ui";

function computeScore(investment: number, placements: number, engagement: number, objective: number) {
  const placementsPct = Math.min(placements / 120, 1) * 100;
  const engagementPct = Math.min(engagement / 8, 1) * 100;
  const placementsScore = placementsPct * 0.35;
  const engagementScore = engagementPct * 0.3;
  const objectiveScore = objective * 0.35;
  const totalScore = Math.max(0, Math.min(100, Math.round(placementsScore + engagementScore + objectiveScore)));

  let descriptor = "Developing";
  let descColor = "#C1443C";
  if (totalScore >= 90) {
    descriptor = "Exceptional";
    descColor = "#2E8B57";
  } else if (totalScore >= 75) {
    descriptor = "Strong";
    descColor = "#2E8B57";
  } else if (totalScore >= 50) {
    descriptor = "Solid";
    descColor = "#B9862F";
  }

  return { placementsPct, engagementPct, totalScore, descriptor, descColor };
}

export function RoiModule({ defaultInvestment = 450000 }: { defaultInvestment?: number }) {
  const [investment, setInvestment] = useState(defaultInvestment);
  const [placements, setPlacements] = useState(86);
  const [engagement, setEngagement] = useState(4.2);
  const [objective, setObjective] = useState(78);

  const { placementsPct, engagementPct, totalScore, descriptor, descColor } = useMemo(
    () => computeScore(investment, placements, engagement, objective),
    [investment, placements, engagement, objective]
  );

  const investmentFmt = `RM ${investment.toLocaleString("en-MY")}`;

  return (
    <div className="grid grid-cols-2 items-start gap-[18px]">
      <Panel className="flex flex-col gap-[18px]" padding="24px">
        <div className="text-[13.5px] font-semibold text-[#0F2A44]">Campaign inputs</div>
        <div>
          <div className="mb-1.5 text-[11.5px] text-[#5B6672]">Campaign investment (RM)</div>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-[#E3DFD3] px-3 py-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[13px]"
          />
        </div>
        <div>
          <div className="mb-1.5 text-[11.5px] text-[#5B6672]">Media placements secured</div>
          <input
            type="number"
            value={placements}
            onChange={(e) => setPlacements(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-[#E3DFD3] px-3 py-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[13px]"
          />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-[11.5px] text-[#5B6672]">
            <span>Average engagement rate</span>
            <span>{engagement}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={8}
            step={0.1}
            value={engagement}
            onChange={(e) => setEngagement(Number(e.target.value))}
            className="w-full accent-[#0F2A44]"
          />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between text-[11.5px] text-[#5B6672]">
            <span>Objective achievement</span>
            <span>{objective}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={objective}
            onChange={(e) => setObjective(Number(e.target.value))}
            className="w-full accent-[#0F2A44]"
          />
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel className="text-center" padding="24px">
          <div className="text-[11.5px] uppercase tracking-[0.5px] text-[#5B6672]">
            Outcome-based value score
          </div>
          <div className="my-2 font-[family-name:var(--font-space-grotesk)] text-[52px] font-bold text-[#0F2A44]">
            {totalScore}
          </div>
          <div
            className="inline-block rounded-full bg-[#F5F3EE] px-3.5 py-1.5 text-xs font-semibold"
            style={{ color: descColor }}
          >
            {descriptor}
          </div>
          <div className="mt-[18px] flex flex-col gap-2 text-left">
            <div>
              <div className="mb-0.5 text-[11px] text-[#5B6672]">Placements</div>
              <Bar pct={placementsPct} color="#0E7C7B" />
            </div>
            <div>
              <div className="mb-0.5 text-[11px] text-[#5B6672]">Engagement</div>
              <Bar pct={engagementPct} color="#0E7C7B" />
            </div>
            <div>
              <div className="mb-0.5 text-[11px] text-[#5B6672]">Objective achievement</div>
              <Bar pct={objective} color="#0E7C7B" />
            </div>
          </div>
        </Panel>

        <div className="rounded-xl border border-dashed border-[#C9C4B5] bg-[#F5F3EE] px-5 py-4">
          <div className="mb-1 text-[11px] uppercase tracking-[0.4px] text-[#5B6672]">
            For reference only — legacy method
          </div>
          <div className="text-[13px] text-[#8A8578]">
            <span className="line-through">Advertising Value Equivalency: RM 1,240,000</span> — AMEC
            discourages AVE; shown only to illustrate why outcome-based value on {investmentFmt} invested is
            the preferred metric.
          </div>
        </div>
      </div>
    </div>
  );
}
