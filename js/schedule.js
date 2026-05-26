import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal } from './utils.js';
document.addEventListener('DOMContentLoaded', () => {
  renderNav('schedule.html');
  renderFooter();
  initScrollReveal();
});
