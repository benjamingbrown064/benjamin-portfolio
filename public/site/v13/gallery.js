/* v12 · Article gallery: builds from the article's own figures. Stage + filmstrip inline; any figure opens full screen. */
(function(){
var host=document.querySelector('[data-sc-gal]');if(!host)return;
var imgs=[].slice.call(document.querySelectorAll('.ax-body figure.ax-fig:not(.ax-photo) img,.ax-body .sc-two img')).filter(function(i){return !i.closest('.sc-res')});
var S=imgs.map(function(i){return {src:i.getAttribute('src'),alt:i.getAttribute('alt')||''}});if(!S.length)return;
var cur=0,n=S.length,pad=function(x){return (x<9?'0':'')+(x+1)};
var ic={l:'<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',r:'<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>'};
host.innerHTML='<div class="sc-gh"><h4>Every frame in this piece</h4><span data-ct></span></div><div class="sc-gs" tabindex="0" role="region" aria-roledescription="carousel" aria-label="Article frames">'+S.map(function(s,i){return '<img src="'+s.src+'" alt="'+s.alt.replace(/"/g,'&quot;')+'" loading="lazy" decoding="async" data-i="'+i+'">'}).join('')+'<button type="button" class="ar pv" aria-label="Previous frame">'+ic.l+'</button><button type="button" class="ar nx" aria-label="Next frame">'+ic.r+'</button><span class="zm">Click to enlarge</span></div><div class="sc-gc" aria-live="polite"><span data-cap></span><b data-ct2></b></div><div class="sc-gt">'+S.map(function(s,i){return '<button type="button" aria-label="Frame '+(i+1)+'"><img src="'+s.src+'" alt="" loading="lazy" decoding="async"></button>'}).join('')+'</div><div class="sc-gp"><i></i></div>';
var stage=host.querySelector('.sc-gs'),sImgs=[].slice.call(stage.querySelectorAll('img')),th=[].slice.call(host.querySelectorAll('.sc-gt button')),strip=host.querySelector('.sc-gt');
var lb=document.createElement('div');lb.className='sc-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Frame viewer');
lb.innerHTML='<div class="sc-lb-h"><span data-lct></span><button type="button" class="x" aria-label="Close">'+ic.x+'</button></div><div class="sc-lb-s">'+S.map(function(s){return '<img src="'+s.src+'" alt="" decoding="async">'}).join('')+'<button type="button" class="ar pv" aria-label="Previous frame">'+ic.l+'</button><button type="button" class="ar nx" aria-label="Next frame">'+ic.r+'</button></div><p class="sc-lb-c" data-lcap></p>';
document.body.appendChild(lb);var lImgs=[].slice.call(lb.querySelectorAll('.sc-lb-s img')),last=null;
function go(i){var d=i>cur?1:-1;cur=(i+n)%n;stage.style.setProperty('--d',d);
sImgs.forEach(function(m,j){m.classList.toggle('on',j===cur)});lImgs.forEach(function(m,j){m.classList.toggle('on',j===cur)});
th.forEach(function(b,j){b.classList.toggle('on',j===cur);b.setAttribute('aria-current',j===cur)});
var t=th[cur];strip.scrollTo({left:t.offsetLeft-strip.offsetWidth/2+t.offsetWidth/2,behavior:'smooth'});
var ct=pad(cur)+' / '+pad(n-1);host.querySelector('[data-ct]').textContent=ct;host.querySelector('[data-ct2]').textContent=ct;host.querySelector('[data-cap]').textContent=S[cur].alt;
lb.querySelector('[data-lct]').textContent=ct;lb.querySelector('[data-lcap]').textContent=S[cur].alt;host.querySelector('.sc-gp i').style.setProperty('--p',((cur+1)/n).toFixed(4))}
function open(i){last=document.activeElement;go(i);lb.classList.add('on');document.documentElement.classList.add('sc-lock');lb.querySelector('.x').focus({preventScroll:true})}
function close(){lb.classList.remove('on');document.documentElement.classList.remove('sc-lock');if(last)last.focus({preventScroll:true})}
stage.addEventListener('click',function(e){var b=e.target.closest('.ar');if(b){go(cur+(b.classList.contains('nx')?1:-1));return}open(cur)});
th.forEach(function(b,i){b.addEventListener('click',function(){go(i)})});
stage.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}else if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}else if(e.key==='Enter'){open(cur)}});
lb.addEventListener('click',function(e){var b=e.target.closest('.ar');if(b){go(cur+(b.classList.contains('nx')?1:-1));return}if(e.target.closest('.x')||e.target===lb||e.target.classList.contains('sc-lb-s'))close()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(cur+1);else if(e.key==='ArrowLeft')go(cur-1)});
imgs.forEach(function(m,i){m.addEventListener('click',function(){open(i)})});
function swipe(el){var x0=null;el.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});el.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1));x0=null})}
swipe(stage);swipe(lb);go(0);
})();
