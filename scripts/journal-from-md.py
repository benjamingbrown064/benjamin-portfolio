#!/usr/bin/env python3
"""Turn an article written in Markdown into the body file the journal uses.

usage: python3 scripts/journal-from-md.py ARTICLE.md SLUG [FIGURES.json]

Writes site/content/journal/SLUG.html. The first "# Title" line, an "**Alternative headlines**" list and the
"**Standfirst:**" line are editorial and are left out (the title and standfirst go in src/lib/journal.ts).
Any line starting "[NEEDS" is a note to the author: it is dropped and reported, never published.

FIGURES.json is a list of pictures to place, each:
  {"heading": "text the section heading starts with", "after": 2, "file": "name-without-extension",
   "alt": "...", "caption": "...", "width": 1600, "height": 900}
"after" is the number of the paragraph (within that section) the picture follows. Two entries with the same
heading and "after" are set side by side. Pictures are read from /media/journal/SLUG/NAME.jpg.
"""
import html
import json
import re
import sys

md_path, slug = sys.argv[1], sys.argv[2]
figures = json.load(open(sys.argv[3], encoding="utf-8")) if len(sys.argv) > 3 else []
src = open(md_path, encoding="utf-8").read()
body = src.split("\n---\n", 1)[1] if "\n---\n" in src else src
BASE = "/media/journal/%s/" % slug


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", lambda m: '<a href="%s" target="_blank" rel="noopener">%s</a>' % (m.group(2), m.group(1)), t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"(?<![*\w])\*([^*\n]+)\*(?![*\w])", r"<em>\1</em>", t)
    return t.replace("'", "’")


def figure(f):
    return '<figure><img src="%s%s.jpg" alt="%s" width="%d" height="%d" loading="lazy" decoding="async"><figcaption>%s</figcaption></figure>' % (
        BASE, f["file"], html.escape(f["alt"], quote=True), f["width"], f["height"], inline(f["caption"]))


out, heading, n, used, dropped = [], "", 0, set(), []
for block in re.split(r"\n\s*\n", body):
    block = block.strip()
    if not block or block.startswith("# "):
        continue
    if block.startswith("[NEEDS"):
        dropped.append(block[:90])
        continue
    if block.startswith("## "):
        heading, n = block[3:].strip(), 0
        out.append("<h2>%s</h2>" % inline(heading))
        continue
    lines = block.splitlines()
    if all(l.lstrip().startswith("- ") for l in lines):
        out.append("<ul>" + "".join("<li>%s</li>" % inline(l.lstrip()[2:].strip()) for l in lines) + "</ul>")
        continue
    if block[0] in "#>|":
        raise SystemExit("unsupported Markdown block: " + block[:60])
    n += 1
    out.append("<p>%s</p>" % inline(" ".join(l.strip() for l in lines)))
    here = [i for i, f in enumerate(figures) if heading.startswith(f["heading"]) and f["after"] == n]
    if here:
        used.update(here)
        figs = "".join(figure(figures[i]) for i in here)
        out.append('<div class="ax-pair">%s</div>' % figs if len(here) > 1 else figs)

missing = [figures[i]["file"] for i in range(len(figures)) if i not in used]
if missing:
    raise SystemExit("pictures not placed (check heading/after): %s" % missing)
open("site/content/journal/%s.html" % slug, "w", encoding="utf-8").write("\n".join(out) + "\n")
words = len(re.sub(r"<[^>]+>", " ", " ".join(out)).split())
print("%s: %d blocks, %d words (about %d min), %d links, %d pictures" % (slug, len(out), words, max(1, round(words / 220)), sum(o.count("<a ") for o in out), len(figures)))
for d in dropped:
    print("DROPPED author note:", d)
