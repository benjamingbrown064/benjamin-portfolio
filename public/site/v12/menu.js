/* v12 slide-out menu: open from the burger, close on ×, scrim, Escape or a link. Focus stays inside while open. */
(function(){
var b=document.querySelector('.mn-btn'),m=document.getElementById('mn');if(!b||!m)return;
var x=m.querySelector('.mn-x'),p=m.querySelector('.mn-panel'),root=document.documentElement;
if(!p.querySelector('.mn-cta')&&!/discovery\.html/.test(location.pathname)){var cta=document.createElement('a');cta.className='mn-cta';cta.href=(/\/work\//.test(location.pathname)?'../':'')+'/discovery';cta.innerHTML='<span><b>Not sure what you need?</b><small>Ten areas. A few minutes. Type or talk.</small></span><span class="mn-cta-b">Take the discovery <i aria-hidden="true">→</i></span>';p.appendChild(cta)}
function open(){p.style.setProperty('--pl',Math.max(20,b.getBoundingClientRect().left)+'px');m.classList.add('open');m.removeAttribute('inert');m.setAttribute('aria-hidden','false');b.setAttribute('aria-expanded','true');root.classList.add('mn-lock');setTimeout(function(){x.focus()},60)}
function close(back){if(!m.classList.contains('open'))return;m.classList.remove('open');m.setAttribute('inert','');m.setAttribute('aria-hidden','true');b.setAttribute('aria-expanded','false');root.classList.remove('mn-lock');if(back!==false)b.focus()}
b.addEventListener('click',open);
[].forEach.call(m.querySelectorAll('[data-mn-close]'),function(el){el.addEventListener('click',function(){close()})});
[].forEach.call(m.querySelectorAll('.mn-links a'),function(a){a.addEventListener('click',function(){close(false)})});
document.addEventListener('keydown',function(e){if(!m.classList.contains('open'))return;
if(e.key==='Escape'){e.preventDefault();close();return}
if(e.key==='Tab'){var f=p.querySelectorAll('a,button'),first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();
