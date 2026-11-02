import { COMPETITOR_SHARE_OF_VOICE, COMPETITOR_TABLE } from "../data";
import { Panel, PanelTitle } from "../ui";

const COLUMNS = "grid grid-cols-[2fr_1fr_1fr_1fr]";

export function CompetitorModule() {
  return (
    <div className="flex flex-col gap-[18px]">
      <Panel>
        <PanelTitle>Share of voice vs. tracked events</PanelTitle>
        <div className="flex flex-col gap-[18px]">
          {COMPETITOR_SHARE_OF_VOICE.map((row) => (
            <div key={row.label}>
              <div className="mb-1.5 flex justify-between gap-3 text-xs text-[#12202E]">
                <span className="whitespace-nowrap">{row.label}</span>
                <span className="whitespace-nowrap font-semibold">{row.pct}%</span>
              </div>
              <div className="h-[9px] rounded-full bg-[#F0EEE7]">
                <div
                  className="h-[9px] rounded-full"
                  style={{ width: `${row.pct}%`, background: row.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="overflow-hidden rounded-xl border border-[#E3DFD3] bg-white">
        <div
          className={`${COLUMNS} bg-[#F5F3EE] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#5B6672]`}
        >
          <div>Event</div>
          <div>Mentions</div>
          <div>Positive %</div>
          <div>Reach</div>
        </div>
        {COMPETITOR_TABLE.map((row) => (
          <div
            key={row.event}
            className={`${COLUMNS} border-t border-[#EDEAE0] px-5 py-3.5 text-[12.5px]`}
            style={row.highlight ? { fontWeight: 600, color: "#0F2A44" } : { color: "#12202E" }}
          >
            <div>{row.event}</div>
            <div>{row.mentions}</div>
            <div>{row.positivePct}</div>
            <div>{row.reach}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
