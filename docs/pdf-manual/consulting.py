"""Consulting-style layer for the manual: action titles, executive summary, new exhibits.

Everything here restates what the playbook already says. Nothing adds a fact, a deadline or a
statistic. Each action title is the "so what" of the section it sits under, written as a full
sentence, the way a consulting report states its finding before it shows the evidence.
"""

# --- action titles (one sentence per section) --------------------------------------------
SECTION_ACTIONS = {
    '01': 'Use the playbook in three layers: cards for the first hour, procedures for each function, and reference tools for the rest.',
    '02': 'The first 60 minutes are thirteen steps in a fixed order, and any one of the Core Five can raise the alarm without permission.',
    '03': 'Ten principles settle most hard calls: people first, Bursa first, facts not forecasts, one voice, and never "no comment".',
    '04': 'Local conditions change how a crisis plays out: concentrated ownership, retail investors on WhatsApp, and the weight of race, religion and royalty.',
    '05': "Bursa's disclosure duty sits on top of data, cyber, workplace and sector rules, and each one carries its own clock.",
    '06': 'One accountable Crisis Lead, a Board kept informed, and decision rights agreed before the crisis start.',
    '07': 'Four severity levels decide who is in the room and how fast approvals move: upgrade quickly, downgrade slowly.',
    '08': 'A 30-minute fast track gets the first words out; phase checklists carry the rest of the response.',
    '09': 'For a material event, Bursa hears first, and the exception to immediate disclosure is narrow and short-lived.',
    '10': 'Every stakeholder has an owner, a channel and a place in the order relative to the Bursa announcement.',
    '11': 'Every first statement answers the same five questions in the same order: acknowledge, care, action, accountability, next.',
    '12': 'Know the media landscape before the crisis, and say the same thing in the same words to every outlet.',
    '13': 'Triage what appears online by signal: verify new facts, correct errors once, and do not argue with legitimate criticism.',
    '14': 'Employees hear it no later than the public, through their managers, in the languages they actually read.',
    '15': 'Thirteen scenarios, each with its first sixty minutes, its disclosure checkpoints and the pitfalls to avoid.',
    '16': 'Twenty templates, in English and for key statements Bahasa Malaysia, filled with verified facts and cleared by Legal and the Company Secretary.',
    '17': 'Three tabletop exercises rehearse a results-week ransomware attack, a short-seller report with a UMA query, and a fatality with a viral 3R-sensitive video.',
    '18': 'Readiness is built before the crisis: governance, authorised submitters, named alternates, a risk register and a yearly Board report.',
    '19': 'Leave crisis mode on stated exit criteria, then rebuild trust over 30, 60 and 90 days.',
    'A': 'Fill in the regulator directory and test it before you need it.',
    'B': 'The terms the playbook uses, in one place.',
    'C': 'Every regulatory point is tagged corroborated or verify, and none was checked against Bursa\'s own text.',
    'D': 'Fifteen questions for counsel to answer before the playbook is adopted.',
    'E': 'What changed, and when.',
}

SCENARIO_ACTIONS = {
    'S1': 'In a ransomware incident the first hour is won by controlling who knows, not by fixing systems.',
    'S2': 'People come first: families hear before the public, and nobody is named, blamed or second-guessed.',
    'S3': 'A recall is judged on how fast and how clearly customers can act, so do not minimise and do not recall in stages.',
    'S4': 'Do not deny or reassure before the facts: early denials and management investigating itself are the usual failures.',
    'S5': 'Do not attack the authority or defend the individual; assess disclosure promptly and keep the implicated person from speaking for the company.',
    'S6': 'A leak signal ends the confidentiality window: answer the specific allegations, consider a halt, and keep insiders out of the market.',
    'S7': 'Keep one Board voice in a governance fight: no selective briefing, no public sparring, no successor named before the Board decides.',
    'S8': "Announce the facts, the status and the company's position, and never attack the regulator or declare 'no wrongdoing' early.",
    'S9': 'Announce defaults, demands and petitions promptly; denying difficulty until the last minute is the main pitfall.',
    'S10': 'Keep public statements consistent with court filings, and never attack the claimant.',
    'S11': "Safety and continuity first, and account for East Malaysia, remote sites and migrant workers' welfare.",
    'S12': 'Apologise without "if anyone was offended", do not blame an intern or an agency, and respond fast.',
    'S13': 'Verify before amplifying a fake, then correct on official channels and in retail-investor channels.',
}

# --- exhibit frames -------------------------------------------------------------------------
EXHIBITS = {
    'clock': ('Initial notices fall due within three days; follow-up duties keep running for up to two weeks',
              'Latest compliant timing of each regulatory clock, in days from discovery. Indicative, and the PDPC is assumed notified at the 72-hour limit.',
              'Playbook Sections 2.3 and 5. Secondary sources on the PDPA, the Cyber Security Act 2024 and OSH notification; verify with counsel.'),
    'severity': ('The severity level decides who is in the room and who approves the words',
                 'The four levels, from a contained issue to a critical event.',
                 'Playbook Section 7.2. Thresholds in that section are examples to calibrate and have the Board approve.'),
    'escalation': ('Three decisions are due inside the first hour, and the full Board within four',
                   'Default escalation clocks for a Level 3 crisis, in minutes from first awareness.',
                   'Playbook Sections 7.2 to 7.4. Defaults to calibrate to your company.'),
    'bursa': ('For a material event the market hears first and everyone else follows',
              'The order of release. Life-safety instructions are never delayed.',
              'Playbook Section 9.1.'),
    'rebuild': ('Recovery runs in three steps: fix and show, prove, then embed',
                'The 30-60-90 rebuild plan.',
                'Playbook Section 19.2.'),
}

SAFFRON = '#E9B84A'; NAVY = '#0A1F55'; RED = '#B3261E'; RED_T = '#FBECEA'; PALE = '#EEF1FA'; MID = '#6B82C2'
_FONT = 'Arial, Liberation Sans'


def _txt(x, y, lines, size=9, weight=400, fill='#1A1620', anchor='start', lh=1.3):
    spans = ''.join(f'<tspan x="{x}" dy="{0 if i == 0 else round(size * lh, 2)}">{ln}</tspan>' for i, ln in enumerate(lines))
    return f'<text x="{x}" y="{y}" font-family="{_FONT}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{spans}</text>'


def severity_levels():
    """Exhibit: the four levels with who convenes and who approves (Playbook 7.2)."""
    cols = [
        ('LEVEL 1', 'Issue', 'Contained, local, low visibility', 'Head of function', 'Function head + Comms', False),
        ('LEVEL 2', 'Incident', 'Notable; a business unit can manage it with HQ support', 'Core Five (virtual)', 'Comms + Legal', False),
        ('LEVEL 3', 'Crisis', 'Significant; threatens brand, licence or share price', 'Full CMT; Board Chair told', 'Crisis Lead + Legal + CoSec', False),
        ('LEVEL 4', 'Critical', 'Existential or systemic; threat to continuity, licence, solvency or leadership', 'Full CMT; Board convened; external advisers on site', 'Crisis Lead + Chair / Board', True),
    ]
    w, gap, x0 = 152, 8, 24
    p = []
    for i, (lv, name, desc, who, appr, crit) in enumerate(cols):
        x = x0 + i * (w + gap)
        top = RED if crit else NAVY
        fill = RED_T if crit else PALE
        p.append(f'<rect x="{x}" y="10" width="{w}" height="224" fill="{fill}"/><rect x="{x}" y="10" width="{w}" height="5" fill="{top}"/>')
        p.append(_txt(x + 10, 34, [lv], 7.4, 700, RED if crit else NAVY))
        p.append(_txt(x + 10, 54, [name], 15, 700, RED if crit else NAVY))
        words = desc.split(' ')
        lines, cur = [], ''
        for wd in words:
            if len(cur) + len(wd) + 1 > 27: lines.append(cur); cur = wd
            else: cur = (cur + ' ' + wd).strip()
        lines.append(cur)
        p.append(_txt(x + 10, 74, lines, 8.2, 400, '#3A3F4B'))
        p.append(f'<line x1="{x + 10}" y1="124" x2="{x + w - 10}" y2="124" stroke="#C3CDEB" stroke-width="0.8"/>')
        p.append(_txt(x + 10, 138, ['WHO CONVENES'], 6.4, 700, '#5E5A66'))
        wl = who.split('; ') if len(who) > 28 else [who]
        p.append(_txt(x + 10, 151, wl, 8.6, 700, '#1A1620'))
        p.append(_txt(x + 10, 200, ['WHO APPROVES THE STATEMENT'], 6.4, 700, '#5E5A66'))
        p.append(_txt(x + 10, 213, [appr], 8.6, 700, '#1A1620'))
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 656 244" width="100%" role="img" aria-label="Four severity levels">{"".join(p)}</svg>'


def bursa_first():
    """Exhibit: order of release for a material event (Playbook 9.1, rule 2)."""
    steps = [('1', 'Bursa LINK', 'announcement'), ('2', 'Press release,', 'website and social'), ('3', 'Staff note', ''),
             ('4', 'Analyst and', 'investor calls'), ('5', 'Stakeholder', 'letters')]
    w, gap, x0, y = 112, 14, 6, 26
    p = []
    for i, (n, a, b) in enumerate(steps):
        x = x0 + i * (w + gap)
        first = i == 0
        p.append(f'<rect x="{x}" y="{y}" width="{w}" height="70" fill="{NAVY if first else PALE}"/>')
        p.append(f'<rect x="{x}" y="{y}" width="{w}" height="4" fill="{SAFFRON if first else MID}"/>')
        p.append(_txt(x + 10, y + 26, [n], 15, 700, SAFFRON if first else NAVY))
        p.append(_txt(x + 10, y + 46, [a] + ([b] if b else []), 9.4, 700, '#FFFFFF' if first else NAVY))
        if i < len(steps) - 1:
            ax = x + w + 1
            p.append(f'<path d="M{ax} {y + 31} l{gap - 2} 4 l-{gap - 2} 4 z" fill="{LINE if False else "#9FA6BC"}"/>')
    p.append(_txt(6, 14, ['TIME OF RELEASE, LEFT TO RIGHT'], 6.6, 700, '#5E5A66'))
    p.append(f'<rect x="6" y="110" width="644" height="28" fill="{RED_T}"/><rect x="6" y="110" width="4" height="28" fill="{RED}"/>')
    p.append(_txt(20, 128, ['Exception: life-safety instructions are never delayed to wait for the announcement.'], 9, 700, RED))
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 656 146" width="100%" role="img" aria-label="Order of release">{"".join(p)}</svg>'


def rebuild_plan():
    """Exhibit: the 30-60-90 rebuild plan (Playbook 19.2)."""
    cols = [('0 to 30 days', 'Fix and show', ['Root cause', 'Interim controls', 'Remediation under way', 'Independent review commissioned', 'Board oversight', 'Regular updates']),
            ('31 to 60 days', 'Prove', ['Publish findings in an appropriate form', 'Implement priority fixes', 'Stakeholder meetings: lenders, investors, regulators, community', 'Employee engagement']),
            ('61 to 90 days', 'Embed', ['Governance and policy changes', 'Training', 'Metrics', 'Independent verification', 'Plan for the annual report and sustainability disclosures'])]
    w, gap, x0 = 206, 13, 6
    p = []
    for i, (win, name, items) in enumerate(cols):
        x = x0 + i * (w + gap)
        p.append(f'<rect x="{x}" y="8" width="{w}" height="40" fill="{NAVY}"/><rect x="{x}" y="8" width="{w}" height="4" fill="{SAFFRON}"/>')
        p.append(_txt(x + 10, 28, [win.upper()], 6.8, 700, SAFFRON))
        p.append(_txt(x + 10, 42, [name], 12.5, 700, '#FFFFFF'))
        y = 66
        for it in items:
            words, lines, cur = it.split(' '), [], ''
            for wd in words:
                if len(cur) + len(wd) + 1 > 36: lines.append(cur); cur = wd
                else: cur = (cur + ' ' + wd).strip()
            lines.append(cur)
            p.append(f'<rect x="{x + 10}" y="{y - 6}" width="5" height="5" fill="{MID}"/>')
            p.append(_txt(x + 22, y, lines, 8.6, 400, '#1A1620'))
            y += 12 * len(lines) + 7
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 656 172" width="100%" role="img" aria-label="30-60-90 rebuild plan">{"".join(p)}</svg>'


# --- executive summary ------------------------------------------------------------------------
ICON = {
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'bank': '<path d="M12 3 3 8h18L12 3z"/><path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9M3 21h18"/>',
    'people': '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><path d="M17 5a3 3 0 0 1 0 6M21 20v-1a5 5 0 0 0-4-5"/>',
    'shield': '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    'quote': '<path d="M5 5h14v10H9l-4 4V5z"/>',
    'book': '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z"/><path d="M8 4v13"/>',
}


def _icon(name, stroke=NAVY):
    return (f'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="{stroke}" stroke-width="1.8" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICON[name]}</svg>')


def executive_summary(link):
    """`link(num)` returns the href for a section number, so each line cites its page."""
    msgs = [
        ('clock', 'Run the first 60 minutes in order',
         'Verify and name it, protect people, call the Core Five, freeze, lock insiders, screen for materiality, start the clocks, tell the Board, release the first words, and set the next update time.', '02'),
        ('bank', 'Bursa first, everyone else second',
         'Material information is announced immediately through Bursa LINK, before the press release, social posts, staff note and analyst calls. The exception is narrow and ends the moment there is a leak signal.', '09'),
        ('people', 'Settle who decides before the crisis',
         'One accountable Crisis Lead and the Core Five. Any one of the Core Five can declare at least Level 2 on their own authority, and four severity levels set who convenes and who approves.', '06'),
        ('shield', 'Start every regulatory clock at once',
         'Bursa, the PDPC, NACSA, DOSH and others run different clocks. Start every one that applies, give each a named owner, and keep the board where everyone can see it.', '05'),
        ('quote', 'Say five things, in the same order, everywhere',
         'Acknowledge, care, action, accountability, next. Same facts in every language and channel, one spokesperson per audience, and never "no comment".', '11'),
        ('book', 'Prepare, rehearse, then review',
         'Thirteen scenario playbooks, twenty templates and three tabletop exercises turn the principles into muscle memory, and an after-action review closes the loop.', '15'),
    ]
    rows = ''.join(
        f'<div class="es-row"><div class="es-n">{i + 1}</div><div class="es-i">{_icon(ic)}</div>'
        f'<div class="es-t"><div class="es-h">{h}</div><p>{t} <a class="pg" href="{link(sec)}"></a></p></div></div>'
        for i, (ic, h, t, sec) in enumerate(msgs))
    stats = ''.join(f'<div><b>{n}</b><span>{l}</span></div>' for n, l in
                    [('19', 'sections'), ('13', 'scenario playbooks'), ('20', 'templates'), ('3', 'tabletop exercises'), ('6', 'worksheets')])
    return (
        '<section class="exec" id="exec-summary">'
        '<div class="es-eyebrow">Executive summary</div>'
        '<h1 class="es-title">A listed-company crisis is two crises at once, and the order in which you disclose matters as much as what you say.</h1>'
        '<div class="es-rule"></div>'
        '<p class="es-lead">The first is an operational or reputational event, managed with speed and empathy. The second is a capital-markets event, '
        'governed by continuous-disclosure law, insider-trading law and the Exchange\'s expectation of equal access to information. Most failed responses '
        'at listed companies come from treating them as separate workstreams. Six messages carry the playbook.</p>'
        f'<div class="es-list">{rows}</div>'
        f'<div class="es-stats">{stats}</div>'
        '<div class="es-warn">'
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B3261E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18h.01"/></svg>'
        '<div><b>Read before relying on it.</b> This is operational guidance, not legal advice. Regulatory content was checked against secondary sources only, '
        'not against Bursa Malaysia\'s own text. Have counsel verify it before adoption (Appendices C and D).</div></div>'
        '</section>')
