/* ============================================================
   ORBC — HOME PAGE JS
   ============================================================ */
import { renderNav }         from './nav.js';
import { renderFooter }      from './footer.js';
import { initScrollReveal, initLazyImages, initCounters } from './utils.js';

// Gallery teaser items — mix of images + one video
const GALLERY_ITEMS = [
  { type: 'image', src: 'assets/images/gallery-1.jpg', alt: 'ORBC training session' },
  { type: 'video', src: 'assets/videos/hero-placeholder.mp4', poster: 'assets/images/gallery-video-thumb.jpg' },
  { type: 'image', src: 'assets/images/gallery-2.jpg', alt: 'Sparring at ORBC' },
  { type: 'image', src: 'assets/images/gallery-3.jpg', alt: 'ORBC youth program' },
  { type: 'image', src: 'assets/images/gallery-4.jpg', alt: 'Competition day' },
  { type: 'image', src: 'assets/images/gallery-5.jpg', alt: 'Coach Michael with fighters' },
  { type: 'image', src: 'assets/images/gallery-6.jpg', alt: 'Medal ceremony' },
];

function renderGalleryTeaser() {
  const grid = document.getElementById('gallery-teaser');
  if (!grid) return;

  // Show first 7 items
  const items = GALLERY_ITEMS.slice(0, 7);

  grid.innerHTML = items.map((item, i) => {
    if (item.type === 'video') {
      return `
        <div class="gallery-thumb reveal reveal-d${Math.min(i + 1, 5)}">
          <video
            data-autoplay
            muted loop playsinline
            poster="${item.poster || 'assets/images/hero-placeholder.jpg'}"
            aria-label="Training video"
          >
            <source src="${item.src}" type="video/mp4" />
          </video>
        </div>`;
    }
    return `
      <div class="gallery-thumb reveal reveal-d${Math.min(i + 1, 5)}">
        <img
          data-src="${item.src}"
          src="assets/images/hero-placeholder.jpg"
          alt="${item.alt}"
          width="400" height="280"
          loading="lazy"
        />
      </div>`;
  }).join('');
}

// Init autoplay videos in view
function initGalleryVideos() {
  const videos = document.querySelectorAll('.gallery-thumb video[data-autoplay]');
  if (!videos.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.3 });
  videos.forEach(v => obs.observe(v));
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav('index.html');
  renderFooter();
  renderGalleryTeaser();

  // Run after DOM is populated
  initScrollReveal();
  initLazyImages();
  initCounters();
  initGalleryVideos();
});
