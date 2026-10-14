#!/usr/bin/env python3
"""Pocket cards (A5 insert) for the Crisis Communications Playbook. Same navy/saffron/Arial style.
Usage: python3 pocket.py [--brand "#0A1F55"] [--footer "Confidential"] [--out pocket-cards.pdf]
All wording is drawn from the playbook sections cited on each card."""
import argparse, pathlib, sys
from weasyprint import HTML
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import diagrams

CSS = '''
@page { size: A5; margin: 0; }
* { box-sizing: border-box; }
html { font: 400 8.6pt/1.42 Arial, 'Liberation Sans'; color: #1A1620; }
body { margin: 0; }
.card { width: 148mm; height: 210mm; padding: 11mm 11mm 9mm; position: relative; break-after: page; overflow: hidden; }
.card:last-child { break-after: auto; }
.top { display: flex; justify-content: space-between; font: 700 6pt Arial, 'Liberation Sans'; letter-spacing: .16em; text-transform: uppercase; color: #5E5A66; border-bottom: .6pt solid #D5DAE6; padding-bottom: 2.4mm; }
.top b { color: {{BRAND}}; }
h1 { font: 700 17pt/1.12 Arial, 'Liberation Sans'; color: {{BRAND}}; margin: 6mm 0 0; letter-spacing: -.01em; }
.rule { width: 13mm; height: 1mm; background: #E9B84A; margin: 3mm 0 4.4mm; }
.sub { color: #5E5A66; font-size: 7.8pt; margin: -1.6mm 0 3.6mm; }
.foot { position: absolute; left: 11mm; right: 11mm; bottom: 7mm; display: flex; justify-content: space-between; font: 400 6pt Arial, 'Liberation Sans'; color: #5E5A66; border-top: .6pt solid #D5DAE6; padding-top: 2mm; }
table { width: 100%; border-collapse: collapse; font-size: 8.8pt; }
th { text-align: left; font: 700 6.2pt Arial, 'Liberation Sans'; letter-spacing: .1em; text-transform: uppercase; color: {{BRAND}}; border-bottom: 1.1pt solid {{BRAND}}; padding: 0 2mm 1.4mm 0; }
td { vertical-align: top; border-bottom: .5pt solid #D5DAE6; padding: 1.5mm 2mm 1.5mm 0; }
td.t { width: 17mm; font-weight: 700; color: {{BRAND}}; }
td.o { width: 25mm; color: #5E5A66; font-size: 7pt; }
.box { background: #EEF1FA; border-left: 1.1mm solid #E9B84A; padding: 3mm 3.6mm; margin: 3.4mm 0 0; }
.box.dk { background: {{BRAND}}; color: #fff; }
.box.dk b { color: #E9B84A; }
.box b { color: {{BRAND}}; }
ul { margin: 0; padding-left: 4.4mm; } li { margin: 0 0 1.4mm; }
.fill { border-bottom: .7pt solid #1A1620; height: 7.2mm; }
.lbl { font: 700 6pt Arial, 'Liberation Sans'; letter-spacing: .1em; text-transform: uppercase; color: #5E5A66; }
.q { font-size: 7.6pt; line-height: 1.5; }
.q p { margin: 0 0 1.8mm; } .q i { color: #5E5A66; }
svg { width: 100%; height: auto; }
.cb { display: inline-block; width: 3mm; height: 3mm; border: .7pt solid #1A1620; border-radius: .5mm; vertical-align: -.5mm; margin-right: 2mm; }
.lv { display: flex; gap: 2mm; }
.lv div { flex: 1; border-top: 1.2mm solid {{BRAND}}; background: #F4F6FB; padding: 2mm; font-size: 7pt; }
.lv div.l4 { border-top-color: #B3261E; background: #FBECEA; } .lv div.l4 b { color: #B3261E; }
.box.crit { background: #FBECEA; border-left-color: #B3261E; } .box.crit b { color: #B3261E; }
td.red, td b.red { color: #B3261E; font-weight: 700; }
.lv b { display: block; color: {{BRAND}}; font-size: 7.6pt; margin-bottom: 1mm; }
'''

def card(n, total, title, body, sub='', section=''):
    return (f'<section class="card"><div class="top"><span>Crisis Communications Playbook · <b>Pocket card {n:02d}</b></span><span>{section}</span></div>'
            f'<h1>{title}</h1><div class="rule"></div>{"<div class=sub>" + sub + "</div>" if sub else ""}{body}'
            f'<div class="foot"><span>{{{{FOOTER}}}}</span><span>{n} / {total}</span></div></section>')

def rows(rs, cols=3):
    return ''.join('<tr>' + ''.join(f'<td class="{c}">{v}</td>' for c, v in zip(('t', '', 'o'), r)) + '</tr>' for r in rs)

def fills(n, label=None):
    return ''.join(f'<div class="fill"></div>' for _ in range(n))

def cards():
    C = []
    C.append(('The first sixty minutes', '<table><tr><th>When</th><th>Do this</th><th>Owner</th></tr>' + rows([
        ('0–10', '<b>1 Verify and name it.</b> Two-line factual summary: what we know, who confirmed, what we do not know.<br><b>2 Protect people first.</b> Communications never delays a life-safety action.<br><b>3 Call the Core Five</b> by phone, not email.', 'Alert recipient · Ops/HSE/CISO'),
        ('10–20', '<b>4 Freeze.</b> Legal hold. Pause scheduled posts. One named spokesperson only.<br><b>5 Insider lock.</b> Do not trade, do not tip (T6). Start the insider log.<br><b>6 Start the decision log</b> (T3).', 'Legal/Comms · CoSec · Scribe'),
        ('20–40', '<b>7 Materiality screen</b> with the decision tree. If it might be price-sensitive, treat it as such until counsel says otherwise.<br><b>8 Market open?</b> If material and you cannot announce now, consider a trading-halt request.<br><b>9 Convene the CMT.</b>', 'Disclosure Cttee · CEO + CoSec · Crisis Lead'),
        ('40–60', '<b>10 Start the regulatory clocks.</b> One owner per clock.<br><b>11 Notify the Board:</b> Chair and ARC Chair, by phone.<br><b>12 First words.</b> Bursa first if material.<br><b>13 Set the next update time</b> (every 60–120 min) and say so.', 'Legal · Crisis Lead · Head of Comms')]) + '</table>', 'Playbook Section 2.1', 'Quick start'))
    C.append(('The Core Five and decision rights', '<table><tr><th>#</th><th>Role</th><th>On the first call because</th></tr>' + ''.join(f'<tr><td class="t">{a}</td><td><b>{b}</b></td><td class="o" style="width:auto">{c}</td></tr>' for a, b, c in [
        (1, 'Crisis Lead (CEO / MD or delegate)', 'Single accountable decision-maker'),
        (2, 'Company Secretary', 'Controls Bursa LINK submissions and the regulatory record'),
        (3, 'Head of Legal / General Counsel', 'Privilege, legal exposure, regulator posture'),
        (4, 'Head of Corporate Communications', 'Statements, media, social, languages'),
        (5, 'CFO / Head of Investor Relations', 'Market impact, lenders, ratings, shareholders')]) + '</table>'
        '<div class="box"><b>Nobody needs permission to raise the alarm.</b> Any one of the Core Five may declare a minimum Level 2 on their own authority.</div>'
        '<div class="box dk"><b>Bursa first, everyone else second.</b> For a material event: Bursa LINK announcement, then press release, website and social, then staff note, then analyst calls, then stakeholder letters. Life-safety instructions are never delayed.</div>'
        '<p class="lbl" style="margin-top:5mm">Names for this quarter</p>' + ''.join(f'<div class="fill"></div>' for _ in range(5)), 'Playbook Sections 2.2, 6, 9', 'Who'))
    C.append(('Severity levels and who convenes', '<div class="lv"><div><b>L1 Issue</b>Contained, local, low visibility. Head of function.</div><div><b>L2 Incident</b>Notable, manageable with HQ support. Core Five, virtual.</div><div><b>L3 Crisis</b>Threatens brand, licence or share price. Full CMT; Chair told.</div><div class="l4"><b>&#9650; L4 Critical</b>Existential or systemic. Board convened; advisers on site.</div></div>'
        '<p class="lbl" style="margin-top:4.4mm">Escalate if any is true</p><ul>'
        '<li>A journalist, regulator, enforcement agency or politician has asked.</li><li>Someone has been killed or seriously harmed.</li><li>Personal data may have left your control.</li><li>Unexplained price or volume movement, or Bursa has contacted you.</li><li>Corruption, fraud or misconduct allegations involving directors or senior management.</li><li>A major customer, lender or regulator has expressed concern.</li><li>It is on WhatsApp in a form you did not create.</li><li style="color:#B3261E"><b>&#9650; Anything touches race, religion or royalty (at least Level 3).</b></li><li><b>You are not sure.</b></li></ul>'
        '<div class="box">A level is a working assumption, reviewed every hour. <b>Upgrade quickly, downgrade slowly.</b> The numeric thresholds in the playbook are examples; the Board should approve yours.</div>', 'Playbook Sections 7.2 to 7.3', 'Classify'))
    C.append(('Escalation clocks', '<table><tr><th>From</th><th>To</th><th>By</th></tr><tr><td><b>Anyone</b></td><td>Head of function and Head of Comms / CoSec</td><td><b class="red">&#9650; Immediately</b></td></tr><tr><td><b>Comms / CoSec</b></td><td>Core Five</td><td><b>15 min</b></td></tr><tr><td><b>Core Five</b></td><td>CMT convened (L3–4)</td><td><b>60 min</b></td></tr><tr><td><b>Crisis Lead</b></td><td>Chair and ARC Chair</td><td><b>60 min (L3); immediately (L4)</b></td></tr></table>'
        '<div class="box">These are defaults. Calibrate them to your company and have the Board approve them.</div>'
        '<p class="lbl" style="margin-top:5mm">Regulatory clocks to start (verify with counsel)</p><table><tr><th>Regulator</th><th>Window</th></tr><tr><td>Bursa, material information</td><td><b class="red">&#9650; Immediately</b></td></tr><tr><td>PDPC, personal data breach</td><td>72 hours</td></tr><tr><td>Affected individuals</td><td>Up to 7 days after PDPC notice</td></tr><tr><td>NACSA, NCII entities only</td><td>6 hours, supplement by day 14</td></tr><tr><td>DOSH, workplace fatality</td><td>Immediate notice, written report within 7 days</td></tr></table>'
        '<p class="sub" style="margin-top:2mm">Windows come from secondary sources and are not checked against official texts.</p>', 'Playbook Sections 2.3, 5, 7.4', 'Clocks'))
    C.append(('Clock board (fill in live)', '<table><tr><th style="width:36mm">Clock</th><th style="width:22mm">Started</th><th style="width:22mm">Due</th><th>Owner</th><th style="width:10mm">Done</th></tr>' + ''.join('<tr>' + '<td style="height:10.4mm"></td>' * 4 + '<td><span class="cb"></span></td></tr>' for _ in range(12)) + '</table>', 'Write the time you learned of the event in the first column. Every clock needs one owner.', 'Worksheet W1'))
    C.append(('Disclosure decision tree', f'<div style="margin-top:2mm">{diagrams.decision_tree()}</div>', 'Playbook Section 9.2. Counsel decides the final call.', 'Disclose'))
    C.append(('The Five-Line statement', '<table><tr><th>Line</th><th>Purpose</th><th>Frame</th></tr>' + ''.join(f'<tr><td class="t">{a}</td><td>{b}</td><td class="o" style="width:52mm;font-size:7.4pt">{c}</td></tr>' for a, b, c in [
        ('1 Acknowledge', 'What happened. Verified facts only.', '“[Company] confirms that [fact] occurred at [place] on [date/time].”'),
        ('2 Care', 'Who is affected and how we are helping.', '“Our first priority is [people]. We are [support actions].”'),
        ('3 Action', 'What we are doing now and who is involved.', '“We have [contained / stopped / notified]. [Authority] is involved.”'),
        ('4 Accountability', 'What we will find out and report.', '“We will establish the cause. We will share what we learn.”'),
        ('5 Next', 'When and where the next update comes.', '“We will update at [time] on [channel].”')]) + '</table>'
        '<div class="box crit"><b>&#9650; Never</b> state a cause, a number or a date you cannot verify. Never speculate. One spokesperson. Bursa first if the matter is material.</div>', 'Playbook Section 11.1', 'Say'))
    C.append(('Holding statements: English and Bahasa Malaysia', '<p class="lbl">English (T7)</p><div class="q"><p>[Company] is aware of [factual description] at [location] on [date/time].</p><p>Our first priority is [the safety and wellbeing of those affected / the security of our systems and data].</p><p>We have activated our crisis management procedures and are working with [relevant authorities].</p><p>We will provide further information as soon as it is verified. The next update will be issued by [time] at [website / Bursa announcement].</p><p><i>Media enquiries: [name, phone, email].</i></p></div>'
        '<p class="lbl" style="margin-top:3mm">Bahasa Malaysia (T7)</p><div class="q"><p>[Syarikat] mengesahkan bahawa [penerangan ringkas berdasarkan fakta] telah berlaku di [lokasi] pada [tarikh/masa].</p><p>Keutamaan kami ialah [keselamatan dan kebajikan mereka yang terjejas / mengamankan sistem dan data kami].</p><p>Kami telah melaksanakan prosedur pengurusan krisis dan sedang bekerjasama dengan [pihak berkuasa berkaitan].</p><p>Maklumat lanjut akan dikongsi sebaik sahaja disahkan. Kemas kini seterusnya akan dikeluarkan menjelang [masa] di [laman web / pengumuman Bursa].</p><p><i>Pertanyaan media: [nama, nombor telefon, e-mel].</i></p></div>'
        '<p class="sub">Have a native speaker review the BM text before use. Issue English and BM together.</p>', 'Playbook Template T7', 'Say'))
    C.append(('Insider notice and Bursa-first order', '<div class="box crit" style="margin-top:0"><b>&#9650; Tell everyone who now knows:</b> do not trade, do not tip. Start the insider log within 20 minutes (T6, T5).</div>'
        '<p class="lbl" style="margin-top:4.4mm">The do-not-trade notice says</p><ul><li>Do <b>not</b> buy, sell or deal, directly or through family, nominees or connected persons, until told in writing that the restriction has ended.</li><li>Do <b>not</b> disclose to anyone without a need to know, and do not advise or encourage others to deal.</li><li>Dealing while holding material non-public information may be a criminal offence under the Capital Markets and Services Act 2007 (s.188). <i>Verify with counsel.</i></li><li>No personal chat, email or social media. Use only the designated channel.</li><li>Reply to confirm receipt and compliance.</li></ul>'
        '<p class="lbl" style="margin-top:4.4mm">Insider log</p><table><tr><th>Name</th><th>Told at</th><th>By</th><th>Notice sent</th></tr>' + ''.join('<tr>' + '<td style="height:8.4mm"></td>' * 4 + '</tr>' for _ in range(6)) + '</table>', 'Playbook Sections 9, T5, T6', 'Protect'))
    C.append(('Contact tree', '<table><tr><th style="width:36mm">Role</th><th>Name</th><th style="width:34mm">Mobile</th><th style="width:34mm">Alternate</th></tr>' + ''.join(f'<tr><td><b>{r}</b></td>' + '<td style="height:9.4mm"></td>' * 3 + '</tr>' for r in ['Crisis Lead', 'Company Secretary', 'Head of Legal', 'Head of Comms', 'CFO / IR', 'Chair', 'ARC Chair', 'CISO / IT', 'HSE / Ops', 'Bursa (via CoSec)', 'External counsel', 'PR agency', 'Insurer hotline']) + '</table>', 'Keep a current copy in the bag, the desk drawer and the security desk. Test it twice a year.', 'Reach'))
    return C

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--brand', default='#0A1F55'); ap.add_argument('--footer', default='Confidential · Version 1.0 draft'); ap.add_argument('--out', default='pocket-cards.pdf')
    a = ap.parse_args(); cs = cards()
    body = ''.join(card(i + 1, len(cs), *c[:2], sub=c[2], section=c[3]) for i, c in enumerate(cs)).replace('{{FOOTER}}', a.footer)
    css = CSS.replace('{{BRAND}}', a.brand)
    HTML(string=f'<!doctype html><meta charset="utf-8"><style>{css}</style><body>{body}</body>').write_pdf(a.out)
    print('wrote', a.out, len(cs), 'cards')

if __name__ == '__main__':
    main()
