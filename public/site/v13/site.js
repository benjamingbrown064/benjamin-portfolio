/* v13: additions made during the build. Hand-written; scripts/import-design.py never overwrites this folder. */
(function(){
  /* Pounds / dollars switch. Fixed prices for each currency come from site/facts.json; the choice is remembered. */
  var KEY='bb:cur',btn=document.querySelector('[data-cur-toggle]'),els=document.querySelectorAll('[data-gbp][data-usd]');
  function get(){try{return localStorage.getItem(KEY)==='usd'?'usd':'gbp'}catch(e){return 'gbp'}}
  function paint(c){
    [].forEach.call(els,function(el){el.textContent=el.getAttribute('data-'+c)});
    if(btn){btn.textContent=c==='usd'?'Show prices in pounds':'Show prices in dollars';btn.setAttribute('aria-pressed',c==='usd')}
  }
  if(els.length)paint(get());
  if(btn)btn.addEventListener('click',function(){var c=get()==='usd'?'gbp':'usd';try{localStorage.setItem(KEY,c)}catch(e){}paint(c)});
})();

/* Forms: save to the site's own server instead of opening the mail app. */
(function(){
  function post(url,body){return fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){j.ok=r.ok&&j.ok!==false;return j})})}

  /* Contact form (v12/bb-flow.js calls this). Files go straight to private storage, one at a time. */
  window.BBSend=function(payload,files){
    var body=Object.assign({},payload,{fileList:files.map(function(f){return{name:f.name,size:f.size,type:f.type}})});
    return post('/api/requests',body).then(function(j){
      if(!j.ok)return{ok:false,error:j.error};
      var failed=[],ups=j.uploads||[];
      return ups.reduce(function(p,u,i){return p.then(function(){
        return fetch(u.url,{method:'PUT',headers:{'Content-Type':files[i].type||'application/octet-stream'},body:files[i]}).then(function(r){if(!r.ok)failed.push(u.name)}).catch(function(){failed.push(u.name)})
      })},Promise.resolve()).then(function(){return{ok:true,ref:j.ref,failed:failed}});
    });
  };

  /* Discovery questionnaire (v12/discovery.js posts here). */
  if(window.BBDiscovery)window.BBDiscovery.endpoint='/api/discovery';

  /* Coffee: recorded as a request for a time. It is confirmed by email until the calendar is connected. */
  window.addEventListener('bb:coffee',function(e){post('/api/bookings',e.detail||{}).catch(function(){})});
})();

/* Keyboard focus ring only while the keyboard is being used to move around. */
(function(){
  var h=document.documentElement;
  document.addEventListener('keydown',function(e){if(e.key==='Tab')h.classList.add('kbd')},true);
  document.addEventListener('pointerdown',function(){h.classList.remove('kbd')},true);
})();

/* "Exit" links marked data-back return to the page the visitor came from when that page is on this site. */
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('[data-back]');
  if(!a)return;
  if(document.referrer&&document.referrer.indexOf(location.host)>-1&&history.length>1){e.preventDefault();history.back()}
});


/* Voice capture, shared by the assistant and the request form: record a short clip and get it back as text.
   BBVoice.listen({onStart, onStop, onWords, onLevel, auto}) returns {stop(), cancel(), done}; done resolves to {text}, {error, gate} or {cancelled}. */
(function(){
  var supported=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
  var MAX_MS=45000,active=null;
  function sessionId(){
    var k='toto:sid',v=null;
    try{v=localStorage.getItem(k)}catch(e){}
    if(!v){v=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0;return(c==='x'?r:(r&3|8)).toString(16)});try{localStorage.setItem(k,v)}catch(e){}}
    return v;
  }
  function clipType(){
    var t=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];
    for(var i=0;i<t.length;i++)if(MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t[i]))return t[i];
    return '';
  }
  /* Live words: the microphone is also streamed to a transcription service so the text can be shown as it is spoken.
     The server hands out a single-use token; if that fails, the recorded clip is sent the old way when the visitor stops. */
  var LIVE_URL='wss://api.elevenlabs.io/v1/speech-to-text/realtime';
  function b64(int16){var b=new Uint8Array(int16.buffer),o='';for(var i=0;i<b.length;i+=0x8000)o+=String.fromCharCode.apply(null,b.subarray(i,i+0x8000));return btoa(o)}
  function live(stream,ctx,on){
    var ws=null,ready=false,queue=[],parts=[],partial='',closed=false,src=null,proc=null,carry=new Float32Array(0),waiter=null,started=false;
    function text(){return (parts.join(' ')+' '+partial).replace(/\s+/g,' ').trim()}
    function send(pcm,commit){
      var msg=JSON.stringify({message_type:'input_audio_chunk',audio_base_64:b64(pcm),commit:!!commit,sample_rate:16000});
      if(ready&&ws&&ws.readyState===1)ws.send(msg);else if(queue.length<60)queue.push(msg);
    }
    try{
      src=ctx.createMediaStreamSource(stream);proc=ctx.createScriptProcessor(4096,1,1);
      var ratio=ctx.sampleRate/16000;
      proc.onaudioprocess=function(e){
        if(closed)return;
        var inp=e.inputBuffer.getChannelData(0),sum=0,i;
        for(i=0;i<inp.length;i++)sum+=inp[i]*inp[i];
        if(on.level)on.level(Math.min(1,Math.sqrt(sum/inp.length)*6));
        var all=new Float32Array(carry.length+inp.length);all.set(carry);all.set(inp,carry.length);
        var n=Math.floor(all.length/ratio),out=new Int16Array(n);
        for(i=0;i<n;i++){ // average each run of samples down to 16 kHz
          var a=Math.floor(i*ratio),b=Math.min(all.length,Math.floor((i+1)*ratio)),t=0,k;
          for(k=a;k<b;k++)t+=all[k];
          var v=Math.max(-1,Math.min(1,t/Math.max(1,b-a)));out[i]=v<0?v*32768:v*32767;
        }
        carry=all.subarray(Math.floor(n*ratio));
        if(n)send(out,false);
      };
      src.connect(proc);proc.connect(ctx.destination);
    }catch(e){}
    fetch('/api/voice/live',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({session:sessionId()})})
      .then(function(r){return r.json().catch(function(){return{}}).then(function(j){j.status=r.status;return j})})
      .then(function(j){
        if(closed)return;
        if(!j.token){if(j.status===429&&on.refused)on.refused(j);return} // 429: the voice allowance is used up; anything else: fall back to the recorded clip
        ws=new WebSocket(LIVE_URL+'?model_id=scribe_v2_realtime&audio_format=pcm_16000&language_code=en&commit_strategy=vad&vad_silence_threshold_secs=0.5&token='+encodeURIComponent(j.token));
        ws.onmessage=function(e){
          var m={};try{m=JSON.parse(e.data)}catch(x){}
          if(m.message_type==='session_started'){ready=true;started=true;queue.forEach(function(q){ws.send(q)});queue=[]}
          else if(m.message_type==='partial_transcript'){partial=m.text||'';if(on.words)on.words(text())}
          else if(m.message_type==='committed_transcript'||m.message_type==='committed_transcript_with_timestamps'){
            if(m.message_type==='committed_transcript'&&m.text)parts.push(m.text);
            partial='';if(on.words)on.words(text());
            if(waiter){var w=waiter;waiter=null;w()}
            else if(text()&&on.pause)on.pause(text()); // the visitor stopped talking
          }
        };
        ws.onerror=ws.onclose=function(){ready=false;if(waiter){var w=waiter;waiter=null;w()}};
      }).catch(function(){});
    return {
      started:function(){return started},
      text:text,
      /* Ask for the final words, then shut everything down. Calls back once, within about a second. */
      finish:function(cb){
        var done=false,end=function(){if(done)return;done=true;waiter=null;close();cb(text())};
        if(!ready||!ws||ws.readyState!==1)return end();
        if(parts.length&&!partial)return end(); // the pause already produced the final words; nothing to wait for
        waiter=end;send(new Int16Array(1600),true);setTimeout(end,1300);
      },
      close:close
    };
    function close(){
      if(closed)return;closed=true;
      try{proc&&proc.disconnect();src&&src.disconnect()}catch(e){}
      try{ws&&ws.close()}catch(e){}
      try{ctx&&ctx.close&&ctx.close()}catch(e){}
    }
  }

  /* opts: onStart(), onStop(), onWords(text) as the visitor speaks, onLevel(0..1), auto (default true: send when they stop talking).
     Phone-call mode: give onUtterance(text) and it is called at each pause with everything said so far, while the
     microphone stays open; onResume() is called if they start talking again before release() is called. */
  function listen(opts){
    opts=opts||{};
    if(active)active.stop();
    var recorder=null,chunks=[],startedAt=0,timer=null,stopped=false,cancelled=false,resolve,feed=null,refused=null;
    var done=new Promise(function(r){resolve=r});
    var handed=false; // true while a paused utterance is with the caller and the visitor has not spoken again
    var ctl={stop:function(){stopped=true;clearTimeout(timer);if(recorder&&recorder.state!=='inactive')recorder.stop()},cancel:function(){cancelled=true;ctl.stop()},
      /* Close the microphone quietly: the utterance already handed over stands as the message. */
      release:function(){cancelled=true;released=true;ctl.stop()},done:done};
    var released=false;
    active=ctl;
    // The audio context has to be created inside the tap that started this, or phones keep it silent.
    var ctx=null;try{var AC=window.AudioContext||window.webkitAudioContext;if(AC){ctx=new AC();if(ctx.resume)ctx.resume()}}catch(e){ctx=null}
    navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}}).then(function(stream){
      var type=clipType();
      try{if(ctx&&ctx.state==='suspended'&&ctx.resume)ctx.resume()}catch(e){} // a context made without a tap (hands-free) can start once the microphone is live
      recorder=type?new MediaRecorder(stream,{mimeType:type}):new MediaRecorder(stream);
      recorder.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
      recorder.onstop=function(){
        if(active===ctl)active=null;
        var seconds=(Date.now()-startedAt)/1000,mime=(recorder.mimeType||'audio/webm').split(';')[0];
        var release=function(){stream.getTracks().forEach(function(t){t.stop()})};
        var upload=function(){
          if(seconds<0.6||!chunks.length)return resolve({error:'I did not catch that. Try again, or type it.'});
          fetch('/api/voice/listen',{method:'POST',headers:{'Content-Type':mime,'x-toto-session':sessionId(),'x-toto-seconds':seconds.toFixed(1)},body:new Blob(chunks,{type:mime})})
            .then(function(r){return r.json().catch(function(){return{}})})
            .then(function(j){resolve(j.text?{text:j.text}:{error:j.error||'I did not catch that. Try again, or type it.',gate:!!j.gate})})
            .catch(function(){resolve({error:'I could not hear that just now. Please type it instead.'})});
        };
        if(cancelled){if(feed)feed.close();release();if(opts.onStop&&!released)opts.onStop();return resolve(released?{released:true}:{cancelled:true})}
        if(refused){if(feed)feed.close();release();if(opts.onStop)opts.onStop();return resolve({error:refused.error,gate:!!refused.gate})}
        if(!feed){release();if(opts.onStop)opts.onStop();return upload()}
        feed.finish(function(text){
          release();if(opts.onStop)opts.onStop();
          if(text)return resolve({text:text.slice(0,1200)});
          if(feed.started())return resolve({error:'I did not catch that. Try again, or type it.'}); // it was listening and heard nothing
          upload();
        });
      };
      recorder.start();startedAt=Date.now();
      if(ctx)feed=live(stream,ctx,{
        words:function(t){
          if(stopped)return;
          // Phone-call mode: they paused, the words were handed over, and now they are talking again.
          if(handed){handed=false;if(opts.onResume)opts.onResume()}
          if(opts.onWords)opts.onWords(t);
        },
        level:function(v){if(opts.onLevel&&!stopped)opts.onLevel(v)},
        pause:function(t){
          if(stopped||opts.auto===false)return;
          // With onUtterance the microphone stays open after a pause, so the visitor can carry on and be heard;
          // the caller closes it with release() once it is committed to answering.
          if(opts.onUtterance){handed=true;opts.onUtterance(t)}else ctl.stop();
        },
        refused:function(j){refused=j;ctl.stop()}
      });
      if(opts.onStart)opts.onStart();
      if(stopped)ctl.stop();else timer=setTimeout(ctl.stop,MAX_MS);
    }).catch(function(){
      if(active===ctl)active=null;
      try{ctx&&ctx.close&&ctx.close()}catch(e){}
      resolve({error:'I need microphone access to listen. You can type instead.'});
    });
    return ctl;
  }
  window.BBVoice={supported:supported,session:sessionId,listen:listen};
  if(supported)document.documentElement.classList.add('can-voice');
})();

/* "Say it" on the request form: speak what you need and the form fills itself in for you to check. */
(function(){
  var current=null;
  function label(btn,title,detail){btn.querySelector('b').textContent=title;btn.querySelector('.d').textContent=detail}
  function reset(btn){btn.classList.remove('rec','busy');btn.disabled=false;label(btn,'Or just say it','Tell me what you need. I will fill the form in for you to check.')}
  document.addEventListener('click',function(e){
    var btn=e.target.closest&&e.target.closest('[data-bb-speak]');
    if(!btn||!window.BBVoice)return;
    if(current){current.stop();return}
    var host=btn.closest('.bf').parentNode,form=host&&host.__bbForm;
    if(!form)return;
    current=window.BBVoice.listen({
      onStart:function(){btn.classList.add('rec');label(btn,'Listening…','Say what you need, then tap here to finish.')},
      onWords:function(t){if(t)label(btn,'Listening…',t.length>110?'…'+t.slice(-110):t)},
      auto:false,
      onStop:function(){btn.classList.remove('rec');btn.classList.add('busy');btn.disabled=true;label(btn,'Working it out…','Filling the form in from what you said.')}
    });
    current.done.then(function(heard){
      current=null;
      if(!heard.text){reset(btn);if(heard.error)label(btn,'Or just say it',heard.error);return}
      return fetch('/api/brief',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({said:heard.text,schema:form.schema()})})
        .then(function(r){return r.json().catch(function(){return{}})})
        .then(function(j){
          if(!j.type){reset(btn);label(btn,'Or just say it',j.error||'I could not work that out. Please fill the form in by hand.');return}
          form.fill(j); // the form checks every value against its own options
        });
    }).catch(function(){current=null;reset(btn)});
  });
})();

/* Home page "equation" pictures: swipe left or right on a touch screen to move between them. */
(function(){
  var stage=document.querySelector('.eqx .eqx-stage');
  if(!stage)return;
  var prev=document.querySelector('.eqx [data-eqx="-1"]'),next=document.querySelector('.eqx [data-eqx="1"]');
  if(!prev||!next)return;
  var x0=null,y0=0,id=null;
  stage.addEventListener('touchstart',function(e){
    if(e.touches.length!==1){x0=null;return}
    var t=e.touches[0];x0=t.clientX;y0=t.clientY;id=t.identifier;
  },{passive:true});
  stage.addEventListener('touchend',function(e){
    if(x0===null)return;
    var t=null;for(var i=0;i<e.changedTouches.length;i++)if(e.changedTouches[i].identifier===id)t=e.changedTouches[i];
    var sx=x0;x0=null;
    if(!t)return;
    var dx=t.clientX-sx,dy=t.clientY-y0;
    if(Math.abs(dx)<40||Math.abs(dx)<Math.abs(dy)*1.5)return; // a tap, or a scroll down the page
    (dx<0?next:prev).click();
  },{passive:true});
  stage.addEventListener('touchcancel',function(){x0=null},{passive:true});
})();

/* Analytics consent. Google Analytics runs without cookies until the visitor accepts here; the choice is kept in
   the browser and can be reopened from any [data-cookie-settings] link (there is one on the privacy page). */
(function(){
  var KEY='bb:consent',bar=null;
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){
    try{localStorage.setItem(KEY,v)}catch(e){}
    if(typeof window.gtag==='function')window.gtag('consent','update',{analytics_storage:v==='granted'?'granted':'denied'});
    if(bar){bar.classList.remove('on');var b=bar;bar=null;setTimeout(function(){if(b.parentNode)b.parentNode.removeChild(b)},400)}
  }
  function show(){
    if(bar)return;
    bar=document.createElement('div');bar.className='ck';bar.setAttribute('role','dialog');bar.setAttribute('aria-label','Analytics cookies');
    bar.innerHTML='<p>OK to use analytics cookies? They show which pages are useful. Nothing is used for advertising. <a href="/privacy">Privacy</a></p><div class="ck-b"><button type="button" class="no">No thanks</button><button type="button" class="yes">Accept</button></div>';
    bar.querySelector('.yes').addEventListener('click',function(){set('granted')});
    bar.querySelector('.no').addEventListener('click',function(){set('denied')});
    document.body.appendChild(bar);
    requestAnimationFrame(function(){requestAnimationFrame(function(){if(bar)bar.classList.add('on')})});
  }
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-cookie-settings]');if(a){e.preventDefault();show()}});
  if(!get()&&typeof window.gtag==='function'){if(document.body)setTimeout(show,1200);else document.addEventListener('DOMContentLoaded',function(){setTimeout(show,1200)})}
})();
