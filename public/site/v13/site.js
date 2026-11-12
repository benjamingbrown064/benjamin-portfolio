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
