import { MEDIA_CONTACTS } from "../data";

const COLUMNS = "grid grid-cols-[1.6fr_1.6fr_1.4fr_0.8fr_1.2fr_1fr]";

export function MediaModule() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E3DFD3] bg-white">
      <div
        className={`${COLUMNS} bg-[#F5F3EE] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.4px] text-[#5B6672]`}
      >
        <div>Journalist</div>
        <div>Outlet</div>
        <div>Beat</div>
        <div>Lang</div>
        <div>Last coverage</div>
        <div>Status</div>
      </div>
      {MEDIA_CONTACTS.map((contact) => (
        <div
          key={contact.journalist}
          className={`${COLUMNS} items-center border-t border-[#EDEAE0] px-5 py-3.5 text-[12.5px]`}
        >
          <div>{contact.journalist}</div>
          <div>{contact.outlet}</div>
          <div>{contact.beat}</div>
          <div>{contact.lang}</div>
          <div>{contact.lastCoverage}</div>
          <div className="font-semibold" style={{ color: contact.statusColor }}>
            {contact.status}
          </div>
        </div>
      ))}
    </div>
  );
}
