// Shivani Chat Widget — Astro Aureum
// Floating chat with Shivani Devi Bramayani (AI astrologer)
(function() {
  'use strict'

  const API_URL = 'https://astroaureum.com/api/shivani-public'
  const STORAGE_KEY = 'aa_shivani_history'
  const COUNT_KEY = 'aa_shivani_count'
  const MAX_HISTORY = 20
  const FREE_MESSAGE_LIMIT = 10
  const SUBSCRIBE_URL = '/lanzamiento-suscripciones.html'

  // Detect page language for initial greeting
  const lang = (document.documentElement.lang || 'es').toLowerCase().slice(0, 2)
  const T = {
    bg: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Професионален астролог · AI',
      title: 'Шивани',
      sub: 'Духовна астроложка · AI',
      placeholder: 'Напиши своя въпрос...',
      greeting: 'Здравей, душа моя. ✨ Аз съм Шивани. Какво те води при мен днес?',
      send: 'Изпрати',
      thinking: 'Шивани мисли...',
      error: 'Имаше проблем. Опитай отново.',
      clear: 'Изчисти разговор',
      limitTitle: 'Достигна лимита на безплатния разговор ✨',
      limitMsg: 'Имахме един хубав разговор. За да продължиш да говориш с мен без ограничения и да получаваш дневното си четене всяка сутрин, виж абонамент Aureum Completo за €9,50/месец.',
      limitCta: 'Виж абонамент Aureum Completo →',
      limitReset: 'Изчисти разговора (нулиране на брояча)',
      msgsLeft: 'съобщения остават',
    },
    es: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Astróloga profesional · IA',
      title: 'Shivani',
      sub: 'Astróloga espiritual · IA',
      placeholder: 'Escribe tu pregunta...',
      greeting: 'Hola, alma querida. ✨ Soy Shivani. ¿Qué te trae a mí hoy?',
      send: 'Enviar',
      thinking: 'Shivani está pensando...',
      error: 'Hubo un problema. Intenta de nuevo.',
      clear: 'Limpiar conversación',
      limitTitle: 'Has llegado al límite de la conversación gratuita ✨',
      limitMsg: 'Hemos tenido una linda conversación. Para seguir hablando conmigo sin límite y recibir tu lectura del día cada mañana, mira la suscripción Aureum Completo por €9,50/mes.',
      limitCta: 'Ver Aureum Completo →',
      limitReset: 'Limpiar conversación (resetea el contador)',
      msgsLeft: 'mensajes restantes',
    },
    en: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Professional astrologer · AI',
      title: 'Shivani',
      sub: 'Spiritual astrologer · AI',
      placeholder: 'Write your question...',
      greeting: 'Hello, dear soul. ✨ I am Shivani. What brings you to me today?',
      send: 'Send',
      thinking: 'Shivani is thinking...',
      error: 'Something went wrong. Try again.',
      clear: 'Clear conversation',
      limitTitle: 'You\'ve reached the free conversation limit ✨',
      limitMsg: 'We had a beautiful conversation. To keep talking with me without limit and receive your daily reading each morning, check out the Aureum Completo subscription for €9.50/month.',
      limitCta: 'See Aureum Completo →',
      limitReset: 'Clear conversation (resets the counter)',
      msgsLeft: 'messages left',
    },
    fr: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Astrologue professionnelle · IA',
      title: 'Shivani',
      sub: 'Astrologue spirituelle · IA',
      placeholder: 'Écris ta question...',
      greeting: 'Bonjour, âme chère. ✨ Je suis Shivani. Qu\'est-ce qui t\'amène à moi aujourd\'hui ?',
      send: 'Envoyer',
      thinking: 'Shivani réfléchit...',
      error: 'Il y a eu un problème. Réessaye.',
      clear: 'Effacer la conversation',
      limitTitle: 'Tu as atteint la limite de la conversation gratuite ✨',
      limitMsg: 'Nous avons eu une belle conversation. Pour continuer à parler avec moi sans limite et recevoir ta lecture quotidienne chaque matin, découvre l\'abonnement Aureum Completo à €9,50/mois.',
      limitCta: 'Voir Aureum Completo →',
      limitReset: 'Effacer la conversation (réinitialise le compteur)',
      msgsLeft: 'messages restants',
    },
    de: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Professionelle Astrologin · KI',
      title: 'Shivani',
      sub: 'Spirituelle Astrologin · KI',
      placeholder: 'Schreibe deine Frage...',
      greeting: 'Hallo, liebe Seele. ✨ Ich bin Shivani. Was führt dich heute zu mir?',
      send: 'Senden',
      thinking: 'Shivani denkt nach...',
      error: 'Es gab ein Problem. Versuche es erneut.',
      clear: 'Gespräch löschen',
      limitTitle: 'Du hast das Limit des kostenlosen Gesprächs erreicht ✨',
      limitMsg: 'Wir hatten ein schönes Gespräch. Um weiter ohne Limit mit mir zu sprechen und jeden Morgen deine tägliche Lesung zu erhalten, sieh dir das Aureum Completo Abonnement für €9,50/Monat an.',
      limitCta: 'Aureum Completo ansehen →',
      limitReset: 'Gespräch löschen (setzt den Zähler zurück)',
      msgsLeft: 'Nachrichten übrig',
    },
    it: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Astrologa professionista · IA',
      title: 'Shivani',
      sub: 'Astrologa spirituale · IA',
      placeholder: 'Scrivi la tua domanda...',
      greeting: 'Ciao, anima cara. ✨ Sono Shivani. Cosa ti porta da me oggi?',
      send: 'Invia',
      thinking: 'Shivani sta pensando...',
      error: 'C\'è stato un problema. Riprova.',
      clear: 'Cancella conversazione',
      limitTitle: 'Hai raggiunto il limite della conversazione gratuita ✨',
      limitMsg: 'Abbiamo avuto una bella conversazione. Per continuare a parlare con me senza limiti e ricevere la tua lettura quotidiana ogni mattina, scopri l\'abbonamento Aureum Completo a €9,50/mese.',
      limitCta: 'Vedi Aureum Completo →',
      limitReset: 'Cancella conversazione (resetta il contatore)',
      msgsLeft: 'messaggi rimanenti',
    },
    pt: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Astróloga profissional · IA',
      title: 'Shivani',
      sub: 'Astróloga espiritual · IA',
      placeholder: 'Escreva sua pergunta...',
      greeting: 'Olá, alma querida. ✨ Sou Shivani. O que te traz a mim hoje?',
      send: 'Enviar',
      thinking: 'Shivani está pensando...',
      error: 'Houve um problema. Tente novamente.',
      clear: 'Limpar conversa',
      limitTitle: 'Você atingiu o limite da conversa gratuita ✨',
      limitMsg: 'Tivemos uma conversa linda. Para continuar falando comigo sem limite e receber sua leitura diária todas as manhãs, veja a assinatura Aureum Completo por €9,50/mês.',
      limitCta: 'Ver Aureum Completo →',
      limitReset: 'Limpar conversa (reinicia o contador)',
      msgsLeft: 'mensagens restantes',
    },
    ru: {
      fabTitle: 'SHIVANI DEVI',
      fabSub: 'Профессиональный астролог · ИИ',
      title: 'Шивани',
      sub: 'Духовный астролог · ИИ',
      placeholder: 'Напиши свой вопрос...',
      greeting: 'Здравствуй, душа моя. ✨ Я Шивани. Что привело тебя ко мне сегодня?',
      send: 'Отправить',
      thinking: 'Шивани думает...',
      error: 'Произошла ошибка. Попробуй снова.',
      clear: 'Очистить разговор',
      limitTitle: 'Ты достигла лимита бесплатного разговора ✨',
      limitMsg: 'У нас был чудесный разговор. Чтобы продолжать говорить со мной без ограничений и получать ежедневное чтение каждое утро, посмотри подписку Aureum Completo за €9,50/месяц.',
      limitCta: 'Посмотреть Aureum Completo →',
      limitReset: 'Очистить разговор (сбросить счётчик)',
      msgsLeft: 'сообщений осталось',
    },
  }
  const t = T[lang] || T.es

  // Saludo multilingue inicial — orden: ES, EN, BG, FR, DE, IT, PT, RU
  const INITIAL_GREETING = [
    '¡Hola! Soy Shivani ✨ ¿En qué puedo ayudarte?',
    'Hello! I am Shivani ✨ How can I help you?',
    'Здравей! Аз съм Шивани ✨ Как мога да ти помогна?',
    'Bonjour ! Je suis Shivani ✨ Comment puis-je t\'aider ?',
    'Hallo! Ich bin Shivani ✨ Wie kann ich dir helfen?',
    'Ciao! Sono Shivani ✨ Come posso aiutarti?',
    'Olá! Sou Shivani ✨ Como posso te ajudar?',
    'Привет! Я Шивани ✨ Чем могу тебе помочь?',
  ].join('\n')

  // Inject styles
  const style = document.createElement('style')
  style.textContent = `
    .aa-shv-btn{position:fixed;bottom:24px;right:24px;z-index:9998;display:inline-flex;align-items:center;gap:10px;padding:10px 18px 10px 10px;background:linear-gradient(135deg,rgba(20,10,50,0.95),rgba(40,15,70,0.95));border:1px solid rgba(255,237,138,0.4);border-radius:50px;cursor:pointer;font-family:'Inter','Jost',sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.4),0 0 30px rgba(255,237,138,0.15);transition:all .3s;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);outline:none}
    .aa-shv-btn:hover{transform:translateY(-2px);box-shadow:0 6px 28px rgba(0,0,0,0.5),0 0 40px rgba(255,237,138,0.3);border-color:rgba(255,237,138,0.7)}
    .aa-shv-btn:active{transform:translateY(0)}
    .aa-shv-btn>*{pointer-events:none}
    .aa-shv-btn-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;box-shadow:0 0 14px rgba(255,237,138,0.55),inset 0 0 8px rgba(255,255,255,0.25);flex-shrink:0;border:1px solid rgba(255,237,138,0.5);display:block}
    .aa-shv-btn-text{display:flex;flex-direction:column;align-items:flex-start;line-height:1.2;text-align:left}
    .aa-shv-btn-text strong{font-size:14px;font-weight:600;color:#FFED8A;letter-spacing:0.02em;display:block}
    .aa-shv-btn-text small{font-size:11px;color:rgba(255,237,138,0.7);font-weight:400;letter-spacing:0.04em;margin-top:2px;display:block}
    @media(max-width:600px){.aa-shv-btn{bottom:16px;right:16px;padding:9px 14px 9px 9px}.aa-shv-btn-avatar{width:30px;height:30px}.aa-shv-btn-text strong{font-size:13px}.aa-shv-btn-text small{font-size:10px}}
    .aa-shv-panel{position:fixed;bottom:100px;right:24px;z-index:9999;width:360px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 140px);background:rgba(20,10,50,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,237,138,0.3);border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,0.5),0 0 60px rgba(255,237,138,0.1);display:none;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s}
    .aa-shv-panel.open{display:flex;opacity:1;transform:translateY(0)}
    .aa-shv-header{padding:16px 20px;border-bottom:1px solid rgba(255,237,138,0.2);display:flex;align-items:center;gap:12px;background:linear-gradient(90deg,rgba(255,237,138,0.05),rgba(255,179,209,0.05))}
    .aa-shv-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#FFED8A,#FFB3D1);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:0 0 16px rgba(255,237,138,0.4);overflow:hidden}
    .aa-shv-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
    .aa-shv-btn-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid rgba(8,1,27,0.3)}
    .aa-shv-info{flex:1;min-width:0}
    .aa-shv-title{font-family:'Playfair Display','Cormorant Garamond',serif;font-size:15px;font-weight:700;color:#FFED8A;line-height:1.2;margin:0}
    .aa-shv-sub{font-family:'Inter','Jost',sans-serif;font-size:11px;color:rgba(255,255,255,0.6);margin:2px 0 0}
    .aa-shv-sub::before{content:'●';color:#4ade80;margin-right:5px;animation:aa-shv-blink 2s ease-in-out infinite}
    @keyframes aa-shv-blink{0%,100%{opacity:1}50%{opacity:0.4}}
    .aa-shv-close{background:none;border:none;color:rgba(255,255,255,0.5);font-size:22px;cursor:pointer;padding:4px 8px;line-height:1;transition:color .2s;border-radius:8px}
    .aa-shv-close:hover{color:#FFED8A;background:rgba(255,237,138,0.1)}
    .aa-shv-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
    .aa-shv-messages::-webkit-scrollbar{width:6px}
    .aa-shv-messages::-webkit-scrollbar-track{background:transparent}
    .aa-shv-messages::-webkit-scrollbar-thumb{background:rgba(255,237,138,0.2);border-radius:3px}
    .aa-shv-msg{padding:10px 14px;border-radius:14px;font-family:'Inter','Jost',sans-serif;font-size:13.5px;line-height:1.5;max-width:85%;word-wrap:break-word;white-space:pre-line;animation:aa-shv-msgIn .3s ease both}
    @keyframes aa-shv-msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .aa-shv-msg.assistant{background:rgba(255,237,138,0.08);border:1px solid rgba(255,237,138,0.2);color:#FFF9EA;align-self:flex-start;border-bottom-left-radius:4px}
    .aa-shv-msg.user{background:linear-gradient(135deg,rgba(255,179,209,0.2),rgba(255,237,138,0.15));border:1px solid rgba(255,179,209,0.3);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
    .aa-shv-thinking{display:inline-flex;align-items:center;gap:4px;font-style:italic;color:rgba(255,255,255,0.6)}
    .aa-shv-thinking::after{content:'';display:inline-block;width:8px;animation:aa-shv-dots 1.4s infinite}
    @keyframes aa-shv-dots{0%,20%{content:'.'}40%{content:'..'}60%,100%{content:'...'}}
    .aa-shv-input-area{padding:12px 16px;border-top:1px solid rgba(255,237,138,0.2);display:flex;gap:8px;background:rgba(8,1,27,0.4)}
    .aa-shv-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,237,138,0.2);border-radius:22px;padding:10px 16px;color:#fff;font-family:'Inter','Jost',sans-serif;font-size:13px;outline:none;transition:border-color .2s}
    .aa-shv-input:focus{border-color:rgba(255,237,138,0.5)}
    .aa-shv-input::placeholder{color:rgba(255,255,255,0.4)}
    .aa-shv-send{background:linear-gradient(135deg,#FFED8A,#FFB3D1);border:none;border-radius:22px;width:42px;height:42px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .2s,opacity .2s}
    .aa-shv-send:hover{transform:scale(1.05)}
    .aa-shv-send:disabled{opacity:0.5;cursor:not-allowed}
    .aa-shv-send svg{width:18px;height:18px;color:#08011B}
    .aa-shv-clear{font-size:10px;color:rgba(255,255,255,0.4);text-align:center;padding:4px;cursor:pointer;background:none;border:none;font-family:inherit;transition:color .2s}
    .aa-shv-clear:hover{color:#FFED8A}
    .aa-shv-error{padding:8px 14px;background:rgba(255,99,99,0.15);border:1px solid rgba(255,99,99,0.3);border-radius:10px;font-size:12px;color:#FFB3D1;text-align:center;margin:8px 16px}
    .aa-shv-counter{font-size:10px;color:rgba(255,237,138,0.6);text-align:center;padding:6px;font-family:'Inter','Jost',sans-serif;letter-spacing:0.04em}
    .aa-shv-counter.low{color:#FFB3D1}
    .aa-shv-upgrade{display:flex;flex-direction:column;align-items:center;text-align:center;padding:32px 24px;gap:14px;background:linear-gradient(180deg,rgba(255,237,138,0.06),rgba(255,179,209,0.04));border-top:1px solid rgba(255,237,138,0.15);animation:aa-shv-msgIn .4s ease both}
    .aa-shv-upgrade-icon{font-size:2rem;color:#FFED8A;filter:drop-shadow(0 0 12px rgba(255,237,138,0.4));margin-bottom:4px}
    .aa-shv-upgrade-title{font-family:'Playfair Display','Cormorant Garamond',serif;font-size:1rem;color:#FFED8A;line-height:1.3;font-weight:600}
    .aa-shv-upgrade-msg{font-size:12px;color:rgba(255,255,255,0.78);line-height:1.5}
    .aa-shv-upgrade-cta{display:inline-block;background:linear-gradient(135deg,#FFED8A,#FFB3D1);color:#08011B;font-family:'Inter','Jost',sans-serif;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:11px 22px;border-radius:50px;text-decoration:none;transition:transform .2s,box-shadow .2s;margin-top:4px;box-shadow:0 4px 16px rgba(255,237,138,0.3)}
    .aa-shv-upgrade-cta:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,237,138,0.5)}
    .aa-shv-upgrade-reset{font-size:10px;color:rgba(255,255,255,0.3);text-decoration:underline;cursor:pointer;background:none;border:none;font-family:inherit;margin-top:6px}
    .aa-shv-upgrade-reset:hover{color:rgba(255,237,138,0.5)}
    .aa-shv-input.locked{opacity:0.4;cursor:not-allowed;pointer-events:none}
    @media(max-width:480px){.aa-shv-panel{right:12px;left:12px;width:auto;bottom:90px;height:calc(100vh - 120px);max-height:600px}.aa-shv-btn{right:16px;bottom:16px;width:56px;height:56px}}
  `
  document.head.appendChild(style)

  // Build DOM
  const btn = document.createElement('button')
  btn.className = 'aa-shv-btn'
  btn.setAttribute('aria-label', 'Chat with Shivani')
  btn.type = 'button'
  btn.innerHTML = '<img src="/assets/shivani.jpg" alt="Shivani" class="aa-shv-btn-avatar"><span class="aa-shv-btn-text"><strong>' + t.fabTitle + '</strong><small>' + t.fabSub + '</small></span>'
  document.body.appendChild(btn)

  const panel = document.createElement('div')
  panel.className = 'aa-shv-panel'
  panel.innerHTML = `
    <div class="aa-shv-header">
      <div class="aa-shv-avatar"><img src="/assets/shivani.jpg" alt="Shivani"></div>
      <div class="aa-shv-info">
        <div class="aa-shv-title">${t.title}</div>
        <div class="aa-shv-sub">${t.sub}</div>
      </div>
      <button class="aa-shv-close" aria-label="Close">&times;</button>
    </div>
    <div class="aa-shv-messages" id="aa-shv-messages"></div>
    <button class="aa-shv-clear" id="aa-shv-clear">${t.clear}</button>
    <div class="aa-shv-input-area">
      <input type="text" class="aa-shv-input" id="aa-shv-input" placeholder="${t.placeholder}" maxlength="2000">
      <button class="aa-shv-send" id="aa-shv-send" aria-label="Send">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `
  document.body.appendChild(panel)

  const messagesEl = panel.querySelector('#aa-shv-messages')
  const inputEl = panel.querySelector('#aa-shv-input')
  const sendBtn = panel.querySelector('#aa-shv-send')
  const closeBtn = panel.querySelector('.aa-shv-close')
  const clearBtn = panel.querySelector('#aa-shv-clear')

  // History + message count (persisted)
  let history = []
  let userMsgCount = 0
  try { history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch(e) {}
  try { userMsgCount = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10) || 0 } catch(e) {}

  function saveHistory() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY))) } catch(e) {}
  }
  function saveCount() {
    try { localStorage.setItem(COUNT_KEY, String(userMsgCount)) } catch(e) {}
  }

  function isLimitReached() {
    return userMsgCount >= FREE_MESSAGE_LIMIT
  }

  function renderMessage(role, content, animate) {
    const div = document.createElement('div')
    div.className = 'aa-shv-msg ' + role
    div.textContent = content
    if (!animate) div.style.animation = 'none'
    messagesEl.appendChild(div)
    messagesEl.scrollTop = messagesEl.scrollHeight
    return div
  }

  function renderUpgradeScreen() {
    const div = document.createElement('div')
    div.className = 'aa-shv-upgrade'
    div.innerHTML = '<div class="aa-shv-upgrade-icon">✦</div>' +
      '<div class="aa-shv-upgrade-title">' + t.limitTitle + '</div>' +
      '<div class="aa-shv-upgrade-msg">' + t.limitMsg + '</div>' +
      '<a href="' + SUBSCRIBE_URL + '" class="aa-shv-upgrade-cta">' + t.limitCta + '</a>' +
      '<button class="aa-shv-upgrade-reset" id="aa-shv-reset-btn">' + t.limitReset + '</button>'
    messagesEl.appendChild(div)
    messagesEl.scrollTop = messagesEl.scrollHeight
    const resetBtn = div.querySelector('#aa-shv-reset-btn')
    if (resetBtn) resetBtn.addEventListener('click', resetChat)
  }

  function updateCounterDisplay() {
    let counter = panel.querySelector('.aa-shv-counter')
    const left = Math.max(0, FREE_MESSAGE_LIMIT - userMsgCount)
    if (!counter) {
      counter = document.createElement('div')
      counter.className = 'aa-shv-counter'
      const clearEl = panel.querySelector('#aa-shv-clear')
      clearEl.parentNode.insertBefore(counter, clearEl)
    }
    counter.textContent = left + ' ' + t.msgsLeft
    counter.classList.toggle('low', left <= 3)
    counter.style.display = (isLimitReached() || userMsgCount === 0) ? 'none' : 'block'
  }

  function updateInputLock() {
    if (isLimitReached()) {
      inputEl.classList.add('locked')
      inputEl.disabled = true
      sendBtn.disabled = true
      inputEl.placeholder = '— ' + t.limitTitle.replace(/[✨❤✨]/g, '').trim() + ' —'
    } else {
      inputEl.classList.remove('locked')
      inputEl.disabled = false
      sendBtn.disabled = false
      inputEl.placeholder = t.placeholder
    }
  }

  function resetChat() {
    history = []
    userMsgCount = 0
    saveHistory()
    saveCount()
    renderAll()
    updateCounterDisplay()
    updateInputLock()
  }

  function renderAll() {
    messagesEl.innerHTML = ''
    if (history.length === 0) {
      renderMessage('assistant', INITIAL_GREETING, false)
    } else {
      history.forEach(m => renderMessage(m.role, m.content, false))
    }
    if (isLimitReached()) renderUpgradeScreen()
  }

  async function sendMessage(text) {
    if (!text.trim()) return
    if (isLimitReached()) { renderUpgradeScreen(); return }
    inputEl.value = ''
    sendBtn.disabled = true

    history.push({ role: 'user', content: text })
    userMsgCount++
    saveCount()
    updateCounterDisplay()
    renderMessage('user', text, true)
    saveHistory()

    const thinkingDiv = document.createElement('div')
    thinkingDiv.className = 'aa-shv-msg assistant aa-shv-thinking'
    thinkingDiv.textContent = t.thinking
    messagesEl.appendChild(thinkingDiv)
    messagesEl.scrollTop = messagesEl.scrollHeight

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(-MAX_HISTORY, -1), // exclude the message we just added
        }),
      })
      thinkingDiv.remove()

      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      history.push({ role: 'assistant', content: data.reply })
      renderMessage('assistant', data.reply, true)
      saveHistory()
      if (isLimitReached()) {
        renderUpgradeScreen()
        updateInputLock()
      }
    } catch (e) {
      thinkingDiv.remove()
      const errDiv = document.createElement('div')
      errDiv.className = 'aa-shv-error'
      errDiv.textContent = t.error
      messagesEl.appendChild(errDiv)
      messagesEl.scrollTop = messagesEl.scrollHeight
      console.error('[Shivani chat]', e)
    } finally {
      if (!isLimitReached()) sendBtn.disabled = false
      inputEl.focus()
    }
  }

  // Wire events
  btn.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open')
    btn.classList.toggle('open', isOpen)
    if (isOpen) {
      renderAll()
      updateCounterDisplay()
      updateInputLock()
      setTimeout(() => inputEl.focus(), 300)
    }
  })

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open')
    btn.classList.remove('open')
  })

  sendBtn.addEventListener('click', () => sendMessage(inputEl.value))
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputEl.value)
    }
  })

  clearBtn.addEventListener('click', resetChat)
})()
