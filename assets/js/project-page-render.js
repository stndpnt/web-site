/* StandPoint — generic lightbox wiring for individual project pages.
   Works off whatever .proj-thumb elements are already in the page (no data
   dependency) so it can be reused by every generated /portfolio/<slug>/index.html. */
(function(){
  var thumbs=Array.prototype.slice.call(document.querySelectorAll('.proj-thumb'));
  if(!thumbs.length)return;
  var lb=document.getElementById('projLb');
  var img=document.getElementById('plbImg');
  var count=document.getElementById('plbCount');
  var i=0;
  function show(){
    var src=thumbs[i].querySelector('img').getAttribute('src');
    img.setAttribute('src',src);
    count.textContent=(i+1)+' / '+thumbs.length;
  }
  function open(idx){i=idx;show();lb.classList.add('is-open');document.body.style.overflow='hidden';}
  function close(){lb.classList.remove('is-open');document.body.style.overflow='';}
  thumbs.forEach(function(t,idx){t.addEventListener('click',function(){open(idx);});});
  document.getElementById('plbClose').addEventListener('click',close);
  document.getElementById('plbPrev').addEventListener('click',function(){i=(i-1+thumbs.length)%thumbs.length;show();});
  document.getElementById('plbNext').addEventListener('click',function(){i=(i+1)%thumbs.length;show();});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('is-open'))return;
    if(e.key==='Escape')close();
    else if(e.key==='ArrowLeft'){i=(i-1+thumbs.length)%thumbs.length;show();}
    else if(e.key==='ArrowRight'){i=(i+1)%thumbs.length;show();}
  });
})();
