/* ═══════════════════════════════════════════
   SÔNIA SAMUDIO 11000 · DEPUTADA ESTADUAL RJ
   Nova AI Solutions
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── COMPARTILHAR (nativo no celular, copia link no desktop) ─────────── */
  var SHARE_DATA = {
    title: 'Sônia Samudio — 11000',
    text: 'Conheça a candidatura de Sônia Samudio, número 11000, para Deputada Estadual pelo Rio de Janeiro.',
    url: window.location.href
  };
  function doShare(btn, labelEl) {
    if (navigator.share) {
      navigator.share(SHARE_DATA).catch(function () { /* usuário cancelou, sem problema */ });
      return;
    }
    var text = SHARE_DATA.text + ' ' + SHARE_DATA.url;
    var restore = function (msg, delay) {
      setTimeout(function () {
        if (labelEl) labelEl.textContent = 'Compartilhar campanha';
        btn.classList.remove('is-copied');
      }, delay);
    };
    var onCopied = function () {
      btn.classList.add('is-copied');
      if (labelEl) labelEl.textContent = 'Link copiado!';
      restore(null, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onCopied).catch(function () { window.prompt('Copie o link da campanha:', text); });
    } else {
      window.prompt('Copie o link da campanha:', text);
    }
  }
  var shareBtn = $('#share-btn'), shareLabel = $('#share-label');
  if (shareBtn) shareBtn.addEventListener('click', function () { doShare(shareBtn, shareLabel); });
  var shareFloat = $('#share-float');
  if (shareFloat) shareFloat.addEventListener('click', function () { doShare(shareFloat, null); });

  /* ─────────── LOADER ─────────── */
  var loader = $('#loader');
  function hideLoader() {
    if (!loader || loader.classList.contains('gone')) return;
    loader.classList.add('gone');
    setTimeout(function () { loader.remove(); }, 700);
  }
  window.addEventListener('load', function () { setTimeout(hideLoader, reduced ? 100 : 1400); });
  setTimeout(hideLoader, 4000); // à prova de imagem travada

  /* ─────────── ANO ─────────── */
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ─────────── NAV / SCROLL ─────────── */
  var nav = $('#nav'), bar = $('#scrollbar i'), float = $('.float-wpp'), floatApoie = $('#float-apoie');
  var ticking = false;
  function onScroll() {
    var sy = window.scrollY || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('stuck', sy > 40);
    if (bar) bar.style.width = (h > 0 ? (sy / h) * 100 : 0) + '%';
    if (float) float.classList.toggle('show', sy > window.innerHeight * 0.7);
    if (floatApoie) floatApoie.classList.toggle('show', sy > window.innerHeight * 0.7);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ─────────── DRAWER MOBILE ─────────── */
  var burger = $('#burger'), drawer = $('#drawer');
  function toggleDrawer(force) {
    var open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { toggleDrawer(); });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { toggleDrawer(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) toggleDrawer(false);
    });
  }

  /* ─────────── REVEAL ─────────── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      if (en.target.hasAttribute('data-count')) countUp(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px' });

  $$('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(el);
  });
  $$('[data-count]').forEach(function (el) { io.observe(el); });

  /* ─────────── CONTADORES ─────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    if (reduced) { el.textContent = target; return; }
    var t0 = null, dur = 1100;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ─────────── BOTÃO MAGNÉTICO ─────────── */
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine && !reduced) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.2 + 'px,' + my * 0.28 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ─────────── RIPPLE ─────────── */
  $$('[data-ripple]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var r = el.getBoundingClientRect();
      var d = Math.max(r.width, r.height) * 2;
      var s = document.createElement('span');
      s.className = 'rip';
      s.style.width = s.style.height = d + 'px';
      s.style.left = (e.clientX - r.left) + 'px';
      s.style.top = (e.clientY - r.top) + 'px';
      el.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  });

  /* ─────────── TILT NA FOTO DO HERO ─────────── */
  if (fine && !reduced) {
    $$('[data-tilt]').forEach(function (el) {
      var frame = $('.hero-photo-frame', el) || el;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        frame.style.transform = 'perspective(1100px) rotateY(' + px * 7 + 'deg) rotateX(' + (-py * 7) + 'deg) translateZ(0)';
      });
      el.addEventListener('mouseleave', function () { frame.style.transform = ''; });
    });
  }
})();
