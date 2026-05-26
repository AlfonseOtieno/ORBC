import { renderNav } from './nav.js';
import { renderFooter } from './footer.js';
import { initScrollReveal, initLazyImages } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNav('about.html');
  renderFooter();
  initScrollReveal();
  initLazyImages();
});
