/* Notes page (Ben's Journal Index design, 25 Nov 2026). Reads entries from #jg-data, which src/lib/site.ts writes from
   src/lib/journal.ts, renders 20 per page, filter + page live in the URL hash (#cat=essay&p=2). The server prerenders the
   first page of cards, so the page reads without this script. Site change: the categories are the site's own. */
(function(){
var d=document,data=JSON.parse(d.getElementById('jg-data').textContent),grid=d.getElementById('jg-grid'),pages=d.getElementById('jg-pages'),count=d.getElementById('jg-count'),empty=d.getElementById('jg-empty'),feat=d.getElementById('jg-feat'),bar=d.getElementById('jg-filters');
var q=new URLSearchParams(location.search),PER=+(q.get('per')||grid.getAttribute('data-per')||20);
var CATS=[['all','All'],['guide','Guides'],['handover','The Handover'],['essay','Essays'],['notes','Notes'],['field','Field notes'],['build','Build logs']];
var MK='<svg class="mk" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 38V13L24 8V38Z" fill="currentColor"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function state(){var h=new URLSearchParams(location.hash.slice(1));var c=h.get('cat')||'all';if(!CATS.some(function(x){return x[0]===c}))c='all';return{cat:c,p:Math.max(1,parseInt(h.get('p')||'1',10)||1)}}
function go(cat,p,scroll){var h=[];if(cat!=='all')h.push('cat='+cat);if(p>1)h.push('p='+p);var nh=h.length?'#'+h.join('&'):'';if(nh!==location.hash)history.pushState(null,'',location.pathname+location.search+(nh||'#entries'));render(scroll)}
function catLabel(c){for(var i=0;i<CATS.length;i++)if(CATS[i][0]===c)return CATS[i][1].replace(/s$/,'');return c}
function card(e,i){
  var cover=e.img?'<div class="jg-cover'+(e.colour?' c':'')+'"><picture>'+(e.thumb?'<source media="(max-width:760px)" srcset="'+esc(e.thumb)+'">':'')+'<img src="'+esc(e.img)+'" alt="" loading="'+(i<4?'eager':'lazy')+'" decoding="async"></picture></div>'
    :'<div class="jg-cover jg-none">'+MK+'<span class="k">'+esc(e.series||catLabel(e.cat))+'</span><span class="q">'+esc(e.title)+'</span></div>';
  var meta='<span class="jx-meta"><span>'+esc(e.series||catLabel(e.cat))+'</span><span>'+esc(e.date)+'</span>'+(e.read?'<span>'+esc(e.read)+'</span>':'')+'</span>';
  return '<li style="--i:'+Math.min(i,10)+'"><a class="jg-card" href="'+esc(e.href)+'">'+cover+meta+'<h3>'+esc(e.title)+'</h3>'+(e.dek?'<p>'+esc(e.dek)+'</p>':'')+'</a></li>';
}
function pageList(n,p){var out=[],i;if(n<=7){for(i=1;i<=n;i++)out.push(i);return out}out.push(1);if(p>3)out.push('…');for(i=Math.max(2,p-1);i<=Math.min(n-1,p+1);i++)out.push(i);if(p<n-2)out.push('…');out.push(n);return out}
function render(scroll){
  var s=state(),all=s.cat==='all';
  if(feat)feat.hidden=!all||s.p>1;
  var list=data.filter(function(e){return all?!e.featured:e.cat===s.cat});
  var n=Math.max(1,Math.ceil(list.length/PER)),p=Math.min(s.p,n),from=(p-1)*PER,slice=list.slice(from,from+PER);
  grid.innerHTML=slice.map(card).join('');
  empty.hidden=list.length>0;
  var total=all?list.length+1:list.length;
  count.textContent=list.length?(n>1?'Showing '+(from+1)+'–'+(from+slice.length)+' of '+list.length+(all?' earlier entries':' entries'):total+(total===1?' entry':' entries')):'';
  [].forEach.call(bar.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cat')===s.cat)});
  if(n>1){
    var h='<a href="#" data-p="'+(p-1)+'" aria-label="Previous page"'+(p===1?' aria-disabled="true"':'')+'>←</a>';
    pageList(n,p).forEach(function(x){h+=x==='…'?'<span class="gap" aria-hidden="true">…</span>':'<a href="#" data-p="'+x+'"'+(x===p?' aria-current="page"':'')+' aria-label="Page '+x+'">'+x+'</a>'});
    h+='<a href="#" data-p="'+(p+1)+'" aria-label="Next page"'+(p===n?' aria-disabled="true"':'')+'>→</a>';
    pages.innerHTML=h;pages.hidden=false;
  }else{pages.innerHTML='';pages.hidden=true}
  if(scroll){var top=d.getElementById('entries').getBoundingClientRect().top+scrollY-80;scrollTo({top:top,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
}
bar.innerHTML=CATS.map(function(c){var k=c[0]==='all'?data.length:data.filter(function(e){return e.cat===c[0]}).length;return k||c[0]==='all'?'<button type="button" data-cat="'+c[0]+'" aria-pressed="false">'+c[1]+' <i>'+k+'</i></button>':''}).join('');
bar.addEventListener('click',function(e){var b=e.target.closest('button');if(b)go(b.getAttribute('data-cat'),1,true)});
pages.addEventListener('click',function(e){var a=e.target.closest('a[data-p]');if(!a)return;e.preventDefault();go(state().cat,+a.getAttribute('data-p'),true)});
addEventListener('popstate',function(){render(false)});
render(false);
})();
