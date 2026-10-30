/**
 * Shared project helpers (window.EOYR_UI) plus the "Projects at a glance"
 * section on the Reports page. Data comes from js/projects-data.js.
 */
(function () {
  const FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'sites', label: 'Brand sites' },
    { id: 'shopify', label: 'Shopify stores' },
    { id: 'tools', label: 'Tools & compliance' }
  ];

  function esc(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function projects() {
    return window.EOYR_PROJECTS || [];
  }

  function findProject(id) {
    return projects().find(p => p.id === id);
  }

  function projectUrl(p) {
    return `project.html?id=${encodeURIComponent(p.id)}`;
  }

  // Screenshot when we have one, otherwise a title tile in the current theme
  function thumbHTML(p, opts = {}) {
    const loading = opts.eager ? 'eager' : 'lazy';
    if (p.thumb) {
      return `<img class="pt-img" src="${esc(p.thumb)}" alt="${esc(opts.alt != null ? opts.alt : p.name + ' website')}" loading="${loading}" decoding="async" width="960" height="600">`;
    }
    return `<div class="pt-tile" role="img" aria-label="${esc(p.name)}"><span class="pt-tile-mark">${esc(p.name)}</span><span class="pt-tile-name">${esc(p.typeLabel)}</span></div>`;
  }

  window.EOYR_UI = { esc, findProject, projectUrl, thumbHTML, projects };

  function cardHTML(p) {
    const wins = (p.wins || []).map(w => `<li>${esc(w)}</li>`).join('');
    return `
      <article class="rp-card" data-type="${esc(p.type)}">
        <a class="rp-card-thumb" href="${projectUrl(p)}" tabindex="-1" aria-hidden="true">${thumbHTML(p, { alt: '' })}</a>
        <header class="rp-card-head">
          <h3 class="rp-card-title"><a href="${projectUrl(p)}">${esc(p.name)}</a></h3>
          <p class="rp-card-meta"><span class="rp-tag">${esc(p.typeLabel)}</span>${p.period ? `<span>${esc(p.period)}</span>` : ''}</p>
        </header>
        <p class="rp-card-summary">${esc(p.summary)}</p>
        ${wins ? `<h4 class="rp-label">What got done</h4><ul class="rp-wins">${wins}</ul>` : ''}
        <a class="rp-more" href="${projectUrl(p)}">
          <span class="rp-more-text">More details</span><span class="rp-more-icon" aria-hidden="true">&rarr;</span>
        </a>
      </article>`;
  }

  function compactHTML(p) {
    return `
      <li class="rp-compact" data-type="${esc(p.type)}">
        <a class="rp-compact-link" href="${projectUrl(p)}">
          <span class="rp-compact-name"><strong>${esc(p.name)}</strong> <span class="rp-tag">${esc(p.typeLabel)}</span></span>
          <span class="rp-compact-summary">${esc(p.summary)}</span>
        </a>
        <span class="rp-compact-arrow" aria-hidden="true">&rarr;</span>
      </li>`;
  }

  function openFilters() {
    const panel = document.getElementById('eoyr-filter-panel');
    const toggle = document.getElementById('eoyr-filter-toggle');
    if (panel) panel.hidden = false;
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.textContent = 'Hide filters';
    }
  }

  // Filter the activity log to one project and scroll to it
  function showActivity(repo) {
    openFilters();
    const labels = document.querySelectorAll('.eoyr-project-checkbox');
    if (labels.length && typeof window.triggerRepoFilterChange === 'function') {
      labels.forEach(label => {
        const on = label.dataset.repo === repo;
        label.classList.toggle('active', on);
        const box = label.querySelector('input[type="checkbox"]');
        if (box) box.checked = on;
      });
      if (typeof window.updateSelectedProjects === 'function') window.updateSelectedProjects();
      window.triggerRepoFilterChange();
    }
    const log = document.getElementById('activity-log');
    if (log) log.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // project.html links to index.html?repo=...#activity-log; the project
  // checkboxes arrive with the API response, so wait for them briefly
  function applyRepoParam() {
    const repo = new URLSearchParams(location.search).get('repo');
    if (!repo || !document.getElementById('activity-log')) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (document.querySelector('.eoyr-project-checkbox') || tries > 40) {
        clearInterval(timer);
        showActivity(repo);
      }
    }, 250);
  }

  function applyFilter(root, type) {
    root.querySelectorAll('.rp-filter').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === type)));
    root.querySelectorAll('[data-type]').forEach(el => {
      el.hidden = !(type === 'all' || el.dataset.type === type);
    });
    const compactList = root.querySelector('.rp-compact-list');
    const compactWrap = root.querySelector('.rp-compact-wrap');
    if (compactList && compactWrap) {
      compactWrap.hidden = !compactList.querySelector('.rp-compact:not([hidden])');
    }
  }

  function render() {
    const root = document.getElementById('projects-root');
    if (!root || !projects().length) return;

    const featured = projects().filter(p => p.wins && p.wins.length);
    const other = projects().filter(p => !(p.wins && p.wins.length));

    root.innerHTML = `
      <div class="rp-filters" role="group" aria-label="Show projects by type">
        ${FILTERS.map(f => `<button type="button" class="rp-filter" data-filter="${f.id}" aria-pressed="${f.id === 'all'}">${f.label}</button>`).join('')}
      </div>
      <div class="rp-grid">${featured.map(cardHTML).join('')}</div>
      <div class="rp-compact-wrap">
        <h3 class="rp-subhead">Other brands supported</h3>
        <ul class="rp-compact-list">${other.map(compactHTML).join('')}</ul>
      </div>`;

    root.addEventListener('click', e => {
      const filter = e.target.closest('.rp-filter');
      if (filter) applyFilter(root, filter.dataset.filter);
    });
  }

  // Filters start collapsed on phones; desktop always shows them (see reports.css)
  function setupFilterPanel() {
    const panel = document.getElementById('eoyr-filter-panel');
    const toggle = document.getElementById('eoyr-filter-toggle');
    if (!panel || !toggle) return;
    if (window.matchMedia('(max-width: 767px)').matches) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
      const open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Hide filters' : 'Filters';
    });
  }

  function init() {
    render();
    setupFilterPanel();
    applyRepoParam();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
