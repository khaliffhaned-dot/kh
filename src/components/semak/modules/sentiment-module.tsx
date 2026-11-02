import { NEGATIVE_DRIVERS, POSITIVE_DRIVERS, SENTIMENT_BY_LANGUAGE, SENTIMENT_BY_PLATFORM } from "../data";
import { Panel, PanelTitle, SentimentSplitBar } from "../ui";

function BreakdownList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; positive: number; neutral: number; negative: number }[];
}) {
  return (
    <Panel>
      <PanelTitle>{title}</PanelTitle>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 text-[11.5px] text-[#5B6672]">{row.label}</div>
            <SentimentSplitBar positive={row.positive} neutral={row.neutral} negative={row.negative} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function SentimentModule() {
  return (
    <div className="flex flex-col gap-[18px]">
      <Panel>
        <PanelTitle>Sentiment trend — last 14 days</PanelTitle>
        <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
          <polyline
            points="0,40 43,42 86,38 129,34 172,36 215,30 258,28 301,24 344,22 387,20 430,18 473,16 516,14 560,12"
            fill="none"
            stroke="#2E8B57"
            strokeWidth="2.2"
          />
          <polyline
            points="0,80 43,82 86,84 129,82 172,86 215,84 258,88 301,86 344,90 387,92 430,90 473,94 516,92 560,96"
            fill="none"
            stroke="#96917F"
            strokeWidth="2.2"
          />
          <polyline
            points="0,116 43,110 86,112 129,108 172,100 215,104 258,96 301,98 344,90 387,88 430,92 473,84 516,86 560,80"
            fill="none"
            stroke="#C1443C"
            strokeWidth="2.2"
          />
        </svg>
        <div className="mt-2.5 flex gap-[18px] text-[11.5px] text-[#5B6672]">
          <div className="flex items-center gap-1.5">
            <div className="h-[2.5px] w-[9px] bg-[#2E8B57]" />
            Positive
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-[2.5px] w-[9px] bg-[#96917F]" />
            Neutral
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-[2.5px] w-[9px] bg-[#C1443C]" />
            Negative
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-[18px]">
        <BreakdownList title="Sentiment by platform" rows={SENTIMENT_BY_PLATFORM} />
        <BreakdownList title="Sentiment by language" rows={SENTIMENT_BY_LANGUAGE} />
      </div>

      <div className="grid grid-cols-2 gap-[18px]">
        <Panel>
          <div className="mb-2.5 text-[13.5px] font-semibold text-[#0F2A44]">Top positive drivers</div>
          <div className="flex flex-col gap-2 text-[12.5px] text-[#12202E]">
            {POSITIVE_DRIVERS.map((d, i) => (
              <div key={d}>
                {i + 1}. {d}
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <div className="mb-2.5 text-[13.5px] font-semibold text-[#0F2A44]">Top negative drivers</div>
          <div className="flex flex-col gap-2 text-[12.5px] text-[#12202E]">
            {NEGATIVE_DRIVERS.map((d, i) => (
              <div key={d}>
                {i + 1}. {d}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
