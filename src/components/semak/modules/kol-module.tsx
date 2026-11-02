import { KOL_ROWS } from "../data";

const COLUMNS = "grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr]";

export function KolModule() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E3DFD3] bg-white">
      <div
        className={`${COLUMNS} bg-[#F5F3EE] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#5B6672]`}
      >
        <div>KOL / Handle</div>
        <div>Platform</div>
        <div>Followers</div>
        <div>Engagement</div>
        <div>Sentiment</div>
        <div>Language</div>
        <div>Last mention</div>
      </div>
      {KOL_ROWS.map((row) => (
        <div
          key={row.name}
          className={`${COLUMNS} items-center border-t border-[#EDEAE0] px-5 py-3.5 text-[12.5px]`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F2A44] text-[11px] font-semibold text-white">
              {row.initials}
            </div>
            {row.name}
          </div>
          <div>{row.platform}</div>
          <div>{row.followers}</div>
          <div>{row.engagement}</div>
          <div
            className="font-semibold"
            style={{ color: row.sentiment === "Positive" ? "#2E8B57" : "#96917F" }}
          >
            {row.sentiment}
          </div>
          <div>{row.language}</div>
          <div>{row.lastMention}</div>
        </div>
      ))}
    </div>
  );
}
