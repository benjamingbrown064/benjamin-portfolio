/* v12 · What I build. Desktop auto-advances while in view, pauses on hover, stops once the visitor picks one. */
(function(){
var R=document.querySelector('.wb');if(!R)return;
var its=[].slice.call(R.querySelectorAll('.wb-it')),cur=0,mq=matchMedia('(max-width:860px)'),rm=matchMedia('(prefers-reduced-motion:reduce)'),stopped=false,vis=false;
its.forEach(function(it){var h=it.querySelector('.wb-h');var k=0;h.innerHTML=h.textContent.trim().split(/\s+/).map(function(w){return '<span class="wd"><span style="--k:'+(k++)+'">'+w+'</span></span>'}).join(' ')});
function set(i,user){
  if(mq.matches&&user&&i===cur&&its[i].classList.contains('on')){its[i].classList.remove('on');sync();return}
  cur=(i+its.length)%its.length;
  its.forEach(function(it,j){it.classList.toggle('on',j===cur)});
  sync();
  if(user){stopped=true;R.classList.remove('auto')}
}
function sync(){its.forEach(function(it,j){var on=it.classList.contains('on'),t=it.querySelector('.wb-tab');t.setAttribute('aria-expanded',on);it.querySelector('.wb-pn').setAttribute('aria-hidden',!on);var p=it.querySelector('[data-wb-prev]'),n=it.querySelector('[data-wb-next]');if(p)p.disabled=j===0;if(n)n.disabled=j===its.length-1})}
function auto(){R.classList.toggle('auto',vis&&!stopped&&!mq.matches&&!rm.matches)}
its.forEach(function(it,j){
  it.querySelector('.wb-tab').addEventListener('click',function(){set(j,true)});
  it.querySelector('.wb-pr i').addEventListener('animationend',function(){if(R.classList.contains('auto'))set(cur+1>=its.length?0:cur+1)});
});
R.addEventListener('click',function(e){
  var b=e.target.closest('[data-wb-prev],[data-wb-next]');if(b){set(cur+(b.hasAttribute('data-wb-next')?1:-1),true);return}
  var a=e.target.closest('[data-wb-ask]');if(a){e.preventDefault();var D=window.BBAgentDesk;if(!D)return;D.open();var q=a.getAttribute('data-wb-ask');setTimeout(function(){D.ask(q)},450)}
});
var g=R.querySelector('.wb-grid');
g.addEventListener('mouseenter',function(){R.classList.add('hold')});g.addEventListener('mouseleave',function(){R.classList.remove('hold')});
g.addEventListener('focusin',function(){R.classList.add('hold')});g.addEventListener('focusout',function(){R.classList.remove('hold')});
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;auto()},{threshold:.45}).observe(g);
(mq.addEventListener?mq.addEventListener('change',function(){if(!mq.matches&&!R.querySelector('.wb-it.on'))set(cur);auto()}):0);
set(0);
})();
