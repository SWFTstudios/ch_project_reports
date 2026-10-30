/**
 * Site header and full-screen menu.
 * Renders into <div id="site-menu"></div>: a slim header (Matrix logo, view
 * toggle, Menu button) and a menu with a few links, an auto-looping website
 * slider (swipe or tap a site to open its project page) and utilities.
 * Needs js/projects-data.js and js/projects.js (window.EOYR_UI) first.
 */
(function () {
  const HEADER_SCENE = 'https://prod.spline.design/TiU9lObPNAba4cNs/scene.splinecode';
  const MENU_SCENE = 'https://prod.spline.design/9yMJUr26hCivv0YV/scene.splinecode';
  const SLIDE_SPEED = 28; // px per second
  const RESUME_DELAY = 2500;

  const LINKS = [
    { href: 'index.html', label: 'Reports', note: 'What got built' },
    { href: 'eoyr-summary.html', label: 'Year in Review', note: 'One-page summary' },
    { href: 'shopify-changes.html', label: 'Shopify log', note: 'Store changes by date' },
    { href: 'analytics.html', label: 'Analytics', note: 'Site traffic reports' },
    { href: 'modeling.html', label: 'Content', note: 'Photo and video' },
    { href: 'ideas.html', label: 'Ideas', note: 'What could come next' }
  ];

  const ui = window.EOYR_UI;
  const esc = ui ? ui.esc : (t => String(t));

  function currentPage() {
    const file = location.pathname.split('/').pop();
    return file || 'index.html';
  }

  function slideHTML(p, clone) {
    const hidden = clone ? ' aria-hidden="true" tabindex="-1"' : '';
    return `
      <a class="sm-slide" href="${ui.projectUrl(p)}"${hidden}>
        <span class="sm-slide-thumb">${ui.thumbHTML(p, { alt: '' })}</span>
        <span class="sm-slide-name">${esc(p.name)}</span>
        <span class="sm-slide-type">${esc(p.typeLabel)}</span>
      </a>`;
  }

  function markup() {
    const page = currentPage();
    const links = LINKS.map(l => `
      <a class="sm-link" href="${l.href}"${l.href === page ? ' aria-current="page"' : ''}>
        <span class="sm-link-label">${l.label}</span>
        <span class="sm-link-note">${l.note}</span>
      </a>`).join('');
    const inline = LINKS.slice(0, 3).map(l =>
      `<a href="${l.href}"${l.href === page ? ' aria-current="page"' : ''}>${l.label}</a>`).join('');
    // Sites with real screenshots lead the belt
    const all = ui ? ui.projects() : [];
    const sites = all.filter(p => p.thumb).concat(all.filter(p => !p.thumb));
    const slides = sites.map(p => slideHTML(p, false)).join('') + sites.map(p => slideHTML(p, true)).join('');

    return `
      <header class="sm-bar">
        <a class="sm-logo" href="index.html" aria-label="Reports home">
          <canvas id="spline-logo-canvas" class="sm-logo-canvas" aria-hidden="true"></canvas>
        </a>
        <nav class="sm-inline" aria-label="Main">${inline}</nav>
        <div class="sm-actions">
          <button type="button" class="theme-quick-toggle" aria-label="Switch between Matrix and Paper view">
            <span class="tq-dot" aria-hidden="true"></span><span class="tq-label">Matrix</span>
          </button>
          <button type="button" class="sm-open" aria-expanded="false" aria-controls="sm-panel">
            <span class="sm-burger" aria-hidden="true"><i></i><i></i></span><span>Menu</span>
          </button>
        </div>
      </header>
      <div class="sm-panel" id="sm-panel" role="dialog" aria-modal="true" aria-label="Site menu" hidden data-lenis-prevent>
        <div class="sm-panel-inner">
          <div class="sm-top">
            <a class="sm-menu-logo-link" href="index.html" aria-label="Reports home">
              <canvas id="spline-menu-logo" class="sm-menu-logo" aria-hidden="true"></canvas>
            </a>
            <button type="button" class="sm-close"><span aria-hidden="true">&times;</span> Close</button>
          </div>
          <nav class="sm-links" aria-label="Pages">${links}</nav>
          <section class="sm-sites" aria-labelledby="sm-sites-title">
            <div class="sm-sites-head">
              <h2 id="sm-sites-title">Websites</h2>
              <span class="sm-sites-hint">Swipe, or tap a site for details</span>
              <span class="sm-arrows">
                <button type="button" class="sm-arrow" data-dir="-1" aria-label="Previous websites">&larr;</button>
                <button type="button" class="sm-arrow" data-dir="1" aria-label="Next websites">&rarr;</button>
              </span>
            </div>
            <div class="sm-track" tabindex="0" aria-label="Website thumbnails">${slides}</div>
          </section>
          <div class="sm-foot">
            <button type="button" class="sm-util" data-action="theme"><span class="tq-dot" aria-hidden="true"></span> <span class="tq-label">Matrix</span> view</button>
            <button type="button" class="sm-util" data-action="color">Color picker</button>
            <a class="sm-util" href="how-it-works.html">How reports work</a>
            <a class="sm-util" href="mailto:elombe.kisala@corehome.com">Email Elombe</a>
          </div>
        </div>
      </div>`;
  }

  // Auto-scrolling conveyor. Slides are rendered twice, so when the first
  // copy has scrolled past we jump back by its width and the loop is seamless.
  function setupConveyor(track) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = reduced;
    let resumeTimer = null;
    let last = 0;
    let carry = 0;
    let running = false;

    function loopWidth() {
      return track.scrollWidth / 2;
    }

    function wrap() {
      const half = loopWidth();
      if (half <= 0) return;
      if (track.scrollLeft >= half) track.scrollLeft -= half;
      else if (track.scrollLeft <= 0) track.scrollLeft += half;
    }

    function tick(now) {
      if (!running) return;
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      if (!paused) {
        carry += (SLIDE_SPEED * dt) / 1000;
        const step = Math.floor(carry);
        if (step >= 1) {
          carry -= step;
          track.scrollLeft += step;
          wrap();
        }
      }
      requestAnimationFrame(tick);
    }

    function pause() {
      paused = true;
      clearTimeout(resumeTimer);
    }

    function resumeLater() {
      clearTimeout(resumeTimer);
      if (reduced) return;
      resumeTimer = setTimeout(() => { paused = false; }, RESUME_DELAY);
    }

    track.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pause(); });
    track.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') resumeLater(); });
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resumeLater, { passive: true });
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', resumeLater);
    track.addEventListener('scroll', () => { if (paused) wrap(); }, { passive: true });

    return {
      start() {
        if (running) return;
        running = true;
        last = 0;
        if (track.scrollLeft === 0) track.scrollLeft = 1;
        requestAnimationFrame(tick);
      },
      stop() { running = false; },
      nudge(dir) {
        pause();
        const slide = track.querySelector('.sm-slide');
        const by = slide ? slide.getBoundingClientRect().width + 12 : 240;
        track.scrollBy({ left: dir * by, behavior: reduced ? 'auto' : 'smooth' });
        resumeLater();
      }
    };
  }

  function whenSpline(cb) {
    let tries = 0;
    (function check() {
      if (typeof window.initSplineLogo === 'function') return cb();
      if (++tries < 50) setTimeout(check, 100);
    })();
  }

  function init() {
    const host = document.getElementById('site-menu');
    if (!host || !ui) return;
    host.innerHTML = markup();

    const panel = host.querySelector('#sm-panel');
    const openBtn = host.querySelector('.sm-open');
    const closeBtn = host.querySelector('.sm-close');
    const track = host.querySelector('.sm-track');
    const conveyor = setupConveyor(track);
    let menuLogoLoaded = false;

    function open() {
      panel.hidden = false;
      document.documentElement.classList.add('sm-is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      if (window.lenis) window.lenis.stop();
      requestAnimationFrame(() => panel.classList.add('is-visible'));
      conveyor.start();
      closeBtn.focus();
      if (!menuLogoLoaded) {
        menuLogoLoaded = true;
        whenSpline(() => window.initSplineLogo('spline-menu-logo', MENU_SCENE));
      }
    }

    function close() {
      panel.classList.remove('is-visible');
      document.documentElement.classList.remove('sm-is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      if (window.lenis) window.lenis.start();
      conveyor.stop();
      panel.hidden = true;
      openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    panel.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      // Keep keyboard focus inside the open menu
      const focusable = [...panel.querySelectorAll('a[href], button, [tabindex="0"]')]
        .filter(el => el.getAttribute('tabindex') !== '-1' && el.offsetParent !== null);
      const first = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    });

    host.querySelectorAll('.sm-arrow').forEach(btn =>
      btn.addEventListener('click', () => conveyor.nudge(Number(btn.dataset.dir))));

    panel.addEventListener('click', e => {
      const util = e.target.closest('[data-action]');
      if (!util) return;
      if (util.dataset.action === 'theme' && window.toggleTheme) window.toggleTheme();
      if (util.dataset.action === 'color' && window.openColorPicker) {
        close();
        window.openColorPicker();
      }
    });

    // Header quick toggle (theme-toggle.js binds on DOMContentLoaded, which may have passed)
    host.querySelectorAll('.theme-quick-toggle').forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', e => {
        e.preventDefault();
        if (window.toggleTheme) window.toggleTheme();
      });
    });
    if (!window.openColorPicker) {
      const colorBtn = host.querySelector('[data-action="color"]');
      if (colorBtn) colorBtn.hidden = true;
    }
    if (window.getCurrentTheme) syncThemeLabels(window.getCurrentTheme());

    whenSpline(() => window.initSplineLogo('spline-logo-canvas', HEADER_SCENE));

    // Other pages link back with localStorage.openMenu = 'true'
    try {
      if (localStorage.getItem('openMenu') === 'true') {
        localStorage.removeItem('openMenu');
        open();
      }
    } catch (e) { /* storage unavailable */ }

    window.openSiteMenu = open;
    window.closeSiteMenu = close;
  }

  function syncThemeLabels(theme) {
    document.querySelectorAll('#site-menu .tq-label').forEach(el => {
      el.textContent = theme === 'plain' ? 'Paper' : 'Matrix';
    });
  }

  window.addEventListener('eoyr-theme-change', e => syncThemeLabels(e.detail));

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
