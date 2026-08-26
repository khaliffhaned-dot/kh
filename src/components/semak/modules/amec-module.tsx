import { AMEC_COLUMNS } from "../data";

export function AmecModule() {
  return (
    <div className="flex flex-col gap-[18px]">
      <div className="rounded-xl border border-[#CFE6E4] bg-[#EFF6F5] px-5 py-3.5 text-[12.5px] text-[#0E5C5B]">
        Aligned to the AMEC Integrated Evaluation Framework &amp; Barcelona Principles 3.0 — measurement is
        mapped to business objectives; no Advertising Value Equivalency (AVE) is used.
      </div>

      <div className="grid grid-cols-5 gap-3.5">
        {AMEC_COLUMNS.map((col) => (
          <div key={col.label} className="rounded-xl border border-[#E3DFD3] bg-white p-[18px]">
            <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#B9862F]">
              {col.label}
            </div>
            <div className="flex flex-col gap-1 text-xs leading-[1.6] text-[#12202E]">
              {col.body.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#E3DFD3] bg-white px-5 py-4">
        <div className="text-[12.5px] text-[#5B6672]">
          Report period: 15 Jan – 14 Feb 2026 · Generated for client review
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#0F2A44] px-[18px] py-2.5 text-[12.5px] font-semibold text-white"
        >
          Export report
        </button>
      </div>
    </div>
  );
}
