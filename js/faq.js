import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal } from './utils.js';

async function loadFAQ() {
  const res = await fetch('data/faq.json');
  return res.json();
}

function renderFAQ(data) {
  const container = document.getElementById('faq-content');
  if (!container) return;

  container.innerHTML = data.categories.map((cat, ci) => `
    <div class="faq-category reveal reveal-d${Math.min(ci+1,4)}">
      <h3 class="faq-category__title">${cat.title}</h3>
      <div class="faq-list">
        ${cat.questions.map((item, qi) => `
          <div class="faq-item" data-id="${ci}-${qi}">
            <div class="faq-item__question" role="button" tabindex="0" aria-expanded="false">
              <span class="faq-item__q-text">${item.q}</span>
              <span class="faq-item__icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </span>
            </div>
            <div class="faq-item__answer" role="region">
              <div class="faq-item__answer-inner">${item.a}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Accordion logic
  container.querySelectorAll('.faq-item__question').forEach(q => {
    const toggle = () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(isOpen));
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  renderNav('faq.html');
  renderFooter();
  const data = await loadFAQ();
  renderFAQ(data);
  initScrollReveal();
});
