/* Header behaviour for pages that do not load v5/site.js: Costa Mesa clock and the scrolled state. */
(function(){
function init(){
var f=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'America/Los_Angeles'});
function tick(){var s=f.format(new Date());document.querySelectorAll('[data-clock]').forEach(function(e){e.textContent=s})}
tick();setInterval(tick,15000);
var nav=document.getElementById('nav');
if(nav){var on=function(){nav.classList.toggle('scrolled',window.scrollY>8)};on();addEventListener('scroll',on,{passive:true})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
