import { MODULE_META } from "./data";
import type { ModuleId } from "./types";
import { BellIcon } from "./icons";

export function SemakTopbar({ activeModule }: { activeModule: ModuleId }) {
  const { title, subtitle } = MODULE_META[activeModule];
  return (
    <div className="flex h-[72px] flex-none items-center justify-between border-b border-[#E3DFD3] bg-white px-8">
      <div>
        <div className="font-[family-name:var(--font-space-grotesk)] text-[19px] font-bold text-[#0F2A44]">
          {title}
        </div>
        <div className="mt-0.5 text-[12.5px] text-[#5B6672]">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full border border-[#E3DFD3] bg-[#F5F3EE] px-3.5 py-1.5 text-[11.5px] text-[#5B6672]">
          Global PR Conference &amp; Festival 2025 · KL
        </div>
        <div className="rounded-full border border-[#E3DFD3] bg-[#F5F3EE] px-3.5 py-1.5 text-[11.5px] text-[#5B6672]">
          15 Jan – 14 Feb 2026
        </div>
        <div className="relative flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#E3DFD3] bg-[#F5F3EE]">
          <BellIcon />
          <div className="absolute -right-[3px] -top-[3px] flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#C1443C] text-[9px] font-bold text-white">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
