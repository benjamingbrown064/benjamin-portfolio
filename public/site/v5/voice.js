/* Voice agent demo. Swap reply() + speak() for the ElevenLabs Conversational AI SDK when the live agent is ready.
   Runs the #voice section and adds voice in/out to the chat panel (bb-agent.js). */
(()=>{
const SYS="You are the voice agent on Benjamin Brown's website. Ben is an independent product and AI consultant with seventeen years of experience, six live projects and twenty-six products shipped. His promise: your people, made superhuman. He scopes honestly and would rather say no in week one than in month six. Speak as Ben's agent in first person plural about Ben ('Ben would…'). Replies are spoken aloud: plain sentences, no lists, no markdown, at most 2 short sentences and 35 words. Never quote prices; explain cost depends on scope and offer a short call. To book, point people to the contact form at the bottom of the page. If unsure, ask one clarifying question.";
const LABEL={idle:'Tap to talk',listening:'Listening… tap to send',thinking:'Thinking…',speaking:'Speaking · tap to stop'};
const FALLBACK=[[/cost|price|budget/i,"It depends on scope. Ben would rather give you a real number after a short call than guess one now."],[/book|call|meet/i,"Happy to. Use the contact form at the bottom of the page and Ben will reply within a day."],[/scope|project/i,"Tell me what you are trying to change and who it is for. Ben starts every project by cutting it to the smallest thing worth shipping."],[/team|ai/i,"Usually, yes. Ben looks for the repetitive work slowing your people down, then builds tools that take it off their plate."],[/work|process/i,"Short discovery, a sharp scope, then weekly shipped work you can use. No long decks, no surprises in month six."]];
const STARTERS=['Scope my project','What would this cost?','How do you work?','Can AI help my team?','Book a call'];
const MIC='<button class="vx-mic" type="button" aria-label="Talk to the agent"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path></svg><span class="vx-stop"></span></button>';
const all=[];
function initVoice(root){if(!root||root.__vx)return;
const $=s=>root.querySelector(s),cap=$('.vx-cap'),you=$('.vx-you'),st=$('.vx-st'),mic=$('.vx-mic'),form=$('.vx-form'),inp=form&&form.querySelector('input');
let state='idle',hist=[],rec=null,heard='',timer=0,stream=null,raf=0;
const set=s=>{state=s;root.dataset.state=s;st.textContent=LABEL[s]};
function caption(text){cap.innerHTML='';const w=text.trim().split(/\s+/);cap.classList.toggle('long',w.length>14);return w.map(t=>{const s=document.createElement('span');s.textContent=t+' ';cap.appendChild(s);return s})}
async function reply(q){hist.push({role:'user',content:q});let a='';
try{if(window.claude&&window.claude.complete)a=await window.claude.complete({system:SYS,max_tokens:160,messages:hist.slice(-10)})}catch(e){}
if(!a){const m=FALLBACK.find(([r])=>r.test(q));a=m?m[1]:"Good question. Ben would want a little more context. What does your team do today?"}
a=a.replace(/[*#_`]/g,'').trim();hist.push({role:'assistant',content:a});return a}
function stopSpeak(){clearInterval(timer);if('speechSynthesis'in window)speechSynthesis.cancel();cap.querySelectorAll('span').forEach(s=>s.classList.add('on'));set('idle')}
function speak(text){all.forEach(o=>o!==api&&o.stop());const spans=caption(text);let i=0;set('speaking');
const step=()=>{if(i<spans.length)spans[i++].classList.add('on')};
const done=()=>{if(state==='speaking'){spans.forEach(s=>s.classList.add('on'));clearInterval(timer);set('idle')}};
clearInterval(timer);timer=setInterval(()=>{step();if(i>=spans.length&&!('speechSynthesis'in window))setTimeout(done,600)},300);
if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(text),v=speechSynthesis.getVoices();u.voice=v.find(x=>/en-GB/i.test(x.lang)&&/male|daniel|arthur/i.test(x.name))||v.find(x=>/en-GB/i.test(x.lang))||null;u.rate=1.02;
u.onboundary=e=>{if(e.name&&e.name!=='word')return;clearInterval(timer);const n=text.slice(0,e.charIndex).trim().split(/\s+/).filter(Boolean).length;while(i<=n&&i<spans.length)step()};u.onend=done;u.onerror=done;speechSynthesis.cancel();speechSynthesis.speak(u)}}
async function ask(q){q=q.trim();if(!q)return;stopListen(true);you.textContent='You: '+q;caption('…');set('thinking');speak(await reply(q))}
function meter(on){if(!on){cancelAnimationFrame(raf);stream&&stream.getTracks().forEach(t=>t.stop());stream=null;mic.style.setProperty('--lv',0);return}
if(!navigator.mediaDevices)return;navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{if(state!=='listening'){s.getTracks().forEach(t=>t.stop());return}stream=s;const ctx=new(window.AudioContext||window.webkitAudioContext)(),an=ctx.createAnalyser();an.fftSize=256;ctx.createMediaStreamSource(s).connect(an);const d=new Uint8Array(an.frequencyBinCount);
const loop=()=>{an.getByteFrequencyData(d);let m=0;for(const x of d)m+=x;mic.style.setProperty('--lv',Math.min(1,m/d.length/70).toFixed(2));if(stream)raf=requestAnimationFrame(loop);else ctx.close()};loop()}).catch(()=>{})}
function stopListen(silent){if(rec){const r=rec;rec=null;r.onend=null;try{r.stop()}catch(e){}}meter(false);if(!silent&&state==='listening')set('idle')}
function listen(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){st.textContent=inp?'Voice not supported here. Type below.':'Voice not supported here. Use Chat.';inp&&inp.focus();return}
heard='';rec=new SR();rec.lang='en-GB';rec.interimResults=true;rec.continuous=false;
rec.onresult=e=>{heard=[...e.results].map(r=>r[0].transcript).join(' ');you.textContent='You: '+heard};
rec.onerror=e=>{if(e.error==='not-allowed')st.textContent='Microphone blocked.'};
rec.onend=()=>{rec=null;meter(false);heard.trim()?ask(heard):set('idle')};
set('listening');you.textContent='';meter(true);try{rec.start()}catch(e){set('idle')}}
const api={stop(){if(state==='speaking')stopSpeak();else if(state==='listening')stopListen()}};all.push(api);
mic.addEventListener('click',()=>{if(state==='speaking')return stopSpeak();if(state==='listening'){if(rec)rec.stop();return}if(state==='idle')listen()});
root.querySelectorAll('.vx-chips button').forEach(b=>b.addEventListener('click',()=>{if(state==='speaking')stopSpeak();if(state!=='thinking')ask(b.textContent)}));
form&&form.addEventListener('submit',e=>{e.preventDefault();if(state==='speaking')stopSpeak();if(state!=='thinking'){ask(inp.value);inp.value=''}});
caption(cap.textContent).forEach(s=>s.classList.add('on'));root.__vx=api;return api}
if('speechSynthesis'in window)speechSynthesis.getVoices();
initVoice(document.getElementById('voice'));
function mountDesk(){const P=document.querySelector('.bba');if(!P||P.__vx)return;P.__vx=1;
const head=P.querySelector('.bba-head'),log=P.querySelector('.bba-log'),comp=P.querySelector('.bba-comp'),ta=comp.querySelector('textarea'),send=comp.querySelector('button[type=submit]');
head.querySelector('b').textContent="Ben's agent";head.querySelector('.s').textContent='Type or talk · replies instantly';
const spk=document.createElement('button');spk.type='button';spk.className='bba-spk';spk.setAttribute('aria-label','Read replies aloud');spk.title='Read replies aloud';
spk.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"></path><path class="onw" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"></path><path class="off" d="M16 10l4 4M20 10l-4 4"></path></svg>';
head.querySelector('.clr').before(spk);
send.classList.add('bba-send');ta.placeholder='Ask anything, or tap the mic';
const mic=document.createElement('button');mic.type='button';mic.className='bba-mic';mic.setAttribute('aria-label','Talk to the agent');
mic.innerHTML='<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path></svg><span class="vx-stop"></span>';send.before(mic);
const vst=document.createElement('div');vst.className='bba-vst';vst.setAttribute('aria-live','polite');comp.before(vst);
let readAll=false;try{readAll=localStorage.getItem('bb5:speak')==='1'}catch(e){}
let state='idle',rec=null,heard='',stream=null,raf=0,timer=0,pending=false,lastTxt='',cur=null,note=0;
const VST={listening:'Listening… tap the mic to send',thinking:'Thinking…',speaking:'Speaking · tap to stop'};
const set=s=>{state=s;P.dataset.v=s;clearTimeout(note);vst.textContent=VST[s]||'';vst.classList.toggle('on',!!VST[s])};
const flash=t=>{vst.textContent=t;vst.classList.add('on');clearTimeout(note);note=setTimeout(()=>vst.classList.remove('on'),3200)};
const upd=()=>comp.classList.toggle('has',!!ta.value.trim()&&state!=='listening');
const setSpk=()=>spk.setAttribute('aria-pressed',readAll);setSpk();
const lastAgent=()=>[...log.querySelectorAll('.bba-msg:not(.u)')].pop();
const txtOf=m=>m&&m.firstChild&&m.firstChild.nodeType===3?m.firstChild.textContent:'';
lastTxt=txtOf(lastAgent());
function stopSpeak(){clearInterval(timer);if('speechSynthesis'in window)speechSynthesis.cancel();if(cur)cur.querySelectorAll('.w').forEach(w=>w.classList.add('on'));cur=null;if(state==='speaking')set('idle')}
function speakInto(m){const tn=m.firstChild;if(!tn||tn.nodeType!==3||!('speechSynthesis'in window)){set('idle');return}
all.forEach(o=>o!==api&&o.stop());const text=tn.textContent,frag=document.createDocumentFragment(),ws=[];
text.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){frag.appendChild(document.createTextNode(t));return}const s=document.createElement('span');s.className='w';s.textContent=t;ws.push(s);frag.appendChild(s)});
m.replaceChild(frag,tn);cur=m;let i=0;set('speaking');const step=()=>{if(i<ws.length)ws[i++].classList.add('on')};
const done=()=>{if(cur===m){ws.forEach(w=>w.classList.add('on'));clearInterval(timer);cur=null;set('idle')}};
clearInterval(timer);timer=setInterval(step,300);
const u=new SpeechSynthesisUtterance(text),v=speechSynthesis.getVoices();u.voice=v.find(x=>/en-GB/i.test(x.lang)&&/male|daniel|arthur/i.test(x.name))||v.find(x=>/en-GB/i.test(x.lang))||null;u.rate=1.02;
u.onboundary=e=>{if(e.name&&e.name!=='word')return;clearInterval(timer);const n=text.slice(0,e.charIndex).trim().split(/\s+/).filter(Boolean).length;while(i<=n&&i<ws.length)step()};
u.onend=done;u.onerror=done;speechSynthesis.cancel();speechSynthesis.speak(u)}
new MutationObserver(()=>{upd();const m=lastAgent(),t=txtOf(m);if(!m||!t||t===lastTxt)return;lastTxt=t;if(pending||readAll){pending=false;speakInto(m)}else if(state==='thinking')set('idle')}).observe(log,{childList:true});
function meter(on){if(!on){cancelAnimationFrame(raf);stream&&stream.getTracks().forEach(t=>t.stop());stream=null;mic.style.setProperty('--lv',0);return}
if(!navigator.mediaDevices)return;navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{if(state!=='listening'){s.getTracks().forEach(t=>t.stop());return}stream=s;const ctx=new(window.AudioContext||window.webkitAudioContext)(),an=ctx.createAnalyser();an.fftSize=256;ctx.createMediaStreamSource(s).connect(an);const d=new Uint8Array(an.frequencyBinCount);
const loop=()=>{an.getByteFrequencyData(d);let m=0;for(const x of d)m+=x;mic.style.setProperty('--lv',Math.min(1,m/d.length/70).toFixed(2));if(stream)raf=requestAnimationFrame(loop);else ctx.close()};loop()}).catch(()=>{})}
function stopListen(){if(rec){const r=rec;rec=null;r.onend=null;try{r.abort()}catch(e){}}meter(false);if(state==='listening'){ta.value='';set('idle');upd()}}
function listen(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){flash("Voice isn't supported in this browser. Type instead.");ta.focus();return}
heard='';rec=new SR();rec.lang='en-GB';rec.interimResults=true;rec.continuous=false;
rec.onresult=e=>{heard=[...e.results].map(r=>r[0].transcript).join(' ');ta.value=heard};
rec.onerror=e=>{if(e.error==='not-allowed'){rec=null;meter(false);set('idle');flash('Microphone blocked. Type instead.')}};
rec.onend=()=>{rec=null;meter(false);const q=heard.trim();ta.value='';if(q&&window.BBAgentDesk){pending=true;set('thinking');window.BBAgentDesk.ask(q)}else set('idle');upd()};
ta.value='';set('listening');upd();meter(true);try{rec.start()}catch(e){set('idle')}}
mic.addEventListener('click',()=>{if(state==='speaking')return stopSpeak();if(state==='listening'){rec&&rec.stop();return}if(state==='idle')listen()});
spk.addEventListener('click',()=>{readAll=!readAll;try{localStorage.setItem('bb5:speak',readAll?'1':'0')}catch(e){}setSpk();if(!readAll)stopSpeak()});
ta.addEventListener('input',()=>{if(state==='listening')stopListen();upd()});
comp.addEventListener('submit',()=>{stopSpeak();setTimeout(upd)},true);
ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){stopSpeak();setTimeout(upd)}});
const L=document.querySelector('.bba-launch');L&&L.addEventListener('click',()=>{if(!P.classList.contains('on')){stopSpeak();stopListen()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){stopSpeak();stopListen()}});
const api={stop(){stopSpeak();stopListen()}};all.push(api);upd()}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mountDesk):mountDesk();
window.BBVoice={init:initVoice};
})();
