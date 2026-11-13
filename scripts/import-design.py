#!/usr/bin/env python3
"""Import the static design export into the Next.js site.

Usage:  python3 -I scripts/import-design.py "<path to 'Benjamin Brown Website v12' folder>"

Writes:
  site/pages/<name>.html   full HTML documents with clean links, absolute asset paths and {{tokens}}
  public/site/**           stylesheets, scripts, images, fonts and embedded films

The design is plain HTML/CSS/JS. Pages are served by route handlers (src/lib/site.ts) which fill in
the tokens. Re-run this script when a new design export arrives; edits that must survive a re-import
belong in PATCHES below or in public/site/v13/ (hand-written, never overwritten).
"""
import hashlib, os, re, shutil, subprocess, sys, urllib.parse, urllib.request, json

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_OUT = os.path.join(ROOT, "site", "pages")
PUB = os.path.join(ROOT, "public", "site")

# design file -> (output name, public URL)
PAGES = {
    "Ben Brown Portfolio v12.html": ("home", "/"),
    "index.html": (None, "/"),
    "work.html": ("work", "/work"),
    "services.html": ("method", "/method"),
    "journal.html": ("journal", "/journal"),
    "journal-article.html": ("journal-article", "/journal"),  # template only; articles are added one by one
    "contact.html": ("contact", "/contact"),
    "discovery.html": ("discovery", "/discovery"),
    "work/warrantyos-v3.html": ("work-warrantyos", "/work/warrantyos"),
    "work/warrantyos-v2.html": (None, "/work/warrantyos"),
    "work/taskbox-v2.html": ("work-taskbox", "/work/taskbox"),
    "work/govscape.html": ("work-govscape", "/work/govscape"),
    # Case studies still being written: cards point at the work index until they exist.
    "work/case-study.html": (None, "/work"),
}
PAGE_BY_BASENAME = {}
for k, (_, url) in PAGES.items():
    PAGE_BY_BASENAME.setdefault(os.path.basename(k), url)

SKIP_FILES = {
    "Mobile Preview.html", "README.md", "index.html", "work/case-study.html", "work/warrantyos-v2.html",
    "work/warrantyos-v2.jsx",
    "v3/bb-agent.js",  # replaced by public/site/v13/toto.js
    "v5/voice.js",  # browser-speech layer for the old chat; voice returns with the assistant's own voice stage
}
SKIP_DIRS = ()
OPTIMISE_CSS = os.environ.get("OPTIMISE_CSS", "1") != "0"
ASSET_EXT = (".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif", ".mp4", ".woff2", ".css", ".js", ".jsx", ".html", ".ico")
RENAMED = {}  # public-relative path -> new public-relative path (png -> jpg, jsx -> js)


def rel(p):
    return os.path.relpath(p, SRC).replace(os.sep, "/")


def is_external(u):
    return re.match(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", u, re.I) is not None


def rewrite_url(u, base_dir):
    """Map a relative design URL to a site URL. base_dir is the design-relative dir of the referring file."""
    if not u or is_external(u) or u.startswith("/") or "{{" in u:
        return u
    path, sep, frag = u.partition("#")
    path, qsep, query = path.partition("?")
    path = urllib.parse.unquote(path)
    if not path:
        return u
    target = os.path.normpath(os.path.join(base_dir, path)).replace(os.sep, "/")
    if target in PAGES:
        url = PAGES[target][1]
        if target == "work/case-study.html":
            return url  # drop the fragment, the template is not published
        return url + (sep + frag if frag else "")
    if target.startswith(".."):
        return u
    target = RENAMED.get(target, target)
    return "/site/" + urllib.parse.quote(target) + (sep + frag if frag else "")


ATTR_RE = re.compile(r'(\s(?:href|src|poster|data-src|data-poster|content)=)(["\'])(.*?)\2', re.S)
CSSURL_RE = re.compile(r'url\((["\']?)([^)"\']+)\1\)')


def rewrite_html(html, base_dir):
    def attr(m):
        name, q, val = m.group(1), m.group(2), m.group(3)
        if name.strip().startswith("content") and not re.search(r"\.(png|jpg|svg|html)$", val):
            return m.group(0)
        return name + q + rewrite_url(val, base_dir) + q
    html = ATTR_RE.sub(attr, html)
    # url() inside style attributes and <style> blocks of the page
    html = CSSURL_RE.sub(lambda m: "url(" + m.group(1) + rewrite_url(m.group(2), base_dir) + m.group(1) + ")", html)
    return html


STR_RE = re.compile(r'(["\'])((?:\.\./|[A-Za-z0-9_%-]+/)*[A-Za-z0-9_%. -]+\.(?:html|png|jpg|jpeg|svg|mp4|webp))((?:[#?][^"\']*)?)\1')


def rewrite_script(code, base_dir):
    """Rewrite path-like string literals in a script. Page links are matched by file name because scripts
    are shared by pages at different depths."""
    def lit(m):
        q, path, tail = m.group(1), m.group(2), m.group(3)
        base = os.path.basename(urllib.parse.unquote(path))
        if path.endswith(".html") and base in PAGE_BY_BASENAME and "assets" not in path:
            return q + PAGE_BY_BASENAME[base] + tail + q
        if "/" not in path:
            return m.group(0)  # bare file names inside scripts are not paths we own
        return q + rewrite_url(path, base_dir) + tail + q
    return STR_RE.sub(lit, code)


def run(cmd, **kw):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, **kw)


def has_alpha(path):
    try:
        out = run(["sips", "-g", "hasAlpha", path]).stdout
        return "hasAlpha: yes" in out
    except Exception:
        return True


def optimise_image(src, dst_rel):
    """Copy an image into public/site, shrinking large photographs. Returns the final public-relative path."""
    dst = os.path.join(PUB, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    ext = os.path.splitext(src)[1].lower()
    size = os.path.getsize(src)
    if ext in (".png", ".jpg", ".jpeg") and size > 350_000:
        to_jpeg = ext != ".png" or not has_alpha(src)
        if to_jpeg:
            out_rel = os.path.splitext(dst_rel)[0] + ".jpg"
            out = os.path.join(PUB, out_rel)
            run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "78", "-Z", "2200", src, "--out", out])
            if os.path.getsize(out) < size:
                return out_rel
            os.remove(out)
        else:
            run(["sips", "-Z", "2000", src, "--out", dst])
            if os.path.getsize(dst) < size:
                return dst_rel
    shutil.copyfile(src, dst)
    return dst_rel


def fetch(url, ua="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"):
    req = urllib.request.Request(url, headers={"User-Agent": ua})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def build_fonts():
    """Self-host the Google fonts the design links to (latin and latin-ext only)."""
    out_dir = os.path.join(PUB, "fonts")
    css_path = os.path.join(out_dir, "fonts.css")
    if os.path.exists(css_path):
        return
    os.makedirs(out_dir, exist_ok=True)
    css = fetch("https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&family=Anton&family=Archivo:wght@750&display=swap").decode()
    blocks = re.findall(r"/\* ([a-z-]+) \*/\s*(@font-face\s*{.*?})", css, re.S)
    keep, n = [], 0
    for subset, block in blocks:
        if subset not in ("latin", "latin-ext"):
            continue
        fam = re.search(r"font-family:\s*'([^']+)'", block).group(1).replace(" ", "")
        wght = re.search(r"font-weight:\s*([0-9 ]+)", block).group(1).strip().replace(" ", "-")
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        name = f"{fam}-{wght}-{subset}.woff2"
        with open(os.path.join(out_dir, name), "wb") as f:
            f.write(fetch(url))
        keep.append(block.replace(url, name))
        n += 1
    with open(css_path, "w") as f:
        f.write("/* Self-hosted copies of the Google fonts used by the design. Generated by scripts/import-design.py */\n" + "\n".join(keep) + "\n")
    print("fonts:", n, "files")


def build_vendor():
    out_dir = os.path.join(PUB, "vendor")
    os.makedirs(out_dir, exist_ok=True)
    for name, url in (("react.production.min.js", "https://unpkg.com/react@18.3.1/umd/react.production.min.js"),
                      ("react-dom.production.min.js", "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js")):
        p = os.path.join(out_dir, name)
        if not os.path.exists(p):
            with open(p, "wb") as f:
                f.write(fetch(url))


def compile_jsx(src_path, dst_rel):
    """Precompile a Babel-in-the-browser JSX file to plain JS (classic React.createElement)."""
    out_rel = os.path.splitext(dst_rel)[0] + ".js"
    out = os.path.join(PUB, out_rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    code = open(src_path, encoding="utf-8").read()
    code = rewrite_script(code, os.path.dirname(rel(src_path)))
    r = subprocess.run(["npx", "--yes", "esbuild@0.25.10", "--loader=jsx", "--jsx=transform", "--target=es2019", "--charset=utf8"],
                       input=code, capture_output=True, text=True, cwd=ROOT)
    if r.returncode != 0:
        raise SystemExit("esbuild failed for " + src_path + "\n" + r.stderr)
    with open(out, "w", encoding="utf-8") as f:
        f.write(r.stdout)
    return out_rel


# Text edits applied on every import: (file, old, new, expected count or None for "at least one").
PATCHES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "design-patches.json"), encoding="utf-8"))


def apply_patches(name, text):
    for p in PATCHES:
        if p["file"] != name:
            continue
        n = text.count(p["old"])
        if n == 0:
            raise SystemExit(f"patch did not match in {name}: {p['old'][:70]!r}")
        if "count" in p and n != p["count"]:
            raise SystemExit(f"patch matched {n} times, expected {p['count']} in {name}: {p['old'][:70]!r}")
        text = text.replace(p["old"], p["new"])
    return text


BLOCKS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "design-blocks")


def must_sub(pattern, repl, html, what, flags=re.S, optional=False):
    out, n = re.subn(pattern, lambda m: repl(m) if callable(repl) else repl, html, count=1, flags=flags)
    if n == 0 and not optional:
        raise SystemExit("structural edit did not match: " + what)
    return out


def wrap(name):
    return lambda m: "<!--block:%s-->%s<!--/block:%s-->" % (name, m.group(0), name)


SOON_TAG = '<span class="soon-tag">Coming soon</span>'
GO_RE = re.compile(r'<span class="go">.*?</span>', re.S)


def coming_soon_cards(html, src_rel):
    """Project cards whose case study is not written yet (WilboLaw, Ascra, Ghost Mode) carry a "Coming soon"
    label and are not links. In the design they are the cards that point at the unpublished case-study
    template, plus the Ghost Mode card. When a case study is published, give its card a real link in the
    design and it drops out of this automatically."""
    def unlink(m):
        inner = GO_RE.sub("", m.group(1), count=1)  # no arrow: there is nowhere to go yet
        inner = inner.replace('<div class="media img">', '<div class="media img">' + SOON_TAG, 1)
        return '<div class="card has-ov soon">' + inner + "</div>"
    html, n = re.subn(r'<a class="card has-ov" href="(?:work/)?case-study\.html[^"]*">(.*?)</a>', unlink, html, flags=re.S)
    if n != 2:
        raise SystemExit("expected 2 unpublished case-study cards in %s, found %d" % (src_rel, n))
    ghost = '<div class="card gx-card"><div class="media solo">'
    if html.count(ghost) != 1:
        raise SystemExit("Ghost Mode card not found in " + src_rel)
    return html.replace(ghost, '<div class="card gx-card soon"><div class="media solo">' + SOON_TAG)


def structural_edits(src_rel, html):
    """Edits that depend on page structure rather than exact text. Blocks wrapped in
    <!--block:name--> markers are kept, removed or replaced by src/lib/site.ts."""
    # footer: social links come from the fact sheet, legal links are real pages
    html = re.sub(r'<div><h4>Elsewhere</h4>(?:<a href="#">[^<]*</a>)+</div>', "{{footer_social}}", html)
    html = html.replace('<nav><a href="#">Privacy</a><a href="#">Terms</a></nav>',
                        '<nav><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>')
    if src_rel in ("Ben Brown Portfolio v12.html", "work.html"):
        html = coming_soon_cards(html, src_rel)
    if src_rel == "Ben Brown Portfolio v12.html":
        pricing = open(os.path.join(BLOCKS, "pricing.html"), encoding="utf-8").read().strip()
        html = must_sub(r'<section class="sec grey" id="pricing".*?</section>', pricing, html, "home pricing")
        # "Latest project" tile: the Taskbox "Talk it through" animation sits over the right of the photo.
        # It is decoration inside a link, so it is hidden from assistive technology and ignores the pointer.
        html = must_sub(r'(<a class="lt-c" href="work/taskbox-v2\.html" data-ov>\s*<img[^>]*>)',
                        lambda m: m.group(1) + '<iframe class="lt-film" src="/site/v13/films/taskbox-talk-half/index.html" title="" aria-hidden="true" tabindex="-1" loading="lazy" allowtransparency="true"></iframe>',
                        html, "latest project tile")
        html = must_sub(r'<section class="sec" id="journal".*?</section>', wrap("home_journal"), html, "home journal")
        html = must_sub(r'<a class="lt-c bw" href="journal-article\.html">.*?</a>', wrap("home_latest_journal"), html, "home latest journal tile")
    if src_rel == "journal.html":
        html = must_sub(r'<section class="jx-sec" data-screen-label="02 Latest entry">.*?</section>\s*<section class="jx-sec" id="entries".*?</section>',
                        wrap("journal_entries"), html, "journal entries")
    return html


HEAD_FONT_RE = re.compile(r'<link[^>]+fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*', re.I)


def process_page(src_rel, out_name):
    html = open(os.path.join(SRC, src_rel), encoding="utf-8").read()
    html = apply_patches(src_rel, html)
    html = structural_edits(src_rel, html)
    base_dir = os.path.dirname(src_rel)
    # fonts: one local stylesheet instead of Google
    html, n = HEAD_FONT_RE.subn("", html)
    html = html.replace("<head>", '<head>\n<link rel="stylesheet" href="/site/fonts/fonts.css">', 1)
    # case studies: local React, no Babel, compiled scripts
    html = re.sub(r'<script src="https://unpkg\.com/react@[^"]+"[^>]*></script>', '<script src="/site/vendor/react.production.min.js"></script>', html)
    html = re.sub(r'<script src="https://unpkg\.com/react-dom@[^"]+"[^>]*></script>', '<script src="/site/vendor/react-dom.production.min.js"></script>', html)
    html = re.sub(r'<script src="https://unpkg\.com/@babel/standalone[^"]+"[^>]*></script>\s*', "", html)
    html = re.sub(r'<script type="text/babel" src="([^"]+)\.jsx"', r'<script src="\1.js"', html)
    html = re.sub(r'<template id="__bundler_thumbnail">.*?</template>\s*', "", html, flags=re.S)
    html = rewrite_html(html, base_dir)
    # tokens filled in by src/lib/site.ts
    html = html.replace("</head>", "{{head}}\n</head>", 1)
    html = html.replace("</body>", "{{body_end}}\n</body>", 1)
    with open(os.path.join(PAGES_OUT, out_name + ".html"), "w", encoding="utf-8") as f:
        f.write(html)


# Scripts in the design that wrote their own styles into the page. Their CSS is lifted into a
# stylesheet (so it sits in the normal cascade) and the injecting lines are removed.
INJECTED_CSS = {"v12/bb-flow.js": "gen/flow.css", "v12/coffee.js": "gen/coffee.css"}
INJECT_RE = re.compile(r"const CSS=`(.*?)`;\s*const st=document\.createElement\('style'\);st\.textContent=CSS;document\.head\.appendChild\(st\);", re.S)
BLUE_FOCUS_RE = re.compile(r"[^{}]*\{outline:2px solid #0071E3;outline-offset:2px\}\n?")
READABLE_DIRS = ("v5/", "v6/", "v7/", "v11/", "v12/", "work/")
TO_FORMAT = []


def extract_injected_css(code, css_rel):
    m = INJECT_RE.search(code)
    if not m:
        raise SystemExit("expected injected CSS was not found for " + css_rel)
    css = BLUE_FOCUS_RE.sub("", m.group(1))  # focus styling is handled once, in v13/site.css
    out = os.path.join(PUB, css_rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "w", encoding="utf-8").write("/* Lifted from the script of the same name by scripts/import-design.py. */\n" + css.strip() + "\n")
    return code[:m.start()] + code[m.end():]


def format_scripts():
    """The design's scripts arrive as long compressed lines. Formatting changes nothing but makes them readable."""
    if not TO_FORMAT:
        return
    r = subprocess.run(["npx", "--yes", "prettier@3.6.2", "--write", "--print-width", "140", "--log-level", "warn"] + TO_FORMAT,
                       capture_output=True, text=True, cwd=ROOT)
    if r.returncode != 0:
        raise SystemExit("prettier failed\n" + r.stderr[-2000:])
    print("scripts formatted:", len(TO_FORMAT))


def optimise_css(text):
    """Minify the bundle. Rule merging ("restructuring") is deliberately off: with it on, the WarrantyOS
    case study rendered differently, because the layered design files rely on the order of their rules."""
    r = subprocess.run(["npx", "--yes", "csso-cli@4.0.2", "--no-restructure"], input=text, capture_output=True, text=True, cwd=ROOT)
    if r.returncode != 0 or not r.stdout.strip():
        raise SystemExit("csso failed\n" + r.stderr[-2000:])
    return r.stdout


LINK_RE = re.compile(r'<link rel="stylesheet" href="(/site/[^"]+?)(?:\?[^"]*)?">\s*')


def absolutise_css(css, css_public_rel):
    """Make url() and @import paths in a stylesheet absolute, so it can be moved into a bundle."""
    base = os.path.dirname(css_public_rel)
    def fix(m):
        q, u = m.group(1), m.group(2).strip()
        if is_external(u) or u.startswith("/") or u.startswith("data:"):
            return m.group(0)
        path, sep, tail = u.partition("#")
        t = os.path.normpath(os.path.join(base, urllib.parse.unquote(path))).replace(os.sep, "/")
        return "url(" + q + "/site/" + urllib.parse.quote(t) + (sep + tail if tail else "") + q + ")"
    return CSSURL_RE.sub(fix, css)


def bundle_css():
    """One stylesheet per page: the page's stylesheets joined in their original order (so the cascade is
    unchanged), followed by the hand-written v13 additions. Comments are dropped; nothing else is altered."""
    out_dir = os.path.join(PUB, "css")
    os.makedirs(out_dir, exist_ok=True)
    extra = ["gen/flow.css", "gen/coffee.css", "v13/site.css", "v13/toto.css"]
    before = after = 0
    for name in sorted(os.listdir(PAGES_OUT)):
        page = os.path.join(PAGES_OUT, name)
        html = open(page, encoding="utf-8").read()
        hrefs = [h[len("/site/"):] for h in LINK_RE.findall(html)]
        if not hrefs:
            continue
        parts = []
        for h in hrefs + extra:
            rel_path = urllib.parse.unquote(h)
            css = open(os.path.join(PUB, rel_path), encoding="utf-8").read()
            if css.lstrip().startswith("@charset"):
                css = css[css.index(";") + 1:]
            css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
            # A stylesheet that only pulls in files the page already links: the imports are redundant here.
            for imp in re.findall(r'@import\s+"([^"]+)";', css):
                target = os.path.normpath(os.path.join(os.path.dirname(rel_path), imp)).replace(os.sep, "/")
                if target not in [urllib.parse.unquote(x) for x in hrefs]:
                    raise SystemExit("%s imports %s, which the page does not link" % (rel_path, target))
            css = re.sub(r'@import\s+"[^"]+";\s*', "", css)
            parts.append("/* " + rel_path + " */\n" + absolutise_css(css, rel_path).strip())
        text = "\n".join(parts) + "\n"
        if "@import" in text:
            raise SystemExit("bundle for %s contains @import, which must come first in a stylesheet" % name)
        # The design's blue focus rings: invisible for mouse and touch, and drawn in the text colour while the
        # keyboard is in use (v13/site.css sets --focus-ring on html.kbd).
        text = text.replace("#0071E3", "var(--focus-ring,transparent)")
        before += len(text)
        if OPTIMISE_CSS:
            text = optimise_css(text)
        after += len(text)
        digest = hashlib.sha1(text.encode()).hexdigest()[:10]
        fn = "%s.%s.css" % (name[:-5], digest)
        open(os.path.join(out_dir, fn), "w", encoding="utf-8").write(text)
        first = True
        def repl(m):
            nonlocal first
            if first:
                first = False
                return '<link rel="stylesheet" href="/site/css/%s">\n' % fn
            return ""
        open(page, "w", encoding="utf-8").write(LINK_RE.sub(repl, html))
    print("css bundles: %d, %d KB -> %d KB" % (len(os.listdir(out_dir)), before // 1024, after // 1024))


def main():
    if os.path.isdir(PAGES_OUT):
        shutil.rmtree(PAGES_OUT)
    os.makedirs(PAGES_OUT)
    keep = {"v13", "fonts", "vendor"}  # hand-written or downloaded once; everything else is regenerated
    if os.path.isdir(PUB):
        for name in os.listdir(PUB):
            if name not in keep:
                p = os.path.join(PUB, name)
                shutil.rmtree(p) if os.path.isdir(p) else os.remove(p)
    os.makedirs(PUB, exist_ok=True)
    build_fonts()
    build_vendor()

    files = []
    for d, dirs, fs in os.walk(SRC):
        for f in fs:
            r = rel(os.path.join(d, f))
            if f == ".DS_Store" or r in SKIP_FILES or (SKIP_DIRS and r.startswith(SKIP_DIRS)) or r.startswith("__MACOSX"):
                continue
            files.append(r)

    # 1. images first, so renames are known before anything that refers to them is rewritten
    for r in files:
        if r.lower().endswith((".png", ".jpg", ".jpeg")):
            final = optimise_image(os.path.join(SRC, r), r)
            if final != r:
                RENAMED[r] = final
    # 2. everything else
    for r in files:
        low = r.lower()
        src = os.path.join(SRC, r)
        if low.endswith((".png", ".jpg", ".jpeg")):
            continue
        if r in PAGES:
            if PAGES[r][0]:
                process_page(r, PAGES[r][0])
            continue
        dst = os.path.join(PUB, r)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if low.endswith(".jsx"):
            compile_jsx(src, r)
        elif low.endswith(".js"):
            code = apply_patches(r, open(src, encoding="utf-8").read())
            if not r.startswith("_ds/") and not r.startswith("assets/"):
                code = rewrite_script(code, os.path.dirname(r))
            if r in INJECTED_CSS:
                code = extract_injected_css(code, INJECTED_CSS[r])
            open(dst, "w", encoding="utf-8").write(code)
            if r.startswith(READABLE_DIRS):
                TO_FORMAT.append(dst)
        elif low.endswith(".css"):
            css = apply_patches(r, open(src, encoding="utf-8").read())
            css = re.sub(r"@import url\([^)]*fonts\.googleapis\.com[^)]*\);?\s*", "", css)
            # renamed images referenced from stylesheets
            def cssurl(m, base=os.path.dirname(r)):
                u = m.group(2)
                if is_external(u) or u.startswith("/") or u.startswith("data:"):
                    return m.group(0)
                t = os.path.normpath(os.path.join(base, urllib.parse.unquote(u.split("#")[0].split("?")[0]))).replace(os.sep, "/")
                return "url(" + m.group(1) + rewrite_url(u, base) + m.group(1) + ")" if t in RENAMED else m.group(0)
            css = CSSURL_RE.sub(cssurl, css)
            open(dst, "w", encoding="utf-8").write(css)
        elif low.endswith(".html"):
            # embedded films and sub-pages loaded in iframes: self-contained, copied as they are
            shutil.copyfile(src, dst)
        else:
            shutil.copyfile(src, dst)

    format_scripts()
    bundle_css()
    total = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(PUB) for f in fs)
    print("pages:", sorted(os.listdir(PAGES_OUT)))
    print("renamed images:", len(RENAMED))
    print("public/site size: %.1f MB" % (total / 1e6))


if __name__ == "__main__":
    main()
