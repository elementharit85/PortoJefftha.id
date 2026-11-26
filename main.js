// Script bersama: navbar, footer, background animasi, scroll reveal, typing, lightbox
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
  const current = location.pathname.split('/').pop() || 'index.html';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const link = (h, t, mobile) => {
    const active = h === current;
    const base = mobile ? 'block px-4 py-3 rounded-xl text-base' : 'px-3 py-2 rounded-full text-sm';
    const state = active
      ? 'bg-rose/15 text-rose font-semibold'
      : 'text-white/75 hover:text-white hover:bg-white/5';
    return `<a href="${h}" class="${base} transition ${state}">${t}</a>`;
  };

  // ---------- Header ----------
  const headerMount = document.getElementById('site-header');
  if (headerMount) {
    headerMount.innerHTML = `
      <header id="nav" class="fixed top-0 inset-x-0 z-50 transition-all duration-300">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="index.html" class="text-2xl font-extrabold text-rose tracking-tight hover:scale-105 transition">Jefftha</a>
          <nav class="hidden md:flex items-center gap-1">${pages.map(p => link(p[0], p[1])).join('')}</nav>
          <button id="menuBtn" aria-label="Menu" class="md:hidden p-2 rounded-lg hover:bg-white/10 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
        <div id="mobileMenu" class="md:hidden hidden mx-4 mb-3 p-2 rounded-2xl bg-deep/95 backdrop-blur-xl border border-line">
          ${pages.map(p => link(p[0], p[1], true)).join('')}
        </div>
        <div id="progress" class="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose to-ember"></div>
      </header>`;
    const nav = document.getElementById('nav');
    const bar = document.getElementById('progress');
    const onScroll = () => {
      const y = window.scrollY;
      const scrolled = y > 20;
      nav.classList.toggle('bg-bg/70', scrolled);
      nav.classList.toggle('backdrop-blur-xl', scrolled);
      nav.classList.toggle('border-b', scrolled);
      nav.classList.toggle('border-line', scrolled);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = h > 0 ? (y / h) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    document.getElementById('menuBtn').addEventListener('click', () =>
      document.getElementById('mobileMenu').classList.toggle('hidden'));
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

  // ---------- Background blobs ----------
  const bg = document.createElement('div');
  bg.className = 'fixed inset-0 -z-10 overflow-hidden pointer-events-none';
  bg.innerHTML = `
    <div class="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-rose/20 blur-3xl animate-blob"></div>
    <div class="absolute top-1/2 -right-40 w-[32rem] h-[32rem] rounded-full bg-ember/15 blur-3xl animate-blob-slow"></div>
    <div class="absolute inset-0 opacity-[0.04]" style="background-image:radial-gradient(#fff 1px,transparent 1px);background-size:28px 28px"></div>`;
  document.body.prepend(bg);
  // Sinkronkan animasi blob antar halaman agar tidak mulai ulang (tidak patah-patah)
  try {
    const t0 = Number(sessionStorage.getItem('bgT0')) || Date.now();
    sessionStorage.setItem('bgT0', t0);
    const elapsed = (Date.now() - t0) / 1000;
    bg.querySelectorAll('.animate-blob, .animate-blob-slow').forEach(b => { b.style.animationDelay = `-${elapsed}s`; });
  } catch (e) {}

  // ---------- Transisi halaman (fallback untuk browser tanpa View Transitions, mis. Firefox) ----------
  if (!('startViewTransition' in document) && !reduce) {
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.animate(
      [{ opacity: 0, transform: 'translateY(14px) scale(.985)' }, { opacity: 1, transform: 'none' }],
      { duration: 450, easing: 'ease-out' });
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      e.preventDefault();
      document.body.style.transition = 'opacity .25s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { location.href = a.href; }, 250);
    });
    window.addEventListener('pageshow', (e) => { if (e.persisted) document.body.style.opacity = '1'; });
  }

  // ---------- Scroll reveal ----------
  const items = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) return initRest();
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
  initRest();

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
