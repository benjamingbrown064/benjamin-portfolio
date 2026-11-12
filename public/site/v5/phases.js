/* Process band: words dissolve in letter by letter, story-style progress rail below. */
(()=>{const root=document.querySelector('[data-ph]');if(!root)return;
const DUR=3400,words=[...root.querySelectorAll('.ph-w')],rail=[...root.querySelectorAll('.ph-rail span')];
words.forEach(w=>{const t=w.textContent;w.textContent='';[...t].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i);s.textContent=c;w.appendChild(s)});const d=document.createElement('span');d.className='ch dot';d.style.setProperty('--i',t.length);d.textContent='.';w.appendChild(d)});
root.style.setProperty('--dur',DUR+'ms');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur=-1,tm=0,vis=false;
function go(n,force){n=(n+words.length)%words.length;if(n===cur&&!force)return;
words.forEach(w=>{if(w!==words[n]&&w.classList.contains('on')){w.classList.remove('on');w.classList.add('out');setTimeout(()=>w.classList.remove('out'),900)}});
const same=n===cur;cur=n;if(same){schedule();return}words[n].classList.remove('out');void words[n].offsetWidth;words[n].classList.add('on');
rail.forEach((r,i)=>{r.classList.toggle('done',i<n);r.classList.remove('on')});void rail[n].offsetWidth;rail[n].classList.add('on');
schedule()}
function schedule(){clearTimeout(tm);if(vis&&!reduce&&!root.classList.contains('paused'))tm=setTimeout(()=>go(cur+1),DUR)}
rail.forEach((r,i)=>r.addEventListener('click',()=>go(i,true)));
root.addEventListener('mouseenter',()=>{root.classList.add('paused');clearTimeout(tm)});
root.addEventListener('mouseleave',()=>{root.classList.remove('paused');restartBar();schedule()});
function restartBar(){const r=rail[cur];if(!r)return;r.classList.remove('on');void r.offsetWidth;r.classList.add('on')}
new IntersectionObserver(([e])=>{vis=e.isIntersecting;if(vis){if(cur<0)go(0);else{restartBar();schedule()}}else clearTimeout(tm)},{threshold:.4}).observe(root);
})();
