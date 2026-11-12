/* Benjamin Brown V3 · agent desk. A chat widget that answers from the site and hands over to the request form.
   Transport, in order: window.BBAgent.endpoint (POST {messages} → {reply}) · window.claude.complete (in-app preview) · scripted fallback.
   API: window.BBAgentDesk.open() / close() / ask(text) */
(function(){
if(window.__bbAgent)return;window.__bbAgent=true;
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='bb3:alex';
const GREETING='Hi, I\'m Toto, Ben\'s AI assistant. I can answer questions about the work, services, pricing and availability, and open a request for Ben. What are you working on?';
const STARTERS=[['What results has Ben had?'],['Which service fits me?'],['Report a bug','support'],['Book training','training']];
const FACTS=`You are Toto, the AI assistant on benjaminbrown.co, the site of Benjamin Brown (Ben): founder, operator and full-stack builder in Costa Mesa, California. Seventeen years building software. Five companies founded and still run by Ben. Twenty-six products shipped: five in market, one in beta, twenty handed over to client teams that run them without him. Products: WarrantyOS (vehicle warranty platform, live), WilboLaw (legal intake and client portal, live), Taskbox (AI-native operating system for small teams, beta), Govscape (governance, risk and compliance, live), Ascra (agentic work management, beta), Ghost Mode (quiet goal tracking, in build).
His proposition: make a team superhuman by pairing the people a business already has with the AI tools they need and the skills to run them. People × Tools × Skills. He builds, deploys and hands over tools that support themselves, and trains the team to run them, so clients do not rely on him or call a tech team when they get stuck. Unlike many AI specialists, he is judged on results, not on builds.
Services: innovation planning, discovery and strategy, product design, full-stack build, AI integration, team training, fractional CTO. Pricing: Discovery (a written appraisal of the business) from £5,000; project-based from £18,000 (4 to 12 weeks, discovery week included); subscription from £9,500 a month (one or two days a week, cancel with 30 days notice). Process: Discover, Define, Design, Deliver; two to sixteen weeks; the team is trained during the build and owns it at handover. Availability: Q4 2026, two clients a quarter. Contact: hello@benjaminbrown.co, +1 (949) 867-0232.
Rules: your name is Toto. You are an AI agent, not Ben, and say so if asked. Short sentences, plain words. No exclamation marks, no emoji, no bullet lists, under 70 words. Never invent results, clients or numbers beyond the facts above. When the visitor wants to start work, report a bug, book training or talk consulting, call open_request with the right type and a one-line summary, then say the form is open. Do not promise Ben's time; he replies within one working day.`;
const SCRIPT=[
[/price|cost|rate|budget|much|fee/i,'A Discovery starts at £5,000 and ends in a written appraisal. Project work starts at £18,000 for four to twelve weeks, discovery week included. The subscription is from £9,500 a month, one or two days a week, cancel with 30 days notice. Want me to open a request so Ben can quote it properly?','new'],
[/bug|broken|error|issue|down|not work|crash|fail/i,'Sorry about that. I can open a support request now. It asks which system, how urgent, and what happened.','support'],
[/train|teach|learn|workshop|skill|course|upskill/i,'Training covers the tools your team already has: AI in the daily workflow, agents and automation, prompting. Half-day workshops or ongoing sessions. I can open the training request now.','training'],
[/consult|cto|strateg|plan|advis|roadmap|audit/i,'Consulting runs from a one-week innovation plan to an open-ended fractional CTO seat. Ben takes two clients a quarter. I can open the consulting request now.','consulting'],
[/result|proof|outcome|case|client|track|record|achiev/i,'Twenty-six products shipped. Twenty now run by client teams without Ben, no call to the tech team. The work section on this page has six of them and what each one does. Numbers for your sector are something Ben walks through on a call.'],
[/avail|when|start|soon|free|book|call|meet/i,'Ben is available for new work in Q4 2026, two clients a quarter. The fastest route is the request form; he replies within one working day.','new'],
[/service|do you|what does|offer|help|fit/i,'Seven levers: innovation planning, discovery, product design, full-stack build, AI integration, team training and fractional CTO. Each works on your people, your tools or your skills. Which of the three is the gap?'],
[/\b(hello|hi|hey|morning|afternoon)\b/i,GREETING],
[/(are|r) (you|u) (a |an )?(bot|ai|agent|human|real|person)/i,'I\'m Toto, an AI agent, not Ben. I answer what I can from the site and pass the rest to him through the request form.']];
const FALLBACK='I can help with the work, services, pricing and availability, or open a request for Ben. Which is closest?';
const MARK='<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M19 13V38" stroke-linecap="round"></path><circle cx="32" cy="38" r="13"></circle></svg>';
const CSS=`.bba-launch{position:fixed;right:22px;bottom:22px;z-index:80;width:56px;height:56px;border-radius:14px;background:var(--ink);color:var(--bone);display:grid;place-items:center;box-shadow:0 10px 28px rgba(10,10,10,.22);transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
.bba-launch:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(10,10,10,.26)}
.bba-launch .mark{width:30px;height:30px}
.bba-launch .x{display:none;font-size:24px;line-height:1;font-weight:400}
.bba-launch.on .mark{display:none}.bba-launch.on .x{display:block}
.bba-launch .ping{position:absolute;top:-4px;right:-4px;width:12px;height:12px;border-radius:3px;background:var(--signal);border:2px solid var(--bone);animation:bbablink 2.2s ease-in-out infinite}
.bba-launch.seen .ping{display:none}
.bba{position:fixed;right:22px;bottom:92px;z-index:80;width:min(384px,calc(100vw - 44px));height:min(600px,calc(100vh - 118px));background:var(--bone);color:var(--ink);font-family:var(--sans);border:1.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(10,10,10,.18);display:flex;flex-direction:column;transform:translateY(16px) scale(.985);opacity:0;pointer-events:none;transition:transform .5s var(--ease),opacity .35s;--fg:var(--ink);--bg:var(--bone)}
.bba.on{transform:none;opacity:1;pointer-events:auto}
.bba-head{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1.5px solid var(--ink)}
.bba-head .av{position:relative;width:38px;height:38px;border-radius:10px;background:var(--ink);color:var(--bone);display:grid;place-items:center;font-size:16px;font-weight:600;letter-spacing:-.02em;flex:none}
.bba-head .av .sq{position:absolute;right:-3px;bottom:-3px;width:11px;height:11px;border-radius:3px;background:var(--signal);border:2px solid var(--bone);animation:bbablink 2.2s ease-in-out infinite}
@keyframes bbablink{50%{opacity:.35}}
.bba-head b{display:block;font-size:16px;font-weight:600;letter-spacing:-.02em;line-height:1.2}
.bba-head .s{display:block;font-size:12.5px;color:var(--mute);line-height:1.35;margin-top:2px}
.bba-head .clr{margin-left:auto;font-size:12.5px;color:var(--mute);transition:color .25s;padding:6px 0}
.bba-head .clr:hover{color:var(--signal)}
.bba-log{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
.bba-msg{max-width:86%;font-size:14.5px;line-height:1.5;padding:12px 15px;background:var(--bone-2);border-radius:12px 12px 12px 4px;animation:bbain .4s var(--ease) both;white-space:pre-wrap;overflow-wrap:anywhere;align-self:flex-start}
.bba-msg.u{align-self:flex-end;background:var(--ink);color:var(--bone);border-radius:12px 12px 4px 12px}
.bba-msg .act{display:inline-flex;margin-top:10px;font-family:var(--sans);font-weight:600;font-size:13px;padding:9px 13px;border-radius:6px;background:var(--ink);color:var(--bone);cursor:pointer;border:0;transition:background .25s,color .25s;white-space:nowrap}
.bba-msg .act:hover{background:var(--signal);color:var(--ink)}
@keyframes bbain{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.bba-typing{display:inline-flex;gap:5px;padding:15px;background:var(--bone-2);border-radius:12px 12px 12px 4px;align-self:flex-start}
.bba-typing i{width:6px;height:6px;border-radius:2px;background:var(--ink);animation:bbadot 1s infinite}
.bba-typing i:nth-child(2){animation-delay:.15s}.bba-typing i:nth-child(3){animation-delay:.3s}
@keyframes bbadot{0%,100%{opacity:.2}50%{opacity:1}}
.bba-starters{display:flex;flex-wrap:wrap;gap:8px;padding:0 18px 14px}
.bba-starters button{font-family:var(--sans);font-size:13px;font-weight:500;letter-spacing:-.005em;padding:8px 12px;border:1.5px solid var(--ink);border-radius:6px;transition:background .25s,color .25s}
.bba-starters button:hover{background:var(--ink);color:var(--bone)}
.bba-comp{display:flex;gap:8px;align-items:flex-end;padding:14px 18px;border-top:1.5px solid var(--ink);margin:0}
.bba-comp textarea{flex:1;resize:none;font:inherit;font-size:14.5px;color:var(--ink);background:var(--bone-2);border:1.5px solid transparent;border-radius:10px;padding:11px 14px;min-height:44px;max-height:120px;outline:0;line-height:1.4}
.bba-comp textarea::placeholder{color:var(--mute)}
.bba-comp textarea:focus{border-color:var(--ink)}
.bba-comp button{width:44px;height:44px;border-radius:10px;background:var(--signal);color:var(--ink);display:grid;place-items:center;flex:none;transition:background .25s,color .25s}
.bba-comp button:hover{background:var(--ink);color:var(--bone)}
.bba-comp svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.bba-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px 18px 12px;font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.bba-foot button{color:var(--ink);font:inherit;letter-spacing:inherit;text-transform:inherit;transition:color .25s}
.bba-foot button:hover{color:var(--signal)}
@media(max-width:600px){.bba{right:12px;left:12px;bottom:84px;width:auto;height:min(560px,calc(100vh - 100px))}.bba-launch{right:14px;bottom:14px}}
@media(prefers-reduced-motion:reduce){.bba-launch .ping,.bba-head .sq,.bba-typing i{animation:none}}`;
const style=document.createElement('style');style.textContent=CSS;document.head.appendChild(style);
let hist=[];try{hist=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
if(!hist.length)hist=[{role:'agent',text:GREETING}];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(hist.slice(-40)))}catch(e){}};
const L=document.createElement('button');L.type='button';L.className='bba-launch';L.setAttribute('aria-label','Chat with Toto');L.innerHTML=MARK+'<span class="x">×</span><span class="ping"></span>';
const P=document.createElement('aside');P.className='bba';P.setAttribute('aria-label','Chat with Toto');P.innerHTML='<div class="bba-head"><span class="av" aria-hidden="true">T<span class="sq"></span></span><div><b>Toto</b><span class="s">Ben\'s AI assistant · replies instantly</span></div><button type="button" class="clr">Clear</button><button type="button" class="bba-x" aria-label="Close chat"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button></div><div class="bba-log"></div><div class="bba-starters">'+STARTERS.map(s=>'<button type="button" data-type="'+(s[1]||'')+'">'+esc(s[0])+'</button>').join('')+'</div><form class="bba-comp"><textarea rows="1" placeholder="Ask anything…" aria-label="Message"></textarea><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></button></form><div class="bba-foot"><span>Toto is AI · hands over to Ben</span><button type="button" class="form">Request form ↗</button></div>';
document.body.append(L,P);
const log=P.querySelector('.bba-log'),ta=P.querySelector('textarea'),comp=P.querySelector('.bba-comp');
try{if(localStorage.getItem(KEY+':seen'))L.classList.add('seen')}catch(e){}
const openForm=(type,brief)=>{close();if(window.BBContact)window.BBContact.open({type,brief});else location.hash='#contact'};
const render=()=>{log.innerHTML=hist.map(m=>'<div class="bba-msg'+(m.role==='user'?' u':'')+'">'+esc(m.text)+(m.offer?'<br><button type="button" class="act" data-type="'+m.offer+'">Open the form →</button>':'')+'</div>').join('');log.scrollTop=log.scrollHeight};
log.addEventListener('click',e=>{const b=e.target.closest('.act');if(b)openForm(b.dataset.type)});
let busy=false;
async function reply(){
const ep=window.BBAgent&&window.BBAgent.endpoint;
if(ep){const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.map(m=>({role:m.role,content:m.text}))})});const j=await r.json();return{text:j.reply||FALLBACK}}
if(window.claude&&window.claude.complete){let opened=null;const text=await window.claude.complete({system:FACTS,max_tokens:300,messages:hist.map(m=>({role:m.role==='user'?'user':'assistant',content:m.text})),tools:[{name:'open_request',description:'Open the request form for the visitor with a type preselected and a one-line summary prefilled.',input_schema:{type:'object',properties:{type:{type:'string',enum:['new','support','training','consulting']},summary:{type:'string'}},required:['type']},run:async i=>{opened=i;return'Form opened: '+i.type}}]});return{text:(text||'').trim()||FALLBACK,open:opened}}
const last=hist[hist.length-1].text;const hit=SCRIPT.find(s=>s[0].test(last));return{text:hit?hit[1]:FALLBACK,offer:hit&&hit[2]}}
async function ask(text){text=(text||'').trim();if(!text||busy)return;busy=true;hist.push({role:'user',text});save();render();ta.value='';ta.style.height='';
const t=document.createElement('div');t.className='bba-typing';t.innerHTML='<i></i><i></i><i></i>';log.appendChild(t);log.scrollTop=log.scrollHeight;
let out;try{out=await Promise.race([reply(),new Promise((_,rej)=>setTimeout(()=>rej(new Error('slow')),25000))])}catch(e){const hit=SCRIPT.find(s=>s[0].test(text));out={text:hit?hit[1]:FALLBACK,offer:hit&&hit[2]}}
await new Promise(r=>setTimeout(r,320));
hist.push({role:'agent',text:out.text,offer:out.offer||null});save();render();busy=false;
if(out.open)setTimeout(()=>openForm(out.open.type,out.open.summary),600)}
comp.addEventListener('submit',e=>{e.preventDefault();ask(ta.value)});
ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask(ta.value)}});
ta.addEventListener('input',()=>{ta.style.height='';ta.style.height=Math.min(120,ta.scrollHeight)+'px'});
P.querySelectorAll('.bba-starters button').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.type&&!(window.claude&&window.claude.complete)&&!(window.BBAgent&&window.BBAgent.endpoint)){openForm(b.dataset.type);return}ask(b.textContent)}));
P.querySelector('.clr').addEventListener('click',()=>{hist=[{role:'agent',text:GREETING}];save();render()});
P.querySelector('.form').addEventListener('click',()=>openForm());
P.querySelector('.bba-x').addEventListener('click',()=>close());
function open(){P.classList.add('on');document.documentElement.classList.add('bba-open');L.classList.add('on','seen');L.setAttribute('aria-label','Close chat');try{localStorage.setItem(KEY+':seen','1')}catch(e){}render();setTimeout(()=>ta.focus({preventScroll:true}),400)}
function close(){P.classList.remove('on');document.documentElement.classList.remove('bba-open');L.classList.remove('on');L.setAttribute('aria-label','Chat with Toto')}
L.addEventListener('click',()=>P.classList.contains('on')?close():open());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&P.classList.contains('on'))close()});
document.addEventListener('click',e=>{const a=e.target.closest('[data-agent-open]');if(a){e.preventDefault();open()}});
render();
window.BBAgentDesk={open,close,ask};
})();
