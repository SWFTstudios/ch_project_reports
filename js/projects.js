/**
 * Projects at a glance: renders plain-language project cards from
 * window.EOYR_PROJECTS (js/projects-data.js), with type filters and a
 * "More details" toggle per card.
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

  function cardHTML(p) {
    const detailsId = `project-details-${p.id}`;
    const wins = (p.wins || []).map(w => `<li>${esc(w)}</li>`).join('');
    const details = (p.details || []).map(d => `<li>${esc(d)}</li>`).join('');
    const links = [];
    if (p.url) links.push(`<a class="rp-link" href="${esc(p.url)}" target="_blank" rel="noopener">Visit site</a>`);
    if (p.link) links.push(`<a class="rp-link" href="${esc(p.link.href)}">${esc(p.link.label)}</a>`);
    if (p.repo) links.push(`<button type="button" class="rp-link" data-activity="${esc(p.repo)}">See activity log</button>`);

    return `
      <article class="rp-card" data-type="${esc(p.type)}">
        <header class="rp-card-head">
          <h3 class="rp-card-title">${esc(p.name)}</h3>
          <p class="rp-card-meta"><span class="rp-tag">${esc(p.typeLabel)}</span>${p.period ? `<span>${esc(p.period)}</span>` : ''}</p>
        </header>
        <p class="rp-card-summary">${esc(p.summary)}</p>
        ${wins ? `<h4 class="rp-label">What got done</h4><ul class="rp-wins">${wins}</ul>` : ''}
        <button type="button" class="rp-more" aria-expanded="false" aria-controls="${detailsId}">
          <span class="rp-more-text">More details</span><span class="rp-more-icon" aria-hidden="true">+</span>
        </button>
        <div class="rp-details" id="${detailsId}" hidden>
          ${details ? `<h4 class="rp-label">Behind the scenes</h4><ul class="rp-detail-list">${details}</ul>` : ''}
          ${links.length ? `<div class="rp-links">${links.join('')}</div>` : ''}
        </div>
      </article>`;
  }

  function compactHTML(p) {
    const name = p.url
      ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>`
      : esc(p.name);
    const activity = p.repo
      ? `<button type="button" class="rp-mini-link" data-activity="${esc(p.repo)}">Activity</button>`
      : '';
    return `
      <li class="rp-compact" data-type="${esc(p.type)}">
        <div><strong>${name}</strong> <span class="rp-tag">${esc(p.typeLabel)}</span></div>
        <p>${esc(p.summary)}</p>
        ${activity}
      </li>`;
  }

  function showActivity(repo) {
    const log = document.getElementById('activity-log');
    const panel = document.getElementById('eoyr-filter-panel');
    if (panel) panel.hidden = false;
    const toggle = document.getElementById('eoyr-filter-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');

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
    if (log) log.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const projects = window.EOYR_PROJECTS || [];
    if (!root || !projects.length) return;

    const featured = projects.filter(p => p.wins && p.wins.length);
    const other = projects.filter(p => !(p.wins && p.wins.length));

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
      if (filter) return applyFilter(root, filter.dataset.filter);

      const more = e.target.closest('.rp-more');
      if (more) {
        const open = more.getAttribute('aria-expanded') !== 'true';
        more.setAttribute('aria-expanded', String(open));
        more.querySelector('.rp-more-text').textContent = open ? 'Fewer details' : 'More details';
        more.querySelector('.rp-more-icon').textContent = open ? '−' : '+';
        document.getElementById(more.getAttribute('aria-controls')).hidden = !open;
        return;
      }

      const activity = e.target.closest('[data-activity]');
      if (activity) showActivity(activity.dataset.activity);
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
