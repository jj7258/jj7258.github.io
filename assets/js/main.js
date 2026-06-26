(function () {
  'use strict';

  /* ── THEME MANAGEMENT ─────────────────────────────────────── */
  const html = document.documentElement;
  const THEME_KEY = 'jgj-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function getEffectiveTheme() {
    return html.dataset.theme || getSystemTheme();
  }
  function updateToggleIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const dark = getEffectiveTheme() === 'dark';
    icon.className = dark ? 'bi bi-sun' : 'bi bi-moon';
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  function applyTheme(theme, animate) {
    if (animate) {
      html.classList.add('theme-transitioning');
      setTimeout(() => html.classList.remove('theme-transitioning'), 340);
    }
    if (theme === 'system') {
      delete html.dataset.theme;
    } else {
      html.dataset.theme = theme;
    }
    updateToggleIcon();
  }

  // Restore on load
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') html.dataset.theme = stored;
  updateToggleIcon();

  // Live system preference change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!html.dataset.theme) updateToggleIcon();
  });

  // Toggle button
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next, true);
    });
  }

  /* ── PRELOADER ────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /* ── MOBILE NAV ───────────────────────────────────────────── */
  const mobileToggle = document.getElementById('mobileToggle');
  const header = document.getElementById('header');

  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      mobileToggle.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on nav link click
    header.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        header.classList.contains('nav-open') &&
        !header.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        header.classList.remove('nav-open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── SCROLL TO TOP ────────────────────────────────────────── */
  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    const syncVisible = () => scrollTop.classList.toggle('active', window.scrollY > 280);
    window.addEventListener('scroll', syncVisible, { passive: true });
    window.addEventListener('load', syncVisible);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── SCROLL SPY (pill nav active state) ──────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a');
  function scrollSpy() {
    const pos = window.scrollY + 120;
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;
      const sec = document.querySelector(href);
      if (!sec) return;
      link.classList.toggle('active',
        pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight
      );
    });
  }
  window.addEventListener('scroll', scrollSpy, { passive: true });
  window.addEventListener('load', scrollSpy);

  /* ── IO REVEAL (from web-prototype-taste-editorial template) ─ */
  const revealIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      }
    }
  }, { threshold: 0.06, rootMargin: '0px 0px -36px 0px' });

  window.addEventListener('load', () => {
    document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));
  });

  /* ── CUSTOM CURSOR ────────────────────────────────────────── */
  const cursorDot  = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const motionOk   = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const hasHover   = window.matchMedia('(hover: hover)').matches;

  if (cursorDot && cursorRing && motionOk && hasHover) {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      dotX = e.clientX; dotY = e.clientY;
      cursorDot.style.transform = `translate(${dotX}px,${dotY}px)`;
    });

    (function animRing() {
      ringX += (dotX - ringX) * 0.13;
      ringY += (dotY - ringY) * 0.13;
      cursorRing.style.transform = `translate(${ringX}px,${ringY}px)`;
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, .proj-entry, .contact-row, .award-row').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-link'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-link'));
    });
  }

  /* ── RADAR CANVAS ─────────────────────────────────────────── */
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, CX, CY, angle = 0, pts = [], animId = null;
  const SCAN_SPEED = 0.011;
  const TRAIL      = Math.PI * 0.55;
  const ORANGE_RGB = '249,115,22';
  const MINT_RGB   = '52,211,153';

  function resize() {
    const size = Math.min(canvas.parentElement.offsetWidth, 460);
    W = canvas.width  = size;
    H = canvas.height = size;
    CX = W / 2; CY = H / 2;
  }

  function genPts(n = 32) {
    pts = [];
    const maxR = CX * 0.84;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = maxR * (0.15 + Math.random() * 0.84);
      pts.push({ a, r, x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, b: 0 });
    }
  }

  function drawFrame() {
    const maxR = CX * 0.84;

    // Dark base — always, regardless of page theme
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, W, H);

    // Dot grid
    ctx.fillStyle = 'rgba(248,250,252,0.04)';
    const step = 28;
    for (let x = step; x < W; x += step) {
      for (let y = step; y < H; y += step) {
        const dx = x - CX, dy = y - CY;
        if (dx * dx + dy * dy < maxR * maxR) {
          ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    // Range rings
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(CX, CY, (maxR / 4) * i, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ORANGE_RGB},0.07)`;
      ctx.lineWidth = 1; ctx.stroke();
    }

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(CX - maxR, CY); ctx.lineTo(CX + maxR, CY);
    ctx.moveTo(CX, CY - maxR); ctx.lineTo(CX, CY + maxR);
    ctx.strokeStyle = `rgba(${ORANGE_RGB},0.05)`;
    ctx.lineWidth = 0.7; ctx.stroke();

    // Sweep trail
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, maxR, angle - TRAIL, angle, false);
    ctx.closePath();
    const trailG = ctx.createRadialGradient(CX, CY, 0, CX, CY, maxR);
    trailG.addColorStop(0, `rgba(${ORANGE_RGB},0.0)`);
    trailG.addColorStop(1, `rgba(${ORANGE_RGB},0.10)`);
    ctx.fillStyle = trailG; ctx.fill();
    ctx.restore();

    // Scan beam
    const bx = CX + Math.cos(angle) * maxR;
    const by = CY + Math.sin(angle) * maxR;
    const beamG = ctx.createLinearGradient(CX, CY, bx, by);
    beamG.addColorStop(0, `rgba(${ORANGE_RGB},0.95)`);
    beamG.addColorStop(1, `rgba(${ORANGE_RGB},0.04)`);
    ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(bx, by);
    ctx.strokeStyle = beamG; ctx.lineWidth = 1.5; ctx.stroke();

    // Points
    pts.forEach(pt => {
      const diff = ((angle - pt.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      if (diff < SCAN_SPEED * 2.5) pt.b = 1;
      if (pt.b > 0) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT_RGB},${pt.b * 0.14})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT_RGB},${pt.b})`;
        ctx.fill();
        pt.b *= 0.982;
        if (pt.b < 0.01) pt.b = 0;
      }
    });

    // Centre pip
    ctx.beginPath();
    ctx.arc(CX, CY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ORANGE_RGB},1)`;
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(CX, CY, maxR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${ORANGE_RGB},0.14)`;
    ctx.lineWidth = 1; ctx.stroke();

    angle = (angle + SCAN_SPEED) % (Math.PI * 2);
    animId = requestAnimationFrame(drawFrame);
  }

  function initRadar() {
    resize(); genPts();
    cancelAnimationFrame(animId);
    animId = null;
    drawFrame();
  }

  // Resize observer
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { resize(); genPts(); }).observe(canvas.parentElement);
  }

  // Pause when off-screen
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      if (!animId) drawFrame();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.1 }).observe(canvas);

  setTimeout(initRadar, 60);

  /* ── SMOOTH HASH SCROLL ───────────────────────────────────── */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const t = document.querySelector(window.location.hash);
      if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    }
  });

})();
