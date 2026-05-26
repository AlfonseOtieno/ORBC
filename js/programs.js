import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages } from './utils.js';
document.addEventListener('DOMContentLoaded', () => {
  renderNav('programs.html');
  renderFooter();
  initScrollReveal();
  initLazyImages();
});
