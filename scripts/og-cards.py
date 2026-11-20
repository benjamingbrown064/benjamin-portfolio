"""Share pictures for the case studies: each work card's photo with its dark tint and logo, at 1200x630.
Usage: python3 scripts/og-cards.py https://benjaminbrown.co OUTDIR   (needs Playwright for Python and Chrome)
Then copy OUTDIR/<slug>.jpg to public/og/work-<slug>-logo.jpg. Give the file a new name whenever a picture changes:
apps that show link previews keep the old picture for as long as the address stays the same."""
import asyncio,sys
from playwright.async_api import async_playwright
from PIL import Image
O=sys.argv[2].rstrip("/")+"/"
async def run():
  async with async_playwright() as p:
    b=await p.chromium.launch(channel="chrome")
    ctx=await b.new_context(viewport={"width":1200,"height":630},device_scale_factor=2)
    for slug in ("warrantyos","taskbox","govscape","wilbolaw"):
      pg=await ctx.new_page(); await pg.goto(sys.argv[1]+"/work",wait_until="load"); await pg.wait_for_timeout(1500)
      ok=await pg.evaluate("""(slug)=>{const c=document.querySelector('a.card[href="/work/'+slug+'"]');if(!c)return false;
        const m=c.querySelector('.media');document.body.appendChild(m);
        [...document.body.children].forEach(e=>{if(e!==m)e.style.display='none'});
        const st=document.createElement('style');st.textContent='html,body{margin:0!important;padding:0!important;background:#000!important;overflow:hidden!important}.media{position:fixed!important;inset:0!important;width:1200px!important;height:630px!important;aspect-ratio:auto!important;border-radius:0!important;margin:0!important;transform:none!important}.media img{transform:none!important;width:100%!important;height:100%!important;object-fit:cover!important}.media .go,.media .tbui{display:none!important}.media-ov.clear{background:rgba(0,0,0,.4)!important}.media-ov{opacity:1!important;display:grid!important}.rv,.rv-g>*{opacity:1!important;transform:none!important}';document.head.appendChild(st);
        const im=m.querySelector('img');im.loading='eager';im.removeAttribute('srcset');return true}""",slug)
      await pg.wait_for_timeout(2500)
      await pg.screenshot(path=O+slug+"@2x.png")
      Image.open(O+slug+"@2x.png").convert("RGB").resize((1200,630),Image.LANCZOS).save(O+slug+".jpg",quality=88,optimize=True,progressive=True)
      print(slug,ok); await pg.close()
    await b.close()
  ims=[Image.open(O+s+".jpg").resize((600,315)) for s in ("warrantyos","taskbox","govscape","wilbolaw")]
  sh=Image.new('RGB',(1206,636),'white')
  for i,im in enumerate(ims): sh.paste(im,((i%2)*606,(i//2)*321))
  sh.save(O+"sheet.jpg",quality=85)
asyncio.run(run())
