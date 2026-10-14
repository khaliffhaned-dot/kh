# First Sixty — crisis drills for Malaysian PLCs

An interactive companion to `docs/crisis-communications-playbook-malaysia-plc.md`.
A single self-contained HTML file: open `index.html` in any modern browser. No build step, no server.

## What is in it

- **Academy** — nine short modules with quick checks and four exercises: a materiality decision-tree trainer, a Five-Line statement builder, a "Statement Doctor" and a clock-matching drill.
- **Simulator** — three branching scenarios set at a fictional company (Tanjung Meridian Berhad), each with live regulatory clocks, five meters, earlier choices that return later, scored debriefs and badges.
  1. *The Ransom Note* — ransomware and stolen customer data on results week (Intermediate)
  2. *The Short Report* — a short-seller report, a Bursa UMA query and selective-disclosure traps (Advanced)
  3. *Balik Kampung* — a workplace fatality in Kuching, a viral video and a 3R flashpoint (Intermediate)
- **Facilitated mode** — the same scenarios without scoring: the room discusses each decision, then the facilitator reveals the expert view. "Copy facilitator guide" exports a text run-sheet.
- **Toolkit** — first-sixty-minutes checklist, holding statements (English and Bahasa Malaysia), Bursa announcement skeletons and the clock reference.

## Limits

- All companies, people and events are fictional.
- Regulatory points follow the playbook and were checked against secondary sources only, not Bursa Malaysia's official text. Confirm with counsel before relying on them.
- BM text needs native-speaker review. Mandarin and Tamil are not included.
- Progress is stored in the browser's localStorage only.

## Editing

Scenarios are plain data (`SCEN.push({...})`) inside `index.html`: steps, options with a quality score `q` (0–3), meter deltas `m` (market, regulator, public, staff, legal), flags (`set`), clocks, `variants` and `mods` that react to earlier flags, plus ripples and badges. Change a scenario by editing its object; the engine reads it directly.
