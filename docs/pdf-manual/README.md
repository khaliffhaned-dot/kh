# PDF manual build kit

Builds the print manual and the A5 pocket cards from `../crisis-communications-playbook-malaysia-plc.md`.
Style: consulting-report look in navy (#0A1F55) and saffron (#E9B84A), Arial, exhibits with source lines, line icons and charts.
Red (#B3261E) is reserved for critical items: Level 4, immediate deadlines, warning callouts and verify tags.

| Output | File |
|---|---|
| Full manual, A4, about 96 pages: cover with logo slot, document control, contents with page numbers, part dividers, diagrams, exhibits, scenarios, templates, Appendix F worksheets W1 to W6 | `Crisis-Communications-Playbook-Manual.pdf` |
| Pocket cards, A5, 10 cards, printable and cut-ready | `Crisis-Communications-Playbook-Pocket-Cards.pdf` |

## Rebuild

```bash
pip install weasyprint beautifulsoup4 lxml   # and install pandoc
python3 build_manual.py --logo logo.png --brand "#0A1F55" --footer "Confidential · Version 1.0" --out manual.pdf
python3 pocket.py --brand "#0A1F55" --out pocket-cards.pdf
```

- `--logo` fills the reserved cover slot (PNG or SVG, about 58 × 20 mm). Without it the dashed "Your logo here" box prints.
- `--brand` recolours the accents; the cover and dividers use it as their background.
- Font: Arial. Where Arial is missing (most Linux systems) the metric-compatible Liberation Sans is used and embedded.
- `charts/make.py` regenerates the two exhibits. It needs matplotlib and the `chartkit` module from the graphing skill; edit the path at the top. The PNGs are committed, so a normal rebuild does not need it.

## Check before circulating

The regulatory timings in the charts and cards come from the playbook, which relies on secondary sources and has not been checked against official Bursa Malaysia, PDPC, NACSA or DOSH text. Have counsel verify them.
