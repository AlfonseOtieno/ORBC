import { renderNav }    from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages, initCounters } from './utils.js';

async function loadAchievements() {
  const res = await fetch('data/achievements.json');
  return res.json();
}

function renderHeadlines(items) {
  const el = document.getElementById('headline-achievements');
  if (!el) return;
  el.innerHTML = items.map((item, i) => `
    <div class="headline-card reveal reveal-d${Math.min(i+1,4)}">
      <div class="headline-card__meta">
        <span class="headline-card__year">${item.year}</span>
      </div>
      <h3 class="headline-card__title">${item.title}</h3>
      <p class="headline-card__text">${item.description}</p>
    </div>
  `).join('');
}

function renderFighters(fighters) {
  const el = document.getElementById('notable-fighters');
  if (!el) return;
  el.innerHTML = fighters.map((f, i) => `
    <div class="fighter-card reveal reveal-d${Math.min(i+1,4)}">
      <h3 class="fighter-card__name">${f.name}</h3>
      <span class="fighter-card__category">${f.category}</span>
      <p class="fighter-card__achievements">${f.achievements}</p>
      ${f.active ? '<span class="fighter-card__active">Active Fighter</span>' : ''}
    </div>
  `).join('');
}

function renderYearly(records) {
  const el = document.getElementById('yearly-records');
  if (!el) return;
  el.innerHTML = records.map((r, i) => `
    <div class="yearly-row reveal reveal-d${Math.min(i+1,5)}" data-idx="${i}">
      <div class="yearly-row__header" role="button" tabindex="0" aria-expanded="false">
        <span class="yearly-row__year">${r.year}</span>
        <div class="yearly-row__summary">
          <div class="yearly-row__stat"><span class="yearly-row__stat-val gold">${r.gold}</span><span class="yearly-row__stat-label">Gold</span></div>
          <div class="yearly-row__stat"><span class="yearly-row__stat-val silver">${r.silver}</span><span class="yearly-row__stat-label">Silver</span></div>
          <div class="yearly-row__stat"><span class="yearly-row__stat-val bronze">${r.bronze}</span><span class="yearly-row__stat-label">Bronze</span></div>
          <div class="yearly-row__stat"><span class="yearly-row__stat-val">${r.fighters_sent}</span><span class="yearly-row__stat-label">Fighters</span></div>
          <div class="yearly-row__stat"><span class="yearly-row__stat-val">${r.competitions}</span><span class="yearly-row__stat-label">Events</span></div>
        </div>
        <svg class="yearly-row__toggle" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="yearly-row__body">
        <div class="yearly-row__highlights">
          ${r.highlights.map(h => `<div class="yearly-row__highlight">${h}</div>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.yearly-row__header').forEach(header => {
    const toggle = () => {
      const row = header.closest('.yearly-row');
      const isOpen = row.classList.toggle('open');
      header.setAttribute('aria-expanded', String(isOpen));
    };
    header.addEventListener('click', toggle);
    header.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }});
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  renderNav('achievements.html');
  renderFooter();
  const data = await loadAchievements();
  renderHeadlines(data.headline_achievements);
  renderFighters(data.notable_fighters);
  renderYearly(data.yearly_records);
  initScrollReveal();
  initLazyImages();
  initCounters();
});
