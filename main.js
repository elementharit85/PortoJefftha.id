// Script bersama: navbar, footer, background, transisi halaman, scroll reveal, typing, lightbox
(function () {
  const pages = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['skills.html', 'Skills'],
    ['experience.html', 'Experience'],
    ['hobbies.html', 'Hobbies'],
    ['gallery.html', 'Gallery'],
    ['contact.html', 'Contact'],
  ];
  const order = pages.map(p => p[0]);
  const current = location.pathname.split('/').pop() || 'index.html';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // Arah transisi (maju/mundur) dari halaman sebelumnya
  try {
    const d = sessionStorage.getItem('navDir');
    if (d) { root.dataset.dir = d; sessionStorage.removeItem('navDir'); }
  } catch (e) {}

  // ---------- Background (CSS biasa, sama di semua halaman) ----------
  const bg = document.createElement('div');
  bg.className = 'site-bg';
  bg.innerHTML = '<span class="b1"></span><span class="b2"></span><span class="dots"></span>';
  document.body.prepend(bg);
  // Sinkronkan animasi blob antar halaman agar tidak mulai ulang
  try {
    const t0 = Number(sessionStorage.getItem('bgT0')) || Date.now();
    sessionStorage.setItem('bgT0', t0);
    const elapsed = (Date.now() - t0) / 1000;
    bg.querySelectorAll('.b1, .b2').forEach(b => { b.style.animationDelay = `-${elapsed}s`; });
  } catch (e) {}

  // ---------- Header (CSS biasa: tidak bergantung pada Tailwind) ----------
  const navLink = (h, t) =>
    `<a href="${h}"${h === current ? ' class="is-active" aria-current="page"' : ''}>${t}</a>`;
  const headerMount = document.getElementById('site-header');
  if (headerMount) {
    headerMount.innerHTML = `
      <header id="nav" class="site-nav">
        <div class="site-nav__bar">
          <a href="index.html" class="site-nav__logo">Jefftha</a>
          <nav class="site-nav__links" aria-label="Navigasi utama">${pages.map(p => navLink(p[0], p[1])).join('')}</nav>
          <button id="menuBtn" type="button" class="site-nav__burger" aria-label="Menu" aria-expanded="false">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
        <div id="mobileMenu" class="site-nav__menu">${pages.map(p => navLink(p[0], p[1])).join('')}</div>
        <div id="progress" class="site-nav__progress"></div>
      </header>`;
    const bar = document.getElementById('progress');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', () => {
      const open = document.getElementById('mobileMenu').classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  // ---------- Footer ----------
  const footerMount = document.getElementById('site-footer');
  if (footerMount) {
    const footLink = (h, t) => {
      const active = h === current;
      return `<li><a href="${h}" ${active ? 'aria-current="page"' : ''} class="inline-block py-1.5 text-sm transition ${active ? 'text-rose font-semibold' : 'text-white/60 hover:text-rose hover:translate-x-1'}">${t}</a></li>`;
    };
    const social = (href, label, svg) =>
      `<a href="${href}" target="_blank" rel="noopener" aria-label="${label}" class="w-10 h-10 rounded-full bg-white/10 text-white/70 flex items-center justify-center hover:bg-rose hover:text-bg hover:-translate-y-1 transition">${svg}</a>`;
    const icons = {
      ig: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
      fb: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z"/></svg>',
      yt: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg>',
    };
    footerMount.innerHTML = `
      <footer class="relative border-t border-line bg-deep/80 mt-24">
        <div class="max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="index.html" class="text-2xl font-extrabold text-rose tracking-tight inline-block hover:scale-105 transition">Jefftha</a>
              <p class="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">Mahasiswa Informatika, koordinator multimedia, dan content creator.</p>
              <a href="contact.html" class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose text-bg text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose/30 transition">Hubungi Saya <span>&rarr;</span></a>
            </div>
            <nav aria-label="Navigasi footer">
              <h3 class="text-sm font-bold text-white/80">Menu</h3>
              <ul class="mt-3">${pages.map(p => footLink(p[0], p[1])).join('')}</ul>
            </nav>
            <div>
              <h3 class="text-sm font-bold text-white/80">Hubungi Saya</h3>
              <a href="mailto:yeftaforall@gmail.com" class="mt-3 inline-block text-sm text-white/60 hover:text-rose transition break-all">yeftaforall@gmail.com</a>
              <p class="mt-2 text-sm text-white/40">Terbuka untuk organisasi &amp; magang.</p>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white/80">Follow Me On:</h3>
              <div class="mt-3 flex gap-3">
                ${social('https://www.instagram.com/yefta_f.s', 'Instagram', icons.ig)}
                ${social('https://www.facebook.com/p/Yefta-Fernando-Setiawan-100006210379344', 'Facebook', icons.fb)}
                ${social('https://www.youtube.com/@theyeftatz', 'YouTube', icons.yt)}
              </div>
            </div>
          </div>
          <div class="mt-12 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>&copy; 2026 Jefftha.id Hak cipta.</p>
            <button id="toTop" type="button" class="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose/40 text-rose hover:bg-rose hover:text-bg transition">
              Ke atas <span class="group-hover:-translate-y-0.5 transition">&uarr;</span>
            </button>
          </div>
        </div>
      </footer>`;
    document.getElementById('toTop').addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }

  // ---------- Transisi keluar: konten memudar + geser sebelum pindah halaman ----------
  const pageEls = () => [document.querySelector('main'), document.getElementById('site-footer')].filter(Boolean);
  document.addEventListener('click', (e) => {
    if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    const to = url.pathname.split('/').pop() || 'index.html';
    const fromI = order.indexOf(current), toI = order.indexOf(to);
    if (toI === -1) return; // bukan halaman menu: pindah biasa
    e.preventDefault();
    const forward = toI > fromI;
    try { sessionStorage.setItem('navDir', forward ? 'fwd' : 'back'); } catch (err) {}
    const mm = document.getElementById('mobileMenu');
    if (mm) mm.classList.remove('open');
    pageEls().forEach(el => el.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateX(${forward ? -48 : 48}px) scale(.985)` }],
      { duration: 240, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' }));
    setTimeout(() => { location.href = a.href; }, 240);
  });
  // Tombol back/forward browser (bfcache): batalkan animasi keluar
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) pageEls().forEach(el => el.getAnimations().forEach(an => an.cancel()));
  });

  // ---------- Siap tampil: tunggu Tailwind selesai, lalu animasi masuk ----------
  function whenTailwindReady(cb) {
    const probe = document.createElement('div');
    probe.className = 'hidden';
    document.body.appendChild(probe);
    const t0 = performance.now();
    (function check() {
      const ready = getComputedStyle(probe).display === 'none';
      if (ready || performance.now() - t0 > 1500) { probe.remove(); cb(); }
      else requestAnimationFrame(check);
    })();
  }

  initRest();
  whenTailwindReady(() => {
    initReveal();
    root.classList.add('is-ready');
  });

  // ---------- Scroll reveal ----------
  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (reduce || !('IntersectionObserver' in window)) return;
    items.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-8', 'scale-95', 'transition-all', 'duration-700', 'ease-out');
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  // ---------- Typing + Lightbox ----------
  function initRest() {
    document.querySelectorAll('[data-typing]').forEach(el => {
      const words = el.dataset.typing.split('|');
      if (reduce) { el.textContent = words[0]; return; }
      let w = 0, c = 0, del = false;
      (function tick() {
        const word = words[w];
        el.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 40 : 85);
      })();
    });

    document.querySelectorAll('[data-lightbox]').forEach(img => {
      img.addEventListener('click', () => {
        const o = document.createElement('div');
        o.className = 'fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out';
        o.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="max-h-full max-w-full rounded-2xl shadow-2xl">`;
        const close = () => { o.remove(); document.removeEventListener('keydown', esc); };
        const esc = (e) => e.key === 'Escape' && close();
        o.addEventListener('click', close);
        document.addEventListener('keydown', esc);
        document.body.appendChild(o);
      });
    });
  }
})();
