// ============================================
// Astro Aureum - Share Buttons (WhatsApp + Messenger + Telegram)
// Floating bottom-left widget. Multi-language.
// ============================================
(function(){
  if (document.getElementById('aa-share')) return; // avoid double-injection

  // ---- Language detection ----
  var lang = (document.documentElement.lang || 'es').toLowerCase().slice(0,2);
  var T = {
    es:{label:'Compartir',msg:'Mira esta pagina cosmica de Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    en:{label:'Share',msg:'Check out this cosmic page from Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    bg:{label:'Сподели',msg:'Вижте тази космическа страница на Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    de:{label:'Teilen',msg:'Schau dir diese kosmische Seite von Astro Aureum an',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    fr:{label:'Partager',msg:'Decouvre cette page cosmique d\'Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    it:{label:'Condividi',msg:'Guarda questa pagina cosmica di Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    pt:{label:'Compartilhar',msg:'Veja esta pagina cosmica do Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'},
    ru:{label:'Поделиться',msg:'Посмотри эту космическую страницу Astro Aureum',wa:'WhatsApp',fb:'Messenger',tg:'Telegram'}
  };
  var t = T[lang] || T.es;

  // ---- URLs ----
  var pageUrl = window.location.href;
  var enc = encodeURIComponent;
  var waUrl = 'https://wa.me/?text=' + enc(t.msg + ' ' + pageUrl);
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  var fbUrl = isMobile
    ? 'fb-messenger://share?link=' + enc(pageUrl)
    : 'https://www.facebook.com/sharer/sharer.php?u=' + enc(pageUrl);
  var tgUrl = 'https://t.me/share/url?url=' + enc(pageUrl) + '&text=' + enc(t.msg);

  // ---- Styles ----
  var css = ''
    + '#aa-share{position:fixed;bottom:24px;left:24px;z-index:9998;font-family:\'Cormorant Garamond\',Georgia,serif}'
    + '#aa-share-trigger{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#D4A843,#f0d078);border:1px solid rgba(255,237,138,0.6);cursor:pointer;box-shadow:0 4px 20px rgba(212,168,67,0.4),0 0 30px rgba(255,237,138,0.2);display:flex;align-items:center;justify-content:center;transition:transform .3s,box-shadow .3s;outline:none;padding:0}'
    + '#aa-share-trigger:hover{transform:translateY(-2px) scale(1.05);box-shadow:0 6px 28px rgba(212,168,67,0.55),0 0 40px rgba(255,237,138,0.3)}'
    + '#aa-share-trigger svg{width:26px;height:26px;fill:#0a0820}'
    + '#aa-share-menu{position:absolute;bottom:70px;left:3px;display:flex;flex-direction:column;gap:10px;opacity:0;visibility:hidden;transform:translateY(10px);transition:opacity .3s,transform .3s,visibility .3s;pointer-events:none}'
    + '#aa-share.open #aa-share-menu{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto}'
    + '.aa-share-btn{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 14px rgba(0,0,0,0.35);transition:transform .2s,box-shadow .2s;position:relative}'
    + '.aa-share-btn:hover{transform:scale(1.12);box-shadow:0 6px 18px rgba(0,0,0,0.45)}'
    + '.aa-share-btn svg{width:24px;height:24px;fill:#fff}'
    + '.aa-share-wa{background:#25D366}'
    + '.aa-share-fb{background:#006AFF}'
    + '.aa-share-tg{background:#0088CC}'
    + '.aa-share-tip{position:absolute;left:60px;top:50%;transform:translateY(-50%);background:rgba(20,10,50,0.95);color:#FFF9EA;padding:5px 12px;border-radius:20px;font-size:12px;font-family:\'Inter\',sans-serif;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;border:1px solid rgba(255,237,138,0.3)}'
    + '.aa-share-btn:hover .aa-share-tip{opacity:1}'
    + '#aa-share-label{position:absolute;left:68px;top:50%;transform:translateY(-50%);background:rgba(20,10,50,0.92);color:#FFED8A;padding:6px 14px;border-radius:20px;font-size:13px;font-family:\'Cormorant Garamond\',serif;font-style:italic;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .25s;border:1px solid rgba(255,237,138,0.35)}'
    + '#aa-share:not(.open) #aa-share-trigger:hover ~ #aa-share-label{opacity:1}'
    + '@media(max-width:600px){#aa-share{bottom:16px;left:16px}#aa-share-trigger{width:50px;height:50px}#aa-share-trigger svg{width:22px;height:22px}.aa-share-btn{width:44px;height:44px}.aa-share-btn svg{width:20px;height:20px}#aa-share-menu{bottom:62px}#aa-share-label{display:none}}';
  var style = document.createElement('style');
  style.id = 'aa-share-css';
  style.textContent = css;
  document.head.appendChild(style);

  // ---- HTML ----
  var icSh = '<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>';
  var icWa = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  var icFb = '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.913 1.46 5.512 3.747 7.218V22l3.428-1.881c.915.253 1.881.388 2.825.388 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.045 12.418l-2.55-2.715-4.974 2.715 5.46-5.804 2.611 2.715 4.912-2.715-5.46 5.804z"/></svg>';
  var icTg = '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.231-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>';

  var box = document.createElement('div');
  box.id = 'aa-share';
  box.innerHTML = ''
    + '<div id="aa-share-menu">'
    +   '<a class="aa-share-btn aa-share-wa" href="' + waUrl + '" target="_blank" rel="noopener" aria-label="' + t.wa + '">' + icWa + '<span class="aa-share-tip">' + t.wa + '</span></a>'
    +   '<a class="aa-share-btn aa-share-fb" href="' + fbUrl + '" target="_blank" rel="noopener" aria-label="' + t.fb + '">' + icFb + '<span class="aa-share-tip">' + t.fb + '</span></a>'
    +   '<a class="aa-share-btn aa-share-tg" href="' + tgUrl + '" target="_blank" rel="noopener" aria-label="' + t.tg + '">' + icTg + '<span class="aa-share-tip">' + t.tg + '</span></a>'
    + '</div>'
    + '<button id="aa-share-trigger" aria-label="' + t.label + '">' + icSh + '</button>'
    + '<span id="aa-share-label">' + t.label + '</span>';
  document.body.appendChild(box);

  // ---- Toggle ----
  var trigger = document.getElementById('aa-share-trigger');
  trigger.addEventListener('click', function(e){
    e.stopPropagation();
    box.classList.toggle('open');
  });
  document.addEventListener('click', function(e){
    if (!box.contains(e.target)) box.classList.remove('open');
  });
})();
