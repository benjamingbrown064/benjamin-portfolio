#!/usr/bin/env python3
"""Apply copy edits to the site now AND record them in scripts/design-patches.json, so they survive the next
design import. usage: python3 scripts/copy-edit.py EDITS.json DESIGN_DIR [--dry]

EDITS.json is a list of {"file": design file (e.g. "Ben Brown Portfolio v12.html", "v12/bb-flow.js"), "old", "new"}.
Each "old" must appear exactly once, both in the design file (after the existing patches) and in the site's copy.
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
edits = json.load(open(sys.argv[1], encoding="utf-8"))
design = sys.argv[2]
dry = "--dry" in sys.argv
patches_path = os.path.join(ROOT, "scripts", "design-patches.json")
patches = json.load(open(patches_path, encoding="utf-8"))
PAGES = {"Ben Brown Portfolio v12.html": "home", "work.html": "work", "services.html": "method", "journal.html": "journal",
         "journal-article.html": "journal-article", "contact.html": "contact", "discovery.html": "discovery",
         "work/warrantyos-v3.html": "work-warrantyos", "work/taskbox-v2.html": "work-taskbox", "work/govscape.html": "work-govscape"}


def site_file(f):
    if f in PAGES:
        return os.path.join(ROOT, "site", "pages", PAGES[f] + ".html")
    return os.path.join(ROOT, "public", "site", f)


def patched_design(f, extra):
    text = open(os.path.join(design, f), encoding="utf-8").read()
    for p in patches + extra:
        if p["file"] == f:
            text = text.replace(p["old"], p["new"])
    return text


bad = []
new_patches = []
site_texts = {}
for e in edits:
    d = patched_design(e["file"], new_patches)
    sf = site_file(e["file"])
    s = site_texts.setdefault(sf, open(sf, encoding="utf-8").read())
    nd, ns = d.count(e["old"]), s.count(e["old"])
    if nd != 1 or ns != 1:
        bad.append(f"{e['file']}: design {nd}x, site {ns}x: {e['old'][:70]!r}")
        continue
    site_texts[sf] = s.replace(e["old"], e["new"])
    new_patches.append({"file": e["file"], "old": e["old"], "new": e["new"], "count": 1})

for b in bad:
    print("SKIP", b)
print(f"{len(new_patches)} of {len(edits)} edits ok")
if not dry and not bad:
    for sf, s in site_texts.items():
        open(sf, "w", encoding="utf-8").write(s)
    json.dump(patches + new_patches, open(patches_path, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(patches_path, "a").write("\n")
    print("written")
elif bad:
    print("nothing written: fix the skipped edits first")
