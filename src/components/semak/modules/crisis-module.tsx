import { CRISIS_ALERTS } from "../data";
import { Panel, PanelTitle } from "../ui";

export function CrisisModule() {
  return (
    <div className="flex flex-col gap-4">
      <Panel>
        <PanelTitle>Mention volume — last 48 hours</PanelTitle>
        <svg width="100%" height="110" viewBox="0 0 560 110" preserveAspectRatio="none">
          <polyline
            points="0,90 40,88 80,86 120,84 160,80 200,40 240,20 280,30 320,50 360,60 400,64 440,68 480,70 520,72 560,74"
            fill="none"
            stroke="#C1443C"
            strokeWidth="2.2"
          />
          <rect x="180" y="10" width="80" height="90" fill="#C1443C" opacity="0.06" />
        </svg>
      </Panel>

      <div className="flex flex-col gap-3">
        {CRISIS_ALERTS.map((alert) => (
          <div
            key={alert.text}
            className="rounded-[10px] border border-[#E3DFD3] bg-white px-5 py-4"
            style={{ borderLeft: `4px solid ${alert.borderColor}` }}
          >
            <div
              className="mb-1.5 whitespace-nowrap text-xs font-bold uppercase tracking-[0.4px]"
              style={{ color: alert.textColor }}
            >
              {alert.severity}
            </div>
            <div className="mb-1.5 text-[13px] text-[#12202E]">{alert.text}</div>
            <div className="text-xs text-[#5B6672]">{alert.recommendation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
