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
   BBVoice.listen({onStart, onStop}) returns {stop(), done}; done resolves to {text} or {error, gate}. */
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
  function listen(opts){
    opts=opts||{};
    if(active)active.stop();
    var recorder=null,chunks=[],startedAt=0,timer=null,stopped=false,resolve;
    var done=new Promise(function(r){resolve=r});
    var ctl={stop:function(){stopped=true;clearTimeout(timer);if(recorder&&recorder.state!=='inactive')recorder.stop()},done:done};
    active=ctl;
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      var type=clipType();
      recorder=type?new MediaRecorder(stream,{mimeType:type}):new MediaRecorder(stream);
      recorder.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
      recorder.onstop=function(){
        stream.getTracks().forEach(function(t){t.stop()});
        if(active===ctl)active=null;
        if(opts.onStop)opts.onStop();
        var seconds=(Date.now()-startedAt)/1000,mime=(recorder.mimeType||'audio/webm').split(';')[0];
        if(seconds<0.6||!chunks.length)return resolve({error:'I did not catch that. Try again, or type it.'});
        fetch('/api/voice/listen',{method:'POST',headers:{'Content-Type':mime,'x-toto-session':sessionId(),'x-toto-seconds':seconds.toFixed(1)},body:new Blob(chunks,{type:mime})})
          .then(function(r){return r.json().catch(function(){return{}})})
          .then(function(j){resolve(j.text?{text:j.text}:{error:j.error||'I did not catch that. Try again, or type it.',gate:!!j.gate})})
          .catch(function(){resolve({error:'I could not hear that just now. Please type it instead.'})});
      };
      recorder.start();startedAt=Date.now();
      if(opts.onStart)opts.onStart();
      if(stopped)ctl.stop();else timer=setTimeout(ctl.stop,MAX_MS);
    }).catch(function(){
      if(active===ctl)active=null;
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
      onStop:function(){btn.classList.remove('rec');btn.classList.add('busy');btn.disabled=true;label(btn,'Working it out…','Filling the form in from what you said.')}
    });
    current.done.then(function(heard){
      current=null;
      if(!heard.text){reset(btn);label(btn,'Or just say it',heard.error);return}
      return fetch('/api/brief',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({said:heard.text,schema:form.schema()})})
        .then(function(r){return r.json().catch(function(){return{}})})
        .then(function(j){
          if(!j.type){reset(btn);label(btn,'Or just say it',j.error||'I could not work that out. Please fill the form in by hand.');return}
          form.fill(j); // the form checks every value against its own options
        });
    }).catch(function(){current=null;reset(btn)});
  });
})();
