import sys
# chartkit comes from the "graphing" skill; point this at its scripts/ directory.
sys.path.insert(0, "/path/to/graphing/scripts")
import chartkit as ck

import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

NAVY, LIGHT, INK = "#0A1F55", "#6B82C2", "#1A1620"
RED = "#B3261E"  # reserved for critical, immediate items
c = ck.theme(bg="#FFFFFF", font="Liberation Sans")
import pathlib
OUT = str(pathlib.Path(__file__).parent) + "/"

# ---- Chart 1: clock windows (days from discovery) ----
rows = [  # label, sublabel, [(start,len,color)], markers, annotations[(x,text,ha)]
 ("Bursa: material information", "", [], [0], [(0.35, "Immediately", "left")]),
 ("NACSA: cyber incident", "NCII entities only", [(0, 0.25, NAVY), (0.45, 13.55, LIGHT)], [], [(0.0, "Report within 6 hours", "left"), (14, "Supplement by day 14", "right")]),
 ("PDPC: personal data breach", "", [(0, 3, NAVY)], [], [(3.2, "72 hours", "left")]),
 ("Affected individuals", "after the PDPC is notified", [(3.1, 6.9, LIGHT)], [], [(10.2, "By day 10 at the latest", "left")]),
 ("DOSH: workplace fatality", "", [(0.3, 6.7, LIGHT)], [0], [(7.2, "Written report within 7 days", "left")]),
]
fig, ax = plt.subplots(figsize=(10, 5.2))
n = len(rows)
for i, (lab, sub, bars, marks, notes) in enumerate(rows):
    y = n - 1 - i
    for s, l, col in bars:
        ax.barh(y, l, left=s, height=0.34, color=col, zorder=3)
    for m in marks:
        ax.plot(m, y, marker="D", ms=8, color=RED, zorder=4, clip_on=False)
    for x, t, ha in notes:
        off = -0.36 if (bars and ha != "left" or (t.startswith("Report"))) else 0
        yy = y - 0.36 if t.startswith(("Report", "Supplement")) else y
        ax.text(x, yy, t, ha=ha, va="center", fontsize=9.5, color=INK, zorder=5)
ax.set_yticks(range(n))
ax.set_yticklabels([f"{r[0]}\n{r[1]}" if r[1] else r[0] for r in reversed(rows)], fontsize=10)
for lbl in ax.get_yticklabels(): lbl.set_color(NAVY); lbl.set_fontweight("bold")
ax.set_xlim(-0.5, 14.4); ax.set_ylim(-0.7, n - 0.4)
ax.set_xticks(range(0, 15, 2)); ax.set_xlabel("Days from discovery", color=c.muted, fontsize=9.5)
ax.grid(axis="x", color=c.grid, zorder=0); ax.set_axisbelow(True)
for s in ("top", "right", "left"): ax.spines[s].set_visible(False)
ax.tick_params(axis="y", length=0, pad=12)
ax.legend(handles=[Patch(color=NAVY, label="Initial notice or report"), Patch(color=LIGHT, label="Follow-up or written report"),
                   Line2D([0],[0], marker="D", color="none", markerfacecolor=RED, markersize=7, label="Immediately")],
          loc="upper right", frameon=False, fontsize=9.5)
ck.finish(ax, title="Initial notices fall due within three days; follow-ups run up to two weeks",
          subtitle="Latest compliant timing of each clock, assuming the PDPC is notified at the 72-hour limit",
          source="Source: Crisis Communications Playbook, Sections 2.3 and 5 (secondary sources; verify with counsel)")
print(ck.save(fig, OUT + "clock-windows", formats=("png", "svg")))

# ---- Chart 2: escalation clocks (minutes) ----
steps = [("Anyone to head of function and Comms or CoSec", 0, NAVY, "Immediately"),
         ("Core Five reached", 15, NAVY, "15 min"),
         ("Materiality conclusion documented", 60, NAVY, "60 min"),
         ("Crisis Management Team convened", 60, NAVY, "60 min"),
         ("Chair and ARC Chair informed", 60, NAVY, "60 min"),
         ("Full Board briefed (Level 4)", 240, LIGHT, "4 hours")]
fig, ax = plt.subplots(figsize=(10, 4.6))
m = len(steps)
for i, (lab, v, col, t) in enumerate(steps):
    y = m - 1 - i
    if v == 0:
        ax.plot(0, y, marker="D", ms=8, color=RED, zorder=4, clip_on=False)
        ax.text(8, y, t, va="center", fontsize=9.5, color=INK)
    else:
        ax.barh(y, v, height=0.4, color=col, zorder=3)
        ax.text(v + 5 if v < 240 else v - 6, y, t, va="center", ha="left" if v < 240 else "right", fontsize=9.5, color=INK if v < 240 else "#FFFFFF", fontweight="normal" if v < 240 else "bold")
ax.set_yticks(range(m)); ax.set_yticklabels([s[0] for s in reversed(steps)], fontsize=10)
for lbl in ax.get_yticklabels(): lbl.set_color(NAVY); lbl.set_fontweight("bold")
ax.set_xlim(-8, 262); ax.set_xticks([0, 60, 120, 180, 240]); ax.set_xticklabels(["0", "1 h", "2 h", "3 h", "4 h"])
ax.set_xlabel("Time from first awareness", color=c.muted, fontsize=9.5)
ax.grid(axis="x", color=c.grid, zorder=0); ax.set_axisbelow(True)
for s in ("top", "right", "left"): ax.spines[s].set_visible(False)
ax.tick_params(axis="y", length=0, pad=12)
ax.legend(handles=[Patch(color=NAVY, label="Level 3"), Patch(color=LIGHT, label="Level 4 only")], loc="upper right", frameon=False, fontsize=9.5)
ck.finish(ax, title="Three decisions are due inside the first hour; the full Board within four",
          subtitle="Default escalation clocks for a Level 3 crisis (calibrate to your company)",
          source="Source: Crisis Communications Playbook, Sections 7.2 to 7.4")
print(ck.save(fig, OUT + "escalation", formats=("png", "svg")))
