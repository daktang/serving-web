// STEP 4: 런타임 크래시/라우팅/DOM 변화 캡처
(function(){
  console.clear();
  console.log('[probe] start');

  // 1) URL/History 변화 로그
  const logHistory = (tag, url) => console.log(`[history] ${tag}:`, url || location.href);
  ['pushState','replaceState'].forEach(m=>{
    const orig = history[m];
    history[m] = function(state, title, url){
      const r = orig.apply(this, arguments);
      logHistory(m, url);
      return r;
    }
  });
  addEventListener('popstate', ()=>logHistory('popstate'));

  // 2) 전역 오류/미처리 Promise 캡처
  addEventListener('error', e => console.log('[window.error]', e.message, e.error));
  addEventListener('unhandledrejection', e => console.log('[unhandledrejection]', e.reason));

  // 3) #root 변화(비워지는 시점) 관찰
  const root = document.getElementById('root');
  if (root) {
    new MutationObserver(muts=>{
      const hasChildren = root.childElementCount > 0;
      console.log('[mut]', {hasChildren, html: hasChildren ? '(omitted)' : '(empty)'});
    }).observe(root, {childList:true, subtree:false});
    console.log('[probe] root init children:', root.childElementCount);
  } else {
    console.log('[probe] no #root found');
  }

  // 4) 초기 URL 표시
  console.log('[probe] initial URL:', location.href);
})();
