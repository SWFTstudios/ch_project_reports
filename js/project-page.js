/**
 * Project detail page (project.html?id=...): thumbnail, title, summary,
 * "What got done" in plain language, and an "Advanced details" section.
 */
(function () {
  const ui = window.EOYR_UI;

  function hostOf(url) {
    try { return new URL(url).host.replace(/^www\./, ''); } catch (e) { return ''; }
  }

  function render() {
    const root = document.getElementById('project-root');
    if (!root || !ui) return;
    const esc = ui.esc;
    const all = ui.projects();
    const id = new URLSearchParams(location.search).get('id');
    const index = all.findIndex(p => p.id === id);
    const p = all[index];

    if (!p) {
      root.innerHTML = `
        <section class="pp-missing">
          <h1 class="rp-title">Project not found</h1>
          <p class="rp-intro">That link doesn't match a project. Pick one from the list instead.</p>
          <a class="rp-btn" href="index.html#projects">See all projects</a>
        </section>`;
      return;
    }

    document.title = `${p.name} | Core Home Reports`;

    const wins = (p.wins || []).map(w => `<li>${esc(w)}</li>`).join('');
    const advanced = (p.advanced || []).map(a => `
      <div class="pp-adv-item">
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.text)}</p>
      </div>`).join('');

    const actions = [];
    if (p.url) {
      const label = /github\.com/.test(p.url) ? 'View code' : 'Visit site';
      actions.push(`<a class="rp-btn" href="${esc(p.url)}" target="_blank" rel="noopener">${label}</a>`);
    }
    if (p.link) actions.push(`<a class="rp-btn rp-btn-ghost" href="${esc(p.link.href)}">${esc(p.link.label)}</a>`);
    if (p.repo) actions.push(`<a class="rp-btn rp-btn-ghost" href="index.html?repo=${encodeURIComponent(p.repo)}#activity-log">Activity log</a>`);

    const prev = all[(index - 1 + all.length) % all.length];
    const next = all[(index + 1) % all.length];
    const host = p.url ? hostOf(p.url) : '';

    root.innerHTML = `
      <a class="pp-back" href="index.html#projects">&larr; All projects</a>

      <figure class="pp-shot">
        <div class="pp-shot-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(host || p.name)}</span></div>
        <div class="pp-shot-img">${ui.thumbHTML(p, { eager: true, alt: `${p.name} home page` })}</div>
      </figure>

      <header class="pp-head">
        <p class="rp-card-meta"><span class="rp-tag">${esc(p.typeLabel)}</span>${p.period ? `<span>${esc(p.period)}</span>` : ''}</p>
        <h1 class="pp-title">${esc(p.name)}</h1>
        <p class="pp-summary">${esc(p.summary)}</p>
        ${actions.length ? `<div class="pp-actions">${actions.join('')}</div>` : ''}
      </header>

      <section class="pp-section" aria-labelledby="pp-done">
        <h2 class="rp-section-title" id="pp-done">What got done</h2>
        ${wins
          ? `<ul class="rp-wins pp-wins">${wins}</ul>`
          : `<p class="rp-note">A full write-up for this project is on the way. Until then, the live site and activity log show the latest work.</p>`}
      </section>

      ${advanced ? `
      <section class="pp-section">
        <button type="button" class="rp-more pp-adv-toggle" aria-expanded="false" aria-controls="pp-adv">
          <span class="rp-more-text">Advanced details</span><span class="rp-more-icon" aria-hidden="true">+</span>
        </button>
        <div class="pp-adv" id="pp-adv" hidden>
          <p class="rp-note">How it works, in a bit more depth.</p>
          ${advanced}
        </div>
      </section>` : ''}

      <nav class="pp-pager" aria-label="More projects">
        <a href="${ui.projectUrl(prev)}"><span>Previous</span><strong>${esc(prev.name)}</strong></a>
        <a href="${ui.projectUrl(next)}"><span>Next</span><strong>${esc(next.name)}</strong></a>
      </nav>`;

    const toggle = root.querySelector('.pp-adv-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('.rp-more-text').textContent = open ? 'Hide advanced details' : 'Advanced details';
        toggle.querySelector('.rp-more-icon').textContent = open ? '−' : '+';
        document.getElementById('pp-adv').hidden = !open;
      });
    }
    window.scrollTo(0, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
