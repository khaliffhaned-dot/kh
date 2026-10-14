#!/usr/bin/env python3
"""Build the Crisis Communications Playbook PDF manual (A4, "Operations Manual" layout).

Usage:
  python3 build_manual.py [--logo path/to/logo.png] [--brand "#0A1F55"]
                          [--footer "Confidential · Version 1.0 draft"] [--out manual.pdf]

Needs: pandoc, weasyprint, beautifulsoup4, lxml.  Font: Arial (or Liberation Sans, installed on most Linux systems).
"""
import argparse, pathlib, re, subprocess, sys
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from weasyprint import HTML
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import diagrams
from worksheets import worksheets_html

HERE = pathlib.Path(__file__).parent.resolve()
DEFAULT_MD = (HERE.parent / 'crisis-communications-playbook-malaysia-plc.md')

def ensure_fonts(fonts_dir):
    """Arial, falling back to the metric-compatible Liberation Sans. No downloads needed."""
    return ''


def mix(hexc, amount=0.9):
    h = hexc.lstrip('#'); r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return '#%02X%02X%02X' % tuple(round(c + (255 - c) * amount) for c in (r, g, b))


def pandoc(md):
    return subprocess.run(['pandoc', '-f', 'gfm+hard_line_breaks', '-t', 'html5', '--no-highlight'], input=md, text=True, capture_output=True, check=True).stdout


def tagify(html):
    def rep(m):
        label, note = m.group(1), (m.group(2) or '').strip()
        cls = 'c' if label == 'C' else 'v' if label == 'V' else 'cv'
        out = f'<span class="tag {cls}">{label}</span>'
        if note:
            out += f' <span class="tagnote">({note.lstrip("—- ").strip()})</span>'
        return out
    html = re.sub(r'<strong>\[(C|V|C/V)\]</strong>', lambda m: f'<span class="tag {"c" if m.group(1) == "C" else "v" if m.group(1) == "V" else "cv"}">{m.group(1)}</span>', html)
    html = re.sub(r'\[(C|V|C/V)((?: [—-] [^\]<]*)?)\]', rep, html)
    return html


def sentence(s):
    s = s.strip().lower()
    return s[:1].upper() + s[1:]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--md', default=str(DEFAULT_MD))
    ap.add_argument('--logo'); ap.add_argument('--brand', default='#0A1F55')
    ap.add_argument('--footer', default='Confidential · Version 1.0 draft')
    ap.add_argument('--out', default=str(HERE / 'Crisis-Communications-Playbook-Manual.pdf'))
    a = ap.parse_args()

    fonts_css = ensure_fonts(HERE / 'fonts')
    css = (HERE / 'manual.css').read_text().replace('{{BRAND}}', a.brand).replace('{{BRAND_TINT}}', mix(a.brand)).replace('{{FOOTER}}', a.footer)

    md = pathlib.Path(a.md).read_text(encoding='utf-8')
    md = re.sub(r'^# Crisis Communications Playbook\n+\*\*For Public Listed Companies[^\n]*\n', '', md, count=1)
    md = re.sub(r'## Contents\n+<!-- BEGIN-TOC -->.*?<!-- END-TOC -->\n+---\n', '', md, flags=re.S)
    html = pandoc(md)
    soup = BeautifulSoup(f'<body>{html}</body>', 'lxml'); body = soup.body

    # ---- group into front matter and parts ----
    kids = [c for c in body.children if getattr(c, 'name', None)]
    front, parts, cur = [], [], None
    for c in kids:
        if c.name == 'h1':
            cur = {'h1': c, 'els': []}; parts.append(cur)
        elif cur is None:
            front.append(c)
        else:
            cur['els'].append(c)

    def prep_heading(h, in_front=False):
        t = ' '.join(h.get_text().split())
        if h.name == 'h2':
            m = re.match(r'^(\d+)\.\s+(.+)$', t); m2 = re.match(r'^Appendix ([A-F]) — (.+)$', t)
            if m: num, title = f'{int(m.group(1)):02d}', m.group(2)
            elif m2: num, title = m2.group(1), m2.group(2)
            else: num, title = None, t
        elif h.name == 'h3':
            m = re.match(r'^(\d+\.\d+)\s+(.+)$', t) or re.match(r'^([ST]\d+[A-E]?)\s+—\s+(.+)$', t) or re.match(r'^([A-F]\.\d+)\s+(.+)$', t)
            num, title = (m.group(1), m.group(2)) if m else (None, t)
            if m and re.match(r'^S\d+$', num): h['class'] = h.get('class', []) + ['scn']
        else:
            return None, t
        if num:
            h.clear(); title = ' '.join(title.split()); sp = soup.new_tag('span', attrs={'class': 'num'}); sp.string = num; h.append(sp); h.append(title)
        return num, title

    # front matter: document control + read-this-first
    front_html = soup.new_tag('section', attrs={'class': 'front'})
    dc = soup.new_tag('h2', attrs={'class': 'front first', 'id': 'document-control'}); dc.string = 'Document control'
    front_html.append(dc)
    first_table = True
    for el in front:
        if el.name == 'h2':
            el['class'] = ['front']
        if el.name == 'table' and first_table:
            el['class'] = ['ctrl']; first_table = False
        front_html.append(el)

    toc_entries = []   # (kind, id, num, title)
    parts_out = []
    for idx, p in enumerate(parts):
        h1 = p['h1']; t = ' '.join(h1.get_text().split())
        mm = re.match(r'^PART ([A-F]) — (.+)$', t)
        if mm: letter, name, pid = mm.group(1), sentence(mm.group(2)), f'part-{mm.group(1).lower()}'
        else: letter, name, pid = 'A–F', 'Appendices', 'part-appendices'
        sec = soup.new_tag('section', attrs={'class': 'part', 'id': pid})
        p['letter'], p['name'], p['id'] = letter, name, pid
        h2s = []
        for el in p['els']:
            if el.name in ('h2', 'h3', 'h4'):
                el_num, el_title = prep_heading(el)
                if el.name == 'h2':
                    h2s.append((el.get('id'), el_num, el_title))
                    toc_entries.append(('h2', el.get('id'), el_num, el_title, pid))
                elif el.name == 'h3' and el_num and re.match(r'^[ST]\d+$', el_num):
                    toc_entries.append(('h3', el.get('id'), el_num, el_title, pid))
            sec.append(el)
        p['h2s'] = h2s; p['sec'] = sec; parts_out.append(p)

    # ---- appendix F: worksheets (added to the last part) ----
    ws_html, ws_toc = worksheets_html()
    app = parts_out[-1]
    ws_frag = BeautifulSoup(ws_html, 'lxml').body
    for el in list(ws_frag.children):
        if getattr(el, 'name', None): app['sec'].append(el)
    app['h2s'].append(('appendix-f', 'F', 'Worksheets'))
    toc_entries.append(('h2', 'appendix-f', 'F', 'Worksheets', app['id']))
    for wid, wnum, wtitle in ws_toc:
        toc_entries.append(('h3', wid, wnum, wtitle, app['id']))

    # ---- element-level transforms over the whole document ----
    allsec = [front_html] + [p['sec'] for p in parts_out]
    for sec in allsec:
        for bq in sec.find_all('blockquote'):
            txt = bq.get_text().strip()
            prev = bq.find_previous(['h2', 'h3', 'h4'])
            ptxt = prev.get_text() if prev else ''
            cls = ['callout']
            if txt.lower().startswith('bold play'):
                cls.append('play')
                st = bq.find('strong')
                if st: st.string = re.sub(r'^Bold play — ', '', st.get_text())
            elif re.match(r'^(T\d+)', ptxt) and not txt.startswith(('Important', 'Rules', 'These are')):
                cls.append('specimen')
            else:
                cls.append('note') if txt.startswith(('Reminder', 'How to read', 'Important')) else None
            bq.name = 'div'; bq['class'] = cls
        for tb in sec.find_all('table'):
            if 'ctrl' in (tb.get('class') or []): continue
            ncol = len(tb.find('tr').find_all(['th', 'td'])) if tb.find('tr') else 0
            if ncol >= 5 and 'form' not in (tb.get('class') or []) and 'wsmeta' not in (tb.get('class') or []):
                tb['class'] = (tb.get('class') or []) + ['wide']
        for ul in sec.find_all('ul'):
            lis = ul.find_all('li', recursive=False)
            if lis and all(li.find('input', attrs={'type': 'checkbox'}) for li in lis if li.get_text().strip()):
                ul['class'] = ul.get('class', []) + ['tasks']
        for inp in sec.find_all('input', attrs={'type': 'checkbox'}):
            b = soup.new_tag('span', attrs={'class': 'box'}); inp.replace_with(b)
        for pre in sec.find_all('pre'):
            txtp = pre.get_text()
            if 'EVENT / INFORMATION / RUMOUR / QUERY ARRIVES' in txtp:
                fig = BeautifulSoup(f'<figure class="diagram">{diagrams.decision_tree()}<figcaption>Figure · Disclosure decision tree (Section 9.2)</figcaption></figure>', 'lxml').body.figure
                pre.replace_with(fig)
            elif 'BOARD OF DIRECTORS' in txtp and 'CRISIS LEAD' in txtp:
                fig = BeautifulSoup(f'<figure class="diagram">{diagrams.governance()}<figcaption>Figure · Crisis governance structure (Section 6.1)</figcaption></figure>', 'lxml').body.figure
                pre.replace_with(fig)

    # exhibits (charts built with chartkit, see charts/make.py)
    def exhibit(n, title, img, note):
        return BeautifulSoup(f'<figure class="exhibit"><div class="xn">Exhibit {n}</div><div class="xt">{title}</div><img src="{(HERE / "charts" / img).as_uri()}"><figcaption>{note}</figcaption></figure>', 'lxml').body.figure
    for sec in allsec:
        for h in sec.find_all('h3'):
            t = ' '.join(h.get_text().split())
            if t.startswith('2.3'):
                nxt = h.find_next_sibling(['h2', 'h3'])
                (nxt.insert_before if nxt else sec.append)(exhibit(1, 'Latest compliant timing of each regulatory clock, in days from discovery', 'clock-windows.png', 'Indicative. Secondary sources only; verify with counsel. Source: this playbook, Sections 2.3 and 5.'))
            if t.startswith('7.4'):
                nxt = h.find_next_sibling(['h2', 'h3'])
                (nxt.insert_before if nxt else sec.append)(exhibit(2, 'Default escalation clocks for a Level 3 crisis, from first awareness', 'escalation.png', 'Defaults to calibrate to your company and have the Board approve. Source: this playbook, Sections 7.2 to 7.4.'))

    # Appendix C: show the domain under each link (paper readers cannot click)
    c1 = app['sec'].find(lambda t: t.name == 'h3' and t.get_text().strip().startswith('C.1'))
    if c1:
        for a_ in c1.find_all_next('a', href=True):
            if a_.find_parent('table') is None: break
            if a_['href'].startswith('http'):
                d = soup.new_tag('span', attrs={'class': 'dom'}); d.string = urlparse(a_['href']).netloc
                a_.insert_after(d)

    # ---- contents ----
    def esc(s): return s.replace('&', '&amp;')
    toc = ['<section class="toc"><h2 class="front pg" id="contents">Contents</h2><ol>']
    cur_part = None
    for p in parts_out:
        toc.append(f'<li class="tp"><a href="#{p["id"]}"><span class="l">{p["letter"] if len(p["letter"]) == 1 else "+"}</span>{"Part " + p["letter"] + " · " if len(p["letter"]) == 1 else ""}{esc(p["name"])}</a></li>')
        for kind, hid, num, title, pid in toc_entries:
            if pid != p['id']: continue
            cls = 'te' if kind == 'h2' else 'te sub'
            toc.append(f'<li class="{cls}"><a href="#{hid}"><span class="n">{num or ""}</span>{esc(title)}</a></li>')
    toc.append('</ol></section>')
    toc_html = '\n'.join(toc)

    # ---- dividers ----
    blurbs = {'A': 'Principles, the Malaysian context and the regulatory landscape. Start here.',
              'B': 'Who decides, how you escalate and what happens hour by hour.',
              'C': 'Disclosure to Bursa first, then stakeholders, messaging, media, digital and staff.',
              'D': 'Thirteen scenario playbooks, one page each.',
              'E': 'Templates in English and Bahasa Malaysia, and three tabletop exercises.',
              'F': 'Preparedness, recovery and the after-action review.',
              'A–F': 'Directory, glossary, source register, legal questions and printable worksheets.'}

    def divider(p):
        items = ''.join(f'<li><a href="#{hid}"><span class="n">{num or ""}</span>{esc(title)}</a></li>' for hid, num, title in p['h2s'])
        dp = f'PART {p["letter"]} · {p["name"]}' if len(p['letter']) == 1 else 'APPENDICES'
        eyebrow = f'Part {p["letter"]} of F' if len(p['letter']) == 1 else 'Reference'
        return (f'<section class="divider" id="{p["id"]}-d"><div class="bar"></div><div class="eyebrow">{eyebrow}</div><div class="ltr">{p["letter"]}</div>'
                f'<h1 data-part="{dp}">{esc(p["name"])}</h1><p class="blurb">{blurbs.get(p["letter"], "")}</p><ol class="dvtoc">{items}</ol></section>')

    # ---- cover ----
    logo = f'<div class="logo has"><img src="{pathlib.Path(a.logo).resolve().as_uri()}"></div>' if a.logo else '<div class="logo">Your logo here</div>'
    cover = (f'<section class="cover"><div class="bar"></div>{logo}<div class="conf">Confidential<br>Draft for adoption</div><div class="eyebrow">Bursa Malaysia Main Market and ACE Market</div>'
             f'<h1>Crisis<br>Communications<br>Playbook</h1><div class="rule"></div><p class="sub">For public listed companies in Malaysia. Disclosure, stakeholders and the first sixty minutes.</p>'
             f'<div class="tlcap">The first sixty minutes</div><div class="tl">{diagrams.timeline(color='#E9B84A', ink='#FFFFFF', dot=a.brand)}</div>'
             f'<table class="cv"><tr><td>Version</td><td>1.0, draft for adoption</td></tr><tr><td>Date</td><td>14 October 2026</td></tr>'
             f'<tr><td>Owner</td><td>[Group Chief Communications Officer / Head of Corporate Affairs]</td></tr>'
             f'<tr><td>Classification</td><td>Confidential. Crisis Management Team, Board and named alternates</td></tr>'
             f'<tr><td>Status of legal content</td><td>Not verified against official Bursa Malaysia text. See “Read this first”.</td></tr></table></section>')

    # ---- assemble ----
    body_html = cover + str(front_html) + toc_html
    for p in parts_out:
        body_html += divider(p) + str(p['sec'])
    body_html = tagify(body_html)
    doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Crisis Communications Playbook</title><meta name="author" content="Crisis Communications Playbook for Malaysian PLCs"><style>{fonts_css}\n{css}</style></head><body>{body_html}</body></html>'
    (HERE / 'manual.debug.html').write_text(doc, encoding='utf-8')
    HTML(string=doc, base_url=str(HERE)).write_pdf(a.out)
    print('wrote', a.out)


if __name__ == '__main__':
    main()
