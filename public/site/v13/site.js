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
