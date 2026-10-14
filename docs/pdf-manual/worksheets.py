"""Printable worksheets (Appendix F). Returns (html, toc_entries)."""

META = '<table class="wsmeta"><tr><td class="k">Incident</td><td style="width:62mm"></td><td class="k">Date and time</td><td style="width:42mm"></td><td class="k">Crisis level</td><td>L1 <span class="cb"></span>  L2 <span class="cb"></span>  L3 <span class="cb"></span>  L4 <span class="cb"></span></td><td class="k">Crisis Lead</td><td style="width:44mm"></td></tr></table>'
METAP = '<table class="wsmeta"><tr><td class="k">Incident</td><td></td><td class="k">Date and time</td><td style="width:40mm"></td></tr><tr><td class="k">Level</td><td>L1 <span class="cb"></span>  L2 <span class="cb"></span>  L3 <span class="cb"></span>  L4 <span class="cb"></span></td><td class="k">Prepared by</td><td></td></tr></table>'

CLOCKS = [
    ('Bursa: immediate disclosure of material information', 'Material event or information exists', 'Immediately; no deferral to the next periodic report', 'Company Secretary'),
    ('Bursa: reply to UMA or Exchange query', 'Query received', 'As stated in the query; board-endorsed reply', 'Company Secretary / CEO'),
    ('Bursa: trading halt request', 'Material information cannot be released in an orderly way', 'Same day; confirm with Bursa', 'CEO / Company Secretary'),
    ('PDPC: personal data breach (PDPA)', 'Notifiable personal data breach', 'Within 72 hours', 'DPO / Legal'),
    ('PDPA: affected individuals', 'After PDPC notification', 'No later than 7 days after notifying the PDPC', 'DPO / Comms'),
    ('NACSA: cyber incident (NCII entities only)', 'Incident at a designated NCII entity', 'Immediate; 6 hours; 14 days (confirm start points)', 'CISO'),
    ('BNM: technology incident (financial institutions)', 'Incident under RMiT', 'Confirm in the current policy document', 'CISO / Compliance'),
    ('DOSH (JKKP): workplace death or serious injury', 'Qualifying accident', 'Immediately; written report within 7 days', 'HSE head'),
    ('Lenders and trustees', 'Covenant or event-of-default trigger', 'Per facility or trust deed. Check the document', 'CFO / Legal'),
    ('Insurers', 'Potential claim', 'Per policy conditions', 'CFO / Risk'),
]


def _rows(n, cols, h=None):
    st = f' style="height:{h}mm"' if h else ''
    return ''.join('<tr>' + ''.join(f'<td{st}></td>' for _ in range(cols)) + '</tr>' for _ in range(n))


def _head(cols):
    return '<thead><tr>' + ''.join(f'<th{(" style=width:" + w) if w else ""}>{t}</th>' for t, w in cols) + '</tr></thead>'


def worksheets_html():
    toc = []
    out = []
    out.append('<h2 id="appendix-f"><span class="num">F</span>Worksheets</h2>')
    out.append('<p>Printable forms for use during an activation. Print a set before you need it and keep it in the war-room kit. Completed worksheets are confidential records: file them with the decision log.</p>')
    out.append('<table><thead><tr><th>Worksheet</th><th>Use</th><th>Playbook</th></tr></thead><tbody>'
               '<tr><td><strong>W1</strong> Clock board</td><td>Name every regulatory and contractual clock, its owner and its deadline.</td><td>Section 2.3, 5.4</td></tr>'
               '<tr><td><strong>W2</strong> Decision log</td><td>Record each decision, the options considered and the reason. Your evidence of good faith.</td><td>Template T3</td></tr>'
               '<tr><td><strong>W3</strong> Insider log</td><td>Record everyone who knows, when they learned and that they acknowledged the do-not-trade notice.</td><td>Template T5, Section 9.8</td></tr>'
               '<tr><td><strong>W4</strong> Media query log</td><td>Log every journalist query, deadline, owner and response.</td><td>Template T19</td></tr>'
               '<tr><td><strong>W5</strong> Situation report</td><td>One page every one to four hours for the Crisis Lead and the Board.</td><td>Template T2</td></tr>'
               '<tr><td><strong>W6</strong> Materiality assessment</td><td>Document the disclosure decision and its reasoning, including when you decide it is not material.</td><td>Template T4, Section 9.2</td></tr>'
               '</tbody></table>')

    def hdr(wid, num, title, cls):
        toc.append((wid, num, title))
        return f'<h3 class="wh" id="{wid}" data-ws="{num} · {title.upper()}"><span class="num">{num}</span>{title}</h3>'

    # W1
    rows = ''.join(f'<tr class="pre"><td style="height:8.4mm">{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td></td><td></td><td style="width:9mm"></td></tr>' for a, b, c, d in CLOCKS)
    rows += _rows(4, 7, 9.6)
    out.append('<section class="ws">' + hdr('w1', 'W1', 'Clock board', 'ws') + META +
               '<table class="form">' + _head([('Clock or obligation', '62mm'), ('Trigger', '52mm'), ('Indicative deadline', '58mm'), ('Owner', '34mm'), ('Started', '22mm'), ('Due', '22mm'), ('Done', '')]) +
               f'<tbody>{rows}</tbody></table><p class="wsnote">Deadlines are indicative and follow the playbook. Confirm each with counsel. Add your own licence and contract deadlines in the blank rows.</p></section>')
    # W2
    out.append('<section class="ws">' + hdr('w2', 'W2', 'Decision log', 'ws') + META +
               '<table class="form">' + _head([('#', '9mm'), ('Time', '18mm'), ('Decision', '62mm'), ('Options considered', '58mm'), ('Reason', '58mm'), ('Decided by', '28mm'), ('Advice from', '28mm'), ('Follow-up owner and due', '')]) +
               '<tbody>' + ''.join('<tr>' + f'<td class="t">{i}</td>' + '<td></td>' * 7 + '</tr>' for i in range(1, 12)) + '</tbody></table></section>')
    # W3
    out.append('<section class="ws">' + hdr('w3', 'W3', 'Insider log', 'ws') + META +
               '<table class="form">' + _head([('Name', '48mm'), ('Role or organisation', '46mm'), ('Learned (date and time)', '30mm'), ('What they know', '52mm'), ('How informed', '32mm'), ('Notice acknowledged (time)', '32mm'), ('Restriction lifted (time)', '')]) +
               '<tbody>' + _rows(11, 7, 11) + '</tbody></table><p class="wsnote">Include advisers, agency staff, auditors and anyone you consult. Send the do-not-trade and confidentiality notice (Template T6) and collect a written acknowledgement from each person.</p></section>')
    # W4
    out.append('<section class="ws">' + hdr('w4', 'W4', 'Media query log', 'ws') + META +
               '<table class="form">' + _head([('#', '9mm'), ('Received', '20mm'), ('Outlet, journalist, contact', '52mm'), ('Language', '18mm'), ('Question', '56mm'), ('Deadline', '22mm'), ('Owner', '22mm'), ('Response (summary)', '48mm'), ('Sent', '16mm'), ('Outcome', '')]) +
               '<tbody>' + ''.join('<tr>' + f'<td class="t">{i}</td>' + '<td></td>' * 9 + '</tr>' for i in range(1, 12)) + '</tbody></table><p class="wsnote">Acknowledge every query in 15 to 30 minutes with a time for the answer. Give the same facts in every language. Nothing market-sensitive goes to a journalist before Bursa.</p></section>')
    # W5
    fields = [('SITREP number, time, author', 9), ('Crisis level (and change since last report)', 9), ('Verified facts (source and time confirmed)', 34), ('Unverified or unknown', 20), ('People: affected, injured, missing, supported', 18), ('Operations, customers, systems', 18), ('Market: price, volume, UMA or halt status, investor contact', 15), ('Disclosure: announcements made, planned, pending', 16), ('Regulatory clocks: status of each', 16), ('Media and social: top stories, errors, sentiment, 3R flags', 16), ('Stakeholder actions completed or due', 14), ('Decisions needed from the Crisis Lead or Board', 16), ('Next SITREP', 8)]
    rows = ''.join(f'<tr><td class="k" style="height:{h}mm">{k}</td><td></td></tr>' for k, h in fields)
    out.append('<section class="wsp">' + hdr('w5', 'W5', 'Situation report', 'wsp') + METAP +
               f'<table class="form"><tbody>{rows}</tbody></table></section>')
    # W6
    q = [('What exactly is the information? (one sentence)', 14), ('Could it reasonably be expected to affect the price, value or market activity of our securities, or an investor’s decision?', 16), ('Has any leak signal appeared? (UMA, rumour, press query, social chatter, unusual volume)', 14), ('Is an exception to immediate disclosure arguably available? Counsel’s view and reference', 16), ('Is the information confidential right now? Who knows?', 14), ('Quantified impact: financial, operational, customers, licences. If not yet quantified, why and when?', 16), ('Related obligations: PDPA, NACSA, BNM, DOSH, lenders, trustees, other exchange', 14)]
    rows = ''.join(f'<tr><td class="k" style="height:{h}mm">{k}</td><td></td></tr>' for k, h in q)
    rows += '<tr><td class="k" style="height:14mm">Decision</td><td>Announce now <span class="cb"></span>  Request a halt <span class="cb"></span>  Hold with controls <span class="cb"></span>  Not material, log and monitor <span class="cb"></span></td></tr>'
    rows += '<tr><td class="k" style="height:10mm">Review time (within 2 hours, or on any new fact)</td><td></td></tr>'
    rows += '<tr><td class="k" style="height:16mm">Approved by (two keys: Legal or Company Secretary, and CEO or CFO)</td><td>Signature 1:  ______________________________     Signature 2:  ______________________________</td></tr>'
    out.append('<section class="wsp">' + hdr('w6', 'W6', 'Materiality and disclosure assessment', 'wsp') + METAP +
               f'<table class="form"><tbody>{rows}</tbody></table><p class="wsnote">Presume disclosure where there is doubt. Document the reasoning even when you decide the information is not material. Reassess every two hours.</p></section>')
    return '\n'.join(out), toc
