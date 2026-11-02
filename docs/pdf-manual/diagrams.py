"""Vector diagrams for the PDF manual (hand-drawn SVG, print-sized)."""

INK = '#1A1620'; INK2 = '#5E5A66'; LINE = '#9FA6BC'; ACC = '#0A1F55'
OK = '#17795A'; OK_T = '#E2F1EA'; WARN = '#9A6400'; WARN_T = '#F8EEDA'; ACC_T = '#EEF1FA'; PAPER = '#FFFFFF'


def _t(x, y, lines, size=9.2, weight=400, anchor='middle', fill=INK, family='Arial, Liberation Sans', lh=1.28):
    out = []
    for i, ln in enumerate(lines):
        w = weight
        if isinstance(ln, tuple):
            ln, w = ln
        out.append(f'<tspan x="{x}" dy="{0 if i == 0 else round(size * lh, 2)}" font-weight="{w}">{ln}</tspan>')
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{family}" font-size="{size}" fill="{fill}">{"".join(out)}</text>'


def _box(x, y, w, h, fill=PAPER, stroke=INK, sw=1, dash=None, rx=3):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>'


def _line(x1, y1, x2, y2, color=LINE, sw=1.2, arrow=True):
    s = f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{sw}"/>'
    if arrow:
        # small arrowhead pointing along the line direction (assumes vertical or horizontal)
        if x1 == x2:
            d = 1 if y2 > y1 else -1
            s += f'<path d="M{x2 - 3.2} {y2 - 5 * d} L{x2} {y2} L{x2 + 3.2} {y2 - 5 * d} Z" fill="{color}"/>'
        else:
            d = 1 if x2 > x1 else -1
            s += f'<path d="M{x2 - 5 * d} {y2 - 3.2} L{x2} {y2} L{x2 - 5 * d} {y2 + 3.2} Z" fill="{color}"/>'
    return s


def _pill(cx, y, label, fill=ACC_T, stroke=ACC, color=ACC, w=None):
    w = w or (len(label) * 5.6 + 18)
    return (f'<rect x="{cx - w / 2}" y="{y}" width="{w}" height="17" rx="8.5" fill="{fill}" stroke="{stroke}" stroke-width="1"/>'
            + _t(cx, y + 11.8, [label], size=8, weight=600, fill=color, family='Arial, Liberation Sans'))


def decision_tree(width='100%'):
    p = []
    p.append(_box(120, 2, 280, 28, fill=INK, stroke=INK))
    p.append(_t(260, 20, ['EVENT · INFORMATION · RUMOUR · QUERY ARRIVES'], size=8.6, weight=500, fill='#FFFFFF', family='Arial, Liberation Sans'))
    p.append(_line(260, 30, 260, 54))
    # Q1
    p.append(_box(40, 54, 440, 62, fill=ACC_T, stroke=ACC))
    p.append(_t(260, 76, [('Q1', 700), 'Could this reasonably be expected to affect the price, value or market activity', 'of our securities, or an investor’s decision?'], size=9.4))
    for x in (95, 260, 425):
        p.append(_line(x, 116, x, 138, arrow=False))
    p.append(_pill(95, 134, 'NO', w=44)); p.append(_pill(260, 134, 'UNSURE', w=64)); p.append(_pill(425, 134, 'YES', w=44))
    # NO outcome
    p.append(_line(95, 151, 95, 176))
    p.append(_box(10, 176, 170, 80, fill='#F4F6FB', stroke=LINE))
    p.append(_t(95, 194, [('LOG AND MONITOR', 700), 'Record the reasoning (T4).', 'Reassess every 2 hours, or on', 'ANY new fact, rumour, query', 'or price move.'], size=8.8))
    # UNSURE
    p.append(_line(260, 151, 260, 176))
    p.append(_box(190, 176, 140, 64, fill='#F4F6FB', stroke=LINE))
    p.append(_t(260, 194, ['Treat as YES until counsel', 'and the Company Secretary', 'conclude otherwise.', ('Presume disclosure.', 700)], size=8.8))
    p.append(_line(330, 208, 425, 208, arrow=False))
    # YES line down to Q2
    p.append(_line(425, 151, 425, 292))
    # Q2
    p.append(_box(190, 292, 330, 62, fill=ACC_T, stroke=ACC))
    p.append(_t(355, 313, [('Q2', 700), 'Does counsel confirm a recognised exception to immediate', 'disclosure applies (Para 9.05, verify) AND is the', 'information still fully confidential?'], size=9))
    p.append(_line(250, 354, 250, 380, arrow=False)); p.append(_line(455, 354, 455, 380, arrow=False))
    p.append(_pill(250, 372, 'NO', w=44)); p.append(_pill(455, 372, 'YES  (rare)', w=78))
    # NO -> announce
    p.append(_line(250, 389, 250, 410))
    p.append(_box(160, 410, 180, 66, fill=OK_T, stroke=OK, sw=1.4))
    p.append(_t(250, 429, [('ANNOUNCE IMMEDIATELY', 700), 'through Bursa LINK.', 'Then go to Q3 for a halt.'], size=9, fill=INK))
    # YES -> hold
    p.append(_line(455, 389, 455, 410))
    p.append(_box(350, 410, 170, 126, fill=WARN_T, stroke=WARN, sw=1.4))
    p.append(_t(435, 429, [('HOLD UNDER CONTROLS', 700), '• insider log and', '  do-not-trade (T5, T6)', '• monitor for leaks hourly', '• pre-draft the announcement', ('Any leak signal: announce', 700), ('immediately.', 700)], size=8.6, anchor='middle'))
    # Q3
    p.append(_line(250, 476, 250, 504))
    p.append(_box(60, 504, 280, 48, fill=ACC_T, stroke=ACC))
    p.append(_t(200, 524, [('Q3', 700), 'Can we release an accurate announcement NOW,', 'in an orderly way?'], size=9))
    p.append(_line(120, 552, 120, 574, arrow=False)); p.append(_line(280, 552, 280, 574, arrow=False))
    p.append(_pill(120, 566, 'YES', w=44)); p.append(_pill(280, 566, 'NO · market open · facts incomplete', w=196))
    p.append(_line(120, 583, 120, 604)); p.append(_line(280, 583, 280, 604))
    p.append(_box(10, 604, 190, 58, fill=OK_T, stroke=OK))
    p.append(_t(105, 623, ['Announce, then run the', 'stakeholder sequence', '(Section 9.6).'], size=8.8))
    p.append(_box(210, 604, 310, 58, fill=WARN_T, stroke=WARN))
    p.append(_t(365, 623, ['Call Bursa. Request a trading halt (PN2) while', 'the announcement is finalised. Prepare the holding', 'statement. Announce within the halt window.'], size=8.8))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 670" width="{width}" role="img" '
            f'aria-label="Disclosure decision tree">{"".join(p)}</svg>')


def governance(width='100%'):
    p = []
    p.append(_box(130, 2, 260, 46, fill=INK, stroke=INK))
    p.append(_t(260, 21, [('BOARD OF DIRECTORS', 700)], size=9.4, fill='#FFFFFF'))
    p.append(_t(260, 36, ['Chair · Audit & Risk Committee Chair · Lead INED'], size=8.2, fill='#D7E0E3'))
    p.append(_line(260, 48, 260, 82))
    p.append(_t(272, 70, ['oversight · informed'], size=7.6, anchor='start', fill=INK2, family='Arial, Liberation Sans'))
    p.append(_box(160, 82, 200, 42, fill=ACC_T, stroke=ACC, sw=1.4))
    p.append(_t(260, 100, [('CRISIS LEAD', 700), 'CEO / MD or delegate'], size=9.2))
    p.append(_line(260, 124, 260, 138, arrow=False))
    p.append(_line(90, 138, 430, 138, arrow=False))
    for x in (90, 260, 430):
        p.append(_line(x, 138, x, 156))
    cols = [(8, 164, 'DISCLOSURE COMMITTEE', ['CEO · CFO · Company', 'Secretary · Legal'], 'decides whether and', 'what to disclose'),
            (178, 164, 'CRISIS MANAGEMENT TEAM', ['Core Five + HR, Ops, CISO,', 'Compliance, Security, Scribe'], 'decides how to run', 'the response'),
            (348, 164, 'TECHNICAL / OPS CELL', ['HSE · IT security · quality', '· supply chain'], 'facts to the CMT', 'every 30–60 minutes')]
    for x, w, title, mid, a, b in cols:
        p.append(_box(x, 156, w, 92, fill=PAPER, stroke=INK, sw=1.2))
        p.append(_t(x + w / 2, 173, [(title, 700)], size=8.3))
        p.append(_t(x + w / 2, 189, mid, size=8.2, fill=INK2))
        p.append(_t(x + w / 2, 220, [(a, 600), (b, 600)], size=8.6, fill=ACC))
    p.append(_line(90, 248, 90, 274)); p.append(_line(260, 248, 260, 274))
    p.append(_box(8, 274, 164, 52, fill='#F4F6FB', stroke=LINE))
    p.append(_t(90, 293, ['Bursa LINK · halt requests', 'UMA replies'], size=8.4))
    p.append(_box(178, 274, 164, 80, fill='#F4F6FB', stroke=LINE))
    p.append(_t(260, 291, [('COMMUNICATIONS CELL', 700), 'Comms · IR · HR comms ·', 'Digital · Regional · Agency'], size=8.3))
    p.append(_t(260, 340, [('decides how to say it', 600)], size=8.6, fill=ACC))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 530 364" width="{width}" role="img" '
            f'aria-label="Crisis governance structure">{"".join(p)}</svg>')


def timeline(width='100%', color=ACC, ink=INK, dot='#FFFFFF'):
    marks = [(0, 'T+0', 'Verify'), (1, 'T+10', 'Core Five'), (2, 'T+20', 'Freeze, insider lock'), (3, 'T+30', 'Materiality'), (4, 'T+40', 'Clocks, Board'), (5, 'T+50', 'First words'), (6, 'T+60', 'Next update')]
    step = 94; X0 = 46; p = [f'<line x1="{X0}" y1="64" x2="{X0 + 6 * step}" y2="64" stroke="{color}" stroke-width="2"/>']
    for i, t, l in marks:
        x = X0 + i * step
        p.append(f'<circle cx="{x}" cy="64" r="5" fill="{dot}" stroke="{color}" stroke-width="2"/>')
        p.append(_t(x, 44, [t], size=10.5, weight=500, fill=color, family='Arial, Liberation Sans'))
        lab = l.split(', ') if ', ' in l else [l]
        p.append(_t(x, 90, lab, size=10.5, fill=ink, weight=500))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 656 116" width="{width}" role="img" '
            f'aria-label="First sixty minutes timeline">{"".join(p)}</svg>')
