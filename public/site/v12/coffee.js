/* Benjamin Brown V12 · "Let's grab a coffee" booking modal. Pick a format, a day and a time, then name and email.
   Open:  any [data-coffee-open] element, the #coffee hash, or window.BBCoffee.open().
   Calendar hook (to wire to the real calendar):
     window.BBCoffee.availability = async (date) => ['09:00','10:30', …]   // free slots for that day, HH:MM in Ben's time zone
     window.BBCoffee.book = async (booking) => true                       // create the event; return true when booked
   Without them it shows sample weekday slots and fires a 'bb:coffee' event with the booking. */
(function(){
if(window.BBCoffee)return;
const TZ='America/Los_Angeles',TZL='Costa Mesa time (PT)',DAYS_AHEAD=42;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const svg=d=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+d+'</svg>';
const MARK='<svg class="cf-mk" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 38V13L24 8V38Z" fill="currentColor"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';
const XI=svg('<path d="M6 6l12 12M18 6L6 18"></path>'),L=svg('<path d="M15 6l-6 6 6 6"></path>'),R=svg('<path d="M9 6l6 6-6 6"></path>'),CK=svg('<path d="M5 12.5l4.5 4.5L19 7.5"></path>');
const CUP=svg('<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"></path><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"></path><path d="M8.5 3.5v2.5M12 3.5v2.5"></path>');
const VID=svg('<rect x="3" y="6.5" width="12.5" height="11" rx="2.5"></rect><path d="M15.5 10.5l5-3v9l-5-3"></path>');
const CAL=svg('<rect x="4" y="5.5" width="16" height="14.5" rx="2.5"></rect><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"></path>');
const FMT=[{id:'person',n:'In person',d:'Costa Mesa, CA',ico:CUP},{id:'video',n:'Video call',d:'Google Meet link',ico:VID}];
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'],WD=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],WDL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const CSS=`.cf{--c-bg:#fff;--c-cl:#F5F5F7;--c-cl2:#E8E8ED;--c-ln:#D2D2D7;--c-mu:#6E6E73;--c-ink:#1D1D1F;--c-on:#fff;--c-sig:#E04434;--c-e:cubic-bezier(.2,.7,.2,1);--c-px:clamp(24px,4vw,40px);display:flex;flex-direction:column;height:100%;min-height:0;background:var(--c-bg);color:var(--c-ink);font-family:Geist,system-ui,sans-serif;letter-spacing:-.012em;-webkit-font-smoothing:antialiased;text-align:left}
html[data-theme="dark"] .cf{--c-bg:#141415;--c-cl:#1F1F21;--c-cl2:#2B2B2E;--c-ln:rgba(255,255,255,.16);--c-mu:#A1A1A6;--c-ink:#F5F5F7;--c-on:#000}
.cf *{box-sizing:border-box}.cf button{font:inherit;color:inherit;cursor:pointer}
.cf :focus-visible{outline:2px solid #0071E3;outline-offset:2px}
.cf svg{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.cf .cf-mk{width:22px;height:22px;flex:none;stroke:none}
.cf-top{flex:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px var(--c-px) 0}
.cf-brand{display:inline-flex;align-items:center;gap:9px;font-size:16px;font-weight:600;letter-spacing:-.035em}
.cf-brand sup{align-self:flex-start;margin:1px 0 0 1px;font-size:.5em;font-weight:500;line-height:1}
.cf-x{width:44px;height:44px;border:0;border-radius:50%;background:var(--c-cl);display:grid;place-items:center;transition:background .3s var(--c-e),transform .2s}
.cf-x:hover{background:var(--c-cl2)}.cf-x:active{transform:scale(.94)}.cf-x svg{width:18px;height:18px}
.cf-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,4vw,48px);padding:28px var(--c-px) 32px}
.cf-intro .eb{display:flex;gap:10px;margin-bottom:14px;font-size:13px;font-weight:500;color:var(--c-mu)}.cf-intro .eb b{color:var(--c-sig);font-weight:500}
.cf-intro h2{margin:0;font-size:clamp(34px,4vw,48px);font-weight:600;letter-spacing:-.05em;line-height:1.02;text-wrap:balance}
.cf-intro p{margin:14px 0 0;font-size:16px;line-height:1.5;color:var(--c-mu);text-wrap:pretty}
.cf-fmt{display:grid;gap:8px;margin-top:28px}
.cf-f{display:grid;grid-template-columns:40px minmax(0,1fr) auto;align-items:center;gap:14px;padding:10px 16px 10px 10px;border:0;border-radius:11px;background:var(--c-cl);text-align:left;transition:background .3s var(--c-e),color .3s}
.cf-f:hover{background:var(--c-cl2)}
.cf-f .ic{width:40px;height:40px;border-radius:50%;background:var(--c-bg);display:grid;place-items:center;transition:background .3s,color .3s}.cf-f .ic svg{width:20px;height:20px}
.cf-f b{display:block;font-size:15px;font-weight:600;letter-spacing:-.02em}.cf-f small{display:block;margin-top:1px;font-size:13px;color:var(--c-mu);transition:color .3s}
.cf-f .ck{width:18px;height:18px;opacity:0;transform:scale(.6);transition:opacity .25s,transform .35s var(--c-e)}.cf-f .ck svg{width:100%;height:100%;stroke-width:2.4}
.cf-f[aria-checked="true"]{background:var(--c-ink);color:var(--c-on)}
.cf-f[aria-checked="true"] .ic{background:var(--c-on);color:var(--c-ink)}
.cf-f[aria-checked="true"] small{color:color-mix(in srgb,var(--c-on) 66%,var(--c-ink))}
.cf-f[aria-checked="true"] .ck{opacity:1;transform:none}
.cf-meta{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:20px;font-size:13px;color:var(--c-mu)}
.cf-meta span{display:inline-flex;align-items:center;gap:6px}.cf-meta svg{width:15px;height:15px}
.cf-pick{position:relative;min-width:0;display:grid;grid-template-columns:minmax(0,1fr) 168px;gap:24px;align-content:start}
.cf-cal-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.cf-cal-h b{font-size:16px;font-weight:600;letter-spacing:-.02em}
.cf-cal-h .nv{display:flex;gap:4px}
.cf-nb{width:36px;height:36px;border:0;border-radius:50%;background:transparent;display:grid;place-items:center;transition:background .25s}.cf-nb:hover:not([disabled]){background:var(--c-cl)}.cf-nb[disabled]{opacity:.3;cursor:default}.cf-nb svg{width:16px;height:16px}
.cf-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;text-align:center}
.cf-grid .wd{padding:6px 0;font-size:12px;font-weight:500;color:var(--c-mu)}
.cf-d{position:relative;aspect-ratio:1;max-height:48px;width:100%;border:0;border-radius:50%;background:transparent;font-size:14px;font-variant-numeric:tabular-nums;color:var(--c-mu);transition:background .25s var(--c-e),color .25s,transform .2s}
.cf-d.av{background:var(--c-cl);color:var(--c-ink);font-weight:600}
.cf-d.av:hover{background:var(--c-cl2)}.cf-d.av:active{transform:scale(.94)}
.cf-d[disabled]{cursor:default;opacity:.45}
.cf-d.today::after{content:"";position:absolute;left:50%;bottom:5px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--c-sig)}
.cf-d[aria-pressed="true"]{background:var(--c-ink);color:var(--c-on)}
.cf-slots h3{margin:2px 0 12px;font-size:14px;font-weight:600;letter-spacing:-.01em;min-height:36px;display:flex;align-items:center}
.cf-sl{display:grid;gap:6px;max-height:320px;overflow-y:auto;padding-right:2px}
.cf-s{min-height:44px;border:1px solid var(--c-ln);border-radius:980px;background:transparent;font-size:15px;font-weight:500;font-variant-numeric:tabular-nums;transition:background .25s var(--c-e),border-color .25s,color .25s,transform .2s;animation:cfUp .4s var(--c-e) both;animation-delay:calc(var(--i)*35ms)}
.cf-s:hover{border-color:var(--c-ink)}.cf-s:active{transform:scale(.97)}
.cf-empty{font-size:14px;line-height:1.5;color:var(--c-mu)}
@keyframes cfUp{from{opacity:0;transform:translateY(6px)}}
.cf-step{animation:cfIn .5s var(--c-e) both}
@keyframes cfIn{from{opacity:0;transform:translateX(24px)}}
.cf-back{display:inline-flex;align-items:center;gap:6px;padding:6px 0;border:0;background:none;font-size:14px!important;font-weight:500;color:var(--c-mu)!important;transition:color .25s}.cf-back:hover{color:var(--c-ink)!important}.cf-back svg{width:16px;height:16px}
.cf-sum{display:flex;align-items:center;gap:14px;margin:16px 0 24px;padding:14px 16px;border-radius:11px;background:var(--c-cl)}
.cf-sum .ic{width:40px;height:40px;flex:none;border-radius:50%;background:var(--c-bg);display:grid;place-items:center}.cf-sum .ic svg{width:20px;height:20px}
.cf-sum b{display:block;font-size:15px;font-weight:600;letter-spacing:-.02em}.cf-sum small{display:block;margin-top:2px;font-size:13px;color:var(--c-mu)}
.cf-fl{display:grid;gap:22px}
.cf-fd{display:grid;gap:6px}
.cf-fd label{font-size:14px;font-weight:500}.cf-fd label em{margin-left:8px;font-style:normal;font-weight:400;color:var(--c-mu)}
.cf-fd input,.cf-fd textarea{width:100%;margin:0;padding:6px 0 10px;border:0;border-bottom:1px solid var(--c-ln);border-radius:0;background:transparent;color:var(--c-ink);font:400 18px/1.4 Geist,system-ui,sans-serif;letter-spacing:-.015em;outline:0;transition:border-color .3s var(--c-e)}
.cf-fd textarea{resize:none;min-height:2.8em;field-sizing:content;max-height:8em}
.cf-fd input::placeholder,.cf-fd textarea::placeholder{color:var(--c-mu);opacity:.7}
.cf-fd input:focus,.cf-fd textarea:focus{border-bottom-color:var(--c-ink)}
.cf-fd.bad input{border-bottom-color:var(--c-sig)}
.cf-err{min-height:20px;margin-top:14px;font-size:14px;color:var(--c-sig)}
.cf-btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 24px;border:0;border-radius:980px;background:var(--c-ink);color:var(--c-on)!important;font-size:16px;font-weight:500;text-decoration:none;transition:background .3s var(--c-e),transform .15s,opacity .3s}
.cf-btn:hover{background:#000}html[data-theme="dark"] .cf-btn:hover{background:#fff}.cf-btn:active{transform:scale(.97)}
.cf-btn .arr{transition:transform .35s var(--c-e)}.cf-btn:hover .arr{transform:translateX(4px)}.cf-btn[disabled]{opacity:.6;cursor:progress}
.cf-btn.ghost{background:transparent;color:var(--c-ink)!important;box-shadow:inset 0 0 0 1px var(--c-ln)}.cf-btn.ghost:hover{background:var(--c-cl)}
.cf-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.cf-done .ok{width:56px;height:56px;margin-bottom:24px;border-radius:50%;background:var(--c-ink);color:var(--c-on);display:grid;place-items:center}
.cf-done .ok svg{width:24px;height:24px;stroke-width:2.2;stroke-dasharray:24;stroke-dashoffset:24;animation:cfTick .6s var(--c-e) .2s forwards}
@keyframes cfTick{to{stroke-dashoffset:0}}
.cf-done h3{margin:0;font-size:clamp(28px,3.2vw,36px);font-weight:600;letter-spacing:-.045em;line-height:1.08}
.cf-done p{margin:10px 0 0;font-size:16px;line-height:1.5;color:var(--c-mu);max-width:44ch}
.cf-modal{position:fixed;inset:0;z-index:96;display:none;align-items:center;justify-content:center;padding:24px}
.cf-modal.on{display:flex}
.cf-scrim{position:absolute;inset:0;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);animation:cfFade .35s ease both}
@keyframes cfFade{from{opacity:0}}
.cf-panel{position:relative;width:min(1000px,100%);max-height:calc(100dvh - 48px);display:flex;flex-direction:column;border-radius:14px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);animation:cfPop .6s cubic-bezier(.2,.7,.2,1) both}
html[data-theme="dark"] .cf-panel{box-shadow:0 40px 120px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.12)}
@keyframes cfPop{from{opacity:0;transform:translateY(24px) scale(.985)}}
.cf-modal.out .cf-scrim{animation:cfFade .25s ease reverse both}.cf-modal.out .cf-panel{animation:cfPop .3s ease reverse both}
html.cf-lock{overflow:hidden}
@media(max-width:960px){.cf-body{position:relative}.cf-pick{grid-template-columns:minmax(0,1fr)}.cf-sl{grid-template-columns:repeat(auto-fill,minmax(96px,1fr));max-height:none}}
@media(max-width:760px){.cf-body{grid-template-columns:minmax(0,1fr)}.cf-fmt{grid-template-columns:1fr 1fr}.cf-f{grid-template-columns:minmax(0,1fr)}.cf-f .ic,.cf-f .ck{display:none}}
@media(max-width:640px){.cf-modal{padding:0;align-items:flex-end}.cf-panel{max-height:94dvh;border-radius:14px 14px 0 0}}
@media(prefers-reduced-motion:reduce){.cf *,.cf-panel,.cf-scrim{animation:none!important;transition:none!important}.cf-done .ok svg{stroke-dashoffset:0}}`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const sample=d=>{const base=['08:30','09:30','10:30','12:00','13:30','15:00','16:00'],seed=d.getDate()*7+d.getMonth()*3;return base.filter((_,i)=>(seed+i*3)%5!==0)};
const nice=t=>{const [h,m]=t.split(':').map(Number);return ((h+11)%12+1)+':'+String(m).padStart(2,'0')+(h<12?' am':' pm')};
function mount(root){
const today=new Date();today.setHours(0,0,0,0);
const first=new Date(today);first.setDate(first.getDate()+1);const last=new Date(today);last.setDate(last.getDate()+DAYS_AHEAD);
const isAv=d=>d>=first&&d<=last&&d.getDay()!==0&&d.getDay()!==6;
const S={fmt:'video',view:new Date(first.getFullYear(),first.getMonth(),1),day:null,time:null,slots:[]};
root.innerHTML='<div class="cf"><header class="cf-top"><span class="cf-brand">'+MARK+'Benjamin Brown<sup>®</sup></span><button type="button" class="cf-x" data-close aria-label="Close">'+XI+'</button></header><div class="cf-body"><div class="cf-intro"><div class="eb"><b>30 min</b><span>On me</span></div><h2>Let\'s grab a coffee.</h2><p>Virtual or in person, whichever suits you. Pick a time that works and I will send an invite.</p><div class="cf-fmt" role="radiogroup" aria-label="Format">'+FMT.map(f=>'<button type="button" class="cf-f" role="radio" aria-checked="'+(f.id===S.fmt)+'" data-f="'+f.id+'"><span class="ic">'+f.ico+'</span><span><b>'+f.n+'</b><small>'+f.d+'</small></span><span class="ck">'+CK+'</span></button>').join('')+'</div><div class="cf-meta"><span>'+CAL+'Weekdays</span><span>Times in '+TZL+'</span></div></div><div class="cf-pick"></div></div></div>';
const el=root.firstElementChild,pick=el.querySelector('.cf-pick');
const fmtOf=()=>FMT.find(f=>f.id===S.fmt);
const calHTML=()=>{const y=S.view.getFullYear(),m=S.view.getMonth(),start=(new Date(y,m,1).getDay()+6)%7,n=new Date(y,m+1,0).getDate();
const prevOk=new Date(y,m,1)>new Date(first.getFullYear(),first.getMonth(),1),nextOk=new Date(y,m+1,1)<=last;let cells='';
for(let i=0;i<start;i++)cells+='<span></span>';
for(let d=1;d<=n;d++){const dt=new Date(y,m,d),av=isAv(dt),sel=S.day&&ymd(S.day)===ymd(dt);cells+='<button type="button" class="cf-d'+(av?' av':'')+(ymd(dt)===ymd(today)?' today':'')+'" data-d="'+ymd(dt)+'"'+(av?'':' disabled')+' aria-pressed="'+!!sel+'" aria-label="'+WDL[dt.getDay()]+' '+d+' '+MON[m]+(av?'':', unavailable')+'">'+d+'</button>'}
return '<div class="cf-cal"><div class="cf-cal-h"><b>'+MON[m]+' '+y+'</b><div class="nv"><button type="button" class="cf-nb" data-nav="-1" aria-label="Previous month"'+(prevOk?'':' disabled')+'>'+L+'</button><button type="button" class="cf-nb" data-nav="1" aria-label="Next month"'+(nextOk?'':' disabled')+'>'+R+'</button></div></div><div class="cf-grid">'+WD.map(w=>'<span class="wd">'+w.slice(0,1)+'<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">'+w.slice(1)+'</span></span>').join('')+cells+'</div></div>'};
const slotsHTML=()=>{if(!S.day)return '<div class="cf-slots"><h3>Pick a day</h3><p class="cf-empty">Open days are shaded. Times appear here.</p></div>';const d=S.day;return '<div class="cf-slots"><h3>'+WDL[d.getDay()].slice(0,3)+' '+d.getDate()+' '+MON[d.getMonth()].slice(0,3)+'</h3>'+(S.slots.length?'<div class="cf-sl">'+S.slots.map((t,i)=>'<button type="button" class="cf-s" data-t="'+t+'" style="--i:'+i+'">'+nice(t)+'</button>').join('')+'</div>':'<p class="cf-empty">Nothing free that day. Try another.</p>')+'</div>'};
const drawPick=()=>{pick.innerHTML=calHTML()+slotsHTML()};
const loadSlots=async d=>{S.day=d;S.slots=[];drawPick();let s;try{s=window.BBCoffee.availability?await window.BBCoffee.availability(new Date(d),S.fmt):sample(d)}catch(e){s=sample(d)}if(S.day!==d)return;S.slots=s||[];drawPick();const f=pick.querySelector('.cf-s');if(f&&matchMedia('(min-width:961px)').matches)f.focus({preventScroll:true});else{const body=el.querySelector('.cf-body'),sl=pick.querySelector('.cf-slots');if(body&&sl){let y=0,n=sl;while(n&&n!==body){y+=n.offsetTop;n=n.offsetParent}body.scrollTo({top:Math.max(0,y-16),behavior:'smooth'})}}};
const label=()=>WDL[S.day.getDay()]+' '+S.day.getDate()+' '+MON[S.day.getMonth()]+' · '+nice(S.time)+' PT';
const drawForm=()=>{const f=fmtOf();pick.innerHTML='<div class="cf-step" style="grid-column:1/-1"><button type="button" class="cf-back" data-back>'+L+'Change time</button><div class="cf-sum"><span class="ic">'+f.ico+'</span><span><b>'+esc(label())+'</b><small>30 minutes · '+esc(f.n)+(f.id==='person'?' · Costa Mesa, address with the invite':' · link with the invite')+'</small></span></div><form class="cf-fl" novalidate><div class="cf-fd"><label for="cf-n">Name</label><input id="cf-n" name="name" autocomplete="name" placeholder="Your name"></div><div class="cf-fd"><label for="cf-e">Email</label><input id="cf-e" name="email" type="email" autocomplete="email" placeholder="you@company.com"></div><div class="cf-fd"><label for="cf-t">Anything to cover?<em>optional</em></label><textarea id="cf-t" name="note" rows="1" placeholder="A line or two is plenty"></textarea></div><div><button type="submit" class="cf-btn cf-go">Book coffee <span class="arr">→</span></button><div class="cf-err" aria-live="polite"></div></div></form></div>';setTimeout(()=>pick.querySelector('#cf-n').focus({preventScroll:true}),200)};
const drawDone=(b,ok)=>{const f=fmtOf();pick.innerHTML='<div class="cf-step cf-done" style="grid-column:1/-1"><span class="ok">'+CK+'</span><h3>'+(ok?'See you then.':'Request sent.')+'</h3><p>'+(ok?'The invite is on its way to '+esc(b.email)+'.':'Ben will confirm by email at '+esc(b.email)+' within one working day.')+'</p><div class="cf-sum"><span class="ic">'+f.ico+'</span><span><b>'+esc(label())+'</b><small>30 minutes · '+esc(f.n)+'</small></span></div><div class="cf-acts"><button type="button" class="cf-btn" data-close>Done</button></div></div>'};
el.addEventListener('click',e=>{const f=e.target.closest('.cf-f');if(f){S.fmt=f.dataset.f;el.querySelectorAll('.cf-f').forEach(b=>b.setAttribute('aria-checked',b===f));if(S.day&&!S.time)loadSlots(S.day);else if(S.time&&pick.querySelector('.cf-sum')&&!pick.querySelector('.cf-done'))pick.querySelector('.cf-sum').outerHTML=(()=>{const x=document.createElement('div');x.innerHTML='<div class="cf-sum"><span class="ic">'+fmtOf().ico+'</span><span><b>'+esc(label())+'</b><small>30 minutes · '+esc(fmtOf().n)+(S.fmt==='person'?' · Costa Mesa, address with the invite':' · link with the invite')+'</small></span></div>';return x.innerHTML})();return}
const nv=e.target.closest('[data-nav]');if(nv){S.view=new Date(S.view.getFullYear(),S.view.getMonth()+(+nv.dataset.nav),1);drawPick();return}
const d=e.target.closest('.cf-d.av');if(d){const [y,m,dd]=d.dataset.d.split('-').map(Number);loadSlots(new Date(y,m-1,dd));return}
const s=e.target.closest('.cf-s');if(s){S.time=s.dataset.t;drawForm();return}
if(e.target.closest('[data-back]')){S.time=null;drawPick()}});
el.addEventListener('input',e=>{const f=e.target.closest('.cf-fd');if(f)f.classList.remove('bad');const er=el.querySelector('.cf-err');if(er)er.textContent=''});
el.addEventListener('submit',async e=>{e.preventDefault();const fm=e.target,n=fm.name.value.trim(),em=fm.email.value.trim(),er=fm.querySelector('.cf-err');
const bad=!n?fm.name:!/^\S+@\S+\.\S+$/.test(em)?fm.email:null;if(bad){bad.closest('.cf-fd').classList.add('bad');er.textContent=bad===fm.name?'Your name is needed':(em?'That email does not look right':'Your email is needed for the invite');bad.focus({preventScroll:true});return}
const btn=fm.querySelector('.cf-go');btn.disabled=true;btn.innerHTML='Booking <span class="arr">…</span>';
const b={date:ymd(S.day),time:S.time,timeZone:TZ,duration:30,format:S.fmt,name:n,email:em,note:fm.note.value.trim(),page:location.href};
let ok=false;try{if(window.BBCoffee.book)ok=!!(await window.BBCoffee.book(b))}catch(x){}
try{const all=JSON.parse(localStorage.getItem('bb:coffee')||'[]');all.push(b);localStorage.setItem('bb:coffee',JSON.stringify(all.slice(-20)))}catch(x){}
try{window.dispatchEvent(new CustomEvent('bb:coffee',{detail:b}))}catch(x){}
drawDone(b,ok)});
drawPick();
}
let modal,last;
function open(){last=document.activeElement;if(!modal){modal=document.createElement('div');modal.className='cf-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Book a coffee with Ben');modal.innerHTML='<div class="cf-scrim" data-close></div><div class="cf-panel"></div>';document.body.appendChild(modal);modal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close()});document.addEventListener('keydown',e=>{if(!modal.classList.contains('on'))return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key==='Tab'){const f=[...modal.querySelectorAll('button:not([disabled]),input,textarea,a[href]')].filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})}
mount(modal.querySelector('.cf-panel'));modal.classList.remove('out');modal.classList.add('on');document.documentElement.classList.add('cf-lock');setTimeout(()=>{const f=modal.querySelector('.cf-f[aria-checked="true"]');f&&f.focus({preventScroll:true})},80)}
function close(){if(!modal||!modal.classList.contains('on'))return;modal.classList.add('out');setTimeout(()=>{modal.classList.remove('on','out');document.documentElement.classList.remove('cf-lock')},matchMedia('(prefers-reduced-motion: reduce)').matches?0:280);if(last&&last.focus)last.focus({preventScroll:true})}
window.BBCoffee={open,close,availability:null,book:null};
const boot=()=>{document.addEventListener('click',e=>{const a=e.target.closest('[data-coffee-open]');if(!a)return;e.preventDefault();open()});if(location.hash==='#coffee')open()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
